import { MongoClient } from 'mongodb'

async function logQueryToDatabase(event: any, queryData: any) {
    try {
        const config = useRuntimeConfig()
        const ip = getRequestIP(event, { xForwardedFor: true }) || 'Unknown'
        const userAgent = getRequestHeader(event, 'user-agent')

        // Get country information
        let country = 'Unknown'
        try {
            const response = await fetch(`https://ipapi.co/${ip}/json/`)
            const data = await response.json()
            country = data.country_name || 'Unknown'
        } catch (error) {
            console.error('Error fetching country:', error)
        }

        // Connect to database and log
        const client = new MongoClient(config.DB_URI)
        await client.connect()
        const db = client.db()
        const logsCollection = db.collection('query_logs')

        await logsCollection.insertOne({
            timestamp: new Date(),
            query: queryData,
            ip,
            country,
            userAgent
        })

        await client.close()
    } catch (error) {
        console.error('Error in logging process:', error)
    }
}

export default defineEventHandler(async (event) => {
    const { included, excluded, position } = await readBody(event)
    const config = useRuntimeConfig()
    const client = new MongoClient(config.DB_URI)
    await client.connect()

    const db = client.db()
    const collection = db.collection(`length_${position.length}`)

    const query: any = {}

    if (included?.length) {
        query.letters = { ...query.letters, $all: included }
    }

    if (excluded?.length) {
        query.letters = { ...query.letters, $not: { $elemMatch: { $in: excluded } } }
    }

    position.forEach((letter: string, index: number) => {
        if (letter) {
            query[`letters.${index}`] = letter
        }
    })

    // Start logging process asynchronously
    logQueryToDatabase(event, { included, excluded, position })

    // Continue with the main query without waiting for logging
    const words = await collection.aggregate([
        { $match: query }, // Apply the query filters
        {
            $addFields: {
                distinctLettersCount: {
                    $size: { $setUnion: [{ $ifNull: ["$letters", []] }, []] }
                }
            }
        },
        { 
            $sort: { 
                rank: -1, // Primary sort by rank in descending order
                distinctLettersCount: -1 // Secondary sort by distinct letters
            }
        },
        { $project: { word: 1, _id: 0 } } // Only return the word field
    ]).toArray()

    await client.close()

    return { words }
})

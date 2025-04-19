import { MongoClient } from 'mongodb'

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

    // MongoDB aggregation to sort by the number of distinct letters in each word
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

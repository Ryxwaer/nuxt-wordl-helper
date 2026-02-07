import { MongoClient } from 'mongodb'

interface LogEntry {
    ip: string
    userAgent: string | undefined
    queryData: { included: string[]; excluded: string[]; position: string[] }
}

/**
 * Fire-and-forget: inserts a log document without blocking the caller.
 * Accepts pre-extracted request data so the event context is never
 * accessed after the response has been sent.
 */
function logQueryToDatabase(entry: LogEntry) {
    const { ip, userAgent, queryData } = entry

    // Entire chain is intentionally not awaited by the caller
    resolveCountry(ip)
        .then(async (country) => {
        const config = useRuntimeConfig()
        const client = new MongoClient(config.DB_URI)
        await client.connect()

        const db = client.db()
            await db.collection('query_logs').insertOne({
            timestamp: new Date(),
            query: queryData,
            ip,
            country,
                userAgent,
        })

        await client.close()
        })
        .catch((error) => {
        console.error('Error in logging process:', error)
        })
}

export default defineEventHandler(async (event) => {
    const { included, excluded, position } = await readBody(event)

    // Extract request metadata synchronously — event context is still valid here
    const ip = getRequestIP(event, { xForwardedFor: true }) || 'Unknown'
    const userAgent = getRequestHeader(event, 'user-agent')

    // Fire-and-forget: log asynchronously without blocking the response
    logQueryToDatabase({ ip, userAgent, queryData: { included, excluded, position } })

    // ── Main word query ──────────────────────────────────
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

    const words = await collection.aggregate([
        { $match: query },
        {
            $addFields: {
                distinctLettersCount: {
                    $size: { $setUnion: [{ $ifNull: ["$letters", []] }, []] }
                },
                hasRank: { $cond: [{ $gt: ['$rank', 0] }, 1, 0] }
            }
        },
        {
            $sort: {
                hasRank: -1,
                rank: -1,
                distinctLettersCount: -1
            }
        },
        { $project: { word: 1, rank: 1, _id: 0 } }
    ]).toArray()

    await client.close()

    return { words }
})

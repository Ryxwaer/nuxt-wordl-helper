import { MongoClient } from 'mongodb'

interface LogEntry {
    ip: string
    userAgent: string | undefined
    isMobile: boolean
    queryData: { included: string[]; excluded: string[]; position: string[] }
}

/** Detect mobile devices from the User-Agent string. */
function isMobileUA(ua: string | undefined): boolean {
    return /Mobile|Android|iPhone|iPad|iPod|webOS|BlackBerry|Opera Mini|IEMobile/i.test(ua || '')
}

/**
 * Fire-and-forget: inserts a log document without blocking the caller.
 * Accepts pre-extracted request data so the event context is never
 * accessed after the response has been sent.
 */
function logQueryToDatabase(entry: LogEntry) {
    const { ip, userAgent, isMobile, queryData } = entry

    // Skip local dev requests
    if (ip === '127.0.0.1' || ip === '::1' || ip === 'Unknown') return

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
                isMobile,
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
    const isMobile = isMobileUA(userAgent)
    logQueryToDatabase({ ip, userAgent, isMobile, queryData: { included, excluded, position } })

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

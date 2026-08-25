import { MongoClient } from 'mongodb'
import { hash } from 'ohash'

interface WordQuery {
    included: string[]
    excluded: string[]
    position: string[]
}

interface LogEntry {
    ip: string
    userAgent: string | undefined
    isMobile: boolean
    queryData: WordQuery
    cached: boolean
}

async function writeQueryLog(entry: LogEntry): Promise<void> {
    const { ip, userAgent, isMobile, queryData, cached } = entry

    if (isInternalIP(ip)) return

    const country = await resolveCountry(ip)
    const db = await getDb()

    await db.collection('query_logs').insertOne({
        timestamp: new Date(),
        query: queryData,
        cached,
        ip,
        country,
        userAgent,
        isMobile,
    })
}

/**
 * The cache key is the clues alone, so it is shared across all users - a hit
 * means someone, not necessarily this visitor, ran the same query recently.
 * `onMiss` is excluded from `getKey` so it never affects the key.
 */
const getWords = defineCachedFunction(
    async (_cacheKey: string, { included, excluded, position }: WordQuery, onMiss?: () => void) => {
        onMiss?.()

        const config = useRuntimeConfig()
        const client = new MongoClient(config.DB_URI)
        await client.connect()

        try {
            const collection = client.db().collection(`length_${position.length}`)
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

            return await collection.aggregate([
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
        } finally {
            await client.close()
        }
    },
    {
        name: 'words',
        maxAge: 60 * 20, // dedupe identical queries for 20 minutes, then refresh
        swr: false,      // hard-expire instead of serving stale
        getKey: (cacheKey: string) => cacheKey,
    }
)

export default defineEventHandler(async (event) => {
    const { included, excluded, position } = await readBody<WordQuery>(event)
    const { ip, userAgent, isMobile } = getClientMeta(event)

    const cacheKey = hash({ i: included, e: excluded, p: position })

    let cacheMiss = false
    const words = await getWords(
        cacheKey,
        { included, excluded, position },
        () => { cacheMiss = true }
    )

    const logPromise = writeQueryLog({
        ip,
        userAgent,
        isMobile,
        queryData: { included, excluded, position },
        cached: !cacheMiss,
    }).catch(error => console.error('Query logging failed:', error))

    event.waitUntil?.(logPromise) // a detached promise can be dropped mid-flight

    return { words }
})

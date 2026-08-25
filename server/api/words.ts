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
}

/**
 * Inserts a single analytics log document. Awaited via `event.waitUntil` in the
 * handler so the promise is kept alive past the response (a bare detached
 * promise can be dropped by the runtime, which is why logging silently stopped
 * once it was moved inside the cached resolver).
 */
async function writeQueryLog(entry: LogEntry): Promise<void> {
    const { ip, userAgent, isMobile, queryData } = entry

    // Skip local dev / internal (container, LAN) requests
    if (isInternalIP(ip)) return

    const country = await resolveCountry(ip)
    const config = useRuntimeConfig()
    const client = new MongoClient(config.DB_URI)

    try {
        await client.connect()
        await client.db().collection('query_logs').insertOne({
            timestamp: new Date(),
            query: queryData,
            ip,
            country,
            userAgent,
            isMobile,
        })
    } finally {
        await client.close()
    }
}

/**
 * Cached word lookup, keyed purely by the clues (`included` / `excluded` /
 * `position`). The expensive Mongo aggregation only runs on a cache MISS, so
 * repeated "Calculate Words" clicks with the same clues are served from cache.
 *
 * `swr: false` + `maxAge` means the entry hard-expires after the window: the
 * next identical request runs fresh rather than being served stale.
 *
 * `onMiss` fires only when the resolver actually runs (i.e. a real miss); the
 * handler uses it to log genuine new requests exactly once per cache window.
 * It is intentionally excluded from `getKey` so it never affects the key.
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

    // Extract request metadata while the event context is still valid.
    const { ip, userAgent, isMobile } = getClientMeta(event)

    // Stable, storage-safe cache key derived from the actual clues.
    const cacheKey = hash({ i: included, e: excluded, p: position })

    let cacheMiss = false
    const words = await getWords(
        cacheKey,
        { included, excluded, position },
        () => { cacheMiss = true }
    )

    // Log genuine new requests only (cache miss) → no spam from repeated clicks.
    if (cacheMiss) {
        const logPromise = writeQueryLog({
            ip,
            userAgent,
            isMobile,
            queryData: { included, excluded, position },
        }).catch((error) => console.error('Error in logging process:', error))

        // Keep the background write alive past the response.
        event.waitUntil?.(logPromise)
    }

    return { words }
})

import { MongoClient } from 'mongodb'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const query = getQuery(event)

    // Pagination params with sensible defaults
    const PAGE = Math.max(1, Number(query.page) || 1)
    const LIMIT = Math.min(100, Math.max(1, Number(query.limit) || 25))
    const SKIP = (PAGE - 1) * LIMIT

    const client = new MongoClient(config.DB_URI)
    await client.connect()

    const db = client.db()
    const logsCollection = db.collection('query_logs')

    // Run count + paginated query in parallel
    const [total, logs] = await Promise.all([
        logsCollection.countDocuments(),
        logsCollection
            .find({})
            .sort({ timestamp: -1 })
            .skip(SKIP)
            .limit(LIMIT)
            .toArray(),
    ])

    await client.close()

    return {
        logs,
        page: PAGE,
        limit: LIMIT,
        total,
        totalPages: Math.ceil(total / LIMIT),
    }
})

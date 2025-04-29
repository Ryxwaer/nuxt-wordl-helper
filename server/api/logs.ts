import { MongoClient } from 'mongodb'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const client = new MongoClient(config.DB_URI)
    await client.connect()

    const db = client.db()
    const logsCollection = db.collection('query_logs')

    // Get the last 1000 logs, sorted by timestamp descending
    const logs = await logsCollection
        .find({})
        .sort({ timestamp: -1 })
        .limit(1000)
        .toArray()

    await client.close()

    return { logs }
}) 
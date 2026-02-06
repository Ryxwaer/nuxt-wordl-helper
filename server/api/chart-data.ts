import { MongoClient } from 'mongodb'

/**
 * Returns aggregated chart data for a single view.
 *
 * ?view=daily   → hourly counts for today (default)
 * ?view=monthly → daily counts for the last 30 days
 *
 * Response shape: { categories: string[], counts: number[] }
 */
export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const view = (query.view as string) || 'daily'

    const config = useRuntimeConfig()
    const client = new MongoClient(config.DB_URI)
    await client.connect()

    const db = client.db()
    const collection = db.collection('query_logs')

    const now = new Date()
    const todayStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))

    let categories: string[]
    let counts: number[]

    if (view === 'monthly') {
        // ── Daily counts for last 30 days ────────────────
        const thirtyDaysAgo = new Date(todayStart)
        thirtyDaysAgo.setUTCDate(thirtyDaysAgo.getUTCDate() - 30)

        const daily = await collection.aggregate<{ _id: string; count: number }>([
            { $match: { timestamp: { $gte: thirtyDaysAgo } } },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
                    count: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]).toArray()

        const dailyMap = new Map(daily.map((d) => [d._id, d.count]))
        categories = []
        counts = []
        for (let i = 29; i >= 0; i--) {
            const d = new Date(todayStart)
            d.setUTCDate(d.getUTCDate() - i)
            const key = d.toISOString().slice(0, 10)
            categories.push(key)
            counts.push(dailyMap.get(key) || 0)
        }
    } else {
        // ── Hourly counts for today (default) ────────────
        const hourly = await collection.aggregate<{ _id: number; count: number }>([
            { $match: { timestamp: { $gte: todayStart } } },
            {
                $group: {
                    _id: { $hour: '$timestamp' },
                    count: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]).toArray()

        const hourlyMap = new Map(hourly.map((h) => [h._id, h.count]))
        categories = []
        counts = []
        for (let h = 0; h < 24; h++) {
            categories.push(`${h.toString().padStart(2, '0')}:00`)
            counts.push(hourlyMap.get(h) || 0)
        }
    }

    await client.close()

    return { categories, counts }
})

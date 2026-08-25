import { MongoClient, type Db } from 'mongodb'

let clientPromise: Promise<MongoClient> | null = null

/**
 * Shared, pooled MongoClient.
 *
 * The connect-write-close pattern in `api/words.ts` is fine there (a few
 * hundred writes a day, only on cache misses), but visit tracking runs on
 * every page render, so it needs a connection that outlives the request.
 * A failed connect clears the cache so the next request retries instead of
 * being stuck with a rejected promise forever.
 */
export function getDb(): Promise<Db> {
    if (!clientPromise) {
        const config = useRuntimeConfig()
        clientPromise = new MongoClient(config.DB_URI).connect().catch((error) => {
            clientPromise = null
            throw error
        })
    }
    return clientPromise.then(client => client.db())
}

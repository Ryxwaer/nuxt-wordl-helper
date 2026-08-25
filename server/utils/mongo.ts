import { MongoClient, type Db } from 'mongodb'

let clientPromise: Promise<MongoClient> | null = null

export function getDb(): Promise<Db> {
    if (!clientPromise) {
        const config = useRuntimeConfig()
        clientPromise = new MongoClient(config.DB_URI).connect().catch((error) => {
            clientPromise = null // let the next request retry
            throw error
        })
    }
    return clientPromise.then(client => client.db())
}

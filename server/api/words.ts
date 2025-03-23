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

    const words = await collection.find(query, { projection: { word: 1, _id: 0 } }).toArray()
    await client.close()

    return { words }
})

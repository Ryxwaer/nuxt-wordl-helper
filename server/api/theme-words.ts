import { MongoClient } from 'mongodb'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const client = new MongoClient(config.DB_URI)

  try {
    await client.connect()
    const db = client.db()

    const groups: Record<number, string[]> = {}

    for (let len = 3; len <= 8; len++) {
      const docs = await db
        .collection(`length_${len}`)
        .find({ rank: 1 }, { projection: { word: 1, _id: 0 } })
        .toArray()

      if (docs.length > 0) {
        groups[len] = docs.map((d) => d.word)
      }
    }

    return { words: groups }
  } catch (error) {
    console.error('Failed to fetch theme words:', error)
    return { words: {} }
  } finally {
    await client.close()
  }
})

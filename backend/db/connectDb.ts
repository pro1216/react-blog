// test-mongo.ts
import { MongoClient } from "mongodb";

const uri = "mongodb://127.0.0.1:27017";
const dbName = "blog";

async function connectDb() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");
    const db = client.db(dbName);
    const collections = await db.collections();
    console.log("Collections:", collections.map(c => c.collectionName));
  } catch (err) {
    console.error("❌ Connection error:", err);
  } finally {
    await client.close();
  }
}

connectDb();

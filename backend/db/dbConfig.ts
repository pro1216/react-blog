import { Db, MongoClient } from 'mongodb';
import mysql from 'mysql2/promise';

export class DbService {
  private client: MongoClient;
  private db?: Db;

  constructor(private uri: string, private dbName: string) {
    this.client = new MongoClient(uri);
  }

  async connect():Promise<Db> {
    try {
      if (this.db) return this.db;
      this.client = new MongoClient(this.uri);
      await this.client.connect();
      console.log("✅ MongoDB connected:", this.uri);
      this.db = this.client.db(this.dbName);
      return this.db;
    } catch (err) {
      console.error("❌ MongoDB connection failed");
    console.error(err);
    process.exit(1);
  }
  }

  async close(): Promise<void> {
    await this.client.close();
    console.log("🔌 MongoDB connection closed");
  }
}

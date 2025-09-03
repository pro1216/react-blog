// src/server.ts
import express from "express";
import dotenv from "dotenv"
import { DbService } from "./db/dbConfig";
import { userRoutes } from "./db/test";
import cors from 'cors';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 環境変数からURIを取得
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const DB_NAME = process.env.DB_NAME || "blog";

if (!MONGO_URI || !DB_NAME) {
    throw new Error("❌ MONGO_URI または DB_NAME が .env に設定されていません");
  }

// MongoDBサービスを作成
const dbService = new DbService(MONGO_URI, DB_NAME);

// ユーザーAPI
app.use("/api", userRoutes(dbService));

// サーバー起動
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

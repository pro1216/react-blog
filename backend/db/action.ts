import { Router, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { Blog, FormData } from "../types/blog";
import { DbService } from "./dbConfig";
import nodemailer from "nodemailer";

interface ArticleRequestBody {
  _id: string;
  title: string;
  content: string;
}

export function userRoutes(dbService: DbService) {
  const router = Router();

  router.get("/test", (req: Request, res: Response) => {
    res.status(200).json({ message: "success" });
  });
  //記事追加
  router.post(
    "/article",
    async (req: Request<{}, {}, ArticleRequestBody>, res: Response) => {
      try {
        const { title, content } = req.body;
        const articlesBoddy = { title, content };
        const db = await dbService.connect();
        const result = await db.collection("article").insertOne(articlesBoddy);
        res.status(201).json({ _id: result.insertedId, ...articlesBoddy });
      } catch (error) {
        console.error("記事登録エラー", error);
        throw res.status(500).json({ error: (error as Error).message });
      }
    }
  );

  // 記事全取得
  router.get("/article", async (_req: Request, res: Response) => {
    try {
      const db = await dbService.connect();
      const articles = await db.collection("article").find().toArray();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  });
  //検索結果取得
  router.get(
    "/article/search",
    async (req: Request, res: Response): Promise<void> => {
      try {
        // クエリパラメータを文字列として取得
        let q = req.query.query as string | undefined;

        const db = await dbService.connect();
        if (!q || q.trim() === "") {
          q = "";
        }
        const articles = await db
          .collection("article")
          .find({
            $or: [
              {
                title: { $regex: q, $options: "i" },
                content: { $regex: q, $options: "i" },
              },
            ],
          })
          .toArray();
        const formatted: Blog[] = articles.map((s) => ({
          id: Number(s._id),
          title: s.title,
          content: s.content,
          update_time: new Date(),
          create_time: new Date(),
        }));
        res.json(formatted);
      } catch (error) {
        res.status(500).json({ error: (error as Error).message });
      }
    }
  );
  //idを取得して取得
  router.get("/article/:id", async (_req: Request, res: Response) => {
    try {
      const id = _req.params.id;
      const db = await dbService.connect();
      const article = await db
        .collection("article")
        .findOne({ _id: new ObjectId(id) });
      if (!article) {
        throw res.status(404).json({ message: "記事が見つかりませんでした" });
      }
      res.json(article);
    } catch (error) {
      throw res.status(500).json({ message: "異常なエラーが発生しました" });
    }
  });

  //編集した記事を登録
  router.post(
    "/article/:id",
    async (req: Request<{}, {}, ArticleRequestBody>, res: Response) => {
      try {
        const id = req.params;
        const { title, content } = req.body;
        const articlesBoddy = { title, content };
        const db = await dbService.connect();

        if (!content) {
          throw res.status(500).json({ message: "記事がNULLです" });
        }
        const result = await db.collection("article").insertOne(articlesBoddy);
        res
          .status(201)
          .json({ message: "記事を登録しました。", id: result.insertedId });
      } catch (error) {
        throw res.status(500).json({ message: "異常なエラーが発生しました" });
      }
    }
  );
   //編集した記事を削除
  router.post(
    "/article/delete/:id",
    async (req: Request, res: Response) => {
      try {
        const {id} = req.params;
        const db = await dbService.connect();
         const objectId = new ObjectId(id);

        const result = await db.collection("article").deleteOne({_id:objectId});

        if(result.deletedCount === 0){
          throw res.status(404).json({message:"記事がありません"});
        }
        res
          .status(201)
          .json({ message: "記事を削除いたしました。", id: result.deletedCount });
      } catch (error) {
        throw res.status(500).json({ message: "異常なエラーが発生しました" });
      }
    }
  );

  //フォームデータ登録
  router.post("/form", async (req: Request, res: Response) => {
    try {
      const { name, email, message }: FormData = req.body as FormData;
      const formData = {
        name,
        email,
        message,
        create_time: new Date(),
        update_time: new Date(),
      };
      const db = await dbService.connect();
      const result = await db.collection("formData").insertOne(formData);

      const savedData: FormData = {
        _id: result.insertedId.toString(), // MongoDB の ObjectId を string に
        ...formData,
      };
      //メール送信
      await sendEmailNotification(savedData, res);
      res.status(201).json(savedData);
    } catch (error) {
      console.error("フォームデータ登録エラー", error);
      throw res.status(500).json({ error: (error as Error).message });
    }
  });
  async function sendEmailNotification(
    formData: FormData,
    res: Response
  ): Promise<void> {
    //メール送信
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user,
        pass,
      },
    });

    try {
      await transporter.sendMail({
        from: formData.email,
        to: "shota19961216@gmail.com",
        subject: `問い合わせ from ${formData.name}`,
        text: formData.message,
      });
      res.json({ success: true, message: "メール送信成功" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "メール送信失敗" });
    }
    console.log("新しいフォームデータが登録されました:", formData);
  }
  return router;
}

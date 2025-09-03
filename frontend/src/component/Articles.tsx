import { json } from "express";
import { useEffect } from "react";
import { useState } from "react"
import '../styles/App.css';
import '../styles/index.css';

interface Article {
    id: string;
    title:string;
    content:string;
  }

export const Articles: React.FC = () => {
    const [article, setArticle] = useState<Article[]>([]);
    const [title, setTile] = useState("");
    const [content, setContent] = useState("");

    const fetchUsers = async () => {
        try {
            const res = await fetch("http://localhost:3001/api/article");
            if (!res.ok) {
                throw new Error(`HTTPエラー:${res.status}`);
            }
            const data: [] = await res.json();
            setArticle(data);
        } catch (error) {
            console.error("記事取得失敗", error);
        }
    };
    //初回読み取り時ユーザを取得
    useEffect(() => {
        fetchUsers()
    }, []);
    const addUser = async () => {
        try {
            const res = await fetch("http://localhost:3001/api/article", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, content })
            });
            if (!res.ok) {
                const data = await res.json();
                const errorMessage = data?.error || `登録に失敗しました (status: ${res.status})`;
                throw new Error(errorMessage);
            }
            fetchUsers();
        } catch (error) {
            alert(error instanceof Error ? error.message : "不明なエラーです")
            console.error(error);
        }
    };

    return (
        <div>
            <div>
                <h1>User Listテスト</h1>
            </div>
            <input
                type="text"
                placeholder="名前"
                value={title}
                onChange={(e) => setTile(e.target.value)}
            />
            <input
                type="text"
                placeholder="テキスト2"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button onClick={addUser}>追加</button>
            <ul>
                {article.map((article) => (
                    <li >{article.title} : {article.content}</li>
                ))}
            </ul>
        </div>
    );
};
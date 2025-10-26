import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Common } from "./Common";

interface Article {
  _id: string;
  title: string;
  content: string;
}
export function Home(): JSX.Element {
  const [article, setArticle] = useState<Article[]>([
    { _id: "", title: "", content: "" },
  ]);
 
  const navigate = useNavigate();
  const deleteArtile = async (id:string) => {
    try {
      const res = await fetch(`http://localhost:3002/api/article/delete/${id}`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }});
       if (!res.ok) {
        throw new Error(`HTTPエラー:${res.status}`);
      }
      fetchArticles(); 
    } catch (error) {
      
    }
  }
  const fetchArticles = async () => {
    try {
      console.log(process.env.REACT_APP_API_URL);
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/article`);
      if (!res.ok) {
        throw new Error(`HTTPエラー:${res.status}`);
      }
      const data: [] = await res.json();
      setArticle(data);
    } catch (error) {
      console.error("記事取得失敗", error);
    }
  };
  //初回読み取り時反映
  useEffect(() => {
    fetchArticles();
  });
  if (article.length < 1 || article[0]._id === "") {
    return (
      <main>
        <p>記事がありません</p>
        <button onClick={() => navigate(`/newArticle`)}>記事を追加</button>
      </main>
    );
  }
  //記事の文字数取得
  function getContent(content: string): string {
    if (!content) return "";
    const strippedContent = content.replace(/[\n\r]/g, ""); // 改行コードを削除
    const contentLength = strippedContent.length;
    if (contentLength > 20) {
      // 20文字を超える場合の処理
      return strippedContent.slice(0, 20) + "...";
    }
    return strippedContent;
  }
  return (
    <Common>
      <main>
        <section id="home">
          <h2>最新記事</h2>
          <article>
            <div id="article-header">{article[0].title}</div>
            <hr />
            <div id="article-content">
              <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                {getContent(article[0].content)}
              </ReactMarkdown>
            </div>
            <button
              id="read-more-button"
              onClick={() => navigate(`/article/${article[0]._id}`)}
            >
              続きを読む
            </button>
          </article>
        </section>
        <h2>アーカイブス</h2>
        {article.map((ds) => {
          return (
            <section>
              <article>
                <div id="article-header">{ds.title}</div>
                <hr />
                <div id="article-content">
                  <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                    {getContent(ds.content)}
                  </ReactMarkdown>
                </div>
                <button
                  id="read-more-button"
                  onClick={() => navigate(`/article/${ds._id}`)}
                >
                  続きを読む
                </button>
                <button id="delete" onClick={() => deleteArtile(ds._id)}>削除</button>
              </article>
            </section>
          );
        })}
      </main>
    </Common>
  );
}

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { Blog } from "../../types/blog";
import { Common } from "../Common";

export default function SearchResult() {
  const [articles, setArticles] = useState<Blog[]>([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const urlParams = new URLSearchParams({
    query: query,
  });
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

  useEffect(() => {
    fetchArticles();
  }, [query]);

  async function fetchArticles() {
    try {
      console.log(urlParams.toString());
      const res = await fetch(
        `https://react-blog-4bm0.onrender.com/api/article/search?${urlParams.toString()}`
      );
      if (!res.ok) {
        throw new Error(`HTTPエラー:${res.status}`);
      }
      const data: Blog[] = await res.json();
      setArticles(data);
    } catch (error) {
      console.error("記事取得失敗", error);
    }
  }
  return (
    <Common>
      <main>
        <h2>アーカイブス</h2>
        {articles.map((ds) => {
          let create_time = new Date(ds.create_time);
          let update_time = new Date(ds.update_time);
          return (
            <section>
              <article>
                <div id="article-header">{ds.title}</div>
                <hr />
                <div id="article-content">
                  <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                    {getContent(ds.content)}
                  </ReactMarkdown>
                  {/* <p>作成日 : {ds.create_time.toLocaleDateString()}</p>
                <p>更新日 : {ds.update_time.toLocaleDateString()}</p> */}
                </div>
              </article>
            </section>
          );
        })}
      </main>
    </Common>
  );
}

import React, { useEffect, useState, useRef } from "react";
import { data, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Header, Footer } from './Main';
import '../styles/index.css';
import remarkBreaks from "remark-breaks";

interface Article {
  _id: string;
  title: string;
  content: string;
}

interface ArticleEditorProps {
  id: string;
  initialContent: string;
  initialTitle: string;
  save?: (content: string) => void;
}

export const Article: React.FC = () => {
  return (
    <body>
      <Header />
      <ExArticle />
      <Footer />
    </body>
  )
}
export const ExArticle: React.FC = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3002/api/article/${id}`)
        .then((res) => res.json())
        .then((data) => setArticle(data))
        .catch(() => console.error("記事を取得できませんでした"));
    }
  }, [id]);

  if (!article) return <p>読み取り中....</p>;
  const sampleMarkdown = `# タイトル\nこれは **Markdown** のサンプルです。`;
  return (
    <ArticleEditor
      id={id!}
      initialTitle={article.title}
      initialContent={article.content}
    />
  );
};

// Markdown挿入関数
const insertMarkDown = (
  syntax: string,
  placeholder: string,
  textareaRef: React.RefObject<HTMLTextAreaElement>,
  content: string,
  setContent: React.Dispatch<React.SetStateAction<string>>
) => {
  const textarea = textareaRef.current;
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;

  const before = content.slice(0, start);
  const after = content.slice(end);
  const selected = content.slice(start, end) || placeholder;

  const newText = `${before}${syntax}${selected}${after}`;
  setContent(newText);

  setTimeout(() => {
    textarea.focus();
    textarea.selectionStart = start + syntax.length;
    textarea.selectionEnd = start + syntax.length + selected.length;
  }, 0);
};

export default function ArticleEditor({
  id,
  initialTitle,
  initialContent,
}: ArticleEditorProps) {
  const [isEnding, setIsEnding] = useState(false);
  const [content, setContent] = useState(initialContent);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  //登録
  async function regist(content: string) {
    if (content && id) {
      await fetch(`http://localhost:3002/api/article/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: initialTitle,
          content: content
        }),
      })
        .then(res => res.json())
        .then(data => {
          console.log("更新成功:", data);
          alert("記事更新成功")
        })
        .catch(err => {
          alert("記事の登録に失敗しました");
        });
    }
  }
  return (
    <main>
      <div style={{ display: "flex", gap: "20px" }}>
        {isEnding ? (
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: "5px" }}>
              <button style={{ marginRight: "10px", padding: "3px 6px", backgroundColor: "black" }}
                onClick={() =>
                  insertMarkDown("**", "太字", textareaRef, content, setContent)
                }
              >
                太字
              </button>
              <button style={{ marginRight: "10px", padding: "3px 6px", backgroundColor: "black" }}
                translate="no"
                onClick={() =>
                  insertMarkDown("# ", "見出し", textareaRef, content, setContent)
                }
              >
                見出し
              </button>
              <button style={{ padding: "3px 6px", backgroundColor: "black" }}
                onClick={() =>
                  insertMarkDown("- ", "リスト", textareaRef, content, setContent)
                }
              >
                リスト
              </button>
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              cols={60}
            />
            {/* プレビューエリア */}
            <div
              style={{
                flex: 1,
                border: "1px solid #ccc",
                padding: "10px",
                height: "400px",          // 固定の高さ
                overflowY: "auto",        // 縦スクロール
                backgroundColor: "#fafafa" // 見やすいように背景色
              }}>
              <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>{content}</ReactMarkdown>
              </div>
            </div>
            <br />
            <button style={{ marginBottom: "32px", marginTop: "16px", padding: "5px" }} onClick={() => setIsEnding(false)}>保存</button>
            <button style={{ marginBottom: "32px", marginTop: "16px", marginLeft: "32px", padding: "5px" }} onClick={() => regist(content)}>登録</button>
          </div>
        ) : (
          <div
            style={{
              flex: 1,
              border: "1px solid #ccc",
              padding: "30px 10px",
              height: "400px",          // 固定の高さ
              overflowY: "auto",        // 縦スクロール
              backgroundColor: "#fafafa", // 見やすいように背景色
            }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            <button style={{ padding: "3px 6px", backgroundColor: "black"}} onClick={() => setIsEnding(true)}>編集</button>
          </div>
        )}
      </div>
    </main>
  );
}

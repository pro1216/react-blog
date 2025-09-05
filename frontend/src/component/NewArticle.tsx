import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Header, Footer } from "./Main";
import "../styles/index.css";
import "../styles/article.css";
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

export const NewArticle: React.FC = () => {
  return (
    <div>
      <Header />
      <ExArticle />
      <Footer />
    </div>
  );
};

export const ExArticle: React.FC = () => {
  const { id } = useParams();
  const sampleMarkdown = `# タイトル\nこれは **Markdown** のサンプルです。`;
  const sampleTitle = "タイトル";

  return (
    <ArticleEditor
      id={id!}
      initialTitle={sampleTitle}
      initialContent={sampleMarkdown}
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
  const [isEnding, setIsEnding] = useState(true);
  const [content, setContent] = useState(initialContent);
  const [title, setTitle] = useState(initialTitle);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // 登録
  async function regist(content: string, title: string) {
    if (content.length > 0 && title.length > 0) {
      await fetch(`http://localhost:3002/api/article`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("更新成功:", data);
          alert("記事更新成功");
        })
        .catch((err) => {
          alert("記事の登録に失敗しました");
        });
    }
  }

  return (
    <main>
      <div id="title-area">
        <input
          id="title-input"
          type="text"
          placeholder="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div id="editor-area">
        {isEnding ? (
          <div id="markdown-editor">
            <div id="markdown-buttons">
              <button
                style={{
                  marginRight: "10px",
                  padding: "3px 6px",
                  backgroundColor: "black",
                  color: "white",
                }}
                onClick={() =>
                  insertMarkDown("**", "太字", textareaRef, content, setContent)
                }
              >
                太字
              </button>
              <button
                id="heading-button"
                translate="no"
                onClick={() =>
                  insertMarkDown("# ", "見出し", textareaRef, content, setContent)
                }
              >
                見出し
              </button>
              <button
                id="list-button"
                onClick={() =>
                  insertMarkDown("- ", "リスト", textareaRef, content, setContent)
                }
              >
                リスト
              </button>
            </div>

            <textarea
              id="markdown-input"
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}

            />
          </div>
        ) : (
          <div id="markdown-preview" >
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
              {content}
            </ReactMarkdown>
          </div>
        )}
      </div>

      <button
        id="toggle-button"
        onClick={() => setIsEnding(!isEnding)}
      >
        {isEnding ? "プレビュー" : "編集"}
      </button>

      <button
       id="regist-button"
        onClick={() => regist(content, title)}
      >
        登録
      </button>
    </main>
  );
}

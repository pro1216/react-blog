import React, { useEffect, useState, useRef } from "react";
import { data, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Common } from "../component/Common";
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

export function Article() {
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

  return (
    <ArticleEditor
      id={id!}
      initialTitle={article.title}
      initialContent={article.content}
    />
  );
}

// Markdown挿入関数
const insertMarkDown = (
  syntax: string,
  placeholder: string,
  textareaRef: React.RefObject<HTMLTextAreaElement | null>,
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

function ArticleEditor({
  id,
  initialTitle,
  initialContent,
}: ArticleEditorProps) {
  const [isEnding, setIsEnding] = useState(false);
  const [content, setContent] = useState(initialContent);
  const [title, setTitle] = useState(initialTitle);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  //登録
  async function update(title: string, content: string) {
    if (content && id) {
      await fetch(`http://localhost:3002/api/article/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: initialTitle,
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
    <Common>
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
                    insertMarkDown(
                      "**",
                      "太字",
                      textareaRef,
                      content,
                      setContent
                    )
                  }
                >
                  太字
                </button>
                <button
                  id="heading-button"
                  translate="no"
                  onClick={() =>
                    insertMarkDown(
                      "# ",
                      "見出し",
                      textareaRef,
                      content,
                      setContent
                    )
                  }
                >
                  見出し
                </button>
                <button
                  id="list-button"
                  onClick={() =>
                    insertMarkDown(
                      "- ",
                      "リスト",
                      textareaRef,
                      content,
                      setContent
                    )
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
            <div id="markdown-preview">
              <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                {content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        <button id="toggle-button" onClick={() => setIsEnding(!isEnding)}>
          {isEnding ? "プレビュー" : "編集"}
        </button>

        <button id="regist-button" onClick={() => update(content, title)}>
          登録
        </button>
      </main>
    </Common>
  );
}

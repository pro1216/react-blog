import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { IconBaseProps } from "react-icons";
import SearchResult from "./SearchResult";
import { useNavigate } from "react-router-dom";

export default function SearchPopover() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // ポップオーバーを閉じる処理
  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 200);
  };

  // Escapeキーで閉じる
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (closing && query.length > 0) {
        console.log("検索:", query);
        <SearchResult />;
        handleClose();
        return;
      }
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);
  const SearchIcon = CiSearch as (props: IconBaseProps) => JSX.Element;
  return (
    <div className="search-wrapper">
      {/* トリガー */}
      <div className="search-trigger" onClick={() => setOpen(true)}>
        <SearchIcon size={22} />
      </div>

      {open && (
        <>
          {/* 背景オーバーレイ */}
          <div className="search-overlay" onClick={handleClose} />

          {/* 検索バー */}
          <div className={`search-popover ${closing ? "fade-out" : "fade-in"}`}>
            <input
              type="text"
              placeholder="キーワードを入力..."
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
            />
            <button onClick={() => navigate(`/search?query=${query}`)}>
              検索
            </button>
            <button className="close-btn" onClick={handleClose}>
              ✖
            </button>
          </div>
        </>
      )}
    </div>
  );
}

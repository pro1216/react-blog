import React, { useState } from "react";
import FaSearch from "../../assets/searching.jpg"; // アイコン用

type Props = {
  onSearch: (query: string) => void;
};

export const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [state, setState] = useState<boolean>(false);
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value); // 入力するたびに親に通知
  };

  return (
    <div className="search-bar">
      {state && <input
        type="text"
        placeholder="記事を検索..."
        value={query}
        onChange={handleChange}
      />
      }
      <button onClick={() => setState(!state)} style={{ backgroundColor: "transparent", border: "none", cursor: "pointer" }}>
        {state ? "✖" : "🔍"}
      </button>
    </div>
  );
};

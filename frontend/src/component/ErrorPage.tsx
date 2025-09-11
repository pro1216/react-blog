// src/pages/ErrorPage.tsx
import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const error: any = useRouteError();
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>エラーが発生しました </h1>
      <p>{error?.statusText || error?.message || "不明なエラーです。"}</p>

      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#007bff",
          color: "white",
          cursor: "pointer",
        }}
      >
        ホームに戻る
      </button>
    </div>
  );
};

export default ErrorPage;

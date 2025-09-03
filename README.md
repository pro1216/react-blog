# Markdown Blog Editor

このプロジェクトは **React + TypeScript** を使った Markdown 対応のブログ記事編集アプリです。  
入力エリアとプレビューエリアを横並びで配置し、リアルタイムに編集結果を確認できます。

---

## ✨ 主な機能
- Markdown入力
  - `textarea` で記事を入力
  - Markdown 構文（見出し・リスト・強調・リンクなど）に対応
- プレビュー機能
  - 入力内容をリアルタイムで表示
  - 縦スクロール対応
- UI調整
  - 編集エリアとプレビューエリアを横並びに配置
  - 「編集」ボタンを画面下部に固定
- 記事登録API連携（予定）
  - 記事をバックエンドに送信して保存可能

---

## 🚀 開発環境
- React
- TypeScript
- Vite
- react-markdown

---

## 📦 セットアップ

```bash
# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
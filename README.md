# 音楽ゲーム学園 公式サイト

音楽ゲーム学園の公式ウェブサイトです。

## 概要

このサイトはNext.js 16 (App Router) + Tailwind CSS v4 + TypeScriptで構築されています。
すべてのページはSSG（静的生成）によって提供されます。

## 開発環境のセットアップ

```bash
npm install
npm run dev
```

ブラウザで `http://localhost:3000` を開いてください。

## 構成

- `src/app/` : ルーティングと各ページコンポーネント
- `src/components/` : 共通コンポーネント
- `src/lib/` : 型定義・コンテンツ取得ユーティリティ
- `src/styles/` : グローバルスタイル設定
- `content/` : 記事・憲章・ヒーローデータのMarkdown/JSON格納場所
- `lectures/` : 講義資料等アーカイブ領域（サイトビルドには関与しません）

詳細は `CLAUDE.md` や `agents/` 以下の指南書をご参照ください。

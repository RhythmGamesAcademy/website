@AGENTS.md

# 音楽ゲーム学園公式HP プロジェクト規約

## 概要
Vaporwave系の配色を取り入れた、大学公式サイト風の静的サイト。
Next.js 16 (App Router), Tailwind CSS v4, TypeScriptで構成されている。

## ディレクトリ構成
- `src/app/` : ルーター層
- `src/components/` : プレゼンテーション層
- `src/lib/` : データ層・型定義
- `src/styles/` : グローバルCSS
- `content/` : サイト用Markdown/JSON
- `lectures/` : 非サイト用アーカイブ
- `scripts/` : 各種スクリプト用

## デザイン方針（`agents/web-design.md` 準拠）
- **トーン**: 濃紫/濃紺ベース（純黒不使用）、ネオンカラー（ピンク・シアン・紫）アクセント
- **装飾レベルの強弱**:
  - ヒーロースライダー・UIホバー時: **強め**（グラデーション、光彩）
  - 学園憲章・記事本文: **最小限**（可読性重視、無地に近い背景）
- **制約**:
  - 絵文字、`//` 等の記号装飾は一切使用しない。

## アーキテクチャ方針（`agents/tech-requirements.md` 準拠）
- 静的生成（SSG）ベース
- Markdown管理（初期は `gray-matter` + `remark` 使用）
- `content/` 内のデータをビルド時にパースしてHTMLへ変換する

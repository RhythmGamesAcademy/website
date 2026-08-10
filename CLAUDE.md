# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

# 音楽ゲーム学園公式HP プロジェクト規約

## 概要
Vaporwave系の配色を取り入れた、大学公式サイト風の静的サイト。
Next.js 16 (App Router) + Tailwind CSS v4 + TypeScript、`output: 'export'` による完全SSG。
GitHub Pages（`/website` サブパス配下）へデプロイされる。

**日本語のみのサイト**である。i18n・多言語対応は導入しない（過去に ja/en の二言語構成だったが、保守負荷のため撤去済み）。

## コマンド
```bash
npm run dev        # 開発サーバー (localhost:3000)
npm run build      # 静的エクスポート → out/  (postbuildでPagefindインデックス生成)
npm run lint       # eslint .
npm run typecheck  # tsc --noEmit
```
テストランナーは未導入。変更後の検証は `npm run typecheck` と `npm run build` で行う。

`.next/types/` の生成型が古いと `typecheck` が実在しないページの欠落を報告することがある。その場合は `npm run build` を先に走らせる。

## ディレクトリ構成
- `src/app/` : ルーター層。全ページは `src/app/ja/` 配下
- `src/components/` : プレゼンテーション層（`ui/` は汎用パーツ）
- `src/lib/` : データ層・型定義・スキーマ・UI文言
- `src/styles/globals.css` : グローバルCSS
- `content/ja/` : サイト用Markdown/JSON
- `agents/` : 設計指南書（gitignore対象・ローカルのみ）

## アーキテクチャ

### URL構造
URLは `/ja/` プレフィックスを保持している。これは**過去に共有されたリンクを生かすためだけの遺産**であり、言語切替の余地を残す意図はない。

- ルート `/` は `src/app/page.tsx` のクライアントスクリプトで `/ja/` へリダイレクトする（静的エクスポートのためサーバーリダイレクト不可）
- 内部リンクは必ず `lib/paths.ts` の `sitePath()` を通す。`/ja` の付与と末尾スラッシュを一手に引き受けている。プレフィックスを変えたくなったら `ROUTE_PREFIX` 一箇所で済む
- レイアウトは root `layout.tsx` に集約されている（Header / Breadcrumbs / SiteSearch / Footer）。おかげで `app/not-found.tsx` すなわち GitHub Pages が返す `404.html` もサイトデザインを纏う

### コンテンツパイプライン
`content/ja/**` のMarkdown/JSONをビルド時に読み、HTMLへ変換して埋め込む。

1. `lib/markdown.ts` … gray-matter → remark(gfm) → rehype(**sanitize**) → HTML文字列。
   sanitize工程があるため、Markdown中の生HTMLは落とされる。
2. `lib/content-schema.ts` … 全フロントマターをzodで検証。不正なら `ContentSchemaError` を投げて**ビルドを失敗させる**（サイレントスキップしない）。
   新しいフロントマター項目を足す場合は必ずここのスキーマを先に更新する。
3. `lib/articles.ts` / `hero-slides.ts` … ディレクトリ走査とソート。記事は `date` 降順。

コンテンツの所在:
- 記事: `content/ja/articles/<category>/<slug>.md`
  カテゴリは `lib/content-types.ts` の `ARTICLE_CATEGORIES`（news / statement / amendment / record / press-release）に固定。
  追加時は `ARTICLE_CATEGORIES` と `CATEGORY_LABELS` の両方を更新する。
- 憲章: `content/ja/charter/charter.md`
- 組織概要: `content/ja/about/organization.md`
- 入学案内: `content/ja/admissions/how-to-join.md`
- ポリシー: `content/ja/policies/{privacy,site-policy,accessibility}.md`（スラッグは `app/ja/policies/[slug]/page.tsx` にハードコード）
- ヒーロー: `content/ja/hero-slides.json`（`image` は `/images/` 配下のみ許可。`linkUrl` は検証されないので綴りに注意）

**公開制御の仕組みは無い。** `content/ja/` に置いたものは即座に全て公開される。下書きはリポジトリ外で管理すること。

### basePath（GitHub Pages対応）
本番は `/website` 配下で配信されるため、パス連結を素で書かない。

- 内部リンクは `next/link` の `<Link>` を使う。**生の `<a href="/ja/...">` は basePath が付かず本番でリンク切れになる**
- 画像等のアセットは `lib/paths.ts` の `withBasePath()`
- 絶対URLは `canonicalUrl()`
- クライアント時は `lib/client-base-path.ts` の `getClientBasePath()`（`BasePathScript` が埋めた値を読む）

`next.config.ts` と `lib/site-config.ts` は `GITHUB_ACTIONS` / `GITHUB_REPOSITORY` からbasePathを導出する。ローカルで本番同等を確認するには環境変数 `GITHUB_ACTIONS=1 GITHUB_REPOSITORY=x/website` を付けてビルドする。
`trailingSlash: true` のため、内部リンクは必ず末尾スラッシュ付きにする。

### サイト内検索（Pagefind）
- `npm run build` の postbuild が `out/pagefind/` にインデックスを生成する。デプロイ対象は `out/` なので**これで完結する。手動コミットは不要**
- CIワークフローは `npm run build` を呼ぶこと。`next build` を直接呼ぶと postbuild が走らずインデックスが生成されない
- 索引対象は root `layout.tsx` の `data-pagefind-body`。索引から外したい要素には `data-pagefind-ignore`
- `lib/pagefind-client.ts` の `rankedSearch()` は複数語クエリを語ごとに検索し、一致語数→スコアの順で並べ替える独自ロジック
- dev サーバーでは検索は動かない（インデックスが存在しないため「本番ビルド後に利用できます」と表示される）

### UI文言
ハードコードせず `lib/ui-text.ts` の `text` に追加する。

### メタデータ
root `layout.tsx` の `title.template` が `%s | 音楽ゲーム学園` を付ける。各ページの `title` には**サイト名を含めない**。

### import規約
`@/*` はリポジトリルート。したがって `@/src/lib/...` `@/src/components/...` と書く（`@/lib/...` ではない）。

## デザイン方針
- **トーン**: 濃紫/濃紺ベース（純黒不使用）、ネオンカラー（ピンク・シアン・紫）アクセント。
  色は `src/styles/globals.css` の `@theme` トークン（`--color-bg-page`, `--color-accent-pink` 等）を使い、生の16進値を書かない。
- **装飾レベルの強弱**:
  - ヒーロースライダー・UIホバー時: **強め**（グラデーション、光彩）
  - 学園憲章・記事本文: **最小限**（可読性重視、無地に近い背景）
- **ページ枠**: 各ページの最上位コンテナは `.content-surface p-6` で包む。全ページで統一すること。
- **制約**: 絵文字、`▸` `→` `//` 等の記号装飾は一切使用しない（コンテンツ・UI文言・ナビゲーションともに）。

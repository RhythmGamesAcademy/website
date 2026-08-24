import fs from 'fs';
import path from 'path';
import { parseMarkdownFile, readFrontmatter } from './markdown';
import { Article, ARTICLE_CATEGORIES, ArticleCategory, isArticleCategory } from './content-types';
import { ArticleFrontmatter, articleFrontmatterSchema, parseOrThrow } from './content-schema';

const ARTICLES_DIRECTORY = path.join(process.cwd(), 'content', 'ja', 'articles');

const moduleLoadedAt = Date.now();

/**
 * 公開判定の基準時刻。
 *
 * 静的エクスポートのため、公開判定はビルド時にしか行えない。1回のビルドの途中で
 * 基準がぶれると「一覧には出るがページが無い」といった食い違いが起きうるので、
 * 本番ビルドではモジュール読み込み時の時刻に固定する。
 *
 * dev サーバーはプロセスが長時間生き続けるため、固定すると公開時刻を過ぎても
 * 記事が現れない。dev だけは都度現在時刻を見る。
 */
function referenceTime(): number {
  return process.env.NODE_ENV === 'development' ? Date.now() : moduleLoadedAt;
}

/** publish を省略した記事は公開済みとして扱う（publish 導入前の記事のため）。 */
function isPublished(frontmatter: ArticleFrontmatter, now: number): boolean {
  if (!frontmatter.publish) return true;
  return Date.parse(frontmatter.publish) <= now;
}

/** 並び順の基準。publish があればその時刻、無ければ date の当日0時（日本時間）。 */
function publishOrder(frontmatter: ArticleFrontmatter): number {
  return Date.parse(frontmatter.publish ?? `${frontmatter.date}T00:00:00+09:00`);
}

interface ArticleFile {
  category: ArticleCategory;
  slug: string;
  fullPath: string;
  frontmatter: ArticleFrontmatter;
}

/**
 * 公開済み記事のファイル一覧（publish の新しい順）。
 *
 * 記事の所在を知る経路をこの関数一本に絞ってあるので、一覧・詳細・スラッグ列挙の
 * どれを通っても未公開記事は同じように現れない。frontmatter は未公開分も含めて
 * 全て検証するため、予約投稿の記事に不正な値があればその場でビルドが落ちる。
 */
function readPublishedArticleFiles(): ArticleFile[] {
  const now = referenceTime();
  const files: ArticleFile[] = [];

  for (const category of ARTICLE_CATEGORIES) {
    const categoryPath = path.join(ARTICLES_DIRECTORY, category);
    if (!fs.existsSync(categoryPath)) continue;

    for (const fileName of fs.readdirSync(categoryPath)) {
      if (!fileName.endsWith('.md')) continue;

      const fullPath = path.join(categoryPath, fileName);
      const frontmatter = parseOrThrow(
        articleFrontmatterSchema,
        readFrontmatter(fullPath),
        fullPath
      );
      if (!isPublished(frontmatter, now)) continue;

      files.push({
        category,
        slug: fileName.replace(/\.md$/, ''),
        fullPath,
        frontmatter,
      });
    }
  }

  return files.sort((a, b) => publishOrder(b.frontmatter) - publishOrder(a.frontmatter));
}

async function toArticle(file: ArticleFile): Promise<Article> {
  const { contentHtml } = await parseMarkdownFile(file.fullPath);
  const { title, date, publish, excerpt } = file.frontmatter;

  return {
    slug: file.slug,
    title,
    date,
    publish,
    displayDate: publish ? publish.slice(0, 10) : date,
    category: file.category,
    excerpt,
    content: contentHtml,
  };
}

export async function getAllArticles(): Promise<Article[]> {
  return Promise.all(readPublishedArticleFiles().map(toArticle));
}

export async function getArticlesByCategory(category: ArticleCategory): Promise<Article[]> {
  const allArticles = await getAllArticles();
  return allArticles.filter((article) => article.category === category);
}

export async function getArticle(category: string, slug: string): Promise<Article | null> {
  if (!isArticleCategory(category)) return null;

  const file = readPublishedArticleFiles().find(
    (candidate) => candidate.category === category && candidate.slug === slug
  );
  if (!file) return null;

  return toArticle(file);
}

/**
 * Maps "<category>/<slug>" to the article title, for breadcrumb labels.
 */
export async function getArticleTitleMap(): Promise<Record<string, string>> {
  const map: Record<string, string> = {};
  for (const article of await getAllArticles()) {
    map[`${article.category}/${article.slug}`] = article.title;
  }
  return map;
}

/**
 * 公開済み記事のスラッグ一覧。generateStaticParams と sitemap.ts が使う。
 *
 * frontmatter の読み取りは同期処理で足りるため、この関数は同期のままにしてある。
 * 呼び出し側（generateStaticParams・sitemap）に非同期化の波及は無い。
 */
export function getAllArticleSlugs(): Array<{ category: ArticleCategory; slug: string }> {
  return readPublishedArticleFiles().map(({ category, slug }) => ({ category, slug }));
}

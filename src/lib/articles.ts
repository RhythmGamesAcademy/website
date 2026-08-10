import fs from 'fs';
import path from 'path';
import { parseMarkdownFile } from './markdown';
import { Article, ARTICLE_CATEGORIES, ArticleCategory, isArticleCategory } from './content-types';
import { articleFrontmatterSchema, parseOrThrow } from './content-schema';

const ARTICLES_DIRECTORY = path.join(process.cwd(), 'content', 'ja', 'articles');

export async function getAllArticles(): Promise<Article[]> {
  const allArticles: Article[] = [];

  for (const category of ARTICLE_CATEGORIES) {
    const categoryPath = path.join(ARTICLES_DIRECTORY, category);
    if (!fs.existsSync(categoryPath)) continue;

    for (const fileName of fs.readdirSync(categoryPath)) {
      if (!fileName.endsWith('.md')) continue;

      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(categoryPath, fileName);
      const { frontmatter, contentHtml } = await parseMarkdownFile(fullPath);
      const parsed = parseOrThrow(articleFrontmatterSchema, frontmatter, fullPath);

      allArticles.push({
        slug,
        title: parsed.title,
        date: parsed.date,
        category,
        excerpt: parsed.excerpt,
        content: contentHtml,
      });
    }
  }

  return allArticles.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getArticlesByCategory(category: ArticleCategory): Promise<Article[]> {
  const allArticles = await getAllArticles();
  return allArticles.filter((article) => article.category === category);
}

export async function getArticle(category: string, slug: string): Promise<Article | null> {
  if (!isArticleCategory(category)) return null;

  const fullPath = path.join(ARTICLES_DIRECTORY, category, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const { frontmatter, contentHtml } = await parseMarkdownFile(fullPath);
  const parsed = parseOrThrow(articleFrontmatterSchema, frontmatter, fullPath);

  return {
    slug,
    title: parsed.title,
    date: parsed.date,
    category,
    excerpt: parsed.excerpt,
    content: contentHtml,
  };
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

export function getAllArticleSlugs(): Array<{ category: ArticleCategory; slug: string }> {
  const result: Array<{ category: ArticleCategory; slug: string }> = [];

  for (const category of ARTICLE_CATEGORIES) {
    const categoryPath = path.join(ARTICLES_DIRECTORY, category);
    if (!fs.existsSync(categoryPath)) continue;

    for (const fileName of fs.readdirSync(categoryPath)) {
      if (!fileName.endsWith('.md')) continue;
      result.push({ category, slug: fileName.replace(/\.md$/, '') });
    }
  }

  return result;
}

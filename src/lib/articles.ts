import fs from 'fs';
import path from 'path';
import { parseMarkdownFile } from './markdown';
import { Article, ArticleCategory } from './content-types';
import { articleFrontmatterSchema } from './content-schema';
import { Locale } from './i18n-config';

function getArticlesDirectory(locale: Locale): string {
  return path.join(process.cwd(), 'content', locale, 'articles');
}

const CATEGORIES: ArticleCategory[] = ['amendments', 'statements', 'admissions', 'news'];

export async function getAllArticles(locale: Locale = 'ja'): Promise<Article[]> {
  const articlesDirectory = getArticlesDirectory(locale);
  let allArticles: Article[] = [];

  for (const category of CATEGORIES) {
    const categoryPath = path.join(articlesDirectory, category);
    if (!fs.existsSync(categoryPath)) continue;

    const fileNames = fs.readdirSync(categoryPath);
    for (const fileName of fileNames) {
      if (!fileName.endsWith('.md')) continue;

      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(categoryPath, fileName);
      const { frontmatter, contentHtml } = await parseMarkdownFile(fullPath);

      const parsed = articleFrontmatterSchema.safeParse(frontmatter);
      if (!parsed.success) {
        console.warn(`[articles] Invalid frontmatter in ${fullPath}:`, parsed.error.flatten());
        continue;
      }

      allArticles.push({
        slug,
        title: parsed.data.title,
        date: parsed.data.date,
        category: category as ArticleCategory,
        excerpt: parsed.data.excerpt,
        content: contentHtml,
      });
    }
  }

  return allArticles.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getArticlesByCategory(
  category: ArticleCategory,
  locale: Locale = 'ja'
): Promise<Article[]> {
  const allArticles = await getAllArticles(locale);
  return allArticles.filter((article) => article.category === category);
}

export async function getArticle(
  category: string,
  slug: string,
  locale: Locale = 'ja'
): Promise<Article | null> {
  const articlesDirectory = getArticlesDirectory(locale);
  const fullPath = path.join(articlesDirectory, category, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const { frontmatter, contentHtml } = await parseMarkdownFile(fullPath);
  const parsed = articleFrontmatterSchema.safeParse(frontmatter);
  if (!parsed.success) {
    console.warn(`[articles] Invalid frontmatter in ${fullPath}:`, parsed.error.flatten());
    return null;
  }

  return {
    slug,
    title: parsed.data.title,
    date: parsed.data.date,
    category: category as ArticleCategory,
    excerpt: parsed.data.excerpt,
    content: contentHtml,
  };
}

export async function getAllArticleSlugs(
  locale: Locale = 'ja'
): Promise<Array<{ category: string; slug: string }>> {
  const articlesDirectory = getArticlesDirectory(locale);
  const result: Array<{ category: string; slug: string }> = [];

  for (const category of CATEGORIES) {
    const categoryPath = path.join(articlesDirectory, category);
    if (!fs.existsSync(categoryPath)) continue;
    const fileNames = fs.readdirSync(categoryPath);
    for (const fileName of fileNames) {
      if (!fileName.endsWith('.md')) continue;
      result.push({ category, slug: fileName.replace(/\.md$/, '') });
    }
  }
  return result;
}

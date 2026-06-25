import fs from 'fs';
import path from 'path';
import { parseMarkdownFile } from './markdown';
import { Article, ARTICLE_CATEGORIES, ArticleCategory, isArticleCategory } from './content-types';
import { articleFrontmatterSchema, parseOrThrow } from './content-schema';
import { Locale } from './i18n-config';

function getArticlesDirectory(locale: Locale): string {
  return path.join(process.cwd(), 'content', locale, 'articles');
}

function isPublishedArticle(translationStatus: string): boolean {
  return translationStatus === 'published';
}

export async function getAllArticles(
  locale: Locale = 'ja',
  options: { includeUnpublished?: boolean } = {}
): Promise<Article[]> {
  const { includeUnpublished = false } = options;
  const articlesDirectory = getArticlesDirectory(locale);
  const allArticles: Article[] = [];

  for (const category of ARTICLE_CATEGORIES) {
    const categoryPath = path.join(articlesDirectory, category);
    if (!fs.existsSync(categoryPath)) continue;

    const fileNames = fs.readdirSync(categoryPath);
    for (const fileName of fileNames) {
      if (!fileName.endsWith('.md')) continue;

      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(categoryPath, fileName);
      const { frontmatter, contentHtml } = await parseMarkdownFile(fullPath);
      const parsed = parseOrThrow(articleFrontmatterSchema, frontmatter, fullPath);

      if (!includeUnpublished && !isPublishedArticle(parsed.translationStatus)) {
        continue;
      }

      allArticles.push({
        slug,
        title: parsed.title,
        date: parsed.date,
        category,
        excerpt: parsed.excerpt,
        content: contentHtml,
        translationStatus: parsed.translationStatus,
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
  if (!isArticleCategory(category)) {
    return null;
  }

  const articlesDirectory = getArticlesDirectory(locale);
  const fullPath = path.join(articlesDirectory, category, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const { frontmatter, contentHtml } = await parseMarkdownFile(fullPath);
  const parsed = parseOrThrow(articleFrontmatterSchema, frontmatter, fullPath);

  if (!isPublishedArticle(parsed.translationStatus)) {
    return null;
  }

  return {
    slug,
    title: parsed.title,
    date: parsed.date,
    category,
    excerpt: parsed.excerpt,
    content: contentHtml,
    translationStatus: parsed.translationStatus,
  };
}

export async function getAllArticleSlugs(
  locale: Locale = 'ja',
  options: { publishedOnly?: boolean } = {}
): Promise<Array<{ category: string; slug: string }>> {
  const { publishedOnly = true } = options;
  const articlesDirectory = getArticlesDirectory(locale);
  const result: Array<{ category: string; slug: string }> = [];

  for (const category of ARTICLE_CATEGORIES) {
    const categoryPath = path.join(articlesDirectory, category);
    if (!fs.existsSync(categoryPath)) continue;
    const fileNames = fs.readdirSync(categoryPath);
    for (const fileName of fileNames) {
      if (!fileName.endsWith('.md')) continue;

      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(categoryPath, fileName);

      if (publishedOnly) {
        const { frontmatter } = await parseMarkdownFile(fullPath);
        const parsed = parseOrThrow(articleFrontmatterSchema, frontmatter, fullPath);
        if (!isPublishedArticle(parsed.translationStatus)) {
          continue;
        }
      }

      result.push({ category, slug });
    }
  }
  return result;
}

export async function getArticleTranslationStatus(
  category: string,
  slug: string,
  locale: Locale
): Promise<'published' | 'draft' | 'placeholder' | 'missing'> {
  if (!isArticleCategory(category)) {
    return 'missing';
  }

  const fullPath = path.join(getArticlesDirectory(locale), category, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return 'missing';

  const { frontmatter } = await parseMarkdownFile(fullPath);
  const parsed = parseOrThrow(articleFrontmatterSchema, frontmatter, fullPath);
  return parsed.translationStatus;
}

import fs from 'fs';
import path from 'path';
import { parseMarkdownFile } from './markdown';
import { Article, ArticleCategory } from './content-types';

const articlesDirectory = path.join(process.cwd(), 'content', 'articles');

export async function getAllArticles(): Promise<Article[]> {
  const categories = ['amendments', 'statements', 'admissions', 'news'];
  let allArticles: Article[] = [];

  for (const category of categories) {
    const categoryPath = path.join(articlesDirectory, category);
    if (!fs.existsSync(categoryPath)) continue;

    const fileNames = fs.readdirSync(categoryPath);
    for (const fileName of fileNames) {
      if (!fileName.endsWith('.md')) continue;
      
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(categoryPath, fileName);
      const { frontmatter, contentHtml } = await parseMarkdownFile(fullPath);

      allArticles.push({
        slug,
        title: frontmatter.title || '無題',
        date: frontmatter.date || '1970-01-01',
        category: category as ArticleCategory,
        excerpt: frontmatter.excerpt || '',
        content: contentHtml,
      });
    }
  }

  // Sort articles by date
  return allArticles.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getArticlesByCategory(category: ArticleCategory): Promise<Article[]> {
  const allArticles = await getAllArticles();
  return allArticles.filter(article => article.category === category);
}

export async function getArticle(category: string, slug: string): Promise<Article | null> {
  const fullPath = path.join(articlesDirectory, category, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const { frontmatter, contentHtml } = await parseMarkdownFile(fullPath);
  
  return {
    slug,
    title: frontmatter.title || '無題',
    date: frontmatter.date || '1970-01-01',
    category: category as ArticleCategory,
    excerpt: frontmatter.excerpt || '',
    content: contentHtml,
  };
}

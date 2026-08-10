import { notFound } from 'next/navigation';
import { getArticle, getAllArticleSlugs } from '@/src/lib/articles';
import { formatArticleDate, CATEGORY_LABELS, isArticleCategory } from '@/src/lib/content-types';
import { canonicalUrl } from '@/src/lib/paths';
import type { Metadata } from 'next';

interface ArticlePageProps {
  params: Promise<{ category: string; slug: string }>;
}

export function generateStaticParams() {
  return getAllArticleSlugs();
}

export const dynamicParams = false;

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const article = await getArticle(category, slug);
  if (!article) return { title: '404' };

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: canonicalUrl(`/articles/${category}/${slug}`),
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.date,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { category, slug } = await params;

  if (!isArticleCategory(category)) {
    notFound();
  }

  const article = await getArticle(category, slug);
  if (!article) notFound();

  return (
    <div className="container px-4 py-12 mx-auto md:px-6 max-w-3xl">
      <div className="content-surface p-6">
        <div className="mb-4">
          <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-accent-purple)]">
            {CATEGORY_LABELS[article.category]}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
          {article.title}
        </h1>
        <p className="text-sm text-[var(--color-text-muted)] mb-8">
          <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
        </p>
        <article
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </div>
  );
}

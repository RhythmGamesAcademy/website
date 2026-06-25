import { notFound } from 'next/navigation';
import { locales, Locale } from '@/src/lib/i18n-config';
import { getArticle, getAllArticleSlugs } from '@/src/lib/articles';
import {
  formatArticleDate,
  getCategoryLabels,
  isArticleCategory,
} from '@/src/lib/content-types';
import { canonicalUrl } from '@/src/lib/paths';
import type { Metadata } from 'next';

interface ArticlePageProps {
  params: Promise<{ locale: string; category: string; slug: string }>;
}

export async function generateStaticParams() {
  const result = [];
  for (const locale of locales) {
    const slugs = await getAllArticleSlugs(locale, { publishedOnly: true });
    for (const { category, slug } of slugs) {
      result.push({ locale, category, slug });
    }
  }
  return result;
}

export const dynamicParams = false;

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { locale, category, slug } = await params;
  const safeLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : 'ja';
  const article = await getArticle(category, slug, safeLocale);
  if (!article) return { title: '404 | 音楽ゲーム学園' };

  const alternateLocale: Locale = safeLocale === 'ja' ? 'en' : 'ja';
  const alternateArticle = await getArticle(category, slug, alternateLocale);

  return {
    title: `${article.title} | 音楽ゲーム学園`,
    description: article.excerpt,
    alternates: {
      canonical: canonicalUrl(safeLocale, `/articles/${category}/${slug}`),
      languages: alternateArticle
        ? {
            [alternateLocale]: canonicalUrl(
              alternateLocale,
              `/articles/${category}/${slug}`
            ),
          }
        : undefined,
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
  const { locale, category, slug } = await params;
  const safeLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : 'ja';

  if (!isArticleCategory(category)) {
    notFound();
  }

  const article = await getArticle(category, slug, safeLocale);
  if (!article) notFound();

  const categoryLabels = getCategoryLabels(safeLocale);

  return (
    <div className="container px-4 py-12 mx-auto md:px-6 max-w-3xl">
      <div className="mb-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-accent-purple)]">
          {categoryLabels[article.category]}
        </span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
        {article.title}
      </h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-8">
        <time dateTime={article.date}>{formatArticleDate(article.date, safeLocale)}</time>
      </p>
      <article
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  );
}

import { notFound } from 'next/navigation';
import { locales, Locale } from '@/src/lib/i18n-config';
import { getArticle, getAllArticleSlugs } from '@/src/lib/articles';
import { ArticleCategory, categoryLabels } from '@/src/lib/content-types';
import type { Metadata } from 'next';

interface ArticlePageProps {
  params: Promise<{ locale: string; category: string; slug: string }>;
}

export async function generateStaticParams() {
  const result = [];
  for (const locale of locales) {
    const slugs = await getAllArticleSlugs(locale);
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
  return {
    title: `${article.title} | 音楽ゲーム学園`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { locale, category, slug } = await params;
  const safeLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : 'ja';
  const article = await getArticle(category, slug, safeLocale);

  if (!article) notFound();

  const categoryLabel = categoryLabels[category as ArticleCategory] ?? category;

  return (
    <div className="container px-4 py-12 mx-auto md:px-6 max-w-3xl">
      <div className="mb-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-accent-purple)]">
          {categoryLabel}
        </span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
        {article.title}
      </h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-8">{article.date}</p>
      <article
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  );
}

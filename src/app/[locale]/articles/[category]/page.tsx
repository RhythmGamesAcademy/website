import { locales, Locale } from '@/src/lib/i18n-config';
import { getArticlesByCategory, getAllArticleSlugs } from '@/src/lib/articles';
import ArticleList from '@/src/components/ArticleList';
import { getCategoryLabels, isArticleCategory } from '@/src/lib/content-types';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface CategoryPageProps {
  params: Promise<{ locale: string; category: string }>;
}

export async function generateStaticParams() {
  const result = [];
  for (const locale of locales) {
    const slugs = await getAllArticleSlugs(locale, { publishedOnly: false });
    const categories = [...new Set(slugs.map((s) => s.category))];
    for (const category of categories) {
      result.push({ locale, category });
    }
  }
  return result;
}

export const dynamicParams = false;

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { locale, category } = await params;
  const safeLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : 'ja';
  if (!isArticleCategory(category)) return { title: '404 | 音楽ゲーム学園' };
  const labels = getCategoryLabels(safeLocale);
  return { title: `${labels[category]} | 音楽ゲーム学園` };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { locale, category } = await params;
  const safeLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : 'ja';

  if (!isArticleCategory(category)) {
    notFound();
  }

  const articles = await getArticlesByCategory(category, safeLocale, { includePlaceholders: true });
  const labels = getCategoryLabels(safeLocale);

  return (
    <div className="container px-4 py-12 mx-auto md:px-6">
      <h1 className="mb-8 text-4xl font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-4">
        {labels[category]}
      </h1>
      <ArticleList articles={articles} locale={safeLocale} />
    </div>
  );
}

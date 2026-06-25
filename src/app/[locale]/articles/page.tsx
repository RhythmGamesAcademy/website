import { locales, Locale } from '@/src/lib/i18n-config';
import { getAllArticles } from '@/src/lib/articles';
import { getDictionary } from '@/src/lib/get-dictionary';
import ArticleList from '@/src/components/ArticleList';
import type { Metadata } from 'next';

interface ArticlesPageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: ArticlesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : 'ja';
  const dict = getDictionary(safeLocale);
  return {
    title: `${dict.nav.articles} | 音楽ゲーム学園`,
  };
}

export default async function ArticlesPage({ params }: ArticlesPageProps) {
  const { locale } = await params;
  const safeLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : 'ja';
  const dict = getDictionary(safeLocale);
  const articles = await getAllArticles(safeLocale, { includePlaceholders: true });

  return (
    <div className="container px-4 py-12 mx-auto md:px-6">
      <div className="content-surface p-6">
        <h1 className="mb-8 text-4xl font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-4">
          {dict.nav.articles}
        </h1>
        <ArticleList articles={articles} locale={safeLocale} />
      </div>
    </div>
  );
}

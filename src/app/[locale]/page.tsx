import { locales, Locale } from '@/src/lib/i18n-config';
import { getHeroSlides } from '@/src/lib/hero-slides';
import { getAllArticles } from '@/src/lib/articles';
import { getDictionary } from '@/src/lib/getDictionary';
import { localizedPath } from '@/src/lib/paths';
import HeroSlider from '@/src/components/HeroSlider';
import ArticleList from '@/src/components/ArticleList';
import Link from 'next/link';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export default async function LocaleHomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const safeLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : 'ja';

  const slides = getHeroSlides(safeLocale);
  const articles = await getAllArticles(safeLocale);
  const dict = getDictionary(safeLocale);

  // Show only top 6 recent articles
  const recentArticles = articles.slice(0, 6);

  return (
    <div className="container px-4 mx-auto md:px-6 py-8">
      {slides.length > 0 && (
        <section className="mb-16" aria-label="ヒーロースライダー">
          <HeroSlider slides={slides} />
        </section>
      )}

      <section aria-labelledby="recent-articles-heading">
        <div className="flex items-center justify-between mb-8 border-b border-[var(--color-border)] pb-4">
          <h2 id="recent-articles-heading" className="text-2xl font-bold text-[var(--color-text-primary)]">
            {safeLocale === 'ja' ? '最新のノーツ' : 'Latest Notes'}
          </h2>
          <Link
            href={localizedPath(safeLocale, '/articles')}
            className="text-sm text-[var(--color-accent-cyan)] hover:text-[var(--color-accent-pink)] transition-colors underline underline-offset-4"
          >
            {safeLocale === 'ja' ? 'すべて見る' : 'View all'}
          </Link>
        </div>
        <ArticleList articles={recentArticles} />
      </section>
    </div>
  );
}

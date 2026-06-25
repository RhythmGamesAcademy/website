import { TranslationStatus } from './content-schema';
import { Locale } from './i18n-config';

export type ArticleCategory = 'amendments' | 'statements' | 'admissions' | 'news';

export const ARTICLE_CATEGORIES: ArticleCategory[] = [
  'amendments',
  'statements',
  'admissions',
  'news',
];

export function isArticleCategory(value: string): value is ArticleCategory {
  return (ARTICLE_CATEGORIES as string[]).includes(value);
}

export interface Article {
  slug: string;
  title: string;
  date: string;
  category: ArticleCategory;
  excerpt: string;
  content: string;
  translationStatus: TranslationStatus;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  linkUrl: string;
  order: number;
  alt: string;
  decorative: boolean;
}

export function getCategoryLabels(locale: Locale): Record<ArticleCategory, string> {
  const labels: Record<Locale, Record<ArticleCategory, string>> = {
    ja: {
      amendments: '規則改正',
      statements: '声明',
      admissions: '入学案内',
      news: 'お知らせ',
    },
    en: {
      amendments: 'Amendments',
      statements: 'Statements',
      admissions: 'Admissions',
      news: 'News',
    },
  };
  return labels[locale];
}

export function formatArticleDate(date: string, locale: Locale): string {
  const [year, month, day] = date.split('-').map(Number);
  const parsed = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat(locale === 'ja' ? 'ja-JP' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(parsed);
}

import { TranslationStatus } from './content-schema';
import { Locale } from './i18n-config';

export type ArticleCategory = 'news' | 'statement' | 'amendment' | 'record' | 'press-release';

export const ARTICLE_CATEGORIES: ArticleCategory[] = [
  'news',
  'statement',
  'amendment',
  'record',
  'press-release',
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
      news: 'お知らせ',
      statement: '声明',
      amendment: '規則改正',
      record: '活動記録',
      'press-release': 'プレスリリース',
    },
    en: {
      news: 'News',
      statement: 'Statement',
      amendment: 'Amendment',
      record: 'Activity Record',
      'press-release': 'Press Release',
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

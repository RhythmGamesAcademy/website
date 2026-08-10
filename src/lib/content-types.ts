export type ArticleCategory = 'news' | 'statement' | 'amendment' | 'record' | 'press-release';

export const ARTICLE_CATEGORIES: ArticleCategory[] = [
  'news',
  'statement',
  'amendment',
  'record',
  'press-release',
];

export const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  news: 'お知らせ',
  statement: '声明',
  amendment: '規則改正',
  record: '活動記録',
  'press-release': 'プレスリリース',
};

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

const dateFormatter = new Intl.DateTimeFormat('ja-JP', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export function formatArticleDate(date: string): string {
  const [year, month, day] = date.split('-').map(Number);
  return dateFormatter.format(new Date(year, month - 1, day));
}

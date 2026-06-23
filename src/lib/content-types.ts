export type ArticleCategory = 'amendments' | 'statements' | 'admissions' | 'news';

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
}

export const categoryLabels: Record<ArticleCategory, string> = {
  amendments: '規則改正',
  statements: '声明',
  admissions: '入学案内',
  news: 'お知らせ',
};

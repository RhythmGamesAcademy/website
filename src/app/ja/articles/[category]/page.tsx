import { notFound } from 'next/navigation';
import { getArticlesByCategory, getAllArticleSlugs } from '@/src/lib/articles';
import { CATEGORY_LABELS, isArticleCategory } from '@/src/lib/content-types';
import ArticleList from '@/src/components/ArticleList';
import type { Metadata } from 'next';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  const categories = [...new Set(getAllArticleSlugs().map((s) => s.category))];
  return categories.map((category) => ({ category }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  if (!isArticleCategory(category)) return { title: '404' };
  return { title: CATEGORY_LABELS[category] };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  if (!isArticleCategory(category)) {
    notFound();
  }

  const articles = await getArticlesByCategory(category);

  return (
    <div className="container px-4 py-12 mx-auto md:px-6">
      <div className="content-surface p-6">
        <h1 className="mb-8 text-4xl font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-4">
          {CATEGORY_LABELS[category]}
        </h1>
        <ArticleList articles={articles} />
      </div>
    </div>
  );
}

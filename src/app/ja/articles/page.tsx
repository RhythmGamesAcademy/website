import { getAllArticles } from '@/src/lib/articles';
import { text } from '@/src/lib/ui-text';
import ArticleList from '@/src/components/ArticleList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: text.nav.articles,
};

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <div className="container px-4 py-12 mx-auto md:px-6">
      <div className="content-surface p-6">
        <h1 className="mb-8 text-4xl font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-4">
          {text.nav.articles}
        </h1>
        <ArticleList articles={articles} />
      </div>
    </div>
  );
}

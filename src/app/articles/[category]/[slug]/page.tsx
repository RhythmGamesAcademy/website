import { notFound } from 'next/navigation';
import { getAllArticles, getArticle } from '@/src/lib/articles';
import CategoryBadge from '@/src/components/ui/CategoryBadge';
import { ArticleCategory } from '@/src/lib/content-types';

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({
    category: article.category,
    slug: article.slug,
  }));
}

export default async function ArticlePage(props: { params: Promise<{ category: string; slug: string }> }) {
  const params = await props.params;
  const article = await getArticle(params.category, params.slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="container max-w-4xl px-4 py-12 mx-auto md:px-6 decoration-minimal">
      <header className="mb-10 text-center">
        <div className="mb-4">
          <CategoryBadge category={article.category as ArticleCategory} />
        </div>
        <h1 className="mb-4 text-3xl md:text-5xl font-bold text-text-primary">
          {article.title}
        </h1>
        <time className="text-text-secondary" dateTime={article.date}>
          {article.date}
        </time>
      </header>
      
      <div 
        className="markdown-body p-8 md:p-12 bg-bg-surface rounded-lg border border-gray-800"
        dangerouslySetInnerHTML={{ __html: article.content }} 
      />
    </article>
  );
}

import { Article } from '@/src/lib/content-types';
import ArticleCard from './ArticleCard';

export default function ArticleList({ articles }: { articles: Article[] }) {
  if (articles.length === 0) {
    return <div className="py-10 text-center text-text-secondary">記事がありません。</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={`${article.category}-${article.slug}`} article={article} />
      ))}
    </div>
  );
}

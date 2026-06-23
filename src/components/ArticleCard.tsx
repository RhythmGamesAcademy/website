import Link from 'next/link';
import { Article } from '@/src/lib/content-types';
import CategoryBadge from './ui/CategoryBadge';

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/articles/${article.category}/${article.slug}`}>
      <div className="flex flex-col h-full p-5 transition-all duration-300 border border-gray-800 bg-bg-surface rounded-md hover:-translate-y-1 hover:border-accent-purple box-glow-purple group">
        <div className="flex items-center justify-between mb-3">
          <CategoryBadge category={article.category} />
          <time className="text-sm text-text-secondary" dateTime={article.date}>
            {article.date}
          </time>
        </div>
        <h3 className="mb-2 text-xl font-bold text-text-primary group-hover:text-accent-cyan transition-colors">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="text-sm text-text-secondary line-clamp-3 mt-auto">
            {article.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}

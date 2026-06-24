import Link from 'next/link';
import { Article } from '@/src/lib/content-types';
import CategoryBadge from './ui/CategoryBadge';

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/ja/articles/${article.category}/${article.slug}/`}>
      <div className="flex flex-col h-full p-5 transition-all duration-200 border border-[var(--color-border)] bg-[var(--color-bg-surface)] rounded-xl hover:-translate-y-1 hover:border-[var(--color-accent-lavender)] hover:shadow-md group">
        <div className="flex items-center justify-between mb-3">
          <CategoryBadge category={article.category} />
          <time
            className="text-xs text-[var(--color-text-muted)]"
            dateTime={article.date}
          >
            {article.date}
          </time>
        </div>
        <h3 className="mb-2 text-base font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-purple)] transition-colors leading-snug">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="text-sm text-[var(--color-text-secondary)] line-clamp-3 mt-auto leading-relaxed">
            {article.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}

import Link from 'next/link';
import { Article, formatArticleDate } from '@/src/lib/content-types';
import { Locale } from '@/src/lib/i18n-config';
import { localizedPath } from '@/src/lib/paths';
import CategoryBadge from './ui/CategoryBadge';

export default function ArticleCard({
  article,
  locale,
}: {
  article: Article;
  locale: Locale;
}) {
  return (
    <Link href={localizedPath(locale, `/articles/${article.category}/${article.slug}`)}>
      <article className="flex flex-col h-full p-5 border border-[var(--color-border)] bg-[var(--color-bg-surface)] rounded-md transition-colors hover:border-[color-mix(in_srgb,var(--color-accent-purple)_35%,var(--color-border))] group">
        <div className="flex items-center justify-between mb-3">
          <CategoryBadge category={article.category} locale={locale} />
          <time
            className="text-xs text-[var(--color-text-muted)]"
            dateTime={article.date}
          >
            {formatArticleDate(article.date, locale)}
          </time>
        </div>
        <h3 className="mb-2 text-base font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-purple)] transition-colors leading-snug">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="text-sm text-[var(--color-text-secondary)] line-clamp-3 mt-auto leading-relaxed">
            {article.excerpt}
          </p>
        )}
      </article>
    </Link>
  );
}

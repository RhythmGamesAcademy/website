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
    <Link
      href={localizedPath(locale, `/articles/${article.category}/${article.slug}`)}
      className="block rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5 transition-shadow duration-200 hover:shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
    >
      <div className="flex flex-col h-full gap-4">
        <div className="flex items-center justify-between gap-4">
          <CategoryBadge category={article.category} locale={locale} />
          <time
            className="text-xs text-[var(--color-text-muted)]"
            dateTime={article.date}
          >
            {formatArticleDate(article.date, locale)}
          </time>
        </div>
        <div>
          <h3 className="text-lg font-bold text-[var(--color-text-primary)] leading-snug">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="mt-3 text-sm text-[var(--color-text-secondary)] leading-relaxed line-clamp-3">
              {article.excerpt}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

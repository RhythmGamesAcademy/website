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
      className="block py-3 px-4 border-b border-[var(--color-border-subtle)] transition-colors hover:bg-[color-mix(in_srgb,var(--color-bg-elevated)_50%,transparent)]"
    >
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <time
            className="text-xs text-[var(--color-text-muted)] whitespace-nowrap"
            dateTime={article.date}
          >
            {formatArticleDate(article.date, locale)}
          </time>
          <CategoryBadge category={article.category} locale={locale} />
        </div>
        <h3 className="text-base font-medium text-[var(--color-text-primary)] flex-grow">
          {article.title}
        </h3>
      </div>
    </Link>
  );
}

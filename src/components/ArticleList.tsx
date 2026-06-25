import { Article } from '@/src/lib/content-types';
import { Locale } from '@/src/lib/i18n-config';
import { getDictionary } from '@/src/lib/get-dictionary';
import ArticleCard from './ArticleCard';

export default function ArticleList({
  articles,
  locale,
}: {
  articles: Article[];
  locale: Locale;
}) {
  const dict = getDictionary(locale);

  if (articles.length === 0) {
    return (
      <div className="py-10 text-center text-[var(--color-text-secondary)]">
        {dict.articles.empty}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard
          key={`${article.category}-${article.slug}`}
          article={article}
          locale={locale}
        />
      ))}
    </div>
  );
}

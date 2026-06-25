'use client';

import { useMemo, useState } from 'react';
import { Article, ARTICLE_CATEGORIES, getCategoryLabels } from '@/src/lib/content-types';
import { Locale } from '@/src/lib/i18n-config';
import { getDictionary } from '@/src/lib/get-dictionary';
import ArticleCard from './ArticleCard';

const allCategoryKey = 'all';

export default function ArticleList({
  articles,
  locale,
}: {
  articles: Article[];
  locale: Locale;
}) {
  const dict = getDictionary(locale);
  const categoryLabels = getCategoryLabels(locale);
  const categories = [
    allCategoryKey,
    ...ARTICLE_CATEGORIES.filter((category) => category !== 'admissions'),
  ] as const;
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>(allCategoryKey);

  const filteredArticles = useMemo(() => {
    if (selectedCategory === allCategoryKey) return articles;
    return articles.filter((article) => article.category === selectedCategory);
  }, [articles, selectedCategory]);

  if (articles.length === 0) {
    return (
      <div className="py-10 text-center text-[var(--color-text-secondary)]">
        {dict.articles.empty}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-2 border-b border-[var(--color-border)] pb-1">
        {categories.map((category) => {
          const label =
            category === allCategoryKey ? dict.articles.all : categoryLabels[category];
          const isActive = category === selectedCategory;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`border-b-2 pb-3 text-sm font-semibold transition ${
                isActive
                  ? 'border-[var(--color-accent-pink)] text-[var(--color-text-primary)]'
                  : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        {filteredArticles.map((article) => (
          <ArticleCard
            key={`${article.category}-${article.slug}`}
            article={article}
            locale={locale}
          />
        ))}
      </div>
    </div>
  );
}

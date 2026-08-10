'use client';

import { useMemo, useState } from 'react';
import { Article, ARTICLE_CATEGORIES, CATEGORY_LABELS } from '@/src/lib/content-types';
import { text } from '@/src/lib/ui-text';
import ArticleCard from './ArticleCard';

const allCategoryKey = 'all';

export default function ArticleList({ articles }: { articles: Article[] }) {
  const categories = [allCategoryKey, ...ARTICLE_CATEGORIES] as const;
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>(allCategoryKey);

  const filteredArticles = useMemo(() => {
    if (selectedCategory === allCategoryKey) return articles;
    return articles.filter((article) => article.category === selectedCategory);
  }, [articles, selectedCategory]);

  if (articles.length === 0) {
    return (
      <div className="py-10 text-center text-[var(--color-text-secondary)]">
        {text.articles.empty}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-6 border-b border-[var(--color-border)] pb-1">
        {categories.map((category) => {
          const label =
            category === allCategoryKey ? text.articles.all : CATEGORY_LABELS[category];
          const isActive = category === selectedCategory;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`border-b-2 pb-3 px-2 text-base font-semibold transition min-h-12 ${
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

      <div className="space-y-0">
        {filteredArticles.map((article) => (
          <ArticleCard key={`${article.category}-${article.slug}`} article={article} />
        ))}
      </div>
    </div>
  );
}

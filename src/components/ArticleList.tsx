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
      {/* overflow-x はフォーカス枠（outline 2px）も切り落とすため、逃げ場として px/pt を取り、
          同量の負のマージンで打ち消して見た目の位置を保つ。
          区切り線は外側ではなくスクロールする内側の帯に置く。外側に付けると、
          場所を取る種類のスクロールバーがタブの下線と区切り線の間に割り込む。
          狭い画面では gap を詰め、次のタブを端で見切れさせて続きがある事を示す。 */}
      <div className="-mx-1 -mt-1 overflow-x-auto px-1 pt-1">
        <div className="flex w-max min-w-full items-end gap-3 sm:gap-6 border-b border-[var(--color-border)] pb-1">
          {categories.map((category) => {
            const label =
              category === allCategoryKey ? text.articles.all : CATEGORY_LABELS[category];
            const isActive = category === selectedCategory;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                // 一部だけ見えているタブに Tab で移動しても Chrome は自動スクロールしない。
                // scroll-mx-1 の余白ごと引き寄せ、フォーカス枠が端で欠けないようにする。
                onFocus={(event) => event.currentTarget.scrollIntoView({ block: 'nearest', inline: 'nearest' })}
                className={`shrink-0 scroll-mx-1 whitespace-nowrap border-b-2 pb-3 px-2 text-base font-semibold transition min-h-12 ${
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
      </div>

      <div className="space-y-0">
        {filteredArticles.map((article) => (
          <ArticleCard key={`${article.category}-${article.slug}`} article={article} />
        ))}
      </div>
    </div>
  );
}

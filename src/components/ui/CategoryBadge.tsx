import { ArticleCategory, CATEGORY_LABELS } from '@/src/lib/content-types';

const categoryStyles: Record<ArticleCategory, string> = {
  news: 'bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] border border-[var(--color-border)]',
  statement:
    'bg-[color-mix(in_srgb,var(--color-accent-pink)_10%,transparent)] text-[var(--color-accent-pink)] border border-[color-mix(in_srgb,var(--color-accent-pink)_30%,transparent)]',
  amendment:
    'bg-[color-mix(in_srgb,var(--color-accent-cyan)_10%,transparent)] text-[var(--color-accent-cyan)] border border-[color-mix(in_srgb,var(--color-accent-cyan)_30%,transparent)]',
  record:
    'bg-[color-mix(in_srgb,var(--color-accent-purple)_10%,transparent)] text-[var(--color-accent-purple)] border border-[color-mix(in_srgb,var(--color-accent-purple)_30%,transparent)]',
  'press-release':
    'bg-[color-mix(in_srgb,var(--color-accent-purple)_15%,transparent)] text-[var(--color-accent-purple)] border border-[color-mix(in_srgb,var(--color-accent-purple)_40%,transparent)]',
};

export default function CategoryBadge({ category }: { category: ArticleCategory }) {
  return (
    <span
      className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full ${categoryStyles[category]}`}
    >
      {CATEGORY_LABELS[category]}
    </span>
  );
}

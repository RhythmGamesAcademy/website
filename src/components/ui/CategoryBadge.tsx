import { ArticleCategory, categoryLabels } from '@/src/lib/content-types';

export default function CategoryBadge({ category }: { category: ArticleCategory }) {
  let colorClass = '';
  switch (category) {
    case 'amendments':
      colorClass = 'text-cat-amendments border-cat-amendments shadow-[0_0_8px_rgba(0,240,255,0.4)]';
      break;
    case 'statements':
      colorClass = 'text-cat-statements border-cat-statements shadow-[0_0_8px_rgba(255,45,149,0.4)]';
      break;
    case 'admissions':
      colorClass = 'text-cat-admissions border-cat-admissions shadow-[0_0_8px_rgba(180,77,255,0.4)]';
      break;
    case 'news':
      colorClass = 'text-cat-news border-cat-news shadow-[0_0_8px_rgba(232,230,240,0.4)]';
      break;
  }

  return (
    <span className={`inline-block px-2 py-0.5 text-xs font-bold border rounded-sm ${colorClass}`}>
      {categoryLabels[category]}
    </span>
  );
}

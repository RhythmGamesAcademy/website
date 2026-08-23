'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { text } from '@/src/lib/ui-text';
import { ROUTE_LABELS } from '@/src/lib/navigation';
import { sitePath } from '@/src/lib/paths';

interface BreadcrumbsProps {
  /** "<category>/<slug>" to article title, so detail pages show a real title. */
  articleTitles: Record<string, string>;
}

export default function Breadcrumbs({ articleTitles }: BreadcrumbsProps) {
  const pathname = usePathname();

  /** 記事詳細の見出しも ROUTE_LABELS と同じ「ルート → 表示名」の形に揃える。 */
  const articleRouteLabels = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(articleTitles).map(([key, title]) => [
          sitePath(`/articles/${key}`),
          title,
        ])
      ),
    [articleTitles]
  );

  const items = useMemo(() => {
    if (!pathname) return [];
    const segments = pathname.split('/').filter(Boolean);
    // segments[0] is the "ja" route prefix; the section starts at index 1.
    if (segments.length <= 1) return [];

    const crumbs: Array<{ href: string; label: string }> = [
      { href: sitePath('/'), label: text.nav.home },
    ];

    for (let i = 1; i < segments.length; i += 1) {
      const href = sitePath(`/${segments.slice(1, i + 1).join('/')}`);
      const label = ROUTE_LABELS[href] ?? articleRouteLabels[href];
      // 対応表に無い区間は黙って飛ばす。スラッグを整形して見せると
      // "Charter.html" のような英語風の表示が利用者に漏れるため。
      if (!label) continue;
      crumbs.push({ href, label });
    }

    return crumbs.length > 1 ? crumbs : [];
  }, [pathname, articleRouteLabels]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label={text.breadcrumbs.label}
      className="border-b border-[var(--color-border)] bg-[var(--color-bg-surface)]"
      data-pagefind-ignore
    >
      <div className="container px-4 mx-auto md:px-6 py-3 text-sm text-[var(--color-text-muted)]">
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-2">
                {!isLast ? (
                  <Link
                    href={item.href}
                    className="text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-[var(--color-text-primary)] font-medium">
                    {item.label}
                  </span>
                )}
                {!isLast && <span className="text-[var(--color-text-muted)]">/</span>}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

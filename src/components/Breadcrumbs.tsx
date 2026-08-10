'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { text } from '@/src/lib/ui-text';
import { CATEGORY_LABELS } from '@/src/lib/content-types';
import { sitePath } from '@/src/lib/paths';

interface BreadcrumbsProps {
  /** "<category>/<slug>" to article title, so detail pages show a real title. */
  articleTitles: Record<string, string>;
}

function formatSegmentLabel(segment: string) {
  return segment
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function Breadcrumbs({ articleTitles }: BreadcrumbsProps) {
  const pathname = usePathname();

  const items = useMemo(() => {
    if (!pathname) return [];
    const segments = pathname.split('/').filter(Boolean);
    // segments[0] is the "ja" route prefix; the section starts at index 1.
    if (segments.length <= 1) return [];

    const crumbs: Array<{ href: string; label: string }> = [
      { href: sitePath('/'), label: text.nav.home },
    ];

    const section = segments[1];
    switch (section) {
      case 'articles': {
        crumbs.push({ href: sitePath('/articles'), label: text.nav.articles });
        if (segments[2]) {
          const categoryKey = segments[2] as keyof typeof CATEGORY_LABELS;
          const categoryLabel = CATEGORY_LABELS[categoryKey] ?? formatSegmentLabel(segments[2]);
          crumbs.push({ href: sitePath(`/articles/${segments[2]}`), label: categoryLabel });
        }
        if (segments[3]) {
          const title = articleTitles[`${segments[2]}/${segments[3]}`];
          crumbs.push({ href: pathname, label: title ?? formatSegmentLabel(segments[3]) });
        }
        break;
      }
      case 'about': {
        crumbs.push({ href: sitePath('/about'), label: text.nav.about });
        if (segments[2] === 'organization') {
          crumbs.push({ href: sitePath('/about/organization'), label: text.nav.organization });
        }
        break;
      }
      case 'admissions':
        crumbs.push({ href: sitePath('/admissions'), label: text.nav.admissions });
        break;
      case 'charter':
        crumbs.push({ href: sitePath('/charter'), label: text.nav.charter });
        break;
      case 'contact':
        crumbs.push({ href: sitePath('/contact'), label: text.nav.contact });
        break;
      case 'sitemap':
        crumbs.push({ href: sitePath('/sitemap'), label: text.footer.sitemap });
        break;
      case 'policies': {
        const slug = segments[2];
        if (slug) {
          const label =
            slug === 'privacy'
              ? text.footer.privacyPolicy
              : slug === 'site-policy'
              ? text.footer.sitePolicy
              : slug === 'accessibility'
              ? text.footer.accessibility
              : formatSegmentLabel(slug);
          crumbs.push({ href: sitePath(`/policies/${slug}`), label });
        }
        break;
      }
      default: {
        for (let i = 1; i < segments.length; i += 1) {
          const href = sitePath(`/${segments.slice(1, i + 1).join('/')}`);
          crumbs.push({ href, label: formatSegmentLabel(segments[i]) });
        }
      }
    }

    return crumbs;
  }, [pathname, articleTitles]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label={text.breadcrumbs.label}
      className="border-b border-[var(--color-border)] bg-[var(--color-bg-surface)]"
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

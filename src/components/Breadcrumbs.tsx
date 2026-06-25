'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { Locale } from '@/src/lib/i18n-config';
import { getDictionary } from '@/src/lib/get-dictionary';
import { getCategoryLabels } from '@/src/lib/content-types';

function normalizePathname(pathname: string) {
  return pathname.replace(/\/+$|^\//g, '') || '/';
}

function formatSegmentLabel(segment: string) {
  return segment
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function Breadcrumbs({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const dict = getDictionary(locale);

  const items = useMemo(() => {
    if (!pathname) return [];
    const normalized = normalizePathname(pathname);
    const segments = normalized.split('/').filter(Boolean);
    if (segments.length <= 1) return [];

    const crumbs: Array<{ href: string; label: string }> = [
      { href: `/${locale}/`, label: dict.nav.home },
    ];

    const section = segments[1];
    switch (section) {
      case 'articles': {
        crumbs.push({ href: `/${locale}/articles/`, label: dict.nav.articles });
        if (segments[2]) {
          const categoryLabels = getCategoryLabels(locale);
          const categoryKey = segments[2] as keyof typeof categoryLabels;
          const categoryLabel = categoryLabels[categoryKey] ?? formatSegmentLabel(segments[2]);
          crumbs.push({ href: `/${locale}/articles/${segments[2]}/`, label: categoryLabel });
        }
        if (segments[3]) {
          crumbs.push({ href: pathname, label: formatSegmentLabel(segments[3]) });
        }
        break;
      }
      case 'about': {
        crumbs.push({ href: `/${locale}/about/`, label: dict.nav.about });
        if (segments[2] === 'organization') {
          crumbs.push({ href: `/${locale}/about/organization/`, label: dict.nav.organization });
        }
        break;
      }
      case 'charter':
        crumbs.push({ href: `/${locale}/charter/`, label: dict.nav.charter });
        break;
      case 'contact':
        crumbs.push({ href: `/${locale}/contact/`, label: dict.nav.contact });
        break;
      case 'sitemap':
        crumbs.push({ href: `/${locale}/sitemap/`, label: dict.footer.sitemap });
        break;
      case 'policies': {
        const slug = segments[2];
        if (slug) {
          const label =
            slug === 'privacy'
              ? dict.footer.privacyPolicy
              : slug === 'site-policy'
              ? dict.footer.sitePolicy
              : slug === 'accessibility'
              ? dict.footer.accessibility
              : formatSegmentLabel(slug);
          crumbs.push({ href: `/${locale}/policies/${slug}/`, label });
        }
        break;
      }
      default: {
        for (let i = 1; i < segments.length; i += 1) {
          const href = `/${locale}/${segments.slice(0, i + 1).join('/')}/`;
          crumbs.push({ href, label: formatSegmentLabel(segments[i]) });
        }
      }
    }

    return crumbs;
  }, [pathname, locale, dict]);

  if (items.length === 0) return null;

  return (
    <nav aria-label={locale === 'ja' ? 'パンくずリスト' : 'Breadcrumb'} className="border-b border-[var(--color-border)] bg-[var(--color-bg-surface)]">
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

import { locales, Locale } from '@/src/lib/i18n-config';
import { getDictionary } from '@/src/lib/getDictionary';
import { getNavItems, getFooterNavGroups, getFooterBottomLinks } from '@/src/lib/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Dictionary } from '@/src/lib/dictionaries/ja';

interface SitemapPageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: SitemapPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : 'ja';
  const dict = getDictionary(safeLocale);
  return { title: `${dict.footer.sitemap} | 音楽ゲーム学園` };
}

export default async function SitemapPage({ params }: SitemapPageProps) {
  const { locale } = await params;
  const safeLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : 'ja';
  const dict = getDictionary(safeLocale);

  const mainNav = getNavItems(safeLocale);
  const footerGroups = getFooterNavGroups(safeLocale);
  const bottomLinks = getFooterBottomLinks(safeLocale);

  return (
    <div className="container px-4 py-16 mx-auto md:px-6 max-w-4xl">
      <h1 className="mb-12 text-3xl font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border-strong)] pb-4">
        {dict.footer.sitemap}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* 主要コンテンツ */}
        <div>
          <h2 className="text-xl font-bold mb-6 text-[var(--color-text-primary)] border-b border-[var(--color-border-subtle)] pb-2">
            メインメニュー
          </h2>
          <ul className="flex flex-col gap-4">
            {mainNav.map((item) => {
              const label = dict.nav[item.key as keyof typeof dict.nav] || item.key;
              return (
                <li key={item.key} className="flex items-center text-[var(--color-text-secondary)] hover:text-[var(--color-accent-pink)] transition-colors">
                  <span className="text-[var(--color-accent-pink)] mr-3 text-sm">▸</span>
                  <Link href={item.href} className="text-[15px] font-medium">
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* フッターグループ展開 */}
        <div className="flex flex-col gap-12">
          {footerGroups.map((group) => {
            const title = dict.footer[group.titleKey as keyof Dictionary['footer']] || group.titleKey;
            return (
              <div key={group.titleKey}>
                <h2 className="text-xl font-bold mb-6 text-[var(--color-text-primary)] border-b border-[var(--color-border-subtle)] pb-2">
                  {title}
                </h2>
                <ul className="flex flex-col gap-4">
                  {group.items.map((item) => {
                    const label = dict.nav[item.key as keyof typeof dict.nav] || item.key;
                    return (
                      <li key={item.key} className="flex items-center text-[var(--color-text-secondary)] hover:text-[var(--color-accent-pink)] transition-colors">
                        <span className="text-[var(--color-accent-pink)] mr-3 text-sm">▸</span>
                        <Link href={item.href} className="text-[15px] font-medium">
                          {label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}

          {/* ポリシー系 */}
          <div>
            <h2 className="text-xl font-bold mb-6 text-[var(--color-text-primary)] border-b border-[var(--color-border-subtle)] pb-2">
              ポリシー
            </h2>
            <ul className="flex flex-col gap-4">
              {bottomLinks.filter(l => l.key !== 'sitemap').map((item) => {
                const label = dict.footer[item.key as keyof Dictionary['footer']] || item.key;
                return (
                  <li key={item.key} className="flex items-center text-[var(--color-text-secondary)] hover:text-[var(--color-accent-pink)] transition-colors">
                    <span className="text-[var(--color-accent-pink)] mr-3 text-sm">▸</span>
                    <Link href={item.href} className="text-[15px] font-medium">
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

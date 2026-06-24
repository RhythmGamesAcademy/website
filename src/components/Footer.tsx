import Link from 'next/link';
import { Locale } from '@/src/lib/i18n-config';
import { getDictionary } from '@/src/lib/getDictionary';
import { getFooterNavGroups, getFooterBottomLinks } from '@/src/lib/navigation';
import { siteConfig } from '@/src/lib/site-config';
import { Dictionary } from '@/src/lib/dictionaries/ja';

interface FooterProps {
  locale: Locale;
}

type FooterNavKey = keyof Dictionary['footer'];

export default function Footer({ locale }: FooterProps) {
  const dict = getDictionary(locale);
  const footerGroups = getFooterNavGroups(locale);
  const bottomLinks = getFooterBottomLinks(locale);

  return (
    <footer className="mt-auto bg-[var(--color-bg-page)]">
      {/* リンクグリッド (2カラム) */}
      <div className="py-16 border-t border-[var(--color-border)]">
        <div className="container px-4 mx-auto md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
            {footerGroups.map((group) => {
              const title = dict.footer[group.titleKey as FooterNavKey] || group.titleKey;
              return (
                <div key={group.titleKey} className="flex flex-col">
                  <h3 className="text-lg font-bold pb-3 border-b border-[var(--color-border-strong)] mb-5 text-[var(--color-text-primary)]">
                    {title}
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {group.items.map((item) => {
                      const label = dict.nav[item.key as keyof typeof dict.nav] || item.key;
                      return (
                        <li key={item.key} className="flex items-center text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent-pink)]">
                          <span className="text-[var(--color-accent-pink)] mr-2 text-xs">▸</span>
                          <Link href={item.href}>
                            {label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* フッター下部 */}
      <div className="py-12 border-t border-[var(--color-border)]">
        <div className="container px-4 mx-auto md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-8">
            <div>
              <div className="text-base font-bold text-[var(--color-text-primary)] tracking-wider">
                音楽ゲーム学園
              </div>
              <div className="text-xs text-[var(--color-text-muted)] mt-1.5">
                MUSIC GAME ACADEMY — {dict.footer.description}
              </div>
            </div>
            
            <nav className="flex gap-7" aria-label="Footer bottom links">
              {bottomLinks.map((item) => {
                const label = dict.footer[item.key as FooterNavKey] || item.key;
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="text-[13px] text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent-pink)]"
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-[var(--color-border)] text-xs text-[var(--color-text-muted)] gap-4">
            <span>&copy; {new Date().getFullYear()} {siteConfig.name}</span>
            <span>{locale === 'ja' ? '本サイトの管理・運営は学園運営事務局が行っています。' : 'Managed and operated by the Academy Administration Office.'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

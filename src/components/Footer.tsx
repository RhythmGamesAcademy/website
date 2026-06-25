import Link from 'next/link';
import { Locale } from '@/src/lib/i18n-config';
import { getDictionary } from '@/src/lib/get-dictionary';
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
  const siteTitle = locale === 'ja' ? siteConfig.name : siteConfig.nameEn;

  return (
    <footer className="mt-auto bg-[var(--color-bg-page)] border-t border-[var(--color-border)]">
      <div className="py-14">
        <div className="container px-4 mx-auto md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl">
            {footerGroups.map((group) => {
              const title = dict.footer[group.titleKey as FooterNavKey] || group.titleKey;
              return (
                <div key={group.titleKey} className="flex flex-col">
                  <h3 className="text-sm font-semibold pb-2 mb-4 text-[var(--color-text-primary)] border-b border-[var(--color-border-subtle)]">
                    {title}
                  </h3>
                  <ul className="flex flex-col gap-2.5">
                    {group.items.map((item) => {
                      const label = dict.nav[item.key as keyof typeof dict.nav] || item.key;
                      return (
                        <li key={item.key}>
                          <Link
                            href={item.href}
                            className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
                          >
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

      <div className="py-8 border-t border-[var(--color-border-subtle)]">
        <div className="container px-4 mx-auto md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-6">
            <div>
              <div className="text-sm font-semibold text-[var(--color-text-primary)]">
                {siteTitle}
              </div>
              <div className="text-xs text-[var(--color-text-muted)] mt-1">
                {dict.footer.description}
              </div>
            </div>

            <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer bottom links">
              {bottomLinks.map((item) => {
                const label = dict.footer[item.key as FooterNavKey] || item.key;
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="text-xs text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-5 border-t border-[var(--color-border-subtle)] text-xs text-[var(--color-text-muted)] gap-3">
            <span>
              &copy; {siteConfig.copyrightYear} {siteConfig.name}
            </span>
            <span>{dict.footer.managedBy}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

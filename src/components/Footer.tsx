import Link from 'next/link';
import { text, UiText } from '@/src/lib/ui-text';
import { FOOTER_NAV_GROUPS, FOOTER_BOTTOM_LINKS } from '@/src/lib/navigation';
import { siteConfig } from '@/src/lib/site-config';

type FooterNavKey = keyof UiText['footer'];

export default function Footer() {
  return (
    <footer className="relative z-10 mt-auto bg-[var(--color-bg-page)] border-t border-[var(--color-border)]">
      <div className="py-14">
        <div className="container px-4 mx-auto md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl">
            {FOOTER_NAV_GROUPS.map((group) => {
              const title = text.footer[group.titleKey as FooterNavKey] || group.titleKey;
              return (
                <div key={group.titleKey} className="flex flex-col">
                  <h3 className="text-sm font-semibold pb-2 mb-4 text-[var(--color-text-primary)] border-b border-[var(--color-border-subtle)]">
                    {title}
                  </h3>
                  <ul className="flex flex-col gap-2.5">
                    {group.items.map((item) => {
                      const label = text.nav[item.key as keyof typeof text.nav] || item.key;
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
          <div className="mb-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-md bg-[var(--color-accent-pink)] text-[var(--color-bg-page)] text-xs font-bold tracking-widest">
              LOGO
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-6">
            <div>
              <div className="text-sm font-semibold text-[var(--color-text-primary)]">
                {siteConfig.name}
              </div>
              <div className="text-xs text-[var(--color-text-muted)] mt-1">
                {text.footer.description}
              </div>
            </div>

            <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer bottom links">
              {FOOTER_BOTTOM_LINKS.map((item) => {
                const label = text.footer[item.key as FooterNavKey] || item.key;
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
              &copy; {siteConfig.copyrightYear} {siteConfig.name}. All rights reserved.
            </span>
            <span>{text.footer.managedBy}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

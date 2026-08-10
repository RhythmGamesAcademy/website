import Link from 'next/link';
import { text } from '@/src/lib/ui-text';
import { NAV_ITEMS } from '@/src/lib/navigation';
import { sitePath } from '@/src/lib/paths';
import { siteConfig } from '@/src/lib/site-config';
import MobileNav from './MobileNav';

const navLabelKeys: Record<string, keyof typeof text.nav> = {
  home: 'home',
  articles: 'articles',
  admissions: 'admissions',
  charter: 'charter',
  about: 'about',
  contact: 'contact',
};

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--color-bg-surface)]">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-6">
        <Link
          href={sitePath('/')}
          className="flex items-center gap-3 transition-colors hover:text-[var(--color-accent-purple)]"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-md bg-[var(--color-accent-pink)] text-[var(--color-bg-page)] text-xs font-bold tracking-widest">
            LOGO
          </div>
          <span className="text-lg font-semibold tracking-wide text-[var(--color-text-primary)]">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-5" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const labelKey = navLabelKeys[item.key];
            const label = labelKey ? text.nav[labelKey] : item.key;
            if (item.isExternal) {
              return (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
                >
                  {label}
                </a>
              );
            }
            return (
              <Link
                key={item.key}
                href={item.href}
                className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}

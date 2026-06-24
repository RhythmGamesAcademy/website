import Link from 'next/link';
import { Locale } from '@/src/lib/i18n-config';
import { getDictionary } from '@/src/lib/getDictionary';
import { getNavItems } from '@/src/lib/navigation';
import MobileNav from './MobileNav';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
  const dict = getDictionary(locale);
  const navItems = getNavItems(locale);

  const navLabelKeys: Record<string, keyof typeof dict.nav> = {
    home: 'home',
    articles: 'articles',
    admissions: 'admissions',
    charter: 'charter',
    contact: 'contact',
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg-surface)_90%,transparent)] backdrop-blur-md">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-6">
        <Link
          href={`/${locale}/`}
          className="flex items-center gap-2 transition-all decoration-strong"
        >
          <span className="text-xl font-bold tracking-wider text-[var(--color-text-primary)]">
            音楽ゲーム学園
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {navItems.map((item) => {
            const labelKey = navLabelKeys[item.key];
            const label = labelKey ? dict.nav[labelKey] : item.key;
            if (item.isExternal) {
              return (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent-pink)]"
                >
                  {label}
                </a>
              );
            }
            return (
              <Link
                key={item.key}
                href={item.href}
                className="text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent-pink)]"
              >
                {label}
              </Link>
            );
          })}
          <LanguageSwitcher currentLocale={locale} />
        </nav>

        {/* Mobile Navigation */}
        <MobileNav locale={locale} navItems={navItems} dict={dict} />
      </div>
    </header>
  );
}

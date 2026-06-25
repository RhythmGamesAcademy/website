import Link from 'next/link';
import { Locale } from '@/src/lib/i18n-config';
import { getDictionary } from '@/src/lib/get-dictionary';
import { getNavItems } from '@/src/lib/navigation';
import { buildLocaleRouteMap } from '@/src/lib/locale-availability';
import { siteConfig } from '@/src/lib/site-config';
import MobileNav from './MobileNav';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
  const dict = getDictionary(locale);
  const navItems = getNavItems(locale);
  const routeMap = buildLocaleRouteMap();

  const navLabelKeys: Record<string, keyof typeof dict.nav> = {
    home: 'home',
    articles: 'articles',
    admissions: 'admissions',
    charter: 'charter',
    about: 'about',
    contact: 'contact',
  };

  const siteTitle = locale === 'ja' ? siteConfig.name : siteConfig.nameEn;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--color-bg-surface)]">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-6">
        <Link
          href={`/${locale}/`}
          className="flex items-center gap-2 transition-colors hover:text-[var(--color-accent-purple)]"
        >
          <span className="text-lg font-semibold tracking-wide text-[var(--color-text-primary)]">
            {siteTitle}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-5" aria-label="Main navigation">
          {navItems.map((item) => {
            const labelKey = navLabelKeys[item.key];
            const label = labelKey ? dict.nav[labelKey] : item.key;
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
          <LanguageSwitcher currentLocale={locale} routeMap={routeMap} dict={dict} />
        </nav>

        <MobileNav locale={locale} navItems={navItems} dict={dict} routeMap={routeMap} />
      </div>
    </header>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, Locale } from '@/src/lib/i18n-config';

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

const localeLabels: Record<Locale, string> = {
  ja: 'JP',
  en: 'EN',
};

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname();

  function getLocaleHref(targetLocale: Locale): string {
    // Replace the locale segment in the pathname
    // pathname looks like /ja/some/path or /ja/
    const segments = pathname.split('/');
    // segments[0] is '', segments[1] is current locale
    segments[1] = targetLocale;
    const newPath = segments.join('/');
    // Ensure trailing slash
    return newPath.endsWith('/') ? newPath : `${newPath}/`;
  }

  return (
    <div className="flex items-center gap-1" aria-label="言語切替">
      {locales.map((locale, index) => (
        <span key={locale} className="flex items-center gap-1">
          {index > 0 && (
            <span className="text-[var(--color-text-muted)] text-xs select-none">/</span>
          )}
          {locale === currentLocale ? (
            <span
              className="text-xs font-semibold text-[var(--color-accent-purple)] cursor-default"
              aria-current="true"
            >
              {localeLabels[locale]}
            </span>
          ) : (
            <Link
              href={getLocaleHref(locale)}
              className="text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-accent-pink)] transition-colors"
              aria-label={`Switch to ${locale === 'en' ? 'English' : '日本語'}`}
            >
              {localeLabels[locale]}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}

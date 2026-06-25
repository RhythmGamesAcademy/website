'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, Locale } from '@/src/lib/i18n-config';
import { Dictionary } from '@/src/lib/dictionaries/ja';
import { LocaleRouteMap } from '@/src/lib/locale-route-utils';
import { isLocaleAvailableForPath } from '@/src/lib/locale-route-utils';

interface LanguageSwitcherProps {
  currentLocale: Locale;
  routeMap: LocaleRouteMap;
  dict: Dictionary;
}

const localeLabels: Record<Locale, string> = {
  ja: 'JP',
  en: 'EN',
};

export default function LanguageSwitcher({
  currentLocale,
  routeMap,
  dict,
}: LanguageSwitcherProps) {
  const pathname = usePathname();

  function getLocaleHref(targetLocale: Locale): string {
    const segments = pathname.split('/');
    segments[1] = targetLocale;
    const newPath = segments.join('/');
    return newPath.endsWith('/') ? newPath : `${newPath}/`;
  }

  return (
    <div className="flex items-center gap-1" aria-label={dict.languageSwitcher.label}>
      {locales.map((locale, index) => {
        const isCurrent = locale === currentLocale;
        const isAvailable =
          isCurrent || isLocaleAvailableForPath(routeMap, pathname, locale);

        return (
          <span key={locale} className="flex items-center gap-1">
            {index > 0 && (
              <span className="text-[var(--color-text-muted)] text-xs select-none">/</span>
            )}
            {isCurrent ? (
              <span
                className="text-xs font-semibold text-[var(--color-accent-purple)] cursor-default"
                aria-current="true"
              >
                {localeLabels[locale]}
              </span>
            ) : isAvailable ? (
              <Link
                href={getLocaleHref(locale)}
                className="text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-accent-pink)] transition-colors"
                aria-label={
                  locale === 'en'
                    ? dict.languageSwitcher.switchToEn
                    : dict.languageSwitcher.switchToJa
                }
              >
                {localeLabels[locale]}
              </Link>
            ) : (
              <span
                className="text-xs font-medium text-[var(--color-text-muted)] opacity-40 cursor-not-allowed"
                aria-disabled="true"
                title={dict.languageSwitcher.unavailable}
              >
                {localeLabels[locale]}
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

import { Locale } from './i18n-config';

export type LocaleRouteMap = Record<string, Partial<Record<Locale, boolean>>>;

function normalizePath(pathname: string): string {
  const withoutLocale = pathname.replace(/^\/(ja|en)/, '') || '/';
  if (withoutLocale === '/') return '/';
  return withoutLocale.endsWith('/') ? withoutLocale.slice(0, -1) : withoutLocale;
}

export function isLocaleAvailableForPath(
  routeMap: LocaleRouteMap,
  pathname: string,
  locale: Locale
): boolean {
  const normalized = normalizePath(pathname);
  const availability = routeMap[normalized];
  if (availability?.[locale] !== undefined) {
    return availability[locale] ?? false;
  }

  const segments = normalized.split('/').filter(Boolean);
  while (segments.length > 0) {
    const candidate = `/${segments.join('/')}`;
    if (routeMap[candidate]?.[locale] !== undefined) {
      return routeMap[candidate]![locale] ?? false;
    }
    segments.pop();
  }

  return locale === 'ja';
}

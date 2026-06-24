import { Locale } from './i18n-config';
import { siteConfig } from './site-config';

/**
 * Returns a localized route path.
 */
export function localizedPath(locale: Locale, path: string): string {
  // If path is root, just return /locale
  if (path === '/') return `/${locale}/`;
  
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Ensure we don't have trailing slash issues, but respect trailingSlash: true
  const route = `/${locale}${normalizedPath}`;
  return route.endsWith('/') ? route : `${route}/`;
}

/**
 * Returns an asset path with basePath applied (for next/image src or public assets).
 */
export function withBasePath(path: string): string {
  if (path.startsWith('http')) return path;
  
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.basePath}${normalizedPath}`;
}

/**
 * Returns a fully qualified canonical URL.
 */
export function canonicalUrl(locale: Locale, path: string): string {
  const route = localizedPath(locale, path);
  return `${siteConfig.baseUrl}${siteConfig.basePath}${route}`;
}

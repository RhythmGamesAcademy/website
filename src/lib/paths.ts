import { siteConfig } from './site-config';

/**
 * The site is Japanese-only, but the historical /ja/ URL prefix is preserved
 * so that previously shared links keep working.
 */
export const ROUTE_PREFIX = '/ja';

/**
 * Returns an internal route path (always prefixed and trailing-slashed).
 */
export function sitePath(path: string): string {
  if (path === '/' || path === '') return `${ROUTE_PREFIX}/`;

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const route = `${ROUTE_PREFIX}${normalizedPath}`;
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
export function canonicalUrl(path: string): string {
  return `${siteConfig.baseUrl}${siteConfig.basePath}${sitePath(path)}`;
}

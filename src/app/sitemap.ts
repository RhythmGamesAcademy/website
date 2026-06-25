import { MetadataRoute } from 'next';
import { locales, Locale } from '@/src/lib/i18n-config';
import { siteConfig } from '@/src/lib/site-config';
import { getAllArticleSlugs } from '@/src/lib/articles';
import { buildLocaleRouteMap } from '@/src/lib/locale-availability';

export const dynamic = 'force-static';

function isRouteAvailable(routeMap: ReturnType<typeof buildLocaleRouteMap>, route: string, locale: Locale) {
  return routeMap[route]?.[locale] ?? false;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [];
  const routeMap = buildLocaleRouteMap();

  for (const locale of locales) {
    const staticRoutes = [
      { path: '/', priority: 1, changeFrequency: 'weekly' as const },
      { path: '/charter', priority: 0.8, changeFrequency: 'monthly' as const },
      { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
      { path: '/about/organization', priority: 0.8, changeFrequency: 'monthly' as const },
      { path: '/articles', priority: 0.8, changeFrequency: 'daily' as const },
      { path: '/contact', priority: 0.6, changeFrequency: 'yearly' as const },
      { path: '/sitemap', priority: 0.4, changeFrequency: 'yearly' as const },
    ];

    for (const { path, priority, changeFrequency } of staticRoutes) {
      if (!isRouteAvailable(routeMap, path, locale)) continue;
      routes.push({
        url: `${siteConfig.baseUrl}${siteConfig.basePath}/${locale}${path === '/' ? '/' : `${path}/`}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
      });
    }

    const policies = ['privacy', 'site-policy', 'accessibility'];
    for (const policy of policies) {
      const path = `/policies/${policy}`;
      if (!isRouteAvailable(routeMap, path, locale)) continue;
      routes.push({
        url: `${siteConfig.baseUrl}${siteConfig.basePath}/${locale}/policies/${policy}/`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.5,
      });
    }

    const articleSlugs = await getAllArticleSlugs(locale, { publishedOnly: true });
    for (const { category, slug } of articleSlugs) {
      routes.push({
        url: `${siteConfig.baseUrl}${siteConfig.basePath}/${locale}/articles/${category}/${slug}/`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.6,
      });
    }
  }

  return routes;
}

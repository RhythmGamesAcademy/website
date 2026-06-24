import { MetadataRoute } from 'next';
import { locales } from '@/src/lib/i18n-config';
import { siteConfig } from '@/src/lib/site-config';
import { getAllArticleSlugs } from '@/src/lib/articles';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    // Basic pages
    routes.push({
      url: `${siteConfig.baseUrl}${siteConfig.basePath}/${locale}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    });
    routes.push({
      url: `${siteConfig.baseUrl}${siteConfig.basePath}/${locale}/charter/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
    routes.push({
      url: `${siteConfig.baseUrl}${siteConfig.basePath}/${locale}/about/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
    routes.push({
      url: `${siteConfig.baseUrl}${siteConfig.basePath}/${locale}/about/organization/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
    routes.push({
      url: `${siteConfig.baseUrl}${siteConfig.basePath}/${locale}/articles/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    });

    // Policies
    const policies = ['privacy', 'site-policy', 'accessibility'];
    for (const policy of policies) {
      routes.push({
        url: `${siteConfig.baseUrl}${siteConfig.basePath}/${locale}/policies/${policy}/`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.5,
      });
    }

    // Dynamic Articles
    const articleSlugs = await getAllArticleSlugs(locale);
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

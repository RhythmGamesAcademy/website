import { MetadataRoute } from 'next';
import { canonicalUrl } from '@/src/lib/paths';
import { getAllArticleSlugs } from '@/src/lib/articles';

export const dynamic = 'force-static';

const STATIC_ROUTES = [
  { path: '/', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/charter', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/about/organization', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/articles', priority: 0.8, changeFrequency: 'daily' as const },
  { path: '/admissions', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.6, changeFrequency: 'yearly' as const },
  { path: '/sitemap', priority: 0.4, changeFrequency: 'yearly' as const },
];

const POLICY_SLUGS = ['privacy', 'site-policy', 'accessibility'];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
      url: canonicalUrl(path),
      lastModified,
      changeFrequency,
      priority,
    })),
    ...POLICY_SLUGS.map((slug) => ({
      url: canonicalUrl(`/policies/${slug}`),
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    })),
    ...getAllArticleSlugs().map(({ category, slug }) => ({
      url: canonicalUrl(`/articles/${category}/${slug}`),
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}

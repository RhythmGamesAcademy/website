import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { locales, Locale } from './i18n-config';
import { ARTICLE_CATEGORIES } from './content-types';
import {
  articleFrontmatterSchema,
  parseOrThrow,
  policyFrontmatterSchema,
  translationStatusSchema,
  TranslationStatus,
} from './content-schema';
import { LocaleRouteMap } from './locale-route-utils';

function isAvailable(status: TranslationStatus | 'missing' | undefined): boolean {
  return status !== undefined && status !== 'missing' && status !== 'draft';
}

function readPolicyStatus(locale: Locale, slug: string): TranslationStatus | 'missing' {
  const filePath = path.join(process.cwd(), 'content', locale, 'policies', `${slug}.md`);
  if (!fs.existsSync(filePath)) return 'missing';
  const { data } = matter(fs.readFileSync(filePath, 'utf8'));
  const parsed = parseOrThrow(policyFrontmatterSchema, data, filePath);
  return parsed.translationStatus;
}

function readCharterStatus(locale: Locale): TranslationStatus | 'missing' {
  const filePath = path.join(process.cwd(), 'content', locale, 'charter', 'charter.md');
  if (!fs.existsSync(filePath)) return 'missing';
  const { data } = matter(fs.readFileSync(filePath, 'utf8'));
  if (data.translationStatus) {
    return parseOrThrow(translationStatusSchema, data.translationStatus, filePath);
  }
  const content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('placeholder') || content.includes('in preparation')) {
    return 'placeholder';
  }
  return 'published';
}

function readOrganizationStatus(locale: Locale): TranslationStatus | 'missing' {
  const filePath = path.join(process.cwd(), 'content', locale, 'about', 'organization.md');
  if (!fs.existsSync(filePath)) return 'missing';
  const { data } = matter(fs.readFileSync(filePath, 'utf8'));
  const parsed = parseOrThrow(policyFrontmatterSchema, data, filePath);
  return parsed.translationStatus;
}

export function buildLocaleRouteMap(): LocaleRouteMap {
  const map: LocaleRouteMap = {};
  const staticPaths = [
    '/',
    '/articles',
    '/charter',
    '/about',
    '/about/organization',
    '/contact',
    '/sitemap',
  ];

  for (const route of staticPaths) {
    map[route] = {};
    for (const locale of locales) {
      if (route === '/about/organization') {
        map[route]![locale] = isAvailable(readOrganizationStatus(locale) as TranslationStatus);
        continue;
      }
      if (route === '/charter') {
        map[route]![locale] = isAvailable(readCharterStatus(locale) as TranslationStatus);
        continue;
      }
      map[route]![locale] = true;
    }
  }

  for (const locale of locales) {
    for (const category of ARTICLE_CATEGORIES) {
      const categoryPath = path.join(process.cwd(), 'content', locale, 'articles', category);
      if (!fs.existsSync(categoryPath)) continue;

      for (const fileName of fs.readdirSync(categoryPath)) {
        if (!fileName.endsWith('.md')) continue;
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(categoryPath, fileName);
        const { data } = matter(fs.readFileSync(fullPath, 'utf8'));
        const parsed = parseOrThrow(articleFrontmatterSchema, data, fullPath);
        const route = `/articles/${category}/${slug}`;
        map[route] ??= {};
        map[route]![locale] = isAvailable(parsed.translationStatus);
      }

      const categoryRoute = `/articles/${category}`;
      map[categoryRoute] ??= {};
      map[categoryRoute]![locale] = Object.entries(map).some(
        ([key, availability]) =>
          key.startsWith(`${categoryRoute}/`) && availability?.[locale]
      );
    }
  }

  const policySlugs = ['privacy', 'site-policy', 'accessibility'];
  for (const slug of policySlugs) {
    const route = `/policies/${slug}`;
    map[route] = {};
    for (const locale of locales) {
      const status = readPolicyStatus(locale, slug);
      map[route]![locale] = status !== 'missing' && isAvailable(status as TranslationStatus);
    }
  }

  return map;
}

export type { LocaleRouteMap } from './locale-route-utils';

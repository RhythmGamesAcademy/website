import { getClientBasePath } from './client-base-path';

export interface SearchResultItem {
  title: string;
  url: string;
  excerpt: string;
  matchCount: number;
  totalTerms: number;
}

interface PagefindResultData {
  url: string;
  meta: { title?: string };
  excerpt: string;
}

interface PagefindResult {
  id: string;
  score: number;
  data: () => Promise<PagefindResultData>;
}

interface PagefindSearchResponse {
  results: PagefindResult[];
}

interface PagefindInstance {
  init?: () => Promise<void>;
  options?: (opts: { basePath?: string; bundlePath?: string }) => Promise<void>;
  search: (query: string) => Promise<PagefindSearchResponse>;
}

let pagefindPromise: Promise<PagefindInstance | null> | null = null;

export async function loadPagefind(): Promise<PagefindInstance | null> {
  if (typeof window === 'undefined') return null;
  if (pagefindPromise) return pagefindPromise;

  pagefindPromise = (async () => {
    const basePath = getClientBasePath();
    const scriptUrl = `${basePath}/pagefind/pagefind.js`;

    try {
      const pagefind = (await import(/* webpackIgnore: true */ scriptUrl)) as PagefindInstance;
      const bundlePath = `${basePath}/pagefind/`.replace(/\/{2,}/g, '/');

      if (pagefind.options) {
        await pagefind.options({ basePath: bundlePath, bundlePath });
      }
      if (pagefind.init) {
        await pagefind.init();
      }
      return pagefind;
    } catch {
      return null;
    }
  })();

  return pagefindPromise;
}

/**
 * Pagefind resolves result URLs against the bundle location, so they already
 * carry the basePath. Strip it here and hand back a plain route path: next/link
 * (and canonical internal linking) re-apply the basePath themselves.
 */
function toRoutePath(url: string): string {
  const basePath = getClientBasePath();
  if (basePath && url.startsWith(basePath)) {
    return url.slice(basePath.length) || '/';
  }
  return url;
}

async function hydrateResults(
  ranked: Array<{ result: PagefindResult; matchCount: number }>,
  totalTerms: number
): Promise<SearchResultItem[]> {
  const items: SearchResultItem[] = [];

  for (const { result, matchCount } of ranked) {
    const data = await result.data();
    items.push({
      title: data.meta.title || data.url,
      url: toRoutePath(data.url),
      excerpt: data.excerpt,
      matchCount,
      totalTerms,
    });
  }

  return items;
}

export async function rankedSearch(
  pagefind: PagefindInstance,
  query: string
): Promise<SearchResultItem[]> {
  const terms = query.trim().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  if (terms.length === 1) {
    const { results } = await pagefind.search(terms[0]);
    return hydrateResults(
      results.map((result) => ({ result, matchCount: 1 })),
      1
    );
  }

  const aggregated = new Map<
    string,
    { result: PagefindResult; matchCount: number; maxScore: number }
  >();

  for (const term of terms) {
    const { results } = await pagefind.search(term);

    for (const result of results) {
      const data = await result.data();
      const existing = aggregated.get(data.url);

      if (existing) {
        existing.matchCount += 1;
        existing.maxScore = Math.max(existing.maxScore, result.score);
      } else {
        aggregated.set(data.url, {
          result,
          matchCount: 1,
          maxScore: result.score,
        });
      }
    }
  }

  const ranked = [...aggregated.values()].sort((a, b) => {
    if (b.matchCount !== a.matchCount) return b.matchCount - a.matchCount;
    return b.maxScore - a.maxScore;
  });

  return hydrateResults(ranked, terms.length);
}

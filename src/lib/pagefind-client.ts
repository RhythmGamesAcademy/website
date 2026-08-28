import { getClientBasePath } from './client-base-path';
import { routeLabel } from './navigation';
import { text } from './ui-text';

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
 * carry the basePath, and they point at the emitted files (`/ja/charter.html`).
 * Strip the basePath and normalise the rest into the exact shape `sitePath()`
 * produces — 末尾スラッシュ付きの拡張子なしルート — so that next/link と
 * パンくずの対応表がそのまま解決できる。
 */
function toRoutePath(url: string): string {
  const basePath = getClientBasePath();
  let path = url;

  if (basePath && path.startsWith(basePath)) {
    path = path.slice(basePath.length);
  }

  // クエリ・ハッシュは正規化の対象外なので切り離して最後に戻す。
  const suffixIndex = path.search(/[?#]/);
  const suffix = suffixIndex >= 0 ? path.slice(suffixIndex) : '';
  path = suffixIndex >= 0 ? path.slice(0, suffixIndex) : path;

  path = path.replace(/\/index\.html$/i, '/').replace(/\.html$/i, '');

  if (!path.startsWith('/')) path = `/${path}`;
  if (!path.endsWith('/')) path = `${path}/`;

  return `${path}${suffix}`;
}

async function hydrateResults(
  ranked: Array<{ result: PagefindResult; matchCount: number }>,
  totalTerms: number
): Promise<SearchResultItem[]> {
  const items: SearchResultItem[] = [];

  for (const { result, matchCount } of ranked) {
    const data = await result.data();
    const url = toRoutePath(data.url);
    items.push({
      // 生の URL は利用者に見せない。索引にタイトルが無ければ対応表を引き、
      // それでも決まらなければ汎用の文言に落とす。
      title: data.meta.title || routeLabel(url) || text.search.untitled,
      url,
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

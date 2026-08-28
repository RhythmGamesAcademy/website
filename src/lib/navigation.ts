import { sitePath } from './paths';
import { text } from './ui-text';
import { ARTICLE_CATEGORIES, CATEGORY_LABELS } from './content-types';

export interface NavItem {
  key: string;
  href: string;
  /** 日本語表示名。文言そのものは ui-text.ts が唯一の定義元。 */
  label: string;
  isExternal?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { key: 'home', href: sitePath('/'), label: text.nav.home },
  { key: 'articles', href: sitePath('/articles'), label: text.nav.articles },
  { key: 'admissions', href: sitePath('/admissions'), label: text.nav.admissions },
  { key: 'charter', href: sitePath('/charter'), label: text.nav.charter },
  { key: 'about', href: sitePath('/about'), label: text.nav.about },
  { key: 'contact', href: sitePath('/contact'), label: text.nav.contact },
];

export interface FooterNavGroup {
  title: string;
  items: NavItem[];
}

export const FOOTER_NAV_GROUPS: FooterNavGroup[] = [
  {
    title: text.footer.groupAbout,
    items: [
      { key: 'charter', href: sitePath('/charter'), label: text.nav.charter },
      { key: 'about', href: sitePath('/about'), label: text.nav.about },
    ],
  },
  {
    title: text.footer.groupInfo,
    items: [
      { key: 'articles', href: sitePath('/articles'), label: text.nav.articles },
      { key: 'admissions', href: sitePath('/admissions'), label: text.nav.admissions },
      { key: 'contact', href: sitePath('/contact'), label: text.nav.contact },
    ],
  },
];

export const FOOTER_BOTTOM_LINKS: NavItem[] = [
  { key: 'sitemap', href: sitePath('/sitemap'), label: text.footer.sitemap },
  {
    key: 'sitePolicy',
    href: sitePath('/policies/site-policy'),
    label: text.footer.sitePolicy,
  },
  {
    key: 'privacyPolicy',
    href: sitePath('/policies/privacy'),
    label: text.footer.privacyPolicy,
  },
  {
    key: 'accessibility',
    href: sitePath('/policies/accessibility'),
    label: text.footer.accessibility,
  },
];

/**
 * ルート（sitePath() 形式・末尾スラッシュ付き）から日本語表示名への対応表。
 *
 * パンくず・検索結果など「利用者にページ名を見せる」箇所はすべてここを引く。
 * 中身は上のナビゲーション定義と記事カテゴリから機械的に組み立てているので、
 * 同じ情報を二箇所で管理することにはならない。
 *
 * 記事詳細ページだけはビルド時にしか判明しないため、ここには含めない
 * （`lib/articles.ts` の `getArticleTitleMap()` が担当する）。
 */
export const ROUTE_LABELS: Readonly<Record<string, string>> = Object.freeze(
  Object.fromEntries([
    ...NAV_ITEMS.filter((item) => !item.isExternal).map(
      (item) => [item.href, item.label] as const
    ),
    ...FOOTER_NAV_GROUPS.flatMap((group) => group.items).map(
      (item) => [item.href, item.label] as const
    ),
    ...FOOTER_BOTTOM_LINKS.map((item) => [item.href, item.label] as const),
    ...ARTICLE_CATEGORIES.map(
      (category) => [sitePath(`/articles/${category}`), CATEGORY_LABELS[category]] as const
    ),
  ])
);

/**
 * ルートに対応する日本語表示名を返す。未登録なら undefined。
 * 呼び出し側は生のスラッグへフォールバックせず、表示自体を諦めること。
 */
export function routeLabel(route: string): string | undefined {
  return ROUTE_LABELS[route];
}

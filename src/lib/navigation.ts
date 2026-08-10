import { sitePath } from './paths';

export interface NavItem {
  key: string;
  href: string;
  isExternal?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { key: 'home', href: sitePath('/') },
  { key: 'articles', href: sitePath('/articles') },
  { key: 'admissions', href: sitePath('/admissions') },
  { key: 'charter', href: sitePath('/charter') },
  { key: 'about', href: sitePath('/about') },
  { key: 'contact', href: sitePath('/contact') },
];

export interface FooterNavGroup {
  titleKey: string;
  items: NavItem[];
}

export const FOOTER_NAV_GROUPS: FooterNavGroup[] = [
  {
    titleKey: 'groupAbout',
    items: [
      { key: 'charter', href: sitePath('/charter') },
      { key: 'about', href: sitePath('/about') },
      { key: 'organization', href: sitePath('/about/organization') },
    ],
  },
  {
    titleKey: 'groupInfo',
    items: [
      { key: 'articles', href: sitePath('/articles') },
      { key: 'admissions', href: sitePath('/admissions') },
      { key: 'contact', href: sitePath('/contact') },
    ],
  },
];

export const FOOTER_BOTTOM_LINKS: NavItem[] = [
  { key: 'sitemap', href: sitePath('/sitemap') },
  { key: 'sitePolicy', href: sitePath('/policies/site-policy') },
  { key: 'privacyPolicy', href: sitePath('/policies/privacy') },
  { key: 'accessibility', href: sitePath('/policies/accessibility') },
];

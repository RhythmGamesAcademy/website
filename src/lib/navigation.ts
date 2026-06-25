import { Locale } from './i18n-config';
import { siteConfig } from './site-config';

export interface NavItem {
  key: string;
  href: string;
  isExternal?: boolean;
}

export function getNavItems(locale: Locale): NavItem[] {
  return [
    { key: 'home', href: `/${locale}/` },
    { key: 'articles', href: `/${locale}/articles/` },
    { key: 'admissions', href: `/${locale}/admissions/` },
    { key: 'charter', href: `/${locale}/charter/` },
    { key: 'about', href: `/${locale}/about/` },
    { key: 'contact', href: `/${locale}/contact/` },
  ];
}

export interface FooterNavGroup {
  titleKey: string;
  items: NavItem[];
}

export function getFooterNavGroups(locale: Locale): FooterNavGroup[] {
  return [
    {
      titleKey: 'groupAbout',
      items: [
        { key: 'charter', href: `/${locale}/charter/` },
        { key: 'about', href: `/${locale}/about/` },
        { key: 'organization', href: `/${locale}/about/organization/` },
      ],
    },
    {
      titleKey: 'groupInfo',
      items: [
        { key: 'articles', href: `/${locale}/articles/` },
        { key: 'admissions', href: `/${locale}/admissions/` },
        { key: 'contact', href: `/${locale}/contact/` },
      ],
    },
  ];
}

export function getFooterBottomLinks(locale: Locale): NavItem[] {
  return [
    { key: 'sitemap', href: `/${locale}/sitemap/` },
    { key: 'sitePolicy', href: `/${locale}/policies/site-policy/` },
    { key: 'privacyPolicy', href: `/${locale}/policies/privacy/` },
    { key: 'accessibility', href: `/${locale}/policies/accessibility/` },
  ];
}

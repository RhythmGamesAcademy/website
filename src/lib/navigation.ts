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
    { key: 'admissions', href: `/${locale}/articles/admissions/how-to-join/` },
    { key: 'charter', href: `/${locale}/charter/` },
    {
      key: 'contact',
      href: `mailto:${siteConfig.contactEmail}`,
      isExternal: true,
    },
  ];
}

export function getFooterNavItems(locale: Locale): NavItem[] {
  return [
    { key: 'charter', href: `/${locale}/charter/` },
    { key: 'privacyPolicy', href: `/${locale}/policies/privacy/` },
    { key: 'sitePolicy', href: `/${locale}/policies/site-policy/` },
    { key: 'accessibility', href: `/${locale}/policies/accessibility/` },
  ];
}

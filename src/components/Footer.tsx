import Link from 'next/link';
import { Locale } from '@/src/lib/i18n-config';
import { getDictionary } from '@/src/lib/getDictionary';
import { getFooterNavItems } from '@/src/lib/navigation';
import { siteConfig } from '@/src/lib/site-config';
import { Dictionary } from '@/src/lib/dictionaries/ja';

interface FooterProps {
  locale: Locale;
}

type FooterNavKey = keyof Dictionary['footer'];

const footerLabelKeys: Record<string, FooterNavKey> = {
  privacyPolicy: 'privacyPolicy',
  sitePolicy: 'sitePolicy',
  accessibility: 'accessibility',
  charter: 'charter' as FooterNavKey,
};

export default function Footer({ locale }: FooterProps) {
  const dict = getDictionary(locale);
  const footerNavItems = getFooterNavItems(locale);

  return (
    <footer className="py-10 border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)] mt-auto">
      <div className="container px-4 mx-auto md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-lg font-bold text-[var(--color-text-primary)] tracking-wider">
              音楽ゲーム学園
            </span>
            <p className="text-sm text-[var(--color-text-secondary)]">
              {dict.footer.description}
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer navigation">
            {footerNavItems.map((item) => {
              const labelKey = footerLabelKeys[item.key] ?? item.key;
              const label =
                labelKey in dict.footer
                  ? dict.footer[labelKey as FooterNavKey]
                  : labelKey in dict.nav
                  ? dict.nav[labelKey as keyof typeof dict.nav]
                  : item.key;

              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent-pink)] transition-colors"
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--color-border-subtle)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--color-text-muted)]">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent-pink)] transition-colors"
          >
            {siteConfig.contactEmail}
          </a>
        </div>
      </div>
    </footer>
  );
}

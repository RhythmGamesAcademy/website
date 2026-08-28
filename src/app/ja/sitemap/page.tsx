import Link from 'next/link';
import { text } from '@/src/lib/ui-text';
import { NAV_ITEMS, FOOTER_NAV_GROUPS, FOOTER_BOTTOM_LINKS, NavItem } from '@/src/lib/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: text.footer.sitemap,
};

function LinkSection({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6 text-[var(--color-text-primary)] border-b border-[var(--color-border-subtle)] pb-2">
        {title}
      </h2>
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li key={item.key}>
            <Link
              href={item.href}
              className="text-[15px] font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent-pink)]"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SitemapPage() {
  return (
    <div className="container px-4 py-16 mx-auto md:px-6 max-w-4xl">
      <div className="content-surface p-6">
        <h1 className="mb-12 text-3xl font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border-strong)] pb-4">
          {text.footer.sitemap}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <LinkSection title={text.sitemap.mainMenu} items={NAV_ITEMS} />

          <div className="flex flex-col gap-12">
            {FOOTER_NAV_GROUPS.map((group) => (
              <LinkSection key={group.title} title={group.title} items={group.items} />
            ))}

            <LinkSection
              title={text.sitemap.policies}
              items={FOOTER_BOTTOM_LINKS.filter((link) => link.key !== 'sitemap')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

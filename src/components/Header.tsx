import Link from 'next/link';
import { text } from '@/src/lib/ui-text';
import { NAV_ITEMS } from '@/src/lib/navigation';
import { sitePath } from '@/src/lib/paths';
import { siteConfig } from '@/src/lib/site-config';
import Logo from './Logo';
import MobileNav from './MobileNav';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--color-bg-surface)]">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-6">
        <Link
          href={sitePath('/')}
          className="flex items-center gap-3 transition-colors hover:text-[var(--color-accent-purple)]"
        >
          {/* 隣に学園名が並ぶので、読み上げが二重にならないよう label は渡さない。
              色を明示しているのは、リンクの hover 色をロゴに波及させないため。 */}
          <Logo className="h-9 w-auto text-[var(--color-text-primary)]" />
          <span className="text-lg font-semibold tracking-wide text-[var(--color-text-primary)]">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-5" aria-label={text.landmarks.mainNav}>
          {NAV_ITEMS.map((item) => {
            const label = item.label;
            if (item.isExternal) {
              return (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
                >
                  {label}
                </a>
              );
            }
            return (
              <Link
                key={item.key}
                href={item.href}
                className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}

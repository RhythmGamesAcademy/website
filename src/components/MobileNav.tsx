'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Locale } from '@/src/lib/i18n-config';
import { NavItem } from '@/src/lib/navigation';
import { Dictionary } from '@/src/lib/dictionaries/ja';
import LanguageSwitcher from './LanguageSwitcher';

interface MobileNavProps {
  locale: Locale;
  navItems: NavItem[];
  dict: Dictionary;
}

const navLabelKeys: Record<string, keyof Dictionary['nav']> = {
  home: 'home',
  articles: 'articles',
  admissions: 'admissions',
  charter: 'charter',
  contact: 'contact',
};

export default function MobileNav({ locale, navItems, dict }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="md:hidden" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-[var(--color-text-primary)] rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-purple)]"
        aria-label={isOpen ? 'メニューを閉じる' : 'メニューを開く'}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <div
          id="mobile-menu"
          className="absolute left-0 w-full px-4 pt-2 pb-6 border-b border-[var(--color-border)] top-16 bg-[var(--color-bg-surface)] shadow-lg"
        >
          <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
            {navItems.map((item) => {
              const labelKey = navLabelKeys[item.key];
              const label = labelKey ? dict.nav[labelKey] : item.key;
              if (item.isExternal) {
                return (
                  <a
                    key={item.key}
                    href={item.href}
                    className="text-base font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent-pink)]"
                    onClick={() => setIsOpen(false)}
                  >
                    {label}
                  </a>
                );
              }
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className="text-base font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent-pink)]"
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-[var(--color-border-subtle)]">
              <LanguageSwitcher currentLocale={locale} />
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}

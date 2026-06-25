'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/src/lib/i18n-config';
import { Dictionary } from '@/src/lib/dictionaries/ja';
import { loadPagefind, rankedSearch, SearchResultItem } from '@/src/lib/pagefind-client';

interface SiteSearchProps {
  locale: Locale;
  dict: Dictionary;
}

export default function SiteSearch({ locale, dict }: SiteSearchProps) {
  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pagefindState, setPagefindState] = useState<'loading' | 'ready' | 'unavailable'>('loading');
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    loadPagefind().then((instance) => {
      setPagefindState(instance ? 'ready' : 'unavailable');
    });
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const runSearch = useCallback(
    async (value: string) => {
      const trimmed = value.trim();
      if (!trimmed) {
        setResults([]);
        setActiveIndex(-1);
        return;
      }

      const pagefind = await loadPagefind();
      if (!pagefind) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const items = await rankedSearch(pagefind, trimmed, locale);
        setResults(items);
        setActiveIndex(items.length > 0 ? 0 : -1);
      } finally {
        setIsLoading(false);
      }
    },
    [locale]
  );

  useEffect(() => {
    if (!isOpen) return;
    const timer = window.setTimeout(() => {
      void runSearch(query);
    }, 180);
    return () => window.clearTimeout(timer);
  }, [query, isOpen, runSearch]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
      return;
    }

    if (!isOpen || results.length === 0) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % results.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((prev) => (prev <= 0 ? results.length - 1 : prev - 1));
    } else if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault();
      window.location.href = results[activeIndex].url;
    }
  }

  function matchLabel(item: SearchResultItem): string | null {
    if (item.totalTerms <= 1) return null;
    if (item.matchCount === item.totalTerms) return dict.search.matchAll;
    return dict.search.matchPartial.replace('{n}', String(item.matchCount));
  }

  const showPanel = isOpen && query.trim().length > 0;

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <label htmlFor="site-search-input" className="sr-only">
        {dict.nav.search}
      </label>
      <div className="relative">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-text-muted)]"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <circle cx="8.5" cy="8.5" r="5.5" />
          <path d="M13 13l4 4" strokeLinecap="round" />
        </svg>
        <input
          ref={inputRef}
          id="site-search-input"
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={dict.search.placeholder}
          role="combobox"
          aria-expanded={showPanel}
          aria-controls={showPanel ? listboxId : undefined}
          aria-autocomplete="list"
          aria-activedescendant={
            showPanel && activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined
          }
          disabled={pagefindState === 'unavailable'}
          className="w-full h-10 pl-10 pr-4 text-sm rounded-md border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] transition-colors focus:border-[var(--color-accent-purple)] disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      {pagefindState === 'unavailable' && (
        <p className="mt-1.5 text-xs text-[var(--color-text-muted)]">{dict.search.unavailable}</p>
      )}

      {showPanel && (
        <div
          id={listboxId}
          role="listbox"
          aria-label={dict.nav.search}
          className="absolute z-50 mt-2 w-full overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-bg-surface)] shadow-[0_8px_24px_rgba(31,28,34,0.08)]"
        >
          {isLoading ? (
            <p className="px-4 py-3 text-sm text-[var(--color-text-muted)]">{dict.search.loading}</p>
          ) : results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-[var(--color-text-muted)]">{dict.search.noResults}</p>
          ) : (
            <ul className="max-h-80 overflow-y-auto py-1">
              {results.map((item, index) => {
                const label = matchLabel(item);
                const isActive = index === activeIndex;

                return (
                  <li key={item.url} role="presentation">
                    <Link
                      id={`${listboxId}-option-${index}`}
                      href={item.url}
                      role="option"
                      aria-selected={isActive}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 border-l-2 transition-colors ${
                        isActive
                          ? 'border-[var(--color-accent-purple)] bg-[var(--color-bg-elevated)]'
                          : 'border-transparent hover:bg-[var(--color-bg-elevated)]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-sm font-medium text-[var(--color-text-primary)] leading-snug">
                          {item.title}
                        </span>
                        {label && (
                          <span className="shrink-0 text-[11px] text-[var(--color-text-muted)]">
                            {label}
                          </span>
                        )}
                      </div>
                      {item.excerpt && (
                        <p
                          className="mt-1 text-xs text-[var(--color-text-secondary)] line-clamp-2"
                          dangerouslySetInnerHTML={{ __html: item.excerpt }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

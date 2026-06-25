'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Locale, defaultLocale, isLocale } from '@/src/lib/i18n-config';
import { getDictionary } from '@/src/lib/get-dictionary';

export default function LocaleNotFound() {
  const pathname = usePathname();
  const segment = pathname.split('/')[1];
  const locale: Locale = isLocale(segment) ? segment : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <div className="container px-4 py-24 mx-auto md:px-6 max-w-2xl text-center">
      <p className="text-sm font-semibold text-[var(--color-accent-purple)] mb-3">404</p>
      <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
        {dict.notFound.title}
      </h1>
      <p className="text-[var(--color-text-secondary)] mb-8">{dict.notFound.description}</p>
      <Link
        href={`/${locale}/`}
        className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-md border border-[var(--color-border)] bg-[var(--color-bg-surface)] hover:border-[var(--color-accent-purple)] transition-colors"
      >
        {dict.notFound.backHome}
      </Link>
    </div>
  );
}

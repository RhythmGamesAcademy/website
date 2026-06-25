import { locales, Locale } from '@/src/lib/i18n-config';
import { getDictionary } from '@/src/lib/get-dictionary';
import { localizedPath } from '@/src/lib/paths';
import Link from 'next/link';
import type { Metadata } from 'next';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : 'ja';
  const dict = getDictionary(safeLocale);
  return { title: `${dict.nav.about} | 音楽ゲーム学園` };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const safeLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : 'ja';
  const dict = getDictionary(safeLocale);
  const isJa = safeLocale === 'ja';

  return (
    <div className="container px-4 py-12 mx-auto md:px-6 max-w-3xl">
      <h1 className="mb-8 text-4xl font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-4">
        {dict.nav.about}
      </h1>

      <section className="mb-10 prose max-w-none">
        <p className="text-[var(--color-text-secondary)] leading-8">
          {isJa
            ? '音楽ゲーム学園は、音楽ゲームに関するあらゆる知的・文化的遺産の集積・継承・発展を恒久的な使命とするアカデミックファンコミュニティです。'
            : 'Music Game Academy is an academic fan community dedicated to preserving and advancing the intellectual and cultural heritage of rhythm games.'}
        </p>
      </section>

      <nav aria-label={isJa ? 'このセクションのナビゲーション' : 'Section navigation'}>
        <ul className="flex flex-col gap-3">
          <li>
            <Link
              href={localizedPath(safeLocale, '/about/organization')}
              className="flex items-center gap-2 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] hover:border-[var(--color-accent-lavender)] hover:bg-[var(--color-bg-elevated)] transition-all text-[var(--color-text-primary)] font-medium"
            >
              <span className="text-[var(--color-accent-purple)]">→</span>
              {dict.nav.organization}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

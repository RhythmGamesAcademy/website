import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { locales, Locale } from '@/src/lib/i18n-config';
import { renderMarkdownToHtml } from '@/src/lib/markdown';
import { parseOrThrow, translationStatusSchema } from '@/src/lib/content-schema';
import { getDictionary } from '@/src/lib/get-dictionary';
import type { Metadata } from 'next';

interface CharterPageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: CharterPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : 'ja';
  const dict = getDictionary(safeLocale);
  return {
    title: `${dict.nav.charter} | 音楽ゲーム学園`,
  };
}

export default async function CharterPage({ params }: CharterPageProps) {
  const { locale } = await params;
  const safeLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : 'ja';
  const dict = getDictionary(safeLocale);

  const filePath = path.join(process.cwd(), 'content', safeLocale, 'charter', 'charter.md');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const translationStatus = data.translationStatus
    ? parseOrThrow(translationStatusSchema, data.translationStatus, filePath)
    : 'published';
  const contentHtml = await renderMarkdownToHtml(content);

  return (
    <div className="container px-4 py-12 mx-auto md:px-6 max-w-3xl">
      <div className="content-surface p-6">
        <h1 className="mb-12 text-4xl md:text-5xl font-bold text-center text-[var(--color-text-primary)]">
          {dict.nav.charter}
        </h1>
        {translationStatus === 'placeholder' && (
          <p className="mb-8 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-4 text-sm text-[var(--color-text-secondary)]">
            {safeLocale === 'ja'
              ? '本ページは日本語版が正本です。'
              : 'The Japanese version of the Charter is the authoritative version.'}
          </p>
        )}
        <article
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </div>
    </div>
  );
}

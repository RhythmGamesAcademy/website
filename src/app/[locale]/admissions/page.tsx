import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { locales, Locale } from '@/src/lib/i18n-config';
import { getDictionary } from '@/src/lib/get-dictionary';
import { renderMarkdownToHtml } from '@/src/lib/markdown';
import { articleFrontmatterSchema, parseOrThrow, TranslationStatus } from '@/src/lib/content-schema';
import type { Metadata } from 'next';

interface AdmissionsPageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: AdmissionsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : 'ja';
  const dict = getDictionary(safeLocale);

  const filePath = path.join(process.cwd(), 'content', safeLocale, 'articles', 'admissions', 'how-to-join.md');
  const fileContents = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
  const { data } = matter(fileContents);
  const frontmatter = data ? parseOrThrow(articleFrontmatterSchema, data, filePath) : null;

  return {
    title: frontmatter?.title ? `${frontmatter.title} | ${dict.nav.admissions}` : `${dict.nav.admissions} | 音楽ゲーム学園`,
    description: frontmatter?.excerpt ?? dict.nav.admissions,
  };
}

export default async function AdmissionsPage({ params }: AdmissionsPageProps) {
  const { locale } = await params;
  const safeLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : 'ja';
  const dict = getDictionary(safeLocale);

  const filePath = path.join(process.cwd(), 'content', safeLocale, 'articles', 'admissions', 'how-to-join.md');
  if (!fs.existsSync(filePath)) {
    return (
      <div className="container px-4 py-16 mx-auto md:px-6 max-w-3xl text-[var(--color-text-secondary)]">
        <p>{dict.nav.admissions} のページは現在利用できません。</p>
      </div>
    );
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const frontmatter = parseOrThrow(articleFrontmatterSchema, data, filePath);
  const contentHtml = await renderMarkdownToHtml(content);

  const translationStatus: TranslationStatus = frontmatter.translationStatus;

  return (
    <div className="container px-4 py-12 mx-auto md:px-6 max-w-3xl">
      <div className="content-surface p-6">
        <h1 className="mb-10 text-4xl font-bold text-[var(--color-text-primary)]">
          {frontmatter.title}
        </h1>
      {translationStatus === 'placeholder' && (
        <p className="mb-8 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-4 text-sm text-[var(--color-text-secondary)]">
          {safeLocale === 'ja'
            ? '本ページは現在準備中です。最新情報は日本語のページをご参照ください。'
            : 'This page is currently under preparation. Please refer to the Japanese page for the latest information.'}
        </p>
      )}
        <article className="markdown-body" dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </div>
    </div>
  );
}

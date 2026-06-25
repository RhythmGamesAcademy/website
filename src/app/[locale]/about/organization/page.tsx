import fs from 'fs';
import path from 'path';
import { locales, Locale } from '@/src/lib/i18n-config';
import { parseMarkdownFile } from '@/src/lib/markdown';
import { parseOrThrow, policyFrontmatterSchema } from '@/src/lib/content-schema';
import { getDictionary } from '@/src/lib/get-dictionary';
import type { Metadata } from 'next';

interface OrganizationPageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: OrganizationPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : 'ja';
  const dict = getDictionary(safeLocale);
  return { title: `${dict.nav.organization} | 音楽ゲーム学園` };
}

export default async function OrganizationPage({ params }: OrganizationPageProps) {
  const { locale } = await params;
  const safeLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : 'ja';
  const dict = getDictionary(safeLocale);

  const filePath = path.join(process.cwd(), 'content', safeLocale, 'about', 'organization.md');
  const { frontmatter, contentHtml } = await parseMarkdownFile(filePath);
  const parsed = parseOrThrow(policyFrontmatterSchema, frontmatter, filePath);

  return (
    <div className="container px-4 py-12 mx-auto md:px-6 max-w-3xl">
      <h1 className="mb-8 text-4xl font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-4">
        {parsed.title || dict.nav.organization}
      </h1>
      <article
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </div>
  );
}

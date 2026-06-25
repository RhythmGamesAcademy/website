import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { locales, Locale } from '@/src/lib/i18n-config';
import { parseMarkdownFile } from '@/src/lib/markdown';
import { parseOrThrow, policyFrontmatterSchema } from '@/src/lib/content-schema';
import type { Metadata } from 'next';

type PolicySlug = 'privacy' | 'site-policy' | 'accessibility';
const POLICY_SLUGS: PolicySlug[] = ['privacy', 'site-policy', 'accessibility'];

interface PolicyPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

async function getPublishedPolicySlugs(locale: Locale): Promise<PolicySlug[]> {
  const published: PolicySlug[] = [];
  for (const slug of POLICY_SLUGS) {
    const filePath = path.join(process.cwd(), 'content', locale, 'policies', `${slug}.md`);
    if (!fs.existsSync(filePath)) continue;
    const { frontmatter } = await parseMarkdownFile(filePath);
    const parsed = parseOrThrow(policyFrontmatterSchema, frontmatter, filePath);
    if (parsed.translationStatus !== 'draft') {
      published.push(slug);
    }
  }
  return published;
}

export async function generateStaticParams() {
  const result = [];
  for (const locale of locales) {
    const slugs = await getPublishedPolicySlugs(locale);
    for (const slug of slugs) {
      result.push({ locale, slug });
    }
  }
  return result;
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PolicyPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const safeLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : 'ja';
  const filePath = path.join(process.cwd(), 'content', safeLocale, 'policies', `${slug}.md`);
  if (!fs.existsSync(filePath)) return { title: '404 | 音楽ゲーム学園' };
  const { frontmatter } = await parseMarkdownFile(filePath);
  const parsed = parseOrThrow(policyFrontmatterSchema, frontmatter, filePath);
  return { title: `${parsed.title} | 音楽ゲーム学園` };
}

export default async function PolicyPage({ params }: PolicyPageProps) {
  const { locale, slug } = await params;
  const safeLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : 'ja';

  if (!POLICY_SLUGS.includes(slug as PolicySlug)) {
    notFound();
  }

  const filePath = path.join(process.cwd(), 'content', safeLocale, 'policies', `${slug}.md`);
  if (!fs.existsSync(filePath)) notFound();

  const { frontmatter, contentHtml } = await parseMarkdownFile(filePath);
  const parsed = parseOrThrow(policyFrontmatterSchema, frontmatter, filePath);

  if (parsed.translationStatus === 'draft') {
    notFound();
  }

  return (
    <div className="container px-4 py-12 mx-auto md:px-6 max-w-3xl">
      <h1 className="mb-4 text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-4">
        {parsed.title}
      </h1>
      {parsed.updatedAt && (
        <p className="text-sm text-[var(--color-text-muted)] mb-8">
          {safeLocale === 'ja' ? '最終更新' : 'Last updated'}: {parsed.updatedAt}
        </p>
      )}
      {parsed.translationStatus === 'placeholder' && (
        <p className="mb-8 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-4 text-sm text-[var(--color-text-secondary)]">
          {safeLocale === 'ja'
            ? '本ページは日本語版が正本です。'
            : 'The Japanese version of this page is the authoritative version.'}
        </p>
      )}
      <article
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </div>
  );
}

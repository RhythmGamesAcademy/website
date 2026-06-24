import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import matter from 'gray-matter';
import { locales, Locale } from '@/src/lib/i18n-config';
import { renderMarkdownToHtml } from '@/src/lib/markdown';
import { policyFrontmatterSchema } from '@/src/lib/content-schema';
import { getDictionary } from '@/src/lib/getDictionary';
import type { Metadata } from 'next';

type PolicySlug = 'privacy' | 'site-policy' | 'accessibility';
const POLICY_SLUGS: PolicySlug[] = ['privacy', 'site-policy', 'accessibility'];

interface PolicyPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    POLICY_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PolicyPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const safeLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : 'ja';
  const filePath = path.join(process.cwd(), 'content', safeLocale, 'policies', `${slug}.md`);
  if (!fs.existsSync(filePath)) return { title: '404 | 音楽ゲーム学園' };
  const { data } = matter(fs.readFileSync(filePath, 'utf8'));
  const parsed = policyFrontmatterSchema.safeParse(data);
  const title = parsed.success ? parsed.data.title : slug;
  return { title: `${title} | 音楽ゲーム学園` };
}

export default async function PolicyPage({ params }: PolicyPageProps) {
  const { locale, slug } = await params;
  const safeLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : 'ja';

  const filePath = path.join(process.cwd(), 'content', safeLocale, 'policies', `${slug}.md`);
  if (!fs.existsSync(filePath)) notFound();

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const parsed = policyFrontmatterSchema.safeParse(data);
  const frontmatter = parsed.success ? parsed.data : { title: slug, updatedAt: undefined };
  const contentHtml = await renderMarkdownToHtml(content);

  return (
    <div className="container px-4 py-12 mx-auto md:px-6 max-w-3xl">
      <h1 className="mb-4 text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-4">
        {frontmatter.title}
      </h1>
      {frontmatter.updatedAt && (
        <p className="text-sm text-[var(--color-text-muted)] mb-8">
          最終更新: {frontmatter.updatedAt}
        </p>
      )}
      <article
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </div>
  );
}

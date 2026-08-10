import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { parseMarkdownFile } from '@/src/lib/markdown';
import { parseOrThrow, pageFrontmatterSchema } from '@/src/lib/content-schema';
import type { Metadata } from 'next';

type PolicySlug = 'privacy' | 'site-policy' | 'accessibility';
const POLICY_SLUGS: PolicySlug[] = ['privacy', 'site-policy', 'accessibility'];

interface PolicyPageProps {
  params: Promise<{ slug: string }>;
}

function policyPath(slug: string) {
  return path.join(process.cwd(), 'content', 'ja', 'policies', `${slug}.md`);
}

export function generateStaticParams() {
  return POLICY_SLUGS.filter((slug) => fs.existsSync(policyPath(slug))).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PolicyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const filePath = policyPath(slug);
  if (!fs.existsSync(filePath)) return { title: '404' };
  const { frontmatter } = await parseMarkdownFile(filePath);
  const parsed = parseOrThrow(pageFrontmatterSchema, frontmatter, filePath);
  return { title: parsed.title };
}

export default async function PolicyPage({ params }: PolicyPageProps) {
  const { slug } = await params;

  if (!POLICY_SLUGS.includes(slug as PolicySlug)) {
    notFound();
  }

  const filePath = policyPath(slug);
  if (!fs.existsSync(filePath)) notFound();

  const { frontmatter, contentHtml } = await parseMarkdownFile(filePath);
  const parsed = parseOrThrow(pageFrontmatterSchema, frontmatter, filePath);

  return (
    <div className="container px-4 py-12 mx-auto md:px-6 max-w-3xl">
      <div className="content-surface p-6">
        <h1 className="mb-4 text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-4">
          {parsed.title}
        </h1>
        {parsed.updatedAt && (
          <p className="text-sm text-[var(--color-text-muted)] mb-8">
            最終更新: {parsed.updatedAt}
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

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { text } from '@/src/lib/ui-text';
import { renderMarkdownToHtml } from '@/src/lib/markdown';
import { articleFrontmatterSchema, parseOrThrow } from '@/src/lib/content-schema';
import type { Metadata } from 'next';

const FILE_PATH = path.join(process.cwd(), 'content', 'ja', 'admissions', 'how-to-join.md');

export async function generateMetadata(): Promise<Metadata> {
  const { data } = matter(fs.readFileSync(FILE_PATH, 'utf8'));
  const frontmatter = parseOrThrow(articleFrontmatterSchema, data, FILE_PATH);

  return {
    title: frontmatter.title || text.nav.admissions,
    description: frontmatter.excerpt || text.nav.admissions,
  };
}

export default async function AdmissionsPage() {
  const { data, content } = matter(fs.readFileSync(FILE_PATH, 'utf8'));
  const frontmatter = parseOrThrow(articleFrontmatterSchema, data, FILE_PATH);
  const contentHtml = await renderMarkdownToHtml(content);

  return (
    <div className="container px-4 py-12 mx-auto md:px-6 max-w-3xl">
      <div className="content-surface p-6">
        <h1 className="mb-10 text-4xl font-bold text-[var(--color-text-primary)]">
          {frontmatter.title}
        </h1>
        <article className="markdown-body" dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </div>
    </div>
  );
}

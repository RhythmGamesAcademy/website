import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { renderMarkdownToHtml } from '@/src/lib/markdown';
import { text } from '@/src/lib/ui-text';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: text.nav.charter,
};

export default async function CharterPage() {
  const filePath = path.join(process.cwd(), 'content', 'ja', 'charter', 'charter.md');
  const { content } = matter(fs.readFileSync(filePath, 'utf8'));
  const contentHtml = await renderMarkdownToHtml(content);

  return (
    <div className="container px-4 py-12 mx-auto md:px-6 max-w-3xl">
      <div className="content-surface p-6">
        <h1 className="mb-12 text-4xl md:text-5xl font-bold text-center text-[var(--color-text-primary)]">
          {text.nav.charter}
        </h1>
        <article
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </div>
    </div>
  );
}

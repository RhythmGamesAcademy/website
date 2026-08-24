import path from 'path';
import { parseMarkdownFile } from '@/src/lib/markdown';
import { parseOrThrow, pageFrontmatterSchema } from '@/src/lib/content-schema';
import { text } from '@/src/lib/ui-text';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: text.nav.about,
};

export default async function AboutPage() {
  const filePath = path.join(process.cwd(), 'content', 'ja', 'about.md');
  const { frontmatter, contentHtml } = await parseMarkdownFile(filePath);
  const parsed = parseOrThrow(pageFrontmatterSchema, frontmatter, filePath);

  return (
    <div className="container px-4 py-12 mx-auto md:px-6 max-w-3xl">
      <div className="content-surface p-6">
        <h1 className="mb-8 text-4xl font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-4">
          {parsed.title || text.nav.about}
        </h1>
        <article
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </div>
    </div>
  );
}

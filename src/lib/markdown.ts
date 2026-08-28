import fs from 'fs';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';

/**
 * frontmatter だけを読む。本文の HTML 化を行わないので、
 * 公開判定やスラッグ列挙のように本文が要らない場面で使う。
 */
export function readFrontmatter(filePath: string): Record<string, unknown> {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return matter(fileContents).data;
}

export async function parseMarkdownFile(filePath: string) {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(content);

  const contentHtml = processedContent.toString();

  return {
    frontmatter: data,
    contentHtml,
  };
}

export async function renderMarkdownToHtml(content: string) {
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(content);

  return processedContent.toString();
}

import fs from 'fs';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

export async function parseMarkdownFile(filePath: string) {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  const processedContent = await remark()
    .use(gfm)
    .use(html)
    .process(content);
    
  const contentHtml = processedContent.toString();
  
  return {
    frontmatter: data,
    contentHtml,
  };
}

export async function renderMarkdownToHtml(content: string) {
  const processedContent = await remark()
    .use(gfm)
    .use(html)
    .process(content);
    
  return processedContent.toString();
}

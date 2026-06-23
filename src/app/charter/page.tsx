import fs from 'fs';
import path from 'path';
import { renderMarkdownToHtml } from '@/src/lib/markdown';
import CharterArticle from '@/src/components/CharterArticle';

export default async function CharterPage() {
  const filePath = path.join(process.cwd(), 'content', 'charter', 'charter.md');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  
  const contentHtml = await renderMarkdownToHtml(fileContents);

  return (
    <div className="container px-4 py-12 mx-auto md:px-6">
      <h1 className="mb-12 text-4xl md:text-5xl font-bold text-center text-text-primary text-glow-cyan">
        学園憲章
      </h1>
      
      <CharterArticle content={contentHtml} />
    </div>
  );
}

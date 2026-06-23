interface CharterArticleProps {
  content: string;
}

export default function CharterArticle({ content }: CharterArticleProps) {
  return (
    <article className="w-full max-w-4xl mx-auto decoration-minimal bg-bg-surface p-8 md:p-12 rounded-lg border border-gray-800">
      <div 
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: content }} 
      />
    </article>
  );
}

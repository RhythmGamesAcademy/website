import { getAllArticles } from '@/src/lib/articles';
import ArticleList from '@/src/components/ArticleList';

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <div className="container px-4 py-12 mx-auto md:px-6">
      <h1 className="mb-8 text-4xl font-bold text-text-primary border-b border-gray-800 pb-4">
        ノーツ（記事一覧）
      </h1>
      
      <ArticleList articles={articles} />
    </div>
  );
}

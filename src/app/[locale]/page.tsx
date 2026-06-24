import { getHeroSlides } from '@/src/lib/hero-slides';
import { getAllArticles } from '@/src/lib/articles';
import HeroSlider from '@/src/components/HeroSlider';
import ArticleList from '@/src/components/ArticleList';

export default async function Home() {
  const slides = getHeroSlides();
  const articles = await getAllArticles();
  
  // Show only top 6 recent articles on the home page
  const recentArticles = articles.slice(0, 6);

  return (
    <div className="container px-4 mx-auto md:px-6 py-8">
      <section className="mb-16">
        <HeroSlider slides={slides} />
      </section>

      <section>
        <div className="flex items-center justify-between mb-8 border-b border-gray-800 pb-4">
          <h2 className="text-3xl font-bold text-text-primary">最新のノーツ</h2>
          <a href="/articles" className="text-accent-cyan hover:text-accent-pink transition-colors underline underline-offset-4">
            すべて見る
          </a>
        </div>
        <ArticleList articles={recentArticles} />
      </section>
    </div>
  );
}

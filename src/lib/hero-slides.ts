import fs from 'fs';
import path from 'path';
import { HeroSlide } from './content-types';
import { heroSlidesSchema, parseOrThrow } from './content-schema';
import { getAllArticleSlugs } from './articles';
import { ROUTE_PREFIX, sitePath } from './paths';

const ARTICLE_ROUTE_PREFIX = `${ROUTE_PREFIX}/articles/`;

/**
 * 未公開記事を指すスライドを警告する。
 *
 * 予約投稿の記事はページごと生成されないため、公開前の記事へリンクした
 * スライドはリンク切れになる。画像と見出しは表示できるのでビルドは通し、
 * ログで気付けるようにするに留める。
 */
function warnAboutUnpublishedLinks(slides: HeroSlide[], filePath: string): void {
  const publishedRoutes = new Set(
    getAllArticleSlugs().map(({ category, slug }) => sitePath(`/articles/${category}/${slug}`))
  );

  for (const slide of slides) {
    if (!slide.linkUrl || !slide.linkUrl.startsWith(ARTICLE_ROUTE_PREFIX)) continue;

    const route = slide.linkUrl.endsWith('/') ? slide.linkUrl : `${slide.linkUrl}/`;
    if (publishedRoutes.has(route)) continue;

    console.warn(
      `[hero-slides] ${filePath}: スライド "${slide.id}" の linkUrl ${slide.linkUrl} は` +
        '未公開または存在しない記事を指しています。公開日時が来るまでリンク切れになります。'
    );
  }
}

export function getHeroSlides(): HeroSlide[] {
  const filePath = path.join(process.cwd(), 'content', 'ja', 'hero-slides.json');

  if (!fs.existsSync(filePath)) {
    return [];
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const parsed = parseOrThrow(heroSlidesSchema, JSON.parse(fileContents), filePath);

  warnAboutUnpublishedLinks(parsed, filePath);

  return parsed.sort((a, b) => a.order - b.order);
}

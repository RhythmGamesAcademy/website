import fs from 'fs';
import path from 'path';
import { HeroSlide } from './content-types';
import { heroSlidesSchema, parseOrThrow } from './content-schema';
import { Locale } from './i18n-config';

export function getHeroSlides(locale: Locale = 'ja'): HeroSlide[] {
  const filePath = path.join(process.cwd(), 'content', locale, 'hero-slides.json');

  if (!fs.existsSync(filePath)) {
    return [];
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const parsed = parseOrThrow(heroSlidesSchema, JSON.parse(fileContents), filePath);

  return parsed.sort((a, b) => a.order - b.order);
}

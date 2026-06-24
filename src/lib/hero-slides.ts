import fs from 'fs';
import path from 'path';
import { HeroSlide } from './content-types';
import { heroSlidesSchema } from './content-schema';
import { Locale } from './i18n-config';

export function getHeroSlides(locale: Locale = 'ja'): HeroSlide[] {
  const filePath = path.join(process.cwd(), 'content', locale, 'hero-slides.json');

  if (!fs.existsSync(filePath)) {
    return [];
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const parsed = heroSlidesSchema.safeParse(JSON.parse(fileContents));

  if (!parsed.success) {
    console.warn(`[hero-slides] Invalid data in ${filePath}:`, parsed.error.flatten());
    return [];
  }

  return parsed.data.sort((a, b) => a.order - b.order);
}

import fs from 'fs';
import path from 'path';
import { HeroSlide } from './content-types';

export function getHeroSlides(): HeroSlide[] {
  const filePath = path.join(process.cwd(), 'content', 'hero-slides.json');
  
  if (!fs.existsSync(filePath)) {
    return [];
  }
  
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const slides: HeroSlide[] = JSON.parse(fileContents);
  
  return slides.sort((a, b) => a.order - b.order);
}

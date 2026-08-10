'use client';

import { useState, useEffect } from 'react';
import { HeroSlide } from '@/src/lib/content-types';
import { text } from '@/src/lib/ui-text';
import HeroSlideItem from './HeroSlideItem';

export default function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  // 自動再生が既定。動きを減らす設定の利用者にはフェードを外すだけで、送りは止めない。
  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length, currentIndex]);

  if (slides.length === 0) return null;

  const currentSlide = slides[currentIndex];

  return (
    <section
      className="relative w-full h-[52vh] min-h-[320px] overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-bg-surface)]"
      aria-roledescription="carousel"
      aria-label={text.home.heroSection}
    >
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {currentSlide.title}
      </div>

      {slides.map((slide, index) => (
        <HeroSlideItem
          key={slide.id}
          slide={slide}
          isActive={index === currentIndex}
          instant={prefersReducedMotion}
          ctaLabel={text.hero.viewDetails}
          slideLabel={`${text.hero.slideRole} ${index + 1}`}
        />
      ))}

      {slides.length > 1 && (
        <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-purple)] ${
                index === currentIndex
                  ? 'w-6 bg-[var(--color-accent-purple)]'
                  : 'w-1.5 bg-[var(--color-border-strong)]/25 hover:bg-[var(--color-text-muted)]'
              }`}
              aria-label={text.hero.goToSlide.replace('{n}', String(index + 1))}
              aria-current={index === currentIndex ? 'true' : undefined}
            />
          ))}
        </div>
      )}
    </section>
  );
}

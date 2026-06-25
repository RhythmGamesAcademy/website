'use client';

import { useState, useEffect, useCallback } from 'react';
import { HeroSlide } from '@/src/lib/content-types';
import { Dictionary } from '@/src/lib/dictionaries/ja';
import HeroSlideItem from './HeroSlideItem';

interface HeroSliderProps {
  slides: HeroSlide[];
  dict: Dictionary;
}

export default function HeroSlider({ slides, dict }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => {
      const reduced = mediaQuery.matches;
      setPrefersReducedMotion(reduced);
      if (reduced) {
        setIsPaused(true);
      }
    };
    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  const shouldAutoPlay = !isPaused && !prefersReducedMotion && slides.length > 1;

  useEffect(() => {
    if (!shouldAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [shouldAutoPlay, slides.length]);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  if (slides.length === 0) return null;

  const currentSlide = slides[currentIndex];

  return (
    <section
      className="relative w-full h-[52vh] min-h-[320px] overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-bg-surface)]"
      aria-roledescription="carousel"
      aria-label={dict.home.heroSection}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        if (!prefersReducedMotion) {
          setIsPaused(false);
        }
      }}
    >
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {currentSlide.title}
      </div>

      {slides.map((slide, index) => (
        <HeroSlideItem
          key={slide.id}
          slide={slide}
          isActive={index === currentIndex}
          ctaLabel={dict.hero.viewDetails}
          slideLabel={`${dict.hero.slideRole} ${index + 1}`}
        />
      ))}

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={togglePause}
            className="absolute top-4 right-4 z-30 px-3 py-1.5 text-xs font-medium rounded-md border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-purple)]"
            aria-pressed={isPaused}
          >
            {isPaused ? dict.hero.play : dict.hero.pause}
          </button>

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
                aria-label={dict.hero.goToSlide.replace('{n}', String(index + 1))}
                aria-current={index === currentIndex ? 'true' : undefined}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

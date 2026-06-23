'use client';

import { useState, useEffect } from 'react';
import { HeroSlide } from '@/src/lib/content-types';
import HeroSlideItem from './HeroSlideItem';

export default function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered, slides.length]);

  if (slides.length === 0) return null;

  return (
    <div 
      className="relative w-full h-[60vh] min-h-[400px] overflow-hidden rounded-lg border border-gray-800"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {slides.map((slide, index) => (
        <HeroSlideItem 
          key={slide.id} 
          slide={slide} 
          isActive={index === currentIndex} 
        />
      ))}

      {/* Dots Indicator */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-accent-cyan shadow-[0_0_8px_rgba(0,240,255,0.8)] scale-125' 
                  : 'bg-text-secondary/50 hover:bg-text-secondary'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

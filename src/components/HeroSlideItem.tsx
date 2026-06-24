import { HeroSlide } from '@/src/lib/content-types';
import Button from './ui/Button';
import Image from 'next/image';

export default function HeroSlideItem({ slide, isActive }: { slide: HeroSlide, isActive: boolean }) {
  return (
    <div 
      className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
      aria-hidden={!isActive}
    >
      {/* Background Image */}
      {slide.image && (
        <Image 
          src={slide.image} 
          alt={slide.title}
          fill
          priority={isActive}
          className="object-cover"
        />
      )}
      
      {/* Light Overlay */}
      <div className="absolute inset-0 bg-[var(--color-bg-elevated)]/60 backdrop-blur-[2px]" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 text-[var(--color-accent-pink)] decoration-strong">
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p className="text-xl md:text-2xl text-[var(--color-text-primary)] mb-8 max-w-2xl font-bold">
            {slide.subtitle}
          </p>
        )}
        <Button href={slide.linkUrl} variant="primary" className="mt-4 text-lg px-8 py-3 bg-[var(--color-bg-surface)]/80 backdrop-blur-md border border-[var(--color-border)] shadow-md hover:shadow-lg">
          詳細を見る
        </Button>
      </div>
    </div>
  );
}

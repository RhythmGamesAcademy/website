import Link from 'next/link';
import { HeroSlide } from '@/src/lib/content-types';
import Button from './ui/Button';

export default function HeroSlideItem({ slide, isActive }: { slide: HeroSlide, isActive: boolean }) {
  return (
    <div 
      className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
    >
      {/* Background Image */}
      {slide.image && (
        <img 
          src={slide.image} 
          alt={slide.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-bg-deep/60" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 text-glow-pink decoration-strong">
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p className="text-xl md:text-2xl text-text-primary mb-8 max-w-2xl text-glow-cyan font-bold">
            {slide.subtitle}
          </p>
        )}
        <Button href={slide.linkUrl} variant="primary" className="mt-4 text-lg px-8 py-3 bg-bg-deep/50 backdrop-blur-sm">
          詳細を見る
        </Button>
      </div>
    </div>
  );
}

import { HeroSlide } from '@/src/lib/content-types';
import { withBasePath } from '@/src/lib/paths';
import Button from './ui/Button';
import Image from 'next/image';

export default function HeroSlideItem({
  slide,
  isActive,
  ctaLabel,
  slideLabel,
}: {
  slide: HeroSlide;
  isActive: boolean;
  ctaLabel: string;
  slideLabel: string;
}) {
  const imageSrc = withBasePath(slide.image);
  const altText = slide.decorative ? '' : slide.alt;

  return (
    <div
      className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
      }`}
      aria-hidden={!isActive}
      inert={!isActive ? true : undefined}
      role="group"
      aria-roledescription={slideLabel}
      aria-label={slide.title}
    >
      {slide.image && (
        <Image
          src={imageSrc}
          alt={altText}
          fill
          priority={isActive}
          className="object-cover opacity-40"
          aria-hidden={slide.decorative ? true : undefined}
        />
      )}

      <div className="absolute inset-0 bg-[var(--color-bg-page)]/75" aria-hidden="true" />

      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl md:text-5xl font-semibold mb-3 text-[var(--color-text-primary)] tracking-wide">
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p className="text-base md:text-lg text-[var(--color-text-secondary)] mb-8 max-w-xl leading-relaxed">
            {slide.subtitle}
          </p>
        )}
        {isActive && (
          <Button href={slide.linkUrl} variant="outline" className="mt-2 px-6 py-2.5">
            {ctaLabel}
          </Button>
        )}
      </div>
    </div>
  );
}

import Link from 'next/link';
import { text } from '@/src/lib/ui-text';
import { sitePath } from '@/src/lib/paths';

export default function NotFound() {
  return (
    <div className="container px-4 py-24 mx-auto md:px-6 max-w-2xl text-center" data-pagefind-ignore>
      <div className="content-surface p-6">
        <p className="text-sm font-semibold text-[var(--color-accent-purple)] mb-3">404</p>
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
          {text.notFound.title}
        </h1>
        <p className="text-[var(--color-text-secondary)] mb-8">{text.notFound.description}</p>
        <Link
          href={sitePath('/')}
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-md border border-[var(--color-border)] bg-[var(--color-bg-surface)] hover:border-[var(--color-accent-purple)] transition-colors"
        >
          {text.notFound.backHome}
        </Link>
      </div>
    </div>
  );
}

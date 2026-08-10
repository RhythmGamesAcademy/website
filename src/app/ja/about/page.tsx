import Link from 'next/link';
import { text } from '@/src/lib/ui-text';
import { sitePath } from '@/src/lib/paths';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: text.nav.about,
};

export default function AboutPage() {
  return (
    <div className="container px-4 py-12 mx-auto md:px-6 max-w-3xl">
      <div className="content-surface p-6">
        <h1 className="mb-8 text-4xl font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-4">
          {text.nav.about}
        </h1>

        <section className="mb-10">
          <p className="text-[var(--color-text-secondary)] leading-8">
            音楽ゲーム学園は、音楽ゲームに関するあらゆる知的・文化的遺産の集積・継承・発展を恒久的な使命とするアカデミックファンコミュニティです。
          </p>
        </section>

        <nav aria-label="このセクションのナビゲーション">
          <ul className="flex flex-col gap-3">
            <li>
              <Link
                href={sitePath('/about/organization')}
                className="block p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] hover:border-[var(--color-accent-lavender)] hover:bg-[var(--color-bg-elevated)] transition-all text-[var(--color-text-primary)] font-medium"
              >
                {text.nav.organization}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

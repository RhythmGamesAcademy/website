'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-text-primary focus:outline-none"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 w-full px-4 pt-2 pb-4 border-b border-gray-800 top-16 bg-bg-deep/95 backdrop-blur-md">
          <nav className="flex flex-col gap-4">
            <Link 
              href="/" 
              className="text-base font-medium transition-colors hover:text-accent-cyan hover:text-glow-cyan"
              onClick={() => setIsOpen(false)}
            >
              ホーム
            </Link>
            <Link 
              href="/articles" 
              className="text-base font-medium transition-colors hover:text-accent-cyan hover:text-glow-cyan"
              onClick={() => setIsOpen(false)}
            >
              ノーツ
            </Link>
            <Link 
              href="/articles/admissions/how-to-join" 
              className="text-base font-medium transition-colors hover:text-accent-cyan hover:text-glow-cyan"
              onClick={() => setIsOpen(false)}
            >
              入学案内
            </Link>
            <Link 
              href="/charter" 
              className="text-base font-medium transition-colors hover:text-accent-cyan hover:text-glow-cyan"
              onClick={() => setIsOpen(false)}
            >
              学園憲章
            </Link>
            <a 
              href="mailto:rhythmgames.academy@gmail.com" 
              className="text-base font-medium transition-colors hover:text-accent-cyan hover:text-glow-cyan"
              onClick={() => setIsOpen(false)}
            >
              お問い合わせ
            </a>

            <div className="flex items-center gap-6 pt-4 mt-2 border-t border-gray-800">
              <button aria-label="Search" className="flex items-center gap-2 text-text-secondary hover:text-accent-cyan transition-colors" onClick={() => setIsOpen(false)}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <span>検索</span>
              </button>
              <button aria-label="Toggle Language" className="flex items-center gap-2 font-bold text-text-secondary hover:text-accent-pink transition-colors" onClick={() => setIsOpen(false)}>
                <span>EN</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}

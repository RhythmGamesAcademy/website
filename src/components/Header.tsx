import Link from 'next/link';
import MobileNav from './MobileNav';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-bg-deep/90 backdrop-blur-md">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-6">
        <Link href="/" className="flex items-center gap-2 transition-all hover:decoration-strong text-glow-pink">
          <span className="text-xl font-bold tracking-wider text-text-primary">音楽ゲーム学園</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-accent-cyan hover:text-glow-cyan">
            ホーム
          </Link>
          <Link href="/articles" className="text-sm font-medium transition-colors hover:text-accent-cyan hover:text-glow-cyan">
            ノーツ
          </Link>
          <Link href="/articles/admissions/how-to-join" className="text-sm font-medium transition-colors hover:text-accent-cyan hover:text-glow-cyan">
            入学案内
          </Link>
          <Link href="/charter" className="text-sm font-medium transition-colors hover:text-accent-cyan hover:text-glow-cyan">
            学園憲章
          </Link>
          <a href="mailto:rhythmgames.academy@gmail.com" className="text-sm font-medium transition-colors hover:text-accent-cyan hover:text-glow-cyan">
            お問い合わせ
          </a>

          <div className="flex items-center gap-4 pl-4 border-l border-gray-700">
            <button aria-label="Search" className="text-text-secondary hover:text-accent-cyan transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
            <button aria-label="Toggle Language" className="text-sm font-bold text-text-secondary hover:text-accent-pink transition-colors">
              EN
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </header>
  );
}

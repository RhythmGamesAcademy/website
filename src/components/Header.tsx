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
        </nav>

        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </header>
  );
}

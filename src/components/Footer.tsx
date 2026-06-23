import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-8 border-t border-gray-800 bg-bg-deep mt-auto">
      <div className="container px-4 mx-auto md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-lg font-bold text-text-primary tracking-wider">音楽ゲーム学園</span>
          <p className="text-xs text-text-secondary">
            アカデミックファンコミュニティ
          </p>
        </div>
        
        <nav className="flex gap-6">
          <Link href="/charter" className="text-sm text-text-secondary hover:text-accent-pink transition-colors">
            学園憲章
          </Link>
          <a href="#" className="text-sm text-text-secondary hover:text-accent-cyan transition-colors">
            Discord
          </a>
        </nav>
        
        <div className="text-xs text-text-secondary">
          &copy; {new Date().getFullYear()} Music Game Academy.
        </div>
      </div>
    </footer>
  );
}

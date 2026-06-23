import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import '@/src/styles/globals.css';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';

const notoSansJP = Noto_Sans_JP({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata: Metadata = {
  title: '音楽ゲーム学園',
  description: '音楽ゲームに関するあらゆる知的・文化的遺産の集積・継承・発展を恒久的な使命とするアカデミックファンコミュニティ。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.className} min-h-screen flex flex-col relative`}>
        {/* Global Fancy Background */}
        <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-bg-deep via-bg-elevated to-bg-deep">
          <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-accent-pink/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] bg-accent-cyan/10 rounded-full blur-[120px] pointer-events-none" />
        </div>

        <Header />
        <main className="flex-grow z-0">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

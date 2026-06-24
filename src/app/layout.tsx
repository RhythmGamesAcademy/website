import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import '@/src/styles/globals.css';

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
        {children}
      </body>
    </html>
  );
}

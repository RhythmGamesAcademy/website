import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import '@/src/styles/globals.css';
import { siteConfig } from '@/src/lib/site-config';
import { withBasePath } from '@/src/lib/paths';
import BasePathScript from '@/src/components/BasePathScript';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import SiteSearch from '@/src/components/SiteSearch';
import Breadcrumbs from '@/src/components/Breadcrumbs';
import { getArticleTitleMap } from '@/src/lib/articles';

const notoSansJP = Noto_Sans_JP({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    template: '%s | 音楽ゲーム学園',
    default: '音楽ゲーム学園',
  },
  description:
    '音楽ゲームに関する知的文化遺産を集積・継承・発展させていくためのアカデミックファンコミュニティ。',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const articleTitles = await getArticleTitleMap();

  return (
    <html lang="ja">
      <body className={`${notoSansJP.className} min-h-screen flex flex-col relative`}>
        <BasePathScript />
        {/* CSS の url() には basePath が付かないため、画像だけカスタムプロパティで渡す */}
        <div
          className="ambient-bg pointer-events-none"
          aria-hidden="true"
          style={
            {
              '--ambient-image': `url('${withBasePath('/images/background.png')}')`,
            } as React.CSSProperties
          }
        />

        <Header />
        <Breadcrumbs articleTitles={articleTitles} />
        <SiteSearch />

        <main className="flex-grow z-0" id="main-content" data-pagefind-body>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

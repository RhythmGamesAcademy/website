'use client';

import { useEffect, useState } from 'react';

export default function RootPage() {
  const [redirecting, setRedirecting] = useState(true);

  useEffect(() => {
    // Perform client-side redirect
    window.location.replace('./ja/');
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bg-page text-text-primary p-4">
      <h1 className="text-3xl font-bold mb-4">音楽ゲーム学園</h1>
      {redirecting ? (
        <p>日本語サイトへ移動しています...</p>
      ) : (
        <a href="./ja/" className="text-accent-pink hover:underline">
          日本語ページへ移動
        </a>
      )}
      <noscript>
        <a href="./ja/" className="text-accent-pink hover:underline">
          日本語ページへ移動
        </a>
      </noscript>
    </main>
  );
}

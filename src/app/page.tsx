export const metadata = {
  title: 'Redirecting...',
};

export default function RootPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-page)] text-white">
      <script
        dangerouslySetInnerHTML={{
          __html: `
            const pathname = window.location.pathname.replace(/\/$/, '');
            const target = pathname + '/ja/';
            if (window.location.pathname !== target) window.location.replace(target);
          `,
        }}
      />
      <p className="text-sm text-[var(--color-text-secondary)]">Redirecting to the Japanese homepage…</p>
    </div>
  );
}

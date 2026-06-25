export const metadata = {
  title: 'Redirecting...',
};

export default function RootPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-page)] text-white">
      <script
        dangerouslySetInnerHTML={{
          __html: "window.location.replace(window.location.pathname.replace(/\\/?$/, '/ja/'));",
        }}
      />
      <p className="text-sm text-[var(--color-text-secondary)]">Redirecting to the Japanese homepage…</p>
    </div>
  );
}

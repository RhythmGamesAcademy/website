import { locales, Locale } from '@/src/lib/i18n-config';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  const safeLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : 'ja';

  return (
    <>
      {/* Subtle vaporwave ambient background */}
      <div className="fixed inset-0 z-[-1] vaporwave-gradient pointer-events-none">
        <div className="absolute top-0 right-0 w-[30rem] h-[30rem] rounded-full blur-[100px] opacity-30"
          style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--color-accent-lavender) 40%, transparent) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="absolute bottom-0 left-0 w-[24rem] h-[24rem] rounded-full blur-[80px] opacity-20"
          style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--color-accent-blush) 60%, transparent) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
      </div>

      <Header locale={safeLocale} />
      <main className="flex-grow z-0" id="main-content">
        {children}
      </main>
      <Footer locale={safeLocale} />
    </>
  );
}

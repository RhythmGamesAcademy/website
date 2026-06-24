import { locales } from '@/src/lib/i18n-config';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export default function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
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
    </>
  );
}

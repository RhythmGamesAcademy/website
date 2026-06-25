import { locales, Locale } from '@/src/lib/i18n-config';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import SiteSearch from '@/src/components/SiteSearch';
import Breadcrumbs from '@/src/components/Breadcrumbs';
import SetHtmlLang from '@/src/components/SetHtmlLang';
import { getDictionary } from '@/src/lib/get-dictionary';

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
  const dict = getDictionary(safeLocale);

  return (
    <>
      <SetHtmlLang locale={safeLocale} />
      <div className="ambient-bg pointer-events-none" aria-hidden="true" />

      <Header locale={safeLocale} />
      <Breadcrumbs locale={safeLocale} />
      <SiteSearch locale={safeLocale} dict={dict} />

      <main
        className="flex-grow z-0"
        id="main-content"
        data-pagefind-body
        data-pagefind-filter={`locale:${safeLocale}`}
      >
        {children}
      </main>
      <Footer locale={safeLocale} />
    </>
  );
}

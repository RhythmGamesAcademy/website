import { locales, Locale } from '@/src/lib/i18n-config';
import { getDictionary } from '@/src/lib/getDictionary';
import type { Metadata } from 'next';

interface OrganizationPageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: OrganizationPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : 'ja';
  const dict = getDictionary(safeLocale);
  return { title: `${dict.nav.organization} | 音楽ゲーム学園` };
}

export default async function OrganizationPage({ params }: OrganizationPageProps) {
  const { locale } = await params;
  const safeLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : 'ja';
  const dict = getDictionary(safeLocale);
  const isJa = safeLocale === 'ja';

  return (
    <div className="container px-4 py-12 mx-auto md:px-6 max-w-3xl">
      <h1 className="mb-8 text-4xl font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-4">
        {dict.nav.organization}
      </h1>
      <div className="markdown-body">
        {isJa ? (
          <>
            <h2>設立の経緯</h2>
            <p>
              音楽ゲーム学園は、音楽ゲームコミュニティの有志により設立されたアカデミックファンコミュニティです。
              設立の詳細については<a href={`/${safeLocale}/charter/`}>学園憲章</a>をご参照ください。
            </p>
            <h2>構成</h2>
            <p>
              本学園は、研究・創作・講義・考察などの活動を行うすべての構成員により構成されます。
              組織の詳細については、今後公開予定です。
            </p>
          </>
        ) : (
          <>
            <h2>About the Organization</h2>
            <p>
              Music Game Academy was established by volunteers in the rhythm game community.
              For more details, please refer to the <a href={`/${safeLocale}/charter/`}>Charter</a>.
            </p>
            <h2>Structure</h2>
            <p>
              The Academy is composed of all members who engage in research, creative work, lectures, and discussions.
              Further organizational details will be published in the future.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

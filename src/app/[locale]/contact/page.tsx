import { locales, Locale } from '@/src/lib/i18n-config';
import { getDictionary } from '@/src/lib/get-dictionary';
import { siteConfig } from '@/src/lib/site-config';
import type { Metadata } from 'next';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : 'ja';
  const dict = getDictionary(safeLocale);
  return { title: `${dict.nav.contact} | 音楽ゲーム学園` };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const safeLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : 'ja';
  const dict = getDictionary(safeLocale);
  const isJa = safeLocale === 'ja';

  return (
    <div className="container px-4 py-16 mx-auto md:px-6 max-w-3xl">
      <h1 className="mb-10 text-3xl font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border-strong)] pb-4">
        {dict.nav.contact}
      </h1>

      <div className="markdown-body">
        {isJa ? (
          <>
            <p>
              音楽ゲーム学園へのお問い合わせは、以下のメールアドレスより承っております。<br />
              お問い合わせ内容によっては、返信にお時間をいただく場合や、お答えできない場合がございますので、あらかじめご了承ください。
            </p>
            <div className="p-8 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-md my-10 text-center">
              <h2 className="!mt-0 !mb-4 !border-none !text-lg !font-bold">お問い合わせ窓口</h2>
              <p className="font-bold text-xl mb-0 text-[var(--color-accent-pink)]">
                <a href={`mailto:${siteConfig.contactEmail}`} className="hover:underline">
                  {siteConfig.contactEmail}
                </a>
              </p>
            </div>
            <h3 className="!mt-12 !border-b !border-[var(--color-border-subtle)] !pb-2">Discord コミュニティ</h3>
            <p>
              学園の日常的な議論や交流は、専用の Discord サーバーにて行われています。<br />
              参加をご希望の方は、<a href={`/${safeLocale}/admissions/`}>Admission</a>のページをご確認ください。
            </p>
          </>
        ) : (
          <>
            <p>
              For inquiries regarding Music Game Academy, please contact us at the email address below.<br />
              Please note that depending on the nature of your inquiry, it may take some time to respond, or we may be unable to provide an answer.
            </p>
            <div className="p-8 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-md my-10 text-center">
              <h2 className="!mt-0 !mb-4 !border-none !text-lg !font-bold">Contact Email</h2>
              <p className="font-bold text-xl mb-0 text-[var(--color-accent-pink)]">
                <a href={`mailto:${siteConfig.contactEmail}`} className="hover:underline">
                  {siteConfig.contactEmail}
                </a>
              </p>
            </div>
            <h3 className="!mt-12 !border-b !border-[var(--color-border-subtle)] !pb-2">Discord Community</h3>
            <p>
              Daily discussions and interactions take place on our dedicated Discord server.<br />
              If you wish to join, please check the <a href={`/${safeLocale}/admissions/`}>Admissions</a> page.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

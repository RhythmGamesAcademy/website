import Link from 'next/link';
import { text } from '@/src/lib/ui-text';
import { sitePath } from '@/src/lib/paths';
import { siteConfig } from '@/src/lib/site-config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: text.nav.contact,
};

export default function ContactPage() {
  return (
    <div className="container px-4 py-16 mx-auto md:px-6 max-w-3xl">
      <div className="content-surface p-6">
        <h1 className="mb-10 text-3xl font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border-strong)] pb-4">
          {text.nav.contact}
        </h1>

        <div className="markdown-body">
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
          {/* <h3 className="!mt-12 !border-b !border-[var(--color-border-subtle)] !pb-2">Discord コミュニティ</h3>
          <p>
            学園の日常的な議論や交流は、専用の Discord サーバーにて行われています。<br />
            参加をご希望の方は、<Link href={sitePath('/admissions')}>{text.nav.admissions}</Link>のページをご確認ください。
          </p> */}
        </div>
      </div>
    </div>
  );
}

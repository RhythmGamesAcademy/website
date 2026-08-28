import { ROUTE_PREFIX } from '@/src/lib/paths';
import { text } from '@/src/lib/ui-text';

export const metadata = {
  title: text.redirect.title,
};

/**
 * The site lives under the /ja/ prefix. This root page bounces visitors there,
 * since a static export cannot issue a server-side redirect.
 */
export default function RootPage() {
  return (
    <div className="container px-4 py-24 mx-auto text-center" data-pagefind-ignore>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function () {
              var base = window.location.pathname.replace(/\\/$/, '');
              var target = base + '${ROUTE_PREFIX}/';
              if (window.location.pathname !== target) window.location.replace(target);
            })();
          `,
        }}
      />
      <p className="text-sm text-[var(--color-text-secondary)]">{text.redirect.message}</p>
    </div>
  );
}

import { siteConfig } from '@/src/lib/site-config';

export default function BasePathScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `window.__SITE_BASE_PATH__=${JSON.stringify(siteConfig.basePath)};`,
      }}
    />
  );
}

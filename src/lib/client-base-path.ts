declare global {
  interface Window {
    __SITE_BASE_PATH__?: string;
  }
}

export function getClientBasePath(): string {
  if (typeof window !== 'undefined' && window.__SITE_BASE_PATH__ !== undefined) {
    return window.__SITE_BASE_PATH__;
  }
  return process.env.NEXT_PUBLIC_BASE_PATH ?? '';
}

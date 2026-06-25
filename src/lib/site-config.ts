function resolveBasePath(): string {
  if (process.env.GITHUB_ACTIONS) {
    const repo = process.env.GITHUB_REPOSITORY?.replace(/.*?\//, '') || 'website';
    return `/${repo}`;
  }
  return process.env.NEXT_PUBLIC_BASE_PATH ?? '';
}

export const siteConfig = {
  name: '音楽ゲーム学園',
  nameEn: 'Rhythm Games Academy',
  defaultLocale: 'ja',
  contactEmail: 'rhythmgames.academy@gmail.com',
  discordUrl: null as string | null,
  baseUrl: 'https://rhythmgamesacademy.github.io/website',
  basePath: resolveBasePath(),
  copyrightYear: 2026,
};

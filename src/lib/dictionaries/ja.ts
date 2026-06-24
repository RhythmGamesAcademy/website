export const ja = {
  nav: {
    home: 'ホーム',
    articles: 'ノーツ',
    admissions: '入学案内',
    charter: '学園憲章',
    about: '学園について',
    organization: '組織概要',
    contact: 'お問い合わせ',
    search: '検索',
  },
  footer: {
    description: 'アカデミックファンコミュニティ',
    privacyPolicy: 'プライバシーポリシー',
    sitePolicy: 'サイトポリシー',
    accessibility: 'アクセシビリティ方針',
  },
} as const;

export type Dictionary = typeof ja;

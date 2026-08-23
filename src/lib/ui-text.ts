export const text = {
  siteName: '音楽ゲーム学園',
  nav: {
    home: 'ホーム',
    articles: 'ニュース',
    admissions: '入学案内',
    charter: '学園憲章',
    about: '学園について',
    organization: '組織概要',
    contact: 'お問い合わせ',
    search: 'サイト内検索',
  },
  search: {
    placeholder: 'キーワードを入力（スペースで複数語）',
    loading: '検索中…',
    noResults: '一致するページが見つかりません',
    unavailable: '検索は本番ビルド後に利用できます',
    matchAll: '全語一致',
    matchPartial: '{n}語一致',
    untitled: 'タイトルのないページ',
  },
  home: {
    heroSection: 'ピックアップ',
    latestNotes: '最新のニュース',
    viewAll: 'すべて表示',
  },
  articles: {
    empty: '記事がありません。',
    all: 'すべて',
  },
  hero: {
    viewDetails: '詳細を見る',
    slideRole: 'スライド',
    goToSlide: 'スライド {n} へ移動',
  },
  mobileNav: {
    open: 'メニューを開く',
    close: 'メニューを閉じる',
  },
  notFound: {
    title: 'ページが見つかりません',
    description: 'お探しのページは存在しないか、移動した可能性があります。',
    backHome: 'ホームへ戻る',
  },
  breadcrumbs: {
    label: 'パンくずリスト',
  },
  landmarks: {
    mainNav: 'メインナビゲーション',
    mobileNav: 'モバイルナビゲーション',
    footerNav: 'フッターリンク',
  },
  sitemap: {
    mainMenu: 'メインメニュー',
    policies: 'ポリシー',
  },
  redirect: {
    title: 'ホームへ移動しています',
    message: 'ホームページへ移動しています…',
  },
  footer: {
    description: 'アカデミックファンコミュニティ',
    privacyPolicy: 'プライバシーポリシー',
    sitePolicy: 'サイトポリシー',
    accessibility: 'アクセシビリティ方針',
    sitemap: 'サイトマップ',
    groupAbout: '学園について',
    groupInfo: '参加・お問い合わせ',
    managedBy: '本サイトの管理・運営は学園運営事務局が行っています。',
  },
};

export type UiText = typeof text;

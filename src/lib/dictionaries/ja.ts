export const ja = {
  siteName: '音楽ゲーム学園',
  nav: {
    home: 'ホーム',
    articles: 'ノーツ',
    admissions: '入学案内',
    charter: '学園憲章',
    about: '学園について',
    organization: '組織概要',
    contact: 'お問い合わせ',
    search: 'サイト内検索',
  },
  search: {
    placeholder: 'キーワードを入力（スペース区切りで複数語）',
    loading: '検索中…',
    noResults: '一致するページが見つかりません',
    unavailable: '検索は本番ビルド後に利用できます',
    matchAll: '全語一致',
    matchPartial: '{n}語一致',
  },
  home: {
    heroSection: 'ヒーロースライダー',
    latestNotes: '最新のノーツ',
    viewAll: 'すべて見る',
  },
  articles: {
    empty: '記事がありません。',
  },
  hero: {
    viewDetails: '詳細を見る',
    pause: 'スライドショーを一時停止',
    play: 'スライドショーを再生',
    slideRole: 'スライド',
    goToSlide: 'スライド {n} へ移動',
  },
  languageSwitcher: {
    label: '言語切替',
    switchToJa: '日本語に切り替え',
    switchToEn: 'English に切り替え',
    unavailable: 'このページの英語版は準備中です',
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
  footer: {
    description: 'アカデミックファンコミュニティ',
    privacyPolicy: 'プライバシーポリシー',
    sitePolicy: 'サイトポリシー',
    accessibility: 'アクセシビリティ方針',
    sitemap: 'サイトマップ',
    groupAbout: '学園について',
    groupInfo: '参加・お問い合わせ',
    managedBy:
      '本サイトの管理・運営は学園運営事務局が行っています。',
  },
};

export type Dictionary = typeof ja;

'use client';

import { useEffect } from 'react';
import { Locale } from '@/src/lib/i18n-config';

export default function SetHtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}

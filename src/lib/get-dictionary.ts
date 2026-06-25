import { Locale } from './i18n-config';
import { ja } from './dictionaries/ja';
import { en } from './dictionaries/en';
import { Dictionary } from './dictionaries/ja';

const dictionaries: Record<Locale, Dictionary> = { ja, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? ja;
}

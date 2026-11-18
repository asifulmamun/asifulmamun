import en from '@/src/data/en/common.json';
import bn from '@/src/data/bn/common.json';
import type { Locale } from '@/src/data/languages';

export const commonContent = {
  en,
  bn,
} satisfies Record<Locale, typeof en>;

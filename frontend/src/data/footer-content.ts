import en from '@/src/data/en/footer.json';
import bn from '@/src/data/bn/footer.json';
import type { Locale } from '@/src/data/languages';

export const footerContent = { en, bn } satisfies Record<Locale, typeof en>;

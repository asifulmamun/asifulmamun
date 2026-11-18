import enPages from '@/src/data/en/footer-pages.json';
import bnPages from '@/src/data/bn/footer-pages.json';
import type { Locale } from '@/src/data/languages';

export type FooterPageSlug = keyof typeof enPages;
export const footerPages = { en: enPages, bn: bnPages } satisfies Record<Locale, typeof enPages>;

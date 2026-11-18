import enAbout from '@/src/data/en/about.json';
import enContact from '@/src/data/en/contact.json';
import enHome from '@/src/data/en/home.json';
import enService from '@/src/data/en/service.json';
import bnAbout from '@/src/data/bn/about.json';
import bnContact from '@/src/data/bn/contact.json';
import bnHome from '@/src/data/bn/home.json';
import bnService from '@/src/data/bn/service.json';
import type { Locale } from '@/src/data/languages';
import { commonContent } from '@/src/data/common-content';

export const localeContent = {
  en: {
    common: commonContent.en,
    home: enHome,
    about: enAbout,
    service: enService,
    contact: enContact,
  },
  bn: {
    common: commonContent.bn,
    home: bnHome,
    about: bnAbout,
    service: bnService,
    contact: bnContact,
  },
} satisfies Record<
  Locale,
  {
    common: typeof commonContent.en;
    home: typeof enHome;
    about: typeof enAbout;
    service: typeof enService;
    contact: typeof enContact;
  }
>;

export type PageKey = 'home' | 'about' | 'service' | 'contact';
export type HomeContent = typeof enHome;
export type SimplePageContent = typeof enAbout;

export const pageSlugs = ['', 'about', 'service', 'contact'] as const;

export function getPageKey(slug?: string[]): PageKey | undefined {
  const path = slug?.join('/') ?? '';

  if (path === '') return 'home';
  if (path === 'about' || path === 'service' || path === 'contact') {
    return path;
  }
  return undefined;
}

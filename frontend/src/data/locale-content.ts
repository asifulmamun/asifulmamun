import enAbout from '@/src/data/en/about.json';
import enContact from '@/src/data/en/contact.json';
import enHome from '@/src/data/en/home.json';
import enPortfolio from '@/src/data/en/portfolio.json';
import enService from '@/src/data/en/service.json';
import bnAbout from '@/src/data/bn/about.json';
import bnContact from '@/src/data/bn/contact.json';
import bnHome from '@/src/data/bn/home.json';
import bnPortfolio from '@/src/data/bn/portfolio.json';
import bnService from '@/src/data/bn/service.json';
import type { Locale } from '@/src/data/languages';
import { commonContent } from '@/src/data/common-content';

export const localeContent = {
  en: {
    common: commonContent.en,
    home: enHome,
    about: enAbout,
    portfolio: enPortfolio,
    service: enService,
    contact: enContact,
  },
  bn: {
    common: commonContent.bn,
    home: bnHome,
    about: bnAbout,
    portfolio: bnPortfolio,
    service: bnService,
    contact: bnContact,
  },
} satisfies Record<
  Locale,
  {
    common: typeof commonContent.en;
    home: typeof enHome;
    about: typeof enAbout;
    portfolio: typeof enPortfolio;
    service: typeof enService;
    contact: typeof enContact;
  }
>;

export type PageKey = 'home' | 'about' | 'portfolio' | 'service' | 'contact';
export type HomeContent = typeof enHome;
export type AboutContent = typeof enAbout;
export type PortfolioContent = typeof enPortfolio;
export type ContactContent = typeof enContact;
export type SimplePageContent = typeof enService;

export const pageSlugs = ['', 'about', 'portfolio', 'service', 'contact'] as const;

export function getPageKey(slug?: string[]): PageKey | undefined {
  const path = slug?.join('/') ?? '';

  if (path === '') return 'home';
  if (path === 'about' || path === 'portfolio' || path === 'service' || path === 'contact') {
    return path;
  }
  return undefined;
}

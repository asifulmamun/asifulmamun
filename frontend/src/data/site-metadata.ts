import type { Metadata } from 'next';
import {
  getLocalePath,
  isLocale,
  languages,
  type Locale,
} from '@/src/data/languages';
import {
  localeContent,
  type PageKey,
} from '@/src/data/locale-content';

const defaultSiteUrl = 'https://asifulmamun.info.bd';
const siteUrl = new URL(
  process.env.NEXT_PUBLIC_BASE_URL || '/',
  defaultSiteUrl,
).origin;

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Asiful Mamun | Software Engineer',
    template: '%s | Asiful Mamun',
  },
  description: 'Asiful Mamun is a Software Engineer building fast, clean websites.',
  openGraph: {
    siteName: 'Asiful Mamun',
    type: 'website',
  },
};

export function createPageMetadata(locale: Locale, page: PageKey): Metadata {
  const pageData = localeContent[locale][page];
  const pagePath = getLocalePath(locale, page === 'home' ? '' : page);
  const alternateLanguages: Record<string, string> = {};

  for (const code of Object.keys(languages)) {
    if (!isLocale(code)) continue;
    const language = languages[code];
    alternateLanguages[language.htmlLang] = getLocalePath(
      code,
      page === 'home' ? '' : page,
    );
  }

  alternateLanguages['x-default'] = getLocalePath(
    'en',
    page === 'home' ? '' : page,
  );

  return {
    title: { absolute: pageData.seo.title },
    description: pageData.seo.description,
    alternates: {
      canonical: pagePath,
      languages: alternateLanguages,
    },
    openGraph: {
      title: pageData.seo.title,
      description: pageData.seo.description,
      url: pagePath,
      siteName: 'Asiful Mamun',
      locale: languages[locale].openGraphLocale,
      type: 'website',
    },
  };
}

export function getSiteUrl(): string {
  return siteUrl;
}

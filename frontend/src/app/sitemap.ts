import type { MetadataRoute } from 'next';
import { getLocalePath, isLocale, languages } from '@/src/data/languages';
import { getSiteUrl } from '@/src/data/site-metadata';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', 'about', 'service', 'contact', 'privacy-policy', 'faq', 'terms', 'affiliate'];
  const siteUrl = getSiteUrl();

  return Object.keys(languages).flatMap((locale) => {
    if (!isLocale(locale)) return [];

    return pages.map((page, index) => ({
      url: `${siteUrl}${getLocalePath(locale, page)}`,
      changeFrequency: 'monthly' as const,
      priority: index === 0 ? 1 : 0.7,
    }));
  });
}
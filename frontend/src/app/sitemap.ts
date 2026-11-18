import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const siteUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://asifulmamun.info.bd').replace(/\/$/, '');

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/service', '/contact'];

  return routes.map((route, index) => ({
      url: `${siteUrl}${route}`,
      changeFrequency: 'monthly',
      priority: index === 0 ? 1 : 0.7,
    }));
}
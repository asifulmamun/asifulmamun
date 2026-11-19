import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PortfolioPage from '@/src/components/pages/portfolio-page';
import {
  getLocalizedStaticParams,
  isLocale,
} from '@/src/data/languages';
import { createPageMetadata } from '@/src/data/site-metadata';

export const dynamicParams = false;

type PageParams = Promise<{ lang: string }>;

export function generateStaticParams() {
  return getLocalizedStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang) || lang === 'en') notFound();
  return createPageMetadata(lang, 'portfolio');
}

export default async function LocalizedPortfolio({
  params,
}: {
  params: PageParams;
}) {
  const { lang } = await params;
  if (!isLocale(lang) || lang === 'en') notFound();
  return <PortfolioPage lang={lang} />;
}

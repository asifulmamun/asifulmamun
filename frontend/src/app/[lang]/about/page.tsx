import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AboutPage from '@/src/components/pages/about-page';
import {
  getLocalizedStaticParams,
  isLocale,
} from '@/src/data/languages';
import { localeContent } from '@/src/data/locale-content';
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
  return createPageMetadata(lang, 'about');
}

export default async function LocalizedAbout({
  params,
}: {
  params: PageParams;
}) {
  const { lang } = await params;
  if (!isLocale(lang) || lang === 'en') notFound();
  return <AboutPage content={localeContent[lang].about} />;
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServicePage from '@/src/components/pages/service-page';
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
  return createPageMetadata(lang, 'service');
}

export default async function LocalizedService({
  params,
}: {
  params: PageParams;
}) {
  const { lang } = await params;
  if (!isLocale(lang) || lang === 'en') notFound();
  return <ServicePage content={localeContent[lang].service} />;
}

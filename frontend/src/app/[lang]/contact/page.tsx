import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ContactPage from '@/src/components/pages/contact-page';
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
  return createPageMetadata(lang, 'contact');
}

export default async function LocalizedContact({
  params,
}: {
  params: PageParams;
}) {
  const { lang } = await params;
  if (!isLocale(lang) || lang === 'en') notFound();
  return <ContactPage content={localeContent[lang].contact} />;
}

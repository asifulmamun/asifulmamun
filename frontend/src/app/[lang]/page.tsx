import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HomePage from '@/src/components/pages/home-page';
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
  return createPageMetadata(lang, 'home');
}

export default async function LocalizedHome({
  params,
}: {
  params: PageParams;
}) {
  const { lang } = await params;
  if (!isLocale(lang) || lang === 'en') notFound();
  return (
    <HomePage
      content={localeContent[lang].home}
      experiences={localeContent[lang].about.experience.items.slice(0, 3).map(({ company, role, location, period }) => ({ company, role, location, period }))}
      locale={lang}
    />
  );
}

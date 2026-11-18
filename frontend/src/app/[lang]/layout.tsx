import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteShell, {
  siteBodyClassName,
} from '@/src/components/global/site-shell';
import {
  getLocalizedStaticParams,
  isLocale,
  languages,
} from '@/src/data/languages';
import { siteMetadata } from '@/src/data/site-metadata';
import '../globals.css';

export const metadata: Metadata = siteMetadata;
export const dynamicParams = false;

export function generateStaticParams() {
  return getLocalizedStaticParams();
}

export default async function LocalizedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang) || lang === 'en') notFound();

  return (
    <html lang={languages[lang].htmlLang} suppressHydrationWarning>
      <body className={siteBodyClassName}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

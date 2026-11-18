import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AffiliatePage from '@/src/components/pages/affiliate-page';
import content from '@/src/data/bn/affiliate.json';
import { getLocalizedStaticParams, isLocale } from '@/src/data/languages';

export const dynamicParams = false;
export function generateStaticParams() { return getLocalizedStaticParams(); }
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> { const { lang } = await params; if (!isLocale(lang) || lang === 'en') notFound(); return { title: content.seo.title, description: content.seo.description }; }
export default async function Affiliate({ params }: { params: Promise<{ lang: string }> }) { const { lang } = await params; if (!isLocale(lang) || lang === 'en') notFound(); return <AffiliatePage content={content} />; }

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import InfoPage from '@/src/components/pages/info-page';
import { footerPages } from '@/src/data/footer-pages';
import { getLocalizedStaticParams, isLocale } from '@/src/data/languages';

export const dynamicParams = false;
export function generateStaticParams() { return getLocalizedStaticParams(); }
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> { const { lang } = await params; if (!isLocale(lang) || lang === 'en') notFound(); return { title: `${footerPages[lang]['privacy-policy'].title} | Al Mamun` }; }
export default async function PrivacyPolicy({ params }: { params: Promise<{ lang: string }> }) { const { lang } = await params; if (!isLocale(lang) || lang === 'en') notFound(); return <InfoPage content={footerPages[lang]['privacy-policy']} />; }

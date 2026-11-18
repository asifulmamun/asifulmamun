import type { Metadata } from 'next';
import ServicePage from '@/src/components/pages/service-page';
import { localeContent } from '@/src/data/locale-content';
import { createPageMetadata } from '@/src/data/site-metadata';

export const metadata: Metadata = createPageMetadata('en', 'service');

export default function Service() {
  return <ServicePage content={localeContent.en.service} />;
}

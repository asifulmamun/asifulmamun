import type { Metadata } from 'next';
import ServicePage from '@/src/components/pages/service-page';
import { createPageMetadata } from '@/src/data/site-metadata';

export const metadata: Metadata = createPageMetadata('en', 'service');

export default function Service() {
  return <ServicePage lang="en" />;
}

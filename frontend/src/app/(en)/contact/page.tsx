import type { Metadata } from 'next';
import ContactPage from '@/src/components/pages/contact-page';
import { localeContent } from '@/src/data/locale-content';
import { createPageMetadata } from '@/src/data/site-metadata';

export const metadata: Metadata = createPageMetadata('en', 'contact');

export default function Contact() {
  return <ContactPage content={localeContent.en.contact} />;
}

import type { Metadata } from 'next';
import AboutPage from '@/src/components/pages/about-page';
import { localeContent } from '@/src/data/locale-content';
import { createPageMetadata } from '@/src/data/site-metadata';

export const metadata: Metadata = createPageMetadata('en', 'about');

export default function About() {
  return (
    <AboutPage
      content={localeContent.en.about}
      portfolio={localeContent.en.portfolio}
      locale="en"
    />
  );
}

import type { Metadata } from 'next';
import HomePage from '@/src/components/pages/home-page';
import { localeContent } from '@/src/data/locale-content';
import { createPageMetadata } from '@/src/data/site-metadata';

export const metadata: Metadata = createPageMetadata('en', 'home');

export default function Home() {
  return (
    <HomePage
      content={localeContent.en.home}
      experiences={localeContent.en.about.experience.items.slice(0, 4).map(({ company, role, location, period }) => ({ company, role, location, period }))}
      locale="en"
    />
  );
}

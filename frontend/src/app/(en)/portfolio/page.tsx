import type { Metadata } from 'next';
import PortfolioPage from '@/src/components/pages/portfolio-page';
import { createPageMetadata } from '@/src/data/site-metadata';

export const metadata: Metadata = createPageMetadata('en', 'portfolio');

export default function Portfolio() {
  return <PortfolioPage lang="en" />;
}

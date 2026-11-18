import type { Metadata } from 'next';
import InfoPage from '@/src/components/pages/info-page';
import { footerPages } from '@/src/data/footer-pages';

export const metadata: Metadata = { title: `${footerPages.en.affiliate.title} | Al Mamun` };
export default function Affiliate() { return <InfoPage content={footerPages.en.affiliate} />; }

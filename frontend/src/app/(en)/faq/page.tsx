import type { Metadata } from 'next';
import InfoPage from '@/src/components/pages/info-page';
import { footerPages } from '@/src/data/footer-pages';

export const metadata: Metadata = { title: `${footerPages.en.faq.title} | Al Mamun` };
export default function FAQ() { return <InfoPage content={footerPages.en.faq} />; }

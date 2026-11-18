import type { Metadata } from 'next';
import InfoPage from '@/src/components/pages/info-page';
import { footerPages } from '@/src/data/footer-pages';

export const metadata: Metadata = { title: `${footerPages.en['privacy-policy'].title} | Al Mamun` };
export default function PrivacyPolicy() { return <InfoPage content={footerPages.en['privacy-policy']} />; }

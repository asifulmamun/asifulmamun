import type { Metadata } from 'next';
import AffiliatePage from '@/src/components/pages/affiliate-page';
import content from '@/src/data/en/affiliate.json';

export const metadata: Metadata = { title: content.seo.title, description: content.seo.description };
export default function Affiliate() { return <AffiliatePage content={content} />; }

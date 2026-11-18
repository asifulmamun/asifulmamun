import SiteLayout from '@/src/components/global/site-layout';
import { siteMetadata } from '@/src/data/site-metadata';
import '../globals.css';

export const metadata = siteMetadata;

export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SiteLayout lang="en">{children}</SiteLayout>
  );
}

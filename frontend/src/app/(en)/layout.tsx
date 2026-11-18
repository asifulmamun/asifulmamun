import SiteShell, {
  siteBodyClassName,
} from '@/src/components/global/site-shell';
import { siteMetadata } from '@/src/data/site-metadata';
import '../globals.css';

export const metadata = siteMetadata;

export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={siteBodyClassName}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

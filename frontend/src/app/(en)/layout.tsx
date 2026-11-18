import Header from '@/src/components/global/header';
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
      <body className="bg-white text-slate-900 antialiased overflow-x-hidden selection:bg-accent selection:text-white dark:bg-slate-950 dark:text-slate-100">
        <Header />
        {children}
      </body>
    </html>
  );
}

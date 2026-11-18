import Header from '@/src/components/global/header';

const bodyClassName =
  'bg-white text-slate-900 antialiased overflow-x-hidden selection:bg-accent selection:text-white dark:bg-slate-950 dark:text-slate-100';

export default function SiteLayout({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: string;
}) {
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        {/* Shared head scripts/tags go here; use the Metadata API for SEO. */}
      </head>
      <body className={bodyClassName}>
        {/* Shared after-body-start markup, such as a noscript fallback, goes here. */}
        <Header />
        {children}
        {/* Shared footer scripts go here. */}
      </body>
    </html>
  );
}

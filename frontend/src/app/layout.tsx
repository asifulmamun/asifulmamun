import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'Asiful Mamun | Portfolio',
  description: 'Asiful Mamun is a web developer building fast, clean websites.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Poppins:wght@400;500&display=swap" rel="stylesheet" />
        </head>
        <body suppressHydrationWarning className="bg-white text-slate-900 antialiased overflow-x-hidden selection:bg-accent selection:text-white">
          {children}
        </body>
      </html>
    </>
  );
}

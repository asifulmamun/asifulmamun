import type { Metadata } from 'next';
import Header from '@/src/components/global/header';
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
        </head>
        <body suppressHydrationWarning className="bg-white text-slate-900 antialiased overflow-x-hidden selection:bg-accent selection:text-white">
          <Header />
          {children}
        </body>
      </html>
    </>
  );
}

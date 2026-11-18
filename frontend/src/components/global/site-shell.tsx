import Header from '@/src/components/global/header';

export const siteBodyClassName =
  'bg-white text-slate-900 antialiased overflow-x-hidden selection:bg-accent selection:text-white dark:bg-slate-950 dark:text-slate-100';

export default function SiteShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

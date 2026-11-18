import Banner from '@/src/components/pages/home/banner';
import type { HomeContent } from '@/src/data/locale-content';

export default function HomePage({ content }: { content: HomeContent }) {
  return (
    <main className="relative overflow-hidden bg-white font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-linear-to-t from-[#f5f5f5] via-[#f5f5f5]/80 to-transparent dark:from-slate-950 dark:via-slate-950/80" />
        <Banner content={content} />
      </div>
    </main>
  );
}
import Banner from '@/src/components/pages/home/banner';
import type { HomeContent } from '@/src/data/locale-content';

export default function HomePage({ content }: { content: HomeContent }) {
  return (
    <main className="relative overflow-hidden bg-white font-sans text-slate-900">
      <div className="relative">
        <div className="absolute inset-x-0 bottom-0 z-10 h-28 bg-linear-to-t from-[#f5f5f5] via-[#f5f5f5]/80 to-transparent pointer-events-none" />
        <Banner content={content} />
      </div>
    </main>
  );
}
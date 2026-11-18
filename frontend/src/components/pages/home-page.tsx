import Banner from '@/src/components/pages/home/banner';
import content from '@/src/data/en/home.json';

export default function HomePage() {
  return (
    <main className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-white font-sans text-slate-900">
      <Banner content={content} />
    </main>
  );
}
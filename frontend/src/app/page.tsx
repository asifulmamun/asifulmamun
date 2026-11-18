import Header from '@/src/components/global/header';
import Banner from '@/src/components/home/banner';
import content from '@/src/data/home-en.json';

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen overflow-hidden bg-white font-sans text-slate-900">
        <Banner content={content} />
      </main>
    </>
  );
}

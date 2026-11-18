type EmptyPageProps = {
  title: string;
};

export default function EmptyPage({ title }: EmptyPageProps) {
  return (
    <main className="min-h-[calc(100vh-72px)] bg-white font-sans text-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <h1 className="font-serif text-5xl font-semibold sm:text-7xl">{title}</h1>
      </div>
    </main>
  );
}
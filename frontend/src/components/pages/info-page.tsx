export type InfoSection = { title: string; text: string };
export type InfoPageContent = { title: string; intro: string; sections: InfoSection[] };

export default function InfoPage({ content }: { content: InfoPageContent }) {
  return (
    <main className="bg-white font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-accent">Information</p>
        <h1 className="font-serif text-5xl font-semibold sm:text-7xl">{content.title}</h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">{content.intro}</p>
        <div className="mt-12 space-y-4">
          {content.sections.map((section) => (
            <section key={section.title} className="rounded-[24px] border border-slate-200/80 p-6 dark:border-white/10">
              <h2 className="font-serif text-2xl font-semibold">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{section.text}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

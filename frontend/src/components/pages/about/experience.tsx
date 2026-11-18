export type Experience = { company: string; role: string; location: string; period: string; points: string[] };

export default function Experience({ title, items }: { title: string; items: Experience[] }) {
  return (
    <section>
      <h2 className="font-serif text-4xl font-semibold sm:text-5xl">{title}</h2>
      <div className="mt-8 border-l border-slate-200 dark:border-white/10">
        {items.map((item) => (
          <article key={`${item.company}-${item.period}`} className="relative ml-4 pb-10 pl-6 last:pb-0">
            <span className="absolute -left-[7px] top-2 h-3 w-3 rounded-full border-2 border-white bg-accent dark:border-slate-950" />
            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="font-serif text-2xl font-semibold">{item.company}</h3>
                <p className="mt-1 font-medium text-accent">{item.role}</p>
              </div>
              <p className="shrink-0 text-sm text-slate-500 dark:text-slate-400">{item.period}<br />{item.location}</p>
            </div>
            <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
              {item.points.map((point) => <li key={point} className="relative pl-4 before:absolute before:left-0 before:top-[11px] before:h-1 before:w-1 before:rounded-full before:bg-accent">{point}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

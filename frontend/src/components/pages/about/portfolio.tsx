import { ExternalLink } from 'lucide-react';

export type PortfolioItem = { name: string; url: string; type?: string };

export default function Portfolio({ title, intro, items }: { title: string; intro: string; items: PortfolioItem[] }) {
  return (
    <section>
      <div className="max-w-2xl"><h2 className="font-serif text-4xl font-semibold sm:text-5xl">{title}</h2><p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{intro}</p></div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer" className="group flex min-h-28 flex-col justify-between rounded-[22px] border border-slate-200/80 p-5 transition hover:-translate-y-1 hover:border-accent/60 hover:shadow-lg hover:shadow-slate-900/5 dark:border-white/10">
            <div className="flex items-start justify-between gap-3"><h3 className="font-serif text-lg font-semibold">{item.name}</h3><ExternalLink className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-accent" /></div>
            {item.type && <p className="mt-4 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">{item.type}</p>}
          </a>
        ))}
      </div>
    </section>
  );
}

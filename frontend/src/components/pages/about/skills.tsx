import { BriefcaseBusiness, CloudCog, Database, PanelsTopLeft, Sparkles } from 'lucide-react';

export type SkillGroup = { title: string; items: string[] };

const icons = [BriefcaseBusiness, PanelsTopLeft, Sparkles, CloudCog, Database];

export default function Skills({ title, groups }: { title: string; groups: SkillGroup[] }) {
  return (
    <section>
      <h2 className="font-serif text-4xl font-semibold sm:text-5xl">{title}</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {groups.map((group, index) => {
          const Icon = icons[index % icons.length];
          return (
            <article key={group.title} className="rounded-[24px] border border-slate-200/80 bg-slate-50/70 p-6 dark:border-white/10 dark:bg-slate-900/50">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent"><Icon className="h-5 w-5" /></span>
                <h3 className="font-serif text-xl font-semibold">{group.title}</h3>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{group.items.join(' · ')}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

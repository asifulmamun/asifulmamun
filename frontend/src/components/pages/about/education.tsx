import { GraduationCap } from 'lucide-react';

export type EducationItem = { degree: string; institution: string; year: string; detail?: string };

export default function Education({ title, items, trainingTitle, training }: { title: string; items: EducationItem[]; trainingTitle: string; training: string[] }) {
    return (
        <section className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div>
                <h2 className="font-serif text-4xl font-semibold sm:text-5xl">{title}</h2>
                <div className="mt-8 space-y-4">
                    {items.map((item) => (
                        <article key={`${item.degree}-${item.year}`} className="rounded-[22px] border border-slate-200/80 p-5 dark:border-white/10">
                            <div className="flex gap-4">
                                <GraduationCap className="mt-1 h-5 w-5 shrink-0 text-accent" />
                                <div><h3 className="font-serif text-xl font-semibold">{item.degree}</h3><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.institution} · {item.year}</p>{item.detail && <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.detail}</p>}</div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
            <div>
                <h2 className="font-serif text-4xl font-semibold sm:text-5xl">{trainingTitle}</h2>
                <div className="mt-8 flex flex-wrap gap-3">
                    {training.map((item) => <span key={item} className="rounded-full border border-slate-200 px-4 py-3 text-sm text-slate-600 dark:border-white/10 dark:text-slate-300">{item}</span>)}
                </div>
            </div>
        </section>
    );
}

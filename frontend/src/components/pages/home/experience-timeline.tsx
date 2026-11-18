import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getLocalePath, type Locale } from '@/src/data/languages';

export type HomeExperience = {
  company: string;
  role: string;
  location: string;
  period: string;
};

type ExperienceTimelineProps = {
  title: string;
  moreLabel: string;
  items: HomeExperience[];
  locale: Locale;
};

export default function ExperienceTimeline({
  title,
  moreLabel,
  items,
  locale,
}: ExperienceTimelineProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24" aria-label={title}>
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            Career journey
          </p>
          <h2 className="font-serif text-4xl font-semibold sm:text-5xl">{title}</h2>
        </div>
        <Link
          href={getLocalePath(locale, 'about/#experience')}
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-medium transition hover:border-accent hover:bg-accent hover:text-white dark:border-white/20"
        >
          {moreLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute left-[7%] right-[7%] top-4.75 hidden h-px bg-slate-200 md:block dark:bg-white/10"
        />
        <div className="grid gap-5 md:grid-cols-4">
          {items.map((item, index) => (
            <article
              key={`${item.company}-${item.period}`}
              className="relative border-l border-slate-200 pl-6 md:border-l-0 md:pl-0 md:pr-5 dark:border-white/10"
            >
              <div className="mb-5 flex items-center md:block">
                <span className="absolute -left-1.25 top-0 h-2.75 w-2.75 rounded-full border-2 border-white bg-accent md:relative md:left-auto md:block md:h-10 md:w-10 md:border-[7px] md:border-white md:shadow-[0_0_0_1px_rgba(148,163,184,.28)] dark:border-slate-950" />
                <span className="ml-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 md:ml-0 md:mt-4 md:block">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <p className="text-xs font-semibold text-accent">{item.period}</p>
              <h3 className="mt-2 font-serif text-xl font-semibold leading-tight">{item.company}</h3>
              <p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-200">{item.role}</p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{item.location}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import Link from 'next/link';
import {
  ArrowUpRight,
  Check,
  ExternalLink,
  Mail,
  ShoppingBag,
} from 'lucide-react';
import { getLocalePath, type Locale } from '@/src/data/languages';
import bengaliPortfolio from '@/src/data/bn/portfolio.json';
import portfolio from '@/src/data/en/portfolio.json';

export default function PortfolioPage({ lang }: { lang: Locale }) {
  const content = lang === 'bn' ? bengaliPortfolio : portfolio;

  return (
    <main className="overflow-hidden bg-white font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <section aria-labelledby="portfolio-title" className="relative px-6 pb-16 pt-20 sm:pb-20 sm:pt-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-0 mx-auto h-80 max-w-5xl bg-gradient-to-br from-base/15 via-transparent to-accent/10 blur-3xl"
        />
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--color-base)]">
              {content.heroEyebrow}
            </p>
            <h1 id="portfolio-title" className="font-serif text-4xl font-semibold tracking-tight sm:text-6xl">
              {content.heroTitle}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
              {content.heroDescription}
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="solutions-title" className="border-y border-slate-200 bg-slate-50 px-6 py-16 dark:border-white/10 dark:bg-slate-900/40 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="solutions-title" className="font-serif text-3xl font-semibold sm:text-4xl">
              {content.solutionsTitle}
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
              {content.solutionsDescription}
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {content.solutions.map((solution, index) => {
              const Icon = index === 0 ? Mail : ShoppingBag;

              return (
                <article key={solution.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/70 sm:p-8">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-base/10 text-[color:var(--color-base)]">
                      <Icon aria-hidden="true" size={23} />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                        {solution.type}
                      </p>
                      <h3 className="mt-2 font-serif text-2xl font-semibold">
                        {solution.title}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {solution.description}
                  </p>
                  <ul className="mt-5 space-y-3">
                    {solution.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2.5 text-sm leading-6">
                        <Check aria-hidden="true" className="mt-0.5 shrink-0 text-[color:var(--color-base)]" size={17} />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="projects-title" className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="projects-title" className="font-serif text-3xl font-semibold sm:text-4xl">
              {content.projectsTitle}
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
              {content.projectsDescription}
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {content.items.map((item) => (
              <a
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:border-base/50 hover:shadow-xl hover:shadow-base/5 dark:border-white/10 dark:bg-slate-900/70"
              >
                <div
                  role="img"
                  aria-label={`${item.name} preview`}
                  className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br from-base/15 via-slate-100 to-accent/20 p-7 dark:from-base/20 dark:via-slate-800 dark:to-accent/10"
                >
                  <div aria-hidden="true" className="w-full max-w-sm -rotate-2 rounded-xl border border-slate-200/80 bg-white/90 p-3 shadow-xl transition duration-300 group-hover:rotate-0 dark:border-white/10 dark:bg-slate-950/85">
                    <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2 dark:border-white/10">
                      <span className="h-2 w-2 rounded-full bg-rose-400" />
                      <span className="h-2 w-2 rounded-full bg-amber-400" />
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      <span className="ml-2 h-2 flex-1 rounded-full bg-slate-100 dark:bg-white/10" />
                    </div>
                    <div className="flex gap-3 pt-3">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-base to-accent font-serif text-2xl font-bold text-white">
                        {item.name.slice(0, 1)}
                      </div>
                      <div className="flex flex-1 flex-col justify-center gap-2">
                        <span className="h-2.5 w-3/4 rounded-full bg-slate-300 dark:bg-white/20" />
                        <span className="h-2 w-full rounded-full bg-slate-200 dark:bg-white/10" />
                        <span className="h-2 w-2/3 rounded-full bg-slate-200 dark:bg-white/10" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex min-h-28 items-start justify-between gap-4 p-5">
                  <div>
                    <h3 className="font-serif text-lg font-semibold">{item.name}</h3>
                    <p className="mt-2 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {item.type}
                    </p>
                  </div>
                  <ExternalLink aria-hidden="true" className="mt-1 shrink-0 text-slate-400 transition group-hover:text-accent" size={17} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="portfolio-contact-title" className="px-6 pb-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 rounded-3xl bg-base px-6 py-8 text-center text-white shadow-xl shadow-base/15 sm:flex-row sm:px-9 sm:text-left">
          <div className="max-w-3xl">
            <h2 id="portfolio-contact-title" className="font-serif text-2xl font-semibold sm:text-3xl">
              {content.contactTitle}
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/85">
              {content.contactDescription}
            </p>
          </div>
          <Link
            href={getLocalePath(lang, 'contact')}
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[color:var(--color-base)] transition hover:-translate-y-0.5 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            {content.contactLabel}
            <ArrowUpRight aria-hidden="true" size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}

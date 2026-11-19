import Link from 'next/link';
import {
  ArrowUpRight,
  Bot,
  Check,
  Cloud,
  Network,
  ShieldCheck,
  ShoppingCart,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { getLocalePath, type Locale } from '@/src/data/languages';
import bengaliServices from '@/src/data/bn/services.json';
import services from '@/src/data/services.json';

const serviceIcons: Record<string, LucideIcon> = {
  'cloud-cost-optimization': Cloud,
  'ecommerce-web-solutions': ShoppingCart,
  'vibe-code-refactoring': Wrench,
  'ai-integration-automation': Bot,
  'technical-supervision': ShieldCheck,
  'it-network-infrastructure': Network,
};

const labels = {
  en: {
    eyebrow: 'BUSINESS-FIRST SERVICES',
    howWeWork: 'How We Work',
    consultation: 'Book a Free Consultation',
    deliverables: 'What you get',
    technology: 'Tools & technology',
  },
  bn: {
    eyebrow: 'ব্যবসার জন্য উপযোগী প্রযুক্তি সেবা',
    howWeWork: 'আমরা যেভাবে কাজ করি',
    consultation: 'বিনামূল্যে পরামর্শ বুক করুন',
    deliverables: 'আপনি যা পাবেন',
    technology: 'প্রযুক্তি ও টুলস',
  },
} satisfies Record<Locale, Record<string, string>>;

export default function ServicePage({ lang }: { lang: Locale }) {
  const content = lang === 'bn' ? bengaliServices : services;
  const copy = labels[lang];

  return (
    <main className="overflow-hidden bg-white font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <section aria-labelledby="services-title" className="relative px-6 pb-16 pt-20 sm:pb-20 sm:pt-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-0 mx-auto h-80 max-w-5xl bg-gradient-to-br from-base/15 via-transparent to-accent/10 blur-3xl"
        />
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--color-base)]">
              {copy.eyebrow}
            </p>
            <h1 id="services-title" className="font-serif text-4xl font-semibold tracking-tight sm:text-6xl">
              {content.sectionTitle}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
              {content.sectionSubtitle}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {content.services.map((service) => {
              const Icon = serviceIcons[service.id];

              return (
                <article
                  key={service.id}
                  className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-base/40 hover:shadow-xl hover:shadow-base/5 dark:border-white/10 dark:bg-slate-900/70 dark:hover:border-base/50 sm:p-7"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-base/10 text-[color:var(--color-base)]">
                      <Icon aria-hidden="true" size={21} />
                    </span>
                    <span className="rounded-full bg-accent/10 px-3 py-1.5 text-right text-xs font-bold text-accent">
                      {service.badge}
                    </span>
                  </div>

                  <h2 className="mt-5 font-serif text-xl font-semibold leading-snug sm:text-2xl">
                    {service.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {service.businessFocus}
                  </p>

                  <div className="mt-6">
                    <h3 className="sr-only">{copy.deliverables}</h3>
                    <ul className="space-y-3">
                      {service.deliverables.map((deliverable) => (
                        <li key={deliverable} className="flex items-start gap-2.5 text-sm leading-6">
                          <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-base/10 text-[color:var(--color-base)]">
                            <Check aria-hidden="true" size={13} strokeWidth={3} />
                          </span>
                          <span className="text-slate-700 dark:text-slate-200">{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto border-t border-slate-200 pt-5 dark:border-white/10">
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                      {copy.technology}
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {service.techStack.map((technology) => (
                        <li
                          key={technology}
                          className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] leading-4 text-slate-600 dark:bg-white/[0.07] dark:text-slate-300"
                        >
                          {technology}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="engagement-title" className="border-t border-slate-200 bg-slate-50 px-6 py-16 dark:border-white/10 dark:bg-slate-900/40 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--color-base)]">
              {lang === 'bn' ? 'সহজ ও স্বচ্ছ প্রক্রিয়া' : 'A CLEAR, STRAIGHTFORWARD PROCESS'}
            </p>
            <h2 id="engagement-title" className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
              {copy.howWeWork}
            </h2>
          </div>

          <ol className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {content.engagementModel.map((item) => (
              <li
                key={item.step}
                className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-950/60 sm:p-7"
              >
                <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-xl bg-base/10 px-2 text-sm font-bold text-[color:var(--color-base)]">
                  {item.step}
                </span>
                <h3 className="mt-5 font-serif text-xl font-semibold leading-snug">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex justify-center">
            <Link
              href={getLocalePath(lang, 'contact')}
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-base px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-base/20 transition hover:-translate-y-0.5 hover:bg-base/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-base"
            >
              {copy.consultation}
              <ArrowUpRight aria-hidden="true" size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

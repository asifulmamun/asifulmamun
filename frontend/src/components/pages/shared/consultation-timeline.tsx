type TimelineItem = {
  step: string;
  title: string;
  description: string;
};

type ConsultationTimelineProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: TimelineItem[];
};

export default function ConsultationTimeline({
  eyebrow,
  title,
  subtitle,
  items,
}: ConsultationTimelineProps) {
  return (
    <section
      aria-labelledby="timeline-title"
      className="border-y border-slate-200 bg-slate-50 px-6 py-16 dark:border-white/10 dark:bg-slate-900/40 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--color-base)]">
            {eyebrow}
          </p>
          <h2 id="timeline-title" className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
            {subtitle}
          </p>
        </div>

        <div className="relative mt-12">
          <div
            aria-hidden="true"
            className="absolute left-[16.666%] right-[16.666%] top-5 hidden h-px bg-base/30 md:block"
          />
          <ol className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
            {items.map((item) => (
              <li key={item.step} className="relative flex flex-col items-center text-center">
                <span className="relative z-10 inline-flex h-10 min-w-10 items-center justify-center rounded-full border-4 border-slate-50 bg-base px-2 text-xs font-bold text-white dark:border-slate-900">
                  {item.step}
                </span>
                <h3 className="mt-5 max-w-sm font-serif text-xl font-semibold leading-snug">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

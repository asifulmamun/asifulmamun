import { Mail, MapPin, Phone } from 'lucide-react';

export type ProfileSummaryContent = {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  summary: string;
};

export default function ProfileSummary({ content }: { content: ProfileSummaryContent }) {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-accent">Professional profile</p>
        <h1 className="font-serif text-5xl font-semibold leading-[0.92] sm:text-7xl">
          {content.name}
        </h1>
        <p className="mt-5 max-w-2xl text-lg font-medium text-slate-600 dark:text-slate-300">
          {content.title}
        </p>
      </div>
      <div className="rounded-[28px] border border-slate-200/80 bg-white/70 p-6 shadow-lg shadow-slate-900/5 backdrop-blur-sm dark:border-white/10 dark:bg-slate-900/60">
        <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{content.summary}</p>
        <div className="mt-5 grid gap-3 text-sm">
          <a className="flex items-center gap-3 transition hover:text-accent" href={`tel:${content.phone}`}>
            <Phone className="h-4 w-4 text-accent" /> {content.phone}
          </a>
          <a className="flex items-center gap-3 transition hover:text-accent" href={`mailto:${content.email}`}>
            <Mail className="h-4 w-4 text-accent" /> {content.email}
          </a>
          <span className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-accent" /> {content.location}
          </span>
        </div>
      </div>
    </section>
  );
}

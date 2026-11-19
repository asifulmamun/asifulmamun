import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';

export type ContactDetailsContent = {
  name: string;
  role: string;
  location: string;
  phoneDisplay: string;
  phoneHref: string;
  email: string;
  whatsapp: string;
  whatsappLabel: string;
  emailLabel: string;
  consultationLabel: string;
};

export default function ContactDetails({ content }: { content: ContactDetailsContent }) {
  return (
    <section className="rounded-[28px] border border-slate-200/80 bg-white/70 p-5 shadow-lg shadow-slate-900/5 backdrop-blur-sm sm:p-7 dark:border-white/10 dark:bg-slate-900/60">
      <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">{content.consultationLabel}</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">{content.name}</h2>
          <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-300">{content.role}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[520px]">
          <a href={content.whatsapp} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-2xl bg-base px-5 py-4 text-sm font-semibold text-white transition hover:-translate-y-1 hover:shadow-lg hover:shadow-base/20">
            <span>{content.whatsappLabel}</span>
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a href={`mailto:${content.email}`} className="group flex items-center justify-between rounded-2xl border border-slate-200 px-5 py-4 text-sm font-semibold transition hover:-translate-y-1 hover:border-accent/60 hover:text-accent dark:border-white/10">
            <span>{content.emailLabel}</span>
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      <div className="mt-7 grid gap-3 border-t border-slate-200/80 pt-6 text-sm sm:grid-cols-2 lg:grid-cols-3 dark:border-white/10">
        <a href={content.phoneHref} className="flex items-center gap-3 transition hover:text-accent">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10"><Phone className="h-4 w-4 text-accent" /></span>
          {content.phoneDisplay}
        </a>
        <a href={`mailto:${content.email}`} className="flex items-center gap-3 transition hover:text-accent">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10"><Mail className="h-4 w-4 text-accent" /></span>
          {content.email}
        </a>
        <p className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10"><MapPin className="h-4 w-4 text-accent" /></span>
          {content.location}
        </p>
      </div>
    </section>
  );
}

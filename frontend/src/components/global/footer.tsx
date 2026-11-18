import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import SocialIcon from '@/src/components/global/icons';
import { footerContent } from '@/src/data/footer-content';
import { isLocale } from '@/src/data/languages';

export default function Footer({ lang }: { lang: string }) {
  const locale = isLocale(lang) ? lang : 'en';
  const content = footerContent[locale];
  const year = new Date().getFullYear();
  const homeHref = locale === 'en' ? '/' : `/${locale}`;

  return (
    <footer className="border-t border-slate-200/80 bg-[#f7f8f8] dark:border-white/10 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_.8fr] lg:items-end">
          <div>
            <Link
              href={homeHref}
              className="inline-block font-serif text-4xl font-semibold leading-none sm:text-5xl"
              aria-label={`${content.name} home`}
            >
              {content.name}
            </Link>
            <p className="mt-4 text-sm font-medium text-accent">{content.title}</p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {content.summary}
            </p>
          </div>

          <div className="rounded-[28px] border border-slate-200/80 bg-white/70 p-5 shadow-lg shadow-slate-900/5 backdrop-blur-sm sm:p-6 dark:border-white/10 dark:bg-slate-900/60">
            <div className="grid gap-3 text-sm">
              <a className="flex items-center gap-3 transition hover:text-accent" href={`tel:${content.phone}`}>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10">
                  <Phone className="h-4 w-4 text-accent" />
                </span>
                {content.phone}
              </a>
              <a className="flex items-center gap-3 transition hover:text-accent" href={`mailto:${content.email}`}>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10">
                  <Mail className="h-4 w-4 text-accent" />
                </span>
                {content.email}
              </a>
              <span className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10">
                  <MapPin className="h-4 w-4 text-accent" />
                </span>
                {content.location}
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-200/80 pt-5 dark:border-white/10">
              {content.socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.icon === 'phone' ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:-translate-y-1 hover:border-accent/60 hover:text-accent dark:border-white/10 dark:bg-slate-950 dark:text-slate-300"
                >
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200/80 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:text-slate-400">
          <p>© {year} {content.name}. {content.copyright}.</p>
          <p>{content.builtWith}</p>
        </div>
      </div>
    </footer>
  );
}

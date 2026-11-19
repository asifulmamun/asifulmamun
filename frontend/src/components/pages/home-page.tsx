import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Banner from '@/src/components/pages/home/banner';
import ConsultationTimeline from '@/src/components/pages/shared/consultation-timeline';
import ExperienceTimeline, { type HomeExperience } from '@/src/components/pages/home/experience-timeline';
import bengaliServices from '@/src/data/bn/services.json';
import services from '@/src/data/services.json';
import type { HomeContent } from '@/src/data/locale-content';
import { getLocalePath, type Locale } from '@/src/data/languages';

type HomePageProps = {
  content: HomeContent;
  experiences: HomeExperience[];
  locale: Locale;
};

export default function HomePage({ content, experiences, locale }: HomePageProps) {
  const serviceContent = locale === 'bn' ? bengaliServices : services;

  return (
    <main className="relative overflow-hidden bg-white font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-linear-to-t from-[#f5f5f5] via-[#f5f5f5]/80 to-transparent dark:from-slate-950 dark:via-slate-950/80" />
        <Banner content={content} />
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-linear-to-b from-[#f5f5f5] via-[#f5f5f5]/80 to-transparent dark:from-slate-950 dark:via-slate-950/80" />
        <ConsultationTimeline
          eyebrow={serviceContent.consultationTitle}
          title={serviceContent.timelineTitle}
          subtitle={serviceContent.timelineSubtitle}
          items={serviceContent.timeline}
        />
        <div className="relative z-10 flex justify-center px-6 -top-6">
          <Link
            href={getLocalePath(locale, 'service')}
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition hover:-translate-y-0.5 hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {locale === 'bn' ? 'সব সেবা দেখুন' : 'Explore services'}
            <ArrowUpRight aria-hidden="true" size={18} />
          </Link>
        </div>
      </div>
      <ExperienceTimeline
        title={content.experienceTimeline.title}
        moreLabel={content.experienceTimeline.moreLabel}
        items={experiences}
        locale={locale}
      />
    </main>
  );
}
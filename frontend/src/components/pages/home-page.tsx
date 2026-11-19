import Banner from '@/src/components/pages/home/banner';
import ExperienceTimeline, { type HomeExperience } from '@/src/components/pages/home/experience-timeline';
import type { HomeContent } from '@/src/data/locale-content';
import type { Locale } from '@/src/data/languages';

type HomePageProps = {
  content: HomeContent;
  experiences: HomeExperience[];
  locale: Locale;
};

export default function HomePage({ content, experiences, locale }: HomePageProps) {
  return (
    <main className="relative overflow-hidden bg-white font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-linear-to-t from-[#f5f5f5] via-[#f5f5f5]/80 to-transparent dark:from-slate-950 dark:via-slate-950/80" />
        <Banner content={content} />
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-linear-to-b from-[#f5f5f5] via-[#f5f5f5]/80 to-transparent dark:from-slate-950 dark:via-slate-950/80" />
        <ExperienceTimeline
          title={content.experienceTimeline.title}
          moreLabel={content.experienceTimeline.moreLabel}
          items={experiences}
          locale={locale}
        />
      </div>
    </main>
  );
}
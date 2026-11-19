import ProfileSummary from '@/src/components/pages/about/profile-summary';
import Skills from '@/src/components/pages/about/skills';
import Experience from '@/src/components/pages/about/experience';
import Education from '@/src/components/pages/about/education';
import Portfolio from '@/src/components/pages/about/portfolio';
import type { Locale } from '@/src/data/languages';
import type { AboutContent, PortfolioContent } from '@/src/data/locale-content';

export default function AboutPage({
  content,
  portfolio,
  locale,
}: {
  content: AboutContent;
  portfolio: PortfolioContent;
  locale: Locale;
}) {
  return (
    <main className="bg-white font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-6xl space-y-20 px-6 py-16 sm:space-y-24 sm:py-24">
        <ProfileSummary content={content.profile} />
        <Skills title={content.skills.title} groups={content.skills.groups} />
        <Experience title={content.experience.title} items={content.experience.items} />
        <Education
          title={content.education.title}
          items={content.education.items}
          trainingTitle={content.education.trainingTitle}
          training={content.education.training}
        />
        <Portfolio
          title={portfolio.projectsTitle}
          intro={portfolio.projectsDescription}
          items={portfolio.items}
          locale={locale}
          viewMoreLabel={locale === 'bn' ? 'সব পোর্টফোলিও দেখুন' : 'View all portfolio'}
        />
      </div>
    </main>
  );
}
import ContactDetails from '@/src/components/pages/contact/contact-details';
import Schedule from '@/src/components/pages/contact/schedule';
import type { ContactContent } from '@/src/data/locale-content';

export default function ContactPage({ content }: { content: ContactContent }) {
  const profile = {
    name: content.profile.name,
    role: content.profile.role,
    location: content.profile.location,
    phoneDisplay: content.phoneDisplay,
    phoneHref: content.phoneHref,
    email: content.email,
    whatsapp: content.whatsapp,
    whatsappLabel: content.whatsappLabel,
    emailLabel: content.emailLabel,
    consultationLabel: content.consultationLabel,
  };

  return (
    <main className="bg-white font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-accent">{content.eyebrow}</p>
          <h1 className="font-serif text-5xl font-semibold leading-[0.95] sm:text-7xl">{content.heading}</h1>
          <p className="mt-6 max-w-2xl leading-8 text-slate-600 dark:text-slate-300">{content.intro}</p>
        </div>

        <div className="mt-12 grid gap-6">
          <ContactDetails content={profile} />
          <Schedule
            content={content.schedule}
            title={content.scheduleTitle}
            timezoneTitle={content.scheduleTimezoneTitle}
            deviceTimezoneTitle={content.deviceTimezoneTitle}
            availableNow={content.availableNow}
            outsideHours={content.outsideHours}
            checkingAvailability={content.checkingAvailability}
            whatsappWindow={content.whatsappWindow}
            emailAlways={content.emailAlways}
            intro={content.scheduleIntro}
            upcomingTitle={content.upcomingTitle}
            dhakaColumn={content.dhakaColumn}
            localColumn={content.localColumn}
            weekdaysLabel={content.weekdaysLabel}
            weekendLabel={content.weekendLabel}
            whatsappChannel={content.whatsappChannel}
          />
        </div>
      </div>
    </main>
  );
}
import AffiliateOffers, { type AffiliateOffer } from '@/src/components/pages/affiliate/affiliate-offers';

export type AffiliatePageContent = {
  title: string;
  eyebrow: string;
  intro: string;
  disclosureTitle: string;
  disclosure: string;
};

export default function AffiliatePage({ content }: { content: AffiliatePageContent }) {
  return (
    <main className="bg-white font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-accent">{content.eyebrow}</p>
        <h1 className="font-serif text-5xl font-semibold leading-[0.95] sm:text-7xl">{content.title}</h1>
        <p className="mt-6 max-w-2xl leading-8 text-slate-600 dark:text-slate-300">{content.intro}</p>

        <aside className="mt-8 rounded-[22px] border border-accent/20 bg-accent/8 px-5 py-4">
          <h2 className="text-sm font-semibold text-accent">{content.disclosureTitle}</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{content.disclosure}</p>
        </aside>

        <AffiliateOffers />
      </div>
    </main>
  );
}

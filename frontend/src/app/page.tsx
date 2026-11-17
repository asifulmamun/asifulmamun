import content from '../data/en.json';

function SocialIcon({ name }: { name: string }) {
  if (name === 'facebook') {
    return (
      <svg className="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.6C16.7 2.6 15.8 2.5 14.8 2.5 12.5 2.5 11 3.9 11 6.4v2.1H8.5V12H11v9.5h3V12h2.4l.4-3.5z" />
      </svg>
    );
  }

  if (name === 'dribbble') {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9.5" />
        <path d="M5 5.5c4 1 8 5 10.5 13M2.8 11c5 .3 10-.7 14-4M8.5 2.8c3 3.5 5 8 5.8 14.5" />
      </svg>
    );
  }

  if (name === 'linkedin') {
    return (
      <svg className="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4.5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM3 9h3v12H3zm6 0h2.9v1.7c.5-.9 1.7-2 3.6-2 3.4 0 4 2.2 4 5.1V21h-3v-6.2c0-1.5 0-3.3-2-3.3s-2.4 1.6-2.4 3.2V21H9z" />
      </svg>
    );
  }

  return <span aria-hidden="true">Bē</span>;
}

export default function Home() {
  return (
    <main lang="en" className="relative min-h-screen overflow-hidden bg-white font-sans text-slate-900">
      <section className="relative min-h-screen">
        <div className="mx-auto grid min-h-screen max-w-6xl grid-cols-1 items-center gap-8 px-6 py-16 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <p className="font-serif text-4xl sm:text-5xl">{content.intro}</p>
            <h1 className="mt-2 font-serif text-5xl font-semibold sm:text-7xl">{content.name}</h1>
            <svg className="mt-1 h-3 w-56 text-accent" viewBox="0 0 230 12" fill="none" aria-hidden="true">
              <path d="M2 8c14-8 20 4 34-2s20 4 34-2 20 4 34-2 20 4 34-2 20 4 34-2 20 4 34-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p className="mt-8 max-w-md text-slate-500">{content.description}</p>

            <div className="mt-10 flex items-center gap-8">
              <a href={content.resume.href} className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-7 py-4 text-sm transition hover:border-accent hover:bg-accent hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent">
                {content.resume.label}
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3v12m0 0-4-4m4 4 4-4M4 21h16" />
                </svg>
              </a>
            </div>

            <a href={content.video.href} className="mt-12 inline-flex items-center gap-4 text-slate-500 transition hover:text-slate-900">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-accent">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              {content.video.label}
            </a>
          </div>

          <div className="order-1 flex justify-center lg:order-2">
            <div className="relative aspect-[4/5] w-full max-w-md">
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 500" fill="none" aria-hidden="true">
                <circle cx="170" cy="250" r="200" stroke="rgba(15,23,42,.14)" />
                <circle cx="170" cy="250" r="165" stroke="rgba(15,23,42,.08)" />
              </svg>

              <div className="absolute inset-x-6 bottom-0 top-8 flex items-center justify-center rounded-t-[40%] border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
                {content.imagePlaceholder}
              </div>

              {content.socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  style={{ left: social.x, top: social.y, transform: 'translate(-50%, -50%)' }}
                  className="absolute flex h-14 w-14 items-center justify-center rounded-full border border-slate-300 bg-white text-accent transition hover:border-accent hover:text-accent"
                >
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

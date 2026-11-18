import Image from 'next/image';
import { Cloud, Globe, Mail, Package, ShoppingCart, Sparkles, Terminal } from 'lucide-react';
import bannerBG from '@/src/assets/images/asifulmamun-al-mamun.png';
import SocialIcon from '@/src/components/global/icons';

const floatingSkills = [
    // { label: 'AWS', Icon: Cloud, position: 'left-[-20%] top-[5%]', delay: 'tech-float-delay-1' },
    // { label: 'AI', Icon: Sparkles, position: 'left-[-18%] top-[12%]', delay: 'tech-float-delay-2' },
    // { label: 'Docker', Icon: Package, position: 'left-[-20%] top-[18%]', delay: 'tech-float-delay-3' },
    // { label: 'Linux', Icon: Terminal, position: 'left-[-18%] top-[22%]', delay: 'tech-float-delay-1' },
    { label: 'Company static website Life-time free hosting', Icon: Globe, position: 'left-[3%] top-[-9%] md:left-[65%] md:top-[0%]', delay: 'tech-float-delay-2' },
    { label: 'E-commerce Solutions', Icon: ShoppingCart, position: 'left-[50%] bottom-[11%] md:left-[60%] md:top-[55%]', delay: 'tech-float-delay-2' },
    { label: 'Business e-mail integration beyond hosting', Icon: Mail, position: 'left-[35%] bottom-[-20%] md:left-[35%] md:bottom-[10%]', delay: 'tech-float-delay-2' },

];

export default function Banner({ content }) {
    return (
        <section id="home" className="relative mx-auto max-w-6xl items-center scroll-mt-20">
            <div className="grid grid-cols-1 gap-8 px-6 pt-16 lg:grid-cols-2">
                <div className="order-1 lg:order-1 relative">

                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
                        {floatingSkills.map(({ label, Icon, position, delay }) => (
                            <div
                                key={label}
                                className={`tech-float absolute ${position} ${delay} inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/65 px-3 py-2 text-xs font-medium text-slate-700 opacity-85 shadow-lg shadow-slate-900/10 backdrop-blur-sm dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-200`}
                            >
                                <Icon className="h-4 w-4 text-accent" strokeWidth={1.8} />
                                {label}
                            </div>
                        ))}
                    </div>

                    <p className="font-serif text-3xl sm:text-4xl" dangerouslySetInnerHTML={{ __html: content.intro }} />
                    <h1 className="mt-2 font-serif text-3xl font-semibold sm:text-5xl" dangerouslySetInnerHTML={{ __html: content.name }} />
                    <svg className="mt-1 h-3 w-56 text-accent" viewBox="0 0 230 12" fill="none" aria-hidden="true">
                        <path d="M2 8c14-8 20 4 34-2s20 4 34-2 20 4 34-2 20 4 34-2 20 4 34-2 20 4 34-2 20 4 34-2 20 4 34-2 20 4 34-2 20 4 34-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <p
                        className="mt-8 max-w-md text-slate-500 dark:text-slate-300"
                        dangerouslySetInnerHTML={{ __html: content.description }}
                    />

                    <div className="mt-10 flex items-center gap-8">
                        <a href={content.resume.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-7 py-4 text-sm transition hover:border-accent hover:bg-accent hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent dark:border-white/20">
                            {content.resume.label}
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="m5 7 5 5-5 5m7-10 5 5-5 5" />
                            </svg>
                        </a>
                    </div>

                    <a href={content.video.href} target="_blank" rel="noopener noreferrer" className="mt-12 inline-flex items-center gap-4 text-slate-500 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-accent dark:bg-slate-800">
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </span>
                        {content.video.label}
                    </a>
                </div>
                <div className="order-2 flex justify-center lg:order-2 pt-30 md:pt-initial">
                    <div className="relative aspect-4/5 w-full max-w-md">

                        <svg className="absolute inset-0 h-full w-full text-slate-900/15 dark:text-white/20" viewBox="0 0 400 500" fill="none" aria-hidden="true">
                            <circle cx="170" cy="250" r="200" stroke="currentColor" />
                            <circle cx="170" cy="250" r="165" stroke="currentColor" opacity=".55" />
                        </svg>

                        {/* <div className="absolute inset-x-6 bottom-0 top-8 overflow-hidden rounded-t-[40%] border border-dashed border-slate-300 bg-slate-50"> */}
                        <Image
                            src={bannerBG}
                            alt="Asiful Mamun"
                            fill
                            sizes="(min-width: 1024px) 400px, calc(100vw - 3rem)"
                            className="object-contain object-bottom"
                        />
                        {/* </div> */}

                        {content.socialLinks.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                style={{ left: social.x, top: social.y, transform: 'translate(-50%, -50%)' }}
                                className="absolute flex h-14 w-14 items-center justify-center rounded-full border border-slate-300 bg-white text-accent transition hover:border-accent hover:text-accent dark:border-white/20 dark:bg-slate-900"
                            >
                                <SocialIcon name={social.icon} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
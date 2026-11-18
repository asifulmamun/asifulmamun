import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import logo from '@/src/assets/images/asifulmamun-logo.png';

export default function Header() {
    return (
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
            <nav aria-label="Main navigation" className="mx-auto flex h-[76px] max-w-6xl items-center justify-between px-6">
                <Link href="#home" aria-label="Asiful Mamun home" className="shrink-0">
                    <Image
                        src={logo}
                        alt="Asiful Mamun"
                        priority
                        className="h-10 w-auto sm:h-11"
                    />
                </Link>

                <div className="flex items-center gap-5 sm:gap-9">
                    <Link href="#home" className="text-sm font-medium text-slate-600 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                        Home
                    </Link>
                    <a
                        href="mailto:hello@asifulmamun.info.bd"
                        className="inline-flex min-h-11 items-center gap-2 rounded-full bg-slate-900 px-4 text-sm font-medium text-white transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:px-5"
                    >
                        <span className="hidden sm:inline">Let’s talk</span>
                        <span className="sm:hidden">Contact</span>
                        <ArrowUpRight aria-hidden="true" size={16} />
                    </a>
                </div>
            </nav>
        </header>
    );
}
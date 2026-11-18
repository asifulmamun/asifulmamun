'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import logo from '@/src/assets/images/asifulmamun-logo.png';
import { commonContent } from '@/src/data/common-content';
import {
    getLocalePath,
    isLocale,
    languages,
} from '@/src/data/languages';

const supportedPages = ['', 'about', 'service', 'contact'];

type ThemePreference = 'dark' | 'light';

function readThemePreference(): ThemePreference | null {
    try {
        const preference = window.localStorage.getItem('navbar-theme');
        return preference === 'dark' || preference === 'light' ? preference : null;
    } catch (error) {
        if (!(error instanceof DOMException) || error.name !== 'SecurityError') {
            throw error;
        }

        console.warn('Theme preference storage is unavailable; using the system preference.');
        return null;
    }
}

function saveThemePreference(preference: ThemePreference) {
    try {
        window.localStorage.setItem('navbar-theme', preference);
    } catch (error) {
        if (
            !(error instanceof DOMException)
            || (error.name !== 'SecurityError' && error.name !== 'QuotaExceededError')
        ) {
            throw error;
        }

        console.warn('Theme changed for this session, but the preference could not be saved.');
    }
}

function applyTheme(isDarkMode: boolean) {
    document.documentElement.dataset.theme = isDarkMode ? 'dark' : 'light';
    document.documentElement.style.colorScheme = isDarkMode ? 'dark' : 'light';
    const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (themeColor) themeColor.content = isDarkMode ? '#020617' : '#ffffff';
}

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const [darkMode, setDarkMode] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);
    const pathSegments = pathname.split('/').filter(Boolean);
    const currentLocale = isLocale(pathSegments[0]) ? pathSegments[0] : 'en';
    const currentPage = currentLocale === 'en'
        ? pathSegments.join('/')
        : pathSegments.slice(1).join('/');
    const navigationLabels = commonContent[currentLocale].navigation;
    const navigation = [
        { label: navigationLabels.home, href: getLocalePath(currentLocale, '') },
        { label: navigationLabels.about, href: getLocalePath(currentLocale, 'about') },
        { label: navigationLabels.service, href: getLocalePath(currentLocale, 'service') },
        { label: navigationLabels.contact, href: getLocalePath(currentLocale, 'contact') },
    ];
    const activeIndex = navigation.findIndex((item) => item.href === pathname);
    const indicatorIndex = hoveredItem ?? Math.max(activeIndex, 0);

    useEffect(() => {
        const savedTheme = readThemePreference();

        if (savedTheme === 'dark' || savedTheme === 'light') {
            const isDarkMode = savedTheme === 'dark';
            setDarkMode(isDarkMode);
            applyTheme(isDarkMode);
            return;
        }

        const systemTheme = window.matchMedia?.('(prefers-color-scheme: dark)');
        const isDarkMode = systemTheme?.matches ?? false;
        setDarkMode(isDarkMode);
        applyTheme(isDarkMode);

        function followSystemTheme(event: MediaQueryListEvent) {
            if (readThemePreference() === null) {
                setDarkMode(event.matches);
                applyTheme(event.matches);
            }
        }

        systemTheme?.addEventListener('change', followSystemTheme);
        return () => systemTheme?.removeEventListener('change', followSystemTheme);
    }, []);

    function toggleTheme() {
        const next = document.documentElement.dataset.theme !== 'dark';
        applyTheme(next);
        setDarkMode(next);
        saveThemePreference(next ? 'dark' : 'light');
    }

    useEffect(() => {
        setMenuOpen(false);
        setHoveredItem(null);
        const savedLocale = window.localStorage.getItem('site-language');

        if (currentLocale !== 'en') {
            window.localStorage.setItem('site-language', currentLocale);
        } else if (
            savedLocale
            && isLocale(savedLocale)
            && savedLocale !== 'en'
            && supportedPages.includes(currentPage)
        ) {
            router.replace(getLocalePath(savedLocale, currentPage));
        }
    }, [currentLocale, currentPage, pathname, router]);

    function changeLanguage(value: string) {
        if (!isLocale(value)) return;
        window.localStorage.setItem('site-language', value);
        router.push(getLocalePath(value, currentPage));
    }

    const glass = darkMode
        ? 'border-white/10 bg-[#151a22]/75 text-white shadow-[inset_0_1px_0_rgba(255,255,255,.16),0_20px_50px_rgba(0,0,0,.4)]'
        : 'border-white/70 bg-white/70 text-slate-800 shadow-[inset_0_1px_0_rgba(255,255,255,.95),0_20px_50px_rgba(30,41,59,.12)]';
    const muted = darkMode ? 'text-[#9aa4b2]' : 'text-slate-500';

    return (
        <header className="sticky top-0 z-50 px-4 pt-5 sm:px-6 sm:pt-8">
            <nav
                aria-label="Main navigation"
                className={`relative mx-auto flex h-[72px] w-full max-w-[1200px] items-center justify-between rounded-[24px] border px-3 backdrop-blur-[30px] transition-colors duration-300 sm:h-[78px] sm:rounded-[30px] sm:px-[18px] ${glass}`}
            >
                <Link
                    href={getLocalePath(currentLocale, '')}
                    aria-label="Asiful Mamun home"
                    className={`relative z-10 shrink-0 rounded-xl p-1 transition-colors`}
                >
                    <Image src={logo} alt="Asiful Mamun" priority className="h-11 w-[78px] object-contain sm:h-[54px] sm:w-[96px]" />
                </Link>

                <div
                    className={`relative hidden items-center gap-[6px] rounded-[20px] p-2 lg:flex ${darkMode ? 'bg-white/[0.03]' : 'bg-slate-900/[0.035]'}`}
                    onMouseLeave={() => setHoveredItem(null)}
                >
                    <span
                        aria-hidden="true"
                        className={`pointer-events-none absolute left-2 top-2 h-11 w-[90px] rounded-[14px] backdrop-blur-[30px] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${darkMode ? 'bg-white/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,.3),0_5px_20px_rgba(255,255,255,.05)]' : 'bg-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,.95),0_5px_20px_rgba(15,23,42,.08)]'}`}
                        style={{ transform: `translateX(${indicatorIndex * 96}px)` }}
                    />
                    {navigation.map((item, index) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            aria-current={pathname === item.href ? 'page' : undefined}
                            onMouseEnter={() => setHoveredItem(index)}
                            className={`relative z-10 flex h-11 w-22.5 items-center justify-center rounded-[14px] text-sm transition duration-300 hover:-translate-y-0.5 hover:text-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${pathname === item.href ? 'font-semibold text-current' : muted}`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                    <label className="sr-only" htmlFor="language-select">
                        {navigationLabels.language}
                    </label>
                    <select
                        id="language-select"
                        value={currentLocale}
                        onChange={(event) => changeLanguage(event.currentTarget.value)}
                        className={`h-11 max-w-[105px] rounded-full border px-3 text-sm outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${darkMode ? 'border-white/15 bg-[#151a22] text-white' : 'border-white/80 bg-white/65 text-slate-800'}`}
                    >
                        {Object.entries(languages).map(([code, language]) => (
                            <option key={code} value={code}>
                                {language.label}
                            </option>
                        ))}
                    </select>
                    <Link
                        href={getLocalePath(currentLocale, 'contact')}
                        className={`hidden h-[50px] items-center gap-2 rounded-[14px] border px-5 text-sm font-medium backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 sm:inline-flex ${darkMode ? 'border-white/15 bg-white/[0.08] text-white hover:bg-white/[0.15]' : 'border-white/80 bg-white/65 text-slate-800 hover:bg-white'}`}
                    >
                        {navigationLabels.talk} <ArrowUpRight aria-hidden="true" size={16} />
                    </Link>
                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
                        aria-pressed={darkMode}
                        title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
                        className={`flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-full border transition-colors ${darkMode ? 'border-white/15 bg-white/[0.08] text-white hover:bg-white/[0.16]' : 'border-white/80 bg-white/65 text-slate-700 hover:bg-white'}`}
                    >
                        {darkMode ? <Sun aria-hidden="true" size={18} /> : <Moon aria-hidden="true" size={18} />}
                    </button>
                    <button
                        type="button"
                        onClick={() => setMenuOpen((open) => !open)}
                        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-navigation"
                        className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors lg:hidden ${darkMode ? 'border-white/15 bg-white/[0.08] text-white hover:bg-white/[0.16]' : 'border-white/80 bg-white/65 text-slate-700 hover:bg-white'}`}
                    >
                        {menuOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
                    </button>
                </div>
            </nav>

            <div
                id="mobile-navigation"
                className={`absolute left-4 right-4 top-full z-50 mx-auto mt-3 max-w-[1200px] overflow-hidden rounded-[24px] border p-3 backdrop-blur-[30px] transition-all duration-300 lg:hidden ${glass} ${menuOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-3 opacity-0'}`}
                aria-hidden={!menuOpen}
            >
                <ul className="grid gap-1">
                    {navigation.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                aria-current={pathname === item.href ? 'page' : undefined}
                                tabIndex={menuOpen ? 0 : -1}
                                onClick={() => setMenuOpen(false)}
                                className={`flex h-12 items-center rounded-2xl px-4 text-sm transition-colors ${pathname === item.href ? (darkMode ? 'bg-white/10 text-white' : 'bg-white/75 text-slate-900') : `${muted} hover:bg-white/10 hover:text-current`}`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <Link
                    href={getLocalePath(currentLocale, 'contact')}
                    tabIndex={menuOpen ? 0 : -1}
                    onClick={() => setMenuOpen(false)}
                    className={`mt-2 flex h-12 items-center justify-center gap-2 rounded-2xl border text-sm font-medium ${darkMode ? 'border-white/15 bg-white/10 text-white' : 'border-white/80 bg-white/75 text-slate-800'}`}
                >
                    {navigationLabels.talk} <ArrowUpRight aria-hidden="true" size={16} />
                </Link>
            </div>
        </header>
    );
}
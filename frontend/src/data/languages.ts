export const languages = {
  en: {
    label: 'English',
    htmlLang: 'en',
    openGraphLocale: 'en_US',
  },
  bn: {
    label: 'বাংলা',
    htmlLang: 'bn',
    openGraphLocale: 'bn_BD',
  },
} as const;

export type Locale = keyof typeof languages;

export const defaultLocale: Locale = 'en';

export function isLocale(value: string): value is Locale {
  return Object.prototype.hasOwnProperty.call(languages, value);
}

export function getLocalizedStaticParams(): { lang: string }[] {
  return Object.keys(languages)
    .filter((locale) => locale !== defaultLocale && isLocale(locale))
    .map((lang) => ({ lang }));
}

export function getLocalePath(locale: Locale, page: string): string {
  const suffix = page ? `/${page}` : '';
  return locale === defaultLocale ? suffix || '/' : `/${locale}${suffix}`;
}

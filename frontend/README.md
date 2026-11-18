## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
3. Run the app:
   `npm run dev`

## Add a language

English uses the unprefixed routes (`/`, `/about`); other languages use a locale
prefix (for example, `/bn` and `/bn/about`). To add a locale:

1. Copy `src/data/en` to a new folder such as `src/data/fr` and translate the
   same `common.json`, `home.json`, `about.json`, `service.json`, and
   `contact.json` keys, including each page's `seo.title` and
   `seo.description`.
2. Add the locale code, display label, HTML language, and Open Graph locale to
   `src/data/languages.ts`.
3. Register the new JSON imports in `src/data/common-content.ts` and
   `src/data/locale-content.ts`.
4. Run `pnpm build`.

The language selector, static routes, page content, SEO metadata, canonical and
alternate-language links, and sitemap are generated from these locale
registries. The selector remembers the choice in `localStorage`; opening an
English route later redirects to its equivalent in the saved language.

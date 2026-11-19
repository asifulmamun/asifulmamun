# Frontend architecture

> **Scope:** Detailed reference for route, SSG, localization, SEO, sitemap,
> robots/llms.txt, theme, deployment, shared layout/document structure, and
> page/locale additions. Skip this document for unrelated, isolated UI edits.

## Overview

The active site is the Next.js App Router application in `frontend/`. It uses
React, TypeScript, Tailwind CSS 4, and JSON files for page content.

The app is built as a static site: `next.config.ts` sets `output: 'export'`,
and `pnpm build` writes deployable files to `frontend/out/`. The deployed site
does not require a running Next.js server. `pnpm start` serves the generated
output locally for preview.

## Route and locale model

English is the default locale and has no locale prefix. The `(en)` directory is
a Next.js route group, so its name does not appear in URLs.

| Page | English URL | Bengali URL |
| --- | --- | --- |
| Home | `/` | `/bn` |
| About | `/about` | `/bn/about` |
| Services | `/service` | `/bn/service` |
| Contact | `/contact` | `/bn/contact` |

The services page remains named Services at `/service` and `/bn/service`; its
navigation label is “Pricing” in English and “প্রাইসিং” in Bengali. Keep the
navigation wording separate from the page title and route slug.

English route files live in `src/app/(en)/`. Non-default locale routes live in
`src/app/[lang]/`; each locale uses the same page slugs. The localized layout
sets the document's `html lang` attribute from the locale registry.

The two root layouts are separate only because each must select the correct
`html lang` and export Next.js metadata. Both delegate document markup to
`src/components/global/site-layout.tsx`. That shared component owns the
`<html>`, `<head>`, and `<body>`, header, theme classes, and clear insertion
points for common head tags, after-body-start markup, and footer scripts. Put
shared metadata values in `src/data/site-metadata.ts`; do not duplicate common
markup or defaults between the layouts.

The supported locales and their labels are registered in
`src/data/languages.ts`. `defaultLocale` is `en`. The localized layout and
localized pages use `generateStaticParams()` to enumerate every registered
non-default locale at build time. `/en` is not generated; selecting English
returns to the corresponding unprefixed URL.

## Typography

`src/app/globals.css` loads IBM Plex Sans for application text, with IBM Plex
Sans Bengali as a glyph fallback for Bengali content, and IBM Plex Mono for
monospaced text. The sans, serif, and Noto Sans Tailwind font utilities all
resolve to the IBM Plex Sans family so existing page styles use consistent
typography across the application.

The language selector is in `src/components/global/header.tsx`:

- It stores the selected code in `localStorage` under `site-language`.
- Switching languages keeps the current page slug and navigates to that
  locale's equivalent route.
- Opening an English route with a saved non-English preference redirects to
  the equivalent localized route after the client loads.
- Because static HTML cannot read `localStorage`, the first response for `/`
  is always the English SSG page; the saved-language redirect happens in the
  browser.

## Locale data

Each locale has the same JSON file structure:

```text
src/data/
  services.json
  en/
    common.json
    home.json
    about.json
    service.json
    contact.json
  bn/
    services.json
    common.json
    home.json
    about.json
    service.json
    contact.json
```

- `common.json` contains shared navigation labels and header copy.
- Each page JSON contains that page's text and a `seo` object with `title` and
  `description`.
- The Services page imports its English service data directly from
  `src/data/services.json` in its Server Component and its Bengali translation
  from `src/data/bn/services.json`. Both routes keep using the `service` slug.
- The home JSON also contains the banner's intro, buttons, and social links.

`src/data/common-content.ts` imports common labels for the header.
`src/data/locale-content.ts` imports each page JSON and provides the typed
locale-to-page map used by route components.

### Add a language

For example, to add French (`fr`):

1. Create `src/data/fr/` and add `common.json`, `home.json`, `about.json`,
   `service.json`, and `contact.json`. Follow the existing JSON shapes and
   translate all user-facing copy and every page's `seo.title` and
   `seo.description`.
2. Add `fr` to `src/data/languages.ts`, including its selector label,
   `htmlLang`, and Open Graph locale. Keep `en` as `defaultLocale` unless the
   default URL policy is intentionally changing.
3. Import and register the new common JSON in `src/data/common-content.ts`.
4. Import and register all four page JSON files in `src/data/locale-content.ts`.
5. Run `pnpm exec tsc --noEmit` and `pnpm build` from `frontend/`.

After registration, the selector, `[lang]` static params, localized HTML
language, SEO alternate-language URLs, and locale entries in the sitemap all
use the new locale. The routes will be `/fr`, `/fr/about`, `/fr/service`, and
`/fr/contact`.

## Add a page

Adding a page requires source updates as well as JSON:

1. Add a JSON file for the page to **every** locale folder. Include translated
   page content and the page's SEO title and description.
2. Add the page component under `src/components/pages/` if the page needs new
   UI.
3. Add the English route under `src/app/(en)/<slug>/page.tsx`.
4. Add its localized counterpart under `src/app/[lang]/<slug>/page.tsx`.
   Export `generateStaticParams()` using `getLocalizedStaticParams()` and use
   `createPageMetadata()` for its localized SEO metadata.
5. Register the page's JSON imports and page key in
   `src/data/locale-content.ts`. Update the content type if the page has a new
   JSON shape.
6. If it belongs in the header navigation, add its label to each
   `common.json` and add the corresponding link in
   `src/components/global/header.tsx`.
7. Add its slug to the `pages` array in `src/app/sitemap.ts`.
8. Type-check and build to confirm all locale routes are statically generated.

## SSG and static export

- `next.config.ts` enables `output: 'export'` and unoptimized Next images.
- English pages are statically rendered from `src/app/(en)/`.
- Non-default language pages are statically rendered from the locale values
  returned by `getLocalizedStaticParams()`.
- `pnpm build` is the authoritative check that every route can be exported.
- `out/` and `.next/` are generated artifacts; do not edit them manually.
- If the development server returns a stale route after adding or moving route
  files, stop and restart `pnpm dev` so Next rebuilds its route manifest.
- To test the development site from a phone over the LAN, add the PC's LAN
  hostname to `allowedDevOrigins` in `next.config.ts` (without the scheme or
  port), then restart `pnpm dev`. The current development network uses
  `10.232.127.196`. Without this, Next.js can block dev assets requested
  through the LAN IP, leaving the page visible but its client-side controls
  inactive. This setting does not affect the static production export.

## SEO metadata

Page SEO values are stored beside the page content in each locale's JSON:

```json
{
  "seo": {
    "title": "Page title",
    "description": "A concise page description."
  }
}
```

`src/data/site-metadata.ts` provides:

- The site `metadataBase`, using `NEXT_PUBLIC_BASE_URL` or the production
  default `https://asifulmamun.info.bd`.
- Shared Open Graph defaults in `baseOpenGraph`. Add common Open Graph values,
  such as `images: ['/og-image.png']`, here so the root and page metadata
  reuse them. Put metadata images in `public/` so crawlers can fetch them.
- `createPageMetadata(locale, page)`, which reads the page's JSON SEO fields
  and builds the absolute title, description, canonical URL, Open Graph data,
  and `hreflang` alternates (including `x-default`).
- Root metadata shared by the English and localized root layouts.

When deploying to another domain, set `NEXT_PUBLIC_BASE_URL` to its absolute
origin, for example `https://example.com`.

Add site-wide Google verification metadata to `siteMetadata` in this same
module. Add custom head tags, body-start snippets (such as the GTM noscript
fallback), and footer scripts at their corresponding insertion points in
`site-layout.tsx`. Use the actual provider ID/configuration and follow any
required consent policy.

`src/app/icon.png` is the shared Next.js file-based favicon for all routes and
locales; replace that file to change the site icon. A default social-preview
image should be placed in `public/` and added once to `baseOpenGraph.images`.

## Sitemap, robots, and LLM information

- `src/app/sitemap.ts` builds sitemap URLs from the page slug list and every
  registered locale. Adding a locale updates sitemap language coverage;
  adding a page requires adding its slug to the `pages` array.
- `src/app/robots.ts` allows crawling and points to the generated sitemap.
- `src/app/llms.txt/route.ts` serves a static, English-only `/llms.txt`.
  It is not currently generated from locale JSON; update it explicitly if its
  content or language coverage should change.

## Shared head and scripts

The shared document component is `src/components/global/site-layout.tsx`.
Place shared custom tags in its `<head>`, common code immediately after the
opening `<body>` (for example a GTM `<noscript>` fallback), and common footer
scripts after `{children}`. These locations are rendered for both English and
localized routes.

Use Next.js Metadata exports and `src/data/site-metadata.ts` for SEO tags and
verification metadata instead of hand-writing duplicate title/description
tags. `src/app/icon.png` is the shared file-based favicon. Add scripts only
with the actual provider configuration and any required consent handling.

## Theme

The theme toggle is in `src/components/global/header.tsx`.

- Shared visual colors are defined as `--color-base`, `--color-accent`, and
  `--color-optional` in `src/app/globals.css`. Prefer these tokens for new UI
  and provide matching `dark:` styles.
- `navbar-theme` in `localStorage` stores `dark` or `light`; if unset, the
  browser's system color preference is used.
- The selected theme is reflected as `data-theme` on the root `<html>` element.
- The theme toggle updates the mobile browser chrome through the shared
  `theme-color` meta tag. If browser storage is blocked, the theme still changes
  for the current page and a warning explains that the choice cannot persist.
- `src/app/globals.css` defines Tailwind's `dark:` variant against that
  attribute.
- Layout, home/banner, and other page surfaces use `dark:` classes. Add
  matching dark styles when introducing new backgrounds, text, borders, or
  controls.

## Commands

Run from `frontend/`:

```powershell
pnpm dev
pnpm exec tsc --noEmit
pnpm build
pnpm start
```

## Keeping architecture and agent guidance current

When a change materially alters architecture, shared application behavior, or
a workflow other agents rely on, update this document in the same change
without waiting for the user to request it. Also update the relevant agent
entry points (`../AGENTS.md`, `../CLAUDE.md`, and
`../.github/copilot-instructions.md`) when their architecture summary or
read-when instructions need to change. Keep updates focused on durable
decisions and the current source of truth; routine isolated UI or copy changes
do not need architecture-document changes.

# Frontend agent guide

The active app is a Next.js App Router project configured for static export.
Before implementing a frontend task, read [`ARCHITECTURE.md`](ARCHITECTURE.md)
and follow the route, locale, SEO, and static-export conventions described
there.

## Source-of-truth rules

- Edit application source under `src/`; do not hand-edit `out/` or `.next/`.
- Page copy and page SEO belong in the matching locale JSON files under
  `src/data/<locale>/`.
- Add every page's content and SEO data for every supported language.
- Keep `src/data/languages.ts`, `src/data/common-content.ts`, and
  `src/data/locale-content.ts` consistent when registering a locale.
- English is the default, unprefixed locale. Do not add `/en` routes unless the
  URL policy is intentionally changed across routing, links, metadata, and the
  sitemap.
- This app must remain buildable with `output: 'export'`; avoid runtime-only
  server features unless the deployment architecture is deliberately changed.

## Validation

Run commands from this directory:

```powershell
pnpm exec tsc --noEmit
pnpm build
```

`pnpm build` creates the static site in `out/`. See [`README.md`](README.md)
for local run instructions.

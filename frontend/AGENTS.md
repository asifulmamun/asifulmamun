# Frontend agent guide

> **Scope:** Short rules for changes under `frontend/`. Read
> [`ARCHITECTURE.md`](ARCHITECTURE.md) only when the task touches the systems
> listed below.

The active app is a Next.js App Router project configured for static export.
Copilot's repository-wide entry point is
[`../.github/copilot-instructions.md`](../.github/copilot-instructions.md).

Read [`ARCHITECTURE.md`](ARCHITECTURE.md) for tasks involving routes, SSG,
localization, page data, SEO, sitemap/robots/llms.txt, theme, deployment, or
adding a page or locale. For an isolated UI or copy change, inspect only the
relevant source files.

## Source-of-truth rules

- Edit application source under `src/`; do not hand-edit `out/` or `.next/`.
- Page copy and page SEO belong in the matching locale JSON files under
  `src/data/<locale>/`.
- Add every page's content and SEO data for every supported language.
- Keep `src/data/languages.ts`, `src/data/common-content.ts`, and
  `src/data/locale-content.ts` consistent when registering a locale.
- Put shared `<html>`, `<head>`, `<body>`, header, and common script insertion
  points in `src/components/global/site-layout.tsx`; do not duplicate them in
  both root layouts.
- Keep shared metadata defaults in `src/data/site-metadata.ts`. Page-specific
  SEO must continue to come from locale JSON through `createPageMetadata()`.
- Use `src/app/icon.png` for the shared Next.js favicon. Use Next.js Metadata
  for SEO and icons; put common head/body/footer snippets in the matching
  insertion point in `site-layout.tsx`.
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

# GitHub Copilot instructions

> **Scope:** Short, repository-wide guidance for Copilot. Read the linked
> detailed documents only when the task needs them.

- The active Next.js application is in `frontend/`
- Follow the repository map in [`AGENTS.md`](../AGENTS.md). For frontend work,
  follow [`frontend/AGENTS.md`](../frontend/AGENTS.md).
- Read [`frontend/ARCHITECTURE.md`](../frontend/ARCHITECTURE.md) only for
  tasks involving routes, SSG/static export, localization, page data, SEO,
  sitemap/robots/llms.txt, theme behavior, deployment, or adding a page or
  locale. For an isolated UI or copy change, inspect only the relevant source
  and locale JSON.
- Edit source files, not generated `frontend/out/` or `frontend/.next/`.
- Use `pnpm` commands from `frontend/`; run `pnpm exec tsc --noEmit` and
  `pnpm build` when changing application code.
- Do not read local `.env` values into responses or commit credentials.

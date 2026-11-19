# Repository guide for coding agents

> **Scope:** Repository-wide map and shared rules. Read for all repository
> tasks; use the frontend architecture reference only when relevant.

## Documentation map

This repository contains two frontend implementations. The active Next.js
application is in `frontend/`;
Unless a task explicitly targets the legacy site, make frontend changes in
`frontend/`.

For Copilot, the auto-loaded entry point is
[`.github/copilot-instructions.md`](.github/copilot-instructions.md). For
other coding agents:

1. Read [`frontend/AGENTS.md`](frontend/AGENTS.md) for any frontend task.
2. Read [`frontend/ARCHITECTURE.md`](frontend/ARCHITECTURE.md) when work
   involves routes, SSG, localization, SEO, sitemap, robots, llms.txt, theme,
   deployment, adding a page or locale, or changing shared layout/document
   structure, metadata, or common scripts.
3. Use [`frontend/README.md`](frontend/README.md) for local setup.

## Repository map

- `frontend/src/app/`: App Router route files and static metadata routes.
- `frontend/src/components/`: shared header and page UI.
- `frontend/src/data/`: language registry and per-language JSON content.
- The root `README.md` is the public profile README, not the application
  architecture guide.
- `00-git-push.bat`, `01-git-deploy-cloudflare.bat`: repository workflow
  scripts; inspect before running because they change branches and Git state.

## Working rules

- Keep changes in the requested project and preserve unrelated work.
- Read the frontend architecture before changing routes, locale data, metadata,
  static-export behavior, or shared layout/document structure.
- Preserve the services page route `/service` (and `/bn/service`) and its
  Services identity. “Pricing” is the navigation label only; do not rename the
  page or route to Pricing.
- When a change materially changes architecture, shared application behavior,
  or a workflow other agents rely on, update the relevant architecture and
  agent guidance in the same change. Do this proactively; do not wait for the
  user to request documentation. Keep documentation changes scoped to the
  behavior that changed.
- Do not commit credentials or copy values from local `.env` files. Use
  `frontend/env.example` as the environment-variable reference.
- Do not commit and don't ask for commit git will manage by owner.
- Run frontend commands from `frontend/`. The build output in `frontend/out/`
  is generated; edit the source files instead.

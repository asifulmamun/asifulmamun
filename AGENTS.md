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
2. Read [`frontend/ARCHITECTURE.md`](frontend/ARCHITECTURE.md) only when work
   involves routes, SSG, localization, SEO, sitemap, robots, llms.txt, theme,
   deployment, or adding a page or locale.
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
  or static-export behavior.
- Do not commit credentials or copy values from local `.env` files. Use
  `frontend/env.example` as the environment-variable reference.
- Do not commit and don't ask for commit git will manage by owner.
- Run frontend commands from `frontend/`. The build output in `frontend/out/`
  is generated; edit the source files instead.

# Repository guide for coding agents

## Read first

This repository contains two frontend implementations. The active Next.js
application is in `frontend/`; `frontend-v1.0.0/` is the older static site.
Unless a task explicitly targets the legacy site, make frontend changes in
`frontend/`.

Before changing the Next.js application, read:

1. [`frontend/AGENTS.md`](frontend/AGENTS.md) for frontend-specific agent rules.
2. [`frontend/ARCHITECTURE.md`](frontend/ARCHITECTURE.md) for routing, SSG,
   localization, SEO, sitemap, and theme behavior.
3. [`frontend/README.md`](frontend/README.md) for local setup and the short
   language-addition checklist.

## Repository map

- `frontend/src/app/`: App Router route files and static metadata routes.
- `frontend/src/components/`: shared header and page UI.
- `frontend/src/data/`: language registry and per-language JSON content.
- `frontend-v1.0.0/`: legacy HTML/CSS/JS site; do not treat it as the source
  for the active Next.js application.
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
- Run frontend commands from `frontend/`. The build output in `frontend/out/`
  is generated; edit the source files instead.

# AGENTS.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository structure

Marginalia is a two-app repo with no shared root tooling — each app has its own package.json, lockfile, and commands, run from its own directory:

- `back/` — NestJS 11 REST API (TypeORM + PostgreSQL)
- `front/` — Next.js 16 (App Router) + React 19 frontend

## Commands

### Backend (`back/`)

```bash
npm run start:dev      # watch mode (primary dev loop)
npm run build           # nest build
npm run lint             # eslint --fix on src,apps,libs,test
npm run format           # prettier --write on src/test
npm run test              # jest unit tests
npm run test:watch     # jest --watch
npx jest src/path/to/file.spec.ts   # run a single test file
npm run test:e2e        # jest -c test/jest-e2e.json
```

Postgres for local dev is started via `docker-compose up -d` in `back/` (reads `POSTGRES_PASSWORD` from `back/.env`).

Required env vars (`back/.env`, validated with Joi in `app.module.ts` — the app fails to boot if any required var is missing): `DATABASE_URL`, `JWT_SECRET`, `FRONTEND_URL`, plus optional `PORT` (default 3000), `JWT_EXPIRES_IN` (default `15m`), `REFRESH_EXPIRES_MS` (default 7 days in ms).

### Frontend (`front/`)

```bash
npm run dev       # next dev
npm run build     # next build
npm run start     # next start (serve production build)
npm run lint       # eslint
```

Env: `NEXT_PUBLIC_API_URL` in `front/.env.local` points at the backend.

No test runner is configured in `front/`.

## Backend architecture

Each domain lives in its own module under `back/src/<domain>/` (`users`, `auth`, `books`, `reading-session`), following NestJS conventions with a strict layering:

- **Controller** — routing, guards (`@UseGuards(JwtAuthGuard)`), param validation (`ParseUUIDPipe`), and pulling the authenticated user via `@CurrentUser()`. Controllers call the service and do no business logic themselves.
- **Service** — business rules and cross-module orchestration (e.g. `ReadingSessionService` calls `BooksService` to validate a `bookId` before creating a session). Ownership checks ("is this the requesting user's own resource?") live here, not in the controller or repository — see `update`/`deleteById` in `reading-session.service.ts` for the pattern: fetch, compare `resource.user.id !== user.id`, throw `UnauthorizedException`.
- **Repository** — a thin wrapper `@Injectable()` class (not a TypeORM custom repository) that wraps `Repository<Entity>` injected via `@InjectRepository`. All TypeORM query building is confined here.
- **DTOs** (`dtos/`) — `class-validator`-decorated input shapes. The global `ValidationPipe` in `main.ts` has `whitelist: true` and `forbidNonWhitelisted: true`, so every incoming field must be declared on a DTO or the request is rejected.
- **Entities** (`entities/`) — TypeORM entities. `synchronize: true` is on in `app.module.ts`, so schema changes are picked up automatically from entities in dev — there are no migrations.

Auth (`back/src/auth/`):

- JWT access tokens (short-lived, `JWT_EXPIRES_IN`) via `@nestjs/passport` + `passport-jwt` (`jwt.strategy.ts`, `JwtAuthGuard`).
- Refresh tokens are opaque random bytes; only a SHA-256 hash is persisted (`RefreshToken` entity via `RefreshTokenRepository`) — never the raw token. Rotation happens on every `/auth/refresh` call: the old token row is deleted and a new one issued.
- `AuthService.validateUser` compares against a `DUMMY_HASH` when no user is found, so login timing doesn't leak whether an email exists.
- Routes without `@UseGuards(JwtAuthGuard)` are public — check each controller method individually; per prior discussion, GET list/detail endpoints are intentionally public on this project (do not propose making them auth-only).

Global request pipeline (`main.ts`): CORS restricted to `FRONTEND_URL`, global `ValidationPipe` as above, global `ClassSerializerInterceptor` (registered in `app.module.ts`) so `@Exclude()` on entities (e.g. hiding password hashes) is respected on every response.

There are no tests in `back/` currently — per prior discussion, do not propose adding a test suite unprompted.

## Frontend architecture

App Router structure under `front/src/app/`; shared UI in `front/src/components/`. Path alias `@/*` maps to `front/` root (see `tsconfig.json`), so imports look like `@/src/app/lib/api`.

- `front/src/app/lib/paths.ts` — single source of truth for backend route strings (`paths.login`, `paths.register`); add new backend endpoints here rather than hardcoding path strings in components.
- `front/src/app/lib/api.ts` — `apiFetch` is the sole fetch wrapper: attaches `Authorization: Bearer <access_token>` from `localStorage`, throws on non-OK responses using the backend's `message` field. Auth tokens (`access_token`, `refresh_token`) are stored in `localStorage`, not cookies — there is no refresh-token rotation wired up on the client yet (see `front/TODO.todo`).
- Forms use `react-hook-form` + `zod` via `@hookform/resolvers/zod`, with the Zod schema defined inline in the form component (see `login-form.tsx`, `register-form.tsx`). Follow this pattern for new forms rather than introducing a different validation approach.
- UI kit is `@heroui/react` (+ `@heroui/styles`, `@gravity-ui/icons`); styling is Tailwind v4 (`@tailwindcss/postcss`, no `tailwind.config` — configured via CSS in `globals.css`).
- Theming via `next-themes` (`class` attribute strategy, `defaultTheme="system"`); `theme-switcher.tsx` and `themed-image.tsx` handle theme-aware rendering.
- Fonts: `Fraunces` (serif, headings/display — `--font-fraunces`) and `Inter` (`--font-inter`), loaded in `layout.tsx` via `next/font/google`.

## Collaboration mode: teach, don't just hand over code

The user is using this project to learn, not just to ship, and wants to write most of
the actual code themselves. Default to teaching mode for every request in this repo,
not just ones explicitly framed as questions. This mode governs explanation and code
shown _in the response_ — it does not by itself authorize editing files. See "Never
implement without explicit confirmation" below for that.

- When asked to implement or fix something, don't jump straight to a diff. First
  explain the _why_: what's actually going on (the underlying concept — NestJS DI,
  JWT/refresh-token flow, TypeORM relations, React Hook Form + Zod, whatever's
  relevant), then the _how_ (the approach and the tradeoffs it has over alternatives).
- Keep the _concept_ and the _plan_ as two separate, clearly labeled things — don't let
  the "how" collapse into a file-by-file checklist standing in for the explanation. The
  concept should be general enough that the user could explain it back or reapply it to
  a different problem (e.g. "signed requests hash params server-side so a secret never
  reaches the client"); the plan is the specific, this-task-only list of steps, and
  should read as unambiguously separate from the concept, not interleaved with it.
- If a task bundles more than one distinct concept (e.g. request signing, a framework's
  DI mechanism, and an upload pattern, all in one feature), teach each one as its own
  labeled piece rather than one continuous narrative that blurs them together.
- Connect explanations back to patterns already in this codebase (see the architecture
  notes above) rather than generic textbook examples — the user learns faster from
  "this is the same ownership-check pattern as `reading-session.service.ts`" than from
  an abstract explanation.
- Default to a guided, Socratic workflow: ask the user to reason about the next step,
  inspect the relevant code, or propose an implementation before revealing it.
- Do not provide complete, copy-paste-ready implementations by default. Give
  progressively stronger hints: first the concept, then the relevant files and
  interfaces, then pseudocode or a small illustrative fragment only if needed.
- When reviewing the user's attempt, identify what is correct first, explain the
  specific gap, and help them make the next correction rather than replacing their
  work.
- If the user explicitly asks for the solution or is stuck after trying, provide it,
  but explain each important decision.
- Show code as inline snippets only when it helps illustrate the approach, narrating
  the non-obvious decisions and where you deviated from the naive approach and why.
  Snippets in the chat are not file edits.
- For pure explanation questions ("why does X work this way", "what does Y do"), go
  deeper than a one-liner. Favor the explanation over a wall of code.
- It's fine to ask how much depth is wanted if a question could go shallow or deep.

## Never implement without explicit confirmation

The user drives most hands-on implementation themselves and wants Claude mainly for
explanation, review, and analysis — not unrequested edits.

- Confirming a _direction_ ("yeah let's do the signed version," "sounds good," "that
  one") is not authorization to start editing files, installing packages, or running
  anything beyond read-only commands. It confirms the plan, not the execution.
- Before using Edit/Write/NotebookEdit, or any command that changes files, installs
  packages, or touches git state, state the concrete plan (which files, what changes)
  and wait for an explicit go-ahead — "do it," "implement it," "write it," "go ahead,"
  or equivalent.
- This applies to every file — source, docs, TODOs, config, `.env`, lockfiles — not
  just application code.
- Don't cascade through multiple file edits in one turn just because the first one was
  approved; if a natural next step comes up mid-implementation, pause and confirm it
  too rather than assuming continued license.

## Cross-cutting notes

- `back/TODO.todo` and `front/TODO.todo` (Emacs org-mode-style todo.txt format) track in-flight and completed work per app — check them for current priorities before starting new work. Per prior discussion, don't edit these files unless asked.

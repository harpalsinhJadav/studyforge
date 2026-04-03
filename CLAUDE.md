# StudyForge — CLAUDE.md

> AI-powered learning engine · Monorepo (Mobile + Web + API + Backend)

---

## Project Overview

StudyForge transforms any learning material (PDF, PPTX, DOC, video, audio, image, URL, voice) into AI-structured chapters, summaries, and adaptive quizzes. Users can also generate content from a topic name alone (Topic Mode) using a semantic cache backed by vector embeddings.

**Tagline:** AI Learning Engine
**Brand:** Hexagon monogram "SF", violet/purple (`#7C6FF7`)
**Platforms:** iOS · Android (React Native) · Web (React) · Admin Web

---

## Monorepo Structure

```
studyforge/
├── apps/
│   ├── mobile/          # React Native (Expo) — iOS & Android
│   ├── web/             # React + Vite — user-facing web app
│   ├── admin/           # React + Vite — admin panel (admin.studyforge.ai)
│   └── api/             # Node.js (Express/Fastify) or FastAPI — REST + WebSocket
├── packages/
│   ├── ui/              # Shared design system tokens + components
│   ├── config/          # ESLint, TypeScript, Prettier shared configs
│   ├── types/           # Shared TypeScript types / API contracts
│   └── utils/           # Shared utility functions
├── backend/
│   ├── ai/              # AI pipeline — processing, chunking, LLM, embeddings
│   ├── db/              # PostgreSQL + pgvector migrations & seeds
│   └── storage/         # S3-compatible file storage abstraction
├── .github/
│   ├── workflows/        # CI/CD pipelines (lint, test, build, deploy)
│   └── PULL_REQUEST_TEMPLATE.md
├── CLAUDE.md             # This file
└── package.json          # Workspace root (pnpm workspaces)
```

**Package manager:** pnpm workspaces
**Node version:** ≥ 20 LTS

---

## Tech Stack

| Layer | Technology |
|---|---|
| Mobile | React Native (Expo SDK 51+) |
| Web / Admin | React 18 + Vite 5 |
| State | Zustand (client) / React Query (server state) |
| Navigation | React Navigation v6 (mobile) / React Router v6 (web) |
| UI | Custom design system — **no third-party component library** |
| API | Node.js + Fastify (recommended) or FastAPI (Python) |
| Database | PostgreSQL + pgvector |
| File storage | S3-compatible (AWS S3 / Cloudflare R2) |
| Auth | Supabase Auth or Firebase Auth |
| AI — Cloud | Gemini API |
| AI — Local | Ollama (LLaMA / Mistral) |
| Embeddings | text-embedding model (Gemini or local) |
| Vector DB | pgvector (co-located) or Qdrant |
| Analytics | PostHog |
| Monitoring | Sentry |

---

## Design System

All UI is implemented from the custom design system below. Do **not** use external component libraries.

### Color Tokens

```ts
// packages/ui/src/tokens/colors.ts
export const colors = {
  primary:        '#7C6FF7',  // CTAs, active states, brand accent
  primaryDark:    '#5B4FD4',  // Pressed state
  primaryLight:   '#A78BFA',  // Text on dark bg
  accentOrange:   '#E85D2F',  // Warnings, "Pro" difficulty
  accentAmber:    '#F4A227',  // Streaks, in-progress
  success:        '#10B981',  // Correct answers, completed
  danger:         '#EF4444',  // Wrong answers, errors
  bgPage:         '#0A0A14',  // Page background
  bgScreen:       '#0D0D18',  // Screen background
  bgTopbar:       '#111120',  // Topbar / elevated
  surface:        'rgba(255,255,255,0.04)',  // Cards
  border:         'rgba(255,255,255,0.07)',  // Card borders
};
```

### Typography

| Role | Font | Weight | Size |
|---|---|---|---|
| Display / Logo | Syne | 800 | 22–32px |
| Heading | Syne | 700 | 14–18px |
| UI Labels | Outfit | 600 | 9–13px |
| Body / Meta | DM Sans | 400/500 | 8–12px |

Google Fonts: `Syne:wght@700;800`, `DM+Sans:wght@400;500;600`, `Outfit:wght@400;500;600;700`

### Spacing & Radius

```ts
export const spacing = { base: 4, cardPad: 12, screenPad: 14, sectionGap: 10 };
export const radius  = { card: 10, button: 10, chip: 5, avatar: 9999 };
```

---

## Navigation Architecture

### Mobile — 5-tab bottom nav
```
Home | Library | [+ FAB Upload] | Quiz | Profile
```

### Web — Left sidebar
```
Dashboard | My Library | Upload | Quizzes | Explore | Analytics | Settings
```

### Admin — Left sidebar
```
Dashboard | Users | Materials | Quizzes | AI Models | Storage | Billing | Alerts | Settings | API Keys
```

---

## Screen Reference

See `studyforge_spec.md` for the full screen inventory (S01–S22, W01–W02).
See `studyforge_mockup.html` for the complete pixel-accurate mockup of all screens.

**Quick map:**

| ID | Screen | Route |
|---|---|---|
| S01 | Splash | app launch |
| S02 | Onboarding Carousel | `/onboarding` |
| S03 | Sign In | `/auth/signin` |
| S04 | Sign Up | `/auth/signup` |
| S06 | Home Dashboard | `/home` |
| S07 | Upload | `/upload` |
| S08 | Processing | `/upload/processing` |
| S09 | Material Detail | `/material/:id` |
| S10 | Chapter Reader | `/material/:id/chapter/:chapterId` |
| S11 | Ask AI | `/material/:id/ask` |
| S12 | Quiz Setup | `/quiz/setup` |
| S14 | Quiz Active | `/quiz/:quizId/play` |
| S15 | Quiz Results | `/quiz/:quizId/results` |
| S16 | Library | `/library` |
| S17 | Explore | `/explore` |
| S18 | Leaderboard | `/leaderboard` |
| S19 | Profile | `/profile` |
| S21 | Settings | `/settings` |
| S22 | Paywall / Plans | `/plans` |

---

## AI Processing Pipeline

```
Upload
  → file validation + type detection
  → text extraction (PDF parser / Whisper for audio / YouTube transcript for video)
  → semantic chunking (paragraph-level)
  → LLM analysis → chapter titles + summaries + key concepts
  → quiz generation per chapter × difficulty
  → vector embedding of chunks → stored in pgvector
  → semantic cache check (cosine similarity ≥ 0.92) before any new LLM call
```

**Models:**
- Primary: Gemini (cloud) — complex analysis
- Secondary: Ollama local — quiz generation, simple Q&A
- Fallback: local → Gemini on failure

**Cache TTL:** 30 days, refreshed on access

---

## Plan Tiers

| Feature | Free | Pro |
|---|---|---|
| Materials/month | 5 | Unlimited |
| File types | PDF, URL | All types |
| Max file size | 10 MB | 500 MB |
| Quiz difficulty | Basic, Medium | All (incl. Advanced, Pro) |
| Ask AI | — | ✓ |
| Topic mode | 3/month | Unlimited |
| Storage | 500 MB | 5 GB |

---

## GitHub MCP Integration

StudyForge uses the **GitHub MCP server** for all GitHub operations — commits, PRs, reviews, pipeline status, and deployments. Never use the `gh` CLI or raw `git` for GitHub-facing tasks when MCP tools are available.

### Setup

Add to `.claude/settings.json` (or user-level MCP config):

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "<your-token>"
      }
    }
  }
}
```

Required token scopes: `repo`, `read:org`, `read:user`, `workflow`

### Commit Workflow

1. Stage only relevant files — never use `git add -A` blindly.
2. Use GitHub MCP `create_or_update_file` / `push_files` for file-level operations when appropriate.
3. Commit message format (Conventional Commits):
   ```
   <type>(<scope>): <subject>

   [optional body]

   Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
   ```
   Types: `feat`, `fix`, `refactor`, `style`, `test`, `docs`, `chore`, `ci`
   Scopes: `mobile`, `web`, `admin`, `api`, `backend`, `ui`, `ai`, `db`, `infra`

### Pull Request Workflow

When asked to create a PR, use the GitHub MCP `create_pull_request` tool:

- **Branch naming:** `<type>/<scope>-<short-description>` e.g. `feat/mobile-quiz-active`
- **Base branch:** `main` (production) or `develop` (integration)
- **PR template** (`.github/PULL_REQUEST_TEMPLATE.md`):

```markdown
## Summary
<!-- What changed and why -->

## Type
- [ ] feat · [ ] fix · [ ] refactor · [ ] chore · [ ] docs

## Scope
- [ ] mobile · [ ] web · [ ] admin · [ ] api · [ ] backend · [ ] ui

## Test plan
<!-- How was this tested? -->

## Screenshots / recordings
<!-- For UI changes, attach mobile + web screenshots -->

## Checklist
- [ ] Design tokens used (no hardcoded colors/fonts)
- [ ] No third-party component libraries added
- [ ] Types updated in `packages/types`
- [ ] API contract updated if endpoints changed
```

### Code Review with MCP

Use GitHub MCP tools for PR review operations:

| Task | MCP Tool |
|---|---|
| List open PRs | `list_pull_requests` |
| Read PR diff | `get_pull_request_files` |
| Read PR comments | `get_pull_request_comments` |
| Post review comment | `create_pull_request_review` |
| Approve / Request changes | `submit_pull_request_review` |
| Merge PR | `merge_pull_request` |

**Review checklist:**
- Design tokens from `packages/ui/src/tokens` — no hardcoded hex values
- No external component libraries imported
- Screen matches mockup in `studyforge_mockup.html`
- API types match `packages/types`
- No `console.log` left in production paths
- Proper error boundaries and loading states

### CI/CD Pipeline — GitHub Actions

Workflows in `.github/workflows/`:

| File | Trigger | Purpose |
|---|---|---|
| `ci.yml` | PR open / push | Lint + type-check + unit tests across all packages |
| `build-mobile.yml` | PR to main | Expo EAS build (iOS + Android) |
| `build-web.yml` | PR to main | Vite production build (web + admin) |
| `deploy-api.yml` | Push to main | Deploy API service |
| `deploy-web.yml` | Push to main | Deploy web + admin to CDN |
| `deploy-mobile.yml` | Tag `v*` | Submit to App Store + Play Store via EAS |

Use GitHub MCP tools to monitor pipeline:

| Task | MCP Tool |
|---|---|
| List workflow runs | `list_workflow_runs` |
| Get run status | `get_workflow_run` |
| Get run logs | `download_workflow_run_logs` |
| Re-run failed jobs | `rerun_workflow` |

### Deployments

| Environment | Branch | URL |
|---|---|---|
| Production web | `main` | `app.studyforge.ai` |
| Production admin | `main` | `admin.studyforge.ai` |
| Production API | `main` | `api.studyforge.ai` |
| Staging | `develop` | `staging.studyforge.ai` |
| Preview | PR branches | Auto-generated preview URL |

Use GitHub MCP `create_deployment` and `create_deployment_status` to track and update deployment state.

---

## Development Commands

```bash
# Install all dependencies
pnpm install

# Run all apps in dev mode
pnpm dev

# Run specific workspace
pnpm --filter mobile dev
pnpm --filter web dev
pnpm --filter api dev

# Lint all packages
pnpm lint

# Type-check all packages
pnpm typecheck

# Run tests
pnpm test

# Build all
pnpm build

# Database migrations
pnpm --filter db migrate:latest
pnpm --filter db migrate:rollback
```

---

## Coding Conventions

### General
- TypeScript strict mode in all packages (`"strict": true`)
- No `any` types — use `unknown` and narrow properly
- Prefer named exports over default exports (except page/screen components)
- Co-locate tests: `Component.test.tsx` next to `Component.tsx`

### React / React Native
- Functional components only — no class components
- Custom hooks in `hooks/` folder prefixed with `use`
- All colors, fonts, spacing from design tokens — never hardcode values
- Screen components live in `screens/` (mobile) or `pages/` (web)
- Shared components in `packages/ui/src/components/`

### API
- REST endpoints: `GET /materials`, `POST /materials`, `PATCH /materials/:id`, `DELETE /materials/:id`
- All responses: `{ data, error, meta }` envelope
- Auth: Bearer JWT (Supabase/Firebase token)
- Pagination: cursor-based (`?cursor=&limit=`)

### Database
- Migrations in `backend/db/migrations/` — never modify existing migrations
- All timestamps: `created_at`, `updated_at` (UTC)
- Soft-delete: `deleted_at` nullable column
- Vector columns: `VECTOR(1536)` for embeddings

### File Storage
- Key convention: `<userId>/<materialId>/<filename>`
- Signed URLs for all client-facing file access (never expose raw S3 keys)

---

## Environment Variables

```bash
# apps/api/.env
DATABASE_URL=
VECTOR_DB_URL=
SUPABASE_URL=
SUPABASE_SERVICE_KEY=
GEMINI_API_KEY=
OLLAMA_HOST=
S3_BUCKET=
S3_REGION=
S3_ACCESS_KEY=
S3_SECRET_KEY=
JWT_SECRET=

# apps/web/.env
VITE_API_URL=
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_POSTHOG_KEY=

# apps/mobile/.env
EXPO_PUBLIC_API_URL=
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
```

Never commit `.env` files. Use `.env.example` with placeholder values.

---

## Key Decisions & Constraints

- **No external UI libraries** — all components built from the custom design system in `packages/ui`
- **Semantic cache first** — always check vector DB before calling any LLM (cosine ≥ 0.92 threshold)
- **Local LLM default for quiz gen** — use Gemini only when local model fails or for complex analysis
- **Free tier enforcement** is done server-side — never trust client-side plan checks
- **Pricing in INR** — Pro plan ₹299/month, Annual ₹2,499/year (save 30%)
- **Platform-specific paywall** — iOS shows "Restore purchases" link, Android does not

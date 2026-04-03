# StudyForge — Product Specification Document

**Version:** 1.0  
**Date:** April 2026  
**Brand:** StudyForge (Hexagon monogram, violet/purple)  
**Tagline:** AI-powered learning engine  
**Platforms:** iOS (React Native), Android (React Native), Web (React)

---

## 1. Product Overview

### Mission
Help users prepare for work, exams, and self-improvement by transforming any learning material — or just a topic name — into structured chapters, AI summaries, and adaptive quizzes.

### Core Value Proposition
- Upload **any material** (PDF, PPTX, DOC, video, audio, image, URL, voice) and get instant AI-structured chapters + quizzes
- **Topic mode**: skip uploads — just type a topic and generate summaries + quizzes from LLM
- **Semantic caching**: vector embeddings store generated results; same topic = instant load for future users
- **Gamified progress**: XP, streaks, badges, leaderboard to maintain motivation
- **Ask AI**: query your own material like a chatbot with source citations

---

## 2. Design System

### Logo
- **Mark:** Hexagon monogram "SF"
- **Wordmark:** Syne 800, "Study" white + "Forge" violet (#7C6FF7)
- **App icon:** Hexagon on dark background

### Color Tokens
| Token | Value | Usage |
|---|---|---|
| Primary | `#7C6FF7` | CTAs, active states, brand accent |
| Primary dark | `#5B4FD4` | Pressed state |
| Primary light | `#A78BFA` | Text on dark bg |
| Accent orange | `#E85D2F` | Warnings, "Pro" difficulty |
| Accent amber | `#F4A227` | Streaks, in-progress |
| Success | `#10B981` | Correct answers, completed |
| Danger | `#EF4444` | Wrong answers, errors |
| Dark bg 1 | `#0A0A14` | Page background |
| Dark bg 2 | `#0D0D18` | Screen background |
| Dark bg 3 | `#111120` | Topbar / elevated |
| Dark surface | `rgba(255,255,255,0.04)` | Cards |
| Dark border | `rgba(255,255,255,0.07)` | Card borders |

### Typography
| Role | Font | Weight | Size |
|---|---|---|---|
| Display / Logo | Syne | 800 | 22–32px |
| Heading | Syne | 700 | 14–18px |
| UI Labels | Outfit | 600 | 9–13px |
| Body / Meta | DM Sans | 400/500 | 8–12px |

### Spacing
- Base unit: 4px
- Card padding: 10–14px
- Screen padding: 14px horizontal
- Section gap: 8–12px

### Border Radius
- Cards: 9–10px
- Buttons: 8–10px
- Chips/badges: 4–6px
- Avatar: 50%

---

## 3. Navigation Architecture

### Mobile (5-tab bottom nav)
```
Home | Library | [+ Upload FAB] | Quiz | Profile
```

### Web (Left sidebar)
```
Dashboard | My Library | Upload | Quizzes | Explore | Analytics | Settings
```

### Admin (Left sidebar)
```
Dashboard | Users | Materials | Quizzes | AI Models | Storage | Billing | Alerts | Settings | API Keys
```

---

## 4. Screen Inventory

### 4.1 Onboarding Flow

#### S01 — Splash Screen
**Route:** App launch  
**Description:** Full-screen dark brand screen shown on cold start while app initializes.  
**Features:**
- Hexagon SF logo mark (animated scale-in)
- "StudyForge" wordmark with violet accent
- "AI Learning Engine" tagline
- Linear progress loader bar
- Auto-advances to Onboarding (first install) or Home (returning user)

**Design notes:** Background `#0D0D18`, loader bar accent `#7C6FF7`

---

#### S02 — Onboarding Carousel (3 slides)
**Route:** `/onboarding`  
**Description:** 3-screen intro shown once on first install.  
**Features:**
- Skip button top-right
- Illustration area (animated SVG per slide)
- Dot pagination indicator (active dot = pill)
- Headline + supporting description
- "Get Started →" CTA on last slide
- Slide 1: "Upload any material" — PDF/video/voice/URL icons
- Slide 2: "AI breaks it into chapters" — chapter list animation
- Slide 3: "Quiz yourself & level up" — quiz card + XP animation

---

#### S03 — Sign In
**Route:** `/auth/signin`  
**Description:** Returning user authentication screen.  
**Features:**
- Logo lockup top-center
- Email + password fields
- "Forgot password?" link
- Primary "Sign In" CTA button
- "Continue with Google" OAuth button
- Divider with "or continue with"
- "Don't have an account? Sign Up" link

---

#### S04 — Sign Up
**Route:** `/auth/signup`  
**Description:** New user registration.  
**Features:**
- Name, email, password, confirm password fields
- Password strength indicator
- Terms & Privacy consent checkbox
- "Create Account" CTA
- "Continue with Google" OAuth
- "Already have an account? Sign In" link

---

#### S05 — Forgot Password
**Route:** `/auth/forgot`  
**Description:** Password reset via email.  
**Features:**
- Email input field
- "Send reset link" CTA
- Success state: email sent confirmation
- Back to Sign In link

---

### 4.2 Core App — Home

#### S06 — Home Dashboard
**Route:** `/home`  
**Tab:** Home (active)  
**Description:** Main landing screen after login. Personalized overview of progress and quick actions.  
**Features:**
- Greeting with user name + emoji
- User avatar (top-right, taps to Profile)
- **Streak card:** day count, fire emoji, motivational sub-label
- **Quick upload row:** PDF / Video / Voice / URL type shortcuts → jumps to Upload with pre-selected type
- **"Continue learning" section:** material cards with type icon, title, chapter count, progress %, progress bar
- **Upcoming quiz reminder card** (if scheduled)
- Notification bell icon (badge if unread)
- Bottom nav

**State variations:**
- Empty state: "Upload your first material" CTA card
- New user: onboarding checklist card

---

### 4.3 Upload & Processing

#### S07 — Upload Screen
**Route:** `/upload`  
**Tab:** Center FAB (+ button)  
**Description:** Entry point for all material ingestion. Two modes: file upload and topic text.  
**Features:**
- **Mode toggle:** "From material" / "Topic mode"
- **Drop zone:** dashed border, cloud icon, "Drop files here or tap to browse"
- **Accepted types chips:** PDF, PPTX, DOC, MP4, MP3, CSV, Image, URL
- **URL input field** (shown when URL chip tapped)
- **Voice record button** (record in-app)
- Recent uploads mini-list at bottom
- Processing animation on upload start

---

#### S08 — Processing / Analysis Screen
**Route:** `/upload/processing`  
**Description:** Shown while AI analyzes uploaded material. Non-blocking — user can navigate away.  
**Features:**
- File name + type icon
- Animated progress stages: "Extracting text" → "Chunking" → "Analyzing" → "Generating chapters" → "Building quizzes"
- Estimated time remaining
- "Notify me when done" toggle
- Cancel button

---

### 4.4 Material Detail & Reading

#### S09 — Material Detail
**Route:** `/material/:id`  
**Description:** Hub screen for a processed material. 4 sub-tabs.  
**Features:**
- Back button, material title, file type + page count + upload date
- **Metadata chips:** chapter count, completion %, quiz count
- **4 tabs:**
  - **Chapters:** list of chapters with title, 1-line intro, completion state (✓/in-progress/locked), progress bar per chapter
  - **Summary:** full AI-generated material summary with key takeaways
  - **Quiz:** launch quiz scoped to this material (opens Quiz Setup)
  - **Ask AI:** opens AI chat scoped to this material

**Chapter card states:**
- Completed: green check, full progress bar
- In progress: partial bar, "In progress" label
- Not started: empty bar, dimmed
- Locked (Free tier): lock icon

---

#### S10 — Chapter Reader
**Route:** `/material/:id/chapter/:chapterId`  
**Description:** Deep-read view for a single chapter.  
**Features:**
- Chapter X of Y header + title
- Progress bar for this chapter
- Bookmark icon
- **AI Summary card** (purple accent box): concise LLM summary of chapter
- **Key concepts list:** bullet points with color-coded importance (purple = primary, orange = secondary)
- **Chapter quiz CTA banner** (amber): "N quiz questions for this chapter → Start"
- **Ask AI floating input bar** at bottom: "Ask anything about this chapter..."
- Prev / Next chapter navigation

---

#### S11 — Ask AI (Material Chat)
**Route:** `/material/:id/ask`  
**Description:** Conversational AI interface scoped to the uploaded material.  
**Features:**
- Material name shown as context header
- Chat bubbles: user (right, violet), AI (left, dark surface)
- AI responses include **source citations** (chapter + page reference)
- **Suggested follow-up questions** chips after each AI reply
- Input bar with send button
- Typing indicator
- "Clear chat" option

---

### 4.5 Quiz Flow

#### S12 — Quiz Setup
**Route:** `/quiz/setup`  
**Tab:** Quiz  
**Description:** Configure quiz parameters before generation.  
**Features:**
- **Source toggle:** "From material" / "Topic mode"
- **Material picker** dropdown (when "From material" selected)
- **Chapter scope:** All chapters / specific range / custom selection
- **Difficulty selector:** Basic / Medium / Advanced / Pro (4 buttons, Pro = orange accent)
- **Question count slider:** 5–20, default 10
- **Question type toggles:** MCQ (multi-select), True/False, Fill-in-the-blank
- "Generate Quiz →" primary CTA

---

#### S13 — Topic Mode (Quiz from Text)
**Route:** `/quiz/topic`  
**Description:** Generate summary + quiz from just a topic name — no material needed.  
**Features:**
- Mode toggle showing "Topic mode" active
- **Topic text input** with placeholder examples
- **Popular topics chips** (quick-fill suggestions)
- **Output depth selector:**
  - Summary + Quiz (short overview)
  - Chapters + Quiz (full breakdown) — radio buttons
- **Settings row:** Questions count | Difficulty level | Language
- "Generate → (uses AI cache)" CTA
- Cache hint: "Cached results load instantly if topic exists"
- Semantic search: checks vector DB before calling LLM

---

#### S14 — Quiz Active
**Route:** `/quiz/:quizId/play`  
**Description:** Live quiz-taking experience.  
**Features:**
- Material/topic name breadcrumb
- Difficulty badge (Basic/Medium/Advanced/Pro)
- Question counter (X / total)
- Progress bar
- Question text
- **Answer options** (MCQ: A/B/C/D lettered options)
- On selection: immediate feedback — correct (green border) / wrong (red border)
- **Explanation card** slides up on answer (correct answer + why)
- Next question button
- Timer (optional, based on settings)
- Exit quiz confirmation dialog

---

#### S15 — Quiz Results
**Route:** `/quiz/:quizId/results`  
**Description:** Post-quiz summary with performance breakdown.  
**Features:**
- **Score ring** (circular progress, % accuracy)
- "Quiz complete!" heading
- Material + difficulty + question count sub-label
- **XP earned badge** (purple card, streak bonus note)
- **Stats row:** Correct / Wrong / Time spent
- **"Review these topics" panel:** list of wrongly answered topic areas with red dot indicators
- **Action buttons:** "Review answers" (ghost) / "Retry quiz" (primary)
- Share score option

---

### 4.6 Discovery & Social

#### S16 — Library
**Route:** `/library`  
**Tab:** Library  
**Description:** All user-uploaded materials in one searchable, filterable list.  
**Features:**
- "My Library" title + "+ Add" button
- **Search bar:** full-text search across material titles
- **Filter chips:** All / PDF / PPTX / Video / Audio / URL / Quiz only
- **Material list cards:** type icon (color-coded), title, file type + chapter count + completion %, progress bar, arrow chevron
- **Processing state:** spinning loader indicator on cards still being analyzed
- Tap → Material Detail
- Long press → context menu (rename, delete, share)
- Empty state with upload CTA

---

#### S17 — Explore
**Route:** `/explore`  
**Tab:** center (if web) / via Home card (mobile)  
**Description:** Browse pre-built topic libraries curated by StudyForge.  
**Features:**
- "Explore" title + description
- **Search bar:** search across all pre-built topics
- **Category filter chips:** All / Dev / Science / Business / Language / Medical / Finance
- **Trending section:** 2×2 grid of topic cards (icon, title, topic count, quiz count) — color-coded by domain
- **New this week section:** list of recently added topic libraries
- Tap topic card → Topic Detail (summary + pre-built quiz)
- "Save to Library" button on topic cards

---

#### S18 — Leaderboard
**Route:** `/leaderboard`  
**Description:** Gamified rankings to drive motivation.  
**Features:**
- **Scope tabs:** Global / Friends / Topic-specific
- **Time filter:** This week / This month / All time
- **Podium (top 3):** avatar, rank number, XP, medal color (gold/silver/bronze)
- **Ranked list:** rank number, avatar initials, name, XP score
- **"You" row:** highlighted in violet, always visible even if outside top 10
- Friend invite CTA (if Friends tab is empty)

---

### 4.7 Profile & Account

#### S19 — Profile
**Route:** `/profile`  
**Tab:** Profile  
**Description:** User identity, stats, gamification progress, and achievements.  
**Features:**
- **Dark header block:** avatar (initials circle), display name, email
- **Stats row:** Quizzes taken / Day streak / XP earned / Badges count
- **XP level bar:** "Level N — Title" label, gradient fill bar, XP fraction
- **Badges section:** horizontal scroll of earned badge chips (icon + label)
- **Recent topics list:** title + completion % per topic
- **Settings shortcut** (gear icon top-right)
- **Leaderboard rank chip** (quick view)
- Edit profile button

---

#### S20 — Notifications
**Route:** `/notifications`  
**Description:** All app notifications in a unified feed.  
**Features:**
- "Mark all read" action top-right
- **Unread notifications:** colored accent border (purple = quiz ready, amber = streak alert)
- **Notification types:** Quiz ready, Streak at risk, Material analyzed, Level up, Badge earned, Friend activity
- Each item: icon, title, description, relative timestamp
- Unread indicator dot
- Tap → deep link to relevant screen
- **Earlier section:** read notifications (dimmed)
- Pull to refresh

---

#### S21 — Settings
**Route:** `/settings`  
**Description:** App preferences, account management, storage.  
**Features:**
- **Account card:** avatar, name, email, plan badge (Free/Pro)
- **Preferences section:**
  - Dark mode toggle
  - Push notifications toggle
  - Streak reminders toggle
  - Default quiz difficulty (tappable → picker)
  - Language preference
- **Storage bar:** used / total with "Manage" link
- **List items:** Privacy & Data, Help & Support, About StudyForge, Rate the app
- **Sign Out** (red, bottom)
- **Delete account** (hidden in Privacy & Data)

---

#### S22 — Paywall / Plans
**Route:** `/plans`  
**Description:** Subscription upgrade screen.  
**Features:**
- Logo + "Upgrade to Pro" pill badge
- Headline + "Cancel anytime" sub-label
- **Free plan card:** limits listed (5 materials/month, Basic/Medium only, no Ask AI)
- **Pro plan card:** highlighted with violet border + "Most popular" badge, full feature list, ₹299/month
- **Annual plan** (optional, shown as toggle): ₹2,499/year (save 30%)
- "Start 7-day free trial" primary CTA
- Fine print: "Then ₹299/month. Cancel anytime."
- Restore purchases link (iOS)

---

### 4.8 Web-Only Screens

#### W01 — Web Dashboard (Light + Dark)
**Route:** `app.studyforge.ai/dashboard`  
**Description:** Full-featured web home with analytics overview.  
**Features:**
- Left sidebar: logo, nav links, user avatar bottom
- Top bar: search, streak badge, user avatar
- Greeting headline
- **KPI cards (4):** Materials uploaded / Quizzes taken / Accuracy % / XP earned
- **Recent materials table:** type icon, name, status badge, progress
- **Quiz accuracy chart:** 7-day bar chart
- Light mode + dark mode

---

#### W02 — Admin Panel
**Route:** `admin.studyforge.ai`  
**Description:** Internal dashboard for platform management.  
**Features:**
- Sidebar: Dashboard, Users, Materials, Quizzes, AI Models, Storage, Billing, Alerts, Settings, API Keys
- **KPI row (5):** Total users, Active today, Materials processed, LLM API calls, Avg accuracy
- **Users table:** name, email, plan, material count, status (Active/Trial/Inactive) with filter + export
- **LLM model usage bars:** Gemini / Local LLM / Fallback split
- **Material type bars:** PDF / Video / Other distribution
- **Alerts panel:** system health, API quota warnings

---

## 5. Feature Matrix by Plan

| Feature | Free | Pro |
|---|---|---|
| Materials/month | 5 | Unlimited |
| File types | PDF, URL | All types |
| Max file size | 10 MB | 500 MB |
| Quiz difficulty | Basic, Medium | Basic, Medium, Advanced, Pro |
| Ask AI | — | ✓ (per chapter) |
| Topic mode | 3/month | Unlimited |
| Storage | 500 MB | 5 GB |
| Pre-built libraries | ✓ (limited) | ✓ (all) |
| Leaderboard | ✓ | ✓ |
| Priority processing | — | ✓ |

---

## 6. AI & Backend Architecture Notes

### Material Processing Pipeline
1. Upload → file validation + type detection
2. Text extraction (PDF parser / Whisper for audio / YouTube transcript for video)
3. Chunking (semantic paragraph-level)
4. LLM analysis → chapter titles, summaries, key concepts
5. Quiz generation per chapter (per difficulty)
6. Vector embedding of chunks → stored in vector DB
7. Cache check before any new generation (semantic similarity threshold)

### Models
- **Primary:** Gemini (cloud, for complex analysis)
- **Secondary:** Local LLM (on-device / self-hosted, for quiz generation + simple Q&A)
- **Embeddings:** text-embedding model for semantic search + cache lookup
- **Fallback:** escalate local → Gemini on failure

### Caching Strategy
- Topic mode results keyed by embedding similarity (threshold: 0.92 cosine similarity)
- If match found → return cached chapters + quizzes instantly
- Cache TTL: 30 days, refreshed on access

---

## 7. Screen Flow Diagram

```
Splash (S01)
  └── First install → Onboarding (S02)
  └── Returning user → Home (S06)

Onboarding (S02) → Sign Up (S04) / Sign In (S03)
Sign In (S03) → Forgot Password (S05) → Sign In
Sign Up / Sign In → Home (S06)

Home (S06)
  ├── Upload shortcut → Upload (S07) → Processing (S08) → Material Detail (S09)
  ├── Continue card → Material Detail (S09)
  │     ├── Chapter → Chapter Reader (S10)
  │     │     └── Ask AI input → Ask AI (S11)
  │     ├── Summary tab
  │     ├── Quiz tab → Quiz Setup (S12) → Quiz Active (S14) → Results (S15)
  │     └── Ask AI tab → Ask AI (S11)
  └── Notification bell → Notifications (S20)

Library (S16) → Material Detail (S09)

Explore (S17) → Topic Detail → Topic Mode (S13) → Quiz Active (S14) → Results (S15)

Quiz tab (S12)
  ├── From material → Quiz Setup (S12)
  └── Topic mode → Topic Mode (S13)

Profile (S19)
  ├── Settings → Settings (S21)
  │     └── Upgrade CTA → Paywall (S22)
  └── Leaderboard shortcut → Leaderboard (S18)
```

---

## 8. Tech Stack

| Layer | Technology |
|---|---|
| Mobile | React Native (Expo or CLI) |
| Web | React + Vite |
| State | Zustand / Redux Toolkit |
| Navigation | React Navigation v6 (mobile) / React Router v6 (web) |
| UI | Custom design system (no component library) |
| Backend | TBD (Node.js/FastAPI recommended) |
| Database | TBD (PostgreSQL + pgvector recommended) |
| File storage | TBD (S3-compatible) |
| AI — Cloud | Gemini API |
| AI — Local | Ollama / LLaMA / Mistral |
| Auth | Supabase Auth / Firebase Auth |
| Analytics | Mixpanel / PostHog |

---

## 9. Glossary

| Term | Definition |
|---|---|
| Material | Any uploaded file or URL processed by the AI |
| Chapter | AI-generated section of a processed material |
| Topic Mode | Generate content from just a topic string, no file upload |
| XP | Experience points earned by completing quizzes and chapters |
| Streak | Consecutive days of study activity |
| Semantic cache | Vector DB lookup to reuse previously generated content |
| Pro difficulty | Hardest quiz tier, requires Pro subscription |
| Ask AI | Chat interface scoped to a specific material |

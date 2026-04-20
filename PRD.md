# ModelRadar.dev — Product Requirements Document

> Reference document for the ModelRadar project. Summarizes the vision, product strategy, technical architecture, business model, and launch plan.

*Last updated: April 2026*

---

## 1. Vision & Positioning

### The problem

Developers who code with AI face a fragmented and constantly shifting ecosystem: new models every two weeks, free tiers that appear and disappear, changing rate limits, dozens of competing providers, and no reliable centralized source to navigate it all. Existing solutions are either soulless catch-all directories (Toolify, AITopTools — 10k+ tools, zero curation), static GitHub awesome lists that go stale fast, or raw databases (models.dev) with no UX or intelligence.

### The solution

**ModelRadar** is a developer-first product that combines:

- A **web dashboard** (modelradar.dev) to discover, compare, and monitor the AI model ecosystem — a powerful SEO machine and community hub
- An **intelligent proxy** (npm package) that routes LLM requests to the best available sources with automatic fallback
- A **community** of developers who vote, compare, and share their AI stacks

### Tagline

> "Your AI coding radar — route, compare, discover."

### Market positioning

ModelRadar sits between LiteLLM (multi-LLM proxy but no free-tier routing intelligence), OpenRouter (paid intermediary), and models.dev (raw database). No existing product combines intelligent routing optimized for free tiers + discovery/comparison dashboard + developer community + programmatic SEO machine.

**Scope separation**: ModelRadar focuses exclusively on **AI models and sources/endpoints** (free, paid, local). MCP servers, CLI tools, and agents are reserved for AgentRadar (future terminal product). This separation enables clear focus, targeted SEO, and a readable brand.

---

## 2. Products & Ecosystem

### 2.1 `free-coding-models` (npm — existing, strong traction)

- **Role**: Open-source lead product, top of funnel
- **Content**: Curated list of 158+ free models, 20+ providers
- **GitHub**: vava-nessa/free-coding-models
- **Current traction (March 2026)**:
  - **650+ GitHub stars** in 2 weeks
  - **700 daily active users** and growing
  - **13,000+ npm downloads**
  - Organic growth via Reddit, dev word-of-mouth, npm discovery
  - Upward curve — the project is only 2 weeks old and numbers are accelerating
- **Maintenance**: AI-automated via CRON, zero human operational overhead
- **Strategic context**: This explosive traction validates market demand for curated free AI sources. ModelRadar is built to capitalize on this captive audience and established credibility. Every free-coding-models user is a natural prospect for ModelRadar.
- **Evolution**: Stays maintained and up-to-date, with a banner/link promoting ModelRadar ("Want smart routing & fallback? Try ModelRadar")
- **Audience**: Devs discovering free options for coding with AI

### 2.2 `modelradar` (npm — to be built)

- **Role**: Core product, the local intelligent proxy
- **How it works**:
  - Install via `npm install -g modelradar` or `npx modelradar`
  - Login with a ModelRadar account
  - Exposes a local OpenAI-compatible endpoint (e.g. `localhost:4141`)
  - Any tool (Cursor, Copilot, Claude Code, Aider, Cline, etc.) plugs right into it
  - Smart routing: free tiers first → fallback to paid providers when exhausted
  - Automatic rotation if a provider is down or rate-limited
  - Fallback queue configuration via the web dashboard or locally
  - Built-in CLI dashboard (like free-coding-models but richer)
- **Launch strategy**: Start *extremely minimal* — round-robin across 3-4 providers max, zero advanced features. Prioritize absolute reliability before adding any complexity. A proxy that crashes in prod = immediate and irreversible loss of trust.
- **Data powered by**: the free-coding-models base + community data + near-real-time provider monitoring (via automatic CRON polling + anonymized proxy error reporting)

### 2.3 `modelradar.dev` (web — in progress)

- **Role**: Central hub, product interface + **programmatic SEO machine** (top priority) + community
- **Main sections**:

#### 🔍 Interactive Model Comparator (flagship feature)

- Side-by-side selection of 2-3 models
- Data shown: price (or free), context window, speed, provider, strengths/weaknesses for coding
- Community ratings by use case (code gen, debug, refactor, review)
- Shareable and indexable URLs: `/compare/claude-sonnet-4-vs-gpt-4o`
- Highly shareable (Twitter, YouTube)
- **SEO**: every comparison pair = one indexed page, powerful long-tail

#### 📡 Free Tier Tracker (near-real-time dashboard)

- Powered directly by free-coding-models, auto-updated by CRON + AI
- Near-real-time status of every free source (online, rate-limited, degraded, down) via polling every 5-15 min
- Enriched by anonymized proxy error reports from users (passive crowdsourcing)
- Current limits for each provider
- Email/webhook alerts when a free tier changes (paid plan)

#### 🧭 "What should I use?" (interactive recommender)

- 3-click flow: use case → budget → environment
- Personalized recommendation with alternatives
- Natural entry point toward the ModelRadar proxy and, later, AgentRadar

#### 🧱 Stack Builder (the "PCPartPicker for AI dev")

- Build your model stack: primary LLM + fallback model + budget model + local model
- Shows estimated total cost, context windows, provider compatibility
- Community popular stacks
- Native social sharing + permalink URL

#### 📰 LLM Changelog (change feed — high-value feature)

- Dedicated page for pricing changes, context window updates, deprecated models, new free tiers, new providers
- Chronological format, scannable, filterable by provider/change type
- Native **RSS feed** to subscribe
- **Webhooks** (paid plan) to notify internal tools or scripts
- Content auto-generated/enriched by CRON + AI from official sources
- Every RSS subscriber = a passive ambassador who shares the link
- **SEO**: frequent updates = strong signal for Google

#### 📣 Drops (news feed)

- New models, new providers, notable changes
- Short, scannable format
- Community upvotes
- Pre-packaged content for the YouTube channel ("This week's drops")

#### 🖥️ User Dashboard (logged-in account)

- Routing stack configuration (API keys, providers, priorities, fallback queues)
- Real-time monitoring: consumption, rate limits, provider status
- Detailed consumption analytics (paid plan)
- Proxy status page (uptime, latency, errors) — publicly visible to build trust

### 2.4 AgentRadar (terminal app — future)

- **Role**: Premium product, agent-first multipanel terminal (tmux-style) with native ModelRadar routing, built-in AI sources and CLI tools
- **Timing**: Phase 5, once the ModelRadar community is established
- **Stack**: Tauri + Rust + React
- **ModelRadar integration**: routing built in natively, no separate proxy needed
- **Domain**: agentradar.dev (secure immediately)

### 2.5 "Radar" umbrella brand

The products form a coherent brand family:

- **ModelRadar** → AI models, sources, routing, comparator
- **AgentRadar** → the terminal, agents, MCP, CLI tools

This naming is immediately readable: a ModelRadar user instantly understands what AgentRadar is without any explanation, and vice versa. The "Radar" brand can extend to other future products as needed.

---

## 3. Acquisition Funnel

> **Context**: free-coding-models reached 650+ GitHub stars, 700 DAU, and 13k+ npm downloads in just 2 weeks, with an upward curve. This funnel is designed to convert this existing and growing audience into ModelRadar users, then into recurring revenue.

```
free-coding-models (free npm, open source, 700 DAU, 13k downloads)
  ↓ "There's something better — try ModelRadar"

modelradar.dev (free site, programmatic SEO, comparator, LLM Changelog, community)
  ↓ Account creation, stack configuration

npm modelradar (local proxy, CLI dashboard, 14-day free trial)
  ↓ Free → paid conversion at trial end

ModelRadar paid plans (advanced routing, AI assistant, analytics, webhooks)
  ↓ Community content, stack sharing, Changelog RSS

YouTube channel (tutorials, comparisons, weekly drops)
  ↓ Awareness, credibility, loyal audience

AgentRadar (premium terminal, launching with an established user base)
```

### SEO as the primary growth engine

Programmatic SEO is **the top growth lever** for modelradar.dev, superior to any paid acquisition in the short term. The goal is to capture long-tail traffic on high-intent developer searches:

- **Pair comparisons**: `claude sonnet 4 vs gpt-4o`, `gemini flash vs mistral`, etc. → 1 indexed URL per pair
- **By use case**: `best free model for code review 2026`, `best llm for debugging`
- **By provider**: `anthropic free tier limits`, `groq rate limits 2026`
- **By price**: `free llm api for developers`, `openai alternative free`
- **LLM Changelog**: fresh, frequent content = strong SEO signal

These pages already exist latently in the data (models.ts, providers.ts). They just need to be routed and made indexable.

---

## 4. Business Model

### Free tier (always free)

- Full access to comparator, recommender, LLM Changelog (RSS included)
- Basic Free Tier Tracker
- Stack Builder (read-only)
- Routing on free sources only (via proxy)
- 1 simple fallback queue

> The free tier must be genuinely useful — it's what drives SEO, word-of-mouth, and trust.

### Pro Trial — 14 days free (no credit card)

- Full access to all paid features
- Goal: let the user integrate the proxy into their workflow before asking for money
- After 14 days: auto-convert or downgrade to free

### Pro Plan — $9/month

- Full routing (free + paid, multi-level configurable)
- Free tier change alerts (email + webhook)
- Stack builder (create + share + permalink)
- Detailed consumption analytics
- LLM Changelog webhooks
- Custom status page
- **Cost per user**: ~$0.15 (infra + CRON) → **~98% margin**

> Pricing note: $3/month signals "unsafe product" to a developer. $9 is the psychological "I don't care" threshold — low enough to decide without overthinking, high enough to signal real value. No intermediate plan to avoid the paradox of choice.

### Power Plan — $19/month

- Everything in Pro
- Integrated AI assistant (powered by the best available model via OpenRouter)
  - ~1M tokens/month included
  - Can search the web, advise, configure stacks, analyze consumption
- Advanced analytics with export
- Priority support (< 24h response)
- **Cost per user**: ~$1.50 (tokens + infra) → **~92% margin**

### Future option: usage-based

- Additional tokens for the assistant: $2 / 500k extra tokens
- Lets power users consume more without raising the base price

### Projections

| Scenario | Timeline | Free users | Pro ($9) | Power ($19) | MRR |
|---|---|---|---|---|---|
| Conservative | 6 months | 500 | 40 | 10 | ~$550 |
| Solid | 12 months | 3,000 | 250 | 80 | ~$3,770 |
| Ambitious | 18-24 months | 15,000 | 1,000 | 300 | ~$14,700 |

Conversion benchmark: 5% free → paid (standard SaaS dev tools)

---

## 5. Technical Stack

### Website (modelradar.dev) — current stack

- **Framework**: React 19 + Vite 6
- **Routing**: TanStack React Router v1 (file-based)
- **Data Fetching**: TanStack React Query v5
- **Table**: TanStack React Table v8
- **Styling**: Tailwind CSS v4 (CSS variables theming)
- **Animations**: Framer Motion (glitch effects, transitions, radar, scan)
- **Auth**: Supabase Auth (Google / GitHub / Apple)
- **Database**: Supabase (accounts, stacks, votes, analytics)
- **Hosting**: Vercel (Nitro preset)
- **Linting / Formatting**: Biome
- **Language**: TypeScript strict
- **Model/provider data**: TypeScript files in `src/data/`, synced from free-coding-models, enriched by the community

### Site architecture

```
src/
├── data/               # Data layer — models, providers, families
│   ├── schema/         # TypeScript interfaces (do not modify without reason)
│   ├── models/         # 1 file per model, 1 folder per creator
│   ├── providers/      # 1 file per provider
│   ├── families/       # Model families
│   └── index.ts        # Helpers (getModelById, getOffersForModel, etc.)
├── components/         # Reusable UI components
│   ├── table/          # Virtualized DataTable, sticky columns, drag-to-reorder
│   ├── model/          # modelColumns, ModelRow
│   └── ...
├── lib/                # Utility hooks (auth, favorites, formatting)
├── routes/             # TanStack Router file-based routes
│   ├── index.tsx                       # Landing + hero
│   ├── compare.$modelA.$modelB.tsx     # Comparator — SEO-indexed URLs
│   ├── models.tsx                      # Filtered list + free tier tracker
│   ├── models.$slug.tsx                # Individual model page (SEO)
│   ├── providers.tsx                   # Provider list
│   ├── providers.$slug.tsx             # Individual provider page (SEO)
│   ├── recommend.tsx                   # "What should I use?" recommender
│   ├── stacks.tsx                      # Stack Builder
│   ├── changelog.tsx                   # LLM Changelog + RSS
│   ├── drops.tsx                       # News feed
│   └── dashboard.tsx                   # User account, routing config
└── styles/             # Tailwind + CSS custom properties
```

### npm modelradar (proxy)

- **Runtime**: Node.js
- **Proxy**: local OpenAI-compatible endpoint (`localhost:4141` by default)
- **Config**: synced with the modelradar.dev account
- **Phase 1**: minimal routing — round-robin across 3-4 providers, basic fallback, zero advanced features. Reliability before features.
- **Phase 2**: rate limit detection, automatic rotation, multi-level configurable fallback queues
- **CLI**: enhanced TUI dashboard (like free-coding-models)
- **Status reporting**: anonymized error reporting back to ModelRadar (opt-in) to enrich the Free Tier Tracker

### Infrastructure & Services

**Domains**
- `modelradar.dev` (existing or to purchase)
- `agentradar.dev` (secure immediately, even if unused for 12+ months)
- DNS on Cloudflare

**Email**
- `contact@modelradar.dev` via Zoho Mail (free plan: 5 GB, 5 users, 1 domain)
- Alternative: Cloudflare Email Routing + Gmail "Send mail as"
- Zoho preferred for an independent mailbox that can be transferred in case of sale

**Auth OAuth**
- Supabase Auth (Google, GitHub, Apple)
- Consent screen shows the app name and verified domain

**CRON & Automation**
- Provider polling / Free Tier Tracker: every 5-15 min (GitHub Actions or Vercel CRON)
- Model data updates: daily CRON + AI to detect changes
- LLM Changelog generation: CRON + AI enriching detected changes

---

## 6. Design & Visual Identity

### Art direction

Inspired by the **"graphic retro futurism"** aesthetic of Marathon (Bungie): a fusion of retro roots, modern technology, and strong graphic design. References: Marathon UI, Wipeout, Ghost in the Shell, cyberpunk interfaces.

### Design principles

- **Dark background**: deep black (#0a0a0a) or very dark grey
- **Neon accents**: electric cyan (#00f0ff) + subtle magenta as secondary
- **Strong typography**: 2 fonts max
  - Display/headings: condensed mono (Space Grotesk, JetBrains Mono, or custom)
  - Body: highly readable font (Inter, System UI)
- **Decorative effects**: digital dithering, subtle glitch on hover states, transitions, backgrounds — NEVER on content
- **Model/tool cards**: military tech spec sheet / terminal style
  - Thin borders
  - Colored status dots (green = free, orange = paid, blue = local)
  - Monospace tags, compact data
- **Animations**: fast and crisp (scan line, micro-glitch on hover, incremental counters)
- **Header**: radar/scan pattern in the background, subtle perspective grid

### The golden design rule

The Marathon game was criticized for usability issues (too many fonts, unclear hierarchy). On an information site, **readability always comes first**. The visual "wow" must never sacrifice legibility. Graphic effects are decorative; content stays crystal clear.

### Mockup generation prompts

**Directed prompt:**

```
UI/UX web design mockup for "ModelRadar" — a futuristic developer tools discovery
platform and AI models directory website. Dark mode interface on deep black/charcoal
background. Neon accent colors: electric cyan and subtle magenta highlights. Design
inspired by Bungie's Marathon game UI aesthetic ("graphic retro futurism"): digital
dithering textures, subtle glitch effects on decorative elements, strong typographic
hierarchy using condensed monospace fonts for headers.

The layout features: a bold hero section with an animated radar/scan motif in the
background, a search bar with terminal-style input, and below it a grid of model/tool
cards designed like military tech spec sheets — thin borders, small colored status dots
(green for free, orange for paid, blue for local), monospace tags, and compact data
readouts showing context window size, pricing, provider logos.

Navigation is minimal and sleek, top bar with logo on the left and sparse menu items.
The overall feel should be: a premium hacker dashboard meets editorial design magazine.
High contrast, information-dense but not cluttered. Desktop viewport, full page visible.
Photorealistic UI render, Dribbble/Behance quality.
```

**Exploratory prompt:**

```
Web design concept for "ModelRadar.dev" — a next-generation AI tools and models
discovery hub for developers. The site should feel like stepping into a sci-fi command
center: dark, atmospheric, futuristic, with a strong visual identity that makes it
instantly memorable and unlike any typical SaaS directory.

Take inspiration from cyberpunk interfaces, extraction shooter game UIs, retro-futurism,
terminal aesthetics, and high-end editorial design. Surprise me with the color palette,
layout choices, and visual language — but keep it functional as an information-rich
website with cards, filters, and data.

The audience is developers who code with AI daily. The vibe should make them think:
"this site is built by someone who gets it." Desktop mockup, full page, high fidelity
UI render.
```

---

## 7. Competitive Landscape

| Product | Type | Weakness vs ModelRadar |
|---|---|---|
| Toolify, AITopTools, OpenTools | Mass consumer directories | Zero dev curation, no real product, SEO spam |
| awesome-ai-tools (GitHub) | Static Markdown lists | No UX, not interactive, goes stale fast |
| models.dev (SST) | Model database + API | Raw data, no routing, no community |
| LiteLLM | Multi-LLM proxy | Manual config, no free-tier intelligence |
| OpenRouter | Paid LLM intermediary | Paid, no free tier focus, no dev dashboard |
| Artificial Analysis | LLM benchmarks | Technical and abstract, not decision-oriented for devs |

**ModelRadar competitive advantage**: the only product combining proven, reliable data (free-coding-models: 650+ stars, 700 DAU, 13k downloads in 2 weeks) + intelligent routing (npm proxy) + modern UX (Marathon design) + programmatic SEO machine + LLM Changelog (RSS/webhooks) + community angle + specific dev coding focus. The organic traction of free-coding-models proves market demand and provides a user base ready to convert.

---

## 8. Launch Plan

### Phase 1 — SEO-first MVP (months 1-2)

**Goal**: lay the SEO foundations and launch the public site. SEO is lever #1 — every week without indexed pages is a week of lost organic growth.

- [ ] Purchase modelradar.dev domain + secure agentradar.dev
- [ ] Infra setup (Cloudflare DNS, Zoho Mail, Vercel)
- [ ] Landing page with "graphic retro futurism" design
- [ ] **Programmatic SEO**: individual model pages (`/models/[slug]`) — 1 page per model
- [ ] **Programmatic SEO**: pair comparison pages (`/compare/[modelA]-vs-[modelB]`)
- [ ] **Programmatic SEO**: provider pages (`/providers/[slug]`)
- [ ] Interactive comparator (frontend, static data)
- [ ] Free Tier Tracker (CRON polling + visual status)
- [ ] LLM Changelog with RSS feed (CRON + AI)
- [ ] Add ModelRadar promotion to free-coding-models npm

### Phase 2 — Proxy & Auth (months 2-4)

**Goal**: ship the proxy in its simplest, most reliable version, open accounts, integrate payments.

- [ ] Auth system (Google/GitHub/Apple via Supabase)
- [ ] npm modelradar v1: minimal local proxy (round-robin 3-4 providers, basic fallback)
  - Absolute priority: reliability and uptime. Zero advanced features until it's rock-solid.
- [ ] Proxy status page (public)
- [ ] Basic user dashboard (routing config, API keys)
- [ ] "What should I use?" interactive recommender
- [ ] Paid plans with 14-day trial (Stripe: $9 Pro, $19 Power)

### Phase 3 — Community & Proxy v2 (months 4-6)

- [ ] Stack Builder with social sharing + permalink
- [ ] Community model voting (ratings by use case)
- [ ] "Drops" feed with upvotes
- [ ] npm modelradar v2: rate limit detection, multi-level rotation, configurable queues
- [ ] Anonymized proxy error reporting → Free Tier Tracker enrichment
- [ ] Email/webhook alerts for free tier changes (Pro plan)
- [ ] LLM Changelog webhooks (Pro plan)
- [ ] AI assistant for Power plan (best available model via OpenRouter)
- [ ] Advanced consumption analytics

### Phase 4 — Growth (months 6-12)

- [ ] YouTube channel launch (comparisons, weekly drops, tutorials)
- [ ] Editorial content (guides, "my ideal stack for...") — long-tail SEO reach
- [ ] Public ModelRadar API (programmatic data access)
- [ ] Third-party integrations (Raycast, VS Code extension, etc.)
- [ ] Conversion and retention optimization (onboarding, lifecycle emails)

### Phase 5 — AgentRadar (months 12+)

- [ ] Launch AgentRadar (agent-first multipanel terminal) with native ModelRadar routing
- [ ] Positioning: "by the makers of ModelRadar"
- [ ] Established user base and community already acquired
- [ ] agentradar.dev domain already secured since Phase 1

---

## 9. Key Metrics to Track

### Acquisition
- npm installs (free-coding-models + modelradar)
- Unique site visitors, page views
- Organic SEO traffic (Search Console) — metrics by page type (compare, model, provider)
- LLM Changelog RSS subscribers
- Signups

### Activation
- Accounts created
- First stack configured
- First successful proxy call
- 14-day trial → paid plan conversion rate

### Proxy Reliability (critical product KPI)
- **Proxy uptime**: target >99.5%
- **Error rate per provider**: detection of degraded sources
- **Median latency** (P50, P95) per provider
- **Reported error count** (opt-in) — Free Tier Tracker enrichment

### Retention
- DAU/MAU dashboard
- Proxy usage frequency
- Return visits (Drops, Changelog)

### Revenue
- MRR
- Free → paid conversion (target 5%)
- ARPU (Average Revenue Per User)
- Monthly churn
- Estimated LTV

### Community
- Votes and ratings submitted
- Stacks shared
- Drops contributions
- GitHub stars (free-coding-models + modelradar repo)

---

*Document created March 2026 — Updated April 2026. Keep up to date as the project evolves.*
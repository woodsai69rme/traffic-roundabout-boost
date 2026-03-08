

# Roundabout WebTraffic - Complete Plan: Audit, Enhancements, Docs, Valuation & Recreation Prompt

## Current State Summary

**Working (✅):** Landing page, Dashboard (mock data), Analytics, Audience Insights, Content Planner, AI Content Creator, Platforms, Monetization, Communities, Profile, Login/Register, Auth, Documentation, Theme toggle, Responsive hooks

**Issues (⚠️/❌):**
- `App.tsx` still has duplicate `QueryClientProvider` + `AuthProvider` (already wrapped by `Providers.tsx` in `main.tsx`)
- Missing routes: `/profile`, `/login`, `/register`, `/communities`, `/monetization`, `/api-integrations`, `*` (404)
- Database has ZERO tables — all data is mock/in-memory
- No database persistence for posts, platforms, analytics, webhooks
- Index page links to `/login` and `/register` but those routes aren't in App.tsx
- 15 missing doc files in `/docs` directory

**Missing Docs:** 05, 07, 08, 09, 11, 12, 13, 14, 15, 25-30

---

## Phase 1: Critical Fixes (~2 credits)

1. **Fix App.tsx** — Remove duplicate `QueryClientProvider` + `AuthProvider` (Providers.tsx already wraps). Add all missing routes (`/profile`, `/login`, `/register`, `/communities`, `/monetization`, `/api-integrations`, `*` catch-all).

2. **Fix Providers.tsx** — Remove `"use client"` directive (not Next.js).

---

## Phase 2: Database Setup (~3 credits)

Create tables via migration:
- `profiles` (user_id, full_name, username, bio, avatar_url, website, location)
- `platform_connections` (user_id, platform, access_token, refresh_token, status, connected_at)
- `scheduled_posts` (user_id, content, platforms[], scheduled_for, status, media_urls[])
- `webhooks` (user_id, name, url, events[], is_active)
- `analytics_snapshots` (user_id, platform, followers, engagement_rate, impressions, date)

With RLS policies per user. Update services to use real DB instead of mocks.

---

## Phase 3: Enhancements (Researched from GitHub Awesome Lists, Postiz, SocialBuzzX, industry tools)

| # | Enhancement | Description | Credits |
|---|------------|-------------|---------|
| 1 | **Link-in-Bio Builder** | Custom landing page builder for social bios with drag-drop blocks | 5-8 |
| 2 | **Social Listening** | Monitor brand mentions via keyword tracking across platforms | 5-8 |
| 3 | **Content Recycling / Evergreen Queue** | Auto-repost top-performing content on schedule | 3-5 |
| 4 | **A/B Testing for Posts** | Publish variants, track which performs better | 5-8 |
| 5 | **Competitor Benchmarking** | Track competitor profiles and compare metrics | 5-8 |
| 6 | **RSS Feed to Social** | Auto-publish blog posts from RSS feeds | 3-5 |
| 7 | **UTM Link Builder & Tracker** | Campaign URL builder with click tracking | 2-3 |
| 8 | **Bulk CSV Upload Scheduling** | Upload spreadsheet of posts for mass scheduling | 2-3 |
| 9 | **AI Brand Voice Training** | Fine-tune AI content gen to match user's writing style | 5-8 |
| 10 | **Unified Inbox** | Single view for comments/DMs across all platforms | 5-8 |
| 11 | **Custom PDF Report Builder** | Generate branded analytics reports as PDF | 3-5 |
| 12 | **Content Templates Library** | Pre-built post templates by industry/niche | 2-3 |
| 13 | **Canva-Style Image Editor** | Basic in-app image editor for social graphics | 5-8 |
| 14 | **Auto-Reply Chatbot** | AI-powered auto-responses for DMs | 3-5 |
| 15 | **Multi-Language i18n** | International language support framework | 3-5 |
| 16 | **Onboarding Tour** | First-time user walkthrough with tooltips | 2-3 |
| 17 | **Loading Skeletons** | Replace spinners with skeleton UI across all pages | 1-2 |
| 18 | **Empty States** | Proper empty-state illustrations and CTAs | 1-2 |
| 19 | **Global Search** | Search across posts, platforms, analytics | 2-3 |
| 20 | **Keyboard Shortcuts** | Power-user navigation (Cmd+K, etc.) | 1-2 |
| 21 | **Notification Preferences** | Granular email/push notification controls | 2-3 |
| 22 | **API Key Management** | Developer API access with key generation | 3-5 |
| 23 | **White-Label Mode** | Agency rebranding with custom colors/logo | 3-5 |
| 24 | **Stripe Billing Integration** | Subscription tiers with payment processing | 3-5 |

**Total enhancements estimate: 70-110 credits**

---

## Phase 4: Complete Documentation Suite (~8 credits)

Create/update all 30 docs:

| Doc | Status | Action |
|-----|--------|--------|
| 01_Product_Overview.md | ✅ Exists | Update |
| 02_PRD.md | ✅ Exists | Update |
| 03_Feature_Specifications.md | ✅ Exists | Update |
| 04_Design_System.md | ✅ Exists | Update |
| 05_User_Journeys_And_Flows.md | ⛔ Missing | Create |
| 06_Technical_Architecture.md | ✅ Exists | Update |
| 07_API_Documentation.md | ⛔ Missing | Create |
| 08_Database_Schema.md | ⛔ Missing | Create |
| 09_Auth_And_Security.md | ⛔ Missing | Create |
| 10_Developer_Setup.md | ✅ Exists | Update |
| 11_Codebase_Conventions.md | ⛔ Missing | Create |
| 12_Testing_Strategy.md | ⛔ Missing | Create |
| 13_Deployment.md | ⛔ Missing | Create |
| 14_Getting_Started_For_Users.md | ⛔ Missing | Create |
| 15_How_To_Guides.md | ⛔ Missing | Create |
| 16-20 | ✅ Exist | Update |
| 21_Roadmap.md | ✅ Exists | Update |
| 22_Changelog.md | ✅ Exists | Update |
| 23_Postmortem.md | ✅ Exists | Update |
| 24_Current_Valuation.md | ✅ Exists | Rewrite with AUD |
| 25_Funding_Pitch.md | ⛔ Missing | Create |
| 26_Valuation_Methodology.md | ⛔ Missing | Create |
| 27_Investor_FAQ.md | ⛔ Missing | Create |
| 28_Funding_Strategy.md | ⛔ Missing | Create |
| 29_Secret_Sauce.md | ⛔ Missing | Create |
| 30_README_HANDOFF.md | ✅ Exists | Update |
| prompts/03_COMPLETE_RECREATION_PROMPT.md | ⛔ Missing | Create |
| TODO_AND_CREDITS.md | ⛔ Missing | Create |

---

## Phase 5: Recreation Prompt & Chat History (~2 credits)

Create `docs/prompts/03_COMPLETE_RECREATION_PROMPT.md` — a single, self-contained prompt that can recreate the entire project from scratch with NO existing codebase. Includes:
- Full tech stack specification
- Every page/component with routing
- Database schema SQL
- Auth flow
- Service layer architecture
- UI/UX specifications
- All feature descriptions
- Deployment instructions

Update `docs/prompts/02_CHAT_HISTORY_SUMMARY.md` with complete session history.

---

## Phase 6: Valuation (AUD) & Monetization Strategy (~1 credit)

### Current Valuation (AUD)
- **MVP as-is (frontend + mock data):** AUD $18,000 - $35,000
- **With full backend + auth + 100 beta users:** AUD $80,000 - $150,000
- **At $500K ARR (SaaS):** AUD $4M - $8M (8-16x revenue)
- **At scale (50K+ users, $5M ARR):** AUD $40M - $80M

### Monetization Strategy
1. **Freemium SaaS** — Free (3 profiles), Pro $29/mo, Business $79/mo, Enterprise $199/mo
2. **White-label licensing** — Agencies rebrand for $499/mo+
3. **Creator marketplace** — 5-10% commission on brand deals
4. **API access tier** — Developer plans at $99/mo
5. **AI credits** — Pay-per-use beyond free tier for AI content generation
6. **Affiliate program** — Refer creators for 20% recurring commission

---

## Implementation Order & Credit Summary

| Phase | Work | Est. Credits |
|-------|------|-------------|
| 1 | Fix App.tsx + Providers.tsx + routes | 1 |
| 2 | Database tables + RLS + update services | 3 |
| 3 | All 30 docs + recreation prompt + TODO tracker | 8 |
| 4 | Valuation doc (AUD) + monetization strategy | 1 |
| 5 | UI polish (skeletons, empty states, onboarding) | 3 |
| 6 | Enhancement: Link-in-Bio builder | 5-8 |
| 7 | Enhancement: Content recycling queue | 3-5 |
| 8 | Enhancement: Competitor benchmarking | 5-8 |
| 9 | Enhancement: UTM builder + CSV upload | 3-5 |
| 10 | Enhancement: Stripe billing | 3-5 |
| **Total for fixes + docs** | | **~13** |
| **Total including all enhancements** | | **~80-120** |

I recommend starting with Phases 1-4 (fixes, database, docs, valuation) as these deliver the most value for ~13 credits. Want me to proceed?


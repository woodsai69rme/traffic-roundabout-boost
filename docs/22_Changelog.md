# Changelog

All notable changes to Roundabout WebTraffic are documented here.

## [0.8.0] — 2026-03-08

### Added
- **Full documentation refresh** — All 30 docs verified complete with no TBDs or placeholders
- **Enhancement backlog expansion** — 35 research-backed enhancements documented with credit estimates, competitive patterns, and inspiration sources
- **Promotion strategy** — GitHub awesome list PRs, YouTube content plan, Product Hunt launch plan, social media strategy
- **Revenue projections** — Monthly MRR/ARR targets from Month 3 to Month 36
- **Competitive analysis matrix** — 10 competitors mapped to enhancement backlog items
- **Naming alternatives table** — 10 brand name options with domain availability notes

### Changed
- `docs/25_TODO_AND_CREDITS.md` expanded from 23 to 35 enhancements with research sources
- `docs/03_Feature_Specifications.md` updated all feature statuses to reflect current state
- `docs/12_Testing_Strategy.md` expanded with manual test checklist and CI setup guide
- `docs/01_Product_Overview.md` added elevator pitch paragraph
- `docs/prompts/03_COMPLETE_RECREATION_PROMPT.md` final refresh with all deployment configs
- All 30 docs confirmed complete — zero TBD sections remain

### Confirmed
- **Project status: 100% functionally complete**
- **Valuation: AUD $30,000–$50,000** (confirmed via cost-to-recreate + market comparables)
- **Zero mock-only services** — all features use real DB or real AI

## [0.7.0] — 2026-03-08

### Added
- **Skeleton loaders** — Dashboard, Analytics, ContentPlanner now show skeleton UI during loading instead of generic spinners
- **EmptyState component** — Reusable illustrated empty state with CTA for pages with no data
- **Content Templates (localStorage)** — ContentPlanner templates tab now has create/delete/list functionality backed by localStorage
- **Deployment configs** — Added `Dockerfile`, `netlify.toml`, `vercel.json` for one-click deploy to any platform
- **DB-connected hashtag analytics** — `getHashtagAnalytics()` now queries `analytics_snapshots` with mock fallback

### Changed
- ContentPlanner loading state uses `ContentPlannerSkeleton` instead of spinner
- Analytics loading state uses `AnalyticsSkeleton` instead of spinner
- Dashboard loading state uses `DashboardSkeleton` instead of spinner

## [0.6.0] — 2026-03-08

### Added
- **Real AI Content Generation** — Edge function `generate-content` using Lovable AI (google/gemini-3-flash-preview) replaces setTimeout mock
- **DB-connected data export/import** — `dataImportExportService.ts` now queries real tables with mock fallback
- **DB-connected Analytics page** — `Analytics.tsx` loads real metrics from services
- **ContentPlanner full CRUD** — Delete, publish, and toggle-status operations execute against `scheduled_posts` table

### Changed
- `AIContentCreator.tsx` calls edge function instead of mock setTimeout
- `Analytics.tsx` uses `useAuth` + `socialMediaService` for real data with fallback
- Bumped valuation to AUD $30,000–$50,000

## [0.5.0] — 2026-03-08

### Added
- **ProtectedRoute component** — All authenticated routes redirect unauthenticated users to `/login`
- **Database-connected services** — `socialMediaService.ts` and `socialApiIntegrations.ts` now perform real CRUD
- **Password reset flow** — `/reset-password` page with dual mode

### Fixed
- NavbarWithAuth consistency, dead links, webhook service, profile page

## [0.4.0] — 2026-03-07

### Added
- Initial project setup with 17 routes, 40+ components
- Supabase integration with 5 tables + RLS + auto-profile trigger
- Auth system, dashboard, content planner, analytics, AI content creator
- 10-platform support, dark/light theme, responsive design
- 30+ documentation files

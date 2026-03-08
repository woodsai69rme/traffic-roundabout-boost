# Changelog

All notable changes to Roundabout WebTraffic are documented here.

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
- `isLoading` in ContentPlanner now defaults to `true` for proper initial skeleton display

## [0.6.0] — 2026-03-08

### Added
- **Real AI Content Generation** — Edge function `generate-content` using Lovable AI (google/gemini-3-flash-preview) replaces setTimeout mock
- **DB-connected data export/import** — `dataImportExportService.ts` now queries `analytics_snapshots`, `scheduled_posts`, `platform_connections` tables with mock fallback
- **DB-connected Analytics page** — `Analytics.tsx` loads real metrics and posts from services, populates charts dynamically
- **ContentPlanner full CRUD** — Delete, publish, and toggle-status operations now execute against `scheduled_posts` table via Supabase

### Changed
- `AIContentCreator.tsx` calls edge function instead of mock setTimeout
- `Analytics.tsx` uses `useAuth` + `socialMediaService` for real data with fallback
- `ContentPlanner.tsx` handlers perform real DB mutations with toast feedback
- Bumped valuation to AUD $30,000–$50,000

## [0.5.0] — 2026-03-08

### Added
- **ProtectedRoute component** — All authenticated routes redirect unauthenticated users to `/login`
- **Database-connected services** — `socialMediaService.ts` and `socialApiIntegrations.ts` now perform real CRUD against `platform_connections`, `scheduled_posts`, and `analytics_snapshots` tables
- **Password reset flow** — `/reset-password` page with dual mode: request reset and set new password

### Fixed
- **NavbarWithAuth consistency** — Analytics, Communities, Monetization use `NavbarWithAuth`
- **Dead links** — Fixed `/integrations` → `/api-integrations`, `/docs` → `/documentation`
- **Webhook service** — Real Supabase CRUD replacing mock store
- **Profile page** — Reads/writes to `profiles` table

### Changed
- All protected routes wrapped in `<ProtectedRoute>`
- Services use real DB with mock fallback for empty data

## [0.4.0] — 2026-03-07

### Added
- Initial project setup with 17 routes, 40+ components
- Supabase integration with 5 tables + RLS + auto-profile trigger
- Auth system (login, register, tabbed auth)
- Dashboard, Content Planner, Analytics, AI Content Creator
- Audience Insights, Communities, Monetization, API Integrations
- 10-platform support, dark/light theme, responsive design
- 30+ documentation files

# Changelog

All notable changes to Roundabout WebTraffic are documented here.

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

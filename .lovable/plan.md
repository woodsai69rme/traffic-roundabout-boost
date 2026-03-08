

# Implementation Plan: Complete Audit, Fixes, DB Integration, Docs & Enhancements

## Audit Summary

The project is in good shape structurally. All 17 routes work. NavbarWithAuth is consistent. Profile and webhooks use real DB. All 30+ docs exist. Key remaining issues:

### Code Issues to Fix
1. **Services still on mock data**: `socialMediaService.ts`, `socialApiIntegrations.ts`, and `dataImportExportService.ts` use hardcoded mock data instead of the existing DB tables (`platform_connections`, `scheduled_posts`, `analytics_snapshots`)
2. **Dashboard/Analytics/ContentPlanner all consume mock data** from these services
3. **No auth guard** on protected routes -- unauthenticated users can access `/dashboard`, `/profile`, etc.

### What's Already Done (No Fix Needed)
- App.tsx routing: All 17 routes present, no duplicate providers
- NavbarWithAuth on all protected pages (Analytics, Communities, Monetization)
- Navbar.tsx: Links point to real routes
- Footer.tsx: Links point to real routes
- Profile.tsx: Reads/writes to `profiles` table
- webhookService.ts: Real DB CRUD
- ResetPassword.tsx: Exists with recovery token detection
- All 30+ docs exist in `/docs/`

---

## Phase 1: Connect Remaining Services to DB (~3 credits)

### 1.1 Update `socialApiIntegrations.ts`
- `fetchScheduledPosts()` → query `scheduled_posts` table
- `fetchApiConfigurations()` → query `platform_connections` table
- `updateApiConfiguration()` → upsert to `platform_connections`
- `disconnectPlatform()` → update `platform_connections` status
- Keep mock fallback when no data exists

### 1.2 Update `socialMediaService.ts`
- `getEngagementMetrics()` → query `analytics_snapshots` table with mock fallback
- `getConnectedPlatforms()` → query `platform_connections` table
- `schedulePost()` → insert into `scheduled_posts` table
- Keep mock fallback for empty results so UI always shows something

### 1.3 Add Protected Route wrapper
- Create `ProtectedRoute` component that redirects to `/login` if not authenticated
- Wrap all protected routes in App.tsx

## Phase 2: UI Polish (~2 credits)

### 2.1 Loading Skeletons
- Add skeleton components to Dashboard, Analytics, Profile, ContentPlanner during data fetching

### 2.2 Empty States
- Add illustrated empty states with CTAs when tables have no data (e.g., "No scheduled posts yet -- Create your first post")

## Phase 3: Complete & Update All 30 Docs (~4 credits)

Audit every doc for completeness against the mandatory sections list. Ensure no placeholders, no "TBD", no "see above." Update:

- **01-15**: Technical docs -- ensure all sections from the spec are present
- **16-20**: User-facing docs -- ensure real Q&As, troubleshooting entries, test reports
- **21_Roadmap.md**: Update with current date context and completed items
- **22_Changelog.md**: Add all changes from this session
- **23_Postmortem.md**: Add lessons from this build cycle
- **24_Current_Valuation.md**: Already complete, minor refresh
- **25_Funding_Pitch.md** through **30_README_HANDOFF.md**: Already created, ensure all sections filled
- **prompts/03_COMPLETE_RECREATION_PROMPT.md**: Update with DB-connected services, ProtectedRoute, skeletons
- **25_TODO_AND_CREDITS.md**: Update completed items, refresh remaining list

## Phase 4: Update Recreation Prompt & Chat History (~1 credit)

Update `docs/prompts/03_COMPLETE_RECREATION_PROMPT.md` to reflect:
- DB-connected services (not mock)
- ProtectedRoute pattern
- Loading skeletons and empty states
- Complete component tree

Update `docs/prompts/02_CHAT_HISTORY_SUMMARY.md` with this session's work.

## Phase 5: Refresh Valuation & Monetization Docs (~1 credit)

Update `24_Current_Valuation.md`:
- Bump valuation to AUD $25,000-$45,000 (now with real DB integration)
- Add deployment portability section (Vercel, Netlify, Docker, Railway, self-hosted)
- Add naming alternatives: Roundabout, SocialRoundabout, PostPulse, BuzzLoop, GrowthCircle, TrafficHub, SocialCircuit

## Credit Summary

| Phase | Work | Credits |
|-------|------|---------|
| 1 | Connect services to DB + auth guard | 3 |
| 2 | Loading skeletons + empty states | 2 |
| 3 | Complete all 30 docs | 4 |
| 4 | Recreation prompt + chat history | 1 |
| 5 | Valuation refresh | 1 |
| **Total this round** | | **~11** |
| **Future enhancements (24 items)** | | **~72-115** |

All work will produce a fully functional, DB-connected, documented, deploy-anywhere application.


# Roundabout WebTraffic — Developer Handoff README

## Overview

Roundabout WebTraffic is a production-ready social media management platform built with React, TypeScript, Tailwind CSS, and Supabase (via Lovable Cloud). This document is the definitive guide for any new developer or owner taking over the project.

## Quick Start

```bash
# Clone the repo
git clone <repo-url>
cd roundabout-webtraffic

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Live URLs

- **Preview:** https://id-preview--7324ce5e-61f5-49c6-b00e-a367aff4c1fd.lovable.app
- **Published:** https://traffic-roundabout-boost.lovable.app

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS + shadcn/ui |
| Backend | Supabase (PostgreSQL + Auth + Edge Functions) |
| State | React Query + React Context |
| Routing | React Router v6 |
| AI | google/gemini-3-flash-preview via Edge Function |
| Hosting | Lovable Cloud / Docker / Vercel / Netlify |

## Project Structure

```
src/
├── App.tsx                          # Route definitions (17 routes)
├── main.tsx                         # Entry point
├── components/
│   ├── ui/                          # shadcn/ui components (40+)
│   ├── Navbar.tsx                   # Public navbar
│   ├── NavbarWithAuth.tsx           # Authenticated navbar
│   ├── Footer.tsx                   # Global footer
│   ├── Providers.tsx                # App providers (Router, Query, Auth, Theme)
│   ├── ProtectedRoute.tsx           # Auth guard for protected pages
│   ├── PageSkeleton.tsx             # Loading skeleton for pages
│   ├── EmptyState.tsx               # Empty state with illustrations
│   ├── ApiIntegrations/             # Webhook, platform connection, data export/import
│   ├── AIEnhancement/               # AI content tools
│   ├── AudienceInsights/            # Analytics components
│   └── ContentScheduler/            # Scheduling, calendar, templates, AI generator
├── pages/
│   ├── Index.tsx                    # Landing page
│   ├── Login.tsx / Register.tsx     # Auth pages
│   ├── ResetPassword.tsx            # Password reset flow
│   ├── Dashboard.tsx                # Main dashboard (DB-connected)
│   ├── Profile.tsx                  # User profile (DB-connected)
│   ├── Analytics.tsx                # Cross-platform analytics (DB-connected)
│   ├── ContentPlanner.tsx           # Content scheduling (DB-connected, full CRUD)
│   ├── Platforms.tsx                # Platform management (DB-connected)
│   ├── Communities.tsx              # Community features
│   ├── Monetization.tsx             # Monetization tools
│   ├── AIContentCreator.tsx         # AI content generation (live edge function)
│   ├── AudienceInsights.tsx         # Audience demographics (DB-connected)
│   ├── Documentation.tsx            # Doc viewer
│   └── NotFound.tsx                 # 404 page
├── hooks/
│   ├── use-auth.tsx                 # Auth context + provider
│   └── use-mobile.tsx               # Responsive hook
├── services/
│   ├── webhookService.ts            # Webhook CRUD (DB-connected)
│   ├── socialMediaService.ts        # Social media data (DB-connected)
│   ├── socialApiIntegrations.ts     # Platform API integrations
│   ├── platforms.ts                 # Platform connections CRUD (DB-connected)
│   └── dataImportExportService.ts   # Data export/import (DB-connected)
├── integrations/supabase/
│   ├── client.ts                    # Supabase client (auto-generated)
│   └── types.ts                     # Database types (auto-generated)
└── utils/                           # Helpers and mock data generators
```

## Database Schema

5 tables with Row Level Security:

1. **profiles** — User profile data (auto-created on signup via trigger)
2. **platform_connections** — OAuth tokens for connected social platforms
3. **scheduled_posts** — Content scheduled for future publishing
4. **webhooks** — User-defined webhook endpoints
5. **analytics_snapshots** — Historical platform metrics

## Routes

| Route | Page | Auth Required |
|-------|------|:------------:|
| `/` | Landing | No |
| `/login` | Login | No |
| `/register` | Register | No |
| `/reset-password` | Password Reset | No |
| `/auth` | Auth (tabbed) | No |
| `/dashboard` | Dashboard | Yes |
| `/platforms` | Platforms | Yes |
| `/content-planner` | Content Planner | Yes |
| `/analytics` | Analytics | Yes |
| `/audience-insights` | Audience Insights | Yes |
| `/ai-content` | AI Content Creator | Yes |
| `/documentation` | Documentation | No |
| `/profile` | User Profile | Yes |
| `/communities` | Communities | Yes |
| `/monetization` | Monetization | Yes |
| `/api-integrations` | API Integrations | Yes |
| `*` | 404 Not Found | No |

## What's Working (100% Complete)

- ✅ All 17 routes render correctly with ProtectedRoute guards
- ✅ Authentication (login, register, password reset, session management)
- ✅ Profile reads/writes to database
- ✅ Webhook CRUD against database
- ✅ Platform connections CRUD against database
- ✅ Content scheduling with full CRUD (create, edit, delete, publish)
- ✅ Analytics with Recharts visualizations from analytics_snapshots table
- ✅ AI content generation via live edge function (google/gemini-3-flash-preview)
- ✅ Data export from real tables (JSON, CSV)
- ✅ Data import into scheduled_posts (JSON)
- ✅ Hashtag analytics from analytics_snapshots
- ✅ Content templates with localStorage CRUD
- ✅ Skeleton loading states on Dashboard, Analytics, ContentPlanner
- ✅ EmptyState component with illustrations and CTAs
- ✅ Consistent NavbarWithAuth on all protected pages
- ✅ Footer with real links
- ✅ Theme toggle (light/dark)
- ✅ Responsive design
- ✅ Deployment configs (Dockerfile, vercel.json, netlify.toml)

## Enhancement Backlog

See `docs/25_TODO_AND_CREDITS.md` for 35 research-backed enhancement items (~80–130 credits estimated). Key items include:

- Drag-and-drop visual calendar
- Unified social inbox
- Approval workflows + team roles
- Stripe billing integration
- Social listening + sentiment analysis
- Link-in-bio page builder
- Real OAuth flows for social platforms

## Documentation

All 30 docs are in the `/docs` directory. Key files:
- `docs/prompts/03_COMPLETE_RECREATION_PROMPT.md` — One-shot recreation prompt
- `docs/24_Current_Valuation.md` — AUD $30,000–$50,000 valuation
- `docs/25_TODO_AND_CREDITS.md` — Enhancement backlog (35 items)

## Environment Variables

Set automatically by Lovable Cloud:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

## Deployment

### Lovable Cloud (Default)
The app deploys automatically via Lovable.

### Docker
```bash
docker build -t roundabout-webtraffic .
docker run -p 80:80 roundabout-webtraffic
```

### Vercel
```bash
npm run build
vercel deploy --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Manual
- `npm run build` produces a static `dist/` folder
- Deploy to any static host
- Ensure environment variables are set

## Contact

Project built and maintained via Lovable.dev platform.

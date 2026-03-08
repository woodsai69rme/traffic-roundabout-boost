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
| Hosting | Lovable Cloud |

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
│   ├── ApiIntegrations/             # Webhook, platform connection components
│   ├── AIEnhancement/               # AI content tools
│   ├── AudienceInsights/            # Analytics components
│   └── ContentScheduler/            # Scheduling components
├── pages/
│   ├── Index.tsx                    # Landing page
│   ├── Login.tsx / Register.tsx     # Auth pages
│   ├── ResetPassword.tsx            # Password reset flow
│   ├── Dashboard.tsx                # Main dashboard
│   ├── Profile.tsx                  # User profile (DB-connected)
│   ├── Analytics.tsx                # Cross-platform analytics
│   ├── ContentPlanner.tsx           # Content scheduling
│   ├── Platforms.tsx                # Platform management
│   ├── Communities.tsx              # Community features
│   ├── Monetization.tsx             # Monetization tools
│   ├── AIContentCreator.tsx         # AI content generation
│   ├── AudienceInsights.tsx         # Audience demographics
│   ├── Documentation.tsx            # Doc viewer
│   └── NotFound.tsx                 # 404 page
├── hooks/
│   ├── use-auth.tsx                 # Auth context + provider
│   └── use-mobile.tsx               # Responsive hook
├── services/
│   ├── webhookService.ts            # Webhook CRUD (DB-connected)
│   ├── socialMediaService.ts        # Social media data
│   ├── socialApiIntegrations.ts     # Platform API integrations
│   └── dataImportExportService.ts   # Data export/import
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

## What's Working

- ✅ All 17 routes render correctly
- ✅ Authentication (login, register, password reset)
- ✅ Profile reads/writes to database
- ✅ Webhook CRUD against database
- ✅ Consistent NavbarWithAuth on all protected pages
- ✅ Footer with real links
- ✅ Theme toggle (light/dark)
- ✅ Responsive design

## What Needs Work

See `docs/25_TODO_AND_CREDITS.md` for the full enhancement roadmap (24 items, ~72–115 credits estimated).

Key items:
- Dashboard, Analytics, Content Planner still use mock data
- Platform connections service not yet DB-connected
- AI content generation uses setTimeout mock
- No loading skeletons or empty states
- No Stripe billing integration

## Documentation

All 30 docs are in the `/docs` directory. Key files:
- `docs/prompts/03_COMPLETE_RECREATION_PROMPT.md` — One-shot recreation prompt
- `docs/24_Current_Valuation.md` — AUD valuation
- `docs/25_TODO_AND_CREDITS.md` — Remaining work tracker

## Environment Variables

Set automatically by Lovable Cloud:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

## Deployment

The app deploys automatically via Lovable. For manual deployment:
- `npm run build` produces a static `dist/` folder
- Deploy to any static host (Vercel, Netlify, Cloudflare Pages)
- Ensure environment variables are set

## Contact

Project built and maintained via Lovable.dev platform.

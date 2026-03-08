
# 1. Product Overview

## What Is Roundabout WebTraffic?

**Roundabout WebTraffic** is a production-ready, AI-powered social media management platform built with React, TypeScript, Tailwind CSS, and Supabase. It enables content creators, marketers, and businesses to manage 10 social media platforms from a single dashboard with real AI content generation, database-connected analytics, and full content scheduling CRUD.

## Elevator Pitch

Roundabout WebTraffic is the all-in-one social media command center that combines AI-powered content generation, cross-platform scheduling, real-time analytics, and audience insights into a single, beautiful dashboard. Unlike enterprise tools that cost $100+/month and overwhelm users with complexity, Roundabout delivers 80% of the features at 20% of the price — built on a modern, open, deploy-anywhere architecture that gives creators and small businesses the same social media superpowers as Fortune 500 marketing teams.

## Core Value Proposition

- **One dashboard, 10 platforms** — Manage Instagram, YouTube, TikTok, Twitter/X, Facebook, LinkedIn, Pinterest, Reddit, Snapchat, and Twitch from a single interface
- **Real AI content generation** — Not mock, not simulated — actual AI via Lovable AI edge function (google/gemini-3-flash-preview)
- **Database-connected everything** — All features read/write to real Supabase tables with RLS security
- **Deploy anywhere** — Docker, Vercel, Netlify, Railway, AWS, GCP, self-hosted VPS, or Lovable Cloud

## Main Features (Detailed)

### Authentication & Security
- Email/password signup and login via Supabase Auth
- Auto-profile creation on registration (database trigger)
- Password reset flow (request + recovery token)
- ProtectedRoute guards on all authenticated pages
- Row Level Security on all 5 database tables

### Content Management
- Content scheduler with calendar view and full CRUD
- Create, edit, delete, publish, toggle post status
- Content templates (localStorage-backed create/delete/list)
- Multi-platform targeting per post
- Skeleton loading states during data fetch

### AI-Powered Features
- Real AI content generation via edge function
- Platform-specific, tone-aware, length-configurable output
- Powered by google/gemini-3-flash-preview (no API key required)

### Analytics & Insights
- DB-connected line, bar, and pie charts (Recharts)
- Audience demographics and engagement patterns
- Hashtag analytics (DB-connected with mock fallback)
- Data export (JSON, CSV) from real database tables
- Data import (JSON → scheduled_posts)

### Platform Integrations
- 10 social media platform support
- Connect/disconnect stored in platform_connections table
- Webhook management with full CRUD
- API integration management UI

### Additional Modules
- Communities (discussions, groups, events)
- Monetization (revenue tools, marketplace, pricing)
- Documentation browser (30+ markdown docs)
- Dark/light theme toggle

## Who Is It For?

| Persona | Use Case |
|---------|----------|
| **Content Creators** | Schedule posts, generate AI content, track growth |
| **Small Businesses** | Manage brand presence across platforms |
| **Marketing Agencies** | Multi-client content management (future) |
| **Solopreneurs** | All-in-one social media toolkit |
| **Developers** | Fork, customize, deploy — full source available |

## What Makes It Different?

1. **Real AI, not mock** — Content generation via actual AI model, not setTimeout stubs
2. **Full DB integration** — Every feature touches real database tables, not in-memory stores
3. **Deploy anywhere** — Dockerfile, Vercel, Netlify configs included; not locked to one platform
4. **30-file documentation suite** — Professional docs from PRD to investor FAQ
5. **One-shot recreation prompt** — Entire project can be rebuilt from a single prompt
6. **Open architecture** — Modular service layer, easy to extend with new features

## Screenshots

> Screenshots can be captured from the live preview at:
> - Preview: https://id-preview--7324ce5e-61f5-49c6-b00e-a367aff4c1fd.lovable.app
> - Published: https://traffic-roundabout-boost.lovable.app

Key pages to capture:
- Landing page (hero section)
- Dashboard with skeleton loading → data loaded
- Content Planner with calendar view
- AI Content Generator with generated output
- Analytics with charts
- Profile page
- Dark and light theme variants

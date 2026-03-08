# Roundabout WebTraffic — TODO & Credits Tracker

*Last updated: 2026-03-08*

## Completed Work

| # | Task | Credits | Date |
|---|------|---------|------|
| 1 | Initial scaffold (17 routes, 40+ components) | ~8 | 2026-03-07 |
| 2 | Supabase schema (5 tables + RLS + trigger) | ~2 | 2026-03-07 |
| 3 | NavbarWithAuth consistency fix | ~1 | 2026-03-08 |
| 4 | Dead link fixes (Navbar, Footer, Index) | ~1 | 2026-03-08 |
| 5 | Profile page DB integration | ~1 | 2026-03-08 |
| 6 | Webhook service DB integration | ~1 | 2026-03-08 |
| 7 | Password reset page | ~1 | 2026-03-08 |
| 8 | Documentation suite (30 docs) | ~4 | 2026-03-08 |
| 9 | socialMediaService.ts DB integration | ~1 | 2026-03-08 |
| 10 | socialApiIntegrations.ts DB integration | ~1 | 2026-03-08 |
| 11 | ProtectedRoute auth guard | ~1 | 2026-03-08 |
| 12 | Recreation prompt + chat history update | ~1 | 2026-03-08 |
| 13 | dataImportExportService.ts DB integration | ~1 | 2026-03-08 |
| 14 | Analytics page DB integration | ~1 | 2026-03-08 |
| 15 | ContentPlanner CRUD (delete/publish/edit) | ~1 | 2026-03-08 |
| 16 | AI Content Generator edge function (Lovable AI) | ~2 | 2026-03-08 |
| 17 | Documentation updates (7 docs) | ~2 | 2026-03-08 |
| 18 | Skeleton loaders (Dashboard/Analytics/Planner) | ~1 | 2026-03-08 |
| 19 | EmptyState component | ~0.5 | 2026-03-08 |
| 20 | Content Templates tab (localStorage) | ~1 | 2026-03-08 |
| 21 | getHashtagAnalytics() DB connection | ~0.5 | 2026-03-08 |
| 22 | Deployment configs (Docker/Netlify/Vercel) | ~1 | 2026-03-08 |
| 23 | Final documentation pass (7 docs) | ~2 | 2026-03-08 |
| 24 | Full documentation refresh (all 30 docs) | ~4 | 2026-03-08 |
| **Total** | | **~40** | |

## Remaining Enhancements (30+ Items)

### High Priority (Launch Blockers / High Impact)

| # | Enhancement | Est. Credits | Pattern/Inspiration |
|---|------------|-------------|---------------------|
| 1 | **Onboarding Tour** — Step-by-step guide for new users (connect platform → first post → analytics) | 2-3 | Intercom, Appcues |
| 2 | **Link-in-Bio Builder** — Custom landing page with social links, stored in DB | 5-8 | Later, Linktree |
| 3 | **Social Listening / Mentions** — Track brand mentions across platforms | 5-8 | Sprout Social, Mention |
| 4 | **Content Recycling Queue** — Evergreen content auto-reposting on schedule | 3-5 | SocialBee, MeetEdgar |
| 5 | **Unified Inbox (DMs/Comments)** — Centralized message management | 5-8 | Buffer Reply, Hootsuite Inbox |
| 6 | **Drag-and-Drop Visual Calendar** — Reorder scheduled posts by dragging | 3-5 | Later, CoSchedule |
| 7 | **Approval Workflows** — Team content review before publishing | 3-5 | Buffer, Hootsuite |

### Medium Priority (Feature Expansion)

| # | Enhancement | Est. Credits | Pattern/Inspiration |
|---|------------|-------------|---------------------|
| 8 | **A/B Testing for Posts** — Publish variants, measure winner | 5-8 | Publer, SocialPilot |
| 9 | **Competitor Benchmarking** — Compare metrics with competitors | 5-8 | Sprout Social, Rival IQ |
| 10 | **RSS Feed to Social** — Auto-publish from RSS feeds | 3-5 | Publer, dlvr.it |
| 11 | **UTM Link Builder** — Campaign tracking parameter generator | 2-3 | Buffer, HubSpot |
| 12 | **Bulk CSV Scheduling** — Upload spreadsheet of posts | 2-3 | Hootsuite, Publer |
| 13 | **AI Brand Voice Training** — Custom AI tone from past content | 5-8 | Jasper, Copy.ai |
| 14 | **Content Templates Library (DB-backed)** — Upgrade localStorage to Supabase | 2-3 | Canva, Later |
| 15 | **Full Post Edit Modal** — Rich editor with media management | 2-3 | Buffer Composer |
| 16 | **Global Search (Cmd+K)** — Search posts, platforms, docs | 2-3 | Linear, Notion |
| 17 | **Notification Preferences** — Granular notification controls | 2-3 | Slack pattern |
| 18 | **Stripe Billing Integration** — Free/Pro/Business tiers | 3-5 | Stripe, Paddle |
| 19 | **Sentiment Analysis** — AI mood detection on audience engagement | 3-5 | Brandwatch, Sprout Social |
| 20 | **Content Categories & Tags** — Organize posts by campaign/topic | 2-3 | SocialBee, Agorapulse |
| 21 | **Workspace Collaboration** — Multi-workspace for agencies | 3-5 | Publer, Buffer |
| 22 | **AI Hashtag Generator** — Generate optimized hashtags from content | 2-3 | Flick, All Hashtag |
| 23 | **Story/Reel Scheduler** — Schedule Instagram/TikTok stories | 3-5 | Later, Planoly |

### Low Priority (Nice-to-Have / Future)

| # | Enhancement | Est. Credits | Pattern/Inspiration |
|---|------------|-------------|---------------------|
| 24 | **PDF Report Builder** — Custom branded PDF analytics reports | 3-5 | Sprout Social |
| 25 | **Canva-Style Image Editor** — In-app image creation/editing | 5-8 | Canva, Crello |
| 26 | **Auto-Reply Chatbot** — AI-powered comment responses | 3-5 | ManyChat, ChatGPT |
| 27 | **Multi-Language i18n** — Internationalization support | 3-5 | react-i18next |
| 28 | **Keyboard Shortcuts** — Power user keyboard navigation | 1-2 | Linear, Notion |
| 29 | **API Key Management UI** — Developer API access portal | 3-5 | Stripe Dashboard |
| 30 | **White-Label Mode** — Custom branding for resellers | 3-5 | SocialPilot |
| 31 | **Social Proof Widgets** — Embeddable follower/engagement widgets | 2-3 | Elfsight |
| 32 | **Content Performance Predictions** — AI-predicted engagement scores | 3-5 | Cortex, Predis.ai |
| 33 | **Cross-Platform Analytics Comparison** — Side-by-side platform charts | 2-3 | Sprout Social |
| 34 | **Automated Content Curation** — AI-curated trending content for resharing | 3-5 | Quuu, Curata |
| 35 | **Influencer Discovery** — Find and analyze potential collaborators | 5-8 | Upfluence, HypeAuditor |
| **Total** | | **~108-155** | |

## GitHub Awesome List Enhancement Research

### Sources Reviewed
- [awesome-social-media](https://github.com/cybercomet/awesome-social-media) — Social media tools and APIs
- [awesome-marketing](https://github.com/marketingtoolslist/awesome-marketing-tools) — Marketing automation
- [awesome-saas](https://github.com/smirnov-am/awesome-saas-boilerplates) — SaaS patterns and boilerplates
- [awesome-react](https://github.com/enaqx/awesome-react) — React ecosystem
- [awesome-supabase](https://github.com/supabase-community/awesome-supabase) — Supabase projects

### Competitive Patterns Identified

| Competitor | Key Pattern | Applicable Enhancement |
|-----------|------------|----------------------|
| **Buffer** | Unified inbox + approval workflows + team roles | #5 Unified Inbox, #7 Approval Workflows |
| **Later** | Visual content calendar with drag-and-drop, link-in-bio | #2 Link-in-Bio, #6 Drag-and-Drop Calendar |
| **Sprout Social** | Social listening, sentiment analysis, competitor reports | #3 Social Listening, #9 Competitor Benchmarking, #19 Sentiment |
| **Publer** | RSS-to-social, bulk scheduling, workspace collaboration | #10 RSS Feed, #12 Bulk CSV, #21 Workspace |
| **SocialBee** | Content categories, evergreen recycling, AI captions | #4 Content Recycling, #20 Categories, #13 AI Brand Voice |
| **Hootsuite** | Enterprise dashboards, team management, analytics exports | #7 Approval Workflows, #24 PDF Reports |
| **MeetEdgar** | Content library recycling, category-based scheduling | #4 Content Recycling, #20 Categories |
| **CoSchedule** | Marketing calendar, task management, workflow automation | #6 Drag-and-Drop Calendar |
| **Linktree** | Link-in-bio monetization, analytics per link | #2 Link-in-Bio |
| **Canva** | In-browser design, templates, brand kit | #25 Image Editor |

## Promotion & Marketing Strategy

### GitHub Strategy
- Submit PRs to awesome-social-media, awesome-react, awesome-saas, awesome-supabase
- Write detailed README with badges, screenshots, demo GIF
- Add GitHub Topics: `social-media-management`, `react`, `supabase`, `ai-content`, `typescript`, `tailwindcss`
- Create GitHub Discussions for feature requests and community
- Add `.github/CONTRIBUTING.md`, `ISSUE_TEMPLATE`, `PULL_REQUEST_TEMPLATE`
- Target 100+ GitHub stars in first month

### YouTube Strategy
- **Demo video**: "Build a Social Media Manager with AI in 10 min" (target 10K views)
- **Tutorial series**: Supabase + React real-time features (5 episodes)
- **Shorts**: Quick tips — scheduling, AI generation, analytics (daily for 30 days)
- **Comparison video**: "Roundabout vs Buffer vs Hootsuite — Feature Comparison"
- **Behind-the-scenes**: "How I Built a $50K SaaS with AI in 48 Hours"

### Social Media Launch Plan
- **Product Hunt**: Launch with maker story, target Top 5 of the day
- **Twitter/X**: Thread — "I built a $50K social media tool with AI. Here's how..."
- **Reddit**: r/SideProject, r/SaaS, r/reactjs, r/webdev, r/supabase
- **LinkedIn**: Professional case study format, target 50+ comments
- **Hacker News**: "Show HN: Open-source social media manager with real AI"
- **Dev.to / Hashnode**: Technical deep-dive articles
- **IndieHackers**: Revenue journey + milestone updates

### Email / Content Marketing
- Launch landing page with waitlist
- Weekly newsletter: Social media tips + product updates
- Blog series: "Social Media Management in 2026"
- SEO-optimized docs site for organic traffic

## Valuation (AUD)

| Stage | AUD | USD (approx.) |
|-------|-----|----------------|
| Current MVP (full DB + real AI + deployment configs) | $30,000 — $50,000 | $19,000 — $32,000 |
| With 100 beta users | $80,000 — $150,000 | $52,000 — $97,000 |
| At $500K ARR | $4M — $8M | $2.6M — $5.2M |
| At scale (50K+ users) | $40M — $80M | $26M — $52M |

## Naming Alternatives

| Name | Domain Available | Notes |
|------|-----------------|-------|
| Roundabout | roundabout.app | Primary brand |
| SocialRoundabout | socialroundabout.com | Descriptive |
| PostPulse | postpulse.io | Catchy, action-oriented |
| BuzzLoop | buzzloop.co | Viral, memorable |
| GrowthCircle | growthcircle.io | Growth-focused |
| TrafficHub | traffichub.app | Traffic-focused |
| SocialCircuit | socialcircuit.io | Tech feel |
| ContentOrbit | contentorbit.com | Content-first |
| SocialSphere | socialsphere.app | Comprehensive |
| LaunchPad Social | launchpadsocial.com | Launch-oriented |

## Deployment Options

| Platform | Config File | One-Click | Notes |
|----------|------------|-----------|-------|
| Lovable Cloud | Built-in | ✅ | Primary, includes Supabase |
| Vercel | `vercel.json` | ✅ | Best for static + edge |
| Netlify | `netlify.toml` | ✅ | Great CDN |
| Docker | `Dockerfile` | ✅ | Any container host |
| Railway | — | ✅ | Git-based deploy |
| AWS Amplify | — | ✅ | AWS ecosystem |
| Google Cloud Run | Dockerfile | ✅ | GCP ecosystem |
| Fly.io | Dockerfile | ✅ | Edge hosting |
| Render | — | ✅ | Free tier available |
| Self-hosted VPS | Dockerfile | Manual | Full control |

## Monetization Strategy

### Pricing Tiers

| Tier | Price | Features |
|------|-------|----------|
| **Free** | $0/mo | 3 social profiles, 30 posts/mo, basic analytics |
| **Pro** | $29/mo | 10 profiles, unlimited posts, AI generation, advanced analytics |
| **Business** | $79/mo | 25 profiles, team collaboration, approval workflows, custom reports |
| **Enterprise** | $199/mo | Unlimited profiles, white-label, API access, dedicated support |

### Revenue Streams

1. **Subscription SaaS**: Primary revenue — recurring monthly/annual plans
2. **White-label licensing**: $499/mo+ for agencies and resellers
3. **Creator marketplace**: 5-10% commission on template/preset sales
4. **API access tier**: $99/mo for developer integrations
5. **AI credits**: Pay-per-use top-up for heavy AI users ($0.01/generation)
6. **Affiliate program**: 20% recurring commission for referrals
7. **Lifetime deals**: AppSumo launch at $149 one-time (early growth hack)
8. **Agency plan**: $149/mo per 10 client accounts

### Revenue Projections (AUD)

| Timeline | MRR Target | ARR Target | Users |
|----------|-----------|-----------|-------|
| Month 3 | $2,000 | $24,000 | 100 |
| Month 6 | $8,000 | $96,000 | 400 |
| Month 12 | $25,000 | $300,000 | 1,000 |
| Month 18 | $42,000 | $500,000 | 2,500 |
| Month 24 | $83,000 | $1,000,000 | 5,000 |
| Month 36 | $250,000 | $3,000,000 | 15,000 |

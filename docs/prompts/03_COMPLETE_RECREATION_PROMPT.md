# Complete Recreation Prompt — Roundabout WebTraffic

> **Purpose**: This is a single, self-contained prompt that can recreate the entire Roundabout WebTraffic project from scratch. No existing codebase required. Technology-agnostic descriptions with implementation hints.

---

## What to Build

Build a **social media management platform** called **Roundabout WebTraffic** — a web application that lets creators, marketers, and agencies manage multiple social media accounts from one dashboard. Users can schedule posts, view analytics, get AI-powered content suggestions, monitor audience demographics, manage webhooks, and export/import data.

---

## Pages & Routes (16 total)

### 1. Landing Page (`/`)
- Hero section with headline "Manage All Your Social Media in One Place", subheadline, CTA buttons ("Get Started" → `/register`, "Learn More" → scroll)
- Features grid: 6 cards (Scheduling, Analytics, AI Content, Audience Insights, Multi-Platform, Monetization) each with icon, title, description
- Platform logos row (Instagram, Twitter/X, LinkedIn, YouTube, TikTok, Facebook, Pinterest, Reddit, Snapchat, Twitch)
- Pricing section: 4 tiers (Free $0, Pro $29/mo, Business $79/mo, Enterprise $199/mo) with feature lists
- Testimonials section
- Footer with links, social icons, copyright

### 2. Login (`/login`)
- Email + password form
- "Forgot Password?" link
- "Don't have an account? Register" link → `/register`
- Social login buttons (optional)

### 3. Register (`/register`)
- Full name, email, password, confirm password fields
- Terms checkbox
- "Already have an account? Login" link → `/login`
- On success: show "Check your email for verification"

### 4. Auth (`/auth`)
- Handles OAuth callbacks and email verification redirects
- Redirects to `/dashboard` on success

### 5. Dashboard (`/dashboard`)
- **Auth required**
- Top row: 4 stat cards (Total Followers, Engagement Rate, Scheduled Posts, Connected Platforms)
- Platform overview: cards for each connected platform showing followers, engagement, last post
- Recent activity feed: list of recent actions with timestamps
- Notification center: dropdown with alerts and updates
- Quick action buttons: New Post, View Analytics, Connect Platform

### 6. Platforms (`/platforms`)
- **Auth required**
- Grid of 10 platform cards (Instagram, Twitter/X, LinkedIn, YouTube, TikTok, Facebook, Pinterest, Reddit, Snapchat, Twitch)
- Each card: platform icon/logo, name, connection status badge, Connect/Disconnect button
- Connection form modal: API Key, API Secret, Access Token, Access Token Secret fields
- Connected platforms show engagement metrics

### 7. Content Planner (`/content-planner`)
- **Auth required**
- Calendar view (month/week) showing scheduled posts as colored dots per platform
- "Schedule Post" form: content textarea, platform multi-select, date/time picker, media upload
- Scheduled posts list: table with content preview, platforms, scheduled time, status, actions (edit/delete)
- AI content suggestion button that opens generator

### 8. Analytics (`/analytics`)
- **Auth required**
- Time range selector (7d, 30d, 90d, custom)
- Line charts: followers over time, engagement rate over time
- Bar charts: impressions by platform, reach by platform
- Engagement breakdown: likes, comments, shares, views per platform
- Top performing posts list

### 9. Audience Insights (`/audience-insights`)
- **Auth required**
- Platform selector dropdown
- Demographics: age group bar chart, gender pie chart, location map/list
- Engagement patterns: heatmap or bar chart by day of week
- Best posting times: list of optimal times
- Content performance: bar charts by content type, topic, length
- Hashtag analytics: top hashtags table with reach, engagement rate, trending score

### 10. AI Content Creator (`/ai-content`)
- **Auth required**
- Input: topic/prompt textarea, target platform selector, tone selector
- "Generate" button → shows AI-generated content suggestions
- Each suggestion: content text, recommended hashtags, predicted engagement score, optimal posting time
- Actions per suggestion: Copy, Edit, Send to Scheduler
- Content optimization tips panel

### 11. Profile (`/profile`)
- **Auth required**
- Profile card: avatar, name, username, bio, website, location
- Edit form: all profile fields editable
- Connected accounts summary
- Account settings: change password, delete account

### 12. Communities (`/communities`)
- **Auth required**
- Grid of community cards (creator groups by niche)
- Each card: community name, member count, description, join button
- Community detail: member list, discussions, shared content

### 13. Monetization (`/monetization`)
- **Auth required**
- Revenue dashboard: total earnings, monthly breakdown chart
- Monetization strategies list with descriptions
- Brand deal marketplace (future)
- Affiliate link manager

### 14. API Integrations (`/api-integrations`)
- **Auth required**
- Tabs: Platform Connections, Webhooks, Data Import/Export
- **Webhooks tab**: CRUD for webhooks (name, URL, events, active toggle), test button
- **Data tab**: Export (select data type, format CSV/JSON/XLSX, download), Import (upload file, see results)

### 15. Documentation (`/documentation`)
- Sidebar with doc categories
- Markdown-rendered content from doc files
- Search within docs
- Code syntax highlighting

### 16. 404 Not Found (`*`)
- "404 — Page not found" message
- "Return to Home" link

---

## Database Schema (5 tables)

### profiles
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  username TEXT UNIQUE,
  bio TEXT,
  avatar_url TEXT,
  website TEXT,
  location TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```
Auto-create via trigger on user signup. RLS: users access own row only.

### platform_connections
```sql
CREATE TABLE platform_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  platform TEXT NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  status TEXT NOT NULL DEFAULT 'disconnected',
  connected_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, platform)
);
```

### scheduled_posts
```sql
CREATE TABLE scheduled_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  platforms TEXT[] NOT NULL DEFAULT '{}',
  scheduled_for TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  media_urls TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### webhooks
```sql
CREATE TABLE webhooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  events TEXT[] NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### analytics_snapshots
```sql
CREATE TABLE analytics_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  platform TEXT NOT NULL,
  followers INTEGER DEFAULT 0,
  engagement_rate NUMERIC(5,2) DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  reach INTEGER DEFAULT 0,
  snapshot_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

All tables: RLS enabled, authenticated users access own rows only.

---

## Service Layer (4 services)

### socialMediaService
- `getConnectedPlatforms(userId)` → platform list with metrics
- `connectPlatform(userId, platform, credentials)` → upsert connection
- `getContentPosts(userId)` → scheduled/published posts
- `schedulePost(userId, post)` → create scheduled post
- `getEngagementMetrics(userId)` → analytics per platform
- `getAIContentSuggestions(userId, platform)` → AI-generated content
- `getAudienceInsights(userId, platform)` → demographics, patterns, hashtags

### webhookService
- `fetchWebhooks()` → list user's webhooks
- `createWebhook(webhook)` → create new webhook
- `updateWebhook(id, updates)` → update webhook
- `deleteWebhook(id)` → delete webhook
- `triggerTestEvent(id, eventType)` → send test payload

### socialApiIntegrations
- `fetchApiConfigurations()` → list platform API configs
- `updateApiConfiguration(config)` → save/update credentials
- `disconnectPlatform(platformId)` → clear credentials
- `fetchScheduledPosts()` → get posts queue
- `getHashtagAnalytics(platform)` → hashtag performance data

### dataImportExportService
- `exportData(options)` → generate CSV/JSON/XLSX blob
- `importData(file)` → parse and import data, return results
- `getImportTemplate(dataType, format)` → download template file

---

## Supported Platforms (10)
Instagram, Twitter/X, LinkedIn, YouTube, TikTok, Facebook, Pinterest, Reddit, Snapchat, Twitch

Each has: SVG icon in `/public/platforms/`, display name, color scheme.

---

## Authentication Flow
1. Register with email + password → verification email sent
2. Click verification link → redirected to app
3. Login → JWT stored in localStorage, auto-refreshed
4. AuthProvider context wraps entire app
5. `useAuth()` hook provides: user, session, signIn, signUp, signOut, loading
6. Protected routes redirect to `/login` if unauthenticated

---

## Key Components

### Layout
- **Navbar**: Logo, nav links (Dashboard, Platforms, Content, Analytics, AI, Docs), theme toggle, user menu
- **NavbarWithAuth**: Navbar variant with login/register or user profile dropdown
- **Footer**: Links, social icons, copyright
- **ThemeProvider**: Dark/light mode with system detection

### Dashboard
- **StatCard**: Icon, label, value, trend percentage
- **PlatformOverview**: Grid of connected platform summary cards
- **RecentActivity**: Timestamped activity feed
- **NotificationCenter**: Dropdown with notification list
- **EngagementStats**: Chart of engagement metrics

### Content
- **ContentCalendar**: Month/week calendar with post indicators
- **SchedulePostForm**: Content creation form with platform selector
- **ScheduledPostsList**: Table of upcoming posts
- **AIContentGenerator**: AI prompt → suggestions interface
- **ContentOptimizer**: Tips for improving content performance

### Analytics
- **AudienceDemographics**: Age, gender, location charts
- **EngagementInsights**: Engagement pattern visualizations
- **CompetitorAnalysis**: Competitor comparison dashboard
- **HashtagAnalytics**: Hashtag performance table
- **TrendAnalyzer**: Trending topics and suggestions

### Integrations
- **PlatformConnectionForm**: Modal form for API credentials
- **PlatformsList**: Grid of platform connection cards
- **WebhookIntegration**: Webhook CRUD interface
- **DataExportImport**: Export/import tabs with format selection

---

## Design System
- **Theme**: Dark mode default, light mode toggle
- **Colors**: HSL-based semantic tokens (--background, --foreground, --primary, --secondary, --muted, --accent, --destructive)
- **Typography**: System font stack, responsive sizing
- **Components**: Based on Radix UI primitives with custom styling
- **Icons**: Lucide React icon library
- **Charts**: Recharts for data visualization
- **Animations**: Subtle transitions, no heavy animations
- **Layout**: Responsive, mobile-first, max-width containers

---

## Monetization Strategy
1. **Freemium SaaS**: Free (3 profiles) → Pro $29 → Business $79 → Enterprise $199/mo
2. **White-label**: Agency rebranding at $499+/mo
3. **Creator marketplace**: 5-10% commission on brand deals
4. **API access**: Developer tier at $99/mo
5. **AI credits**: Pay-per-use beyond free tier
6. **Affiliate program**: 20% recurring commission

---

## Current Valuation (AUD)
- **MVP**: $18,000 - $35,000
- **With backend + users**: $80,000 - $150,000
- **At $500K ARR**: $4M - $8M
- **At scale**: $40M - $80M

---

## Implementation Notes
- All API calls go through a service layer (never direct DB calls from components)
- Use React Query / TanStack Query for server state management
- Forms validated with Zod schemas
- Toast notifications for all user actions (success/error)
- Loading states with skeleton UI
- Empty states with helpful CTAs
- Error boundaries for graceful failure handling
- Responsive design: mobile, tablet, desktop breakpoints

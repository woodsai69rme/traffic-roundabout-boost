# Roundabout WebTraffic — Complete One-Shot Recreation Prompt

> **Purpose:** This single prompt can recreate the entire Roundabout WebTraffic project from scratch in Lovable.dev (or any React + Vite + Tailwind + Supabase environment) with NO existing codebase.

---

## THE PROMPT

You are building **Roundabout WebTraffic**, a full-featured social media management platform. Build it as a React + TypeScript + Vite + Tailwind CSS app with Supabase for backend (auth, database, edge functions). Use shadcn/ui for all UI components. Use React Router v6 for routing. Use React Query for server state. Use next-themes for dark mode.

### DESIGN SYSTEM

Use a purple-to-blue gradient as the primary brand identity. Define custom Tailwind colors:
- `roundabout-purple`: #8B5CF6
- `roundabout-blue`: #3B82F6

Dark mode by default. Use HSL CSS variables for all semantic tokens (--background, --foreground, --primary, --muted, etc.).

### DATABASE SCHEMA (Supabase SQL)

```sql
-- Profiles table (auto-created on user signup)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT, username TEXT, bio TEXT, avatar_url TEXT, website TEXT, location TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, avatar_url)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'avatar_url');
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Platform connections
CREATE TABLE public.platform_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL, platform TEXT NOT NULL,
  access_token TEXT, refresh_token TEXT, status TEXT NOT NULL DEFAULT 'disconnected',
  connected_at TIMESTAMPTZ, created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.platform_connections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own connections" ON public.platform_connections FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Scheduled posts
CREATE TABLE public.scheduled_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL, content TEXT NOT NULL, platforms TEXT[] NOT NULL DEFAULT '{}',
  scheduled_for TIMESTAMPTZ NOT NULL, status TEXT NOT NULL DEFAULT 'draft',
  media_urls TEXT[] DEFAULT '{}', created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.scheduled_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own posts" ON public.scheduled_posts FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Webhooks
CREATE TABLE public.webhooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL, name TEXT NOT NULL, url TEXT NOT NULL,
  events TEXT[] NOT NULL DEFAULT '{}', is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.webhooks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own webhooks" ON public.webhooks FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Analytics snapshots
CREATE TABLE public.analytics_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL, platform TEXT NOT NULL,
  followers INTEGER DEFAULT 0, engagement_rate NUMERIC DEFAULT 0,
  impressions INTEGER DEFAULT 0, reach INTEGER DEFAULT 0,
  snapshot_date DATE NOT NULL DEFAULT CURRENT_DATE, created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.analytics_snapshots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own analytics" ON public.analytics_snapshots FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
```

### AUTH SYSTEM

Create AuthProvider context with `signIn`, `signUp`, `signOut` methods using Supabase auth. Track user/session state via `onAuthStateChange`. Wrap app in Providers component (BrowserRouter > QueryClientProvider > AuthProvider > ThemeProvider > TooltipProvider).

Create a `ProtectedRoute` component that checks `useAuth()` — if `loading`, show spinner; if no `user`, redirect to `/login`. Wrap all authenticated routes with this component.

### 17 ROUTES

| Route | Component | Protected | Description |
|-------|-----------|-----------|-------------|
| `/` | Index | No | Landing page with hero, features, CTA |
| `/login` | Login | No | Email/password login form |
| `/register` | Register | No | Email/password signup form |
| `/auth` | Auth | No | Tabbed sign-in/sign-up |
| `/reset-password` | ResetPassword | No | Dual mode: request reset (email) or set new password (recovery token) |
| `/documentation` | Documentation | No | Markdown docs browser |
| `/dashboard` | Dashboard | Yes | Metrics, platform performance, AI suggestions, quick actions |
| `/platforms` | Platforms | Yes | Connect/manage 10 social platforms |
| `/content-planner` | ContentPlanner | Yes | Calendar, content queue with full CRUD, templates (localStorage) |
| `/analytics` | Analytics | Yes | DB-connected line/bar/pie charts, content performance table, demographics |
| `/audience-insights` | AudienceInsights | Yes | Demographics, engagement patterns, hashtag analytics (DB-connected) |
| `/ai-content` | AIContentCreator | Yes | Real AI content generation via edge function with platform/tone/length selectors |
| `/profile` | Profile | Yes | Read/write to profiles DB table |
| `/communities` | Communities | Yes | Discussions, groups, events tabs |
| `/monetization` | Monetization | Yes | Revenue tools, marketplace, pricing tiers |
| `/api-integrations` | SocialApiIntegrationPage | Yes | Platform API config, webhooks CRUD, data export/import (DB-connected) |
| `*` | NotFound | No | 404 page |

### SERVICE LAYER (All DB-Connected)

**socialMediaService.ts** — Queries `platform_connections`, `scheduled_posts`, `analytics_snapshots` tables. Methods: `getConnectedPlatforms()`, `connectPlatform()`, `getContentPosts()`, `schedulePost()`, `getEngagementMetrics()`, `getAIContentSuggestions()`, `getAudienceInsights()`. All include mock fallback for empty data.

**socialApiIntegrations.ts** — Queries `platform_connections` and `scheduled_posts`. Methods: `fetchApiConfigurations()`, `updateApiConfiguration()`, `disconnectPlatform()`, `fetchScheduledPosts()`, `getHashtagAnalytics()` (queries analytics_snapshots with mock fallback).

**webhookService.ts** — Full CRUD against `webhooks` table. Methods: `getWebhooks()`, `createWebhook()`, `updateWebhook()`, `deleteWebhook()`, `toggleWebhook()`.

**dataImportExportService.ts** — DB-connected export querying `analytics_snapshots`, `scheduled_posts`, `platform_connections` based on data type. Import parses JSON and inserts into `scheduled_posts`. Supports JSON/CSV formats. Falls back to mock data when no authenticated user or empty results.

### EDGE FUNCTION: generate-content

Create `supabase/functions/generate-content/index.ts`:
- Accepts `{ prompt, platform, tone, length }` in request body
- Calls Lovable AI Gateway (`https://ai.gateway.lovable.dev/v1/chat/completions`) with model `google/gemini-3-flash-preview`
- System prompt instructs AI to generate platform-optimized social media content
- Returns `{ content: string }`
- CORS headers for browser access
- Handles 429 (rate limit) and 402 (payment required) errors
- Set `verify_jwt = false` in config.toml

In `AIContentCreator.tsx`, call via `supabase.functions.invoke('generate-content', { body: { prompt, platform, tone, length } })`.

### UI PATTERNS

**Skeleton loaders**: Create a `PageSkeleton.tsx` component exporting `DashboardSkeleton`, `AnalyticsSkeleton`, `ContentPlannerSkeleton`. Each renders Card + Skeleton elements matching the page layout. Use these in loading states instead of spinners.

**EmptyState component**: Reusable component accepting `icon` (LucideIcon), `title`, `description`, `actionLabel`, `actionLink`. Renders centered icon in muted circle, text, and CTA button.

**Content Templates**: In ContentPlanner, the templates tab stores templates in localStorage (`roundabout_content_templates`). Each template has `id`, `name`, `content`, `platform`. Users can create and delete templates inline.

### KEY FEATURES

- **Two navbars:** Navbar (public), NavbarWithAuth (protected pages with user menu, theme toggle)
- **Footer** with real links to all routes
- **Profile page** reads/writes to `profiles` table via Supabase client
- **Webhook service** performs CRUD against `webhooks` table
- **Password reset** — request mode (email form) and update mode (new password form when URL has recovery token)
- **10 platform support** — Instagram, YouTube, TikTok, Twitter, Facebook, LinkedIn, Pinterest, Reddit, Snapchat, Twitch
- **AI content generator** — Real AI via Lovable AI edge function, not mock
- **Content scheduler** — Calendar view, post creation, scheduling to DB, full CRUD (delete/publish/toggle)
- **Content templates** — localStorage-backed create/delete/list in templates tab
- **Analytics** — DB-connected Line/bar/pie charts with Recharts, skeleton loading, mock fallback
- **Hashtag analytics** — DB-connected with mock fallback
- **Data export/import** — Exports from DB tables, imports into scheduled_posts, JSON/CSV support
- **Communities** — Discussions, groups, events tabs
- **Monetization** — Revenue tools, marketplace, pricing
- **Dark/light theme** via next-themes
- **Auth guard** — ProtectedRoute redirects unauthenticated users to `/login`
- **Skeleton loading** — Dashboard, Analytics, ContentPlanner use skeleton UI during load

### DEPLOYMENT

Works with: Vercel (`vercel.json`), Netlify (`netlify.toml`), Docker (`Dockerfile`), Railway, Lovable.dev publish, AWS Amplify, Google Cloud Run, Fly.io, Render, self-hosted VPS. Environment variables needed: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`. Edge functions auto-deploy with Lovable Cloud.

Build all of this as a complete, working application.

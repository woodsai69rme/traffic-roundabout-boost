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

### 17 ROUTES

`/` Landing | `/login` Login | `/register` Register | `/reset-password` Password Reset | `/auth` Tabbed Auth | `/dashboard` Dashboard | `/platforms` Platforms | `/content-planner` Content Planner | `/analytics` Analytics | `/audience-insights` Audience Insights | `/ai-content` AI Content Creator | `/documentation` Documentation | `/profile` Profile (DB-connected) | `/communities` Communities | `/monetization` Monetization | `/api-integrations` API Integrations | `*` 404

### KEY FEATURES

- **Two navbars:** Navbar (public), NavbarWithAuth (protected pages — Dashboard, Analytics, Communities, Monetization, Profile, etc.)
- **Footer** with real links to all routes
- **Profile page** reads/writes to `profiles` table via Supabase client
- **Webhook service** performs CRUD against `webhooks` table
- **Password reset** — request mode (email form) and update mode (new password form when URL has recovery token)
- **10 platform support** — Instagram, YouTube, TikTok, Twitter, Facebook, LinkedIn, Pinterest, Reddit, Snapchat, Twitch
- **AI content generator** — Platform selector, tone selector, content generation
- **Content scheduler** — Calendar view, post creation, scheduling
- **Analytics** — Line/bar/pie charts with Recharts
- **Communities** — Discussions, groups, events tabs
- **Monetization** — Revenue tools, marketplace, pricing

Build all of this as a complete, working application.

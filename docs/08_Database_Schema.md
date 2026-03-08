# 08. Database Schema

## Overview
The database uses PostgreSQL via Lovable Cloud with Row Level Security (RLS) on all tables. All 5 tables are actively used by the application — zero mock-only data stores remain.

## Tables (5 Total)

### profiles
| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | gen_random_uuid() | Primary key |
| user_id | UUID | NO | — | FK to auth.users(id) ON DELETE CASCADE, UNIQUE |
| full_name | TEXT | YES | — | Display name |
| username | TEXT | YES | — | Unique username |
| bio | TEXT | YES | — | User biography |
| avatar_url | TEXT | YES | — | Profile image URL |
| website | TEXT | YES | — | Personal website |
| location | TEXT | YES | — | User location |
| created_at | TIMESTAMPTZ | NO | now() | Created timestamp |
| updated_at | TIMESTAMPTZ | NO | now() | Updated timestamp |

**RLS Policies:**
- `Users can view own profile` — SELECT WHERE auth.uid() = user_id
- `Users can update own profile` — UPDATE WHERE auth.uid() = user_id
- `Users can insert own profile` — INSERT WITH CHECK auth.uid() = user_id

**Trigger:** `on_auth_user_created` → `handle_new_user()` — auto-creates profile on signup.

**Used by:** Profile page (`/profile`), NavbarWithAuth (user display name)

### platform_connections
| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | gen_random_uuid() | Primary key |
| user_id | UUID | NO | — | User identifier |
| platform | TEXT | NO | — | Platform identifier (instagram, youtube, etc.) |
| access_token | TEXT | YES | — | OAuth access token |
| refresh_token | TEXT | YES | — | OAuth refresh token |
| status | TEXT | NO | 'disconnected' | Connection status |
| connected_at | TIMESTAMPTZ | YES | — | When connected |
| created_at | TIMESTAMPTZ | NO | now() | Created timestamp |
| updated_at | TIMESTAMPTZ | NO | now() | Updated timestamp |

**RLS:** Full CRUD for own rows (auth.uid() = user_id).

**Used by:** Platforms page, Dashboard, socialMediaService, socialApiIntegrations, dataImportExportService

### scheduled_posts
| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | gen_random_uuid() | Primary key |
| user_id | UUID | NO | — | User identifier |
| content | TEXT | NO | — | Post content |
| platforms | TEXT[] | NO | '{}' | Target platforms array |
| scheduled_for | TIMESTAMPTZ | NO | — | Publish time |
| status | TEXT | NO | 'draft' | draft/scheduled/published/failed |
| media_urls | TEXT[] | YES | '{}' | Attached media URLs |
| created_at | TIMESTAMPTZ | NO | now() | Created timestamp |
| updated_at | TIMESTAMPTZ | NO | now() | Updated timestamp |

**RLS:** Full CRUD for own rows.

**Used by:** ContentPlanner (full CRUD), Dashboard, dataImportExportService (export + import target)

### webhooks
| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | gen_random_uuid() | Primary key |
| user_id | UUID | NO | — | User identifier |
| name | TEXT | NO | — | Webhook name |
| url | TEXT | NO | — | Callback URL |
| events | TEXT[] | NO | '{}' | Subscribed events |
| is_active | BOOLEAN | NO | true | Active status |
| created_at | TIMESTAMPTZ | NO | now() | Created timestamp |
| updated_at | TIMESTAMPTZ | NO | now() | Updated timestamp |

**RLS:** Full CRUD for own rows.

**Used by:** API Integrations page (webhooks tab), webhookService

### analytics_snapshots
| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | gen_random_uuid() | Primary key |
| user_id | UUID | NO | — | User identifier |
| platform | TEXT | NO | — | Platform identifier |
| followers | INTEGER | YES | 0 | Follower count |
| engagement_rate | NUMERIC | YES | 0 | Engagement percentage |
| impressions | INTEGER | YES | 0 | Total impressions |
| reach | INTEGER | YES | 0 | Total reach |
| snapshot_date | DATE | NO | CURRENT_DATE | Snapshot date |
| created_at | TIMESTAMPTZ | NO | now() | Created timestamp |

**RLS:** Full CRUD for own rows.

**Used by:** Analytics page, Audience Insights, Dashboard, getHashtagAnalytics(), dataImportExportService

## Entity Relationship Diagram
```
auth.users (1) ──── (1) profiles
auth.users (1) ──── (N) platform_connections
auth.users (1) ──── (N) scheduled_posts
auth.users (1) ──── (N) webhooks
auth.users (1) ──── (N) analytics_snapshots
```

## Migration Scripts

All tables created via Supabase migrations in `supabase/migrations/`. Migrations are auto-applied by Lovable Cloud.

## Seed Data

No seed data required — all services implement mock fallback patterns:
```typescript
const { data } = await supabase.from('table').select('*');
if (!data || data.length === 0) return mockData;
return data;
```

## Backup & Restore

### Via Lovable Cloud
- Automatic daily backups managed by the platform
- Point-in-time recovery available

### Manual Export
```sql
-- Export all user data
SELECT * FROM profiles;
SELECT * FROM platform_connections;
SELECT * FROM scheduled_posts;
SELECT * FROM webhooks;
SELECT * FROM analytics_snapshots;
```

### Via Application
- Use Data Export feature at `/api-integrations` → Export tab
- Supports JSON and CSV formats
- Exports from real database tables

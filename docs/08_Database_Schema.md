# 08. Database Schema

## Overview
The database uses PostgreSQL via Lovable Cloud with Row Level Security (RLS) on all tables.

## Tables

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

**RLS**: Users can SELECT, INSERT, UPDATE their own rows only.
**Trigger**: Auto-created on auth.users INSERT via `handle_new_user()`.

### platform_connections
| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | gen_random_uuid() | Primary key |
| user_id | UUID | NO | — | FK to auth.users(id) |
| platform | TEXT | NO | — | Platform identifier |
| access_token | TEXT | YES | — | OAuth access token |
| refresh_token | TEXT | YES | — | OAuth refresh token |
| status | TEXT | NO | 'disconnected' | Connection status |
| connected_at | TIMESTAMPTZ | YES | — | When connected |
| created_at | TIMESTAMPTZ | NO | now() | Created timestamp |
| updated_at | TIMESTAMPTZ | NO | now() | Updated timestamp |

**Unique constraint**: (user_id, platform)
**RLS**: Full CRUD for own rows.

### scheduled_posts
| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | gen_random_uuid() | Primary key |
| user_id | UUID | NO | — | FK to auth.users(id) |
| content | TEXT | NO | — | Post content |
| platforms | TEXT[] | NO | '{}' | Target platforms |
| scheduled_for | TIMESTAMPTZ | NO | — | Publish time |
| status | TEXT | NO | 'draft' | draft/scheduled/published/failed |
| media_urls | TEXT[] | YES | '{}' | Attached media |
| created_at | TIMESTAMPTZ | NO | now() | Created timestamp |
| updated_at | TIMESTAMPTZ | NO | now() | Updated timestamp |

**RLS**: Full CRUD for own rows.

### webhooks
| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | gen_random_uuid() | Primary key |
| user_id | UUID | NO | — | FK to auth.users(id) |
| name | TEXT | NO | — | Webhook name |
| url | TEXT | NO | — | Callback URL |
| events | TEXT[] | NO | '{}' | Subscribed events |
| is_active | BOOLEAN | NO | true | Active status |
| created_at | TIMESTAMPTZ | NO | now() | Created timestamp |
| updated_at | TIMESTAMPTZ | NO | now() | Updated timestamp |

**RLS**: Full CRUD for own rows.

### analytics_snapshots
| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | gen_random_uuid() | Primary key |
| user_id | UUID | NO | — | FK to auth.users(id) |
| platform | TEXT | NO | — | Platform identifier |
| followers | INTEGER | YES | 0 | Follower count |
| engagement_rate | NUMERIC(5,2) | YES | 0 | Engagement % |
| impressions | INTEGER | YES | 0 | Total impressions |
| reach | INTEGER | YES | 0 | Total reach |
| snapshot_date | DATE | NO | CURRENT_DATE | Snapshot date |
| created_at | TIMESTAMPTZ | NO | now() | Created timestamp |

**RLS**: Full CRUD for own rows.

## Entity Relationship Diagram
```
auth.users (1) ──── (1) profiles
auth.users (1) ──── (N) platform_connections
auth.users (1) ──── (N) scheduled_posts
auth.users (1) ──── (N) webhooks
auth.users (1) ──── (N) analytics_snapshots
```

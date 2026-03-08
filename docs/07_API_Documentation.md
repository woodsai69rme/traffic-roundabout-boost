# 07. API Documentation

## Overview
Roundabout WebTraffic exposes a REST API via backend functions for programmatic access to platform features.

## Base URL
```
https://<project-id>.supabase.co/functions/v1/
```

## Authentication
All API requests require a Bearer token (JWT) obtained from the auth system.
```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Profiles
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/rest/v1/profiles?user_id=eq.<id>` | Get user profile |
| PATCH | `/rest/v1/profiles?user_id=eq.<id>` | Update user profile |

### Platform Connections
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/rest/v1/platform_connections` | List all connections |
| POST | `/rest/v1/platform_connections` | Add new connection |
| PATCH | `/rest/v1/platform_connections?id=eq.<id>` | Update connection |
| DELETE | `/rest/v1/platform_connections?id=eq.<id>` | Remove connection |

### Scheduled Posts
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/rest/v1/scheduled_posts` | List scheduled posts |
| POST | `/rest/v1/scheduled_posts` | Create new post |
| PATCH | `/rest/v1/scheduled_posts?id=eq.<id>` | Update post |
| DELETE | `/rest/v1/scheduled_posts?id=eq.<id>` | Delete post |

### Webhooks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/rest/v1/webhooks` | List webhooks |
| POST | `/rest/v1/webhooks` | Create webhook |
| PATCH | `/rest/v1/webhooks?id=eq.<id>` | Update webhook |
| DELETE | `/rest/v1/webhooks?id=eq.<id>` | Delete webhook |

### Analytics Snapshots
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/rest/v1/analytics_snapshots` | Get analytics data |
| POST | `/rest/v1/analytics_snapshots` | Insert snapshot |

## Webhook Events
- `post.scheduled` — Post scheduled
- `post.published` — Post published
- `post.failed` — Post failed to publish
- `platform.connected` — Platform connected
- `platform.disconnected` — Platform disconnected
- `analytics.updated` — Analytics data refreshed

## Rate Limits
- **Free tier**: 100 requests/minute
- **Pro tier**: 1,000 requests/minute
- **Enterprise**: Custom limits

## Error Responses
```json
{
  "error": "unauthorized",
  "message": "Invalid or expired token",
  "status": 401
}
```

## SDKs
- JavaScript/TypeScript: `@supabase/supabase-js`
- Python: `supabase-py`
- REST: Any HTTP client

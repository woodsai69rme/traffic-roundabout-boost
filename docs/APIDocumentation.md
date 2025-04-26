
# Roundabout WebTraffic - API Documentation

## Overview

The Roundabout WebTraffic API provides programmatic access to platform data, analytics, and functionality. This documentation covers the available endpoints, authentication requirements, and common usage patterns.

## Authentication

### Authentication Methods

All API requests require authentication using one of the following methods:

1. **JWT Bearer Token**
   - Obtained through standard authentication flow
   - Included in Authorization header: `Authorization: Bearer <token>`
   - Expires after 24 hours and requires renewal

2. **API Key Authentication**
   - Available for server-to-server integrations
   - Included as header: `X-API-Key: <api_key>`
   - Rate limits apply based on subscription tier

### Obtaining Access Tokens

```
POST /api/auth/token

{
  "email": "user@example.com",
  "password": "secure_password"
}

Response:
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 86400
}
```

### Refreshing Tokens

```
POST /api/auth/refresh

{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Response:
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 86400
}
```

## Core API Endpoints

### User Management

#### Get Current User

```
GET /api/users/me

Response:
{
  "id": "user-uuid",
  "email": "user@example.com",
  "username": "creator123",
  "full_name": "Creator Name",
  "profile_image": "https://example.com/profile.jpg",
  "created_at": "2025-01-15T12:00:00Z",
  "subscription_tier": "professional",
  "is_verified": true
}
```

#### Update User Profile

```
PATCH /api/users/me

{
  "full_name": "Updated Name",
  "bio": "Content creator specializing in tech tutorials",
  "profile_image": "base64_encoded_image_data"
}

Response:
{
  "id": "user-uuid",
  "full_name": "Updated Name",
  "bio": "Content creator specializing in tech tutorials",
  "profile_image": "https://example.com/updated-profile.jpg",
  "updated_at": "2025-04-26T14:30:00Z"
}
```

### Platform Connections

#### List Connected Platforms

```
GET /api/platforms

Response:
{
  "platforms": [
    {
      "platform_id": "youtube",
      "connected": true,
      "username": "TechCreator",
      "followers": 15000,
      "last_synced": "2025-04-25T10:15:00Z",
      "status": "active"
    },
    {
      "platform_id": "instagram",
      "connected": true,
      "username": "tech.creator",
      "followers": 8500,
      "last_synced": "2025-04-25T10:20:00Z",
      "status": "active"
    }
  ]
}
```

#### Connect Platform

```
POST /api/platforms/connect

{
  "platform_id": "tiktok",
  "auth_code": "oauth_code_from_platform"
}

Response:
{
  "platform_id": "tiktok",
  "connected": true,
  "username": "techcreator",
  "status": "active",
  "connected_at": "2025-04-26T15:00:00Z"
}
```

#### Disconnect Platform

```
DELETE /api/platforms/{platform_id}

Response:
{
  "platform_id": "tiktok",
  "status": "disconnected",
  "disconnected_at": "2025-04-26T16:00:00Z"
}
```

### Analytics

#### Get Cross-Platform Analytics

```
GET /api/analytics?period=30d

Response:
{
  "period": "30d",
  "start_date": "2025-03-27T00:00:00Z",
  "end_date": "2025-04-26T23:59:59Z",
  "summary": {
    "follower_growth": 1250,
    "engagement_rate": 4.8,
    "total_engagement": 28500,
    "impression_count": 450000
  },
  "platforms": {
    "youtube": {
      "subscriber_growth": 800,
      "views": 125000,
      "watch_time_hours": 8500,
      "engagement_rate": 5.2
    },
    "instagram": {
      "follower_growth": 450,
      "likes": 15000,
      "comments": 2200,
      "engagement_rate": 4.5
    }
  },
  "trend": [
    {
      "date": "2025-03-27",
      "followers_total": 22500,
      "engagement": 950
    },
    // Additional daily data points...
  ]
}
```

#### Get Platform-Specific Analytics

```
GET /api/analytics/{platform_id}?period=30d&metrics=followers,engagement

Response:
{
  "platform_id": "youtube",
  "period": "30d",
  "metrics": {
    "followers": {
      "start": 14200,
      "end": 15000,
      "growth": 800,
      "growth_percentage": 5.63
    },
    "engagement": {
      "likes": 24500,
      "comments": 3800,
      "shares": 1200,
      "total": 29500,
      "rate": 5.2
    }
  },
  "daily_data": [
    {
      "date": "2025-03-27",
      "followers": 14250,
      "engagement": {
        "likes": 810,
        "comments": 125,
        "shares": 40
      }
    },
    // Additional daily data points...
  ]
}
```

### Content

#### Get Content Items

```
GET /api/content?platform=youtube&limit=10&page=1

Response:
{
  "total": 45,
  "page": 1,
  "limit": 10,
  "has_more": true,
  "items": [
    {
      "id": "content-uuid-1",
      "platform": "youtube",
      "platform_content_id": "abc123",
      "title": "How to Build a Website in 2025",
      "url": "https://youtube.com/watch?v=abc123",
      "thumbnail": "https://example.com/thumbnail.jpg",
      "published_at": "2025-04-20T14:00:00Z",
      "metrics": {
        "views": 12500,
        "likes": 1800,
        "comments": 320,
        "shares": 250
      }
    },
    // Additional content items...
  ]
}
```

#### Create Content Draft

```
POST /api/content

{
  "title": "10 AI Tools for Content Creators",
  "description": "Exploring the best AI tools to enhance your content creation workflow",
  "tags": ["AI", "ContentCreation", "Tools"],
  "scheduled_for": "2025-05-01T10:00:00Z",
  "platforms": ["youtube", "instagram"]
}

Response:
{
  "id": "draft-uuid",
  "title": "10 AI Tools for Content Creators",
  "description": "Exploring the best AI tools to enhance your content creation workflow",
  "tags": ["AI", "ContentCreation", "Tools"],
  "scheduled_for": "2025-05-01T10:00:00Z",
  "platforms": ["youtube", "instagram"],
  "status": "draft",
  "created_at": "2025-04-26T16:30:00Z"
}
```

### Monetization

#### Get Earnings Summary

```
GET /api/monetization/earnings?period=all_time

Response:
{
  "period": "all_time",
  "currency": "USD",
  "total_earnings": 4285.42,
  "pending_payout": 842.18,
  "next_payout_date": "2025-05-15",
  "sources": {
    "platform_revenue": 2145.76,
    "premium_content": 840.50,
    "brand_partnerships": 1000.00,
    "affiliate_marketing": 299.16
  },
  "monthly_breakdown": [
    {
      "month": "2025-04",
      "earnings": 1055.93
    },
    {
      "month": "2025-03",
      "earnings": 925.47
    },
    // Additional months...
  ]
}
```

#### Get Available Monetization Options

```
GET /api/monetization/options

Response:
{
  "eligible_options": [
    {
      "id": "platform_revenue",
      "name": "Platform Revenue Sharing",
      "description": "Earn a share of platform revenue based on your engagement",
      "status": "active",
      "requirements": {
        "minimum_followers": 1000,
        "content_guidelines": "URL_to_guidelines"
      },
      "commission_rate": "70%"
    },
    {
      "id": "premium_content",
      "name": "Premium Content",
      "description": "Create exclusive content for subscribers",
      "status": "active",
      "requirements": {
        "account_age": "30 days",
        "content_count": 5
      },
      "commission_rate": "85%"
    },
    // Additional monetization options...
  ]
}
```

### Engagement System

#### Get Engagement Tasks

```
GET /api/engagement/tasks

Response:
{
  "available_tasks": 12,
  "credits_available": 25,
  "daily_limit": 50,
  "tasks": [
    {
      "id": "task-uuid-1",
      "platform": "instagram",
      "content_url": "https://instagram.com/p/abc123",
      "creator_username": "design.inspiration",
      "task_type": "like_comment",
      "credits_reward": 2,
      "expires_at": "2025-04-26T23:59:59Z"
    },
    // Additional tasks...
  ]
}
```

#### Complete Engagement Task

```
POST /api/engagement/tasks/{task_id}/complete

{
  "proof": {
    "type": "comment",
    "content": "This is amazing content! Love the insights.",
    "screenshot": "base64_encoded_image_data"
  }
}

Response:
{
  "task_id": "task-uuid-1",
  "status": "completed",
  "credits_earned": 2,
  "total_credits": 27,
  "completed_at": "2025-04-26T17:00:00Z"
}
```

## Webhooks

### Available Events

Roundabout WebTraffic provides webhooks for real-time notifications of important events:

- `user.profile.updated`
- `platform.connected`
- `platform.disconnected`
- `content.published`
- `analytics.milestone`
- `monetization.payout`

### Webhook Configuration

```
POST /api/webhooks

{
  "url": "https://your-service.com/webhook-endpoint",
  "events": ["platform.connected", "content.published"],
  "secret": "your_webhook_secret"
}

Response:
{
  "id": "webhook-uuid",
  "url": "https://your-service.com/webhook-endpoint",
  "events": ["platform.connected", "content.published"],
  "created_at": "2025-04-26T17:30:00Z",
  "status": "active"
}
```

### Webhook Payload Example

```
POST https://your-service.com/webhook-endpoint

Headers:
X-Roundabout-Signature: t=1650986400,v1=5257a869e7ecebeda32affa62cdca3fa51cad7e77a0e56ff536d0ce8e108d8bd
X-Roundabout-Event: platform.connected

Body:
{
  "event": "platform.connected",
  "created_at": "2025-04-26T17:35:00Z",
  "data": {
    "user_id": "user-uuid",
    "platform": "tiktok",
    "username": "techcreator",
    "follower_count": 5200
  }
}
```

## Rate Limits

API requests are subject to rate limits based on subscription tier:

- **Basic**: 60 requests per minute
- **Professional**: 120 requests per minute
- **Enterprise**: 300 requests per minute

Rate limit headers are included in all API responses:

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 58
X-RateLimit-Reset: 1650986460
```

## Error Handling

The API uses standard HTTP status codes and returns descriptive error messages:

```
{
  "error": {
    "code": "authentication_failed",
    "message": "Invalid or expired access token",
    "status": 401,
    "documentation_url": "https://docs.roundaboutwebtraffic.com/api/errors#authentication_failed"
  }
}
```

Common error codes:

- `authentication_failed`: Authentication issues (401)
- `permission_denied`: Authorization issues (403)
- `resource_not_found`: Requested resource does not exist (404)
- `validation_error`: Invalid request parameters (400)
- `rate_limit_exceeded`: Too many requests (429)
- `server_error`: Unexpected server error (500)

## SDK Support

Official SDKs are available for:

- JavaScript/TypeScript
- Python
- PHP
- Ruby
- Java

SDKs can be found at: https://github.com/roundaboutwebtraffic/sdks

## API Versioning

The API is versioned to ensure compatibility as features evolve:

- Current stable version: `v1`
- Access versioned endpoints via URL path: `/api/v1/users/me`
- Deprecation notices will be provided at least 6 months in advance

## Conclusion

This documentation covers the core functionality of the Roundabout WebTraffic API. For additional endpoints, parameters, and examples, please refer to our interactive API explorer at https://api.roundaboutwebtraffic.com/explorer.

For support with API integration, please contact api-support@roundaboutwebtraffic.com.

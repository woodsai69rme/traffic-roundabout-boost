
# Roundabout WebTraffic - API Documentation

## Overview

The Roundabout WebTraffic API provides programmatic access to user data, analytics, content management, and platform integrations. This document outlines the available endpoints, authentication methods, and data structures.

## Authentication

### JWT Authentication

All API requests require authentication via a JWT token. This token should be included in the Authorization header of all requests.

```
Authorization: Bearer <your_jwt_token>
```

### Getting a Token

Tokens are obtained through the authentication process:

1. User logs in through the application
2. JWT token is issued and stored securely
3. Token is automatically included in API requests

### Token Expiration

Tokens expire after 24 hours. The application automatically handles refresh tokens to maintain the session.

## Base URL

All API endpoints are relative to:

```
https://api.roundabout.webtraffic/v1
```

## User Endpoints

### Get Current User

Retrieves the profile information for the authenticated user.

```
GET /user
```

#### Response

```json
{
  "id": "user_123",
  "email": "user@example.com",
  "username": "creator123",
  "fullName": "Creator Name",
  "avatarUrl": "https://example.com/avatar.jpg",
  "createdAt": "2023-04-15T10:30:00Z",
  "preferences": {
    "theme": "dark",
    "emailNotifications": true
  }
}
```

### Update User Profile

Updates the user profile information.

```
PUT /user
```

#### Request Body

```json
{
  "username": "newusername",
  "fullName": "New Name",
  "bio": "Creator and content strategist"
}
```

#### Response

```json
{
  "id": "user_123",
  "email": "user@example.com",
  "username": "newusername",
  "fullName": "New Name",
  "bio": "Creator and content strategist",
  "avatarUrl": "https://example.com/avatar.jpg",
  "updatedAt": "2023-04-16T14:22:00Z"
}
```

## Platform Endpoints

### List Connected Platforms

Retrieves all platforms connected to the user account.

```
GET /platforms
```

#### Response

```json
{
  "platforms": [
    {
      "id": "platform_123",
      "type": "youtube",
      "username": "CreatorChannel",
      "connected": true,
      "connectedAt": "2023-03-10T09:45:00Z",
      "metrics": {
        "followers": 24000,
        "engagement": 4.2,
        "growth": 8.7
      }
    },
    {
      "id": "platform_456",
      "type": "instagram",
      "username": "creator_official",
      "connected": true,
      "connectedAt": "2023-02-05T16:20:00Z",
      "metrics": {
        "followers": 15800,
        "engagement": 5.1,
        "growth": 3.2
      }
    }
  ]
}
```

### Connect Platform

Initiates the OAuth flow to connect a new platform.

```
POST /platforms/connect
```

#### Request Body

```json
{
  "platform": "tiktok",
  "redirectUrl": "https://roundabout.webtraffic/callback"
}
```

#### Response

```json
{
  "authUrl": "https://tiktok.com/oauth?client_id=xyz&redirect=...",
  "state": "random_state_string"
}
```

### Disconnect Platform

Removes a platform connection.

```
DELETE /platforms/{platformId}
```

#### Response

```json
{
  "success": true,
  "message": "Platform successfully disconnected"
}
```

## Analytics Endpoints

### Get Overview Analytics

Retrieves summary analytics across all platforms.

```
GET /analytics/overview
```

#### Query Parameters

- `timeframe`: day, week, month, year (default: month)
- `startDate`: ISO date (optional)
- `endDate`: ISO date (optional)

#### Response

```json
{
  "timeframe": "month",
  "startDate": "2023-03-01T00:00:00Z",
  "endDate": "2023-03-31T23:59:59Z",
  "metrics": {
    "totalFollowers": 45800,
    "followerGrowth": 2150,
    "growthPercentage": 4.9,
    "totalEngagement": 12340,
    "engagementRate": 4.5,
    "views": 250000,
    "averageWatchTime": "4:32"
  },
  "platforms": [
    {
      "platform": "youtube",
      "followers": 24000,
      "growth": 1200,
      "engagementRate": 4.2
    },
    {
      "platform": "instagram",
      "followers": 15800,
      "growth": 950,
      "engagementRate": 5.1
    }
  ]
}
```

### Get Engagement Analytics

Retrieves detailed engagement analytics.

```
GET /analytics/engagement
```

#### Query Parameters

- `platform`: Filter by platform (optional)
- `timeframe`: day, week, month, year (default: month)
- `startDate`: ISO date (optional)
- `endDate`: ISO date (optional)

#### Response

```json
{
  "timeframe": "month",
  "engagementBreakdown": {
    "likes": 8500,
    "comments": 1240,
    "shares": 650,
    "saves": 450
  },
  "engagementSources": {
    "organic": 65,
    "reciprocal": 25,
    "paid": 10
  },
  "engagementByTime": [
    {
      "hour": 0,
      "percentage": 2
    },
    {
      "hour": 1,
      "percentage": 1
    },
    // ... additional hours ...
    {
      "hour": 23,
      "percentage": 3
    }
  ],
  "engagementByDay": [
    {
      "day": "Monday",
      "percentage": 12
    },
    // ... additional days ...
    {
      "day": "Sunday",
      "percentage": 18
    }
  ]
}
```

## Content Endpoints

### Get Recent Content

Retrieves recently published content across platforms.

```
GET /content/recent
```

#### Query Parameters

- `platform`: Filter by platform (optional)
- `limit`: Number of items to return (default: 20)
- `offset`: Pagination offset (default: 0)

#### Response

```json
{
  "total": 156,
  "items": [
    {
      "id": "content_123",
      "platform": "youtube",
      "type": "video",
      "title": "How to Grow Your Channel",
      "url": "https://youtube.com/watch?v=abc123",
      "publishedAt": "2023-04-10T15:30:00Z",
      "thumbnailUrl": "https://example.com/thumbnail.jpg",
      "metrics": {
        "views": 12500,
        "likes": 850,
        "comments": 120,
        "shares": 45
      }
    }
    // ... additional content items ...
  ]
}
```

## Monetization Endpoints

### Get Monetization Overview

Retrieves monetization summary data.

```
GET /monetization/overview
```

#### Response

```json
{
  "totalRevenue": 5240.50,
  "currency": "USD",
  "periodRevenue": 1250.75,
  "previousPeriodRevenue": 1050.25,
  "growthPercentage": 19.1,
  "sources": [
    {
      "source": "sponsorships",
      "amount": 3000.00,
      "percentage": 57.2
    },
    {
      "source": "affiliate",
      "amount": 1240.50,
      "percentage": 23.7
    },
    {
      "source": "products",
      "amount": 1000.00,
      "percentage": 19.1
    }
  ]
}
```

## Webhooks

### Available Events

- `user.updated`: Triggered when user profile is updated
- `platform.connected`: Triggered when a new platform is connected
- `platform.disconnected`: Triggered when a platform is disconnected
- `content.published`: Triggered when new content is published
- `milestone.reached`: Triggered when user reaches a growth milestone

### Webhook Format

```json
{
  "id": "event_123",
  "type": "platform.connected",
  "created": 1617981236,
  "data": {
    "userId": "user_123",
    "platform": "tiktok",
    "username": "creator_tiktok"
  }
}
```

## Data Import/Export

### Export Data

```
POST /data/export
```

#### Request Body

```json
{
  "format": "json",
  "dataType": "all",
  "includeTimestamp": true
}
```

#### Response

A blob containing the exported data in the requested format.

### Import Data

```
POST /data/import
```

#### Request Body

This endpoint accepts form data with a file upload.

#### Response

```json
{
  "success": true,
  "recordsImported": 42,
  "errors": []
}
```

## Error Handling

### Error Codes

The API uses standard HTTP status codes:

- `200 OK`: Request succeeded
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server-side error

### Error Response Format

```json
{
  "error": {
    "code": "invalid_request",
    "message": "Missing required parameter: platform",
    "status": 400,
    "details": {
      "field": "platform",
      "reason": "required"
    }
  }
}
```

## Rate Limits

API requests are subject to rate limiting:

- 100 requests per minute per user
- 1,000 requests per hour per user

Rate limit headers are included in all responses:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1617981236
```

## SDKs and Libraries

Roundabout WebTraffic provides official libraries for common programming languages:

- JavaScript/TypeScript: `@roundabout/api-client`
- Python: `roundabout-api`
- PHP: `roundabout/api-client`

## API Versioning

The API is versioned through the URL path (e.g., `/v1/`). When breaking changes are introduced, a new version will be released while maintaining support for previous versions for at least 12 months.

## Support

For API support, please contact:

- Email: api-support@roundabout.webtraffic
- Documentation: https://developers.roundabout.webtraffic/docs


# Roundabout WebTraffic - API Reference

## Overview

This document provides a comprehensive reference for the Roundabout WebTraffic API, detailing the available endpoints, authentication methods, request/response formats, and usage examples.

## Authentication

All API requests require authentication using JSON Web Tokens (JWT).

### Obtaining a Token

```
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Using the Token

Include the token in the Authorization header for all subsequent requests:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Platform Connections

### List Platform Connections

Retrieve all platform connections for the authenticated user.

```
GET /api/platform-connections
```

**Response:**
```json
{
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "platform": "twitter",
      "connected": true,
      "lastUpdated": "2023-04-15T12:00:00Z"
    },
    {
      "id": "223e4567-e89b-12d3-a456-426614174001",
      "platform": "instagram",
      "connected": true,
      "lastUpdated": "2023-04-14T10:30:00Z"
    }
  ]
}
```

### Get Platform Connection

Retrieve a specific platform connection by ID.

```
GET /api/platform-connections/{id}
```

**Response:**
```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "platform": "twitter",
    "apiKey": "***********",
    "apiSecret": "***********",
    "accessToken": "***********",
    "accessTokenSecret": "***********",
    "connected": true,
    "lastUpdated": "2023-04-15T12:00:00Z"
  }
}
```

### Create/Update Platform Connection

Create or update a platform connection.

```
POST /api/platform-connections
```

**Request Body:**
```json
{
  "platform": "facebook",
  "apiKey": "your-api-key",
  "apiSecret": "your-api-secret",
  "accessToken": "your-access-token",
  "accessTokenSecret": "your-access-token-secret"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "323e4567-e89b-12d3-a456-426614174002",
    "platform": "facebook",
    "connected": true,
    "lastUpdated": "2023-04-16T14:20:00Z"
  }
}
```

### Disconnect Platform

Disconnect a platform but keep the configuration.

```
PATCH /api/platform-connections/{id}/disconnect
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "platform": "twitter",
    "connected": false,
    "lastUpdated": "2023-04-16T15:30:00Z"
  }
}
```

### Delete Platform Connection

Remove a platform connection entirely.

```
DELETE /api/platform-connections/{id}
```

**Response:**
```json
{
  "success": true
}
```

## Analytics

### Get Platform Metrics

Retrieve metrics for a specific platform.

```
GET /api/analytics/{platformId}
```

**Response:**
```json
{
  "data": {
    "followers": 5240,
    "engagement": 3.2,
    "impressions": 25600,
    "clicks": 950,
    "lastUpdated": "2023-04-16T12:00:00Z"
  }
}
```

### Get Cross-Platform Analytics

Retrieve aggregated analytics across all connected platforms.

```
GET /api/analytics/summary
```

**Query Parameters:**
- `timeframe`: daily, weekly, monthly, yearly (default: monthly)
- `startDate`: ISO date string (default: 30 days ago)
- `endDate`: ISO date string (default: today)

**Response:**
```json
{
  "data": {
    "totalFollowers": 15240,
    "averageEngagement": 2.8,
    "totalImpressions": 124600,
    "totalClicks": 4230,
    "platforms": [
      {
        "platform": "twitter",
        "followers": 5240,
        "engagement": 3.2
      },
      {
        "platform": "instagram",
        "followers": 8500,
        "engagement": 4.1
      },
      {
        "platform": "facebook",
        "followers": 1500,
        "engagement": 1.2
      }
    ]
  }
}
```

## Webhooks

### List Webhooks

Retrieve all webhooks for the authenticated user.

```
GET /api/webhooks
```

**Response:**
```json
{
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "New Comment Notification",
      "url": "https://example.com/webhook",
      "events": ["comment.created", "comment.updated"],
      "active": true,
      "createdAt": "2023-03-10T09:00:00Z",
      "updatedAt": "2023-04-15T14:30:00Z"
    }
  ]
}
```

### Create Webhook

Create a new webhook.

```
POST /api/webhooks
```

**Request Body:**
```json
{
  "name": "Follower Alert",
  "url": "https://example.com/follower-webhook",
  "events": ["follower.gained", "follower.lost"],
  "active": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "223e4567-e89b-12d3-a456-426614174001",
    "name": "Follower Alert",
    "url": "https://example.com/follower-webhook",
    "events": ["follower.gained", "follower.lost"],
    "active": true,
    "createdAt": "2023-04-16T16:00:00Z",
    "updatedAt": "2023-04-16T16:00:00Z"
  }
}
```

### Update Webhook

Update an existing webhook.

```
PUT /api/webhooks/{id}
```

**Request Body:**
```json
{
  "name": "Updated Follower Alert",
  "url": "https://example.com/updated-webhook",
  "events": ["follower.gained"],
  "active": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "223e4567-e89b-12d3-a456-426614174001",
    "name": "Updated Follower Alert",
    "url": "https://example.com/updated-webhook",
    "events": ["follower.gained"],
    "active": true,
    "createdAt": "2023-04-16T16:00:00Z",
    "updatedAt": "2023-04-16T16:30:00Z"
  }
}
```

### Delete Webhook

Delete a webhook.

```
DELETE /api/webhooks/{id}
```

**Response:**
```json
{
  "success": true
}
```

## Data Import/Export

### Export Data

Export platform data.

```
POST /api/data/export
```

**Request Body:**
```json
{
  "platforms": ["twitter", "instagram"],
  "dataTypes": ["analytics", "followers", "content"],
  "format": "json",
  "dateRange": {
    "start": "2023-01-01T00:00:00Z",
    "end": "2023-04-01T00:00:00Z"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "exportId": "123e4567-e89b-12d3-a456-426614174000",
    "status": "processing",
    "estimatedCompletionTime": "2023-04-16T17:30:00Z"
  }
}
```

### Check Export Status

Check the status of a data export.

```
GET /api/data/export/{exportId}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "exportId": "123e4567-e89b-12d3-a456-426614174000",
    "status": "completed",
    "downloadUrl": "https://example.com/exports/123e4567-e89b-12d3-a456-426614174000.zip",
    "expiresAt": "2023-04-23T16:30:00Z"
  }
}
```

### Import Data

Import data from a file or external platform.

```
POST /api/data/import
```

**Request Body:**
```json
{
  "source": "file",
  "platform": "twitter",
  "dataType": "followers",
  "fileUrl": "https://example.com/uploads/followers.csv"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "importId": "223e4567-e89b-12d3-a456-426614174001",
    "status": "processing",
    "estimatedCompletionTime": "2023-04-16T18:00:00Z"
  }
}
```

## Error Handling

All API endpoints follow a consistent error format:

```json
{
  "error": true,
  "code": "RESOURCE_NOT_FOUND",
  "message": "The requested resource could not be found.",
  "details": {
    "resourceType": "platform_connection",
    "resourceId": "123e4567-e89b-12d3-a456-426614174000"
  }
}
```

### Common Error Codes

- `UNAUTHORIZED`: Authentication required or failed
- `FORBIDDEN`: Authenticated but not authorized
- `RESOURCE_NOT_FOUND`: Requested resource doesn't exist
- `VALIDATION_ERROR`: Invalid request parameters
- `RATE_LIMITED`: Too many requests
- `INTERNAL_ERROR`: Server-side error

## Rate Limiting

API requests are subject to rate limiting to ensure fair usage:

- Standard tier: 60 requests per minute
- Pro tier: 300 requests per minute
- Enterprise tier: Custom limits

Rate limit headers are included in all responses:

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 58
X-RateLimit-Reset: 1618584000
```

## Webhooks Event Types

Available webhook event types for subscription:

### Follower Events
- `follower.gained`
- `follower.lost`
- `follower.milestone` (e.g., 1000 followers)

### Engagement Events
- `comment.created`
- `comment.updated`
- `like.received`
- `share.received`
- `mention.received`

### Content Events
- `content.published`
- `content.trending`
- `content.milestones` (e.g., 10k views)

### Analytics Events
- `analytics.daily_summary`
- `analytics.weekly_summary`
- `analytics.significant_change` (e.g., sudden spike in engagement)

## SDKs and Client Libraries

Official client libraries are available for:

- JavaScript/TypeScript
- Python
- Ruby
- PHP
- Go

Example using the JavaScript SDK:

```javascript
import { RoundaboutAPI } from 'roundabout-sdk';

const api = new RoundaboutAPI('YOUR_API_TOKEN');

// List platform connections
api.platformConnections.list()
  .then(connections => console.log(connections))
  .catch(error => console.error(error));

// Get analytics
api.analytics.getSummary({ timeframe: 'weekly' })
  .then(analytics => console.log(analytics))
  .catch(error => console.error(error));
```

## Versioning

The API follows semantic versioning. The current version is v1.

Include the version in the URL path:

```
https://api.roundaboutwebtraffic.com/v1/platform-connections
```

## Conclusion

This API reference provides a comprehensive guide to integrating with the Roundabout WebTraffic platform. For additional support or questions about the API, please contact our developer support team.

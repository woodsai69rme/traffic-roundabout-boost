
# API Documentation

## ResumeBuilder Pro API Reference

### Document Information
- **Version**: 1.0
- **Last Updated**: 2025-01-31
- **Base URL**: `https://api.resumebuilder.pro/v1`

## Authentication

All API requests require authentication using JWT tokens obtained through the authentication flow.

### Authentication Header
```
Authorization: Bearer <your_jwt_token>
```

### Authentication Endpoints

#### POST /auth/login
Authenticate user with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "created_at": "2025-01-31T00:00:00Z"
  }
}
```

#### POST /auth/register
Register new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "confirm_password": "securepassword"
}
```

#### POST /auth/refresh
Refresh access token using refresh token.

**Request Body:**
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

## Resume Management

### GET /resumes
Retrieve all resumes for authenticated user.

**Query Parameters:**
- `limit` (optional): Number of resumes to return (default: 20)
- `offset` (optional): Number of resumes to skip (default: 0)
- `sort` (optional): Sort order (`created_at`, `updated_at`, `title`)

**Response:**
```json
{
  "resumes": [
    {
      "id": "uuid",
      "title": "Software Engineer Resume",
      "template_id": "modern",
      "ats_score": 85,
      "is_public": false,
      "created_at": "2025-01-31T00:00:00Z",
      "updated_at": "2025-01-31T00:00:00Z"
    }
  ],
  "total": 1,
  "limit": 20,
  "offset": 0
}
```

### POST /resumes
Create a new resume.

**Request Body:**
```json
{
  "title": "Software Engineer Resume",
  "template_id": "modern",
  "personal_info": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "location": "San Francisco, CA",
    "summary": "Experienced software engineer..."
  },
  "experience": [],
  "education": [],
  "skills": [],
  "projects": []
}
```

### GET /resumes/{id}
Retrieve specific resume by ID.

**Response:**
```json
{
  "id": "uuid",
  "title": "Software Engineer Resume",
  "template_id": "modern",
  "personal_info": { ... },
  "experience": [ ... ],
  "education": [ ... ],
  "skills": [ ... ],
  "projects": [ ... ],
  "ats_score": 85,
  "created_at": "2025-01-31T00:00:00Z",
  "updated_at": "2025-01-31T00:00:00Z"
}
```

### PUT /resumes/{id}
Update existing resume.

**Request Body:** Same as POST /resumes

### DELETE /resumes/{id}
Delete resume by ID.

**Response:**
```json
{
  "message": "Resume deleted successfully"
}
```

## Template Management

### GET /templates
Retrieve available resume templates.

**Response:**
```json
{
  "templates": [
    {
      "id": "modern",
      "name": "Modern Professional",
      "category": "Modern",
      "description": "Clean and contemporary design",
      "is_premium": false,
      "preview_url": "https://cdn.example.com/modern.png"
    }
  ]
}
```

### GET /templates/{id}
Retrieve specific template details.

## AI Services

### POST /ai/optimize
Optimize resume content with AI suggestions.

**Request Body:**
```json
{
  "resume_id": "uuid",
  "job_description": "Software Engineer position...",
  "optimization_type": "ats" // or "content", "keywords"
}
```

**Response:**
```json
{
  "suggestions": [
    {
      "type": "keyword",
      "section": "experience",
      "current": "Worked on projects",
      "suggested": "Developed and implemented software projects",
      "reason": "More specific and action-oriented"
    }
  ],
  "ats_score": 85,
  "keyword_match": 75
}
```

### POST /ai/generate-content
Generate content using AI for specific sections.

**Request Body:**
```json
{
  "section": "summary", // or "experience", "achievements"
  "context": {
    "job_title": "Software Engineer",
    "experience_years": 5,
    "skills": ["JavaScript", "React", "Node.js"]
  }
}
```

### POST /ai/analyze
Analyze resume for ATS compatibility and improvements.

**Request Body:**
```json
{
  "resume_id": "uuid",
  "job_description": "Optional job description for targeted analysis"
}
```

## Export Services

### POST /export/pdf
Generate PDF version of resume.

**Request Body:**
```json
{
  "resume_id": "uuid",
  "template_options": {
    "font_size": "medium",
    "margins": "normal",
    "color_scheme": "default"
  }
}
```

**Response:**
```json
{
  "download_url": "https://cdn.example.com/resumes/uuid.pdf",
  "expires_at": "2025-02-01T00:00:00Z"
}
```

### POST /export/docx
Generate Word document version of resume.

### POST /export/txt
Generate plain text version of resume.

## Sharing and Collaboration

### POST /resumes/{id}/share
Create shareable link for resume.

**Request Body:**
```json
{
  "is_public": true,
  "password_protected": false,
  "expires_at": "2025-12-31T23:59:59Z"
}
```

**Response:**
```json
{
  "share_token": "abc123def456",
  "share_url": "https://resumebuilder.pro/shared/abc123def456",
  "expires_at": "2025-12-31T23:59:59Z"
}
```

### GET /shared/{token}
Access shared resume via token.

### DELETE /resumes/{id}/share/{token}
Revoke sharing access.

## Analytics and Insights

### GET /analytics/resume/{id}
Get analytics for specific resume.

**Response:**
```json
{
  "views": 45,
  "downloads": 12,
  "shares": 3,
  "ats_score_history": [
    {
      "score": 85,
      "date": "2025-01-31T00:00:00Z"
    }
  ]
}
```

### GET /analytics/dashboard
Get user dashboard analytics.

## Error Handling

### Error Response Format
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "reason": "Invalid email format"
    }
  }
}
```

### Common Error Codes
- `AUTHENTICATION_REQUIRED` (401)
- `FORBIDDEN` (403)
- `NOT_FOUND` (404)
- `VALIDATION_ERROR` (400)
- `RATE_LIMIT_EXCEEDED` (429)
- `INTERNAL_ERROR` (500)

## Rate Limiting

API requests are rate limited:
- **Authenticated users**: 1000 requests per hour
- **Free tier**: 100 requests per hour
- **Premium users**: 5000 requests per hour

Rate limit headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1609459200
```

## Webhooks

### Resume Events
Subscribe to resume-related events:

- `resume.created`
- `resume.updated`
- `resume.deleted`
- `resume.shared`
- `resume.exported`

### Webhook Payload Example
```json
{
  "event": "resume.updated",
  "data": {
    "resume_id": "uuid",
    "user_id": "uuid",
    "timestamp": "2025-01-31T00:00:00Z"
  }
}
```

## SDK and Libraries

### Official SDKs
- **JavaScript/TypeScript**: `@resumebuilder/js-sdk`
- **Python**: `resumebuilder-python`
- **PHP**: `resumebuilder/php-sdk`

### Example Usage (JavaScript)
```javascript
import { ResumeBuilderAPI } from '@resumebuilder/js-sdk';

const api = new ResumeBuilderAPI({
  apiKey: 'your-api-key',
  baseURL: 'https://api.resumebuilder.pro/v1'
});

// Create resume
const resume = await api.resumes.create({
  title: 'My Resume',
  template_id: 'modern',
  personal_info: { ... }
});

// Optimize with AI
const suggestions = await api.ai.optimize({
  resume_id: resume.id,
  job_description: 'Software Engineer position...'
});
```

## Testing

### Test Environment
- **Base URL**: `https://api-test.resumebuilder.pro/v1`
- **Rate Limits**: Relaxed for testing
- **Data**: Automatically cleaned up after 24 hours

### Test Credentials
```
Email: test@resumebuilder.pro
Password: TestPassword123!
```

## Changelog

### v1.0.0 (2025-01-31)
- Initial API release
- Basic CRUD operations for resumes
- Template management
- AI optimization features
- Export functionality
- Sharing capabilities

### Migration Guide

When upgrading API versions, refer to the migration guide for breaking changes and new features.

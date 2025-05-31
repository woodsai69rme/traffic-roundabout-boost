
# Technical Architecture
## ResumeBuilder Pro

### Document Information
- **Version**: 1.0
- **Last Updated**: 2025-01-31
- **Owner**: Engineering Team

## Architecture Overview

ResumeBuilder Pro is built as a modern, cloud-native single-page application (SPA) using React and TypeScript, with a robust backend infrastructure supporting real-time collaboration, AI-powered features, and scalable document generation.

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Layer                            │
├─────────────────────────────────────────────────────────────┤
│  React SPA (TypeScript)                                     │
│  ├── UI Components (Shadcn/UI + Tailwind CSS)             │
│  ├── State Management (React Query + Zustand)              │
│  ├── Routing (React Router)                                │
│  └── Real-time Updates (WebSocket)                         │
└─────────────────────────────────────────────────────────────┘
                               │
                               │ HTTPS/WSS
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                   API Gateway Layer                         │
├─────────────────────────────────────────────────────────────┤
│  Supabase Edge Functions / Vercel Functions                │
│  ├── Authentication & Authorization                        │
│  ├── Rate Limiting & Request Validation                    │
│  ├── API Versioning & Documentation                        │
│  └── Load Balancing & Health Checks                        │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                  Application Layer                          │
├─────────────────────────────────────────────────────────────┤
│  Microservices Architecture                                 │
│  ├── Resume Service (CRUD, Templates, Export)              │
│  ├── AI Service (Content Optimization, ATS Scoring)        │
│  ├── User Service (Profiles, Preferences, Analytics)       │
│  ├── Notification Service (Email, Real-time Alerts)        │
│  └── Integration Service (Job Boards, LinkedIn, etc.)      │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    Data Layer                               │
├─────────────────────────────────────────────────────────────┤
│  Supabase PostgreSQL Database                              │
│  ├── User Data & Profiles                                  │
│  ├── Resume Content & Versions                             │
│  ├── Templates & Themes                                    │
│  ├── Analytics & Usage Metrics                             │
│  └── AI Training Data & Models                             │
└─────────────────────────────────────────────────────────────┘
```

## Frontend Architecture

### Technology Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Shadcn/UI components with Radix UI primitives
- **Styling**: Tailwind CSS with CSS-in-JS for dynamic theming
- **State Management**: React Query for server state, Zustand for client state
- **Routing**: React Router v6 with protected routes
- **Forms**: React Hook Form with Zod validation
- **Testing**: Vitest for unit tests, Playwright for E2E

### Component Architecture

```
src/
├── components/
│   ├── ui/                    # Base UI components (Shadcn/UI)
│   ├── layout/                # Layout components (Header, Footer, Sidebar)
│   ├── forms/                 # Form components and field types
│   ├── resume/                # Resume-specific components
│   │   ├── builder/           # Resume builder interface
│   │   ├── templates/         # Template components
│   │   ├── preview/           # Resume preview components
│   │   └── export/            # Export functionality
│   └── shared/                # Reusable components
├── hooks/                     # Custom React hooks
├── services/                  # API service layers
├── stores/                    # Zustand stores for global state
├── utils/                     # Utility functions and helpers
├── types/                     # TypeScript type definitions
└── pages/                     # Page-level components
```

### State Management Strategy

#### Server State (React Query)
- API data caching and synchronization
- Background refetching and updates
- Optimistic updates for user interactions
- Error handling and retry logic

#### Client State (Zustand)
- UI state (modals, loading states, selections)
- User preferences and settings
- Temporary form data and drafts
- Theme and personalization

#### Local State (React useState/useReducer)
- Component-specific state
- Form inputs and validation
- Temporary UI interactions

### Performance Optimizations

#### Code Splitting
```typescript
// Route-based code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ResumeBuilder = lazy(() => import('./pages/ResumeBuilder'));

// Component-based splitting for heavy features
const AIOptimization = lazy(() => import('./components/AIOptimization'));
```

#### Virtual Scrolling
- Large template galleries
- Resume version history
- User analytics data

#### Image Optimization
- WebP format with fallbacks
- Responsive image sizing
- Lazy loading for below-fold content
- CDN delivery for templates and assets

## Backend Architecture

### Database Design (Supabase PostgreSQL)

#### Core Tables

```sql
-- Users and Authentication
users (
  id uuid PRIMARY KEY,
  email text UNIQUE NOT NULL,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),
  subscription_tier text DEFAULT 'free',
  preferences jsonb DEFAULT '{}'
);

-- User Profiles
profiles (
  id uuid PRIMARY KEY REFERENCES users(id),
  first_name text,
  last_name text,
  phone text,
  location text,
  linkedin_url text,
  website_url text,
  bio text,
  industry text,
  experience_level text,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- Resume Data
resumes (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES users(id),
  title text NOT NULL,
  template_id text NOT NULL,
  content jsonb NOT NULL,
  settings jsonb DEFAULT '{}',
  status text DEFAULT 'draft',
  ats_score integer,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),
  is_deleted boolean DEFAULT false
);

-- Resume Versions (for history/backup)
resume_versions (
  id uuid PRIMARY KEY,
  resume_id uuid REFERENCES resumes(id),
  version_number integer NOT NULL,
  content jsonb NOT NULL,
  changes_summary text,
  created_at timestamp DEFAULT now(),
  created_by uuid REFERENCES users(id)
);

-- Templates
templates (
  id text PRIMARY KEY,
  name text NOT NULL,
  category text NOT NULL,
  description text,
  preview_image_url text,
  ats_compatibility_score integer,
  is_premium boolean DEFAULT false,
  settings jsonb DEFAULT '{}',
  created_at timestamp DEFAULT now()
);

-- AI Interactions and Analytics
ai_interactions (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES users(id),
  resume_id uuid REFERENCES resumes(id),
  interaction_type text NOT NULL, -- 'suggestion', 'optimization', 'scoring'
  input_data jsonb,
  output_data jsonb,
  processing_time_ms integer,
  created_at timestamp DEFAULT now()
);

-- User Analytics
user_analytics (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES users(id),
  event_type text NOT NULL,
  event_data jsonb,
  session_id text,
  created_at timestamp DEFAULT now()
);
```

#### Indexing Strategy
```sql
-- Performance indexes
CREATE INDEX idx_resumes_user_id ON resumes(user_id);
CREATE INDEX idx_resumes_updated_at ON resumes(updated_at DESC);
CREATE INDEX idx_resume_versions_resume_id ON resume_versions(resume_id);
CREATE INDEX idx_ai_interactions_user_id ON ai_interactions(user_id);
CREATE INDEX idx_user_analytics_user_id ON user_analytics(user_id);
CREATE INDEX idx_user_analytics_created_at ON user_analytics(created_at DESC);

-- Search indexes
CREATE INDEX idx_resumes_content_gin ON resumes USING gin(content);
CREATE INDEX idx_templates_category ON templates(category);
```

### API Design

#### RESTful Endpoints

```typescript
// Authentication
POST   /auth/register
POST   /auth/login
POST   /auth/logout
POST   /auth/refresh
POST   /auth/forgot-password
POST   /auth/reset-password

// User Management
GET    /api/users/profile
PUT    /api/users/profile
DELETE /api/users/account
GET    /api/users/preferences
PUT    /api/users/preferences

// Resume Management
GET    /api/resumes                    # List user's resumes
POST   /api/resumes                    # Create new resume
GET    /api/resumes/:id                # Get specific resume
PUT    /api/resumes/:id                # Update resume
DELETE /api/resumes/:id                # Delete resume
POST   /api/resumes/:id/duplicate      # Duplicate resume

// Resume Versions
GET    /api/resumes/:id/versions       # Get version history
POST   /api/resumes/:id/versions       # Create version snapshot
GET    /api/resumes/:id/versions/:v    # Get specific version
POST   /api/resumes/:id/restore/:v     # Restore from version

// Templates
GET    /api/templates                  # List available templates
GET    /api/templates/:id              # Get template details
GET    /api/templates/categories       # Get template categories

// AI Services
POST   /api/ai/optimize               # Content optimization
POST   /api/ai/score                  # ATS scoring
POST   /api/ai/suggestions            # Content suggestions
POST   /api/ai/keywords               # Keyword analysis

// Export Services
POST   /api/export/pdf                # Generate PDF
POST   /api/export/docx               # Generate Word document
POST   /api/export/html               # Generate HTML
GET    /api/export/:id/status         # Check export status
GET    /api/export/:id/download       # Download generated file

// Sharing
POST   /api/share/create              # Create shareable link
GET    /api/share/:token              # Access shared resume
PUT    /api/share/:token/settings     # Update sharing settings
DELETE /api/share/:token              # Revoke sharing access

// Analytics
GET    /api/analytics/dashboard       # User dashboard data
GET    /api/analytics/resume/:id      # Resume-specific analytics
POST   /api/analytics/events          # Track user events
```

#### GraphQL Schema (Future Enhancement)

```graphql
type User {
  id: ID!
  email: String!
  profile: Profile
  resumes: [Resume!]!
  subscription: Subscription!
  createdAt: DateTime!
}

type Resume {
  id: ID!
  title: String!
  template: Template!
  content: JSON!
  atsScore: Int
  status: ResumeStatus!
  versions: [ResumeVersion!]!
  analytics: ResumeAnalytics
  shareLinks: [ShareLink!]!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Template {
  id: ID!
  name: String!
  category: TemplateCategory!
  description: String
  previewUrl: String
  atsCompatibility: Int!
  isPremium: Boolean!
  settings: JSON
}

type AIOptimization {
  suggestions: [ContentSuggestion!]!
  atsScore: Int!
  keywords: [String!]!
  improvements: [Improvement!]!
}

# Mutations
type Mutation {
  createResume(input: CreateResumeInput!): Resume!
  updateResume(id: ID!, input: UpdateResumeInput!): Resume!
  optimizeContent(resumeId: ID!, content: String!): AIOptimization!
  generateExport(resumeId: ID!, format: ExportFormat!): ExportJob!
}
```

## AI/ML Architecture

### Content Optimization Pipeline

```typescript
// AI Service Architecture
interface AIService {
  // Content analysis and improvement
  analyzeContent(content: string, context: JobContext): Promise<ContentAnalysis>;
  generateSuggestions(content: string, role: string): Promise<Suggestion[]>;
  optimizeForATS(resume: Resume, jobDescription?: string): Promise<ATSOptimization>;
  
  // Scoring and feedback
  calculateATSScore(resume: Resume): Promise<ATSScore>;
  analyzeProfessionalLanguage(content: string): Promise<LanguageAnalysis>;
  checkIndustryAlignment(resume: Resume, industry: string): Promise<AlignmentScore>;
}

// AI Model Integration
class ContentOptimizer {
  private openAIClient: OpenAI;
  private vectorStore: VectorStore;
  private industryModels: Map<string, LanguageModel>;

  async optimizeContent(input: OptimizationInput): Promise<OptimizationResult> {
    // 1. Analyze current content
    const analysis = await this.analyzeContent(input.content);
    
    // 2. Generate improvements
    const suggestions = await this.generateSuggestions(analysis, input.context);
    
    // 3. Calculate ATS compatibility
    const atsScore = await this.calculateATSScore(input.resume);
    
    // 4. Return comprehensive optimization
    return {
      suggestions,
      atsScore,
      improvements: this.prioritizeImprovements(suggestions),
      estimatedImpact: this.calculateImpact(analysis, suggestions)
    };
  }
}
```

### Machine Learning Models

#### Content Enhancement Model
- **Model Type**: Fine-tuned GPT-4 for professional content
- **Training Data**: 50K+ successful resumes and job descriptions
- **Use Cases**: Bullet point improvement, action verb suggestions, quantification recommendations

#### ATS Scoring Model
- **Model Type**: Custom classification model
- **Features**: Text parsing compatibility, keyword density, format structure
- **Training Data**: ATS parsing results from major systems (Workday, Greenhouse, Lever)

#### Industry Alignment Model
- **Model Type**: Similarity matching with vector embeddings
- **Embedding Model**: OpenAI text-embedding-ada-002
- **Use Cases**: Industry-specific language suggestions, role alignment scoring

### Real-time Processing

```typescript
// WebSocket handlers for real-time AI features
class RealtimeAIHandler {
  async handleContentChange(event: ContentChangeEvent) {
    // Debounced real-time analysis
    const debouncedAnalysis = debounce(async (content) => {
      const quickAnalysis = await this.aiService.quickAnalyze(content);
      this.broadcast(event.userId, {
        type: 'content_analysis',
        data: quickAnalysis
      });
    }, 500);
    
    await debouncedAnalysis(event.content);
  }

  async handleATSScoring(event: ScoreRequestEvent) {
    // Real-time ATS scoring
    const score = await this.aiService.calculateATSScore(event.resume);
    this.broadcast(event.userId, {
      type: 'ats_score_update',
      data: { score, breakdown: score.details }
    });
  }
}
```

## Security Architecture

### Authentication & Authorization

#### Multi-Factor Authentication
```typescript
// Supabase Auth with MFA
const authConfig = {
  providers: ['email', 'google', 'linkedin'],
  mfa: {
    enabled: true,
    factors: ['totp', 'sms'],
    challengeTimeout: 300 // 5 minutes
  },
  passwordPolicy: {
    minLength: 8,
    requireUppercase: true,
    requireNumbers: true,
    requireSpecialChars: true
  }
};
```

#### Role-Based Access Control (RBAC)
```sql
-- User roles and permissions
CREATE TYPE user_role AS ENUM ('user', 'premium', 'admin', 'moderator');

-- Row Level Security policies
CREATE POLICY "Users can only access their own resumes" 
ON resumes FOR ALL 
USING (auth.uid() = user_id);

CREATE POLICY "Premium templates require subscription" 
ON templates FOR SELECT 
USING (
  NOT is_premium OR 
  EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() 
    AND subscription_tier IN ('premium', 'enterprise')
  )
);
```

### Data Protection

#### Encryption Strategy
- **Data at Rest**: AES-256 encryption for all sensitive data
- **Data in Transit**: TLS 1.3 for all communications
- **Application-Level Encryption**: Additional encryption for PII fields

#### Privacy Compliance
```typescript
// GDPR compliance utilities
class DataPrivacyManager {
  async anonymizeUserData(userId: string): Promise<void> {
    // Remove or hash personally identifiable information
    await this.database.transaction(async (trx) => {
      await trx('users').where('id', userId).update({
        email: `deleted_${uuid()}@example.com`,
        first_name: null,
        last_name: null,
        phone: null,
        location: null
      });
      
      await trx('resumes').where('user_id', userId).update({
        content: this.scrubPII(resume.content)
      });
    });
  }

  async exportUserData(userId: string): Promise<UserDataExport> {
    // GDPR Article 20 - Right to data portability
    return {
      profile: await this.getUserProfile(userId),
      resumes: await this.getUserResumes(userId),
      analytics: await this.getUserAnalytics(userId),
      exportedAt: new Date()
    };
  }
}
```

### Infrastructure Security

#### Network Security
- **WAF**: Web Application Firewall with OWASP rule sets
- **DDoS Protection**: Rate limiting and traffic analysis
- **VPN Access**: Secure administrative access
- **Network Segmentation**: Isolated environments for different services

#### Monitoring & Logging
```typescript
// Security monitoring
class SecurityMonitor {
  async detectAnomalousActivity(event: UserEvent): Promise<void> {
    const patterns = [
      'rapid_password_attempts',
      'unusual_login_locations',
      'bulk_data_access',
      'suspicious_ai_usage'
    ];

    for (const pattern of patterns) {
      if (await this.checkPattern(pattern, event)) {
        await this.triggerSecurityAlert(pattern, event);
      }
    }
  }

  async auditDataAccess(userId: string, action: string, resource: string): Promise<void> {
    await this.logSecurityEvent({
      userId,
      action,
      resource,
      timestamp: new Date(),
      ipAddress: this.getClientIP(),
      userAgent: this.getUserAgent()
    });
  }
}
```

## Scalability & Performance

### Horizontal Scaling Strategy

#### Microservices Deployment
```yaml
# Kubernetes deployment example
apiVersion: apps/v1
kind: Deployment
metadata:
  name: resume-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: resume-service
  template:
    spec:
      containers:
      - name: resume-service
        image: resumebuilder/resume-service:latest
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: database-secrets
              key: url
```

#### Auto-Scaling Configuration
```typescript
// Auto-scaling based on metrics
const scalingConfig = {
  metrics: {
    cpu: { threshold: 70, scaleUp: 2, scaleDown: 1 },
    memory: { threshold: 80, scaleUp: 2, scaleDown: 1 },
    requestRate: { threshold: 1000, scaleUp: 3, scaleDown: 2 }
  },
  limits: {
    minReplicas: 2,
    maxReplicas: 20,
    cooldownPeriod: '5m'
  }
};
```

### Caching Strategy

#### Multi-Level Caching
```typescript
// Redis caching implementation
class CacheManager {
  private redis: Redis;
  private localCache: LRUCache;

  async get<T>(key: string): Promise<T | null> {
    // 1. Check local cache first (fastest)
    let value = this.localCache.get(key);
    if (value) return value;

    // 2. Check Redis cache (fast)
    value = await this.redis.get(key);
    if (value) {
      this.localCache.set(key, value);
      return JSON.parse(value);
    }

    return null;
  }

  async set(key: string, value: any, ttl: number = 3600): Promise<void> {
    // Store in both caches
    this.localCache.set(key, value);
    await this.redis.setex(key, ttl, JSON.stringify(value));
  }
}

// Cache strategies by data type
const cacheStrategies = {
  templates: { ttl: 86400, level: 'cdn' },      // 24 hours, CDN
  userProfiles: { ttl: 3600, level: 'redis' },  // 1 hour, Redis
  resumeContent: { ttl: 300, level: 'local' },  // 5 minutes, local
  atsScores: { ttl: 1800, level: 'redis' },     // 30 minutes, Redis
  aiSuggestions: { ttl: 600, level: 'memory' }  // 10 minutes, memory
};
```

### Database Performance

#### Connection Pooling
```typescript
// Supabase connection optimization
const supabaseConfig = {
  pooling: {
    enabled: true,
    minConnections: 5,
    maxConnections: 50,
    acquireTimeoutMillis: 30000,
    idleTimeoutMillis: 600000
  },
  logging: {
    slowQueryThreshold: 1000, // Log queries > 1 second
    enableQueryLogging: process.env.NODE_ENV === 'development'
  }
};
```

#### Query Optimization
```sql
-- Optimized queries with proper indexing
EXPLAIN ANALYZE 
SELECT r.*, t.name as template_name, t.category
FROM resumes r
JOIN templates t ON r.template_id = t.id
WHERE r.user_id = $1 
  AND r.is_deleted = false
ORDER BY r.updated_at DESC
LIMIT 20;

-- Materialized views for analytics
CREATE MATERIALIZED VIEW user_resume_stats AS
SELECT 
  user_id,
  COUNT(*) as total_resumes,
  AVG(ats_score) as avg_ats_score,
  MAX(updated_at) as last_activity
FROM resumes
WHERE is_deleted = false
GROUP BY user_id;

-- Refresh strategy
CREATE OR REPLACE FUNCTION refresh_user_stats()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY user_resume_stats;
END;
$$ LANGUAGE plpgsql;
```

## Monitoring & Observability

### Application Performance Monitoring (APM)

```typescript
// Performance monitoring integration
import { trace, SpanStatusCode } from '@opentelemetry/api';

class PerformanceMonitor {
  async trackOperation<T>(
    operationName: string,
    operation: () => Promise<T>,
    metadata?: Record<string, any>
  ): Promise<T> {
    const span = trace.getActiveTracer().startSpan(operationName);
    
    try {
      const startTime = Date.now();
      const result = await operation();
      const duration = Date.now() - startTime;
      
      span.setAttributes({
        'operation.duration': duration,
        'operation.success': true,
        ...metadata
      });
      
      // Alert on slow operations
      if (duration > 5000) {
        this.alertSlowOperation(operationName, duration, metadata);
      }
      
      return result;
    } catch (error) {
      span.recordException(error as Error);
      span.setStatus({ code: SpanStatusCode.ERROR });
      throw error;
    } finally {
      span.end();
    }
  }
}
```

### Health Checks & Alerting

```typescript
// Comprehensive health monitoring
class HealthMonitor {
  async performHealthCheck(): Promise<HealthStatus> {
    const checks = await Promise.allSettled([
      this.checkDatabase(),
      this.checkRedis(),
      this.checkAIServices(),
      this.checkExternalAPIs(),
      this.checkFileStorage()
    ]);

    const results = checks.map((check, index) => ({
      service: this.serviceNames[index],
      healthy: check.status === 'fulfilled',
      latency: check.status === 'fulfilled' ? check.value.latency : null,
      error: check.status === 'rejected' ? check.reason.message : null
    }));

    return {
      overall: results.every(r => r.healthy),
      services: results,
      timestamp: new Date()
    };
  }

  async checkDatabase(): Promise<{ latency: number }> {
    const start = Date.now();
    await this.database.raw('SELECT 1');
    return { latency: Date.now() - start };
  }
}
```

This technical architecture provides a solid foundation for ResumeBuilder Pro's scalability, security, and performance requirements while maintaining flexibility for future enhancements and integrations.

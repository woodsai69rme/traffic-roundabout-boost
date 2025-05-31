
# Deployment Guide

## ResumeBuilder Pro Deployment Strategy

### Document Information
- **Version**: 1.0
- **Last Updated**: 2025-01-31
- **Platform**: Vercel + Supabase
- **Environments**: Development, Staging, Production

## Overview

ResumeBuilder Pro uses a modern deployment strategy with:
- **Frontend**: Vercel for hosting and edge functions
- **Backend**: Supabase for database, authentication, and serverless functions
- **CDN**: Vercel Edge Network for global content delivery
- **Monitoring**: Vercel Analytics + Sentry for error tracking

## Environments

### Environment Strategy
- **Development**: Local development with hot reloading
- **Preview**: Automatic deployments for every pull request
- **Staging**: Pre-production testing environment
- **Production**: Live application serving users

### Environment Configuration

#### Development
```bash
# .env.local
NODE_ENV=development
VITE_APP_URL=http://localhost:3000
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

#### Staging
```bash
# Environment variables in Vercel dashboard
NODE_ENV=staging
VITE_APP_URL=https://staging.resumebuilder.pro
VITE_SUPABASE_URL=https://staging-project.supabase.co
VITE_SUPABASE_ANON_KEY=staging-anon-key
```

#### Production
```bash
# Environment variables in Vercel dashboard
NODE_ENV=production
VITE_APP_URL=https://resumebuilder.pro
VITE_SUPABASE_URL=https://prod-project.supabase.co
VITE_SUPABASE_ANON_KEY=prod-anon-key
```

## Vercel Deployment

### Project Setup

1. **Connect Repository**
```bash
# Install Vercel CLI
npm i -g vercel

# Login and connect project
vercel login
vercel --prod
```

2. **Configuration File** (`vercel.json`):
```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "functions": {
    "app/api/**/*.ts": {
      "runtime": "@vercel/node"
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        }
      ]
    },
    {
      "source": "/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/app",
      "destination": "/dashboard",
      "permanent": true
    }
  ]
}
```

### Build Configuration

**Vite Configuration** (`vite.config.ts`):
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    target: 'es2020',
    outDir: 'dist',
    assetsDir: 'static',
    sourcemap: process.env.NODE_ENV !== 'production',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          utils: ['clsx', 'tailwind-merge', 'date-fns'],
          supabase: ['@supabase/supabase-js']
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: process.env.NODE_ENV === 'production',
        drop_debugger: true
      }
    }
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
  }
});
```

### Environment Variables Setup

#### Required Environment Variables
```bash
# Supabase
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# OpenAI (for AI features)
OPENAI_API_KEY=

# Stripe (for payments)
VITE_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Email
SENDGRID_API_KEY=

# Analytics
VITE_GOOGLE_ANALYTICS_ID=
VITE_POSTHOG_KEY=

# Error Tracking
VITE_SENTRY_DSN=
SENTRY_AUTH_TOKEN=

# App Configuration
VITE_APP_URL=
VITE_APP_NAME="ResumeBuilder Pro"
```

#### Setting Variables in Vercel
```bash
# Via CLI
vercel env add VITE_SUPABASE_URL production
vercel env add OPENAI_API_KEY production

# Or via dashboard at vercel.com/[team]/[project]/settings/environment-variables
```

## Supabase Deployment

### Database Setup

1. **Create Supabase Project**
```bash
# Create new project at supabase.com
# Note: Use different projects for staging/production
```

2. **Run Migrations**
```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link to project
supabase link --project-ref your-project-ref

# Push database schema
supabase db push

# Generate TypeScript types
supabase gen types typescript --linked > src/types/database.ts
```

### Edge Functions Deployment

```bash
# Deploy all edge functions
supabase functions deploy

# Deploy specific function
supabase functions deploy ai-optimize

# Set secrets for functions
supabase secrets set OPENAI_API_KEY=your-key
supabase secrets set STRIPE_SECRET_KEY=your-key
```

### Row Level Security Setup

Ensure RLS is properly configured:
```sql
-- Enable RLS on all tables
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies (as defined in database schema)
CREATE POLICY "Users can only access own resumes" ON resumes
FOR ALL USING (auth.uid() = user_id);
```

## CI/CD Pipeline

### GitHub Actions Workflow

**.github/workflows/deploy.yml**:
```yaml
name: Deploy to Vercel

on:
  push:
    branches:
      - main
      - develop
  pull_request:
    branches:
      - main

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test
      - run: npm run build

  deploy-preview:
    needs: test
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          scope: ${{ secrets.VERCEL_ORG_ID }}

  deploy-staging:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/develop'
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          scope: ${{ secrets.VERCEL_ORG_ID }}

  deploy-production:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run build
      
      # Run additional production checks
      - run: npm run test:e2e
      - run: npm run lighthouse-ci
      
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          scope: ${{ secrets.VERCEL_ORG_ID }}
      
      # Update Supabase production
      - run: |
          echo "${{ secrets.SUPABASE_ACCESS_TOKEN }}" | supabase login --token
          supabase link --project-ref ${{ secrets.SUPABASE_PROJECT_ID }}
          supabase db push
          supabase functions deploy
```

## Database Migrations

### Migration Strategy

1. **Development to Staging**
```bash
# Generate migration from local changes
supabase db diff --schema public > migrations/new_migration.sql

# Apply to staging
supabase db push --project-ref staging-project-ref
```

2. **Staging to Production**
```bash
# Backup production database first
supabase db dump --project-ref prod-ref --data-only > backup.sql

# Apply migration
supabase db push --project-ref prod-ref

# If issues occur, restore from backup
supabase db reset --project-ref prod-ref
psql -h db.xxx.supabase.co -U postgres -d postgres < backup.sql
```

### Safe Migration Practices

```sql
-- Example safe migration pattern
BEGIN;

-- 1. Add new column (safe)
ALTER TABLE resumes ADD COLUMN new_field TEXT;

-- 2. Populate with default data (safe)
UPDATE resumes SET new_field = 'default_value' WHERE new_field IS NULL;

-- 3. Add constraint after data is populated (safe)
ALTER TABLE resumes ALTER COLUMN new_field SET NOT NULL;

COMMIT;
```

## Performance Optimization

### Build Optimization

**Package.json Scripts**:
```json
{
  "scripts": {
    "build": "vite build",
    "build:analyze": "vite build && npx vite-bundle-analyzer dist/stats.html",
    "build:clean": "rm -rf dist && npm run build",
    "build:prod": "NODE_ENV=production npm run build:clean"
  }
}
```

### Bundle Splitting

```typescript
// vite.config.ts - Advanced code splitting
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React
          'react-vendor': ['react', 'react-dom'],
          
          // UI Components
          'ui-vendor': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-select',
            '@radix-ui/react-toast'
          ],
          
          // Form handling
          'form-vendor': ['react-hook-form', 'zod'],
          
          // Utilities
          'utils-vendor': ['clsx', 'tailwind-merge', 'date-fns'],
          
          // Data fetching
          'query-vendor': ['@tanstack/react-query'],
          
          // Supabase
          'supabase-vendor': ['@supabase/supabase-js'],
          
          // Charts and visualization
          'chart-vendor': ['recharts'],
          
          // Rich text editing
          'editor-vendor': ['@tiptap/react', '@tiptap/core']
        }
      }
    }
  }
});
```

### CDN and Caching

**Vercel Edge Config**:
```json
{
  "headers": [
    {
      "source": "/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*).js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*).css",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## Monitoring and Health Checks

### Health Check Endpoint

**api/health.ts**:
```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    // Check database connection
    const { error: dbError } = await supabase
      .from('resumes')
      .select('count')
      .limit(1);

    if (dbError) throw dbError;

    // Check external services
    const checks = {
      database: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.VERCEL_GIT_COMMIT_SHA || 'unknown'
    };

    res.status(200).json({
      status: 'healthy',
      checks
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
```

### Error Tracking with Sentry

**lib/sentry.ts**:
```typescript
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.VITE_SENTRY_DSN,
    integrations: [
      new BrowserTracing(),
    ],
    tracesSampleRate: 0.1,
    environment: process.env.NODE_ENV,
    beforeSend(event) {
      // Filter out non-critical errors
      if (event.exception) {
        const error = event.exception.values?.[0];
        if (error?.type === 'ChunkLoadError') {
          return null; // Don't send chunk load errors
        }
      }
      return event;
    }
  });
}
```

### Performance Monitoring

**lib/analytics.ts**:
```typescript
// Web Vitals monitoring
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric: any) {
  // Send to your analytics service
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true
    });
  }
}

// Measure Core Web Vitals
getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

## Security Considerations

### Environment Security
- Never commit secrets to version control
- Use Vercel environment variables for all sensitive data
- Rotate API keys regularly
- Use different credentials for each environment

### Content Security Policy

**Security Headers** (in `vercel.json`):
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co; font-src 'self' https://fonts.gstatic.com;"
        }
      ]
    }
  ]
}
```

## Rollback Strategy

### Quick Rollback Process

1. **Via Vercel Dashboard**
   - Go to Deployments tab
   - Click "Promote to Production" on previous stable deployment

2. **Via CLI**
```bash
# List recent deployments
vercel ls

# Promote specific deployment
vercel promote [deployment-url] --scope=team-name
```

3. **Database Rollback**
```bash
# Restore from backup (if schema changes)
supabase db reset --project-ref your-project-ref
psql -h your-db-host -U postgres -d postgres < backup-file.sql
```

### Deployment Checklist

**Pre-Deployment**:
- [ ] All tests passing
- [ ] Security scan completed
- [ ] Performance benchmarks met
- [ ] Database migrations tested
- [ ] Environment variables updated
- [ ] Third-party services verified

**Post-Deployment**:
- [ ] Health checks passing
- [ ] Core user flows tested
- [ ] Error rates normal
- [ ] Performance metrics stable
- [ ] Database connections healthy
- [ ] CDN cache invalidated if needed

This deployment strategy ensures reliable, scalable, and maintainable deployments for ResumeBuilder Pro across all environments.

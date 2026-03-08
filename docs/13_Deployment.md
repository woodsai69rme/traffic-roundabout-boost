# 13. Deployment

## Environments
- **Preview**: Auto-deployed on every commit via Lovable
- **Production**: Published via Lovable's publish action

## URLs
- **Preview**: `https://id-preview--<project-id>.lovable.app`
- **Production**: `https://traffic-roundabout-boost.lovable.app`
- **Custom Domain**: Configurable in Lovable settings

## Backend
- **Database**: PostgreSQL via Lovable Cloud (auto-managed)
- **Edge Functions**: Auto-deployed on save
- **Storage**: Lovable Cloud storage buckets

## CI/CD Pipeline
1. Code changes made in Lovable editor
2. Preview auto-builds and deploys
3. User verifies in preview
4. Click "Publish" to deploy to production
5. Custom domain DNS points to published URL

## Environment Variables
Managed automatically by Lovable Cloud:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

## Rollback
- Restore to any previous version via Lovable version history
- Database migrations are incremental (no auto-rollback)

## Performance
- Vite production build with tree-shaking and code-splitting
- Static assets served via CDN
- Lazy loading for route-level code splitting

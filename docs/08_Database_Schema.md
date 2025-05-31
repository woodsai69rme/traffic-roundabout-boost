
# Database Schema

## ResumeBuilder Pro Database Design

### Document Information
- **Version**: 1.0
- **Last Updated**: 2025-01-31
- **Database**: PostgreSQL 15+
- **ORM**: Supabase (PostgREST)

## Overview

The ResumeBuilder Pro database is designed to support a comprehensive resume building platform with user management, resume storage, template management, AI optimization, and analytics tracking.

## Core Tables

### users (Supabase Auth Schema)
Managed by Supabase Auth - not directly accessible via API.

### profiles
User profile information extending Supabase Auth users.

```sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'free',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Indexes:**
- Primary key on `id`
- Unique index on `username`
- Index on `subscription_tier`

**Relationships:**
- `id` → `auth.users.id` (CASCADE DELETE)

### resumes
Core resume data storage.

```sql
CREATE TABLE public.resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users,
  title TEXT NOT NULL,
  template_id TEXT NOT NULL DEFAULT 'modern',
  personal_info JSONB NOT NULL DEFAULT '{}',
  experience JSONB NOT NULL DEFAULT '[]',
  education JSONB NOT NULL DEFAULT '[]',
  skills JSONB NOT NULL DEFAULT '[]',
  certifications JSONB NOT NULL DEFAULT '[]',
  projects JSONB NOT NULL DEFAULT '[]',
  languages JSONB NOT NULL DEFAULT '[]',
  references JSONB NOT NULL DEFAULT '[]',
  custom_sections JSONB NOT NULL DEFAULT '[]',
  ats_score INTEGER DEFAULT 0,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Indexes:**
- Primary key on `id`
- Index on `user_id`
- Index on `template_id`
- Index on `ats_score`
- Index on `created_at`
- GIN index on `personal_info`
- GIN index on `skills`

**JSON Structure Examples:**

**personal_info:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "location": "San Francisco, CA",
  "website": "https://johndoe.com",
  "linkedin": "https://linkedin.com/in/johndoe",
  "summary": "Experienced software engineer..."
}
```

**experience:**
```json
[
  {
    "id": "uuid",
    "company": "Tech Corp",
    "position": "Senior Software Engineer",
    "location": "San Francisco, CA",
    "startDate": "2020-01",
    "endDate": "2023-12",
    "current": false,
    "description": "Led development of...",
    "achievements": [
      "Increased system performance by 40%",
      "Led a team of 5 developers"
    ]
  }
]
```

**skills:**
```json
[
  {
    "id": "uuid",
    "name": "JavaScript",
    "level": "Expert",
    "category": "Technical"
  }
]
```

### resume_templates
Available resume templates.

```sql
CREATE TABLE public.resume_templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  preview_url TEXT,
  is_premium BOOLEAN DEFAULT false,
  config JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Sample Data:**
```sql
INSERT INTO resume_templates (id, name, category, description, is_premium) VALUES
('modern', 'Modern Professional', 'Modern', 'Clean contemporary design', false),
('classic', 'Classic Executive', 'Classic', 'Traditional corporate layout', true),
('creative', 'Creative Designer', 'Creative', 'Bold design for creatives', false);
```

### resume_shares
Sharing and collaboration for resumes.

```sql
CREATE TABLE public.resume_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resume_id UUID NOT NULL REFERENCES public.resumes ON DELETE CASCADE,
  share_token TEXT UNIQUE NOT NULL,
  is_public BOOLEAN DEFAULT false,
  password_protected BOOLEAN DEFAULT false,
  password_hash TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Indexes:**
- Primary key on `id`
- Unique index on `share_token`
- Index on `resume_id`
- Index on `expires_at`

## AI and Optimization Tables

### ai_optimizations
Track AI optimization history and suggestions.

```sql
CREATE TABLE public.ai_optimizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resume_id UUID NOT NULL REFERENCES public.resumes ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users,
  optimization_type TEXT NOT NULL, -- 'ats', 'content', 'keywords'
  input_data JSONB NOT NULL,
  suggestions JSONB NOT NULL,
  ats_score_before INTEGER,
  ats_score_after INTEGER,
  applied BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Indexes:**
- Primary key on `id`
- Index on `resume_id`
- Index on `user_id`
- Index on `optimization_type`
- Index on `created_at`

### keyword_analysis
Store keyword analysis results for job matching.

```sql
CREATE TABLE public.keyword_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resume_id UUID NOT NULL REFERENCES public.resumes ON DELETE CASCADE,
  job_description_hash TEXT NOT NULL,
  matched_keywords JSONB NOT NULL DEFAULT '[]',
  missing_keywords JSONB NOT NULL DEFAULT '[]',
  keyword_score INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Analytics and Tracking Tables

### resume_analytics
Track resume performance and engagement.

```sql
CREATE TABLE public.resume_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resume_id UUID NOT NULL REFERENCES public.resumes ON DELETE CASCADE,
  event_type TEXT NOT NULL, -- 'view', 'download', 'share', 'export'
  event_data JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Indexes:**
- Primary key on `id`
- Index on `resume_id`
- Index on `event_type`
- Index on `created_at`

### user_activity
Track user engagement and feature usage.

```sql
CREATE TABLE public.user_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users,
  activity_type TEXT NOT NULL,
  activity_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Export and Generation Tables

### export_jobs
Track PDF/Word export generation jobs.

```sql
CREATE TABLE public.export_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resume_id UUID NOT NULL REFERENCES public.resumes,
  user_id UUID NOT NULL REFERENCES auth.users,
  export_format TEXT NOT NULL, -- 'pdf', 'docx', 'txt'
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
  file_url TEXT,
  error_message TEXT,
  export_options JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);
```

## Subscription and Billing Tables

### subscriptions
User subscription management.

```sql
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users,
  plan_id TEXT NOT NULL,
  status TEXT NOT NULL, -- 'active', 'canceled', 'past_due', 'expired'
  current_period_start TIMESTAMP WITH TIME ZONE NOT NULL,
  current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  stripe_subscription_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### usage_tracking
Track feature usage for billing and limits.

```sql
CREATE TABLE public.usage_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users,
  feature TEXT NOT NULL, -- 'ai_optimization', 'pdf_export', 'resume_creation'
  usage_count INTEGER DEFAULT 1,
  billing_period_start DATE NOT NULL,
  billing_period_end DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Row Level Security (RLS) Policies

### resumes Table Policies

```sql
-- Users can only see their own resumes
CREATE POLICY "Users can view own resumes" ON resumes
  FOR SELECT USING (auth.uid() = user_id);

-- Users can create resumes
CREATE POLICY "Users can create resumes" ON resumes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own resumes
CREATE POLICY "Users can update own resumes" ON resumes
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own resumes
CREATE POLICY "Users can delete own resumes" ON resumes
  FOR DELETE USING (auth.uid() = user_id);
```

### resume_shares Table Policies

```sql
-- Users can view shares for their resumes
CREATE POLICY "Users can view their resume shares" ON resume_shares
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM resumes 
      WHERE resumes.id = resume_shares.resume_id 
      AND resumes.user_id = auth.uid()
    )
  );

-- Public access to shared resumes
CREATE POLICY "Public can view shared resumes" ON resume_shares
  FOR SELECT USING (is_public = true AND (expires_at IS NULL OR expires_at > NOW()));
```

## Database Functions

### Update Timestamp Function

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';
```

### ATS Score Calculation Function

```sql
CREATE OR REPLACE FUNCTION calculate_ats_score(resume_data JSONB)
RETURNS INTEGER AS $$
DECLARE
    score INTEGER := 0;
    personal_info JSONB;
    experience JSONB;
    skills JSONB;
BEGIN
    personal_info := resume_data->>'personal_info';
    experience := resume_data->>'experience';
    skills := resume_data->>'skills';
    
    -- Check personal info completeness (20 points)
    IF personal_info ? 'firstName' AND personal_info ? 'lastName' 
       AND personal_info ? 'email' AND personal_info ? 'phone' THEN
        score := score + 20;
    END IF;
    
    -- Check professional summary (15 points)
    IF LENGTH(personal_info->>'summary') > 50 THEN
        score := score + 15;
    END IF;
    
    -- Check experience (30 points)
    IF JSONB_ARRAY_LENGTH(experience) > 0 THEN
        score := score + 30;
    END IF;
    
    -- Check skills (15 points)
    IF JSONB_ARRAY_LENGTH(skills) >= 5 THEN
        score := score + 15;
    END IF;
    
    -- Additional scoring logic...
    
    RETURN LEAST(score, 100);
END;
$$ LANGUAGE plpgsql;
```

## Database Triggers

### Auto-update timestamps

```sql
CREATE TRIGGER update_resumes_updated_at 
  BEFORE UPDATE ON resumes 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Auto-calculate ATS score

```sql
CREATE OR REPLACE FUNCTION update_ats_score()
RETURNS TRIGGER AS $$
BEGIN
    NEW.ats_score := calculate_ats_score(
        jsonb_build_object(
            'personal_info', NEW.personal_info,
            'experience', NEW.experience,
            'skills', NEW.skills,
            'education', NEW.education
        )
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_ats_score_trigger
    BEFORE INSERT OR UPDATE ON resumes
    FOR EACH ROW EXECUTE FUNCTION update_ats_score();
```

## Indexes for Performance

### Composite Indexes

```sql
-- Resume search and filtering
CREATE INDEX idx_resumes_user_created ON resumes(user_id, created_at DESC);
CREATE INDEX idx_resumes_user_ats_score ON resumes(user_id, ats_score DESC);

-- Analytics queries
CREATE INDEX idx_analytics_resume_event_date ON resume_analytics(resume_id, event_type, created_at);
CREATE INDEX idx_analytics_user_activity ON user_activity(user_id, activity_type, created_at);

-- Sharing and public access
CREATE INDEX idx_shares_public_active ON resume_shares(is_public, expires_at) 
  WHERE is_public = true;
```

### Full-Text Search Indexes

```sql
-- Enable full-text search on resume content
CREATE INDEX idx_resumes_content_search ON resumes 
  USING GIN (to_tsvector('english', 
    COALESCE(personal_info->>'summary', '') || ' ' ||
    COALESCE(title, '')
  ));
```

## Data Retention and Cleanup

### Automatic Cleanup Jobs

```sql
-- Clean up expired shares
DELETE FROM resume_shares 
WHERE expires_at < NOW() - INTERVAL '7 days';

-- Clean up old analytics data (keep 2 years)
DELETE FROM resume_analytics 
WHERE created_at < NOW() - INTERVAL '2 years';

-- Clean up old export jobs (keep 30 days)
DELETE FROM export_jobs 
WHERE created_at < NOW() - INTERVAL '30 days';
```

## Backup and Recovery Strategy

### Daily Backups
- Full database backup daily at 2 AM UTC
- Transaction log backups every 15 minutes
- Point-in-time recovery capability

### Data Archival
- Analytics data older than 2 years archived to cold storage
- Deleted resumes soft-deleted for 30 days before permanent removal

## Performance Considerations

### Query Optimization
- Use appropriate indexes for common query patterns
- JSONB queries optimized with GIN indexes
- Pagination implemented for large result sets

### Scaling Strategy
- Read replicas for analytics queries
- Connection pooling for high concurrency
- Partitioning for large analytics tables

This schema supports the full functionality of ResumeBuilder Pro while maintaining performance, security, and scalability requirements.

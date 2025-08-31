
# 🚀 ROUNDABOUT - COMPLETE PROJECT RECREATION PROMPT

## 📋 Project Overview
**Roundabout** is a comprehensive social media management platform built with React, TypeScript, Tailwind CSS, and Supabase. It enables content creators, marketers, and businesses to manage their social media presence across multiple platforms from a single dashboard.

## 🎯 Core Features to Implement

### 1. Authentication System
- Email/password authentication via Supabase Auth
- User registration and login flows
- Password reset functionality
- Protected routes and session management
- User profile management

### 2. Dashboard & Analytics
- Unified analytics dashboard aggregating data from all connected platforms
- Real-time performance metrics (followers, engagement, reach)
- Interactive charts using Recharts library
- Date range filtering and export capabilities
- Audience insights and demographics

### 3. Platform Integrations
- OAuth connections to major social platforms:
  - Instagram Business/Creator accounts
  - Twitter/X API v2
  - Facebook Pages
  - LinkedIn Company Pages
  - TikTok Business accounts
  - YouTube Channels
- Secure credential storage with encryption
- Connection health monitoring
- Rate limit tracking

### 4. Content Management
- Rich content composer with platform-specific formatting
- Multi-platform publishing
- Content scheduling with calendar view
- Draft management and templates
- Media upload and optimization
- Bulk operations

### 5. AI-Powered Features
- Content generation using OpenAI GPT models
- Hashtag recommendations and analysis
- Optimal posting time predictions
- Trend analysis and insights
- Automated content optimization

### 6. Team Collaboration
- Multi-user workspaces
- Role-based access control (Admin, Editor, Viewer)
- Content approval workflows
- Team activity logs
- Shared asset libraries

### 7. Data Management
- Import/export functionality for all user data
- Backup and restore capabilities
- Data portability across platforms
- GDPR compliance features
- Audit logging

## 🛠 Technology Stack

### Frontend
```typescript
- React 18+ with TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- shadcn/ui (component library)
- React Router (routing)
- TanStack Query (state management)
- Lucide React (icons)
- Recharts (data visualization)
```

### Backend
```typescript
- Supabase (BaaS)
  - PostgreSQL database
  - Row Level Security (RLS)
  - Real-time subscriptions
  - Edge Functions (Deno)
  - File Storage
  - Authentication
```

### External Integrations
```typescript
- OpenAI API (AI content generation)
- Social Media Platform APIs
- Email service provider
- Payment processing (Stripe)
```

## 📁 Project Structure
```
roundabout/
├── docs/                          # Complete documentation suite
│   ├── prompts/                   # All generation prompts
│   ├── setup.md                   # Setup instructions
│   ├── deployment.md              # Deployment guides
│   ├── api.md                     # API documentation
│   └── ...                        # Additional docs
├── public/                        # Static assets
│   ├── platforms/                 # Platform icons
│   └── ...
├── src/
│   ├── components/                # React components
│   │   ├── ui/                    # Base UI components (shadcn)
│   │   ├── ApiIntegrations/       # Platform integration components
│   │   ├── AudienceInsights/      # Analytics components
│   │   ├── ContentScheduler/      # Content management components
│   │   └── ...
│   ├── hooks/                     # Custom React hooks
│   ├── integrations/              # Supabase integration
│   ├── lib/                       # Utility functions
│   ├── pages/                     # Page components
│   ├── services/                  # API services
│   ├── types/                     # TypeScript definitions
│   └── utils/                     # Helper functions
├── supabase/                      # Supabase configuration
│   ├── migrations/                # Database migrations
│   └── functions/                 # Edge Functions
├── scripts/                       # Build and deployment scripts
├── tests/                         # Test files
└── ...
```

## 🔧 Implementation Guidelines

### 1. Authentication Implementation
```typescript
// Use Supabase Auth with proper session management
const authContext = {
  user: User | null,
  session: Session | null,
  loading: boolean,
  signIn: (email: string, password: string) => Promise<{error: any}>,
  signUp: (email: string, password: string) => Promise<{error: any}>,
  signOut: () => Promise<void>
}

// Always include emailRedirectTo for signup
const signUp = async (email: string, password: string) => {
  const redirectUrl = `${window.location.origin}/`;
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: redirectUrl }
  });
  return { error };
};
```

### 2. Database Schema
```sql
-- Core tables needed
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE platform_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  platform TEXT NOT NULL,
  api_key TEXT,
  api_secret TEXT,
  access_token TEXT,
  access_token_secret TEXT,
  connected BOOLEAN DEFAULT FALSE,
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, platform)
);

-- Add RLS policies for all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON profiles 
  FOR SELECT USING (auth.uid() = id);
-- ... more policies
```

### 3. Component Architecture
- Use atomic design principles (atoms → molecules → organisms)
- Implement proper TypeScript interfaces
- Follow shadcn/ui patterns for consistency
- Use proper error boundaries
- Implement loading states and skeletons

### 4. State Management
```typescript
// Use TanStack Query for server state
const { data, isLoading, error } = useQuery({
  queryKey: ['platforms', userId],
  queryFn: () => fetchPlatforms(userId),
  enabled: !!userId
});

// Use React Context for global UI state
// Use useState/useReducer for local component state
```

### 5. Security Considerations
- Implement Row Level Security (RLS) on all database tables
- Encrypt sensitive data (API keys, tokens)
- Use secure headers and CORS policies
- Implement rate limiting
- Validate all inputs on client and server
- Use HTTPS everywhere

## 🚀 Deployment Requirements

### 1. Multi-Platform Support
The project must be deployable on:
- **Vercel** (primary recommendation)
- **Netlify**
- **Railway**
- **Render**
- **Fly.io**
- **Docker** (containerized deployment)
- **Local development** (all platforms)

### 2. Database Flexibility
- Primary: Supabase PostgreSQL
- Fallback: Local PostgreSQL
- Development: SQLite option
- Include migration scripts for all database types

### 3. Environment Configuration
```bash
# Required environment variables
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_key
STRIPE_PUBLIC_KEY=your_stripe_key
# ... additional vars
```

## 📚 Documentation Requirements

### Essential Documentation Files
1. **README.md** - Project overview and quick start
2. **setup.md** - Detailed setup instructions
3. **deployment.md** - Platform-specific deployment guides
4. **api.md** - API endpoint documentation
5. **testing.md** - Testing strategy and commands
6. **config.md** - Configuration options
7. **troubleshooting.md** - Common issues and solutions
8. **changelog.md** - Version history
9. **audit_report.md** - Code quality and security audit

### Advanced Documentation
- Architecture decision records (ADRs)
- Performance optimization guides
- Security implementation details
- Scaling considerations
- Monitoring and observability setup

## 🧪 Testing Strategy

### Test Types
```typescript
// Unit tests (Vitest + React Testing Library)
describe('AuthContext', () => {
  test('should handle user login', async () => {
    // Test implementation
  });
});

// Integration tests
describe('Platform Integration', () => {
  test('should connect to Instagram API', async () => {
    // Test API integration
  });
});

// E2E tests (Playwright)
test('complete user journey', async ({ page }) => {
  // Test full user flow
});
```

### Test Coverage Requirements
- Minimum 80% code coverage
- All critical user journeys covered
- API endpoint testing
- Database operation testing
- Security vulnerability testing

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow
```yaml
name: CI/CD Pipeline
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm run test:coverage
      - name: Build project
        run: npm run build
  
  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Vercel
        # Deployment steps
```

## 📦 Scripts and Automation

### Essential Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "test": "vitest",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "db:migrate": "supabase db reset",
    "db:seed": "supabase db seed",
    "setup": "node scripts/setup.js",
    "deploy": "node scripts/deploy.js"
  }
}
```

### Automation Scripts
- `scripts/setup.js` - Automated environment setup
- `scripts/deploy.js` - Multi-platform deployment
- `scripts/test-all.js` - Run all test suites
- `scripts/backup.js` - Database backup utilities

## 🎨 Design System

### Color Palette
```css
:root {
  --primary: 262.1 83.3% 57.8%;        /* Purple #8B5CF6 */
  --secondary: 220.9 39.3% 11%;        /* Dark blue-gray */
  --accent: 220 14.3% 95.9%;           /* Light gray */
  --success: 142.1 76.2% 36.3%;        /* Green */
  --warning: 32.6 94.6% 43.7%;         /* Amber */
  --destructive: 0 84.2% 60.2%;        /* Red */
  /* ... additional colors */
}
```

### Typography
- Font: Inter (system fallback)
- Scale: Tailwind CSS default scale
- Consistent line heights and spacing

### Components
- Follow shadcn/ui patterns
- Consistent spacing and sizing
- Accessible design (WCAG 2.1 AA)
- Dark/light mode support

## 🔐 Security Implementation

### Authentication Security
- JWT token validation
- Session timeout handling
- Secure password requirements
- Rate limiting on auth endpoints
- CSRF protection

### Data Security
- Encrypt sensitive data at rest
- Use HTTPS for all communications
- Implement proper CORS policies
- Sanitize all user inputs
- Regular security audits

### API Security
- API key rotation capabilities
- Rate limiting per user/IP
- Input validation and sanitization
- SQL injection prevention
- XSS protection

## 📊 Monitoring and Analytics

### Application Monitoring
- Error tracking (Sentry integration)
- Performance monitoring
- User analytics (privacy-compliant)
- API usage tracking
- Database performance monitoring

### Business Metrics
- User engagement metrics
- Platform usage statistics
- Revenue tracking (if applicable)
- Feature adoption rates
- Customer satisfaction scores

## 🌐 Internationalization

### Multi-language Support
- i18n implementation using react-i18next
- RTL language support
- Currency and date localization
- Accessible language switching
- Professional translations for key languages

## 📱 Progressive Web App (PWA)

### PWA Features
- Offline functionality
- App-like experience
- Push notifications
- Background sync
- Installable on mobile devices

## 🔧 Performance Optimization

### Frontend Optimization
- Code splitting and lazy loading
- Image optimization and WebP support
- Bundle size optimization
- Caching strategies
- Service worker implementation

### Backend Optimization
- Database query optimization
- API response caching
- CDN integration
- Compression middleware
- Connection pooling

## 📋 Quality Assurance

### Code Quality
- ESLint and Prettier configuration
- TypeScript strict mode
- Husky pre-commit hooks
- Conventional commits
- Code review guidelines

### Testing Requirements
- Unit test coverage > 80%
- Integration test suite
- E2E test coverage for critical flows
- Performance testing
- Security testing

## 🚀 Launch Checklist

### Pre-Launch Requirements
- [ ] All features implemented and tested
- [ ] Security audit completed
- [ ] Performance optimization done
- [ ] Documentation complete
- [ ] CI/CD pipeline working
- [ ] Monitoring setup
- [ ] Backup procedures tested
- [ ] SSL certificates configured
- [ ] Domain and DNS configured
- [ ] Legal pages (Privacy Policy, Terms of Service)

### Post-Launch Requirements
- [ ] User feedback collection system
- [ ] Support documentation
- [ ] Bug reporting system
- [ ] Feature request tracking
- [ ] Regular security updates
- [ ] Performance monitoring
- [ ] User onboarding optimization

## 💰 Business Model Integration

### Monetization Options
- Freemium subscription tiers
- Usage-based pricing
- Enterprise features
- White-label solutions
- API access tiers
- Premium support plans

### Payment Integration
```typescript
// Stripe integration for subscriptions
import { loadStripe } from '@stripe/stripe-js';

const stripe = await loadStripe(process.env.VITE_STRIPE_PUBLIC_KEY);
// Implement subscription logic
```

## 🔄 Maintenance and Updates

### Regular Maintenance Tasks
- Dependency updates
- Security patches
- Performance monitoring
- Database optimization
- User feedback analysis
- Feature roadmap updates

### Update Procedures
- Staged rollouts
- A/B testing for new features
- Rollback procedures
- User communication
- Documentation updates

## 📞 Support and Community

### Support Channels
- In-app help system
- Knowledge base
- Email support
- Community forums
- Video tutorials
- Live chat (for premium users)

### Community Building
- Open source components
- Developer API documentation
- Integration partnerships
- User testimonials
- Case studies
- Blog content

---

## 🎯 SUCCESS CRITERIA

### Technical Success
- ✅ Zero critical security vulnerabilities
- ✅ 99.9% uptime SLA
- ✅ < 2 second page load times
- ✅ Mobile-responsive design
- ✅ Cross-browser compatibility
- ✅ Comprehensive test coverage
- ✅ Scalable architecture

### Business Success
- ✅ User-friendly onboarding (< 5 minutes)
- ✅ Feature adoption > 70%
- ✅ User retention > 80% (30 days)
- ✅ Positive user feedback (NPS > 50)
- ✅ Revenue goals met
- ✅ Market penetration targets
- ✅ Competitive positioning

### Operational Success
- ✅ Automated deployments
- ✅ Monitoring and alerting
- ✅ Backup and disaster recovery
- ✅ Compliance requirements met
- ✅ Support SLA adherence
- ✅ Documentation completeness
- ✅ Team knowledge transfer

---

This comprehensive recreation prompt ensures that Roundabout can be rebuilt from scratch with all features, security, scalability, and business requirements met. Every aspect from technical implementation to business strategy is covered to create a production-ready social media management platform.

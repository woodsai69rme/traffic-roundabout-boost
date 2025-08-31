
# 🚀 SETUP GUIDE - Roundabout Social Media Platform

This guide will help you set up Roundabout locally, configure all necessary services, and deploy to production.

---

## 📋 QUICK START

### Prerequisites
- **Node.js** 18+ and npm 9+
- **Git** for version control
- **Supabase Account** (free tier available)
- **Code Editor** (VS Code recommended)

### 1-Minute Setup
```bash
# Clone and setup
git clone <repository-url>
cd roundabout
npm install
cp .env.example .env.local

# Configure environment (see Environment Setup section)
# Start development
npm run dev
```

---

## 🛠️ DETAILED SETUP INSTRUCTIONS

### 1. Environment Setup

#### Required Environment Variables
Create a `.env.local` file in the project root:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: AI Features (OpenAI)
VITE_OPENAI_API_KEY=sk-your-openai-key-here

# Optional: Analytics
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Optional: Error Tracking
VITE_SENTRY_DSN=https://your-sentry-dsn-here

# Optional: Email Service
VITE_EMAIL_SERVICE_KEY=your-email-service-key
```

#### Getting Supabase Credentials
1. Go to [supabase.com](https://supabase.com) and create account
2. Create new project
3. Go to **Settings → API**
4. Copy **Project URL** and **anon public** key
5. Add to your `.env.local` file

### 2. Database Setup

#### Automatic Setup (Recommended)
```bash
# Install Supabase CLI
npm install -g @supabase/cli

# Link to your project
npx supabase link --project-ref your-project-ref

# Run migrations
npx supabase db reset
```

#### Manual Setup
1. Go to Supabase Dashboard → SQL Editor
2. Copy and run each migration from `supabase/migrations/`
3. Verify tables created in Table Editor

### 3. Local Development

#### Start Development Server
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open browser to http://localhost:5173
```

#### Development Commands
```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build

# Database
npm run db:reset        # Reset database with migrations
npm run db:seed         # Seed with sample data
npm run db:generate     # Generate TypeScript types

# Code Quality
npm run lint            # Run ESLint
npm run type-check      # Run TypeScript checks
npm run format          # Format code with Prettier

# Testing
npm run test            # Run unit tests
npm run test:coverage   # Run tests with coverage
npm run test:e2e        # Run E2E tests
```

---

## 🔧 CONFIGURATION OPTIONS

### Feature Flags
Configure which features to enable in `src/config/features.ts`:

```typescript
export const FEATURES = {
  AI_CONTENT_GENERATION: true,
  TEAM_COLLABORATION: false,
  ADVANCED_ANALYTICS: true,
  WHITE_LABEL: false,
  MOBILE_APP: false,
};
```

### Theme Configuration
Customize colors and branding in `src/styles/theme.ts`:

```typescript
export const THEME = {
  colors: {
    primary: '#8B5CF6',
    secondary: '#1E293B',
    accent: '#F8FAFC',
  },
  branding: {
    logo: '/logo.png',
    companyName: 'Your Company',
    tagline: 'Your Tagline',
  },
};
```

### API Configuration
Configure external services in `src/config/api.ts`:

```typescript
export const API_CONFIG = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
  openai: {
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    model: 'gpt-4',
  },
  rateLimit: {
    requests: 100,
    windowMs: 15 * 60 * 1000, // 15 minutes
  },
};
```

---

## 🌐 DEPLOYMENT GUIDES

### Vercel (Recommended)

#### 1. Automatic Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts to configure
```

#### 2. GitHub Integration
1. Connect GitHub repo to Vercel
2. Configure environment variables in Vercel dashboard
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Auto-deploy on push to main branch

#### 3. Environment Variables in Vercel
Add these in Vercel Dashboard → Settings → Environment Variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- All other optional variables

### Netlify

#### 1. Manual Deployment
```bash
# Build the project
npm run build

# Deploy to Netlify
npx netlify deploy --prod --dir=dist
```

#### 2. GitHub Integration
1. Connect repository in Netlify dashboard
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Configure environment variables
5. Enable automatic deploys

### Railway

#### 1. Railway Deployment
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

#### 2. Configuration
Create `railway.toml`:
```toml
[build]
builder = "nixpacks"

[deploy]
startCommand = "npm run preview"

[[services]]
name = "roundabout"
```

### Docker Deployment

#### 1. Docker Setup
```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### 2. Docker Commands
```bash
# Build image
docker build -t roundabout .

# Run container
docker run -p 3000:80 roundabout

# Docker Compose
docker-compose up -d
```

#### 3. Docker Compose
```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:80"
    environment:
      - VITE_SUPABASE_URL=${VITE_SUPABASE_URL}
      - VITE_SUPABASE_ANON_KEY=${VITE_SUPABASE_ANON_KEY}
```

### Self-Hosted (VPS)

#### 1. Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y
```

#### 2. Application Deployment
```bash
# Clone repository
git clone <your-repo-url> /var/www/roundabout
cd /var/www/roundabout

# Install dependencies and build
npm install
npm run build

# Start with PM2
pm2 start ecosystem.config.js
pm2 startup
pm2 save
```

#### 3. Nginx Configuration
```nginx
# /etc/nginx/sites-available/roundabout
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        root /var/www/roundabout/dist;
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🔐 SECURITY SETUP

### SSL Certificate
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Firewall Configuration
```bash
# Configure UFW firewall
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

### Environment Security
```bash
# Set proper permissions
chmod 600 .env.local
chown root:root .env.local

# Use secrets management in production
# Store sensitive variables in platform-specific secret managers
```

---

## 🧪 TESTING SETUP

### Unit Testing
```bash
# Install testing dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom

# Run tests
npm run test
npm run test:coverage
```

### E2E Testing
```bash
# Install Playwright
npx playwright install

# Run E2E tests
npm run test:e2e
```

### Testing Configuration
```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
});
```

---

## 📊 MONITORING SETUP

### Error Tracking (Sentry)
```bash
# Install Sentry
npm install @sentry/react @sentry/tracing

# Configure in src/lib/sentry.ts
Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

### Analytics (Google Analytics)
```typescript
// Install GA4
npm install gtag

// Configure in src/lib/analytics.ts
gtag('config', process.env.VITE_GA_ID);
```

### Performance Monitoring
```bash
# Install Web Vitals
npm install web-vitals

# Configure monitoring in src/lib/performance.ts
```

---

## 🚀 OPTIMIZATION TIPS

### Build Optimization
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
  },
});
```

### Performance Optimization
```bash
# Analyze bundle size
npm run build:analyze

# Optimize images
npm install -D vite-plugin-imagemin

# Enable gzip compression
# Configure in nginx or hosting platform
```

---

## 🆘 TROUBLESHOOTING

### Common Issues

#### Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node.js version
node --version  # Should be 18+
```

#### Supabase Connection Issues
```bash
# Verify environment variables
echo $VITE_SUPABASE_URL
echo $VITE_SUPABASE_ANON_KEY

# Check network connectivity
curl -I $VITE_SUPABASE_URL
```

#### Permission Issues (Linux/Mac)
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
```

### Getting Help
- 📖 Check the [Documentation](./README.md)
- 🐛 Report issues on [GitHub Issues](https://github.com/your-repo/issues)
- 💬 Join our [Discord Community](https://discord.gg/your-server)
- 📧 Email support: support@yourdomain.com

---

## 🎯 NEXT STEPS

After setup is complete:

1. **Test Core Functionality**
   - [ ] User registration and login
   - [ ] Platform connections
   - [ ] Content scheduling
   - [ ] Analytics dashboard

2. **Configure Integrations**
   - [ ] Social media platform APIs
   - [ ] AI content generation
   - [ ] Email notifications
   - [ ] Payment processing (if applicable)

3. **Customize for Your Needs**
   - [ ] Update branding and theme
   - [ ] Configure feature flags
   - [ ] Set up monitoring and analytics
   - [ ] Create custom content templates

4. **Deploy to Production**
   - [ ] Choose hosting platform
   - [ ] Configure custom domain
   - [ ] Set up SSL certificate
   - [ ] Configure monitoring and backups

---

**🎉 Congratulations!** You now have Roundabout running locally and are ready to deploy to production. If you encounter any issues, check our [Troubleshooting Guide](./troubleshooting.md) or reach out for support.

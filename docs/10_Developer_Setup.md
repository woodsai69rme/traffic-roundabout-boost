
# Developer Setup Guide

## ResumeBuilder Pro Development Environment

### Document Information
- **Version**: 1.0
- **Last Updated**: 2025-01-31
- **Target Audience**: Developers, DevOps Engineers

## Prerequisites

### Required Software
- **Node.js**: Version 18.17+ or 20.5+
- **npm**: Version 9+ (or yarn 3+, pnpm 8+)
- **Git**: Version 2.30+
- **Docker**: Version 20+ (optional, for local services)
- **PostgreSQL**: Version 15+ (if running locally)

### Development Tools (Recommended)
- **VS Code**: With recommended extensions
- **Postman/Insomnia**: API testing
- **pgAdmin**: Database management
- **GitHub CLI**: Enhanced Git workflow

### System Requirements
- **OS**: macOS 12+, Ubuntu 20.04+, Windows 11
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 5GB free space
- **Network**: Stable internet connection

## Environment Setup

### 1. Repository Clone and Initial Setup

```bash
# Clone the repository
git clone https://github.com/resumebuilder-pro/app.git
cd resumebuilder-pro

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local
```

### 2. Environment Variables Configuration

Create `.env.local` file in project root:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# AI Services
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_key

# File Storage
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET=your_s3_bucket_name
AWS_REGION=us-east-1

# Email Services
SENDGRID_API_KEY=your_sendgrid_key
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587

# Analytics
GOOGLE_ANALYTICS_ID=GA4_MEASUREMENT_ID
POSTHOG_API_KEY=your_posthog_key

# Payment Processing
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Development
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Setup

#### Option A: Using Supabase (Recommended)

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Copy the project URL and anon key to your `.env.local`
3. Run database migrations:

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

#### Option B: Local PostgreSQL

```bash
# Install PostgreSQL (macOS)
brew install postgresql
brew services start postgresql

# Create database
createdb resumebuilder_dev

# Set database URL
echo "DATABASE_URL=postgresql://localhost:5432/resumebuilder_dev" >> .env.local

# Run migrations
npm run db:migrate
```

### 4. Start Development Server

```bash
# Start the development server
npm run dev

# Application will be available at:
# http://localhost:3000
```

## Project Structure

```
resumebuilder-pro/
├── src/                          # Source code
│   ├── components/               # Reusable React components
│   │   ├── ui/                  # Base UI components (shadcn/ui)
│   │   ├── forms/               # Form components
│   │   ├── layouts/             # Layout components
│   │   └── sections/            # Page section components
│   ├── pages/                   # Page components
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Utility functions
│   ├── types/                   # TypeScript type definitions
│   ├── stores/                  # State management (Zustand)
│   └── integrations/            # External service integrations
│       └── supabase/            # Supabase configuration
├── public/                      # Static assets
├── docs/                        # Documentation
├── tests/                       # Test files
│   ├── __tests__/              # Unit tests
│   ├── e2e/                    # End-to-end tests
│   └── utils/                  # Test utilities
├── supabase/                   # Supabase configuration
│   ├── migrations/             # Database migrations
│   ├── functions/              # Edge functions
│   └── config.toml             # Supabase config
├── .github/                    # GitHub workflows
├── package.json                # Dependencies and scripts
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite configuration
└── README.md                  # Project README
```

## Development Scripts

### Available npm Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test",
    "db:generate": "supabase gen types typescript --local > src/types/database.ts",
    "db:migrate": "supabase db push",
    "db:reset": "supabase db reset",
    "db:seed": "node scripts/seed.js"
  }
}
```

### Custom Development Commands

```bash
# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix

# Testing
npm run test           # Unit tests
npm run test:ui        # Test UI
npm run test:coverage  # Coverage report
npm run test:e2e       # End-to-end tests

# Database operations
npm run db:generate    # Generate types from database
npm run db:migrate     # Apply migrations
npm run db:reset       # Reset database
npm run db:seed        # Seed with sample data
```

## IDE Configuration

### VS Code Setup

#### Recommended Extensions

Create `.vscode/extensions.json`:

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json",
    "ms-playwright.playwright",
    "supabase.supabase-vscode"
  ]
}
```

#### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

#### Debug Configuration

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug App",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/vite",
      "args": ["--mode", "development"],
      "env": {
        "NODE_ENV": "development"
      },
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

## Code Quality Tools

### ESLint Configuration

`.eslintrc.js`:

```javascript
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'prefer-const': 'error'
  }
};
```

### Prettier Configuration

`.prettierrc`:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

### TypeScript Configuration

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## Testing Setup

### Unit Testing with Vitest

`vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
});
```

### E2E Testing with Playwright

`playwright.config.ts`:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    }
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI
  }
});
```

## Git Workflow

### Branch Naming Convention

```
feature/[ticket-number]-brief-description
bugfix/[ticket-number]-brief-description
hotfix/[ticket-number]-brief-description
release/version-number
```

### Commit Message Convention

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding/updating tests
- `chore`: Maintenance tasks

### Pre-commit Hooks

`.husky/pre-commit`:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint
npm run type-check
npm run test
```

## Debugging

### Browser DevTools Setup

1. Install React Developer Tools
2. Install Redux DevTools (if using Redux)
3. Enable source maps in development

### Debugging Supabase

```typescript
// Enable Supabase debug mode
const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!,
  {
    auth: {
      debug: process.env.NODE_ENV === 'development'
    }
  }
);
```

### Performance Profiling

```bash
# Bundle analyzer
npm run build
npx vite-bundle-analyzer dist

# Performance testing
npm run test:performance
```

## Docker Development (Optional)

### Docker Compose Setup

`docker-compose.yml`:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: resumebuilder_dev
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

### Development Commands

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f app

# Run commands in container
docker-compose exec app npm run test

# Stop services
docker-compose down
```

## Troubleshooting

### Common Issues

**Node.js Version Issues:**
```bash
# Use nvm to manage Node versions
nvm install 18.17.0
nvm use 18.17.0
```

**Package Installation Errors:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Environment Variable Issues:**
```bash
# Verify environment variables are loaded
node -e "console.log(process.env.VITE_SUPABASE_URL)"
```

**Database Connection Issues:**
```bash
# Test Supabase connection
npm run db:test-connection
```

### Getting Help

- **Documentation**: Check `/docs` folder
- **GitHub Issues**: Report bugs and feature requests
- **Team Chat**: Slack #development channel
- **Code Reviews**: Create pull requests for review

This setup guide ensures all developers can quickly get up and running with a consistent development environment.

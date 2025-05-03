
# Developer Guide

## Project Overview

Roundabout WebTraffic is a comprehensive social media management platform built with modern web technologies. This guide provides information for developers working on the project.

## Getting Started

### Development Environment Setup

1. Install Node.js (v16+) and npm (v7+)
2. Clone the repository
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Key Technologies

- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **Shadcn UI** - Component library
- **React Router** - Client-side routing
- **Recharts** - Data visualization
- **Supabase** - Backend-as-a-Service (Auth, Database, Storage)

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── ui/            # Base UI components from Shadcn
│   ├── ApiIntegrations/  # API integration components
│   ├── AudienceInsights/ # Audience analytics components
│   ├── ContentScheduler/ # Content planning components
│   └── ...
├── hooks/             # Custom React hooks
├── integrations/      # Third-party service integrations
│   └── supabase/      # Supabase client and types
├── lib/               # Utility libraries
├── pages/             # Page components
├── services/          # API services
└── utils/             # Helper utilities
```

## Coding Standards

### General Guidelines

- Use TypeScript for all new code
- Follow the existing project structure
- Create small, focused components
- Add proper JSDoc comments for functions and complex logic
- Use named exports instead of default exports

### Component Guidelines

- One component per file
- Use functional components with hooks
- Follow the component naming convention:
  - PascalCase for component files and functions
  - kebab-case for CSS files
- Organize props with TypeScript interfaces

### State Management

- Use React Context for global state
- Use React Query for server state
- Use local component state for UI concerns

### Styling

- Use Tailwind CSS for styling
- Follow the color scheme in the design system
- Use the shadcn/ui component library
- Ensure all components are responsive

## Testing

### Running Tests

```bash
npm run test         # Run all tests
npm run test:watch   # Run tests in watch mode
```

### Writing Tests

- Create test files next to the component with `.test.tsx` extension
- Focus on testing behavior, not implementation details
- Use React Testing Library for component tests
- Write unit tests for utility functions

## Build and Deployment

### Building for Production

```bash
npm run build
```

This will create optimized production build in the `dist` directory.

### Environment Variables

Create a `.env` file in the project root with the following variables:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Deployment

This project is deployed on Vercel. The main branch is automatically deployed to production.

## Git Workflow

### Branching Strategy

- `main` - Production branch
- `develop` - Development branch
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches
- `hotfix/*` - Hot fix branches for production issues

### Commit Message Format

Follow the conventional commits specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- feat: A new feature
- fix: A bug fix
- docs: Documentation changes
- style: Code style changes (formatting, etc.)
- refactor: Code changes that neither fix bugs nor add features
- perf: Performance improvements
- test: Adding or fixing tests
- chore: Changes to the build process or auxiliary tools

### Pull Request Process

1. Create a new branch from `develop`
2. Make changes and commit following the commit message format
3. Push the branch and create a pull request
4. Ensure the CI pipeline passes
5. Request a review from at least one team member
6. Merge the pull request once approved

## Troubleshooting

### Common Issues

#### Build Errors

- Check for TypeScript errors
- Ensure all dependencies are installed
- Verify environment variables

#### Runtime Errors

- Check browser console for errors
- Verify API endpoints are working
- Check authentication state

## Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.io/docs)

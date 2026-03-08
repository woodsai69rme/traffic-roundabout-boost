# 11. Codebase Conventions

## Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui base components
│   ├── AIEnhancement/  # AI-related features
│   ├── ApiIntegrations/# API & webhook management
│   ├── AudienceInsights/# Audience analytics
│   └── ContentScheduler/# Post scheduling
├── hooks/              # Custom React hooks
├── integrations/       # Supabase client (auto-generated)
├── lib/                # Utilities (cn, etc.)
├── pages/              # Route-level page components
├── services/           # API/business logic layer
├── types/              # TypeScript type definitions
└── utils/              # Helper functions
```

## Naming Conventions
- **Components**: PascalCase (`ContentCard.tsx`)
- **Hooks**: camelCase with `use` prefix (`use-auth.tsx`)
- **Services**: camelCase (`socialMediaService.ts`)
- **Types**: PascalCase for interfaces/types (`SocialPlatform`)
- **Files**: kebab-case for hooks, PascalCase for components

## Code Style
- TypeScript strict mode
- Functional components only (no class components)
- React hooks for state management
- Tailwind CSS with semantic design tokens — never hardcode colors
- shadcn/ui for base components with custom variants
- Zod for runtime validation
- TanStack Query for server state

## Import Order
1. React/external libraries
2. `@/components/ui/*`
3. `@/components/*`
4. `@/hooks/*`
5. `@/services/*`
6. `@/types/*`
7. `@/lib/*` and `@/utils/*`

## Component Guidelines
- Keep components under 200 lines; extract sub-components
- Use `forwardRef` for components that wrap DOM elements
- Prefer composition over configuration
- Always type props with interfaces

## State Management
- **Server state**: TanStack Query (`useQuery`, `useMutation`)
- **Global UI**: React Context (`AuthProvider`, `ThemeProvider`)
- **Local**: `useState`, `useReducer`

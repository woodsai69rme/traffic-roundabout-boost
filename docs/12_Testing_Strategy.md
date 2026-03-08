# 12. Testing Strategy

## Overview
Testing ensures reliability across the Roundabout platform.

## Testing Pyramid
1. **Unit Tests** — Individual functions, utilities, hooks
2. **Component Tests** — React components in isolation
3. **Integration Tests** — Feature flows (auth, scheduling, analytics)
4. **E2E Tests** — Full user journeys via browser automation

## Tools
- **Vitest** — Unit and component tests
- **React Testing Library** — Component rendering and interaction
- **Lovable Browser Tools** — E2E testing and visual verification

## What to Test

### Critical Paths (Must Test)
- Authentication flow (register, login, logout, password reset)
- Post scheduling and publishing
- Platform connection/disconnection
- Analytics data display
- Webhook CRUD operations

### Service Layer
- All service functions with mock data
- Error handling and edge cases
- Data transformation utilities

### Components
- Render with various props
- User interactions (clicks, form submissions)
- Loading, error, and empty states
- Responsive behavior

## Test File Structure
```
src/
├── __tests__/           # Integration tests
├── components/
│   └── __tests__/       # Component tests
├── services/
│   └── __tests__/       # Service tests
└── utils/
    └── __tests__/       # Utility tests
```

## Coverage Targets
- **Services**: 80%+
- **Utilities**: 90%+
- **Components**: 70%+
- **Overall**: 75%+

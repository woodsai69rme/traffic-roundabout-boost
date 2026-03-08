# 12. Testing Strategy

## Overview
Testing ensures reliability across the Roundabout platform. This document covers the testing pyramid, tools, manual test checklists, and CI setup.

## Testing Pyramid

1. **Unit Tests** — Individual functions, utilities, hooks
2. **Component Tests** — React components in isolation
3. **Integration Tests** — Feature flows (auth, scheduling, analytics)
4. **E2E Tests** — Full user journeys via browser automation

## Tools & Libraries

| Tool | Purpose | Config |
|------|---------|--------|
| **Vitest** | Unit and component tests | `vitest.config.ts` |
| **React Testing Library** | Component rendering and interaction | `@testing-library/react` |
| **Lovable Browser Tools** | E2E testing and visual verification | Built-in |
| **MSW** | API mocking for service tests | `msw` |

## What to Test

### Critical Paths (Must Test)
- Authentication flow (register, login, logout, password reset)
- Post scheduling and publishing (create, edit, delete, toggle status)
- Platform connection/disconnection
- Analytics data display (charts load, fallback works)
- Webhook CRUD operations
- AI content generation (edge function call + response)
- Data export/import (JSON/CSV)
- Content templates (create, delete, list)

### Service Layer
- All service functions with mock data
- Error handling and edge cases
- Data transformation utilities
- DB query fallback to mock data

### Components
- Render with various props
- User interactions (clicks, form submissions)
- Loading, error, and empty states (skeleton loaders, EmptyState)
- Responsive behavior

## Manual Test Checklist

### Auth Flow
- [ ] Register with email/password → receives confirmation
- [ ] Login with valid credentials → redirected to dashboard
- [ ] Login with invalid credentials → shows error toast
- [ ] Logout → redirected to home page
- [ ] Visit protected route while logged out → redirected to /login
- [ ] Password reset request → email sent
- [ ] Password reset with recovery token → password updated

### Content Planner
- [ ] Create new post → appears in posts list
- [ ] Schedule post for future date → status shows "scheduled"
- [ ] Delete post → removed from list with toast confirmation
- [ ] Publish post → status changes to "published"
- [ ] Toggle post status → updates in real-time
- [ ] Create content template → appears in templates tab
- [ ] Delete content template → removed from list
- [ ] Calendar view shows scheduled posts on correct dates

### AI Content Generator
- [ ] Select platform, tone, length → generate button enabled
- [ ] Click generate → loading state → content appears
- [ ] Generated content is relevant to prompt
- [ ] Copy generated content → clipboard populated
- [ ] Error handling: rate limit → shows appropriate message

### Analytics
- [ ] Dashboard loads with skeleton → data appears
- [ ] Charts render with data (line, bar, pie)
- [ ] Empty state shows when no analytics data
- [ ] Platform filter works correctly

### Platforms
- [ ] Platform cards display all 10 platforms
- [ ] Connect platform → status updates
- [ ] Disconnect platform → status reverts

### Profile
- [ ] Profile page loads current user data
- [ ] Update name/bio/website → saves to DB
- [ ] Shows loading state during save

### Webhooks
- [ ] Create webhook → appears in list
- [ ] Toggle webhook active/inactive
- [ ] Delete webhook → removed from list
- [ ] Edit webhook URL/events

### Data Export/Import
- [ ] Export analytics as JSON → valid file downloaded
- [ ] Export analytics as CSV → valid file downloaded
- [ ] Import JSON posts → posts appear in planner

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

| Layer | Target |
|-------|--------|
| Services | 80%+ |
| Utilities | 90%+ |
| Components | 70%+ |
| Overall | 75%+ |

## CI Setup

### GitHub Actions Workflow
```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '18' }
      - run: npm ci
      - run: npm run build
      - run: npm run test -- --run
```

### Pre-commit Hooks
```bash
# Using Husky + lint-staged
npx husky add .husky/pre-commit "npx lint-staged"
```

## How to Add Tests

1. Create test file next to source: `MyComponent.test.tsx`
2. Import from `@testing-library/react` for components
3. Use `vi.mock()` for service/API mocking
4. Follow AAA pattern: Arrange → Act → Assert
5. Test loading, success, and error states
6. Run with `npx vitest --run` or `npm test`

## How to Fix Failing Tests

1. Read the error message carefully — identify component and assertion
2. Check if the component API changed (props, routes, context)
3. Update mocks if service layer changed
4. Run single test: `npx vitest run src/path/to/test.test.tsx`
5. Verify fix doesn't break other tests: `npx vitest --run`

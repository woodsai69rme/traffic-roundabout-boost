# 05. User Journeys & Flows

## Overview
This document maps the key user journeys through the Roundabout WebTraffic platform, including entry/exit points, edge cases, and error handling.

---

## Journey 1: New User Onboarding

### Steps
1. **Landing Page** → User visits `/` and sees hero, features, pricing
2. **Register** → Clicks "Get Started" → `/register` → enters email + password
3. **Email Verification** → Receives verification email, clicks link
4. **Login** → Redirected to `/login` → enters credentials
5. **Dashboard** → Redirected to `/dashboard` → sees empty state with guided setup prompts
6. **Connect Platform** → Navigates to `/platforms` → connects first social account
7. **Schedule First Post** → Goes to `/content-planner` → creates and schedules first post
8. **View Analytics** → After post publishes, checks `/analytics` for performance

### Entry Points
- Direct URL (`/`), search engine, social media link, referral

### Exit Points
- Closes browser, navigates away, abandons registration

### Edge Cases
- **Email already registered**: Shows error toast, suggests login or password reset
- **Weak password**: Validation error displayed inline
- **Verification email not received**: User can request resend from login page
- **Empty dashboard**: EmptyState component displays with CTA to connect platforms
- **No platforms connected**: EmptyState on `/platforms` with connect prompt

### Error Handling
- Network failure during registration → toast error, form preserved
- Supabase auth error → descriptive error message displayed
- Session expired → ProtectedRoute redirects to `/login`

---

## Journey 2: Daily Content Manager

### Steps
1. **Login** → `/login` → enters credentials
2. **Dashboard Review** → Checks summary cards, recent activity, notifications
3. **AI Content Generation** → `/ai-content` → generates content suggestions via edge function
4. **Schedule Posts** → `/content-planner` → schedules posts across platforms
5. **Monitor Performance** → `/analytics` → tracks engagement metrics
6. **Audience Analysis** → `/audience-insights` → reviews demographics and best times

### Entry Points
- Direct login, bookmarked dashboard URL

### Exit Points
- Logout, session timeout, closes browser

### Edge Cases
- **No scheduled posts**: EmptyState on content planner with "Create your first post" CTA
- **No analytics data**: EmptyState on analytics page, skeleton loaders while fetching
- **AI generation fails**: Toast error displayed, user can retry
- **AI returns empty content**: Fallback message shown, retry button available

### Error Handling
- Database query failure → skeleton loader → error toast after timeout
- Edge function timeout → "AI is temporarily unavailable" message
- Rate limiting on AI → queue message with retry countdown

---

## Journey 3: Agency White-Label User

### Steps
1. **Login** → Custom branded login page
2. **Multi-Client Dashboard** → Switch between client accounts
3. **Bulk Scheduling** → Upload CSV of posts for multiple clients
4. **Report Generation** → Generate branded PDF reports per client
5. **Competitor Tracking** → Monitor client competitors

### Entry Points
- White-label domain, agency portal link

### Exit Points
- Logout, switch client, close session

### Edge Cases
- **CSV format errors**: Validation with row-by-row error messages
- **Large CSV upload**: Progress indicator, chunked processing
- **Client account not found**: Error state with admin contact prompt

### Error Handling
- Invalid CSV columns → detailed error listing which rows/columns failed
- Report generation timeout → async job with email notification on completion

---

## Journey 4: API Developer

### Steps
1. **Register** → Create developer account at `/register`
2. **API Keys** → Generate API keys from `/profile`
3. **Webhook Setup** → Configure webhooks at `/api-integrations`
4. **Integration** → Use REST API to programmatically manage posts
5. **Monitor** → Track API usage and webhook delivery

### Entry Points
- Documentation page, API reference link, developer portal

### Exit Points
- API key revocation, account deletion

### Edge Cases
- **Invalid webhook URL**: Validation before save, test ping available
- **Webhook delivery failure**: Retry logic with exponential backoff
- **API rate limit exceeded**: 429 response with retry-after header

### Error Handling
- Webhook URL unreachable → marked as failed, retry after 5 minutes
- API key expired → 401 response, prompt to regenerate
- Malformed request body → 400 with detailed validation errors

---

## Journey 5: First-Time AI Content Creator

### Steps
1. **Login** → `/login`
2. **Navigate to AI Creator** → `/ai-content`
3. **Select Platform** → Choose target platform (e.g., Twitter, LinkedIn)
4. **Set Parameters** → Choose tone, length, topic
5. **Generate Content** → Click generate, wait for edge function response
6. **Review & Edit** → Edit generated content in textarea
7. **Schedule or Copy** → Send to content planner or copy to clipboard

### Entry Points
- Dashboard CTA, navbar link, content planner "AI suggest" button

### Exit Points
- Copies content, schedules post, navigates away

### Edge Cases
- **Empty topic field**: Validation prevents submission
- **Edge function cold start**: Extended loading spinner (up to 10s)
- **Generated content too long for platform**: Character count warning displayed
- **No internet during generation**: Offline error toast

### Error Handling
- Edge function 500 error → "Something went wrong, please try again" toast
- Timeout (>30s) → cancel request, show retry button
- Invalid response format → fallback to generic content suggestion

---

## Flow Diagrams

### Authentication Flow
```
Landing → Register → Verify Email → Login → Dashboard
                                         ↓
                                    Forgot Password → Reset Email → New Password → Login
                                         ↓
                                    Session Expired → Redirect to Login → Re-auth → Previous Page
```

### Content Publishing Flow
```
Create Content → Select Platforms → Set Schedule → Review → Publish/Schedule
       ↓                                                        ↓
  AI Suggestions                                          Analytics Tracking
       ↓                                                        ↓
  Edit/Refine                                            Performance Dashboard
```

### Platform Connection Flow
```
Platforms Page → Select Platform → Enter Credentials → Verify → Connected
                                                          ↓
                                                    Error → Toast Message → Retry
                                                          ↓
                                                    Already Connected → Update/Disconnect
```

### Data Export/Import Flow
```
API Integrations → Select Export Format (JSON/CSV) → Download File
       ↓
  Import Tab → Upload JSON → Validate → Preview → Confirm → Insert to DB
       ↓
  Validation Error → Show Row Errors → Fix & Retry
```

### Error Recovery Flow
```
Any Page → Network Error → Toast Notification → Auto-Retry (3x)
       ↓
  Persistent Failure → Error State Component → Manual Retry Button
       ↓
  Auth Error (401/403) → Redirect to Login → Re-authenticate → Return to Page
```

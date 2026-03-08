# 09. Authentication & Security

## Authentication
- **Provider**: Lovable Cloud (Supabase Auth)
- **Method**: Email + password with email verification
- **Session**: JWT-based, auto-refreshed, persisted in localStorage
- **Pages**: `/login`, `/register`, `/auth`

## Auth Flow
1. User registers at `/register` with email + password
2. Verification email sent (auto-confirm disabled by default)
3. User clicks verification link → redirected to app
4. Login at `/login` → JWT issued → stored in localStorage
5. `AuthProvider` wraps app, provides `useAuth()` hook
6. Protected routes check auth state, redirect to `/login` if unauthenticated

## Row Level Security (RLS)
All tables have RLS enabled. Policies ensure users can only access their own data:

```sql
-- Pattern used across all tables
CREATE POLICY "Users manage own data"
  ON public.<table>
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

## Security Best Practices
1. **No client-side role checks** — Roles stored in separate `user_roles` table (future)
2. **No API keys in client code** — Only publishable/anon keys exposed
3. **Edge functions** for sensitive operations — API keys stored as secrets
4. **Input validation** — Zod schemas for all form inputs
5. **HTTPS only** — All communication encrypted in transit
6. **CORS** — Restricted to application domains

## Secrets Management
Secrets stored securely in Lovable Cloud, accessible only from backend functions:
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_DB_URL`
- Third-party API keys (added as needed)

## Password Reset Flow
1. User clicks "Forgot Password" on login page
2. `resetPasswordForEmail()` sends reset email with redirect URL
3. User clicks link → `/reset-password` page
4. User enters new password → `updateUser({ password })` called

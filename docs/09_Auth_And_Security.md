
# Authentication and Security

## ResumeBuilder Pro Security Architecture

### Document Information
- **Version**: 1.0
- **Last Updated**: 2025-01-31
- **Security Framework**: Supabase Auth + Custom Security Layers

## Authentication Strategy

### Primary Authentication Method
ResumeBuilder Pro uses Supabase Auth as the primary authentication provider, offering:

- **Email/Password Authentication**: Standard signup and login flow
- **Social Login**: Google, GitHub, LinkedIn integration
- **Magic Links**: Passwordless authentication option
- **Multi-Factor Authentication**: TOTP and SMS support

### JWT Token Management

**Access Tokens:**
- Validity: 1 hour
- Auto-refresh mechanism
- Stored in memory (not localStorage for security)

**Refresh Tokens:**
- Validity: 30 days
- Secure HTTP-only cookies
- Automatic rotation on use

```typescript
// Token refresh implementation
const refreshToken = async () => {
  const { data, error } = await supabase.auth.refreshSession();
  if (error) {
    // Redirect to login
    router.push('/login');
  }
  return data.session;
};
```

### Session Management

**Session Storage:**
- Access tokens: Memory only
- Refresh tokens: Secure HTTP-only cookies
- Session metadata: Local storage (non-sensitive data only)

**Session Validation:**
```typescript
// Session validation middleware
const validateSession = async (request: Request) => {
  const token = extractToken(request);
  const { data: user, error } = await supabase.auth.getUser(token);
  
  if (error || !user) {
    throw new UnauthorizedError('Invalid session');
  }
  
  return user;
};
```

## Authorization Framework

### Role-Based Access Control (RBAC)

**User Roles:**
- `free`: Basic features, limited exports
- `pro`: Advanced features, unlimited exports
- `enterprise`: All features, team collaboration
- `admin`: Platform administration

**Permission Matrix:**

| Feature | Free | Pro | Enterprise | Admin |
|---------|------|-----|------------|-------|
| Resume Creation | 3 | Unlimited | Unlimited | Unlimited |
| Template Access | Basic | All | All + Custom | All |
| AI Optimization | 5/month | Unlimited | Unlimited | Unlimited |
| PDF Export | 3/month | Unlimited | Unlimited | Unlimited |
| Sharing | Public only | Public + Private | Public + Private + Team | All |
| Analytics | Basic | Advanced | Advanced + Team | All |

### Row Level Security (RLS)

**Resume Access Policy:**
```sql
-- Users can only access their own resumes
CREATE POLICY "user_resume_access" ON resumes
FOR ALL USING (auth.uid() = user_id);

-- Shared resume access
CREATE POLICY "shared_resume_access" ON resumes
FOR SELECT USING (
  id IN (
    SELECT resume_id FROM resume_shares 
    WHERE is_public = true 
    AND (expires_at IS NULL OR expires_at > NOW())
  )
);
```

**Team Collaboration Policy:**
```sql
-- Team members can access shared resumes
CREATE POLICY "team_resume_access" ON resumes
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM team_members tm
    JOIN resume_shares rs ON rs.team_id = tm.team_id
    WHERE tm.user_id = auth.uid()
    AND rs.resume_id = resumes.id
  )
);
```

## Data Protection

### Encryption Standards

**Data at Rest:**
- AES-256 encryption for database
- Encrypted backups with separate key management
- File storage encryption via Supabase Storage

**Data in Transit:**
- TLS 1.3 for all API communications
- Certificate pinning for mobile apps
- HSTS headers enforced

**Sensitive Data Handling:**
```typescript
// Personal information encryption
const encryptPersonalInfo = (data: PersonalInfo) => {
  const sensitiveFields = ['ssn', 'passport', 'license'];
  
  return {
    ...data,
    ...sensitiveFields.reduce((acc, field) => {
      if (data[field]) {
        acc[field] = encrypt(data[field], process.env.ENCRYPTION_KEY);
      }
      return acc;
    }, {})
  };
};
```

### PII (Personally Identifiable Information) Protection

**Data Classification:**
- **Public**: Name, professional summary, skills
- **Private**: Email, phone, address
- **Sensitive**: Government IDs, references

**Data Handling Rules:**
- Sensitive data encrypted at field level
- Audit trail for all PII access
- Automatic data retention policies
- Right to deletion compliance (GDPR)

## Security Headers and Configuration

### HTTP Security Headers

```typescript
// Security headers configuration
const securityHeaders = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': `
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://apis.google.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' data: https:;
    connect-src 'self' https://api.resumebuilder.pro;
    font-src 'self' https://fonts.gstatic.com;
  `.replace(/\s+/g, ' ').trim()
};
```

### CORS Configuration

```typescript
// CORS settings
const corsOptions = {
  origin: [
    'https://resumebuilder.pro',
    'https://app.resumebuilder.pro',
    /.*\.resumebuilder\.pro$/
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};
```

## API Security

### Rate Limiting

**Endpoint-Specific Limits:**
```typescript
const rateLimits = {
  '/auth/login': { requests: 5, window: '15m' },
  '/auth/register': { requests: 3, window: '1h' },
  '/ai/optimize': { requests: 10, window: '1h' },
  '/export/pdf': { requests: 20, window: '1h' },
  default: { requests: 100, window: '15m' }
};
```

**Implementation:**
```typescript
// Rate limiting middleware
const rateLimit = (limit: RateLimit) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const key = `rate_limit:${req.ip}:${req.path}`;
    const current = await redis.incr(key);
    
    if (current === 1) {
      await redis.expire(key, limit.window);
    }
    
    if (current > limit.requests) {
      return res.status(429).json({
        error: 'Rate limit exceeded',
        retryAfter: await redis.ttl(key)
      });
    }
    
    next();
  };
};
```

### Input Validation and Sanitization

**Request Validation:**
```typescript
// Zod schema for resume data
const resumeSchema = z.object({
  title: z.string().min(1).max(100),
  personal_info: z.object({
    firstName: z.string().min(1).max(50),
    lastName: z.string().min(1).max(50),
    email: z.string().email(),
    phone: z.string().regex(/^\+?[\d\s\-\(\)]+$/),
    summary: z.string().max(1000).optional()
  }),
  experience: z.array(experienceSchema).max(20),
  skills: z.array(skillSchema).max(100)
});

// Validation middleware
const validateResume = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = resumeSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ error: 'Invalid input data' });
  }
};
```

**HTML Sanitization:**
```typescript
import DOMPurify from 'dompurify';

const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'ul', 'li', 'ol'],
    ALLOWED_ATTR: []
  });
};
```

## Vulnerability Prevention

### SQL Injection Prevention
- Parameterized queries via Supabase PostgREST
- Input validation on all user inputs
- Stored procedures for complex operations

### XSS Prevention
```typescript
// Content Security Policy
const cspMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Content-Security-Policy', 
    "default-src 'self'; script-src 'self' 'nonce-" + req.nonce + "'");
  next();
};

// HTML escaping
const escapeHtml = (text: string): string => {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
};
```

### CSRF Protection
```typescript
// CSRF token validation
const csrfProtection = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-csrf-token'] || req.body._csrf;
  const sessionToken = req.session.csrfToken;
  
  if (!token || token !== sessionToken) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  
  next();
};
```

## Compliance and Privacy

### GDPR Compliance

**Data Subject Rights:**
- Right to access personal data
- Right to rectification
- Right to erasure ("right to be forgotten")
- Right to data portability
- Right to restrict processing

**Implementation:**
```typescript
// GDPR data export
const exportUserData = async (userId: string) => {
  const userData = await supabase
    .from('resumes')
    .select('*')
    .eq('user_id', userId);
    
  const analytics = await supabase
    .from('user_activity')
    .select('*')
    .eq('user_id', userId);
    
  return {
    resumes: userData.data,
    activity: analytics.data,
    exportDate: new Date().toISOString()
  };
};

// GDPR data deletion
const deleteUserData = async (userId: string) => {
  // Soft delete to maintain referential integrity
  await supabase
    .from('resumes')
    .update({ deleted_at: new Date() })
    .eq('user_id', userId);
    
  // Anonymize analytics data
  await supabase
    .from('user_activity')
    .update({ user_id: null })
    .eq('user_id', userId);
};
```

### SOC 2 Compliance Readiness

**Security Controls:**
- Access logging and monitoring
- Regular security assessments
- Incident response procedures
- Data backup and recovery
- Vendor security assessments

**Audit Trail:**
```typescript
// Security event logging
const logSecurityEvent = async (event: SecurityEvent) => {
  await supabase.from('security_events').insert({
    event_type: event.type,
    user_id: event.userId,
    ip_address: event.ipAddress,
    user_agent: event.userAgent,
    details: event.details,
    severity: event.severity,
    created_at: new Date()
  });
};
```

## Incident Response

### Security Incident Classification

**Severity Levels:**
- **Critical**: Data breach, system compromise
- **High**: Unauthorized access, service disruption
- **Medium**: Failed login attempts, suspicious activity
- **Low**: Policy violations, minor security events

### Response Procedures

**Incident Response Team:**
- Security Lead
- Engineering Lead
- Product Manager
- Legal/Compliance (for data breaches)

**Response Timeline:**
- **0-15 minutes**: Initial assessment and containment
- **15-60 minutes**: Incident investigation and communication
- **1-4 hours**: Mitigation and recovery
- **24-48 hours**: Post-incident review and documentation

## Monitoring and Alerting

### Security Monitoring

**Real-time Alerts:**
```typescript
// Suspicious activity detection
const detectSuspiciousActivity = async (userId: string, activity: Activity) => {
  const recentActivity = await getRecentActivity(userId, '1h');
  
  // Multiple login attempts from different IPs
  if (recentActivity.filter(a => a.type === 'login').length > 5) {
    await triggerSecurityAlert('multiple_login_attempts', userId);
  }
  
  // Unusual data access patterns
  if (activity.type === 'data_export' && 
      recentActivity.filter(a => a.type === 'data_export').length > 3) {
    await triggerSecurityAlert('unusual_data_access', userId);
  }
};
```

**Security Metrics Dashboard:**
- Failed login attempts per hour
- API rate limit violations
- Suspicious IP addresses
- Data export volumes
- Security event trends

### Automated Security Scanning

**Daily Security Checks:**
- Dependency vulnerability scanning
- Code security analysis
- Infrastructure security assessment
- SSL certificate monitoring

This comprehensive security framework ensures ResumeBuilder Pro maintains the highest standards of data protection and user privacy while providing a seamless user experience.

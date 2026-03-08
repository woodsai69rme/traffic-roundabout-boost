# Roundabout WebTraffic — Investor FAQ

## Product & Market

### 1. What is Roundabout WebTraffic?
An all-in-one social media management platform combining AI-powered content creation, cross-platform analytics, content scheduling, community-driven growth, and monetization tools. Built for creators, SMBs, and agencies.

### 2. How is this different from Hootsuite, Buffer, or Later?
Three key differentiators: (1) AI-powered content generation and optimization, (2) a unique reciprocal engagement community where creators grow together, and (3) significantly lower pricing starting at $0/mo with a generous free tier.

### 3. What platforms do you support?
Instagram, YouTube, TikTok, Twitter/X, Facebook, LinkedIn, Pinterest, Reddit, Snapchat, and Twitch — 10 platforms from launch.

### 4. Who is your target customer?
Primary: Individual creators with 1K–100K followers. Secondary: SMBs managing 3+ social accounts. Tertiary: Agencies managing client accounts.

### 5. What's the total addressable market?
The global social media management market is USD $21.3B (2024), growing at 23.6% CAGR. Our initial serviceable market (ANZ + SEA creators and SMBs) is approximately AUD $420M.

## Business Model

### 6. How do you make money?
Five revenue streams: SaaS subscriptions (primary), white-label licensing, creator marketplace commissions, API access fees, and AI credit usage.

### 7. What are your pricing tiers?
Free (3 profiles, basic features), Pro AUD $29/mo (10 profiles, AI content), Business AUD $79/mo (25 profiles, team features), Enterprise AUD $199/mo (unlimited, white-label, priority support).

### 8. What are your unit economics?
Target CAC of AUD $35, LTV of AUD $840 (29-month avg retention at $29/mo), yielding a 24:1 LTV:CAC ratio with 82% gross margins.

### 9. What's your path to profitability?
Break-even at ~1,500 paying users (approximately AUD $43.5K MRR). Target: Q4 2027.

## Technology

### 10. What's your tech stack?
React + TypeScript frontend, Supabase (PostgreSQL) backend with Row Level Security, Edge Functions for server logic, Lovable Cloud for hosting. AI via multiple LLM providers (Gemini, GPT-5).

### 11. Is the code production-ready?
Yes. The MVP includes 16 fully-built pages, 40+ components, 5 database tables with RLS policies, authentication with password reset, and comprehensive documentation (30 files).

### 12. How do you handle security?
Row Level Security on all database tables, JWT-based authentication, encrypted tokens for platform connections, HTTPS everywhere, no client-side secret storage.

### 13. Can the platform scale?
Yes. Supabase (PostgreSQL) handles millions of rows. The frontend is statically deployable to CDN. Edge Functions scale horizontally. No single points of failure.

## Traction & Growth

### 14. Do you have users?
Currently in pre-launch MVP stage. Beta launch planned for Q2 2026 with target of 1,000 users by Q3 2026.

### 15. What's your go-to-market strategy?
Content marketing (social media tips blog), creator community partnerships, Product Hunt launch, Reddit/Twitter organic growth, and a referral program with 20% recurring commissions.

### 16. What are your key metrics?
MRR, MAU, DAU/MAU ratio, churn rate, NPS, posts scheduled per user, AI content generation usage, community engagement score.

## Investment

### 17. How much are you raising?
Seed round of AUD $500,000.

### 18. What's the pre-money valuation?
AUD $2M–$3M (targeting 15–25% dilution).

### 19. How will funds be used?
45% engineering (2 senior developers), 25% marketing and growth, 15% infrastructure and AI costs, 15% legal/admin/contingency.

### 20. What's the exit strategy?
Three potential paths: (1) Acquisition by larger social media management company (Buffer, Sprout Social, HubSpot), (2) Strategic acquisition by a social platform (Meta, TikTok), (3) IPO at scale ($50M+ ARR).

## Risks & Mitigations

### 21. What if social platforms restrict API access?
We support 10 platforms — if one restricts access, users still get value from the other 9. We also offer manual posting workflows and CSV import as fallbacks.

### 22. What about competition from AI-native tools?
Our moat is the reciprocal engagement community — no AI tool can replicate a real network of creators supporting each other. AI is a feature, community is the product.

### 23. What if a major player copies you?
Enterprise tools (Sprout, Hootsuite) are too expensive and complex for our target market. Consumer tools (Buffer, Later) lack AI and community features. Our speed of execution and niche focus provide defensibility.

### 24. What are the key technical risks?
Platform API changes (mitigated by abstraction layer), AI model costs (mitigated by multiple provider support), and data security (mitigated by Supabase RLS + encryption).

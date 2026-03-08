
# 🚀 Roundabout WebTraffic — Social Media Management Platform

**AI-powered social media management for creators, marketers, and businesses.** Manage 10 platforms from one dashboard with real AI content generation, database-connected analytics, and full content scheduling.

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new) [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

---

## ⚡ Quick Start

```bash
git clone <repository-url>
cd roundabout
npm install
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173)

**Environment variables** (auto-configured in Lovable Cloud):
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

---

## 🌟 Features

### ✅ All Working — Zero Mock-Only Services

| Feature | Route | DB-Connected |
|---------|-------|-------------|
| Email/password auth + password reset | `/login`, `/register`, `/reset-password` | ✅ Supabase Auth |
| Dashboard with metrics | `/dashboard` | ✅ Multiple tables |
| 10-platform management | `/platforms` | ✅ platform_connections |
| Content scheduler (full CRUD) | `/content-planner` | ✅ scheduled_posts |
| Content templates | `/content-planner` | localStorage |
| AI content generation | `/ai-content` | ✅ Edge function |
| Analytics (charts + tables) | `/analytics` | ✅ analytics_snapshots |
| Audience insights + hashtags | `/audience-insights` | ✅ analytics_snapshots |
| Webhook management (CRUD) | `/api-integrations` | ✅ webhooks |
| Data export/import (JSON/CSV) | `/api-integrations` | ✅ Multiple tables |
| User profile | `/profile` | ✅ profiles |
| Communities | `/communities` | UI complete |
| Monetization | `/monetization` | UI complete |
| Documentation browser | `/documentation` | Static markdown |

### 🤖 Real AI (Not Mock)
- Edge function using **google/gemini-3-flash-preview** via Lovable AI Gateway
- Platform-specific, tone-aware, length-configurable content generation
- No API key required

### 🎨 UX Polish
- Skeleton loading states on Dashboard, Analytics, ContentPlanner
- EmptyState components with CTAs
- Dark/light theme toggle
- Responsive design

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS + shadcn/ui |
| State | TanStack Query + React Context |
| Routing | React Router v6 |
| Charts | Recharts |
| Backend | Supabase (PostgreSQL + Auth + Edge Functions) |
| AI | Lovable AI Gateway (google/gemini-3-flash-preview) |
| Theme | next-themes |

---

## 🚀 Deploy Anywhere

| Platform | Config | Command |
|----------|--------|---------|
| **Lovable Cloud** | Built-in | Publish button |
| **Vercel** | `vercel.json` | `vercel` |
| **Netlify** | `netlify.toml` | `netlify deploy` |
| **Docker** | `Dockerfile` | `docker build -t roundabout . && docker run -p 3000:80 roundabout` |
| **Railway** | — | Git push |
| **AWS Amplify** | — | Connect repo |
| **Render** | — | Connect repo |

---

## 📁 Project Structure

```
roundabout/
├── docs/                     # 30+ documentation files
│   └── prompts/              # Recreation + chat history prompts
├── public/platforms/          # Social platform SVG icons
├── src/
│   ├── components/           # 40+ React components
│   │   ├── ui/               # shadcn/ui base components
│   │   ├── ApiIntegrations/  # Platform + webhook + export
│   │   ├── AudienceInsights/ # Demographics + engagement
│   │   └── ContentScheduler/ # Calendar + posts + AI
│   ├── hooks/                # useAuth, useMobile, useToast
│   ├── integrations/         # Supabase client + types
│   ├── pages/                # 17 route pages
│   ├── services/             # DB-connected service layer
│   ├── types/                # TypeScript definitions
│   └── utils/                # Helpers + mock data
├── supabase/
│   ├── functions/            # Edge functions (generate-content)
│   └── migrations/           # Database migrations
├── Dockerfile                # Multi-stage Node/Nginx
├── netlify.toml              # Netlify config
└── vercel.json               # Vercel config
```

---

## 📖 Documentation

All 30 docs in `/docs/`:

| Doc | Content |
|-----|---------|
| [01_Product_Overview](docs/01_Product_Overview.md) | What, why, who, elevator pitch |
| [02_PRD](docs/02_PRD_Product_Requirements_Document.md) | Requirements, personas, stories |
| [03_Feature_Specs](docs/03_Feature_Specifications.md) | All features with status |
| [06_Architecture](docs/06_Technical_Architecture.md) | Stack, diagrams, data flow |
| [08_Database_Schema](docs/08_Database_Schema.md) | 5 tables, ERD, RLS policies |
| [10_Developer_Setup](docs/10_Developer_Setup.md) | Local + cloud setup |
| [13_Deployment](docs/13_Deployment.md) | All platform deploy guides |
| [24_Valuation](docs/24_Current_Valuation.md) | AUD $30K-$50K methodology |
| [25_TODO](docs/25_TODO_AND_CREDITS.md) | 35 enhancements + credits |

---

## 💰 Valuation (AUD)

| Stage | AUD | USD |
|-------|-----|-----|
| Current MVP | $30,000 — $50,000 | $19,000 — $32,000 |
| Beta (100 users) | $80,000 — $150,000 | $52,000 — $97,000 |
| Revenue ($500K ARR) | $4M — $8M | $2.6M — $5.2M |

---

## 📄 License

MIT License — see [LICENSE](./LICENSE) for details.

---

**Built with ❤️ using React, Supabase, and Lovable AI**

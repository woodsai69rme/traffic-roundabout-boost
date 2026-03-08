# Roundabout WebTraffic — Valuation Methodology

## Overview

This document outlines the valuation methodology used to estimate the current and projected value of Roundabout WebTraffic at various stages of development and growth. All figures are in **Australian Dollars (AUD)**.

## Valuation Methods Used

### 1. Cost-to-Recreate Method (Current MVP)

Estimates the cost to rebuild the current codebase from scratch with professional developers.

| Component | Hours | Rate (AUD/hr) | Cost (AUD) |
|-----------|-------|---------------|-----------|
| Frontend (16 pages, 40+ components) | 120–180 | $120 | $14,400–$21,600 |
| Database schema + RLS + triggers | 16–24 | $150 | $2,400–$3,600 |
| Auth system (login/register/reset) | 8–12 | $150 | $1,200–$1,800 |
| Service layer (5 services) | 20–30 | $130 | $2,600–$3,900 |
| Documentation (30 files) | 20–30 | $100 | $2,000–$3,000 |
| Design system + theming | 8–12 | $120 | $960–$1,440 |
| DevOps + deployment config | 4–8 | $140 | $560–$1,120 |
| **Total** | **196–296** | | **$24,120–$36,460** |

**MVP Valuation: AUD $18,000–$35,000** (discounted for lack of users/revenue)

### 2. Revenue Multiple Method (Projected)

Standard SaaS valuations use ARR multiples based on growth rate.

| Stage | ARR (AUD) | Multiple | Valuation (AUD) |
|-------|----------|---------|----------------|
| Pre-revenue (current) | $0 | N/A | $18K–$35K (cost basis) |
| Early traction (100 users) | $35K | 3–5x | $105K–$175K |
| Growth ($500K ARR) | $500K | 8–16x | $4M–$8M |
| Scale ($5M ARR) | $5M | 8–16x | $40M–$80M |

### 3. Comparable Transactions

| Company | Stage | Valuation | Revenue Multiple |
|---------|-------|-----------|-----------------|
| Buffer (2013 seed) | Early | USD $3.5M | ~20x ARR |
| Later (2019 Series A) | Growth | USD $25M | ~12x ARR |
| Sprout Social (IPO 2019) | Scale | USD $1.8B | ~15x ARR |
| Postiz (OSS, 2024) | Pre-rev | USD $0 (OSS) | N/A |

### 4. Discounted Cash Flow (5-Year Projection)

| Year | Users | MRR (AUD) | ARR (AUD) |
|------|-------|----------|----------|
| 2026 (Y1) | 500 | $8,500 | $102,000 |
| 2027 (Y2) | 3,000 | $52,000 | $624,000 |
| 2028 (Y3) | 12,000 | $195,000 | $2,340,000 |
| 2029 (Y4) | 30,000 | $420,000 | $5,040,000 |
| 2030 (Y5) | 50,000 | $650,000 | $7,800,000 |

**Assumptions:**
- Discount rate: 25% (early-stage risk)
- Terminal multiple: 10x ARR
- NPV of Year 5 terminal value: AUD $25.6M

## Current Valuation Summary

| Method | Low (AUD) | High (AUD) |
|--------|----------|-----------|
| Cost-to-recreate | $18,000 | $35,000 |
| Revenue multiple (pre-rev) | $18,000 | $35,000 |
| Comparable seed rounds | $50,000 | $150,000 |
| DCF (5-year NPV) | — | $25,600,000 |

**Current fair value estimate: AUD $18,000–$35,000** (pre-revenue, pre-users)

**Post-seed target valuation: AUD $2,000,000–$3,000,000** (with $500K raise at 15–25% dilution)

## Key Value Drivers

1. **Technical completeness** — Production-ready frontend with 16 pages, auth, DB
2. **AI integration** — Content generation using latest LLMs
3. **Unique community growth model** — Reciprocal engagement (no competitor has this)
4. **10-platform support** — Broad coverage from day one
5. **Comprehensive documentation** — 30-file doc suite reduces onboarding cost
6. **Open architecture** — Webhook support, API integrations, data export/import

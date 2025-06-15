
# 6. Technical Architecture

## Overview

This document outlines the technical architecture of the Roundabout WebTraffic platform. It details the system design, technology stack, and architectural patterns that ensure the platform is scalable, maintainable, and secure.

## High-Level Architecture

The platform is a modern web application built with a client-server architecture.

- **Frontend**: A Single-Page Application (SPA) built with React, responsible for the user interface and client-side logic.
- **Backend**: A Backend-as-a-Service (BaaS) model provided by Supabase, handling database, authentication, and serverless functions.
- **Integrations**: A service layer that communicates with third-party social media platform APIs.

```mermaid
graph TD
    A[User's Browser] --> B{Roundabout Frontend (React SPA)};
    B --> C(Supabase Auth);
    B --> D(Supabase Database);
    B --> E(Supabase Edge Functions);
    E --> F[External Social Media APIs];
    D -- Real-time updates --> B;
```

## Technology Stack

### Frontend
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Routing**: React Router
- **Data Fetching & State**: TanStack Query (React Query)
- **Icons**: Lucide React

### Backend (Supabase)
- **Database**: PostgreSQL
- **Authentication**: Supabase Auth (JWT-based)
- **Serverless Logic**: Supabase Edge Functions (Deno)
- **File Storage**: Supabase Storage

## Frontend Architecture

### Project Structure
The `src/` directory is organized by feature and function:
```
src/
├── assets/         # Static assets like images and fonts
├── components/     # Reusable React components (UI, Layout, Feature-specific)
├── hooks/          # Custom React hooks (e.g., useAuth)
├── integrations/   # Supabase client setup
├── lib/            # Utility functions and library configs
├── pages/          # Top-level page components for each route
├── services/       # Modules for API communication and business logic
└── types/          # TypeScript type definitions
```

### State Management
- **Server State**: Managed by **TanStack Query**. It handles caching, re-fetching, and synchronization of server data, significantly simplifying data logic.
- **Global UI State**: Managed via **React Context** for low-frequency updates like authentication status and theme.
- **Local Component State**: Managed with `useState` and `useReducer` for UI-specific state.

## Backend Architecture

### Supabase
We leverage Supabase for its integrated backend services, which accelerates development while providing scalability.
- **Database**: A relational PostgreSQL database is the source of truth. Data access is controlled by Row Level Security (RLS) policies.
- **Authentication**: Supabase handles user sign-up, login, and session management. It integrates directly with database RLS policies.
- **Edge Functions**: For custom server-side logic, such as communicating with third-party APIs or performing intensive computations, we use Deno-based Edge Functions.

### Data Flow & API
- **Client-to-Database**: The React app communicates with the Supabase database primarily through the `supabase-js` client library. RLS policies ensure users can only access their own data.
- **External APIs**: For fetching social media analytics or posting content, the frontend invokes a Supabase Edge Function, which securely holds API keys and communicates with the external platform. This prevents exposing sensitive credentials on the client side.

## Security
- **Authentication**: JWTs are used to manage user sessions.
- **Authorization**: Row Level Security (RLS) is enabled on all tables containing user data, ensuring strict data isolation.
- **API Keys**: All third-party API keys and secrets are stored securely within Supabase (e.g., in a secrets manager or a secure table) and are only accessible by Edge Functions, never exposed to the client.
- **Input Validation**: All user input is sanitized and validated on the client and/or server side to prevent injection attacks.

## Scalability
- **Stateless Frontend**: The React application is stateless, allowing for easy horizontal scaling via a CDN.
- **Managed Backend**: Supabase provides a scalable infrastructure that can be upgraded as user load increases.
- **Serverless Functions**: Edge Functions scale automatically based on demand.

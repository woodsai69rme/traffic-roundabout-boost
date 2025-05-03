
# Roundabout - Social Media Management Platform

## Project Overview

Roundabout is a comprehensive social media management platform designed to help content creators, marketers, and businesses streamline their social media presence across multiple platforms. The application offers tools for content scheduling, audience insights, campaign analytics, and AI-powered content creation.

![Roundabout Dashboard](https://placehold.co/600x400?text=Roundabout+Dashboard)

## Key Features

- **Content Calendar & Scheduling**: Plan and schedule content across multiple social media platforms
- **AI Content Generator**: Create engaging content with AI assistance based on your brand's tone and style
- **Analytics Dashboard**: Track performance metrics across all your social platforms
- **Audience Insights**: Gain deep understanding of your audience demographics and behaviors
- **Platform Integrations**: Connect with major social networks including Twitter, Instagram, Facebook, LinkedIn, and more

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI
- **State Management**: React Context API, React Query
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Deployment**: Vite build system

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm 7.x or later
- Supabase account (for database and authentication)

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd roundabout

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Configuration

Create a `.env` file in the root directory with the following variables:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Project Structure

```
roundabout/
├── docs/                  # Documentation files
├── public/                # Public assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/            # Base UI components (shadcn/ui)
│   │   ├── ContentScheduler/ # Content scheduling components
│   │   └── AudienceInsights/ # Audience analytics components
│   ├── hooks/             # Custom React hooks
│   ├── integrations/      # Third-party service integrations
│   ├── lib/               # Utility functions
│   ├── pages/             # Page components
│   ├── services/          # API service functions
│   └── utils/             # Helper utilities
└── supabase/              # Supabase configuration
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production-ready application
- `npm run lint` - Run ESLint to check for code issues
- `npm run preview` - Preview the production build locally

## Deployment

### Standard Deployment

Build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory, ready to be deployed to any static hosting service.

### Supabase Edge Functions

For serverless functions, deploy using the Supabase CLI:

```bash
supabase functions deploy function-name
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or feedback, please reach out to [support@roundabout.com](mailto:support@roundabout.com)

---

Built with [Lovable](https://lovable.dev/)

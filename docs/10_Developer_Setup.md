
# 10. Developer Setup Guide

## Overview
This guide provides instructions for setting up the development environment for the Roundabout WebTraffic project.

## Prerequisites
- **Node.js**: v18.x or later
- **npm**: v9.x or later
- **Git**: For version control
- **A Supabase Account**: The project is tightly integrated with Supabase for its backend.

## 1. Clone the Repository
First, clone the project from its source repository.
```bash
git clone <your-repo-url>
cd roundabout-webtraffic
```

## 2. Install Dependencies
Install the required Node.js packages using npm.
```bash
npm install
```

## 3. Set Up Environment Variables

The project uses Supabase for its backend. You need to connect it to your own Supabase project.

1.  **Create a Supabase Project**: Go to [supabase.com](https://supabase.com) and create a new project.
2.  **Get API Credentials**: In your Supabase project dashboard, navigate to **Project Settings > API**.
3.  **Create `.env` file**: Create a file named `.env` in the root of the project directory.
4.  **Add Credentials to `.env`**: Copy your Supabase URL and Anon Key into the `.env` file.

```.env
VITE_SUPABASE_URL="https://<your-project-ref>.supabase.co"
VITE_SUPABASE_ANON_KEY="<your-anon-key>"
```
**Important**: The application code will automatically pick up these variables. Do not commit the `.env` file to version control. A `.gitignore` entry is already in place to prevent this.

## 4. Set Up the Database Schema
The application requires specific tables in your Supabase database.
1.  Navigate to the **SQL Editor** in your Supabase dashboard.
2.  Execute the SQL scripts found in the `supabase/migrations` directory of this project to set up the necessary tables and policies. Start with the initial schema file and apply migrations in chronological order.

## 5. Start the Development Server
Once your environment variables are set and dependencies are installed, you can start the local development server.
```bash
npm run dev
```
The application will be available at `http://localhost:5173` (or another port if 5173 is in use). The server supports Hot Module Replacement (HMR), so changes you make to the code will be reflected in the browser instantly.

## 6. Development Workflow
- **Branching**: Create a new branch for each feature or bug fix (`feature/my-new-feature` or `fix/login-bug`).
- **Committing**: Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for your commit messages.
- **Code Style**: The project uses ESLint and Prettier to enforce a consistent code style. It's recommended to integrate these with your code editor to get real-time feedback.
- **Pull Requests**: Once your feature is complete, push your branch to the remote repository and open a Pull Request for review.

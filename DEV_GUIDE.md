
# Developer Guide - Roundabout

This guide provides essential information for developers working on the Roundabout social media management platform.

## Development Environment Setup

### Prerequisites

- **Node.js**: Version 16.x or higher
- **npm**: Version 7.x or higher
- **Git**: For version control
- **Editor**: VS Code recommended with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript Vue Plugin

### Initial Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd roundabout
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the project root with the following:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Architecture

### Folder Structure

```
src/
├── components/       # Reusable UI components
│   ├── ui/           # Base UI components from shadcn/ui
│   ├── ContentScheduler/ # Content scheduling components
│   ├── AudienceInsights/ # Audience insights components
│   └── ApiIntegrations/  # API integration components
├── hooks/            # Custom React hooks
├── integrations/     # Third-party service integrations
├── lib/              # Utility functions
├── pages/            # Page components
├── services/         # API service functions
└── utils/            # Helper utilities
```

### Key Technologies

- **React**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **shadcn/ui**: UI component library
- **React Router**: Routing
- **React Query**: Data fetching
- **Supabase**: Backend, database, and auth
- **Vite**: Build tool

## Development Workflow

### Git Workflow

1. Create a branch for your feature/fix:
   ```bash
   git checkout -b feature/feature-name
   ```

2. Make commits with clear messages:
   ```bash
   git commit -m "feat: add social media integration component"
   ```

3. Push your branch and create a pull request:
   ```bash
   git push origin feature/feature-name
   ```

### Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - A new feature
- `fix:` - A bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code changes that neither fix bugs nor add features
- `perf:` - Performance improvements
- `test:` - Adding or updating tests
- `build:` - Build system or external dependency changes
- `ci:` - CI configuration changes
- `chore:` - Other changes that don't modify src or test files

### Code Style Guidelines

- Use functional components with hooks for React components
- Use TypeScript interfaces for component props
- Follow the [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)
- Use named exports for all components, hooks, and utilities
- Prefer composition over inheritance
- Keep components focused and small (< 200 lines)

### Component Structure

```tsx
// Example component structure
import React from 'react';
import { Button } from '@/components/ui/button';

interface ExampleProps {
  title: string;
  onAction: () => void;
}

export const Example: React.FC<ExampleProps> = ({ title, onAction }) => {
  return (
    <div className="bg-background p-4 rounded-md">
      <h2 className="text-xl font-bold">{title}</h2>
      <Button onClick={onAction}>Click me</Button>
    </div>
  );
};

export default Example;
```

## State Management

### Component State

Use React's `useState` hook for component-level state:

```tsx
const [isOpen, setIsOpen] = useState(false);
```

### Application State

For global application state, use React Context API:

```tsx
// Example context
import { createContext, useContext, useState } from 'react';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Implementation...
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

### Data Fetching

Use React Query for data fetching:

```tsx
const { data, isLoading, error } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts
});
```

## Testing

### Running Tests

```bash
npm test          # Run all tests
npm test:watch    # Run tests in watch mode
npm test:coverage # Generate test coverage report
```

### Writing Tests

Use React Testing Library and Jest for testing:

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Example from './Example';

describe('Example', () => {
  it('renders the title', () => {
    render(<Example title="Test Title" onAction={() => {}} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('calls onAction when button is clicked', () => {
    const onAction = jest.fn();
    render(<Example title="Test Title" onAction={onAction} />);
    fireEvent.click(screen.getByText('Click me'));
    expect(onAction).toHaveBeenCalledTimes(1);
  });
});
```

## Adding New Features

1. **Plan**: Define the feature scope and design
2. **Create**: Implement the feature in small, focused PRs
3. **Test**: Add tests for the new feature
4. **Document**: Update documentation if necessary
5. **Review**: Request a code review from team members
6. **Iterate**: Address feedback and make necessary changes
7. **Merge**: Once approved, merge your PR

## Troubleshooting

### Common Issues

1. **Build Errors**:
   - Check for TypeScript errors
   - Verify all imports are correct
   - Ensure all dependencies are installed

2. **Styling Issues**:
   - Confirm Tailwind classes are correct
   - Check for CSS conflicts
   - Verify responsive design works across device sizes

3. **State Management**:
   - Use React DevTools to inspect component state
   - Check if state updates are triggering re-renders
   - Verify context values are being properly provided

### Debugging Tips

- Use browser developer tools for frontend issues
- Use `console.log` strategically (remember to remove before committing)
- For complex state issues, use the React DevTools profiler

## Performance Optimization

- Memoize expensive calculations with `useMemo` and `useCallback`
- Use virtualized lists for large data sets
- Implement code-splitting with React.lazy
- Optimize images and assets
- Use proper key props in lists

## Deployment

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Additional Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.io/docs)
- [React Query Documentation](https://tanstack.com/query/latest)

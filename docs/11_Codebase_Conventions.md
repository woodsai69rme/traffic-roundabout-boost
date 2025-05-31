
# Codebase Conventions

## ResumeBuilder Pro Coding Standards

### Document Information
- **Version**: 1.0
- **Last Updated**: 2025-01-31
- **Applies To**: All frontend code, documentation, and configuration

## General Principles

### Code Philosophy
1. **Clarity over cleverness**: Write code that is easy to understand
2. **Consistency**: Follow established patterns throughout the codebase
3. **Maintainability**: Code should be easy to modify and extend
4. **Performance**: Optimize for user experience without sacrificing readability
5. **Accessibility**: All UI components must be accessible by default

### DRY (Don't Repeat Yourself)
- Extract reusable components and utilities
- Use constants for repeated values
- Create custom hooks for shared logic

## File and Folder Structure

### Naming Conventions

**Files and Folders:**
```
PascalCase for components:     UserProfile.tsx
camelCase for utilities:       formatDate.ts
kebab-case for pages:          resume-builder.tsx
UPPER_CASE for constants:      API_ENDPOINTS.ts
```

**Examples:**
```
src/
├── components/
│   ├── ui/                    # shadcn/ui components
│   │   ├── Button.tsx
│   │   └── Input.tsx
│   ├── forms/                 # Form-specific components
│   │   ├── ResumeForm.tsx
│   │   └── LoginForm.tsx
│   ├── layouts/               # Layout components
│   │   ├── MainLayout.tsx
│   │   └── AuthLayout.tsx
│   └── sections/              # Page sections
│       ├── HeroSection.tsx
│       └── PricingSection.tsx
├── hooks/                     # Custom hooks
│   ├── useAuth.ts
│   └── useResume.ts
├── lib/                       # Utility functions
│   ├── utils.ts
│   ├── validations.ts
│   └── constants.ts
├── types/                     # Type definitions
│   ├── api.ts
│   ├── resume.ts
│   └── user.ts
└── stores/                    # State management
    ├── authStore.ts
    └── resumeStore.ts
```

### Import Organization

**Import Order:**
1. React and React-related libraries
2. Third-party libraries
3. Internal utilities and hooks
4. Components
5. Types
6. Relative imports

```typescript
// ✅ Good
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { formatDate } from '@/lib/utils';
import type { Resume } from '@/types/resume';
import './styles.css';

// ❌ Bad - mixed order
import { Button } from '@/components/ui/button';
import React from 'react';
import type { Resume } from '@/types/resume';
import { z } from 'zod';
```

## TypeScript Conventions

### Type Definitions

**Interface vs Type:**
```typescript
// ✅ Use interfaces for object shapes that might be extended
interface User {
  id: string;
  email: string;
  name: string;
}

interface AdminUser extends User {
  permissions: string[];
}

// ✅ Use types for unions, primitives, and computed types
type Status = 'pending' | 'approved' | 'rejected';
type UserWithStatus = User & { status: Status };
```

**Naming Conventions:**
```typescript
// ✅ PascalCase for types and interfaces
interface UserProfile { }
type ApiResponse<T> = { }

// ✅ Prefix props interfaces with component name
interface UserCardProps {
  user: User;
  onEdit: (id: string) => void;
}

// ✅ Use descriptive generic names
interface ApiResponse<TData, TError = Error> {
  data: TData;
  error?: TError;
}
```

**Function Types:**
```typescript
// ✅ Explicit function types for props
interface ButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}

// ✅ Use function declarations for components
function UserCard({ user, onEdit }: UserCardProps) {
  // component logic
}

// ✅ Use arrow functions for event handlers and utilities
const handleSubmit = (data: FormData) => {
  // handle submission
};
```

### Error Handling

**Custom Error Types:**
```typescript
// ✅ Create specific error types
class ValidationError extends Error {
  constructor(
    message: string,
    public field: string,
    public code: string
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

// ✅ Use Result pattern for operations that can fail
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

const parseResume = (data: unknown): Result<Resume, ValidationError> => {
  try {
    const resume = resumeSchema.parse(data);
    return { success: true, data: resume };
  } catch (error) {
    return { 
      success: false, 
      error: new ValidationError('Invalid resume data', 'root', 'PARSE_ERROR')
    };
  }
};
```

## React Component Conventions

### Component Structure

```typescript
// ✅ Component template
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import type { User } from '@/types/user';

interface UserProfileProps {
  user: User;
  onSave: (user: User) => void;
  onCancel: () => void;
}

function UserProfile({ user, onSave, onCancel }: UserProfileProps) {
  // 1. Hooks (useState, useEffect, custom hooks)
  const { updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  // 2. Effects
  useEffect(() => {
    setFormData(user);
  }, [user]);

  // 3. Event handlers
  const handleSave = async () => {
    try {
      await updateUser(formData);
      onSave(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
    onCancel();
  };

  // 4. Render helpers (if needed)
  const renderActionButtons = () => {
    if (!isEditing) {
      return (
        <Button onClick={() => setIsEditing(true)}>
          Edit Profile
        </Button>
      );
    }

    return (
      <div className="flex gap-2">
        <Button onClick={handleSave}>Save</Button>
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    );
  };

  // 5. Main render
  return (
    <div className="user-profile">
      {/* Component JSX */}
      {renderActionButtons()}
    </div>
  );
}

export default UserProfile;
```

### Hook Conventions

```typescript
// ✅ Custom hook structure
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Resume } from '@/types/resume';

interface UseResumeReturn {
  resume: Resume | null;
  loading: boolean;
  error: Error | null;
  updateResume: (data: Partial<Resume>) => Promise<void>;
  deleteResume: () => Promise<void>;
}

export function useResume(resumeId: string): UseResumeReturn {
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchResume();
  }, [resumeId]);

  const fetchResume = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('id', resumeId)
        .single();

      if (error) throw error;
      setResume(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const updateResume = async (updates: Partial<Resume>) => {
    try {
      const { error } = await supabase
        .from('resumes')
        .update(updates)
        .eq('id', resumeId);

      if (error) throw error;
      setResume(prev => prev ? { ...prev, ...updates } : null);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const deleteResume = async () => {
    try {
      const { error } = await supabase
        .from('resumes')
        .delete()
        .eq('id', resumeId);

      if (error) throw error;
      setResume(null);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    resume,
    loading,
    error,
    updateResume,
    deleteResume
  };
}
```

## Styling Conventions

### Tailwind CSS Usage

**Class Organization:**
```typescript
// ✅ Logical grouping of classes
<div className={cn(
  // Layout
  "flex items-center justify-between",
  // Spacing
  "p-4 m-2",
  // Appearance
  "bg-white border border-gray-200 rounded-lg shadow-sm",
  // States
  "hover:shadow-md focus:ring-2 focus:ring-blue-500",
  // Responsive
  "md:p-6 lg:p-8"
)}>

// ❌ Random order
<div className="hover:shadow-md bg-white p-4 flex border-gray-200 rounded-lg items-center justify-between">
```

**Component Variants with CVA:**
```typescript
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  // Base styles
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary"
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

interface ButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
```

## Data Fetching Conventions

### API Layer Organization

```typescript
// ✅ Organized API functions
// lib/api/resumes.ts
export const resumeApi = {
  getAll: async (): Promise<Resume[]> => {
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .order('updated_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  getById: async (id: string): Promise<Resume> => {
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  create: async (resume: CreateResumeData): Promise<Resume> => {
    const { data, error } = await supabase
      .from('resumes')
      .insert(resume)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  update: async (id: string, updates: Partial<Resume>): Promise<Resume> => {
    const { data, error } = await supabase
      .from('resumes')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('resumes')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
```

### React Query Integration

```typescript
// ✅ Query keys and functions
// lib/queries/resume-queries.ts
export const resumeKeys = {
  all: ['resumes'] as const,
  lists: () => [...resumeKeys.all, 'list'] as const,
  list: (filters: string) => [...resumeKeys.lists(), { filters }] as const,
  details: () => [...resumeKeys.all, 'detail'] as const,
  detail: (id: string) => [...resumeKeys.details(), id] as const,
};

export const useResumes = () => {
  return useQuery({
    queryKey: resumeKeys.lists(),
    queryFn: resumeApi.getAll
  });
};

export const useResume = (id: string) => {
  return useQuery({
    queryKey: resumeKeys.detail(id),
    queryFn: () => resumeApi.getById(id),
    enabled: !!id
  });
};

export const useCreateResume = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: resumeApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: resumeKeys.lists() });
    }
  });
};
```

## State Management Conventions

### Zustand Store Structure

```typescript
// ✅ Store organization
// stores/auth-store.ts
interface AuthState {
  // State
  user: User | null;
  session: Session | null;
  loading: boolean;
  
  // Actions
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  
  // Internal actions (not exposed in interface)
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  user: null,
  session: null,
  loading: true,

  // Actions
  signIn: async (email, password) => {
    set({ loading: true });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      
      set({ 
        user: data.user, 
        session: data.session,
        loading: false 
      });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null });
  },

  updateProfile: async (updates) => {
    const { user } = get();
    if (!user) throw new Error('No user logged in');

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();

    if (error) throw error;
    set({ user: { ...user, ...data } });
  },

  // Internal actions
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setLoading: (loading) => set({ loading })
}));
```

## Testing Conventions

### Unit Test Structure

```typescript
// ✅ Test organization
// __tests__/components/UserProfile.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import UserProfile from '@/components/UserProfile';
import type { User } from '@/types/user';

// Mock dependencies
vi.mock('@/hooks/useAuth', () => ({
  useAuth: vi.fn(() => ({
    updateUser: vi.fn()
  }))
}));

describe('UserProfile', () => {
  const mockUser: User = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User'
  };

  const defaultProps = {
    user: mockUser,
    onSave: vi.fn(),
    onCancel: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders user information correctly', () => {
    render(<UserProfile {...defaultProps} />);
    
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('enters edit mode when edit button is clicked', async () => {
    render(<UserProfile {...defaultProps} />);
    
    fireEvent.click(screen.getByText('Edit Profile'));
    
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('calls onSave when save button is clicked', async () => {
    const { updateUser } = useAuth();
    render(<UserProfile {...defaultProps} />);
    
    fireEvent.click(screen.getByText('Edit Profile'));
    fireEvent.click(screen.getByText('Save'));
    
    await waitFor(() => {
      expect(updateUser).toHaveBeenCalledWith(mockUser);
      expect(defaultProps.onSave).toHaveBeenCalledWith(mockUser);
    });
  });
});
```

## Documentation Conventions

### Code Comments

```typescript
// ✅ Good comments explain why, not what
/**
 * Calculates ATS score based on resume completeness and keyword matching.
 * Uses weighted scoring algorithm where personal info and experience
 * carry more weight than optional sections.
 */
function calculateATSScore(resume: Resume): number {
  // Weight personal info higher as it's required by most ATS systems
  const personalInfoScore = validatePersonalInfo(resume.personalInfo) * 0.3;
  
  // Experience descriptions are crucial for keyword matching
  const experienceScore = calculateExperienceScore(resume.experience) * 0.4;
  
  return Math.min(personalInfoScore + experienceScore + otherScores, 100);
}

// ❌ Bad comments state the obvious
// Increment the counter by 1
counter = counter + 1;

// Set loading to true
setLoading(true);
```

### JSDoc for Public APIs

```typescript
/**
 * Custom hook for managing resume data with CRUD operations.
 * 
 * @param resumeId - The ID of the resume to manage
 * @returns Object containing resume data and management functions
 * 
 * @example
 * ```tsx
 * function ResumeEditor({ resumeId }: { resumeId: string }) {
 *   const { resume, loading, updateResume } = useResume(resumeId);
 * 
 *   if (loading) return <div>Loading...</div>;
 * 
 *   return (
 *     <div>
 *       <h1>{resume?.title}</h1>
 *       <button onClick={() => updateResume({ title: 'New Title' })}>
 *         Update Title
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useResume(resumeId: string): UseResumeReturn {
  // Implementation
}
```

These conventions ensure consistency across the ResumeBuilder Pro codebase and make it easier for team members to collaborate effectively.

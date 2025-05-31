
# Testing Strategy

## ResumeBuilder Pro Testing Framework

### Document Information
- **Version**: 1.0
- **Last Updated**: 2025-01-31
- **Testing Tools**: Vitest, Playwright, Testing Library

## Testing Philosophy

### Testing Pyramid
Our testing strategy follows the testing pyramid approach:

1. **Unit Tests (70%)**: Fast, isolated tests for individual functions and components
2. **Integration Tests (20%)**: Tests for component interactions and API integrations
3. **End-to-End Tests (10%)**: Complete user journey testing

### Testing Principles
- **Test behavior, not implementation**: Focus on what the user experiences
- **Arrange, Act, Assert**: Structure tests clearly
- **Test-driven development**: Write tests before implementation when possible
- **Fail fast**: Tests should catch issues early in development
- **Maintainable tests**: Tests should be easy to understand and modify

## Unit Testing

### Framework: Vitest + React Testing Library

**Configuration** (`vitest.config.ts`):
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*'
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
```

### Test Categories

#### Component Testing
```typescript
// __tests__/components/ResumeForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import ResumeForm from '@/components/ResumeForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Test utilities
const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false }
  }
});

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  );
};

describe('ResumeForm', () => {
  const mockProps = {
    data: {
      personalInfo: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com'
      },
      experience: [],
      skills: []
    },
    onChange: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Personal Information Section', () => {
    it('renders personal info fields correctly', () => {
      renderWithProviders(<ResumeForm {...mockProps} />);
      
      expect(screen.getByLabelText(/first name/i)).toHaveValue('John');
      expect(screen.getByLabelText(/last name/i)).toHaveValue('Doe');
      expect(screen.getByLabelText(/email/i)).toHaveValue('john@example.com');
    });

    it('calls onChange when personal info is updated', async () => {
      const user = userEvent.setup();
      renderWithProviders(<ResumeForm {...mockProps} />);
      
      const firstNameInput = screen.getByLabelText(/first name/i);
      await user.clear(firstNameInput);
      await user.type(firstNameInput, 'Jane');
      
      expect(mockProps.onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          personalInfo: expect.objectContaining({
            firstName: 'Jane'
          })
        })
      );
    });

    it('validates required fields', async () => {
      const user = userEvent.setup();
      renderWithProviders(<ResumeForm {...mockProps} />);
      
      const emailInput = screen.getByLabelText(/email/i);
      await user.clear(emailInput);
      await user.type(emailInput, 'invalid-email');
      
      await waitFor(() => {
        expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
      });
    });
  });

  describe('Experience Section', () => {
    it('adds new experience when button is clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(<ResumeForm {...mockProps} />);
      
      // Navigate to experience tab
      await user.click(screen.getByText(/experience/i));
      
      // Add experience
      await user.click(screen.getByText(/add experience/i));
      
      expect(mockProps.onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          experience: expect.arrayContaining([
            expect.objectContaining({
              company: '',
              position: '',
              startDate: '',
              endDate: ''
            })
          ])
        })
      );
    });

    it('removes experience when delete button is clicked', async () => {
      const user = userEvent.setup();
      const propsWithExperience = {
        ...mockProps,
        data: {
          ...mockProps.data,
          experience: [
            {
              id: 1,
              company: 'Test Company',
              position: 'Developer',
              startDate: '2020-01',
              endDate: '2021-01'
            }
          ]
        }
      };
      
      renderWithProviders(<ResumeForm {...propsWithExperience} />);
      
      await user.click(screen.getByText(/experience/i));
      await user.click(screen.getByTestId('delete-experience-1'));
      
      expect(mockProps.onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          experience: []
        })
      );
    });
  });
});
```

#### Hook Testing
```typescript
// __tests__/hooks/useResume.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { useResume } from '@/hooks/useResume';
import { supabase } from '@/integrations/supabase/client';

// Mock Supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn()
        }))
      })),
      update: vi.fn(() => ({
        eq: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn()
          }))
        }))
      }))
    }))
  }
}));

describe('useResume', () => {
  const mockResume = {
    id: '1',
    title: 'Software Engineer Resume',
    personalInfo: { firstName: 'John', lastName: 'Doe' },
    experience: [],
    skills: []
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches resume data on mount', async () => {
    const mockSelect = vi.fn().mockReturnValue({
      eq: vi.fn().mockReturnValue({
        single: vi.fn().mockResolvedValue({
          data: mockResume,
          error: null
        })
      })
    });
    
    (supabase.from as any).mockReturnValue({
      select: mockSelect
    });

    const { result } = renderHook(() => useResume('1'));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.resume).toEqual(mockResume);
      expect(result.current.error).toBe(null);
    });
  });

  it('handles fetch errors correctly', async () => {
    const mockError = new Error('Failed to fetch');
    const mockSelect = vi.fn().mockReturnValue({
      eq: vi.fn().mockReturnValue({
        single: vi.fn().mockResolvedValue({
          data: null,
          error: mockError
        })
      })
    });
    
    (supabase.from as any).mockReturnValue({
      select: mockSelect
    });

    const { result } = renderHook(() => useResume('1'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.resume).toBe(null);
      expect(result.current.error).toEqual(mockError);
    });
  });

  it('updates resume data correctly', async () => {
    // Setup initial data
    const mockSelect = vi.fn().mockReturnValue({
      eq: vi.fn().mockReturnValue({
        single: vi.fn().mockResolvedValue({
          data: mockResume,
          error: null
        })
      })
    });
    
    const mockUpdate = vi.fn().mockReturnValue({
      eq: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({
            data: { ...mockResume, title: 'Updated Title' },
            error: null
          })
        })
      })
    });

    (supabase.from as any).mockReturnValue({
      select: mockSelect,
      update: mockUpdate
    });

    const { result } = renderHook(() => useResume('1'));

    // Wait for initial load
    await waitFor(() => {
      expect(result.current.resume).toEqual(mockResume);
    });

    // Update resume
    await result.current.updateResume({ title: 'Updated Title' });

    expect(mockUpdate).toHaveBeenCalledWith({ title: 'Updated Title' });
    expect(result.current.resume?.title).toBe('Updated Title');
  });
});
```

#### Utility Function Testing
```typescript
// __tests__/lib/utils.test.ts
import { 
  formatDate, 
  calculateATSScore, 
  validateEmail,
  generateResumeSlug 
} from '@/lib/utils';

describe('Utility Functions', () => {
  describe('formatDate', () => {
    it('formats date strings correctly', () => {
      expect(formatDate('2023-12-25')).toBe('December 2023');
      expect(formatDate('2023-01-01')).toBe('January 2023');
    });

    it('handles invalid dates gracefully', () => {
      expect(formatDate('')).toBe('');
      expect(formatDate('invalid')).toBe('');
      expect(formatDate(null as any)).toBe('');
    });
  });

  describe('calculateATSScore', () => {
    const completeResume = {
      personalInfo: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        location: 'San Francisco, CA',
        summary: 'Experienced software engineer with 5+ years of experience'
      },
      experience: [
        {
          company: 'Tech Corp',
          position: 'Software Engineer',
          startDate: '2020-01',
          endDate: '2023-12',
          achievements: ['Increased performance by 40%']
        }
      ],
      skills: [
        { name: 'JavaScript', category: 'Technical' },
        { name: 'React', category: 'Technical' },
        { name: 'Node.js', category: 'Technical' },
        { name: 'Python', category: 'Technical' },
        { name: 'Communication', category: 'Soft Skills' }
      ],
      education: [
        {
          school: 'University',
          degree: 'Bachelor',
          field: 'Computer Science'
        }
      ]
    };

    it('calculates high score for complete resume', () => {
      const score = calculateATSScore(completeResume);
      expect(score).toBeGreaterThan(80);
    });

    it('penalizes missing required information', () => {
      const incompleteResume = {
        ...completeResume,
        personalInfo: {
          firstName: 'John',
          // Missing required fields
        },
        experience: []
      };
      
      const score = calculateATSScore(incompleteResume);
      expect(score).toBeLessThan(50);
    });

    it('rewards quantified achievements', () => {
      const resumeWithQuantifiedAchievements = {
        ...completeResume,
        experience: [
          {
            ...completeResume.experience[0],
            achievements: [
              'Increased system performance by 40%',
              'Reduced bugs by 60%',
              'Led team of 5 developers'
            ]
          }
        ]
      };
      
      const baseScore = calculateATSScore(completeResume);
      const enhancedScore = calculateATSScore(resumeWithQuantifiedAchievements);
      
      expect(enhancedScore).toBeGreaterThan(baseScore);
    });
  });

  describe('validateEmail', () => {
    it('validates correct email formats', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name+tag@domain.co.uk')).toBe(true);
    });

    it('rejects invalid email formats', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('generateResumeSlug', () => {
    it('generates URL-friendly slugs', () => {
      expect(generateResumeSlug('Software Engineer Resume')).toBe('software-engineer-resume');
      expect(generateResumeSlug('My Amazing Resume!!!')).toBe('my-amazing-resume');
    });

    it('handles special characters and spaces', () => {
      expect(generateResumeSlug('Résumé with Åccénts')).toBe('resume-with-accents');
      expect(generateResumeSlug('Multiple   Spaces')).toBe('multiple-spaces');
    });

    it('handles empty or invalid input', () => {
      expect(generateResumeSlug('')).toBe('untitled-resume');
      expect(generateResumeSlug('!!!')).toBe('untitled-resume');
    });
  });
});
```

## Integration Testing

### API Integration Tests
```typescript
// __tests__/integration/api.test.ts
import { createClient } from '@supabase/supabase-js';
import { resumeApi } from '@/lib/api/resumes';

// Use test database
const supabaseTest = createClient(
  process.env.VITE_SUPABASE_TEST_URL!,
  process.env.VITE_SUPABASE_TEST_ANON_KEY!
);

describe('Resume API Integration', () => {
  let testUserId: string;
  let testResumeId: string;

  beforeAll(async () => {
    // Create test user
    const { data: authData } = await supabaseTest.auth.signUp({
      email: 'test@example.com',
      password: 'testpassword123'
    });
    testUserId = authData.user!.id;
  });

  afterAll(async () => {
    // Cleanup test data
    await supabaseTest.from('resumes').delete().eq('user_id', testUserId);
    await supabaseTest.auth.admin.deleteUser(testUserId);
  });

  describe('Resume CRUD Operations', () => {
    it('creates a new resume', async () => {
      const resumeData = {
        title: 'Test Resume',
        personalInfo: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com'
        },
        experience: [],
        skills: []
      };

      const createdResume = await resumeApi.create(resumeData);
      testResumeId = createdResume.id;

      expect(createdResume).toMatchObject(resumeData);
      expect(createdResume.id).toBeDefined();
      expect(createdResume.user_id).toBe(testUserId);
    });

    it('retrieves resume by ID', async () => {
      const resume = await resumeApi.getById(testResumeId);

      expect(resume.id).toBe(testResumeId);
      expect(resume.title).toBe('Test Resume');
    });

    it('updates resume data', async () => {
      const updates = {
        title: 'Updated Test Resume',
        personalInfo: {
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane@example.com'
        }
      };

      const updatedResume = await resumeApi.update(testResumeId, updates);

      expect(updatedResume.title).toBe('Updated Test Resume');
      expect(updatedResume.personalInfo.firstName).toBe('Jane');
    });

    it('deletes resume', async () => {
      await resumeApi.delete(testResumeId);

      await expect(resumeApi.getById(testResumeId))
        .rejects.toThrow('Resume not found');
    });
  });

  describe('Resume Permissions', () => {
    it('prevents access to other users resumes', async () => {
      // Create resume with different user
      const { data: otherUser } = await supabaseTest.auth.signUp({
        email: 'other@example.com',
        password: 'password123'
      });

      const otherUserResume = await resumeApi.create({
        title: 'Other User Resume',
        personalInfo: { firstName: 'Other', lastName: 'User' },
        experience: [],
        skills: []
      });

      // Switch back to original user
      await supabaseTest.auth.signInWithPassword({
        email: 'test@example.com',
        password: 'testpassword123'
      });

      // Should not be able to access other user's resume
      await expect(resumeApi.getById(otherUserResume.id))
        .rejects.toThrow('Access denied');
    });
  });
});
```

## End-to-End Testing

### Framework: Playwright

**Configuration** (`playwright.config.ts`):
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['junit', { outputFile: 'test-results/junit.xml' }]
  ],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    },
    {
      name: 'mobile',
      use: { ...devices['iPhone 13'] }
    }
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000
  }
});
```

### E2E Test Examples
```typescript
// tests/e2e/resume-builder.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Resume Builder Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'testpassword123');
    await page.click('[data-testid="login-button"]');
    await expect(page).toHaveURL('/dashboard');
  });

  test('creates a complete resume from scratch', async ({ page }) => {
    // Navigate to resume builder
    await page.click('[data-testid="create-resume-button"]');
    await expect(page).toHaveURL('/resume-builder');

    // Step 1: Choose template
    await page.click('[data-testid="template-modern"]');
    await page.click('[data-testid="next-button"]');

    // Step 2: Personal Information
    await page.fill('[data-testid="first-name"]', 'John');
    await page.fill('[data-testid="last-name"]', 'Doe');
    await page.fill('[data-testid="email"]', 'john@example.com');
    await page.fill('[data-testid="phone"]', '+1234567890');
    await page.fill('[data-testid="location"]', 'San Francisco, CA');
    await page.fill('[data-testid="summary"]', 'Experienced software engineer with 5+ years of experience');
    
    await page.click('[data-testid="next-button"]');

    // Step 3: Experience
    await page.click('[data-testid="add-experience"]');
    await page.fill('[data-testid="company-0"]', 'Tech Corp');
    await page.fill('[data-testid="position-0"]', 'Software Engineer');
    await page.fill('[data-testid="start-date-0"]', '2020-01');
    await page.fill('[data-testid="end-date-0"]', '2023-12');
    await page.fill('[data-testid="description-0"]', 'Developed web applications using React and Node.js');

    await page.click('[data-testid="next-button"]');

    // Step 4: Skills
    await page.fill('[data-testid="skill-input"]', 'JavaScript');
    await page.press('[data-testid="skill-input"]', 'Enter');
    await page.fill('[data-testid="skill-input"]', 'React');
    await page.press('[data-testid="skill-input"]', 'Enter');
    await page.fill('[data-testid="skill-input"]', 'Node.js');
    await page.press('[data-testid="skill-input"]', 'Enter');

    await page.click('[data-testid="next-button"]');

    // Step 5: Preview and Save
    await expect(page.locator('[data-testid="resume-preview"]')).toContainText('John Doe');
    await expect(page.locator('[data-testid="resume-preview"]')).toContainText('Tech Corp');
    await expect(page.locator('[data-testid="resume-preview"]')).toContainText('JavaScript');

    await page.fill('[data-testid="resume-title"]', 'Software Engineer Resume');
    await page.click('[data-testid="save-resume"]');

    // Verify redirect to dashboard with new resume
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('[data-testid="resume-list"]')).toContainText('Software Engineer Resume');
  });

  test('exports resume to PDF', async ({ page }) => {
    // Assume we have a resume created
    await page.goto('/dashboard');
    await page.click('[data-testid="resume-item"]:first-child [data-testid="export-pdf"]');

    // Wait for download
    const downloadPromise = page.waitForEvent('download');
    await page.click('[data-testid="download-pdf-button"]');
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toMatch(/\.pdf$/);
    
    // Verify file was downloaded
    const path = await download.path();
    expect(path).toBeTruthy();
  });

  test('shares resume with public link', async ({ page }) => {
    await page.goto('/dashboard');
    await page.click('[data-testid="resume-item"]:first-child [data-testid="share-button"]');
    
    await page.check('[data-testid="public-sharing"]');
    await page.click('[data-testid="generate-link"]');
    
    const shareLink = await page.locator('[data-testid="share-link"]').textContent();
    expect(shareLink).toMatch(/^https?:\/\//);

    // Test the shared link in new context
    const newContext = await page.context().browser()!.newContext();
    const newPage = await newContext.newPage();
    await newPage.goto(shareLink!);
    
    await expect(newPage.locator('[data-testid="shared-resume"]')).toContainText('John Doe');
    
    await newContext.close();
  });
});

// tests/e2e/ai-optimization.spec.ts
test.describe('AI Resume Optimization', () => {
  test('optimizes resume with AI suggestions', async ({ page }) => {
    await page.goto('/resume-builder');
    
    // Create basic resume data
    // ... (setup code)
    
    // Navigate to AI optimization
    await page.click('[data-testid="ai-optimize-tab"]');
    
    // Paste job description
    await page.fill('[data-testid="job-description"]', `
      We are looking for a Senior Software Engineer with expertise in:
      - React and TypeScript
      - AWS and microservices
      - Team leadership experience
      - Agile development methodologies
    `);
    
    await page.click('[data-testid="analyze-button"]');
    
    // Wait for AI analysis
    await expect(page.locator('[data-testid="ats-score"]')).toBeVisible({ timeout: 10000 });
    
    const atsScore = await page.locator('[data-testid="ats-score"]').textContent();
    expect(parseInt(atsScore!)).toBeGreaterThan(0);
    
    // Check for suggestions
    await expect(page.locator('[data-testid="ai-suggestions"]')).toContainText('keyword');
    
    // Apply a suggestion
    await page.click('[data-testid="apply-suggestion"]:first-child');
    
    // Verify the change was applied
    await expect(page.locator('[data-testid="success-message"]')).toContainText('Applied');
  });
});
```

## Performance Testing

### Load Testing with Artillery

**Configuration** (`artillery.yml`):
```yaml
config:
  target: 'http://localhost:3000'
  phases:
    - duration: 60
      arrivalRate: 5
      name: "Warm up"
    - duration: 300
      arrivalRate: 10
      name: "Sustained load"
    - duration: 120
      arrivalRate: 25
      name: "Peak load"
  processor: "./test-functions.js"

scenarios:
  - name: "Complete resume creation flow"
    weight: 70
    flow:
      - post:
          url: "/api/auth/login"
          json:
            email: "test@example.com"
            password: "testpassword123"
          capture:
            - json: "$.access_token"
              as: "token"
      - post:
          url: "/api/resumes"
          headers:
            Authorization: "Bearer {{ token }}"
          json:
            title: "Load Test Resume"
            personalInfo:
              firstName: "Test"
              lastName: "User"
              email: "test@example.com"
          capture:
            - json: "$.id"
              as: "resumeId"
      - put:
          url: "/api/resumes/{{ resumeId }}"
          headers:
            Authorization: "Bearer {{ token }}"
          json:
            experience:
              - company: "Test Company"
                position: "Developer"
                startDate: "2020-01"
                endDate: "2023-12"
      - post:
          url: "/api/export/pdf"
          headers:
            Authorization: "Bearer {{ token }}"
          json:
            resume_id: "{{ resumeId }}"

  - name: "AI optimization requests"
    weight: 30
    flow:
      - post:
          url: "/api/auth/login"
          json:
            email: "test@example.com"
            password: "testpassword123"
          capture:
            - json: "$.access_token"
              as: "token"
      - post:
          url: "/api/ai/optimize"
          headers:
            Authorization: "Bearer {{ token }}"
          json:
            resume_id: "existing-resume-id"
            job_description: "Software engineer position requiring React and Node.js experience"
```

## Visual Regression Testing

### Framework: Playwright + Argos CI

```typescript
// tests/visual/components.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test('resume preview renders correctly', async ({ page }) => {
    await page.goto('/resume-builder/preview');
    
    // Wait for all content to load
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of the entire resume preview
    await expect(page.locator('[data-testid="resume-preview"]')).toHaveScreenshot('resume-preview.png');
  });

  test('template gallery displays correctly', async ({ page }) => {
    await page.goto('/templates');
    
    await page.waitForLoadState('networkidle');
    
    // Test different viewport sizes
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page).toHaveScreenshot('templates-desktop.png');
    
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page).toHaveScreenshot('templates-tablet.png');
    
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page).toHaveScreenshot('templates-mobile.png');
  });

  test('form components render consistently', async ({ page }) => {
    await page.goto('/styleguide'); // Component showcase page
    
    // Test different states
    await expect(page.locator('[data-testid="button-variants"]')).toHaveScreenshot('button-variants.png');
    await expect(page.locator('[data-testid="form-elements"]')).toHaveScreenshot('form-elements.png');
    await expect(page.locator('[data-testid="cards"]')).toHaveScreenshot('card-components.png');
  });
});
```

## Test Data Management

### Test Fixtures
```typescript
// tests/fixtures/resume-data.ts
export const mockUser = {
  id: 'test-user-id',
  email: 'test@example.com',
  name: 'Test User'
};

export const completeResumeData = {
  title: 'Software Engineer Resume',
  personalInfo: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    website: 'https://johndoe.com',
    linkedin: 'https://linkedin.com/in/johndoe',
    summary: 'Experienced software engineer with 5+ years developing scalable web applications using React, Node.js, and cloud technologies.'
  },
  experience: [
    {
      id: 1,
      company: 'Tech Corp',
      position: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      startDate: '2020-01',
      endDate: '2023-12',
      current: false,
      description: 'Led development of customer-facing web applications',
      achievements: [
        'Increased application performance by 40% through optimization',
        'Led a cross-functional team of 5 developers',
        'Implemented CI/CD pipeline reducing deployment time by 60%'
      ]
    }
  ],
  skills: [
    { id: 1, name: 'JavaScript', level: 'Expert', category: 'Technical' },
    { id: 2, name: 'React', level: 'Expert', category: 'Technical' },
    { id: 3, name: 'Node.js', level: 'Advanced', category: 'Technical' },
    { id: 4, name: 'Leadership', level: 'Advanced', category: 'Soft Skills' }
  ],
  education: [
    {
      id: 1,
      school: 'University of California, Berkeley',
      degree: "Bachelor's Degree",
      field: 'Computer Science',
      location: 'Berkeley, CA',
      startDate: '2015-08',
      endDate: '2019-05',
      gpa: '3.8'
    }
  ]
};

export const minimalResumeData = {
  title: 'Basic Resume',
  personalInfo: {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com'
  },
  experience: [],
  skills: [],
  education: []
};
```

### Database Seeding for Tests
```typescript
// tests/utils/db-setup.ts
import { createClient } from '@supabase/supabase-js';
import { completeResumeData, mockUser } from '../fixtures/resume-data';

const supabaseTest = createClient(
  process.env.VITE_SUPABASE_TEST_URL!,
  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY!
);

export async function setupTestDatabase() {
  // Create test user
  const { data: user } = await supabaseTest.auth.admin.createUser({
    email: mockUser.email,
    password: 'testpassword123',
    email_confirm: true
  });

  // Create test resume
  const { data: resume } = await supabaseTest
    .from('resumes')
    .insert({
      ...completeResumeData,
      user_id: user.user!.id
    })
    .select()
    .single();

  return { user: user.user!, resume };
}

export async function cleanupTestDatabase(userId: string) {
  // Delete test data
  await supabaseTest.from('resumes').delete().eq('user_id', userId);
  await supabaseTest.auth.admin.deleteUser(userId);
}
```

## Continuous Integration

### GitHub Actions Workflow
```yaml
# .github/workflows/test.yml
name: Test Suite

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test:coverage
      
      - uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run build
      - run: npm run test:e2e
      
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/

  visual-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run build
      - run: npm run test:visual
      
      - uses: argos-ci/action@v1
        with:
          token: ${{ secrets.ARGOS_TOKEN }}
```

This comprehensive testing strategy ensures ResumeBuilder Pro maintains high quality, performance, and reliability across all user interactions and system components.

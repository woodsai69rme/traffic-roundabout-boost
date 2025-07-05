
# 4. Design System

## Overview
The Roundabout design system provides a comprehensive foundation for creating consistent, accessible, and beautiful user interfaces across the social media management platform.

## Design Tokens

### Color Palette

#### Primary Colors
```css
/* Brand Colors */
--primary: 262.1 83.3% 57.8%;        /* Purple #8B5CF6 */
--primary-foreground: 210 20% 98%;   /* White text on primary */

/* Secondary Accent */
--secondary: 220.9 39.3% 11%;        /* Dark blue-gray #1E293B */
--secondary-foreground: 210 20% 98%; /* White text on secondary */

/* Accent Colors */
--accent: 220 14.3% 95.9%;           /* Light gray #F8FAFC */
--accent-foreground: 220.9 39.3% 11%; /* Dark text on accent */
```

#### Semantic Colors
```css
/* Status Colors */
--success: 142.1 76.2% 36.3%;        /* Green #16A34A */
--warning: 32.6 94.6% 43.7%;         /* Amber #F59E0B */
--destructive: 0 84.2% 60.2%;        /* Red #EF4444 */
--info: 221.2 83.2% 53.3%;           /* Blue #3B82F6 */

/* Neutral Palette */
--background: 0 0% 100%;              /* White #FFFFFF */
--foreground: 222.2 84% 4.9%;        /* Near black #0F172A */
--muted: 210 40% 96%;                 /* Light gray #F1F5F9 */
--muted-foreground: 215.4 16.3% 46.9%; /* Medium gray #64748B */
--border: 214.3 31.8% 91.4%;         /* Border gray #E2E8F0 */
```

#### Platform Brand Colors
```css
/* Social Media Platform Colors */
--instagram: 45 100% 51%;             /* Instagram gradient start */
--twitter: 203 89% 53%;               /* Twitter blue */
--facebook: 221 44% 41%;              /* Facebook blue */
--linkedin: 201 100% 35%;             /* LinkedIn blue */
--tiktok: 348 83% 47%;                /* TikTok red */
--youtube: 0 100% 50%;                /* YouTube red */
```

### Typography

#### Font Families
```css
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

#### Font Scales
```css
/* Heading Sizes */
--text-4xl: 2.25rem; /* 36px */
--text-3xl: 1.875rem; /* 30px */
--text-2xl: 1.5rem; /* 24px */
--text-xl: 1.25rem; /* 20px */
--text-lg: 1.125rem; /* 18px */

/* Body Sizes */
--text-base: 1rem; /* 16px */
--text-sm: 0.875rem; /* 14px */
--text-xs: 0.75rem; /* 12px */

/* Font Weights */
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Spacing Scale
```css
/* Spacing Units (based on 4px grid) */
--spacing-0: 0;
--spacing-1: 0.25rem; /* 4px */
--spacing-2: 0.5rem;  /* 8px */
--spacing-3: 0.75rem; /* 12px */
--spacing-4: 1rem;    /* 16px */
--spacing-5: 1.25rem; /* 20px */
--spacing-6: 1.5rem;  /* 24px */
--spacing-8: 2rem;    /* 32px */
--spacing-10: 2.5rem; /* 40px */
--spacing-12: 3rem;   /* 48px */
--spacing-16: 4rem;   /* 64px */
```

### Border Radius
```css
--radius-none: 0;
--radius-sm: 0.125rem; /* 2px */
--radius-md: 0.375rem; /* 6px */
--radius-lg: 0.5rem;   /* 8px */
--radius-xl: 0.75rem;  /* 12px */
--radius-full: 9999px; /* Circular */
```

### Shadows
```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
```

## Component Library

### Button Component
**Location:** `@/components/ui/button`

#### Variants
- **Primary**: Main action buttons with brand color background
- **Secondary**: Secondary actions with outline style
- **Ghost**: Minimal buttons for subtle actions
- **Destructive**: Warning/delete actions in red

#### Sizes
- **sm**: Small buttons (32px height)
- **md**: Default buttons (40px height)  
- **lg**: Large buttons (48px height)
- **icon**: Square icon-only buttons

#### Usage Examples
```tsx
<Button variant="primary" size="md">
  Create Post
</Button>

<Button variant="ghost" size="sm">
  <Edit className="h-4 w-4" />
</Button>
```

### Card Component
**Location:** `@/components/ui/card`

#### Structure
- **Card**: Container with shadow and border
- **CardHeader**: Title and description area
- **CardContent**: Main content area
- **CardFooter**: Action buttons area

#### Usage
```tsx
<Card>
  <CardHeader>
    <CardTitle>Analytics Overview</CardTitle>
    <CardDescription>Last 30 days performance</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Chart or content */}
  </CardContent>
</Card>
```

### Input Components
**Location:** `@/components/ui/input`, `@/components/ui/textarea`

#### Types
- **Input**: Single-line text input
- **Textarea**: Multi-line text input
- **Select**: Dropdown selection
- **Checkbox**: Boolean selection
- **Radio**: Single choice from options

#### States
- Default
- Focus (blue border)
- Error (red border)
- Disabled (gray appearance)

### Navigation Components

#### Navbar
- Fixed header with logo and main navigation
- User avatar and account dropdown
- Responsive hamburger menu on mobile

#### Sidebar
- Collapsible navigation for dashboard sections
- Icon + text format with active state indicators
- Organized by feature category

### Data Display Components

#### Table
- Sortable columns with arrow indicators
- Pagination controls
- Row selection with checkboxes
- Responsive horizontal scrolling

#### Charts
- Line charts for time-series data
- Bar charts for categorical comparisons
- Pie charts for composition data
- Consistent color palette across charts

## Layout System

### Grid System
Based on CSS Grid with predefined layouts:

```css
/* Common Grid Layouts */
.grid-dashboard {
  display: grid;
  grid-template-columns: 250px 1fr;
  min-height: 100vh;
}

.grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.grid-analytics {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}
```

### Breakpoints
```css
/* Mobile First Approach */
--breakpoint-sm: 640px;   /* Mobile landscape */
--breakpoint-md: 768px;   /* Tablet */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Large desktop */
--breakpoint-2xl: 1536px; /* Extra large */
```

### Container Widths
```css
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 640px) {
  .container { max-width: 640px; }
}
@media (min-width: 768px) {
  .container { max-width: 768px; }
}
@media (min-width: 1024px) {
  .container { max-width: 1024px; }
}
@media (min-width: 1280px) {
  .container { max-width: 1280px; }
}
```

## Icons & Illustrations

### Icon System
**Library:** Lucide React  
**Style:** Outline style with consistent stroke width  
**Sizes:** 16px, 20px, 24px, 32px

#### Icon Categories
- **Navigation**: Home, Settings, Menu, Search
- **Actions**: Edit, Delete, Share, Download, Upload
- **Status**: Check, X, Alert, Info, Loading
- **Social**: Platform logos and social actions
- **Content**: Image, Video, Text, Calendar

### Platform Icons
Custom SVG icons for each social media platform:
- Instagram: Camera with gradient background
- Twitter/X: Bird or X logo in brand blue
- Facebook: "f" logo in brand blue
- LinkedIn: "in" logo in brand blue
- TikTok: Musical note in brand colors
- YouTube: Play button in brand red

## Accessibility Standards

### Color Contrast
All color combinations meet WCAG 2.1 AA standards:
- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text**: Minimum 3:1 contrast ratio
- **UI components**: Minimum 3:1 contrast ratio

### Focus Management
- Visible focus indicators on all interactive elements
- Logical tab order throughout the application
- Skip links for main content areas
- Focus trapping in modal dialogs

### Screen Reader Support
- Semantic HTML structure with proper headings
- ARIA labels and descriptions where needed
- Alternative text for all images
- Status announcements for dynamic content

### Keyboard Navigation
- All functionality accessible via keyboard
- Standard keyboard shortcuts where applicable
- Escape key closes modals and dropdowns
- Arrow keys for navigation in lists and menus

## Animation & Motion

### Transition Durations
```css
--duration-fast: 150ms;    /* Micro-interactions */
--duration-normal: 300ms;  /* Standard transitions */
--duration-slow: 500ms;    /* Page transitions */
```

### Easing Functions
```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### Common Animations
- **Fade In/Out**: Opacity transitions for content loading
- **Slide**: Horizontal movement for carousels and drawers
- **Scale**: Size changes for hover states and modals
- **Spin**: Loading indicators and refresh buttons

## Responsive Design Principles

### Mobile-First Approach
- Design starts with mobile experience
- Progressive enhancement for larger screens
- Touch-friendly interaction targets (44px minimum)
- Simplified navigation on small screens

### Flexible Layouts
- Fluid grids that adapt to screen size
- Flexible images and media
- Scalable typography using relative units
- Consistent spacing across breakpoints

### Content Priority
- Most important content visible on mobile
- Progressive disclosure of features
- Contextual actions based on screen size
- Optimized loading for mobile networks

## Brand Guidelines

### Logo Usage
- Primary logo with full "Roundabout" wordmark
- Icon-only version for small spaces
- Minimum clear space of 1x logo height
- Do not modify colors, proportions, or effects

### Voice & Tone
- **Professional yet approachable**: Expert guidance without intimidation
- **Clear and concise**: No jargon or unnecessary complexity
- **Encouraging**: Positive reinforcement for user achievements
- **Helpful**: Always focused on solving user problems

### Imagery Style
- **Clean and modern**: Minimal backgrounds with focus on content
- **Authentic**: Real people and genuine social media content
- **Consistent processing**: Similar color grading and style
- **High quality**: Crisp, well-lit images that reflect professionalism

## Implementation Guidelines

### CSS Architecture
Following BEM methodology with utility-first approach:

```css
/* Component Classes */
.card { /* Base component styles */ }
.card--featured { /* Modifier for featured cards */ }
.card__header { /* Element within card */ }

/* Utility Classes */
.text-center { text-align: center; }
.mb-4 { margin-bottom: 1rem; }
.bg-primary { background-color: var(--primary); }
```

### Component Development
1. **Atomic Design**: Build from atoms → molecules → organisms
2. **Reusability**: Each component should serve multiple use cases
3. **Consistency**: Follow established patterns and conventions
4. **Documentation**: Include PropTypes and usage examples
5. **Testing**: Unit tests for component behavior and accessibility

### Quality Assurance
- **Cross-browser testing**: Chrome, Firefox, Safari, Edge
- **Device testing**: Mobile phones, tablets, desktop
- **Accessibility audits**: Automated and manual testing
- **Performance monitoring**: Loading times and interaction responsiveness

This design system serves as the foundation for maintaining consistency and quality across the Roundabout platform while providing flexibility for future growth and feature development.

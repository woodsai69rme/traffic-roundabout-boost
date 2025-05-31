
# Design System
## ResumeBuilder Pro

### Document Information
- **Version**: 1.0
- **Last Updated**: 2025-01-31
- **Owner**: Design Team

## Introduction

The ResumeBuilder Pro Design System establishes a cohesive visual language and component library that ensures consistency across all user touchpoints while maintaining professional aesthetics suitable for career-focused applications.

## Design Principles

### 1. Professional First
Every design decision prioritizes professional presentation, ensuring users feel confident sharing their resumes with employers.

### 2. Clarity and Simplicity
Complex resume building processes are simplified through clear visual hierarchy and intuitive navigation patterns.

### 3. Accessibility
All interfaces meet WCAG 2.1 AA standards, ensuring the platform is usable by people with diverse abilities.

### 4. Responsive Design
Seamless experience across desktop, tablet, and mobile devices with mobile-first approach.

### 5. Data-Driven
Design decisions are informed by user research, analytics, and best practices in professional document design.

## Color System

### Primary Colors
```css
/* Primary Brand Colors */
--primary: 256, 71%, 75%;        /* #9B87F5 - Purple */
--primary-foreground: 210 40% 98%; /* #F8FAFC - Light */

/* Secondary Colors */
--secondary: 260, 40%, 54%;      /* #6E59A5 - Darker Purple */
--secondary-foreground: 210 40% 98%; /* #F8FAFC - Light */
```

### Neutral Colors
```css
/* Background Colors */
--background: 240, 10%, 10%;     /* #1A1A1A - Dark */
--foreground: 0 0% 98%;          /* #FAFAFA - Light */

/* Card and Surface Colors */
--card: 240, 10%, 13%;           /* #212121 - Dark Card */
--card-foreground: 0 0% 98%;     /* #FAFAFA - Light Text */

/* Muted Colors */
--muted: 217.2 32.6% 17.5%;      /* #2C2C2C - Muted Dark */
--muted-foreground: 215 20.2% 65.1%; /* #A1A1AA - Muted Text */
```

### Semantic Colors
```css
/* Status Colors */
--success: 142, 76%, 36%;        /* #16A34A - Green */
--warning: 38, 92%, 50%;         /* #F59E0B - Amber */
--error: 0, 84%, 60%;            /* #EF4444 - Red */
--info: 214, 100%, 59%;          /* #3B82F6 - Blue */
```

### Usage Guidelines
- **Primary Purple**: Main CTAs, active states, brand elements
- **Secondary Purple**: Secondary actions, hover states
- **Neutral Colors**: Text, backgrounds, borders
- **Semantic Colors**: Status indicators, alerts, feedback

## Typography

### Font Families
```css
/* Primary Font */
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", 
             Roboto, "Helvetica Neue", Arial, sans-serif;

/* Monospace Font */
font-family: "SF Mono", Monaco, "Inconsolata", "Roboto Mono", 
             "Source Code Pro", monospace;
```

### Font Scales
```css
/* Heading Styles */
.text-4xl { font-size: 2.25rem; line-height: 2.5rem; }    /* 36px */
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; }  /* 30px */
.text-2xl { font-size: 1.5rem; line-height: 2rem; }       /* 24px */
.text-xl  { font-size: 1.25rem; line-height: 1.75rem; }   /* 20px */
.text-lg  { font-size: 1.125rem; line-height: 1.75rem; }  /* 18px */

/* Body Text */
.text-base { font-size: 1rem; line-height: 1.5rem; }      /* 16px */
.text-sm   { font-size: 0.875rem; line-height: 1.25rem; } /* 14px */
.text-xs   { font-size: 0.75rem; line-height: 1rem; }     /* 12px */
```

### Font Weights
```css
.font-normal   { font-weight: 400; }
.font-medium   { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold     { font-weight: 700; }
```

### Usage Guidelines
- **Headlines**: Bold or semibold weights for clear hierarchy
- **Body Text**: Normal weight (400) for readability
- **UI Elements**: Medium weight (500) for labels and buttons
- **Line Height**: 1.5 for body text, 1.2 for headlines

## Spacing System

### Base Unit
Our spacing system uses a base unit of 4px with consistent multipliers.

```css
/* Spacing Scale */
.p-1  { padding: 0.25rem; }  /* 4px */
.p-2  { padding: 0.5rem; }   /* 8px */
.p-4  { padding: 1rem; }     /* 16px */
.p-6  { padding: 1.5rem; }   /* 24px */
.p-8  { padding: 2rem; }     /* 32px */
.p-12 { padding: 3rem; }     /* 48px */
.p-16 { padding: 4rem; }     /* 64px */
```

### Layout Spacing
- **Component Padding**: 16px (p-4) for most components
- **Section Spacing**: 32px (p-8) between major sections
- **Page Margins**: 24px (p-6) on mobile, 48px (p-12) on desktop

## Component Library

### Buttons

#### Primary Button
```css
.btn-primary {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: hsl(var(--primary) / 0.9);
  transform: translateY(-1px);
}
```

#### Secondary Button
```css
.btn-secondary {
  background: transparent;
  color: hsl(var(--primary));
  border: 1px solid hsl(var(--primary));
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: hsl(var(--primary) / 0.1);
}
```

#### Size Variants
- **Small**: `padding: 0.25rem 0.75rem; font-size: 0.875rem;`
- **Default**: `padding: 0.5rem 1rem; font-size: 1rem;`
- **Large**: `padding: 0.75rem 1.5rem; font-size: 1.125rem;`

### Cards

#### Base Card
```css
.card {
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-hover {
  transition: all 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(155, 135, 245, 0.15);
}
```

#### Card Sections
```css
.card-header {
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  border-bottom: 1px solid hsl(var(--border));
}

.card-content {
  padding: 1.5rem;
}

.card-footer {
  padding: 1rem 1.5rem 1.5rem 1.5rem;
  border-top: 1px solid hsl(var(--border));
}
```

### Form Elements

#### Input Fields
```css
.input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid hsl(var(--border));
  border-radius: 0.375rem;
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: hsl(var(--primary));
  box-shadow: 0 0 0 3px hsl(var(--primary) / 0.1);
}

.input:invalid {
  border-color: hsl(var(--error));
}
```

#### Labels
```css
.label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: hsl(var(--foreground));
  margin-bottom: 0.25rem;
}
```

### Navigation

#### Primary Navigation
```css
.nav-primary {
  background: hsl(var(--background) / 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid hsl(var(--border));
  padding: 0 1rem;
  height: 4rem;
}

.nav-link {
  color: hsl(var(--foreground));
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: hsl(var(--primary));
  background: hsl(var(--primary) / 0.1);
}

.nav-link.active {
  color: hsl(var(--primary));
  background: hsl(var(--primary) / 0.15);
}
```

## Icon System

### Icon Library
Primary icon library: **Lucide React** for consistent, professional icons.

### Icon Sizes
```css
.icon-xs { width: 0.75rem; height: 0.75rem; }  /* 12px */
.icon-sm { width: 1rem; height: 1rem; }        /* 16px */
.icon-md { width: 1.25rem; height: 1.25rem; }  /* 20px */
.icon-lg { width: 1.5rem; height: 1.5rem; }    /* 24px */
.icon-xl { width: 2rem; height: 2rem; }        /* 32px */
```

### Common Icons
- **FileText**: Primary brand icon and resume representation
- **Edit**: Content editing actions
- **Download**: Export functionality
- **Share**: Sharing and collaboration
- **Eye**: Preview and visibility
- **Check**: Completion and success states
- **Alert**: Warnings and important information

## Layout System

### Grid System
```css
/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 768px) {
  .container { padding: 0 2rem; }
}

@media (min-width: 1024px) {
  .container { padding: 0 3rem; }
}
```

### Grid Classes
```css
.grid { display: grid; }
.grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }

.gap-4 { gap: 1rem; }
.gap-6 { gap: 1.5rem; }
.gap-8 { gap: 2rem; }
```

### Responsive Breakpoints
```css
/* Mobile First Approach */
@media (min-width: 640px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

## Animation and Transitions

### Base Transitions
```css
.transition-base {
  transition: all 0.2s ease;
}

.transition-slow {
  transition: all 0.3s ease;
}

.transition-colors {
  transition: color 0.2s ease, background-color 0.2s ease;
}
```

### Hover Effects
```css
.hover-lift:hover {
  transform: translateY(-2px);
}

.hover-scale:hover {
  transform: scale(1.02);
}

.hover-glow:hover {
  box-shadow: 0 0 20px hsl(var(--primary) / 0.3);
}
```

### Loading States
```css
.loading-pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

.loading-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

## Accessibility Guidelines

### Color Contrast
- **Normal Text**: Minimum 4.5:1 contrast ratio
- **Large Text**: Minimum 3:1 contrast ratio
- **UI Components**: Minimum 3:1 for borders and states

### Focus Management
```css
.focus-visible {
  outline: 2px solid hsl(var(--primary));
  outline-offset: 2px;
}

.focus-visible:not(:focus-visible) {
  outline: none;
}
```

### Screen Reader Support
- Semantic HTML elements used throughout
- ARIA labels for complex interactions
- Alt text for all informative images
- Proper heading hierarchy (h1 → h2 → h3)

## Brand Assets

### Logo Usage
- **Primary Logo**: Full color version for light backgrounds
- **Logo Mark**: Icon-only version for compact spaces
- **Wordmark**: Text-only version for specific applications

### Logo Specifications
- **Minimum Size**: 24px height for digital, 0.5" for print
- **Clear Space**: Minimum 1x logo height on all sides
- **File Formats**: SVG (web), PNG (fallback), PDF (print)

### Brand Colors in Context
- **Primary Purple**: Main branding, CTAs, active states
- **Secondary Purple**: Supporting elements, hover states
- **Accent Colors**: Status indicators, highlights

## Responsive Design Guidelines

### Mobile-First Approach
1. **Base Styles**: Mobile (320px+)
2. **Small Tablets**: 640px+
3. **Tablets**: 768px+
4. **Desktop**: 1024px+
5. **Large Desktop**: 1280px+

### Content Strategy
- **Progressive Enhancement**: Core functionality works on all devices
- **Touch Targets**: Minimum 44px for interactive elements
- **Readable Text**: Minimum 16px font size on mobile
- **Optimized Images**: Responsive images with appropriate sizes

## Documentation and Maintenance

### Component Documentation
Each component includes:
- **Purpose**: What the component does
- **Usage**: When and how to use it
- **Props/Options**: Available configuration
- **Examples**: Code samples and variations
- **Accessibility**: Specific accessibility considerations

### Design Tokens
All design values are maintained as CSS custom properties for:
- **Easy Updates**: Change values in one place
- **Consistency**: Prevent deviation from design system
- **Theming**: Support for multiple themes
- **Developer Experience**: Clear naming conventions

### Version Control
- **Semantic Versioning**: Major.Minor.Patch format
- **Change Log**: Documented changes for each version
- **Migration Guides**: Help for upgrading between versions
- **Deprecation Notices**: Clear timeline for removing old components

This design system serves as the foundation for all UI development in ResumeBuilder Pro, ensuring consistency, accessibility, and professional presentation across the entire platform.

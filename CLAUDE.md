# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Orange Hub is a cybersecurity training and security services platform built with React, TypeScript, Vite, and shadcn/ui. The platform showcases cybersecurity courses (Ethical Hacking, VAPT, Bug Bounty, AR/VR Security, etc.) and professional security testing services (WPAT Testing, Mobile Security, API Testing, OWASP Testing).

**Tech Stack:**
- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **UI Library**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS with custom cybersecurity-themed design system
- **Routing**: React Router v6
- **State Management**: React Context API + localStorage persistence
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React

**Key Features:**
- Centralized data management via Context API
- localStorage persistence for admin changes
- Modern cybersecurity color palette (Deep Blue, Cyan, Purple)
- Fully responsive design optimized for mobile, tablet, and desktop
- Real-time countdown timers on hero banners
- Categorized courses (Recording vs Live sessions)
- Working contact forms with toast notifications

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:8080)
npm run dev

# Build for production
npm run build

# Build for development environment
npm run build:dev

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Project Structure & Architecture

### Route Structure
The application uses React Router with the following main routes:
- `/` - Landing page with hero slider, services, courses, reviews, and contact sections
- `/services` - Services overview page
- `/services/:slug` - Individual service detail pages
- `/courses` - Courses catalog with category filtering (All/Cybersecurity/AR VR)
- `/courses/:slug` - Individual course detail pages
- `/course-selection` - Course format selection page
- `/about` - About page
- `/contact` - Contact page
- `/admin` - Admin panel for managing courses, services, images, and certificates
- `*` - 404 Not Found page

### Component Organization

**Page Components** (`src/pages/`)
- Each page is a self-contained component with its own layout
- All pages include `<Header />` and `<Footer />` components
- Admin page uses Tabs for managing different content types

**Shared Components** (`src/components/`)
- `Header.tsx` - Navigation header with responsive menu
- `Footer.tsx` - Site footer with links and branding
- `HeroSlider.tsx` - Hero section with slider functionality
- `ServicesSection.tsx` - Services showcase section
- `CoursesSection.tsx` - Courses preview section
- `ReviewsSection.tsx` - Customer reviews/testimonials
- `ContactSection.tsx` - Contact form section
- `NavLink.tsx` - Custom navigation link component

**UI Components** (`src/components/ui/`)
- Full shadcn/ui component library
- All components follow Radix UI patterns
- Styled with Tailwind CSS and CSS variables

### Styling Architecture

**Modern Cybersecurity Theme System:**
- Uses CSS custom properties defined in `src/index.css`
- **Primary Color**: Deep Blue (`hsl(217 91% 60%)`) - Professional and trustworthy
- **Secondary Color**: Soft Purple (`hsl(262 52% 92%)`) - Modern tech feel
- **Accent Color**: Vibrant Cyan (`hsl(189 94% 43%)`) - For highlights
- **Tertiary Color**: Orange (`hsl(18 95% 55%)`) - Used sparingly for important CTAs
- Custom shadow utilities: `shadow-card`, `shadow-card-hover` with blue tint
- Custom animation class: `transition-smooth`
- Font: Poppins (via Google Fonts)

**Design Patterns:**
- Rounded corners: `rounded-2xl` and `rounded-3xl` for modern look
- Gradient backgrounds: Professional blue/purple/cyan combinations
- Hover effects: Scale transforms (1.05) and shadow transitions
- Card-based layouts: Consistent padding with hover states
- Decorative elements: Blurred gradient circles for visual depth
- Glassmorphism: Backdrop blur effects on overlays

### Path Aliases
The project uses `@/*` alias for importing from `src/`:
```typescript
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
```

### Data Architecture

**Centralized State Management:**
The application uses React Context API (`src/contexts/DataContext.tsx`) with localStorage persistence:

**Data Store** (`src/lib/store.ts`):
- **Banners**: Hero slider content with countdown timers
- **Services**: WPAT Testing, Mobile API Testing, OWASP Top 10 Testing
- **Courses**: Categorized into 'recording' and 'live' sessions
  - Recording: 1 course (Ethical Hacking) with Play Store link
  - Live: 3 courses (Ethical Hacking, VAPT, Bug Bounty) with pricing tiers
- **Clients**: Client logos for services page
- **Certificates**: Industry certifications

**Admin Panel Integration:**
The admin panel (`/admin`) is fully connected to the centralized data store:
- Changes made in admin panel persist via localStorage
- CRUD operations available for all data types
- Real-time updates across all pages using Context API
- Banner management with countdown date configuration

**Course Structure:**
- **Recording Courses**: Single course with Play Store download link
- **Live Courses**: Multiple pricing tiers (One-to-One: ₹40,000, Group: ₹15,000-₹20,000)
- Each course includes: curriculum, duration, level, notes, pricing details
- Demo availability flag for live courses

### TypeScript Configuration

- Strict mode is DISABLED (`noImplicitAny: false`, `strictNullChecks: false`)
- Unused variables/parameters warnings are disabled
- Path aliases configured for `@/*` to resolve to `./src/*`

## Important Development Notes

### Adding New Routes
1. Create page component in `src/pages/`
2. Add route to `src/App.tsx` ABOVE the `*` catch-all route
3. Follow existing pattern: include Header and Footer components

### Adding New UI Components
Use shadcn/ui CLI to add components:
```bash
npx shadcn-ui@latest add [component-name]
```
Components are added to `src/components/ui/` and configured via `components.json`.

### Styling Conventions
- Use existing gradient classes from the theme (`from-orange-500 to-red-500`, etc.)
- Follow consistent spacing: `py-16 md:py-24` for sections
- Use responsive breakpoints: `md:`, `lg:` prefixes
- Apply `transition-smooth` class for consistent animations
- Card containers: `rounded-3xl` with `shadow-card` and `hover:shadow-card-hover`

### Form Handling
- Use React Hook Form for form state management
- Use Zod for validation schemas
- UI components from shadcn/ui (Input, Textarea, Button, etc.)

## Lovable Integration

This project was created with Lovable (lovable.dev) and includes:
- `lovable-tagger` plugin for development mode (component tagging)
- Automatic deployment via Lovable platform
- Git integration for collaborative development

## Key Features Implemented

1. **Centralized Data Management**: React Context API with localStorage persistence
2. **Real-time Countdown Timers**: Functional countdown on hero banners with days/hours/mins/secs
3. **Modern Color Theme**: Professional cybersecurity design (Deep Blue, Cyan, Purple)
4. **Responsive Design**: Fully optimized for mobile, tablet, and desktop
5. **Connected Admin Panel**: Admin changes reflect immediately across all pages
6. **Categorized Courses**: Recording vs Live sessions with distinct features
7. **Working Contact Forms**: Toast notifications on form submission
8. **Client Logos Section**: Showcase trusted partners on services page

## Known Limitations

1. **No Backend API**: Currently frontend-only with localStorage persistence
2. **No Tests**: No test suite configured
3. **No Authentication**: Admin panel is publicly accessible
4. **LocalStorage Only**: Data persists only in browser (not server-side)
5. **TypeScript Strict Mode Disabled**: Consider enabling for better type safety
6. **No Image Upload**: Admin panel uses placeholder images

## Common Development Patterns

### Using the Data Context
```typescript
import { useData } from '@/contexts/DataContext';

const MyComponent = () => {
  const { services, courses, banners, updateServices } = useData();

  // Data is automatically reactive and persisted
  // Any updates will reflect across all components
};
```

### Creating a New Service
1. Use the `addService` method from DataContext in admin panel
2. Provide all required fields: id, title, description, slug, icon, gradient, features
3. Choose appropriate Lucide icon name (e.g., 'Shield', 'Lock', 'Smartphone')
4. Use gradient format: `from-blue-500 to-cyan-500`

### Creating a New Course
1. Use the `addCourse` method from DataContext in admin panel
2. Set category to either 'recording' or 'live'
3. For live courses: provide pricing (oneToOne, groupMin, groupMax)
4. For recording courses: provide playStoreLink
5. Include curriculum array and notes if available

### Modifying Data Store Defaults
1. Edit `src/lib/store.ts` to change default data
2. Update the interfaces if adding new fields
3. Default data is only used on first load (before localStorage exists)

### Working with Countdown Timers
```typescript
// Banners with countdown use ISO date strings
const banner = {
  countdown: {
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
  }
};
```
- email:maniteja.thagaram@hackethos4u.com
- pass:admin1234
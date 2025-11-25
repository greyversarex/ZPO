# Dushanbe Prosthetic and Orthopedic Plant

## Overview

This is a multi-page website for the State Enterprise Prosthetic and Orthopedic Plant of Dushanbe, Tajikistan. The application provides information about prosthetic and orthopedic services, products, patient eligibility, and contact information. All content is displayed in Tajik (Cyrillic script) to serve the local population, featuring a modern medical aesthetic that balances governmental professionalism with patient-focused warmth.

The application serves as a digital gateway for disabled citizens to learn about free rehabilitation services, understand their rights under government resolution No. 604, and access information about the plant's four regional branches across Tajikistan.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Routing**
- React 18+ with Vite as the build tool and development server
- Wouter for client-side routing (lightweight React Router alternative)
- TypeScript for type safety across the application

**UI Component System**
- Shadcn/ui components based on Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- "New York" style variant from Shadcn/ui
- Custom CSS variables for theming (primary: deep teal #0F766E, accent: gold/amber #F59E0B)
- Framer Motion for animations and transitions

**State Management**
- TanStack Query (React Query) v5 for server state management
- React Hook Form with Zod resolvers for form validation
- Local component state with React hooks

**Page Structure**
- Home: Hero section with stats, overview of services
- About: Mission statement, branch locations across Tajikistan
- Products: Grid display of prosthetics, orthopedic devices, and assistive equipment
- Patients: Accordion-based guide for eligibility and required documents (based on Gov Resolution No. 604)
- Contacts: Contact forms and branch information

### Backend Architecture

**Server Framework**
- Express.js with TypeScript
- Separate development and production entry points (index-dev.ts, index-prod.ts)
- Custom middleware for request logging and JSON body parsing

**Development Setup**
- Vite middleware integration in development mode
- Hot Module Replacement (HMR) support
- Runtime error overlay for development

**API Structure**
- RESTful API pattern with `/api` prefix
- Modular route registration through `registerRoutes` function
- Storage abstraction layer with interface-based design (IStorage)

**Storage Layer**
- In-memory storage implementation (MemStorage) for development
- Designed for PostgreSQL through Drizzle ORM
- User schema defined with Drizzle and Zod validation
- Session management support with connect-pg-simple

### Data Storage

**Database Schema**
- Users table with UUID primary keys
- Drizzle ORM for type-safe database queries
- Drizzle-Zod for runtime validation
- Migration support configured for PostgreSQL

**Current Implementation**
- In-memory storage for prototype/development
- Ready for PostgreSQL integration via environment variable DATABASE_URL
- Neon Database serverless driver configured

### Design System

**Color Palette**
- Primary: Deep Teal (HSL: 173 76% 24%) - medical professionalism
- Secondary: Clean White/Light Gray (HSL: 210 15% 97%)
- Accent: Gold/Amber (HSL: 38 92% 50%) - call-to-actions, reflecting national colors
- Semantic colors for destructive, muted, and card variants

**Typography**
- Font families: Inter, Open Sans (sans-serif) for Cyrillic readability
- Text sizes and line heights optimized for accessibility
- Support for Tajik Cyrillic script

**Component Patterns**
- Card-based layouts with hover effects
- Accordion components for collapsible information
- Badge components for statistics display
- Responsive navigation with mobile menu support
- Consistent spacing using Tailwind's spacing scale

### Content Management

**Centralized Content**
- All Tajik language content stored in `client/src/data/content.ts`
- Structured data for easy translation and updates
- Includes site navigation, hero content, product descriptions, patient guide information, and branch details

**Key Content Areas**
- Legal information: Government resolution No. 604 details
- Eligibility criteria for free services (disability groups I & II, children under 18, war veterans)
- Required documents for application
- Branch locations: Dushanbe (main), Khujand, Kulob, Khorog

## External Dependencies

**Core Framework Dependencies**
- React 18+ (UI library)
- Vite (build tool and dev server)
- Express.js (backend server)
- TypeScript (type system)

**UI Component Libraries**
- @radix-ui/* primitives (accessible component primitives)
- Shadcn/ui (pre-built component system)
- Lucide React (icon library)
- Framer Motion (animations)
- Embla Carousel (carousel component)

**Data & Forms**
- TanStack Query (@tanstack/react-query) - server state management
- React Hook Form - form handling
- Zod - schema validation
- @hookform/resolvers - integration between React Hook Form and Zod

**Database & ORM**
- Drizzle ORM (drizzle-orm, drizzle-kit) - type-safe SQL toolkit
- @neondatabase/serverless - Neon PostgreSQL serverless driver
- connect-pg-simple - PostgreSQL session store for Express

**Styling**
- Tailwind CSS (utility-first CSS framework)
- PostCSS (CSS processing)
- Autoprefixer (vendor prefixing)
- class-variance-authority (variant-based styling utility)
- clsx & tailwind-merge (className utilities)

**Development Tools**
- @replit/vite-plugin-* - Replit-specific development enhancements
- tsx - TypeScript execution for Node.js
- esbuild - JavaScript bundler for production builds

**Routing**
- Wouter (lightweight client-side routing)

**Utilities**
- date-fns (date manipulation)
- nanoid (unique ID generation)

**Database Configuration**
- PostgreSQL database expected via DATABASE_URL environment variable
- Drizzle Kit configured for schema migrations
- Session storage configured for PostgreSQL via connect-pg-simple

## API Endpoints

### Contact Form
- **POST /api/contact** - Submit contact form (validates name, email, phone, message)
- **GET /api/contact/submissions** - Get all contact submissions (admin)

### Products (Services)
- **GET /api/products** - Get all active products (add `?includeInactive=true` for admin)
- **GET /api/products/:id** - Get single product by ID
- **POST /api/products** - Create new product (Zod validation)
- **PATCH /api/products/:id** - Update product (validates with updateProductSchema - no default overwrites)
- **DELETE /api/products/:id** - Delete product

### Branches
- **GET /api/branches** - Get all active branches (add `?includeInactive=true` for admin)
- **GET /api/branches/:id** - Get single branch by ID
- **POST /api/branches** - Create new branch (Zod validation with latitude, longitude, mapUrl)
- **PATCH /api/branches/:id** - Update branch (validates with updateBranchSchema - no default overwrites)
- **DELETE /api/branches/:id** - Delete branch

## Google Maps Integration
- Using iframe embed approach (no API key required)
- Coordinates stored for all 4 branches: Dushanbe (38.5598, 68.7738), Khujand (40.2828, 69.6219), Kulob (37.9100, 69.7850), Khorog (37.4894, 71.5537)
- Interactive branch selector on About page
- Static map on Contacts page showing main office

## Database Seeding
- Run `tsx server/seed.ts` to populate database with initial products and branches from content.ts
- Seeds 4 products/services and 4 branch locations
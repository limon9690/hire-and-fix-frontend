# Hire & Fix Frontend

A role-based home services booking platform frontend built with Next.js.  
Users can discover professionals, create bookings, complete payments, and manage activity through role-specific dashboards (User, Vendor, Employee, Admin).

## Live URLs

- Frontend: https://hire-and-fix-frontend.vercel.app
- Backend API: https://hire-and-fix-backend.vercel.app
- Backend Github: https://github.com/limon9690/hire-and-fix-backend

## Features

- Public marketplace:
  - Home page with featured sections
  - Browse services/professionals
  - Vendor profile pages
  - Employee profile pages
- Authentication:
  - User login/logout
  - User and vendor registration
  - Cookie-based session flow
- Booking flow:
  - Create booking (user)
  - Booking status tracking
  - Cancel booking (with validation and confirmation)
- Payment flow:
  - Stripe checkout session integration
  - Success/cancel handling pages
- Reviews:
  - Create and update reviews for completed bookings
- Role-based dashboards:
  - User: bookings, profile, reviews
  - Vendor: summary, employees CRUD, booking management
  - Employee: assigned bookings and status updates
  - Admin: users/vendors/bookings/payments/categories management
- Shared UX patterns:
  - Search / sort / filters
  - Pagination
  - Loading / empty / error states
  - Toast feedback and confirmation dialogs
  - Dark/light/system theme support

## Technologies Used

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- react-hook-form
- zod
- sonner
- next-themes

## Setup Instructions

### 1. Clone repository

```bash
git clone <your-repo-url>
cd hire-and-fix-frontend
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Create `.env.local` (or `.env`) in project root:

```env
NEXT_PUBLIC_API_URL=https://your_backend_url
```


### 4. Run development server

```bash
pnpm dev
```

Open: `http://localhost:3000`

### 5. Build for production

```bash
pnpm build
pnpm start
```

## Scripts

- `pnpm dev` - start dev server
- `pnpm build` - build production app
- `pnpm start` - run production server
- `pnpm lint` - run lint checks
- `pnpm typecheck` - run TypeScript checks (if configured)

## Notes

- Backend is deployed separately on Vercel.
- Cookie/session behavior depends on backend cookie config and matching frontend domain in production.
- Stripe payment final status is updated through backend webhook handling.

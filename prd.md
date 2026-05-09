# Product Requirements Document (PRD)
## AI Tourism Platform — Frontend

**Version:** 1.0.0
**Last Updated:** May 2026
**Status:** In Development

---

## 1. Product Overview

The AI Tourism Platform is a full-stack web application that helps users discover travel destinations, generate AI-powered itineraries, and interact with an AI travel assistant. This document covers the frontend (client) side of the platform.

The frontend is a Next.js 15 (App Router) application that communicates with a dedicated REST API backend at `/api/v1`.

---

## 2. Goals & Objectives

- Provide a seamless, modern travel discovery experience for end users
- Enable AI-powered itinerary generation with minimal friction
- Allow real-time AI chat for personalized travel assistance
- Provide content managers a dashboard to manage destinations and media
- Give admins full oversight of users, itineraries, and platform health
- Ensure secure, role-based access across all routes

---

## 3. Tech Stack

### Core

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Runtime | Node.js |
| Package Manager | pnpm |

### UI & Styling

| Purpose | Technology |
|---|---|
| Styling | Tailwind CSS v4 |
| Component Library | ShadCN UI |
| Animations | Framer Motion |
| Icons | Lucide React |
| Toast Notifications | Sonner |

### Data & State

| Purpose | Technology |
|---|---|
| Server State / Data Fetching | TanStack React Query v5 |
| Forms | React Hook Form |
| Form Validation | Zod |
| HTTP Client | Next.js native `fetch` (custom wrapper) |
| Auth State | React Context (AuthProvider) |

### Auth & Security

| Purpose | Technology |
|---|---|
| Auth Storage | HTTP-only cookies (managed by backend) |
| Token Refresh | fetch wrapper (auto-retry on 401 via `/auth/refresh-token`) |
| Route Protection | Next.js `middleware.ts` |

### Media

| Purpose | Technology |
|---|---|
| Image Uploads | Native `<input type="file">` + FormData |
| Image Optimization | Next.js `<Image>` component |

---

## 4. User Roles

| Role | Access Level |
|---|---|
| **Guest** | Public pages only (home, destinations, auth pages) |
| **User** | All public pages + profile, itineraries, AI chat, saved |
| **Content Manager (CM)** | User access + content manager dashboard |
| **Admin** | Full access including admin dashboard and user management |

---

## 5. Route Architecture

### Public Routes (No Auth Required)
```
/                          → Landing / Home page
/destinations              → Browse all destinations
/destinations/[slug]       → Single destination detail
/login                     → Login
/register                  → Register
/forgot-password           → Request password reset
/reset-password            → Reset password (via token)
/verify-email              → Email verification
```

### Auth Required Routes
```
/profile                   → View & edit user profile
/itineraries               → My itineraries list
/itineraries/create        → AI itinerary generation
/itineraries/[id]          → Single itinerary detail
/ai-chat                   → Chat list + new chat
/ai-chat/[chatId]          → Chat conversation view
/saved                     → Saved destinations & itineraries
```

### Admin Only Routes
```
/admin                     → Dashboard stats & charts
/admin/users               → User management (roles, status)
/admin/itineraries         → Itinerary oversight
/admin/profile             → Admin profile settings
```

### Content Manager + Admin Routes
```
/content-manager                              → CM overview
/content-manager/destinations                 → List & manage destinations
/content-manager/destinations/[id]            → Edit destination details
/content-manager/destinations/[id]/cover      → Update cover image
/content-manager/destinations/[id]/gallery    → Manage gallery images
/content-manager/profile                      → CM profile
```

---

## 6. Feature Requirements

### 6.1 Authentication

- **Register** with name, email, password, confirm password (Zod validated)
- **Login** with email/password; backend sets HTTP-only cookie + returns user
- **Forgot Password** → sends reset email via backend
- **Reset Password** → token-based via link in email
- **Email Verification** → verify account via emailed token
- **Change Password** from profile page
- **Logout** → clears cookie, resets auth context
- **Auto token refresh** → fetch wrapper retries on 401 with `/auth/refresh-token`

### 6.2 Destinations

- Browse all destinations with **search**, **category filter**, **budget range filter**, and **pagination**
- View single destination: cover image, gallery, description, category, budget, reviews, average rating
- Save/unsave destination (heart/bookmark toggle)
- Leave a review with star rating and text
- Destination gallery with lightbox/carousel

### 6.3 AI Itinerary Generation

- Form to generate AI itinerary: destination picker, trip duration, preferences, budget
- Generated itinerary displayed as **day-by-day timeline**
- Each day contains activity cards with time, description, location
- Save and revisit itineraries from "My Itineraries"

### 6.4 AI Chat

- Start new chat sessions with the AI travel assistant
- Real-time conversational chat interface (ChatWindow, ChatBubble)
- Chat list sidebar for switching between sessions
- Persisted chat history per user

### 6.5 Saved Items

- Tabbed view: **Saved Destinations** | **Saved Itineraries**
- Toggle save from any destination card or detail page
- Remove from saved

### 6.6 User Profile

- View and edit display name, email, profile image
- Upload profile image (FormData → `PATCH /users/me`)
- Change password section
- Account deletion option

### 6.7 Admin Dashboard

- Stats cards: total users, destinations, itineraries, chats
- User management table: view all users (normal + CMs), change role, toggle active/suspended, delete
- Itinerary oversight: view all itineraries across users
- Admin profile management

### 6.8 Content Manager Dashboard

- List all destinations with publish/unpublish toggle
- Edit destination details (name, description, category, budget, etc.)
- Update cover image
- Manage gallery images: add new, reorder, delete individual images
- CM profile management

---

## 7. Component Architecture

### Design System (`/components/ui/`)
Reusable primitives built on ShadCN:

`Button`, `Input`, `Textarea`, `Select`, `Modal`, `Badge`, `Card`, `Skeleton`, `Avatar`, `Tabs`, `Pagination`, `StarRating`, `FileUpload`, `ConfirmDialog`

### Layout Components (`/components/layout/`)
`Navbar`, `Footer`, `Sidebar` (dashboard), `DashboardTopbar`, `MobileNav`

### Feature Components
Organized by domain: `auth/`, `destination/`, `itinerary/`, `review/`, `ai-chat/`, `saved/`, `admin/`, `content-manager/`, `home/`

---

## 8. Data Fetching Strategy

All server state is managed through **TanStack React Query v5**, using a custom **Next.js native fetch wrapper** (`src/lib/api.ts`) instead of Axios:

```
Component
  → Custom Hook (e.g. useDestinations)
    → Service Function (e.g. destinationService.getAll)
      → api wrapper (src/lib/api.ts)
        → Next.js native fetch → Backend API
```

- **GET** requests use `useQuery` with appropriate cache keys
- **POST / PATCH / DELETE** use `useMutation` with cache invalidation on success
- **Optimistic updates** for save/unsave toggles

### fetch Wrapper (`src/lib/api.ts`)

The custom wrapper provides:

- **Base URL** prepended from `NEXT_PUBLIC_API_URL`
- **`credentials: 'include'`** on every request — sends HTTP-only cookies automatically
- **Auto JSON parsing** via `res.json()`
- **Error handling** via `res.ok` check — throws with backend error message
- **Auto token refresh** — on 401, calls `/auth/refresh-token` then retries original request
- **Helper methods** — `api.get()`, `api.post()`, `api.patch()`, `api.delete()`

### Next.js fetch Cache Controls

Native fetch in Next.js App Router supports extended caching options unavailable in Axios:

| Option | Usage |
|---|---|
| `{ next: { revalidate: 3600 } }` | ISR — revalidate every hour (e.g. featured destinations) |
| `{ cache: 'no-store' }` | Always fresh — no caching (e.g. user profile, dashboard stats) |
| `{ next: { tags: ['destinations'] } }` | On-demand revalidation via tag |

---

## 9. Auth Flow

```
User logs in
  → Backend sets HTTP-only cookie + returns { user, accessToken }
  → AuthProvider stores user in React Context
  → fetch wrapper sends credentials: 'include' on every request (auto cookie attach)
  → On 401 → fetch wrapper auto-calls /auth/refresh-token → retries original request
  → On refresh failure → logout + redirect to /login
  → middleware.ts checks cookie presence for SSR route protection
```

---

## 10. Image Upload Flow

| Upload Type | Field Name | Endpoint |
|---|---|---|
| User profile image | `image` | `PATCH /users/me` |
| Destination cover | `coverImage` | `PATCH /content-manager/destinations/:id/cover` |
| Destination gallery | `images` (multiple) | `POST /content-manager/destinations/:id/images` |

All uploads use `multipart/form-data` via native FormData.

---

## 11. Page ↔ API Mapping

| Page | Backend Endpoints |
|---|---|
| Home `/` | `GET /destinations` (featured, limited) |
| Login | `POST /auth/login` |
| Register | `POST /auth/register` |
| Forgot Password | `POST /auth/forgot-password` |
| Reset Password | `POST /auth/reset-password` |
| Verify Email | `POST /auth/verify-email` |
| Destinations | `GET /destinations?search&category&budget&page` |
| Destination Detail | `GET /destinations/:slug`, `GET /reviews/:destinationId`, `POST /reviews`, `POST /saved/destination` |
| Create Itinerary | `POST /itineraries`, `GET /destinations` |
| My Itineraries | `GET /itineraries/my-itineraries` |
| Itinerary Detail | `GET /itineraries/:id` |
| AI Chat | `POST /ai-chat`, `GET /ai-chat/my-chats` |
| Chat Conversation | `POST /ai-chat/send`, `GET /ai-chat/:chatId/messages` |
| Saved | `GET /saved` |
| Profile | `GET /users/me`, `PATCH /users/me`, `POST /auth/change-password` |
| Admin Dashboard | `GET /admin/dashboard-stats` |
| Admin Users | `GET /admin/users/normal`, `GET /admin/users/content-managers`, `PUT /admin/users/:id/status`, `PUT /admin/users/:id/role`, `DELETE /admin/users/:id` |
| Admin Itineraries | `GET /admin/itineraries`, `GET /admin/itineraries/:id` |
| CM Destinations | `PATCH /content-manager/destinations/:id` |
| CM Edit Destination | `PATCH .../destinations/:id`, `PATCH .../cover`, `POST .../images`, `PATCH .../images/:imageId`, `DELETE .../images/:imageId` |

---

## 12. Environment Variables

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

---

## 13. Non-Functional Requirements

- **Responsive** — mobile-first design, works on all screen sizes
- **Accessible** — semantic HTML, ARIA labels, keyboard navigable
- **Performance** — Next.js Image optimization, TanStack Query caching, code splitting
- **Type Safe** — strict TypeScript throughout, Zod schemas for runtime validation
- **Error Handling** — global error boundaries, per-query error states, toast notifications via Sonner
- **Loading States** — Skeleton components for all async data fetches

---

## 14. Folder Structure Summary

```
client/
├── src/
│   ├── app/              # Next.js App Router pages & layouts
│   │   ├── (auth)/       # Auth route group
│   │   ├── (main)/       # Main app route group
│   │   └── (dashboard)/  # Admin & CM dashboard group
│   ├── components/       # UI, layout & feature components
│   ├── hooks/            # Custom TanStack Query hooks
│   ├── services/         # fetch-based API service layer
│   ├── providers/        # Auth, Query, Theme providers
│   ├── types/            # Shared TypeScript interfaces
│   ├── schemas/          # Zod validation schemas
│   ├── lib/              # Utilities & constants
│   └── middleware.ts     # Route protection
├── .env.local
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```
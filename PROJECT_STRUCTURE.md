# EstateOS — Project Structure (SaaS)

Industry-standard, scalable layout for a multi-tenant estate security SaaS.

## App routes (Next.js App Router)

| Route group   | Paths              | Purpose                          |
|---------------|--------------------|----------------------------------|
| `(public)`    | `/`                | Landing / marketing (unauthenticated) |
| `(auth)`      | `/login`, `/register`, `/forgot-password` | Auth flows                      |
| `(dashboard)` | `/dashboard/*`     | Admin command center (sidebar + pages) |
| `(resident)`  | `/resident`        | Resident portal (guest passes, panic)   |
| `(security)`  | `/security`       | Security terminal (QR scan, incidents)   |

- **Route groups** `(name)` do not affect the URL; they only group layouts and pages.
- All dashboard URLs stay `/dashboard`, `/dashboard/residents`, etc.

## Components

| Folder         | Role |
|----------------|------|
| `components/ui/`      | Primitives: Badge, Card, Modal, StatCard |
| `components/layout/`  | App shell: Sidebar, TopBar (dashboard)   |
| `components/auth/`   | Auth: LoginForm, AuthBranding           |
| `components/shared/` | Shared: Logo (used in auth, resident, security, sidebar) |

## Lib

| Path                | Role |
|---------------------|------|
| `lib/constants/routes.ts` | Single source of truth for all paths (`ROUTES`) |
| `lib/constants/roles.ts`  | User roles and portal routing (`ROLES`)        |
| `lib/utils/cn.ts`         | `cn()` for class names (clsx)                  |
| `lib/types/index.ts`      | Shared types (PassType, VisitorStatus, etc.)   |

## Public

- `public/` — Static assets (favicon, images, etc.). Unchanged.

## Adding new features

- **New dashboard page:** Add `app/(dashboard)/dashboard/<name>/page.tsx` and a nav item in `components/layout/Sidebar.tsx` using `ROUTES` from `lib/constants/routes.ts`.
- **New auth page:** Add `app/(auth)/<name>/page.tsx` and optionally a link in `LoginForm` or `AuthBranding`.
- **New shared UI:** Add to `components/ui/`; use in any route group.
- **New route constant:** Add to `lib/constants/routes.ts` and use everywhere for links/navigation.

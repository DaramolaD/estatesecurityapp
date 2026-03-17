/**
 * Application route paths — single source of truth for navigation
 */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',

  DASHBOARD: '/dashboard',
  DASHBOARD_RESIDENTS: '/dashboard/residents',
  DASHBOARD_VISITORS: '/dashboard/visitors',
  DASHBOARD_INCIDENTS: '/dashboard/incidents',
  DASHBOARD_PAYMENTS: '/dashboard/payments',

  SECURITY: '/security',
  RESIDENT: '/resident',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];

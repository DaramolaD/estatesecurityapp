/**
 * User roles and their portal routing
 */
export const ROLES = [
  { value: 'admin', label: 'Estate Admin', route: '/dashboard', color: 'var(--gold)' },
  { value: 'security', label: 'Security Guard', route: '/security', color: '#3498DB' },
  { value: 'resident', label: 'Resident', route: '/resident', color: '#2ECC71' },
] as const;

export type RoleValue = (typeof ROLES)[number]['value'];

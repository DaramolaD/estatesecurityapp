import { clsx, type ClassValue } from 'clsx';

/**
 * Merge class names with clsx (Tailwind-friendly)
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

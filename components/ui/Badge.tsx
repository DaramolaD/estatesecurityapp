'use client';
import { clsx } from 'clsx';

interface BadgeProps {
  variant?: 'active' | 'approved' | 'granted' | 'pending' | 'awaiting' | 'denied' | 'flagged' | 'banned' | 'info' | 'expected' | 'gold';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'info', children, className }: BadgeProps) {
  const variantMap: Record<string, string> = {
    active: 'badge-active',
    approved: 'badge-approved',
    granted: 'badge-granted',
    pending: 'badge-pending',
    awaiting: 'badge-awaiting',
    denied: 'badge-denied',
    flagged: 'badge-flagged',
    banned: 'badge-banned',
    info: 'badge-info',
    expected: 'badge-expected',
    gold: 'badge-gold',
  };

  return (
    <span className={clsx('badge', variantMap[variant], className)}>
      {children}
    </span>
  );
}

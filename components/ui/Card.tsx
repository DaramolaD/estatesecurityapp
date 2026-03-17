'use client';
import { clsx } from 'clsx';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  noPadding?: boolean;
}

export function Card({ children, className, title, subtitle, actions, noPadding }: CardProps) {
  return (
    <div className={clsx('glass-card', className)}>
      {(title || actions) && (
        <div className={clsx(
          'flex items-center justify-between',
          !noPadding && 'px-6 py-4',
          'border-b',
        )} style={{ borderColor: 'var(--border-subtle)' }}>
          <div>
            {title && <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>{title}</h3>}
            {subtitle && <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{subtitle}</p>}
          </div>
          {actions && <div>{actions}</div>}
        </div>
      )}
      <div className={clsx(!noPadding && 'p-6')}>{children}</div>
    </div>
  );
}

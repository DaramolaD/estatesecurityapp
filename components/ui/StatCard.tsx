'use client';
import { ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { clsx } from 'clsx';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  iconColor?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

export function StatCard({ label, value, icon, iconColor, trend, trendValue, className }: StatCardProps) {
  const trendColor = trend === 'up' ? 'var(--success)' : trend === 'down' ? 'var(--danger)' : 'var(--text-muted)';

  return (
    <div className={clsx('stat-card', className)}>
      <div className="flex items-start justify-between mb-4">
        <div
          style={{
            background: iconColor ? `${iconColor}20` : 'rgba(201,168,76,0.12)',
            border: `1px solid ${iconColor ? `${iconColor}30` : 'var(--border)'}`,
            borderRadius: 10,
            padding: 10,
            color: iconColor || 'var(--gold)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {icon}
        </div>
        {trend && trendValue && (
          <div className="flex items-center gap-1" style={{ color: trendColor, fontSize: 12, fontWeight: 600 }}>
            {trend === 'up' ? <TrendingUp size={13} /> : trend === 'down' ? <TrendingDown size={13} /> : <Minus size={13} />}
            {trendValue}
          </div>
        )}
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4, letterSpacing: '-1px' }}>
        {value}
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
        {label}
      </div>
    </div>
  );
}

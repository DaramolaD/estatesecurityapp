'use client';
import { Building2 } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const sizes = { sm: 28, md: 36, lg: 72 };
const iconSizes = { sm: 14, md: 18, lg: 36 };

export function Logo({ size = 'md', showLabel = true, className }: LogoProps) {
  const box = sizes[size];
  const icon = iconSizes[size];

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: size === 'lg' ? 12 : 10,
      }}
    >
      <div
        style={{
          width: box,
          height: box,
          background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))',
          borderRadius: size === 'lg' ? 20 : 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          ...(size === 'lg' && { boxShadow: '0 8px 32px rgba(201,168,76,0.25)' }),
        }}
      >
        <Building2 size={icon} color="#000" />
      </div>
      {showLabel && (
        <div>
          <div
            style={{
              fontSize: size === 'lg' ? 48 : size === 'md' ? 16 : 14,
              fontWeight: 800,
              letterSpacing: '-0.5px',
              color: 'var(--text-primary)',
            }}
          >
            Estate<span style={{ color: 'var(--gold)' }}>OS</span>
          </div>
          {size === 'md' && (
            <div
              style={{
                fontSize: 10,
                color: 'var(--text-muted)',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              Admin Portal
            </div>
          )}
        </div>
      )}
    </div>
  );
}

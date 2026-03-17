'use client';
import { Bell, Search } from 'lucide-react';

interface TopBarProps {
  title: string;
  subtitle?: string;
}

export function TopBar({ title, subtitle }: TopBarProps) {
  return (
    <header
      style={{
        height: 64,
        background: 'var(--slate-800)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      <div>
        <h1 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)' }}>{title}</h1>
        {subtitle && (
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 1 }}>{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'var(--slate-600)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 8,
            padding: '7px 12px',
            width: 220,
          }}
        >
          <Search size={14} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search..."
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: 13,
              color: 'var(--text-primary)',
              width: '100%',
              fontFamily: 'inherit',
            }}
          />
        </div>

        <button
          style={{
            position: 'relative',
            background: 'var(--slate-600)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 8,
            padding: 8,
            cursor: 'pointer',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Bell size={16} />
          <span
            style={{
              position: 'absolute',
              top: 5,
              right: 5,
              width: 7,
              height: 7,
              background: 'var(--gold)',
              borderRadius: '50%',
              border: '1.5px solid var(--slate-800)',
            }}
          />
        </button>

        <div
          style={{
            width: 34,
            height: 34,
            background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            fontWeight: 700,
            color: '#000',
            cursor: 'pointer',
            border: '2px solid var(--border)',
          }}
        >
          A
        </div>
      </div>
    </header>
  );
}

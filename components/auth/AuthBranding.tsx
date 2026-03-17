'use client';
import { Logo } from '@/components/shared/Logo';

const features = [
  { icon: '🔐', label: 'End-to-End Encrypted' },
  { icon: '⚡', label: 'Real-Time Access' },
  { icon: '🏛️', label: 'Multi-Tenant SaaS' },
  { icon: '📱', label: 'Mobile-First' },
];

export function AuthBranding() {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(201,168,76,0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(201,168,76,0.05) 0%, transparent 50%)
          `,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      <div style={{ position: 'relative', maxWidth: 440, textAlign: 'center' }}>
        <div style={{ marginBottom: 28 }}>
          <Logo size="lg" showLabel={false} />
        </div>
        <h1
          style={{
            fontSize: 48,
            fontWeight: 900,
            letterSpacing: '-2px',
            marginBottom: 16,
            lineHeight: 1.1,
          }}
        >
          Estate<span className="animate-shimmer">OS</span>
        </h1>
        <p
          style={{
            fontSize: 16,
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            marginBottom: 48,
          }}
        >
          Invisible Security. Visible Luxury.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
          {features.map(({ icon, label }) => (
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: 'rgba(201,168,76,0.06)',
                border: '1px solid var(--border)',
                borderRadius: 20,
                padding: '6px 14px',
                fontSize: 12,
                color: 'var(--text-secondary)',
                fontWeight: 500,
              }}
            >
              <span>{icon}</span>
              {label}
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 48,
            padding: '18px 24px',
            background: 'rgba(201,168,76,0.06)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            textAlign: 'left',
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: 'var(--gold)',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: 8,
            }}
          >
            Connected Estate
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
            Lekki Phase 1 Estates
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
            240 Units · 3 Gates · 12 Guards
          </div>
        </div>
      </div>
    </div>
  );
}

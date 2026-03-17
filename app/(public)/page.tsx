'use client';
import Link from 'next/link';
import { Building2, Shield, Zap, Building, Smartphone, ArrowRight } from 'lucide-react';
import { ROUTES } from '@/lib/constants/routes';

const features = [
  { icon: '🔐', label: 'End-to-End Encrypted' },
  { icon: '⚡', label: 'Real-Time Access' },
  { icon: '🏛️', label: 'Multi-Tenant SaaS' },
  { icon: '📱', label: 'Mobile-First' },
];

export default function PublicLandingPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--slate-900)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Background */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(201,168,76,0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(201,168,76,0.05) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <header
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 48px',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))',
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Building2 size={20} color="#000" />
          </div>
          <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.5px' }}>
            Estate<span style={{ color: 'var(--gold)' }}>OS</span>
          </span>
        </div>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <Link
            href={ROUTES.LOGIN}
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: 'var(--text-secondary)',
              textDecoration: 'none',
            }}
          >
            Sign In
          </Link>
          <Link
            href={ROUTES.LOGIN}
            className="btn-primary"
            style={{ padding: '10px 20px', fontSize: 14, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            Get Started <ArrowRight size={14} />
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <main
        style={{
          position: 'relative',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 60,
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(40px, 6vw, 64px)',
            fontWeight: 900,
            letterSpacing: '-2px',
            marginBottom: 20,
            lineHeight: 1.1,
          }}
        >
          Invisible Security.<br />Visible Luxury.
        </h1>
        <p
          style={{
            fontSize: 18,
            color: 'var(--text-secondary)',
            maxWidth: 520,
            marginBottom: 32,
            lineHeight: 1.6,
          }}
        >
          The estate operating system for modern gated communities. Command center, visitor management, and payments in one platform.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 48 }}>
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
        <Link
          href={ROUTES.LOGIN}
          className="btn-primary"
          style={{
            padding: '16px 32px',
            fontSize: 16,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <Shield size={20} />
          Sign in to EstateOS
        </Link>

        <div
          style={{
            marginTop: 64,
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
      </main>
    </div>
  );
}

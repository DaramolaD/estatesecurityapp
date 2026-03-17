'use client';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';
import { AuthBranding } from '@/components/auth/AuthBranding';

export default function RegisterPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--slate-900)',
        display: 'flex',
        overflow: 'hidden',
      }}
    >
      <AuthBranding />
      <div
        style={{
          width: 440,
          background: 'var(--slate-800)',
          borderLeft: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px 48px',
        }}
      >
        <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>
          Create account
        </h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24 }}>
          Estate registration is by invitation. Contact your estate admin for access.
        </p>
        <Link
          href={ROUTES.LOGIN}
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center', height: 44, fontSize: 15, textDecoration: 'none' }}
        >
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}

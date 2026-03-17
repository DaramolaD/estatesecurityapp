'use client';
import { LoginForm } from '@/components/auth/LoginForm';
import { AuthBranding } from '@/components/auth/AuthBranding';

export default function LoginPage() {
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
        <LoginForm />
      </div>
    </div>
  );
}

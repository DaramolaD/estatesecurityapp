'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Shield, Lock, Mail, ChevronDown } from 'lucide-react';
import { ROLES } from '@/lib/constants/roles';

type RoleItem = (typeof ROLES)[number];

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<RoleItem>(ROLES[0]);
  const [roleOpen, setRoleOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push(role.route);
    }, 1000);
  };

  return (
    <>
      <div style={{ marginBottom: 36 }}>
        <h2
          style={{
            fontSize: 26,
            fontWeight: 800,
            color: 'var(--text-primary)',
            marginBottom: 6,
            letterSpacing: '-0.5px',
          }}
        >
          Welcome back
        </h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
          Sign in to your EstateOS portal
        </p>
      </div>

      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              display: 'block',
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--text-secondary)',
              marginBottom: 8,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}
          >
            Sign in as
          </label>
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setRoleOpen(!roleOpen)}
              style={{
                width: '100%',
                background: 'var(--slate-600)',
                border: `1px solid ${roleOpen ? 'var(--gold)' : 'var(--border-subtle)'}`,
                borderRadius: 8,
                padding: '10px 14px',
                color: 'var(--text-primary)',
                fontSize: 14,
                fontFamily: 'inherit',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'border-color 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: role.color }} />
                {role.label}
              </div>
              <ChevronDown
                size={14}
                style={{ transform: roleOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}
              />
            </button>
            {roleOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 4px)',
                  left: 0,
                  right: 0,
                  background: 'var(--slate-700)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  overflow: 'hidden',
                  zIndex: 10,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                }}
              >
                {ROLES.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => {
                      setRole(r);
                      setRoleOpen(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      background: role.value === r.value ? 'rgba(201,168,76,0.08)' : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      fontSize: 14,
                      color: role.value === r.value ? 'var(--gold)' : 'var(--text-primary)',
                      fontFamily: 'inherit',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: r.color }} />
                    {r.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label
            style={{
              display: 'block',
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--text-secondary)',
              marginBottom: 8,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}
          >
            Email address
          </label>
          <div style={{ position: 'relative' }}>
            <Mail
              size={14}
              style={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
                pointerEvents: 'none',
              }}
            />
            <input
              type="email"
              className="input-field"
              placeholder="admin@estateos.io"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ paddingLeft: 36 }}
            />
          </div>
        </div>

        <div style={{ marginBottom: 28 }}>
          <label
            style={{
              display: 'block',
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--text-secondary)',
              marginBottom: 8,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}
          >
            Password
          </label>
          <div style={{ position: 'relative' }}>
            <Lock
              size={14}
              style={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
                pointerEvents: 'none',
              }}
            />
            <input
              type={showPassword ? 'text' : 'password'}
              className="input-field"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ paddingLeft: 36, paddingRight: 40 }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                display: 'flex',
                padding: 0,
              }}
            >
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center', height: 44, fontSize: 15 }}
          disabled={loading}
        >
          {loading ? (
            <div
              style={{
                width: 18,
                height: 18,
                border: '2px solid rgba(0,0,0,0.3)',
                borderTopColor: '#000',
                borderRadius: '50%',
                animation: 'spin-slow 0.7s linear infinite',
              }}
            />
          ) : (
            <>
              <Shield size={16} />
              Sign in to {role.label}
            </>
          )}
        </button>
      </form>

      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <a
          href="/forgot-password"
          style={{ fontSize: 13, color: 'var(--gold)', textDecoration: 'none', fontWeight: 500 }}
        >
          Forgot password?
        </a>
      </div>

      <div
        style={{
          marginTop: 36,
          padding: '14px 18px',
          background: 'rgba(52,152,219,0.06)',
          border: '1px solid rgba(52,152,219,0.2)',
          borderRadius: 10,
          fontSize: 12,
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
        }}
      >
        🔐 <strong style={{ color: 'var(--text-primary)' }}>Demo Access:</strong> Select a role above
        and click Sign In to explore the portal.
      </div>
    </>
  );
}

'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Users, UserCheck, AlertTriangle,
  CreditCard, Shield, LogOut, ChevronRight, Building2,
} from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
  { href: '/dashboard', label: 'Command Center', icon: LayoutDashboard, exact: true },
  { href: '/dashboard/residents', label: 'Residents', icon: Users },
  { href: '/dashboard/visitors', label: 'Visitor Logs', icon: UserCheck },
  { href: '/dashboard/incidents', label: 'Incidents', icon: AlertTriangle },
  { href: '/dashboard/payments', label: 'Payments', icon: CreditCard },
];

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <aside
      style={{
        width: 240,
        minHeight: '100vh',
        background: 'var(--slate-800)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        padding: '0',
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: '24px 20px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Building2 size={18} color="#000" />
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
            Estate<span style={{ color: 'var(--gold)' }}>OS</span>
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>
            Admin Portal
          </div>
        </div>
      </div>

      {/* Nav section */}
      <div style={{ padding: '16px 12px', flex: 1 }}>
        <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', padding: '0 8px', marginBottom: 8 }}>
          Management
        </div>
        {navItems.map(({ href, label, icon: Icon, exact }) => (
          <Link
            key={href}
            href={href}
            className={clsx('sidebar-item', isActive(href, exact) && 'active')}
          >
            <Icon size={16} />
            <span style={{ flex: 1 }}>{label}</span>
            {isActive(href, exact) && <ChevronRight size={14} />}
          </Link>
        ))}

        <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', padding: '16px 8px 8px', marginTop: 8, borderTop: '1px solid var(--border-subtle)' }}>
          Portals
        </div>
        <Link href="/security" className="sidebar-item">
          <Shield size={16} />
          <span style={{ flex: 1 }}>Security Terminal</span>
        </Link>
        <Link href="/resident" className="sidebar-item">
          <Users size={16} />
          <span style={{ flex: 1 }}>Resident Portal</span>
        </Link>
      </div>

      {/* Footer */}
      <div style={{ padding: '16px 12px', borderTop: '1px solid var(--border-subtle)' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 12px',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: 10,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              background: 'linear-gradient(135deg, #9A7A2E, var(--gold))',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 13,
              fontWeight: 700,
              color: '#000',
            }}
          >
            A
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Admin User</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>admin@estateos.io</div>
          </div>
        </div>
        <Link href="/" className="sidebar-item" style={{ color: 'var(--danger)', fontSize: 13 }}>
          <LogOut size={15} />
          Sign Out
        </Link>
      </div>
    </aside>
  );
}

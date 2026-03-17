'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Plus, QrCode, Bell, Clock, User, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Card } from '@/components/ui/Card';
import { Logo } from '@/components/shared/Logo';
import { ROUTES } from '@/lib/constants/routes';
import type { PassType, PassStatus } from '@/lib/types';

const passes = [
  { id: 'GPA-001', name: 'Kelechi Nwosu', type: 'single' as PassType, validUntil: 'Today, 11:59 PM', status: 'active' as PassStatus, qr: '█▀█ ▀ █▀' },
  { id: 'GPA-002', name: 'MainFix Plumber', type: 'service' as PassType, validUntil: 'Today 09:00 AM – 5:00 PM', status: 'active' as PassStatus, qr: '▀█▀ █ ▀█' },
  { id: 'GPA-003', name: 'Tunde (Family)', type: 'permanent' as PassType, validUntil: 'No expiry', status: 'active' as PassStatus, qr: '█▄█ ▀ ▄█' },
];

const notifications = [
  { id: 1, message: 'Your guest Kelechi Nwosu has arrived at Main Gate', time: '9 mins ago', type: 'arrival', read: false },
  { id: 2, message: 'MainFix Plumber has been verified and granted entry', time: '1 hr ago', type: 'service', read: false },
  { id: 3, message: 'Service charge of ₦15,000 due on March 31', time: '2 hrs ago', type: 'payment', read: true },
  { id: 4, message: 'Estate general meeting scheduled for March 25', time: '1 day ago', type: 'notice', read: true },
];

const passTypeLabels: Record<PassType, string> = {
  single: 'Single Entry',
  service: 'Service Pass',
  permanent: 'Permanent',
};

const passTypeColors: Record<PassType, string> = {
  single: '#3498DB',
  service: '#F39C12',
  permanent: '#2ECC71',
};

export default function ResidentPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedPass, setSelectedPass] = useState<(typeof passes)[0] | null>(null);
  const [panic, setPanic] = useState(false);
  const [panicSent, setPanicSent] = useState(false);
  const [panicTimer, setPanicTimer] = useState(0);
  const [guestName, setGuestName] = useState('');
  const [guestType, setGuestType] = useState<PassType>('single');

  const startPanic = () => {
    setPanic(true);
    let t = 0;
    const interval = setInterval(() => {
      t++;
      setPanicTimer(t);
      if (t >= 3) {
        clearInterval(interval);
        setPanicSent(true);
        setTimeout(() => {
          setPanic(false);
          setPanicSent(false);
          setPanicTimer(0);
        }, 3000);
      }
    }, 1000);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--slate-900)' }}>
      <div style={{ background: 'var(--slate-800)', borderBottom: '1px solid var(--border-subtle)', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Logo size="md" showLabel={false} />
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.5px', color: 'var(--text-primary)' }}>Estate<span style={{ color: 'var(--gold)' }}>OS</span></div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Resident Portal</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ position: 'relative' }}>
            <button style={{ background: 'var(--slate-600)', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: 8, cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex' }}>
              <Bell size={16} />
            </button>
            <span style={{ position: 'absolute', top: 5, right: 5, width: 7, height: 7, background: 'var(--gold)', borderRadius: '50%', border: '1.5px solid var(--slate-800)' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: '6px 12px' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#000' }}>A</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Adaeze Okafor</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Unit A-01 · Owner</div>
            </div>
          </div>
          <Link href={ROUTES.LOGIN} style={{ fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none' }}>Sign Out</Link>
        </div>
      </div>

      <div style={{ padding: 24, display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, maxWidth: 1200, margin: '0 auto' }}>
        <div>
          <div style={{ background: 'linear-gradient(135deg, var(--slate-700), var(--slate-600))', border: '1px solid var(--border)', borderRadius: 16, padding: 24, marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--gold)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6 }}>Good afternoon</div>
              <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 4 }}>Adaeze Okafor</h2>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Unit A-01 · 3 active guest passes</div>
            </div>
            <button className="btn-primary" onClick={() => setCreateOpen(true)} style={{ flexShrink: 0 }}>
              <Plus size={15} /> Create Guest Pass
            </button>
          </div>

          <Card title="My Guest Passes" subtitle={`${passes.length} passes · ${passes.filter((p) => p.status === 'active').length} active`}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {passes.map((pass) => (
                <div
                  key={pass.id}
                  onClick={() => setSelectedPass(pass)}
                  style={{
                    background: 'var(--slate-800)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 12,
                    padding: '16px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    cursor: 'pointer',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      flexShrink: 0,
                      background: `${passTypeColors[pass.type]}18`,
                      border: `1px solid ${passTypeColors[pass.type]}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {pass.type === 'permanent' ? <User size={18} color={passTypeColors[pass.type]} /> : pass.type === 'service' ? <Shield size={18} color={passTypeColors[pass.type]} /> : <QrCode size={18} color={passTypeColors[pass.type]} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                      <span style={{ fontWeight: 700, fontSize: 14 }}>{pass.name}</span>
                      <Badge variant={pass.status}>{passTypeLabels[pass.type]}</Badge>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)' }}>
                      <Clock size={11} />
                      <span style={{ marginLeft: 2 }}>{pass.validUntil}</span>
                    </div>
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: 10, color: 'var(--text-muted)', flexShrink: 0 }}>ID: {pass.id}</div>
                  <QrCode size={18} color="var(--text-muted)" />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: 'var(--slate-700)', border: panicSent ? '1px solid #2ECC71' : '1px solid rgba(231,76,60,0.3)', borderRadius: 14, padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 14 }}>Emergency</div>
            {panicSent ? (
              <div>
                <CheckCircle size={36} color="#2ECC71" style={{ margin: '0 auto 10px' }} />
                <div style={{ fontSize: 14, fontWeight: 700, color: '#2ECC71', marginBottom: 4 }}>Alert Sent!</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Guard post notified with your location</div>
              </div>
            ) : (
              <>
                <button
                  onMouseDown={startPanic}
                  style={{
                    width: 88,
                    height: 88,
                    borderRadius: '50%',
                    border: `3px solid ${panic ? '#E74C3C' : 'rgba(231,76,60,0.4)'}`,
                    background: panic ? 'rgba(231,76,60,0.2)' : 'rgba(231,76,60,0.08)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px',
                    transition: 'all 0.2s',
                    animation: panic ? 'pulse-gold 0.8s infinite' : 'none',
                  }}
                >
                  <AlertTriangle size={26} color="#E74C3C" />
                  {panic && <div style={{ fontSize: 18, fontWeight: 900, color: '#E74C3C' }}>{3 - panicTimer}</div>}
                </button>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 3 }}>Panic Button</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{panic ? 'Keep holding...' : 'Hold for 3 seconds to alert security'}</div>
              </>
            )}
          </div>

          <Card title="Notifications" subtitle={`${notifications.filter((n) => !n.read).length} unread`}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {notifications.map((n) => (
                <div
                  key={n.id}
                  style={{
                    padding: '10px 0',
                    borderBottom: '1px solid var(--border-subtle)',
                    display: 'flex',
                    gap: 10,
                    opacity: n.read ? 0.6 : 1,
                  }}
                >
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: n.read ? 'var(--text-muted)' : 'var(--gold)', marginTop: 4, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--text-primary)', lineHeight: 1.5, fontWeight: n.read ? 400 : 600 }}>{n.message}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Modal isOpen={createOpen} onClose={() => setCreateOpen(false)} title="Create Guest Pass">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Guest Name</label>
            <input className="input-field" placeholder="Full name of your guest" value={guestName} onChange={(e) => setGuestName(e.target.value)} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pass Type</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              {(['single', 'service', 'permanent'] as PassType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setGuestType(t)}
                  style={{
                    padding: '10px 8px',
                    borderRadius: 8,
                    cursor: 'pointer',
                    textAlign: 'center',
                    background: guestType === t ? `${passTypeColors[t]}18` : 'var(--slate-800)',
                    border: `1px solid ${guestType === t ? passTypeColors[t] : 'var(--border-subtle)'}`,
                    color: guestType === t ? passTypeColors[t] : 'var(--text-secondary)',
                    fontSize: 12,
                    fontWeight: 600,
                    fontFamily: 'inherit',
                    transition: 'all 0.2s',
                  }}
                >
                  {passTypeLabels[t]}
                </button>
              ))}
            </div>
            <div style={{ marginTop: 8, fontSize: 11, color: 'var(--text-muted)' }}>
              {guestType === 'single' && '✓ One-time entry, expires at midnight'}
              {guestType === 'service' && '✓ Restricted time window (e.g. 9AM – 5PM only)'}
              {guestType === 'permanent' && '✓ Unrestricted recurring access for family'}
            </div>
          </div>
          {guestType === 'service' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Start Time</label>
                <input className="input-field" type="time" defaultValue="09:00" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>End Time</label>
                <input className="input-field" type="time" defaultValue="17:00" />
              </div>
            </div>
          )}
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Valid Date</label>
            <input className="input-field" type="date" />
          </div>
          <button className="btn-primary" style={{ height: 42, justifyContent: 'center' }}>
            <QrCode size={14} /> Generate Guest Pass
          </button>
        </div>
      </Modal>

      <Modal isOpen={!!selectedPass} onClose={() => setSelectedPass(null)} title={selectedPass?.name ?? ''}>
        {selectedPass && (
          <div style={{ textAlign: 'center' }}>
            <Badge variant={selectedPass.status} className="mb-4">{passTypeLabels[selectedPass.type]}</Badge>
            <div style={{ margin: '16px auto', width: 180, height: 180, background: 'white', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '4px solid var(--border)' }}>
              <QrCode size={120} color="#000" />
            </div>
            <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--text-muted)', marginBottom: 8 }}>{selectedPass.id}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 20 }}>
              <Clock size={11} style={{ display: 'inline', marginRight: 4 }} />
              {selectedPass.validUntil}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn-secondary" style={{ flex: 1 }}>Share via WhatsApp</button>
              <button className="btn-danger" style={{ flex: 1 }}>Revoke Pass</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

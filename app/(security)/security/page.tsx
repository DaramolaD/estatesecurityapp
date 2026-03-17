'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Building2, Shield, Search, CheckCircle, XCircle, AlertTriangle, Clock, Users, QrCode } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Logo } from '@/components/shared/Logo';
import { ROUTES } from '@/lib/constants/routes';

type VisitorStatus = 'expected' | 'granted' | 'denied' | 'pending';

const expectedVisitors = [
  { id: 1, name: 'Kelechi Nwosu', host: 'Adaeze Okafor', unit: 'A-01', time: 'Expected 10:00 AM', type: 'Guest', status: 'expected' as VisitorStatus },
  { id: 2, name: 'DHL Delivery', host: 'Babatunde Osei', unit: 'B-07', time: 'Expected 10:30 AM', type: 'Service', status: 'granted' as VisitorStatus },
  { id: 3, name: 'Aisha Kano', host: 'Fatimah Al-Hassan', unit: 'C-12', time: 'Expected 2:00 PM', type: 'Guest', status: 'expected' as VisitorStatus },
  { id: 4, name: 'MainFix Plumber', host: 'Olumide Adesanya', unit: 'C-20', time: '9AM – 5PM Service', type: 'Service', status: 'granted' as VisitorStatus },
];

export default function SecurityPage() {
  const [qrInput, setQrInput] = useState('');
  const [scanResult, setScanResult] = useState<null | 'granted' | 'denied' | 'blacklisted'>(null);
  const [incidentOpen, setIncidentOpen] = useState(false);
  const [scanName, setScanName] = useState('');

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qrInput.trim()) return;
    const r = Math.random();
    if (qrInput === 'DENY' || r < 0.1) {
      setScanResult('denied');
      setScanName('Unknown Visitor');
    } else if (qrInput === 'BLACK') {
      setScanResult('blacklisted');
      setScanName('James Adamu');
    } else {
      setScanResult('granted');
      setScanName('Kelechi Nwosu');
    }
  };

  const resetScan = () => {
    setScanResult(null);
    setQrInput('');
    setScanName('');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--slate-900)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: 'var(--slate-800)', borderBottom: '1px solid var(--border-subtle)', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Logo size="md" showLabel={false} />
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.5px', color: 'var(--text-primary)' }}>Estate<span style={{ color: 'var(--gold)' }}>OS</span></div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Security Terminal · Main Gate</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#2ECC71' }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#2ECC71', animation: 'pulse-gold 1.5s infinite' }} />
            Gate Online
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Guard: Emeka Okafor</div>
          <Link href={ROUTES.LOGIN} style={{ fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none' }}>Sign Out</Link>
        </div>
      </div>

      <div style={{ padding: 24, display: 'grid', gridTemplateColumns: 'auto 380px', gap: 24, flex: 1 }}>
        <div>
          <div style={{ background: 'var(--slate-700)', border: '1px solid var(--border)', borderRadius: 16, padding: 32, marginBottom: 20, textAlign: 'center' }}>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 4 }}>QR Access Scanner</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Scan visitor QR code or enter pass ID manually</div>
            </div>

            {!scanResult ? (
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: 28 }}>
                <div style={{ width: 220, height: 220, border: '2px solid var(--border)', borderRadius: 16, background: 'var(--slate-800)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                  <QrCode size={80} color="var(--slate-500)" />
                  {[
                    { top: 8, left: 8, borderTop: '3px solid var(--gold)', borderLeft: '3px solid var(--gold)', borderRadius: '4px 0 0 0' },
                    { top: 8, right: 8, borderTop: '3px solid var(--gold)', borderRight: '3px solid var(--gold)', borderRadius: '0 4px 0 0' },
                    { bottom: 8, left: 8, borderBottom: '3px solid var(--gold)', borderLeft: '3px solid var(--gold)', borderRadius: '0 0 0 4px' },
                    { bottom: 8, right: 8, borderBottom: '3px solid var(--gold)', borderRight: '3px solid var(--gold)', borderRadius: '0 0 4px 0' },
                  ].map((s, i) => (
                    <div key={i} style={{ position: 'absolute', width: 24, height: 24, ...s }} />
                  ))}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', animation: 'slideInLeft 1.5s ease-in-out infinite alternate', boxShadow: '0 0 8px var(--gold)' }} />
                </div>
              </div>
            ) : (
              <div style={{ marginBottom: 28 }}>
                <div
                  style={{
                    width: 220,
                    height: 220,
                    borderRadius: 16,
                    margin: '0 auto',
                    background: scanResult === 'granted' ? 'rgba(46,204,113,0.1)' : 'rgba(231,76,60,0.1)',
                    border: `2px solid ${scanResult === 'granted' ? '#2ECC71' : '#E74C3C'}`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 12,
                  }}
                >
                  {scanResult === 'granted' ? (
                    <>
                      <CheckCircle size={56} color="#2ECC71" />
                      <div style={{ fontSize: 20, fontWeight: 800, color: '#2ECC71' }}>ACCESS GRANTED</div>
                      <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{scanName}</div>
                    </>
                  ) : scanResult === 'blacklisted' ? (
                    <>
                      <XCircle size={56} color="#E74C3C" />
                      <div style={{ fontSize: 18, fontWeight: 800, color: '#E74C3C' }}>BLACKLISTED</div>
                      <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{scanName}</div>
                      <div style={{ fontSize: 12, color: '#E74C3C', fontWeight: 600 }}>Alert sent to CSO</div>
                    </>
                  ) : (
                    <>
                      <XCircle size={56} color="#E74C3C" />
                      <div style={{ fontSize: 20, fontWeight: 800, color: '#E74C3C' }}>ACCESS DENIED</div>
                      <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>No valid pass found</div>
                    </>
                  )}
                </div>
              </div>
            )}

            {!scanResult ? (
              <form onSubmit={handleScan} style={{ display: 'flex', gap: 8, maxWidth: 340, margin: '0 auto' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                  <input
                    className="input-field"
                    style={{ paddingLeft: 30 }}
                    placeholder="Scan or enter pass ID..."
                    value={qrInput}
                    onChange={(e) => setQrInput(e.target.value)}
                    autoFocus
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ flexShrink: 0 }}>
                  <Shield size={14} /> Verify
                </button>
              </form>
            ) : (
              <div style={{ display: 'flex', gap: 10, maxWidth: 340, margin: '0 auto' }}>
                <button onClick={resetScan} className="btn-secondary" style={{ flex: 1 }}>
                  Scan Next Visitor
                </button>
                {(scanResult === 'denied' || scanResult === 'blacklisted') && (
                  <button onClick={() => setIncidentOpen(true)} className="btn-danger" style={{ flex: 1 }}>
                    <AlertTriangle size={13} /> Log Incident
                  </button>
                )}
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <button
              onClick={() => setIncidentOpen(true)}
              style={{
                background: 'rgba(231,76,60,0.08)',
                border: '1px solid rgba(231,76,60,0.25)',
                borderRadius: 12,
                padding: '18px 20px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
            >
              <AlertTriangle size={22} color="#E74C3C" style={{ marginBottom: 8 }} />
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 3 }}>Log Incident</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Report a security event</div>
            </button>
            <button
              style={{
                background: 'rgba(243,156,18,0.08)',
                border: '1px solid rgba(243,156,18,0.25)',
                borderRadius: 12,
                padding: '18px 20px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
            >
              <Clock size={22} color="#F39C12" style={{ marginBottom: 8 }} />
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 3 }}>Manual Entry</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Log walk-in without pass</div>
            </button>
          </div>
        </div>

        <div>
          <div style={{ background: 'var(--slate-700)', border: '1px solid var(--border-subtle)', borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>Expected Today</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>{expectedVisitors.length} invited visitors</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, backgroundColor: 'rgba(201,168,76,0.1)', borderRadius: 20, padding: '4px 10px' }}>
                <Users size={12} color="var(--gold)" />
                <span style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 700 }}>{expectedVisitors.length}</span>
              </div>
            </div>
            <div style={{ padding: '8px 0' }}>
              {expectedVisitors.map((v) => (
                <div key={v.id} style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: v.status === 'granted' ? 'rgba(46,204,113,0.12)' : 'rgba(52,152,219,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: v.status === 'granted' ? '#2ECC71' : '#3498DB' }}>{v.name.charAt(0)}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>→ {v.host} · {v.unit}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>
                      <Clock size={9} style={{ display: 'inline', marginRight: 3 }} />{v.time}
                    </div>
                  </div>
                  <Badge variant={v.status}>{v.status}</Badge>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 16, background: 'var(--slate-700)', border: '1px solid var(--border-subtle)', borderRadius: 14, padding: 18 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 12 }}>Current Shift</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { label: 'Shift Start', value: '06:00 AM' },
                { label: 'Shift End', value: '06:00 PM' },
                { label: 'Entries Today', value: '42' },
                { label: 'Denials', value: '1' },
              ].map((item) => (
                <div key={item.label} style={{ background: 'var(--slate-800)', borderRadius: 8, padding: '8px 12px' }}>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 3 }}>{item.label}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={incidentOpen} onClose={() => setIncidentOpen(false)} title="Quick Incident Report">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Incident Type</label>
            <select className="input-field">
              <option>Suspicious Person / Vehicle</option>
              <option>Unauthorized Entry Attempt</option>
              <option>Blacklisted Individual</option>
              <option>Gate Malfunction</option>
              <option>Noise / Disturbance</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Notes</label>
            <textarea className="input-field" rows={3} placeholder="Brief description of the incident..." style={{ resize: 'none' }} />
          </div>
          <button className="btn-danger" style={{ height: 42, justifyContent: 'center', fontWeight: 700 }}>
            <AlertTriangle size={14} /> Submit Report
          </button>
        </div>
      </Modal>
    </div>
  );
}

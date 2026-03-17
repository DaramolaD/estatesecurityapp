'use client';
import { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Plus, Search, AlertTriangle, Camera, Mic } from 'lucide-react';

type Severity = 'flagged' | 'pending' | 'active';

const incidents = [
  { id: 1, title: 'Suspicious Vehicle – South Gate', reporter: 'Guard Emeka O.', gate: 'South Gate', time: '08:34 AM', severity: 'flagged' as Severity, status: 'pending' as const, notes: 'Dark-colored Toyota Hilux parked outside gate for 30+ mins. Plate: LSD-345-XZ. No entry request made.', action: 'Monitoring' },
  { id: 2, title: 'Unauthorized Entry Attempt', reporter: 'Guard Bawa K.', gate: 'East Gate', time: '10:12 AM', severity: 'flagged' as Severity, status: 'active' as const, notes: 'Unknown male attempted to scale the perimeter fence near East Gate. Security alerted. Police notified.', action: 'Escalated to CSO' },
  { id: 3, title: 'Noise Complaint – Block B', reporter: 'Resident Ngozi A.', gate: 'N/A', time: '11:55 AM', severity: 'pending' as Severity, status: 'pending' as const, notes: 'Resident reported excessive noise from Unit B-05 party. Ongoing since 11 PM previous night.', action: 'None yet' },
  { id: 4, title: 'Delivery Dispute', reporter: 'Guard Aminu Y.', gate: 'Main Gate', time: '02:15 PM', severity: 'pending' as Severity, status: 'active' as const, notes: 'DHL delivery person refused to be photographed per estate policy. Dispute resolved after 10 mins.', action: 'Resolved' },
  { id: 5, title: 'Gate Malfunction – North Gate', reporter: 'System Auto-Alert', gate: 'North Gate', time: '03:40 PM', severity: 'active' as Severity, status: 'pending' as const, notes: 'North Gate barrier arm stuck open for 14 minutes. Maintenance notified. Currently manually staffed.', action: 'Maintenance dispatched' },
];

const statusColors = {
  pending: '#F39C12',
  active: '#E74C3C',
  resolved: '#2ECC71',
};

export default function IncidentsPage() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<(typeof incidents)[0] | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const filtered = incidents.filter(
    (i) =>
      i.title.toLowerCase().includes(search.toLowerCase()) ||
      i.reporter.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ flex: 1, overflow: 'auto' }}>
      <TopBar title="Incident Reports" subtitle={`${incidents.length} incidents logged today`} />
      <div style={{ padding: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
          {(['active', 'pending', 'total'] as const).map((key) => {
            const count = key === 'total' ? incidents.length : incidents.filter((i) => i.status === key).length;
            const color = key === 'active' ? '#E74C3C' : key === 'pending' ? '#F39C12' : 'var(--gold)';
            return (
              <div
                key={key}
                style={{
                  background: 'var(--slate-700)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 10,
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{key}</span>
                <span style={{ fontSize: 22, fontWeight: 800, color }}>{count}</span>
              </div>
            );
          })}
        </div>

        <Card
          title="Incident Log"
          actions={
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ position: 'relative' }}>
                <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                <input
                  className="input-field"
                  style={{ paddingLeft: 30, width: 200, height: 36 }}
                  placeholder="Search incidents..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button className="btn-primary" onClick={() => setAddOpen(true)} style={{ height: 36 }}>
                <Plus size={14} /> Log Incident
              </button>
            </div>
          }
          noPadding
        >
          <table className="data-table">
            <thead>
              <tr>
                <th>Incident</th>
                <th>Reporter</th>
                <th>Gate / Zone</th>
                <th>Time</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Action Taken</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inc) => (
                <tr key={inc.id} onClick={() => setSelected(inc)} style={{ cursor: 'pointer' }}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          background:
                            inc.severity === 'flagged' || inc.severity === 'active'
                              ? 'rgba(231,76,60,0.1)'
                              : 'rgba(243,156,18,0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <AlertTriangle size={14} color={inc.severity === 'flagged' || inc.severity === 'active' ? '#E74C3C' : '#F39C12'} />
                      </div>
                      <span style={{ fontWeight: 600, fontSize: 13 }}>{inc.title}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{inc.reporter}</td>
                  <td style={{ fontSize: 13 }}>{inc.gate}</td>
                  <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{inc.time}</td>
                  <td>
                    <Badge variant={inc.severity}>{inc.severity}</Badge>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 7, height: 7, borderRadius: '50%', background: statusColors[inc.status] ?? '#aaa' }} />
                      <span style={{ fontSize: 12, color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{inc.status}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{inc.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Incident Details">
        {selected && (
          <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <Badge variant={selected.severity}>{selected.severity}</Badge>
              <Badge variant={selected.status}>{selected.status}</Badge>
            </div>
            <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{selected.title}</h4>
            <div style={{ padding: 14, background: 'var(--slate-800)', borderRadius: 10, marginBottom: 16 }}>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{selected.notes}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
              <div style={{ background: 'var(--slate-800)', borderRadius: 8, padding: '10px 14px' }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Reporter</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{selected.reporter}</div>
              </div>
              <div style={{ background: 'var(--slate-800)', borderRadius: 8, padding: '10px 14px' }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Location</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{selected.gate}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn-success" style={{ flex: 1 }}>Mark Resolved</button>
              <button className="btn-danger" style={{ flex: 1 }}>Escalate to CSO</button>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={addOpen} onClose={() => setAddOpen(false)} title="Log New Incident">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Incident Title</label>
            <input className="input-field" placeholder="e.g. Suspicious vehicle at gate" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Location / Gate</label>
              <select className="input-field">
                <option>Main Gate</option>
                <option>North Gate</option>
                <option>East Gate</option>
                <option>South Gate</option>
                <option>Perimeter</option>
                <option>Block A/B/C</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Severity</label>
              <select className="input-field">
                <option>Pending</option>
                <option>Flagged</option>
                <option>Active</option>
              </select>
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Notes</label>
            <textarea className="input-field" rows={3} placeholder="Describe the incident in detail..." style={{ resize: 'none' }} />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn-ghost" style={{ flex: 1, height: 38, fontSize: 13 }}><Camera size={13} /> Attach Photo</button>
            <button className="btn-ghost" style={{ flex: 1, height: 38, fontSize: 13 }}><Mic size={13} /> Voice Note</button>
          </div>
          <button className="btn-primary" style={{ height: 42, justifyContent: 'center' }}>
            <AlertTriangle size={14} /> Submit Incident Report
          </button>
        </div>
      </Modal>
    </div>
  );
}

'use client';
import { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Search, Download, Clock, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

type VisitorStatus = 'granted' | 'denied' | 'pending' | 'expected';

const visitors = [
  { id: 1, name: 'Kelechi Nwosu', host: 'Adaeze Okafor (A-01)', gate: 'Main Gate', entry: '09:14 AM', exit: '10:22 AM', status: 'granted' as VisitorStatus, type: 'Guest', method: 'QR Code' },
  { id: 2, name: 'DHL Delivery', host: 'Babatunde Osei (B-07)', gate: 'Main Gate', entry: '10:05 AM', exit: '10:08 AM', status: 'granted' as VisitorStatus, type: 'Service', method: 'QR Code' },
  { id: 3, name: 'Emmanuel Oladele', host: 'Chisom Nwankwo (D-05)', gate: 'North Gate', entry: '11:30 AM', exit: '-', status: 'granted' as VisitorStatus, type: 'Guest', method: 'QR Code' },
  { id: 4, name: 'Unknown Person', host: 'Walk-in', gate: 'South Gate', entry: '12:00 PM', exit: '-', status: 'denied' as VisitorStatus, type: 'Unknown', method: 'Manual' },
  { id: 5, name: 'Aisha Kano', host: 'Fatimah Al-Hassan (C-12)', gate: 'East Gate', entry: '-', exit: '-', status: 'expected' as VisitorStatus, type: 'Guest', method: 'QR Code' },
  { id: 6, name: 'Plumber - MainFix Ltd', host: 'Olumide Adesanya (C-20)', gate: 'Main Gate', entry: '01:15 PM', exit: '04:00 PM', status: 'granted' as VisitorStatus, type: 'Service', method: 'Service Pass' },
  { id: 7, name: 'James Philips', host: 'Ngozi Adeyemi (B-03)', gate: 'North Gate', entry: '02:30 PM', exit: '-', status: 'pending' as VisitorStatus, type: 'Guest', method: 'QR Code' },
];

export default function VisitorsPage() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filtered = visitors.filter((v) => {
    const matchSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.host.toLowerCase().includes(search.toLowerCase()) ||
      v.gate.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || v.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const counts = {
    total: visitors.length,
    granted: visitors.filter((v) => v.status === 'granted').length,
    denied: visitors.filter((v) => v.status === 'denied').length,
    pending: visitors.filter((v) => v.status === 'pending').length,
  };

  return (
    <div style={{ flex: 1, overflow: 'auto' }}>
      <TopBar title="Visitor Logs" subtitle="Tuesday, 17 March 2026" />
      <div style={{ padding: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
          {[
            { label: 'Total Today', value: counts.total, color: 'var(--gold)' },
            { label: 'Granted', value: counts.granted, color: '#2ECC71' },
            { label: 'Denied', value: counts.denied, color: '#E74C3C' },
            { label: 'Pending', value: counts.pending, color: '#F39C12' },
          ].map((s) => (
            <div
              key={s.label}
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
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>{s.label}</span>
              <span style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</span>
            </div>
          ))}
        </div>

        <Card
          title="Access Log"
          actions={
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ position: 'relative' }}>
                <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                <input
                  className="input-field"
                  style={{ paddingLeft: 30, width: 200, height: 36 }}
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <select
                className="input-field"
                style={{ height: 36, width: 130 }}
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="granted">Granted</option>
                <option value="denied">Denied</option>
                <option value="pending">Pending</option>
                <option value="expected">Expected</option>
              </select>
              <button className="btn-ghost" style={{ height: 36 }}>
                <Download size={13} /> Export
              </button>
            </div>
          }
          noPadding
        >
          <table className="data-table">
            <thead>
              <tr>
                <th>Visitor</th>
                <th>Host / Unit</th>
                <th>Gate</th>
                <th>Entry</th>
                <th>Exit</th>
                <th>Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((v) => (
                <tr key={v.id}>
                  <td>
                    <div>
                      <div style={{ fontWeight: 600 }}>{v.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{v.type}</div>
                    </div>
                  </td>
                  <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{v.host}</td>
                  <td style={{ fontSize: 13 }}>{v.gate}</td>
                  <td>
                    {v.entry !== '-' ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13 }}>
                        <ArrowUpRight size={12} color="#2ECC71" />
                        {v.entry}
                      </div>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>—</span>
                    )}
                  </td>
                  <td>
                    {v.exit !== '-' ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13 }}>
                        <ArrowDownLeft size={12} color="#E74C3C" />
                        {v.exit}
                      </div>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>—</span>
                    )}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text-secondary)' }}>
                      <Clock size={11} />
                      {v.method}
                    </div>
                  </td>
                  <td>
                    <Badge variant={v.status}>{v.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}

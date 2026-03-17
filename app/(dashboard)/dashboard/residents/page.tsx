'use client';
import { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Plus, Search, Home, Phone, Mail, FileText, ChevronRight } from 'lucide-react';

const residents = [
  { id: 1, name: 'Adaeze Okafor', unit: 'A-01', type: 'Owner', status: 'active' as const, phone: '+234 801 234 5678', email: 'adaeze@mail.com', since: 'Jan 2024', balance: '₦0' },
  { id: 2, name: 'Chukwuemeka Eze', unit: 'A-14', type: 'Tenant', status: 'active' as const, phone: '+234 802 345 6789', email: 'emeka@mail.com', since: 'Mar 2024', balance: '₦25,000' },
  { id: 3, name: 'Ngozi Adeyemi', unit: 'B-03', type: 'Tenant', status: 'pending' as const, phone: '+234 803 456 7890', email: 'ngozi@mail.com', since: 'Feb 2025', balance: '₦0' },
  { id: 4, name: 'Babatunde Osei', unit: 'B-07', type: 'Owner', status: 'active' as const, phone: '+234 804 567 8901', email: 'tunde@mail.com', since: 'Nov 2023', balance: '₦0' },
  { id: 5, name: 'Fatimah Al-Hassan', unit: 'C-12', type: 'Tenant', status: 'active' as const, phone: '+234 805 678 9012', email: 'fatimah@mail.com', since: 'Jun 2024', balance: '₦50,000' },
  { id: 6, name: 'Olumide Adesanya', unit: 'C-20', type: 'Owner', status: 'active' as const, phone: '+234 806 789 0123', email: 'olumide@mail.com', since: 'Aug 2023', balance: '₦0' },
  { id: 7, name: 'Chisom Nwankwo', unit: 'D-05', type: 'Tenant', status: 'active' as const, phone: '+234 807 890 1234', email: 'chisom@mail.com', since: 'Apr 2024', balance: '₦0' },
];

export default function ResidentsPage() {
  const [search, setSearch] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [selected, setSelected] = useState<(typeof residents)[0] | null>(null);

  const filtered = residents.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.unit.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ flex: 1, overflow: 'auto' }}>
      <TopBar title="Residents" subtitle={`${residents.length} registered residents`} />
      <div style={{ padding: 24 }}>
        <Card
          title="Resident Registry"
          actions={
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ position: 'relative' }}>
                <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                <input
                  className="input-field"
                  style={{ paddingLeft: 30, width: 200, height: 36 }}
                  placeholder="Search residents..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button className="btn-primary" onClick={() => setAddOpen(true)} style={{ height: 36 }}>
                <Plus size={14} /> Add Resident
              </button>
            </div>
          }
          noPadding
        >
          <table className="data-table">
            <thead>
              <tr>
                <th>Resident</th>
                <th>Unit</th>
                <th>Type</th>
                <th>Status</th>
                <th>Since</th>
                <th>Balance</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} onClick={() => setSelected(r)} style={{ cursor: 'pointer' }}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 13,
                          fontWeight: 700,
                          color: '#000',
                          flexShrink: 0,
                        }}
                      >
                        {r.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{r.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{r.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 700, color: 'var(--gold)', fontFamily: 'monospace', fontSize: 13 }}>{r.unit}</span>
                  </td>
                  <td>
                    <Badge variant="gold">{r.type}</Badge>
                  </td>
                  <td>
                    <Badge variant={r.status}>{r.status}</Badge>
                  </td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{r.since}</td>
                  <td style={{ color: r.balance !== '₦0' ? 'var(--danger)' : 'var(--success)', fontWeight: 600, fontSize: 13 }}>{r.balance}</td>
                  <td>
                    <ChevronRight size={14} color="var(--text-muted)" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Resident Details">
        {selected && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, padding: 16, background: 'var(--slate-800)', borderRadius: 10 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  fontWeight: 800,
                  color: '#000',
                }}
              >
                {selected.name.charAt(0)}
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{selected.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Resident since {selected.since}</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { icon: <Home size={14} />, label: 'Unit', value: selected.unit },
                { icon: <FileText size={14} />, label: 'Type', value: selected.type },
                { icon: <Phone size={14} />, label: 'Phone', value: selected.phone },
                { icon: <Mail size={14} />, label: 'Email', value: selected.email },
              ].map((item) => (
                <div key={item.label} style={{ background: 'var(--slate-800)', borderRadius: 8, padding: '10px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', marginBottom: 4, fontSize: 11 }}>
                    {item.icon} {item.label}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{item.value}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button className="btn-secondary" style={{ flex: 1 }}>Edit Resident</button>
              <button className="btn-danger" style={{ flex: 1 }}>Deactivate</button>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={addOpen} onClose={() => setAddOpen(false)} title="Add New Resident">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { label: 'Full Name', placeholder: 'e.g. Adaeze Okafor', type: 'text' },
            { label: 'Email Address', placeholder: 'resident@mail.com', type: 'email' },
            { label: 'Phone Number', placeholder: '+234 800 000 0000', type: 'tel' },
          ].map((field) => (
            <div key={field.label}>
              <label
                style={{
                  display: 'block',
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  marginBottom: 6,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                {field.label}
              </label>
              <input className="input-field" type={field.type} placeholder={field.placeholder} />
            </div>
          ))}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--text-secondary)',
                marginBottom: 6,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Unit Assignment
            </label>
            <select className="input-field">
              <option>Select unit...</option>
              {['A-01', 'A-02', 'A-15', 'B-01', 'B-02', 'C-01', 'D-01'].map((u) => (
                <option key={u}>{u}</option>
              ))}
            </select>
          </div>
          <div>
            <label
              style={{
                display: 'block',
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--text-secondary)',
                marginBottom: 6,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Resident Type
            </label>
            <select className="input-field">
              <option>Tenant</option>
              <option>Owner</option>
            </select>
          </div>
          <button className="btn-primary" style={{ height: 42, justifyContent: 'center', marginTop: 4 }}>
            <Plus size={14} /> Create Resident Account
          </button>
        </div>
      </Modal>
    </div>
  );
}

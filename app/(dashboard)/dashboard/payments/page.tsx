'use client';
import { TopBar } from '@/components/layout/TopBar';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { StatCard } from '@/components/ui/StatCard';
import { DollarSign, TrendingUp, Download } from 'lucide-react';

type PayStatus = 'active' | 'pending' | 'denied';

const payments = [
  { id: 1, resident: 'Adaeze Okafor', unit: 'A-01', type: 'Service Charge', amount: '₦15,000', due: 'Mar 31, 2026', paid: 'Mar 10, 2026', status: 'active' as PayStatus },
  { id: 2, resident: 'Chukwuemeka Eze', unit: 'A-14', type: 'Rent', amount: '₦250,000', due: 'Mar 15, 2026', paid: '-', status: 'pending' as PayStatus },
  { id: 3, resident: 'Ngozi Adeyemi', unit: 'B-03', type: 'Service Charge', amount: '₦15,000', due: 'Mar 31, 2026', paid: 'Mar 05, 2026', status: 'active' as PayStatus },
  { id: 4, resident: 'Babatunde Osei', unit: 'B-07', type: 'Annual Levy', amount: '₦120,000', due: 'Mar 31, 2026', paid: 'Feb 28, 2026', status: 'active' as PayStatus },
  { id: 5, resident: 'Fatimah Al-Hassan', unit: 'C-12', type: 'Rent', amount: '₦180,000', due: 'Mar 15, 2026', paid: '-', status: 'denied' as PayStatus },
  { id: 6, resident: 'Olumide Adesanya', unit: 'C-20', type: 'Service Charge', amount: '₦15,000', due: 'Mar 31, 2026', paid: 'Mar 12, 2026', status: 'active' as PayStatus },
  { id: 7, resident: 'Chisom Nwankwo', unit: 'D-05', type: 'Rent', amount: '₦200,000', due: 'Mar 20, 2026', paid: '-', status: 'pending' as PayStatus },
];

export default function PaymentsPage() {
  const totalCollected = '₦4,800,000';
  const totalPending = '₦630,000';
  const overdueCount = payments.filter((p) => p.status === 'denied').length;

  return (
    <div style={{ flex: 1, overflow: 'auto' }}>
      <TopBar title="Payments & Billing" subtitle="March 2026" />
      <div style={{ padding: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 24 }}>
          <StatCard label="Collected MTD" value={totalCollected} icon={<DollarSign size={18} />} trend="up" trendValue="+8.4%" />
          <StatCard label="Pending" value={totalPending} icon={<TrendingUp size={18} />} iconColor="#F39C12" trend="neutral" trendValue="3 invoices" />
          <StatCard label="Overdue Accounts" value={overdueCount} icon={<DollarSign size={18} />} iconColor="#E74C3C" trend="down" trendValue="-1 vs last month" />
        </div>

        <Card
          title="Payment Records"
          actions={
            <button className="btn-ghost" style={{ height: 36 }}>
              <Download size={13} /> Export CSV
            </button>
          }
          noPadding
        >
          <table className="data-table">
            <thead>
              <tr>
                <th>Resident</th>
                <th>Unit</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Date Paid</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>
                  <td style={{ fontWeight: 600 }}>{p.resident}</td>
                  <td>
                    <span style={{ color: 'var(--gold)', fontWeight: 700, fontFamily: 'monospace', fontSize: 13 }}>{p.unit}</span>
                  </td>
                  <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{p.type}</td>
                  <td style={{ fontWeight: 700, fontSize: 14 }}>{p.amount}</td>
                  <td style={{ fontSize: 13, color: p.status === 'denied' ? 'var(--danger)' : 'var(--text-secondary)' }}>{p.due}</td>
                  <td style={{ fontSize: 13, color: p.paid !== '-' ? '#2ECC71' : 'var(--text-muted)' }}>{p.paid !== '-' ? p.paid : '—'}</td>
                  <td>
                    <Badge variant={p.status === 'active' ? 'approved' : p.status}>{p.status === 'active' ? 'Paid' : p.status}</Badge>
                  </td>
                  <td>
                    {p.status !== 'active' && (
                      <button className="btn-primary" style={{ padding: '4px 12px', fontSize: 12, height: 28 }}>
                        Send Reminder
                      </button>
                    )}
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

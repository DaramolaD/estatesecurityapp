'use client';
import { TopBar } from '@/components/layout/TopBar';
import { StatCard } from '@/components/ui/StatCard';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Users,
  UserCheck,
  AlertTriangle,
  DollarSign,
  ShieldCheck,
  AlertTriangle as AlertIcon,
  Activity,
  ArrowRight,
  Clock,
  TrendingUp,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const visitorData = [
  { time: '6AM', visitors: 4 },
  { time: '8AM', visitors: 18 },
  { time: '10AM', visitors: 32 },
  { time: '12PM', visitors: 27 },
  { time: '2PM', visitors: 41 },
  { time: '4PM', visitors: 55 },
  { time: '6PM', visitors: 38 },
  { time: '8PM', visitors: 22 },
  { time: '10PM', visitors: 9 },
];

const recentActivity = [
  { id: 1, type: 'entry', name: 'Marcus Johnson', unit: 'A-14', gate: 'North Gate', time: '2 min ago', status: 'granted' as const },
  { id: 2, type: 'incident', name: 'Suspicious vehicle', unit: 'Perimeter', gate: 'South Gate', time: '14 min ago', status: 'flagged' as const },
  { id: 3, type: 'entry', name: 'Delivery - DHL', unit: 'B-07', gate: 'Main Gate', time: '22 min ago', status: 'granted' as const },
  { id: 4, type: 'denied', name: 'Unknown Visitor', unit: 'C-03', gate: 'East Gate', time: '35 min ago', status: 'denied' as const },
  { id: 5, type: 'entry', name: 'Sandra Okonkwo', unit: 'A-22', gate: 'North Gate', time: '51 min ago', status: 'granted' as const },
];

const gates = [
  { name: 'Main Gate', traffic: 88, guards: 3, status: 'operational' },
  { name: 'North Gate', traffic: 62, guards: 2, status: 'operational' },
  { name: 'East Gate', traffic: 34, guards: 1, status: 'operational' },
  { name: 'South Gate', traffic: 19, guards: 1, status: 'alert' },
];

export default function DashboardPage() {
  return (
    <div style={{ flex: 1, overflow: 'auto' }}>
      <TopBar
        title="Command Center"
        subtitle="Tuesday, 17 March 2026 · Lekki Phase 1 Estates"
      />

      <div style={{ padding: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
          <StatCard
            label="Total Residents"
            value="240"
            icon={<Users size={18} />}
            trend="up"
            trendValue="+3 this week"
          />
          <StatCard
            label="Visitors Today"
            value="58"
            icon={<UserCheck size={18} />}
            iconColor="#3498DB"
            trend="up"
            trendValue="+12%"
          />
          <StatCard
            label="Open Incidents"
            value="4"
            icon={<AlertTriangle size={18} />}
            iconColor="#E74C3C"
            trend="down"
            trendValue="-2 vs yesterday"
          />
          <StatCard
            label="Revenue MTD"
            value="₦4.8M"
            icon={<DollarSign size={18} />}
            iconColor="#2ECC71"
            trend="up"
            trendValue="+8.4%"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 16, marginBottom: 24 }}>
          <Card
            title="Visitor Traffic Today"
            subtitle="Hourly gate entries across all access points"
            actions={
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--gold)' }}>
                <TrendingUp size={13} />
                All Gates
              </div>
            }
          >
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={visitorData}>
                <defs>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#C9A84C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: 'var(--slate-700)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: 'var(--text-secondary)' }}
                  itemStyle={{ color: 'var(--gold)' }}
                />
                <Area type="monotone" dataKey="visitors" stroke="#C9A84C" strokeWidth={2} fill="url(#goldGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card
            title="Live Activity Feed"
            subtitle="Real-time estate events"
            actions={
              <button className="btn-ghost" style={{ padding: '4px 10px', fontSize: 11 }}>
                View All <ArrowRight size={11} />
              </button>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {recentActivity.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '10px 0',
                    borderBottom: '1px solid var(--border-subtle)',
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background:
                        item.status === 'granted'
                          ? 'rgba(46,204,113,0.1)'
                          : item.status === 'flagged'
                            ? 'rgba(243,156,18,0.1)'
                            : 'rgba(231,76,60,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {item.status === 'granted' ? (
                      <ShieldCheck size={16} color="#2ECC71" />
                    ) : item.status === 'flagged' ? (
                      <AlertIcon size={16} color="#F39C12" />
                    ) : (
                      <Activity size={16} color="#E74C3C" />
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                      {item.gate} · Unit {item.unit}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <Badge variant={item.status}>{item.status}</Badge>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 3 }}>{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card title="Gate Status Overview" subtitle="Live operational status across all access points">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {gates.map((gate) => (
              <div
                key={gate.name}
                style={{
                  background: 'var(--slate-800)',
                  border: `1px solid ${gate.status === 'alert' ? 'rgba(231,76,60,0.3)' : 'var(--border-subtle)'}`,
                  borderRadius: 10,
                  padding: 16,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{gate.name}</span>
                  <Badge variant={gate.status === 'operational' ? 'active' : 'flagged'}>{gate.status}</Badge>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Traffic</span>
                    <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 600 }}>{gate.traffic}%</span>
                  </div>
                  <div style={{ height: 4, background: 'var(--slate-500)', borderRadius: 2, overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${gate.traffic}%`,
                        background: gate.traffic > 75 ? '#E74C3C' : gate.traffic > 50 ? '#F39C12' : '#C9A84C',
                        borderRadius: 2,
                        transition: 'width 1s ease',
                      }}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)' }}>
                  <Clock size={12} />
                  {gate.guards} guard{gate.guards !== 1 ? 's' : ''} on duty
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

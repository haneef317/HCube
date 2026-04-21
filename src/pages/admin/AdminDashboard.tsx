import { useOutletContext } from 'react-router-dom';
import { Section } from '@/components/shared/Section';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, Users, Eye, ArrowUpRight, Clock, Cpu } from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useOutletContext<{ user: any }>();

  const stats = [
    { name: 'Total Posts', value: '12', icon: <FileText size={24} />, change: '+2 this month' },
    { name: 'Team Members', value: '3', icon: <Users size={24} />, change: 'Full strength' },
    { name: 'Site Views', value: '1,284', icon: <Eye size={24} />, change: '+18% vs last week' },
  ];

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-4xl font-display font-bold mb-2">Welcome back,</h1>
        <p className="text-zinc-400 font-medium">{user?.email}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {stats.map((stat, i) => (
          <Card key={i} className="bg-white/5 border-white/10 rounded-3xl overflow-hidden hover:border-[var(--color-brand-primary)]/30 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 text-white">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-zinc-500">{stat.name}</CardTitle>
              <div className="text-[var(--color-brand-primary)] opacity-50">{stat.icon}</div>
            </CardHeader>
            <CardContent className="text-white">
              <div className="text-3xl font-bold font-display mb-1">{stat.value}</div>
              <p className="text-xs text-[var(--color-brand-primary)] flex items-center gap-1 font-bold">
                <ArrowUpRight size={12} /> {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-white/5 border-white/10 rounded-3xl text-white">
           <CardHeader>
             <CardTitle className="flex items-center gap-2 font-display italic">
                <Clock size={20} className="text-[var(--color-brand-primary)]" /> Recent Activity
             </CardTitle>
             <CardDescription className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">LATEST UPDATES TO THE SYSTEM</CardDescription>
           </CardHeader>
           <CardContent>
             <div className="space-y-6">
                {[
                    { action: 'Updated About Us page', time: '2 hours ago' },
                    { action: 'Published new blog post: AI Agents...', time: '5 hours ago' },
                    { action: 'Changed Sarah Jenkins bio', time: '1 day ago' },
                    { action: 'Uploaded new hero image for Home', time: '2 days ago' },
                ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-4 border-b border-white/5 last:border-0">
                        <span className="text-sm text-zinc-300 font-medium">{item.action}</span>
                        <span className="text-xs text-zinc-600 font-bold uppercase tracking-widest">{item.time}</span>
                    </div>
                ))}
             </div>
           </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 rounded-3xl text-white p-8 flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-[var(--color-brand-primary)]/10 flex items-center justify-center">
                <Cpu size={40} className="text-[var(--color-brand-primary)]" />
            </div>
            <h3 className="text-2xl font-display font-bold italic">Ready for growth?</h3>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
                Your agency is currently operating with 3 autonomous agents. Deployment of the 4th agent is pending market data sync.
            </p>
            <button className="text-[var(--color-brand-primary)] font-bold uppercase tracking-widest text-xs hover:underline">
                View Infrastructure Audit →
            </button>
        </Card>
      </div>
    </div>
  );
}

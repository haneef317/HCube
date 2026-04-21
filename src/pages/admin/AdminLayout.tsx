import { useEffect, useState } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { LayoutDashboard, FileText, Users, Briefcase, LogOut, ExternalLink, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function AdminLayout() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
      } else {
        navigate('/admin/login');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Signed out successfully");
      navigate('/admin/login');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-black text-white">Initialising Admin Terminal...</div>;
  }

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
    { name: 'Page Content', icon: <FileText size={20} />, path: '/admin/pages' },
    { name: 'Blog Posts', icon: <FileText size={20} />, path: '/admin/blog' },
    { name: 'Team Members', icon: <Users size={20} />, path: '/admin/team' },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/10 flex flex-col pt-32 pb-10 bg-black">
        <div className="px-8 mb-12">
            <div className="flex items-center gap-2 mb-2">
                <Cpu size={24} className="text-[var(--color-brand-primary)]" />
                <span className="font-display font-bold tracking-tight">AI PREMIER</span>
            </div>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Admin Control Center</p>
        </div>

        <nav className="flex-grow px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                location.pathname === item.path 
                  ? "bg-[var(--color-brand-primary)] text-black" 
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <span className={cn(
                "transition-colors",
                location.pathname === item.path ? "text-black" : "text-zinc-500 group-hover:text-[var(--color-brand-primary)]"
              )}>
                {item.icon}
              </span>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="px-4 mt-auto space-y-2">
           <Button variant="ghost" asChild className="w-full justify-start text-zinc-400 border border-white/5 h-12 rounded-xl mb-2">
              <Link to="/" target="_blank"><ExternalLink size={18} className="mr-3" /> View Website</Link>
           </Button>
           <Button 
             variant="ghost" 
             onClick={handleLogout}
             className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-950/20 h-12 rounded-xl"
           >
             <LogOut size={18} className="mr-3" /> Logout Terminal
           </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow pt-32 px-12 pb-20 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
            <Outlet context={{ user }} />
        </div>
      </main>
    </div>
  );
}

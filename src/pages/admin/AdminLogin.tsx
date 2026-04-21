import { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';
import { Section } from '@/components/shared/Section';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Cpu, Lock } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful");
      navigate('/admin');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Login successful");
      navigate('/admin');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Section className="min-h-screen flex items-center justify-center pt-0">
      <div className="w-full max-w-md glass-card p-10 rounded-[40px] shadow-2xl relative overflow-hidden">
        {/* Visual flair */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-[var(--color-brand-primary)] opacity-10 blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[var(--color-brand-secondary)] opacity-10 blur-3xl" />

        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
            <Cpu className="text-[var(--color-brand-primary)]" size={32} />
          </div>
          <h1 className="text-3xl font-display font-bold mb-2 tracking-tight italic">Terminal Access</h1>
          <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest px-8">Premium AI Agency Management</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 mb-8">
          <div className="space-y-2">
            <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Secure Email</Label>
            <Input 
              type="email" 
              className="h-14 bg-white/5 border-white/10 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@aipremier.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Passkey</Label>
            <Input 
              type="password" 
              className="h-14 bg-white/5 border-white/10 rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <Button 
            disabled={loading}
            className="w-full h-14 bg-white text-black font-bold rounded-xl hover:bg-zinc-200"
          >
            {loading ? "Authenticating..." : "Authorize Access"}
          </Button>
        </form>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-black/40 backdrop-blur-md px-4 text-zinc-500 font-bold tracking-widest">Or Secure Link</span></div>
        </div>

        <Button 
          variant="outline" 
          onClick={loginWithGoogle}
          className="w-full h-14 border-white/10 rounded-xl hover:bg-white/5"
        >
          Sign in with Google
        </Button>

        <p className="text-center mt-8 text-[10px] text-zinc-600 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
          <Lock size={12} /> Encrypted Session
        </p>
      </div>
    </Section>
  );
}

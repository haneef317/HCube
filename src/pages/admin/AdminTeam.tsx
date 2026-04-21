import { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Edit2, Users, MoveVertical } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminTeam() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);

  // Form State
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [bio, setBio] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    setLoading(true);
    try {
      const q = query(collection(db, 'teamMembers'), orderBy('order', 'asc'));
      const snapshot = await getDocs(q);
      setMembers(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const resetForm = () => {
    setName('');
    setRole('');
    setBio('');
    setImageUrl('');
    setEditingMember(null);
  };

  const handleEdit = (member: any) => {
    setEditingMember(member);
    setName(member.name);
    setRole(member.role);
    setBio(member.bio);
    setImageUrl(member.imageUrl);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const memberData = {
        name,
        role,
        bio,
        imageUrl,
        order: editingMember?.order || members.length
      };

      if (editingMember) {
        await updateDoc(doc(db, 'teamMembers', editingMember.id), memberData);
        toast.success("Agent profile updated");
      } else {
        await addDoc(collection(db, 'teamMembers'), memberData);
        toast.success("New agent deployed");
      }
      
      setIsDialogOpen(false);
      resetForm();
      fetchMembers();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this profile?")) return;
    try {
      await deleteDoc(doc(db, 'teamMembers', id));
      toast.success("Profile deactivated");
      fetchMembers();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-display font-bold mb-2">Personnel Directorate</h1>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">OPERATIONAL AGENTS & KEY STRATEGISTS</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="bg-[var(--color-brand-primary)] text-black font-bold h-12 rounded-xl px-6 hover:bg-[var(--color-brand-primary)]/80">
              <Plus size={20} className="mr-2" /> Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md bg-zinc-950 border-white/10 text-white">
            <DialogHeader>
              <DialogTitle className="text-2xl font-display italic">Agent Registration</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest px-2">Identity (Full Name)</Label>
                <Input value={name} onChange={e => setName(e.target.value)} required className="bg-white/5 border-white/10 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest px-2">Operational Role</Label>
                <Input value={role} onChange={e => setRole(e.target.value)} required className="bg-white/5 border-white/10 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest px-2">Visual ID (Image URL)</Label>
                <Input value={imageUrl} onChange={e => setImageUrl(e.target.value)} required className="bg-white/5 border-white/10 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest px-2">Professional Brief (Bio)</Label>
                <Textarea value={bio} onChange={e => setBio(e.target.value)} required className="bg-white/5 border-white/10 rounded-xl" />
              </div>
              <Button type="submit" className="w-full h-14 bg-white text-black font-bold rounded-xl hover:bg-zinc-200">
                {editingMember ? 'Authorize Update' : 'Register Agent'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
             <div className="text-zinc-500 animate-pulse font-bold tracking-widest text-sm uppercase">Loading personnel database...</div>
        ) : (
          members.map((member) => (
            <Card key={member.id} className="bg-white/5 border-white/10 rounded-3xl overflow-hidden text-white group hover:border-[var(--color-brand-primary)]/30 transition-all">
               <div className="aspect-[4/3] w-full overflow-hidden">
                  <img src={member.imageUrl} className="w-full h-full object-cover grayscale transition-all group-hover:grayscale-0 group-hover:scale-105 duration-700" />
               </div>
               <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-2xl font-display font-bold italic">{member.name}</CardTitle>
                        <CardDescription className="text-[var(--color-brand-primary)] text-[10px] font-bold uppercase tracking-widest mt-1">{member.role}</CardDescription>
                    </div>
                    <div className="flex gap-1">
                       <Button variant="ghost" size="icon" onClick={() => handleEdit(member)} className="w-8 h-8 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white">
                          <Edit2 size={14} />
                       </Button>
                       <Button variant="ghost" size="icon" onClick={() => handleDelete(member.id)} className="w-8 h-8 rounded-lg hover:bg-red-900/20 text-red-400">
                          <Trash2 size={14} />
                       </Button>
                    </div>
                  </div>
               </CardHeader>
               <CardContent>
                  <p className="text-zinc-500 text-xs line-clamp-3 leading-relaxed">{member.bio}</p>
               </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

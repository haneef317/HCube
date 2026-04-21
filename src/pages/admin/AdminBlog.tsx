import { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Edit2, ExternalLink, Calendar, Search } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

export default function AdminBlog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  
  // Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    try {
      const q = query(collection(db, 'blogPosts'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      setPosts(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const resetForm = () => {
    setTitle('');
    setContent('');
    setExcerpt('');
    setImageUrl('');
    setCategory('');
    setAuthor('');
    setEditingPost(null);
  };

  const handleEdit = (post: any) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
    setExcerpt(post.excerpt);
    setImageUrl(post.imageUrl);
    setCategory(post.category);
    setAuthor(post.author);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const postData = {
        title,
        content,
        excerpt,
        imageUrl,
        category,
        author,
        slug: title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
        updatedAt: serverTimestamp(),
        published: true
      };

      if (editingPost) {
        await updateDoc(doc(db, 'blogPosts', editingPost.id), postData);
        toast.success("Article updated successfully");
      } else {
        await addDoc(collection(db, 'blogPosts'), {
          ...postData,
          createdAt: serverTimestamp()
        });
        toast.success("Article published successfully");
      }
      
      setIsDialogOpen(false);
      resetForm();
      fetchPosts();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    try {
      await deleteDoc(doc(db, 'blogPosts', id));
      toast.success("Article removed");
      fetchPosts();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-display font-bold mb-2">Research Lab Management</h1>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">INTELLECTUAL ASSETS & AI INSIGHTS</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="bg-[var(--color-brand-primary)] text-black font-bold h-12 rounded-xl px-6 hover:bg-[var(--color-brand-primary)]/80">
              <Plus size={20} className="mr-2" /> New Article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-zinc-950 border-white/10 text-white max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-display italic">{editingPost ? 'Refine Intelligence' : 'Deploy New Insights'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest px-2">Article Title</Label>
                  <Input value={title} onChange={e => setTitle(e.target.value)} required className="bg-white/5 border-white/10 rounded-xl" placeholder="The Future of..." />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest px-2">Visual Mapping (URL)</Label>
                  <Input value={imageUrl} onChange={e => setImageUrl(e.target.value)} required className="bg-white/5 border-white/10 rounded-xl" placeholder="https://..." />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest px-2">Category Segment</Label>
                  <Input value={category} onChange={e => setCategory(e.target.value)} required className="bg-white/5 border-white/10 rounded-xl" placeholder="AI Research" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest px-2">Primary Author</Label>
                  <Input value={author} onChange={e => setAuthor(e.target.value)} required className="bg-white/5 border-white/10 rounded-xl" placeholder="Dr. Alexander Thorne" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest px-2">Strategic Abstract (Excerpt)</Label>
                <Textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} required className="bg-white/5 border-white/10 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest px-2">Full Intel (Markdown Content)</Label>
                <Textarea value={content} onChange={e => setContent(e.target.value)} required className="bg-white/5 border-white/10 rounded-xl min-h-[300px]" />
              </div>
              <Button type="submit" className="w-full h-14 bg-white text-black font-bold rounded-xl hover:bg-zinc-200">
                {editingPost ? 'Push Updates' : 'Authorize Deployment'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
             <div className="text-zinc-500 animate-pulse font-bold tracking-widest text-sm uppercase">Synchronising intelligence network...</div>
        ) : posts.length === 0 ? (
            <div className="glass-card p-20 text-center rounded-[40px]">
                <p className="text-zinc-500 font-bold uppercase tracking-widest mb-4">No data stored in the research lab yet.</p>
                <Button variant="link" className="text-[var(--color-brand-primary)]">Start your first AI post</Button>
            </div>
        ) : (
          posts.map((post) => (
            <Card key={post.id} className="bg-white/5 border-white/10 rounded-3xl overflow-hidden text-white group hover:border-white/20 transition-all">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-48 h-48 md:h-auto overflow-hidden">
                  <img src={post.imageUrl} className="w-full h-full object-cover grayscale transition-all group-hover:grayscale-0" />
                </div>
                <CardHeader className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-[var(--color-brand-primary)] text-[10px] font-bold uppercase tracking-widest">{post.category}</span>
                        <div className="flex items-center gap-1 text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                            <Calendar size={12} /> {post.createdAt ? format(post.createdAt.toDate(), 'MMM dd, yyyy') : 'Pending'}
                        </div>
                      </div>
                      <CardTitle className="text-xl font-display font-bold italic mb-2">{post.title}</CardTitle>
                      <p className="text-zinc-500 text-sm line-clamp-2 max-w-2xl">{post.excerpt}</p>
                    </div>
                    <div className="flex gap-2">
                       <Button variant="ghost" size="icon" onClick={() => handleEdit(post)} className="rounded-xl hover:bg-white/10 text-zinc-400 hover:text-white">
                          <Edit2 size={18} />
                       </Button>
                       <Button variant="ghost" size="icon" onClick={() => handleDelete(post.id)} className="rounded-xl hover:bg-red-900/20 text-red-400/60 hover:text-red-400">
                          <Trash2 size={18} />
                       </Button>
                       <Button variant="ghost" size="icon" asChild className="rounded-xl hover:bg-white/10 text-zinc-400">
                          <a href={`/blog/${post.id}`} target="_blank"><ExternalLink size={18} /></a>
                       </Button>
                    </div>
                  </div>
                </CardHeader>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

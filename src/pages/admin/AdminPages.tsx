import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, serverTimestamp, collection, getDocs, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, Globe, Image as ImageIcon, Link as LinkIcon, Type, Smartphone } from 'lucide-react';
import { toast } from 'sonner';

const AVAILABLE_PAGES = [
  { id: 'home', name: 'Home' },
  { id: 'about', name: 'About' },
  { id: 'services', name: 'Services' },
  { id: 'portfolio', name: 'Portfolio' }
];

export default function AdminPages() {
  const [activePage, setActivePage] = useState('home');
  const [loading, setLoading] = useState(true);
  const [pageContent, setPageContent] = useState<any>(null);
  const [settings, setSettings] = useState<any>({
    agencyName: 'HCubeTech',
    logoUrl: '',
    faviconUrl: ''
  });

  useEffect(() => {
    fetchData();
  }, [activePage]);

  async function fetchData() {
    setLoading(true);
    try {
      // Fetch Page Content
      const pageSnap = await getDoc(doc(db, 'pages', activePage));
      if (pageSnap.exists()) {
        setPageContent(pageSnap.data());
      } else {
        // Default structure
        setPageContent({
          heroTitle: '',
          heroSubtitle: '',
          heroImage: '',
          primaryButtonText: '',
          primaryButtonLink: '',
          secondaryButtonText: '',
          secondaryButtonLink: '',
          sections: {}
        });
      }

      // Fetch Global Settings
      const settingsSnap = await getDoc(doc(db, 'settings', 'config'));
      if (settingsSnap.exists()) {
        setSettings(settingsSnap.data());
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleUpdatePage = async () => {
    try {
      await setDoc(doc(db, 'pages', activePage), {
        ...pageContent,
        updatedAt: serverTimestamp()
      });
      toast.success(`${activePage.toUpperCase()} parameters synchronized`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSettingsUpdate = async () => {
    try {
      await setDoc(doc(db, 'settings', 'config'), settings);
      toast.success('Core branding synchronized');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (loading && !pageContent) return <div className="text-zinc-500 font-bold tracking-widest uppercase text-sm">Accessing system databanks...</div>;

  return (
    <div className="space-y-12 pb-20">
      <div>
        <h1 className="text-4xl font-display font-bold mb-2">Content Governance</h1>
        <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">DIRECT OVERRIDE FOR ALL SITE PARAMETERS</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Navigation */}
        <div className="lg:col-span-1 space-y-2">
            <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-4 mb-2 block">System Pages</Label>
            {AVAILABLE_PAGES.map(page => (
                <button
                    key={page.id}
                    onClick={() => setActivePage(page.id)}
                    className={`w-full text-left px-6 py-4 rounded-2xl transition-all font-display font-bold italic ${activePage === page.id ? 'bg-white text-black scale-[1.02] shadow-xl' : 'text-zinc-400 hover:bg-white/5'}`}
                >
                    {page.name}
                </button>
            ))}
            <div className="pt-8">
                <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-4 mb-2 block">Global Logic</Label>
                <button
                    onClick={() => setActivePage('settings')}
                    className={`w-full text-left px-6 py-4 rounded-2xl transition-all font-display font-bold italic ${activePage === 'settings' ? 'bg-[var(--color-brand-primary)] text-black' : 'text-zinc-400 hover:bg-white/5'}`}
                >
                    Site Identity
                </button>
            </div>
        </div>

        {/* Editor */}
        <div className="lg:col-span-3">
          {activePage === 'settings' ? (
                <Card className="bg-white/5 border-white/10 rounded-[40px] text-white">
                  <CardHeader>
                    <CardTitle className="text-2xl font-display italic">Global Architecture</CardTitle>
                    <CardDescription className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest">CORE BRANDING & ASSET MAPPING</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2">Agency Name</Label>
                                <Input value={settings.agencyName} onChange={e => setSettings({...settings, agencyName: e.target.value})} className="bg-white/5 border-white/10 h-14 rounded-xl" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2">Accent Hex Code</Label>
                                <Input value={settings.accentColor || '#00C3FF'} onChange={e => setSettings({...settings, accentColor: e.target.value})} className="bg-white/5 border-white/10 h-14 rounded-xl" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2">Logo SVG/PNG URL</Label>
                            <Input value={settings.logoUrl} onChange={e => setSettings({...settings, logoUrl: e.target.value})} className="bg-white/5 border-white/10 h-14 rounded-xl" placeholder="https://..." />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2">Favicon URL</Label>
                            <Input value={settings.faviconUrl} onChange={e => setSettings({...settings, faviconUrl: e.target.value})} className="bg-white/5 border-white/10 h-14 rounded-xl" placeholder="https://..." />
                        </div>
                    </div>
                    <Button onClick={handleSettingsUpdate} className="bg-[var(--color-brand-primary)] text-black font-bold h-14 w-full rounded-xl hover:opacity-90">
                        Synchronize Identity
                    </Button>
                  </CardContent>
                </Card>
          ) : (
            <div className="space-y-8">
                {/* Hero Section */}
                <Card className="bg-white/5 border-white/10 rounded-[40px] text-white">
                  <CardHeader>
                    <CardTitle className="text-2xl font-display italic">Hero Section: {activePage}</CardTitle>
                    <CardDescription className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest">PRIMARY VISUALS & COPY</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2">Hero Headline</Label>
                      <Input 
                        value={pageContent?.heroTitle || ''} 
                        onChange={e => setPageContent({...pageContent, heroTitle: e.target.value})}
                        className="h-16 bg-white/5 border-white/10 rounded-2xl text-xl font-display font-bold"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2">Hero Abstract (Subtitle)</Label>
                      <Textarea 
                        value={pageContent?.heroSubtitle || ''} 
                        onChange={e => setPageContent({...pageContent, heroSubtitle: e.target.value})}
                        className="bg-white/5 border-white/10 rounded-2xl min-h-[100px]"
                      />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2">Hero Visual (Image URL)</Label>
                        <Input value={pageContent?.heroImage || ''} onChange={e => setPageContent({...pageContent, heroImage: e.target.value})} className="bg-white/5 border-white/10 h-14 rounded-xl" placeholder="https://..." />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-white/5">
                        <div className="space-y-4">
                            <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">Primary Action Button</Label>
                            <div className="space-y-2">
                                <Label className="text-[10px] text-zinc-600 ml-2">Label</Label>
                                <Input value={pageContent?.primaryButtonText || ''} onChange={e => setPageContent({...pageContent, primaryButtonText: e.target.value})} className="bg-white/5 border-white/10 h-12 rounded-xl" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] text-zinc-600 ml-2">Redirect URL (Link)</Label>
                                <Input value={pageContent?.primaryButtonLink || ''} onChange={e => setPageContent({...pageContent, primaryButtonLink: e.target.value})} className="bg-white/5 border-white/10 h-12 rounded-xl" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">Secondary Action Link</Label>
                            <div className="space-y-2">
                                <Label className="text-[10px] text-zinc-600 ml-2">Label</Label>
                                <Input value={pageContent?.secondaryButtonText || ''} onChange={e => setPageContent({...pageContent, secondaryButtonText: e.target.value})} className="bg-white/5 border-white/10 h-12 rounded-xl" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] text-zinc-600 ml-2">Redirect URL (Link)</Label>
                                <Input value={pageContent?.secondaryButtonLink || ''} onChange={e => setPageContent({...pageContent, secondaryButtonLink: e.target.value})} className="bg-white/5 border-white/10 h-12 rounded-xl" />
                            </div>
                        </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Page Sections (Managed as JSON for simplicity/flexibility) */}
                <Card className="bg-white/5 border-white/10 rounded-[40px] text-white">
                    <CardHeader>
                         <CardTitle className="text-2xl font-display italic">Extensive Data Blocks</CardTitle>
                         <CardDescription className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest">JSON OVERRIDE FOR COMPLEX SECTIONS</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2">Section Data Object</Label>
                            <Textarea 
                                value={JSON.stringify(pageContent?.sections || {}, null, 2)} 
                                onChange={e => {
                                    try {
                                        setPageContent({...pageContent, sections: JSON.parse(e.target.value)});
                                    } catch (err) {}
                                }}
                                className="bg-black/50 border-white/10 rounded-2xl min-h-[300px] font-mono text-xs"
                            />
                        </div>
                        <Button onClick={handleUpdatePage} className="w-full h-14 bg-white text-black font-bold rounded-xl hover:bg-zinc-200">
                             Authorize Page Synchronization
                        </Button>
                    </CardContent>
                </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

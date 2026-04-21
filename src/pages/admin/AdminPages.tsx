import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

export default function AdminPages() {
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState<any>({
    home: { heroTitle: 'Grow Your Clinic or Home-Service Business With Smart Automation', heroSubtitle: 'Websites and AI agents that increase bookings, close more leads, and save you 20+ hours every week.' },
    about: { heroTitle: 'Pioneering the Digital Frontier.', heroSubtitle: 'Dedicated researchers and real estate veterans.' },
    services: { heroTitle: 'Solutions for a New Era.', heroSubtitle: 'Agentic AI across your entire property portfolio.' }
  });
  const [settings, setSettings] = useState<any>({
    agencyName: 'HCubeTech',
    logoUrl: '',
    faviconUrl: ''
  });

  useEffect(() => {
    async function fetchAllPages() {
      try {
        // Fetch settings
        const settingsSnap = await getDoc(doc(db, 'settings', 'config'));
        if (settingsSnap.exists()) {
          setSettings(settingsSnap.data());
        }
        
        const pageIds = ['home', 'about', 'services'];
        const updatedPages = { ...pages };
        for (const id of pageIds) {
          const snapshot = await getDoc(doc(db, 'pages', id));
          if (snapshot.exists()) {
            updatedPages[id] = snapshot.data();
          }
        }
        setPages(updatedPages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchAllPages();
  }, []);

  const handleUpdate = async (pageId: string) => {
    try {
      await setDoc(doc(db, 'pages', pageId), {
        ...pages[pageId],
        updatedAt: serverTimestamp()
      });
      toast.success(`${pageId.toUpperCase()} content synchronized`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSettingsUpdate = async () => {
    try {
      await setDoc(doc(db, 'settings', 'config'), settings);
      toast.success('Site settings synchronized');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const updateField = (pageId: string, field: string, value: string) => {
    setPages((prev: any) => ({
      ...prev,
      [pageId]: { ...prev[pageId], [field]: value }
    }));
  };

  if (loading) return <div className="text-zinc-500 font-bold tracking-widest uppercase text-sm">Accessing page parameters...</div>;

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-4xl font-display font-bold mb-2">Static Parameter Override</h1>
        <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">MODIFY CORE PAGE CONTENT & DATA FIELDS</p>
      </div>

      <Tabs defaultValue="home" className="w-full">
        <TabsList className="bg-white/5 border-white/10 h-14 p-1 rounded-xl mb-8">
          <TabsTrigger value="home" className="data-[state=active]:bg-white data-[state=active]:text-black rounded-lg px-8 font-bold text-xs uppercase tracking-widest">Home</TabsTrigger>
          <TabsTrigger value="about" className="data-[state=active]:bg-white data-[state=active]:text-black rounded-lg px-8 font-bold text-xs uppercase tracking-widest">About</TabsTrigger>
          <TabsTrigger value="services" className="data-[state=active]:bg-white data-[state=active]:text-black rounded-lg px-8 font-bold text-xs uppercase tracking-widest">Services</TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-white data-[state=active]:text-black rounded-lg px-8 font-bold text-xs uppercase tracking-widest">Global Settings</TabsTrigger>
        </TabsList>

        {Object.keys(pages).map((pageId) => (
          <TabsContent key={pageId} value={pageId} className="space-y-6">
            <Card className="bg-white/5 border-white/10 rounded-[40px] text-white">
              <CardHeader>
                <CardTitle className="text-2xl font-display italic">Hero Section: {pageId.charAt(0).toUpperCase() + pageId.slice(1)}</CardTitle>
                <CardDescription className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest">CORE VISUAL HEADLINE AND ABSTRACT</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2">Primary Headline</Label>
                  <Input 
                    value={pages[pageId].heroTitle} 
                    onChange={e => updateField(pageId, 'heroTitle', e.target.value)}
                    className="h-16 bg-white/5 border-white/10 rounded-2xl text-xl font-display font-bold italic"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2">Strategic Abstract</Label>
                  <Textarea 
                    value={pages[pageId].heroSubtitle} 
                    onChange={e => updateField(pageId, 'heroSubtitle', e.target.value)}
                    className="bg-white/5 border-white/10 rounded-2xl min-h-[100px] text-zinc-400"
                  />
                </div>
                <Button 
                  onClick={() => handleUpdate(pageId)}
                  className="bg-white text-black font-bold h-14 px-10 rounded-xl hover:bg-zinc-200"
                >
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        ))}

        <TabsContent value="settings" className="space-y-6">
          <Card className="bg-white/5 border-white/10 rounded-[40px] text-white">
            <CardHeader>
              <CardTitle className="text-2xl font-display italic">Global Branding Parameters</CardTitle>
              <CardDescription className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest">CONTROL CORE IDENTITY AND VISUAL PARAMETERS</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2">Agency Name</Label>
                <Input 
                  value={settings.agencyName} 
                  onChange={e => setSettings({...settings, agencyName: e.target.value})}
                  className="h-16 bg-white/5 border-white/10 rounded-2xl text-xl font-display font-bold italic"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2">Logo URL (PNG/SVG)</Label>
                <Input 
                  value={settings.logoUrl} 
                  onBlur={() => {}} // Could add preview
                  onChange={e => setSettings({...settings, logoUrl: e.target.value})}
                  className="h-16 bg-white/5 border-white/10 rounded-2xl text-zinc-400"
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2">Favicon URL (.ico/.png)</Label>
                <Input 
                  value={settings.faviconUrl} 
                  onChange={e => setSettings({...settings, faviconUrl: e.target.value})}
                  className="h-16 bg-white/5 border-white/10 rounded-2xl text-zinc-400"
                  placeholder="https://..."
                />
              </div>
              <Button 
                onClick={handleSettingsUpdate}
                className="bg-[var(--color-brand-primary)] text-black font-bold h-14 px-10 rounded-xl hover:opacity-90"
              >
                Sync Global Branding
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

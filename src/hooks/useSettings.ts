import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface SiteSettings {
  agencyName: string;
  logoUrl?: string;
  faviconUrl?: string;
  accentColor?: string;
}

export function useSettings() {
  const [settings, setSettings] = useState<SiteSettings>({
    agencyName: 'HCubeTech',
    logoUrl: '',
    faviconUrl: '',
    accentColor: '#00C3FF'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'config'), (snap) => {
      if (snap.exists()) {
        const data = snap.data() as SiteSettings;
        setSettings(data);
        
        // Update Favicon dynamically
        if (data.faviconUrl) {
          const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
          if (link) {
            link.href = data.faviconUrl;
          } else {
            const newLink = document.createElement('link');
            newLink.rel = 'icon';
            newLink.href = data.faviconUrl;
            document.head.appendChild(newLink);
          }
        }
        
        // Update Title dynamically if needed
        if (data.agencyName) {
           document.title = `${data.agencyName} - Premium AI Agency`;
        }
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return { settings, loading };
}

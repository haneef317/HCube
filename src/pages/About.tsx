import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Section, PageHero } from '@/components/shared/Section';
import { Linkedin, Twitter } from 'lucide-react';
import { collection, query, orderBy, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function About() {
  const [team, setTeam] = useState<any[]>([]);
  const [content, setContent] = useState({
    heroTitle: 'Pioneering Digital Governance.',
    heroSubtitle: 'We are a collective of developers, AI architects, respectively focused on automating the high-growth agency experience.'
  });

  useEffect(() => {
    async function fetchData() {
      // Fetch Page Content
      const pageSnap = await getDoc(doc(db, 'pages', 'about'));
      if (pageSnap.exists()) setContent(pageSnap.data() as any);

      // Fetch Team
      const teamSnap = await getDocs(query(collection(db, 'teamMembers'), orderBy('order', 'asc')));
      if (!teamSnap.empty) {
        setTeam(teamSnap.docs.map(d => d.data()));
      } else {
        // Fallback
        setTeam([
          {
            name: "Haneef Ahmad",
            role: "Founder & Lead Architect",
            imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop",
            bio: "Specializing in the intersection of high-performance code and agentic intelligence."
          }
        ]);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen">
      <Section className="pt-32 pb-20">
        <div className="max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-6xl md:text-8xl font-display font-bold tracking-tighter mb-8 italic"
          >
            {content.heroTitle}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-zinc-500 font-light max-w-2xl"
          >
            {content.heroSubtitle}
          </motion.p>
        </div>
      </Section>

      {/* Mission Section */}
      <Section className="pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-[60px] overflow-hidden border border-white/10 aspect-[4/3]"
            >
                <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop" 
                alt="Architecture" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 opacity-60 hover:opacity-100" 
                />
            </motion.div>
            <div className="absolute -bottom-10 -right-10 bg-white/5 border border-white/10 backdrop-blur-2xl p-10 rounded-3xl hidden md:block">
              <div className="text-4xl font-bold font-display text-[var(--color-brand-primary)] mb-2 italic">25+</div>
              <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Global Deployments</div>
            </div>
          </div>
          
          <div className="space-y-8">
            <h2 className="text-5xl md:text-6xl font-display font-bold italic tracking-tight">Our Philosophy</h2>
            <div className="space-y-6">
                <p className="text-zinc-500 text-lg leading-relaxed font-light">
                We believe that digital systems shouldn't just exist—they should govern. Our focus is on building "resident" systems that handle complexity so you can focus on high-level strategy.
                </p>
                <p className="text-zinc-500 text-lg leading-relaxed font-light">
                HCubeTech was established to bridge the gap between creative development and autonomous logic. We don't just build websites; we engineer ecosystems.
                </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Team Section */}
      <Section id="team" className="pb-40">
        <div className="mb-20">
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 italic tracking-tighter">The <span className="text-[var(--color-brand-primary)]">Governance Unit.</span></h2>
          <p className="text-zinc-500 max-w-2xl text-lg font-light">
            Engineers and architects dedicated to the next generation of digital infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="relative mb-8 aspect-[3/4] overflow-hidden rounded-[40px] bg-zinc-900 border border-white/5">
                <img 
                  src={member.imageUrl} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-60 group-hover:opacity-100"
                />
                <div className="absolute bottom-10 left-10 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-[var(--color-brand-primary)] hover:text-black transition-all cursor-pointer">
                      <Linkedin size={20} />
                   </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold font-display italic mb-1 uppercase tracking-tighter">{member.name}</h3>
              <p className="text-[var(--color-brand-primary)] font-bold text-[10px] uppercase tracking-[0.2em] mb-4">{member.role}</p>
              <p className="text-zinc-500 text-xs leading-relaxed font-light line-clamp-3">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}

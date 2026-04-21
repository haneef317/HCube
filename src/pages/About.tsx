import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Section, PageHero } from '@/components/shared/Section';
import { Linkedin, Twitter } from 'lucide-react';
import { collection, query, orderBy, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function About() {
  const [team, setTeam] = useState<any[]>([]);
  const [content, setContent] = useState({
    heroTitle: 'Pioneering the Digital Frontier.',
    heroSubtitle: 'We are a collective of AI researchers, developers, and real estate veterans dedicated to automating the premium agency experience.'
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
            name: "Dr. Alexander Thorne",
            role: "Founder & Chief AI Officer",
            imageUrl: "https://picsum.photos/seed/alexander/400/500",
            bio: "Former lead researcher in neural networks with a passion for transforming the real estate vertical."
          },
          {
            name: "Sarah Jenkins",
            role: "Head of Operations",
            imageUrl: "https://picsum.photos/seed/sarah/400/500",
            bio: "Expert in real estate workflows and ensuring seamless AI integration for our premium clients."
          },
          {
            name: "Marcus Chen",
            role: "Lead Agent Developer",
            imageUrl: "https://picsum.photos/seed/marcus/400/500",
            bio: "Specializes in Large Language Models and building autonomous conversational agents."
          }
        ]);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <PageHero 
        title={content.heroTitle}
        subtitle={content.heroSubtitle}
      />

      {/* Mission Section */}
      <Section className="bg-black">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <motion.img 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              src="https://picsum.photos/seed/agency/800/600" 
              alt="Office" 
              className="rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute -bottom-10 -right-10 glass-card p-10 rounded-3xl hidden md:block">
              <div className="text-4xl font-bold font-display gradient-text mb-2">10+</div>
              <div className="text-sm font-bold text-zinc-400 uppercase tracking-widest">AI Models Developed</div>
            </div>
          </div>
          
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-display font-bold">Our Philosophy</h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              We believe that agents shouldn't be replaced—they should be amplified. Our AI solutions act as the 'Second Brain' for your agency, allowing your human talent to focus on closing deals and building relationships while the AI handles the complexity of the digital world.
            </p>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Founded in 2024, AI Premier has quickly become the go-to partner for luxury real estate firms seeking a competitive edge in the era of intelligence.
            </p>
          </div>
        </div>
      </Section>

      {/* Team Section */}
      <Section id="team" className="bg-zinc-950">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">The Minds Behind <br /> <span className="gradient-text">The Machine.</span></h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Meet the visionaries building the future of autonomous property marketing and agency management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="relative mb-8 aspect-[3/4] overflow-hidden rounded-3xl">
                <img 
                  src={member.imageUrl} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-black transition-all">
                    <Linkedin size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-black transition-all">
                    <Twitter size={18} />
                  </a>
                </div>
              </div>
              <h3 className="text-2xl font-bold font-display mb-1">{member.name}</h3>
              <p className="text-[var(--color-brand-primary)] font-bold text-sm uppercase tracking-widest mb-4">{member.role}</p>
              <p className="text-zinc-400 text-sm leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}

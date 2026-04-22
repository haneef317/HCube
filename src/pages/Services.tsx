import { useState, useEffect } from 'react';
import { Section, PageHero } from '@/components/shared/Section';
import { motion } from 'motion/react';
import { Bot, MessageSquare, LineChart, FileText, Share2, Search, ArrowRight, Zap, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Link } from 'react-router-dom';

export default function Services() {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    async function fetchContent() {
      const snap = await getDoc(doc(db, 'pages', 'services'));
      if (snap.exists()) setContent(snap.data());
    }
    fetchContent();
  }, []);

  const services = content?.sections?.items || [
    {
      icon: <Globe size={40} className="text-[var(--color-brand-primary)]" />,
      title: "Performance Web Systems",
      desc: "Architecting high-conversion, scalable web applications using modern frameworks and edge-focused deployment."
    },
    {
      icon: <Bot size={40} className="text-[var(--color-brand-primary)]" />,
      title: "Agentic AI Orchestration",
      desc: "Deploying autonomous LLM agents that handle complex business logic, lead acquisition, and customer support 24/7."
    },
    {
      icon: <Zap size={40} className="text-[var(--color-brand-primary)]" />,
      title: "Technical SEO Engineering",
      desc: "Strategic search optimization through semantic analysis, technical auditing, and organic growth frameworks."
    }
  ];

  return (
    <div className="bg-[#050505] min-h-screen">
      <Section className="pt-32 pb-20">
        <div className="max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-6xl md:text-8xl font-display font-bold tracking-tighter mb-8 italic"
          >
            {content?.heroTitle || 'Engineered Solutions.'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-zinc-500 font-light max-w-2xl"
          >
            {content?.heroSubtitle || 'Specialized capabilities designed to accelerate your growth through code and intelligence.'}
          </motion.p>
        </div>
      </Section>

      <Section className="pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ rotateY: 5, rotateX: 5, y: -10 }}
              className="bg-white/5 p-12 rounded-[40px] hover:bg-white/10 transition-all border border-white/5 group"
            >
              <div className="mb-8">{service.icon}</div>
              <h3 className="text-3xl font-display font-bold mb-6 italic group-hover:text-[var(--color-brand-primary)] transition-colors">{service.title}</h3>
              <p className="text-zinc-500 leading-relaxed mb-8 font-light text-sm">{service.desc}</p>
              <Button asChild variant="link" className="p-0 text-white font-bold uppercase tracking-widest text-[10px] hover:text-[var(--color-brand-primary)] group">
                <Link to="/contact">
                  Initialize Inquiry <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="pb-40">
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden bg-white/5 rounded-[60px] p-12 md:p-24 border border-white/10 text-center"
        >
            <h2 className="text-4xl md:text-7xl font-display font-bold mb-10 max-w-4xl mx-auto tracking-tighter italic">Ready to scale your <span className="text-[var(--color-brand-primary)]">Digital Ecosystem?</span></h2>
            <Button asChild size="lg" className="bg-white text-black hover:bg-zinc-200 rounded-full h-16 px-12 text-xl font-bold shadow-[0_0_50px_rgba(255,255,255,0.1)]">
              <Link to={content?.primaryButtonLink || '/contact'}>{content?.primaryButtonText || 'Initialize Consultation'}</Link>
            </Button>
            
            {/* Visual Flair */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-[var(--color-brand-primary)] opacity-10 blur-[100px]" />
        </motion.div>
      </Section>
    </div>
  );
}

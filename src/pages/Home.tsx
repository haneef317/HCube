import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, Bot, Zap, Globe, Shield, Cpu, 
  ChevronRight, Calendar, MessageSquare, Workflow, 
  Rocket, Users, CheckCircle2, Star, CheckSquare,
  Clock, Cloud, Search, Mail, Phone, Linkedin
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useSettings } from '@/hooks/useSettings';

export default function Home() {
  const { settings } = useSettings();
  const [content, setContent] = useState({
    heroTitle: 'Deploy Intelligence. Scale Performance.',
    heroSubtitle: 'Next-generation web development and AI agent orchestration for high-growth tech agencies.',
    primaryButtonText: 'Initialize Consultation',
    primaryButtonLink: '/contact',
    secondaryButtonText: 'View Portfolio',
    secondaryButtonLink: '/portfolio'
  });

  useEffect(() => {
    async function fetchContent() {
      const snap = await getDoc(doc(db, 'pages', 'home'));
      if (snap.exists()) setContent(snap.data() as any);
    }
    fetchContent();
  }, []);

  const problems = [
    { text: "Legacy Architectures", icon: <X className="text-red-500" /> },
    { text: "Static, Dumb Interfaces", icon: <X className="text-red-500" /> },
    { text: "Manual Data Entry", icon: <X className="text-red-500" /> },
    { text: "Zero Process Automation", icon: <X className="text-red-500" /> },
    { text: "Invisible Search Presence", icon: <X className="text-red-500" /> },
    { text: "Disconnected Ecosystems", icon: <X className="text-red-500" /> }
  ];

  return (
    <div className="bg-[#050505] text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center pt-32 pb-20 px-6 overflow-hidden">
        {/* Abstract Network Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0, 195, 255, 0.2) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-5xl"
        >
          <span className="text-[var(--color-brand-primary)] font-bold tracking-widest uppercase text-[10px] mb-6 block">
            Agentic Workflows • Next-Gen Development • Strategic SEO
          </span>
          <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tighter leading-tight mb-8 italic">
            {content.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-3xl mx-auto mb-12">
            {content.heroSubtitle}
          </p>

          <div className="flex flex-col sm:row gap-6 justify-center items-center">
            <Button asChild size="lg" className="bg-[var(--color-brand-primary)] text-black hover:bg-[var(--color-brand-primary)]/90 h-14 px-10 rounded-full font-bold text-lg">
              <Link to={content.primaryButtonLink}>{content.primaryButtonText}</Link>
            </Button>
            <Link to={content.secondaryButtonLink} className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors group font-bold uppercase text-xs tracking-widest">
              {content.secondaryButtonText} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <p className="mt-16 text-2xl font-display italic text-[var(--color-brand-primary)] opacity-80">
            "Creative Code meets Conversational Intelligence"
          </p>
        </motion.div>
      </section>

      {/* The Problem Section */}
      <section className="py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-red-500 flex items-center gap-2 font-bold uppercase text-xs mb-4">
              <Zap size={14} className="fill-current" /> The Friction
            </span>
            <h2 className="text-5xl md:text-6xl font-display font-bold tracking-tight mb-8 leading-tight italic">
              Digital Inertia is Killing Efficiency
            </h2>
            <p className="text-lg text-zinc-400 leading-relaxed max-w-xl font-light">
              Outdated tech stacks and manual processes are silent revenue killers. In a world driven by speed and intelligence, if you aren't automating, you're stagnating. We eliminate the friction.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {problems.map((p, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, borderColor: 'rgba(239, 68, 68, 0.3)' }}
                className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-4 group transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                  <X size={16} />
                </div>
                <span className="text-zinc-400 font-medium text-sm uppercase tracking-widest">{p.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivered in One System */}
      <section className="py-32 px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight max-w-3xl mx-auto italic">
            Integrated Intelligence. <br /><span className="text-[var(--color-brand-primary)]">Unified Architecture.</span>
          </h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Smart Web Ecosystems", desc: "Performance-first web applications designed to convert and scale.", icon: <Globe size={28} /> },
            { title: "Resident AI Agents", desc: "Cognitive workflows that handle logic, support, and sales autonomously.", icon: <Bot size={28} /> },
            { title: "Technical SEO & Scale", desc: "Data-driven strategies that dominate search rankings for high-intent traffic.", icon: <Zap size={28} /> }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 border border-white/10 p-10 rounded-3xl group hover:border-[var(--color-brand-primary)]/50 transition-all"
            >
              <div className="w-14 h-14 bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)] rounded-2xl flex items-center justify-center mb-8">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 italic">{feature.title}</h3>
              <p className="text-zinc-400 font-light leading-relaxed text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Selected Works */}
      <section className="py-32 px-6 bg-[#080808] border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 italic">Operational Intelligence</h2>
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">A SELECTION OF OUR RECENT DEPLOYMENTS</p>
          </div>
          <Link to="/portfolio" className="flex items-center gap-2 text-[var(--color-brand-primary)] font-bold group uppercase text-xs tracking-widest">
            Explore Portfolio <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: "NeuralSaaS Platform", cat: "Next-Gen Web", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" },
            { title: "Autonomous Sales Agent", cat: "AI Orchestration", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2664&auto=format&fit=crop" },
            { title: "Enterprise SEO Engine", cat: "Search Strategy", img: "https://images.unsplash.com/photo-1551288049-bbda4865c71a?q=80&w=2670&auto=format&fit=crop" },
            { title: "LogicLink Dashboard", cat: "Development", img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2620&auto=format&fit=crop" }
          ].map((work, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 aspect-[16/10] bg-zinc-900"
            >
              <img 
                src={work.img} 
                alt={work.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-10">
                <div className="text-[var(--color-brand-primary)] text-[10px] font-bold uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{work.cat}</div>
                <h3 className="text-3xl font-display font-bold italic translate-y-2 group-hover:translate-y-0 transition-transform duration-500">{work.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 italic">Validated Impact</h2>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Client Intelligence Reports</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
           {[
             { 
               name: "Marcus Thorne", role: "CTO, NexaCorp", initial: "M",
               text: "\"The HCubeTech team didn't just build a site; they engineered a performance engine. Our lead quality saw a 40% uptick within the first month of deploying their AI agents.\"" 
             },
             { 
               name: "Alica Vong", role: "Founder, Zenith Media", initial: "A",
               text: "\"Working with {settings.agencyName} was a truly transformative experience. Their technical depth in SEO and AI orchestration is leagues ahead of standard boutique agencies.\"" 
             }
           ].map((testimonial, i) => (
             <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ borderColor: 'var(--color-brand-primary)' }}
                className="bg-white/5 border border-white/10 p-10 rounded-3xl transition-colors"
             >
               <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-primary)] text-black flex items-center justify-center text-xl font-black">
                   {testimonial.initial}
                 </div>
                 <div>
                   <h4 className="font-display font-bold text-lg italic">{testimonial.name}</h4>
                   <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">{testimonial.role}</p>
                 </div>
               </div>
               <p className="text-xl font-light italic leading-relaxed text-zinc-300 mb-8">{testimonial.text}</p>
               <div className="flex gap-1">
                 {[...Array(5)].map((_, idx) => <Star key={idx} size={12} className="fill-[var(--color-brand-primary)] text-[var(--color-brand-primary)]" />)}
               </div>
             </motion.div>
           ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-white/5 border border-white/10 rounded-[3rem] p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-brand-primary)]/10 rounded-full blur-[100px]" />
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 italic">Ready to Initialize Your Scale?</h2>
          <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Secure your competitive edge. Let's discuss your technical roadmap and deploy a solution that actually drives performance.
          </p>
          <Button asChild size="lg" className="bg-[var(--color-brand-primary)] text-black hover:bg-[var(--color-brand-primary)]/90 h-16 px-12 rounded-full font-bold text-lg shadow-[0_0_30px_rgba(0,195,255,0.3)]">
            <Link to={content.primaryButtonLink}>{content.primaryButtonText}</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-32 pb-10 px-6 border-t border-white/10 bg-[#050505]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-10 group">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-primary)] flex items-center justify-center group-hover:rotate-12 transition-transform">
                 <Bot className="text-black" size={24} />
              </div>
              <span className="text-4xl font-display font-bold uppercase tracking-tighter italic">{settings.agencyName}</span>
            </Link>
            <p className="text-lg text-zinc-400 mb-10 max-w-md font-light">Engineering the future of digital presence through code, intelligence, and strategic visibility.</p>
            <div className="space-y-4">
               <div className="flex items-center gap-4 text-zinc-500 hover:text-white transition-colors cursor-pointer text-xs font-bold uppercase tracking-widest">
                  <Mail size={16} className="text-[var(--color-brand-primary)]" /> hello@{settings.agencyName.toLowerCase()}.tech
               </div>
               <div className="flex items-center gap-4 text-zinc-500 hover:text-white transition-colors cursor-pointer text-xs font-bold uppercase tracking-widest">
                  <Linkedin size={16} className="text-[var(--color-brand-primary)]" /> LinkedIn Presence
               </div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem]">
            <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-8">Quick Intelligence Request</h4>
            <div className="space-y-6">
                <Input placeholder="Operation Email" className="bg-black/40 border-white/10 h-14 rounded-xl" />
                <Textarea 
                  placeholder="Deployment Context (Your Needs)..." 
                  className="w-full h-32 bg-black/40 border border-white/10 rounded-2xl p-6 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[var(--color-brand-primary)]/50 transition-colors"
                />
                <Button className="w-full h-14 bg-white text-black font-bold text-lg rounded-xl hover:bg-zinc-200">
                  Submit Payload
                </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:row items-center justify-between gap-8 border-t border-white/5 pt-10 text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-black">
           <div>© 2026 {settings.agencyName} // DIGITAL GOVERNANCE UNIT</div>
           <div className="flex items-center gap-10">
             <Link to="/" className="hover:text-[var(--color-brand-primary)] transition-colors">Home</Link>
             <Link to="/about" className="hover:text-[var(--color-brand-primary)] transition-colors">About</Link>
             <Link to="/services" className="hover:text-[var(--color-brand-primary)] transition-colors">Services</Link>
             <Link to="/portfolio" className="hover:text-[var(--color-brand-primary)] transition-colors">Portfolio</Link>
           </div>
        </div>
      </footer>
    </div>
  );
}

function X({ className, size = 16 }: { className?: string, size?: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="4" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function Twitter({ size = 24, className }: { size?: number, className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
  );
}

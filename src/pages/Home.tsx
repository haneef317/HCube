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
    heroTitle: 'Grow Your Clinic or Home-Service Business With Smart Automation',
    heroSubtitle: 'Websites and AI agents that increase bookings, close more leads, and save you 20+ hours every week.'
  });

  useEffect(() => {
    async function fetchContent() {
      const snap = await getDoc(doc(db, 'pages', 'home'));
      if (snap.exists()) setContent(snap.data() as any);
    }
    fetchContent();
  }, []);

  const problems = [
    { text: "Slow or outdated websites", icon: <X className="text-red-500" /> },
    { text: "No online booking system", icon: <X className="text-red-500" /> },
    { text: "Missed or delayed replies", icon: <X className="text-red-500" /> },
    { text: "Manual follow-ups", icon: <X className="text-red-500" /> },
    { text: "No automation or CRM", icon: <X className="text-red-500" /> },
    { text: "Low Google visibility", icon: <X className="text-red-500" /> }
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
          <span className="text-[var(--color-brand-primary)] font-bold tracking-widest uppercase text-xs mb-6 block">
            Trusted by clinics, home-service teams, and SaaS businesses worldwide
          </span>
          <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tighter leading-tight mb-8">
            {content.heroTitle.split('With').map((part, i) => (
              <span key={i}>
                {i === 1 ? <><br /><span className="text-[var(--color-brand-primary)]">With{part}</span></> : part}
              </span>
            ))}
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-3xl mx-auto mb-12">
            {content.heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button size="lg" className="bg-[var(--color-brand-primary)] text-black hover:bg-[var(--color-brand-primary)]/90 h-14 px-10 rounded-full font-bold text-lg">
              Book a Free Strategy Call
            </Button>
            <button className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors group">
              See How It Works <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <p className="mt-16 text-2xl font-display italic text-[var(--color-brand-primary)] opacity-80">
            "Creative Code meets Conversational Intelligence"
          </p>
        </motion.div>
      </section>

      {/* The Problem Section */}
      <section className="py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <span className="text-red-500 flex items-center gap-2 font-bold uppercase text-xs mb-4">
              <Zap size={14} className="fill-current" /> The Problem
            </span>
            <h2 className="text-5xl md:text-6xl font-display font-bold tracking-tight mb-8 leading-tight">
              Your Business Is Losing Clients Every Day
            </h2>
            <p className="text-lg text-zinc-400 leading-relaxed max-w-xl">
              Missed calls, late replies, messy scheduling, slow websites, outdated systems—these small gaps cost you revenue. Clients expect fast responses and a smooth digital experience. We help you deliver exactly that.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {problems.map((p, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-4 group hover:border-red-500/50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                  <X size={16} className="text-red-500" />
                </div>
                <span className="text-zinc-200 font-medium">{p.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivered in One System */}
      <section className="py-32 px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight max-w-3xl mx-auto">
            Everything You Need to Grow, Delivered in One System
          </h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "High-Converting Websites", desc: "Built to bring you more bookings, not just look pretty.", icon: <Globe size={28} /> },
            { title: "Custom AI Agents", desc: "Your 24/7 assistant that handles appointment setting, replies, and follow-ups.", icon: <Bot size={28} /> },
            { title: "Workflow Automation + SEO", desc: "Automate your operations and bring in traffic that converts.", icon: <Zap size={28} /> }
          ].map((feature, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-3xl group hover:border-[var(--color-brand-primary)] transition-all">
              <div className="w-14 h-14 bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)] rounded-2xl flex items-center justify-center mb-8">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">{feature.title}</h3>
              <p className="text-zinc-400 font-light leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Powerful Tools Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="h-64 bg-[var(--color-brand-primary)]/10 rounded-3xl border border-[var(--color-brand-primary)]/20 flex items-center justify-center">
                <Zap size={48} className="text-[var(--color-brand-primary)] opacity-50" />
              </div>
              <div className="h-44 bg-zinc-900 rounded-3xl border border-white/5 flex items-center justify-center">
                <Shield size={32} className="text-zinc-700" />
              </div>
            </div>
            <div className="space-y-4 pt-12">
               <div className="h-44 bg-zinc-900 rounded-3xl border border-white/5 flex items-center justify-center">
                <Workflow size={32} className="text-zinc-700" />
              </div>
              <div className="h-64 bg-[var(--color-brand-primary)]/5 rounded-3xl border border-white/5 flex items-center justify-center">
                <Search size={48} className="text-white/10" />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Powerful Tools That Work While You Don't</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                "Custom AI appointment-setter", "WhatsApp, site chat & CRM integration", "Modern, fast, mobile-first website", "Dashboard to track leads & bookings",
                "Lead capture & instant auto-response", "Automatic reminders and follow-ups", "Local SEO for higher Google ranking", "Fully customized automations"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-[var(--color-brand-primary)] border-none" />
                  <span className="text-zinc-300 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bridging Code & Intelligence */}
      <section className="py-32 px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Bridging Code & Intelligence</h2>
            <p className="text-lg text-zinc-400 mb-10 leading-relaxed">
              At {settings.agencyName}, we don't just build websites; we architect digital ecosystems. Our mission is to bridge the gap between custom development and advanced automation, providing holistic solutions that help startups scale faster and smarter.
            </p>
            <div className="space-y-4">
              {[
                "Custom-built scalable architectures", "AI-driven workflow optimization", "Data-backed SEO strategies", "Continuous technical support"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-[var(--color-brand-primary)]" />
                  <span className="text-zinc-300 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative group">
            <img 
              src="https://picsum.photos/seed/tech/800/600" 
              alt="Tech Workspace" 
              className="rounded-3xl border border-white/10 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-10 left-10 bg-black/80 backdrop-blur-md p-8 rounded-3xl border border-white/10">
              <div className="text-5xl font-display font-bold text-[var(--color-brand-primary)] mb-2">100+</div>
              <div className="text-zinc-400 text-sm uppercase tracking-widest font-bold">Projects Delivered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 italic">Our Services</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">Specialized solutions designed to grow your clinic or home-service business.</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { 
              title: "Web Design & Funnel Build", 
              desc: "Conversion-optimized websites for clinics and service teams.", 
              items: ["3-5 page website", "Booking system", "Mobile optimization"],
              icon: <Globe />
            },
            { 
               title: "AI Appointment Setter Bot", 
               desc: "Handles bookings, replies, reminders, FAQs, and lead follow-ups.", 
               items: ["Custom AI agent", "WhatsApp Integration", "CRM sync"],
               icon: <Bot />,
               badge: "Active"
            },
            { 
              title: "Custom AI Automations", 
              desc: "Internal tools, CRM workflows, onboarding systems, and more.", 
              items: ["Workflow automation", "Reporting dashboards", "Onboarding systems"],
              icon: <Zap />
            },
            { 
              title: "SEO & Local Ranking", 
              desc: "Get discovered on Google by ready-to-book clients.", 
              items: ["Local SEO", "Keyword Authority", "Google Ranking"],
              icon: <Search />
            }
          ].map((service, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-3xl group hover:bg-white/[0.08] transition-all">
              <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center">
                  {service.icon}
                </div>
                {service.badge && (
                  <span className="px-3 py-1 bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-widest rounded-full flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> {service.badge}
                  </span>
                )}
              </div>
              <h3 className="text-3xl font-display font-bold mb-4">{service.title}</h3>
              <p className="text-zinc-400 mb-8 font-light">{service.desc}</p>
              <div className="space-y-4">
                {service.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-zinc-300">
                    <div className="w-1 h-1 bg-[var(--color-brand-primary)] rounded-full" /> {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Selected Works */}
      <section className="py-32 px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Selected Works</h2>
            <p className="text-zinc-400">A glimpse into the digital solutions we've crafted.</p>
          </div>
          <Link to="/blog" className="hidden md:flex items-center gap-2 text-[var(--color-brand-primary)] font-bold group">
            View All Projects <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: "SaaS Platform PWA", cat: "Web Dev", img: "https://picsum.photos/seed/pwa/800/500" },
            { title: "Automated Lead Agent", cat: "AI Automation", img: "https://picsum.photos/seed/bot/800/500" },
            { title: "E-commerce SEO Scale", cat: "Technical SEO", img: "https://picsum.photos/seed/seo/800/500" },
            { title: "FinTech Dashboard", cat: "Web Dev", img: "https://picsum.photos/seed/dash/800/500" }
          ].map((work, i) => (
            <div key={i} className="group relative overflow-hidden rounded-3xl border border-white/10 aspect-[16/10]">
              <img 
                src={work.img} 
                alt={work.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-10">
                <div className="text-[var(--color-brand-primary)] text-xs font-bold uppercase tracking-widest mb-2">{work.cat}</div>
                <h3 className="text-3xl font-display font-bold">{work.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Simple, Transparent Pricing</h2>
          <p className="text-zinc-400">Choose the package that fits your business stage.</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              name: "Starter Website Package", price: "$499–$899", color: "blue",
              items: ["3-5 page website", "Booking system", "Basic SEO setup", "Mobile optimization", "Speed optimization", "Hosting/domain guidance"]
            },
            { 
              name: "AI Appointment Setter Package", price: "$499–$999", highlight: true,
              items: ["Custom AI agent", "WhatsApp + FB Messenger + Site chat", "Appointment scheduling", "Automated reminders", "Lead follow-ups", "FAQ responses", "CRM integration", "Dashboard"]
            },
            { 
              name: "Automation + Workflow Package", price: "$999–$1,999", color: "blue",
              items: ["Custom internal automations", "Patient/client onboarding", "CRM workflows", "Feedback & review collection", "Data handling tools", "Reporting dashboards", "Up to 2 custom agents"]
            },
            { 
               name: "Full Growth System", price: "$2,499–$4,999", badge: "Signature Package",
               items: ["Full website + funnel", "AI appointment-setter", "2-4 custom agents", "Automations + CRM", "Local SEO", "Monthly optimization", "Priority support"]
            }
          ].map((plan, i) => (
            <div key={i} className={`relative flex flex-col p-8 rounded-3xl border transition-all ${plan.highlight ? 'bg-white/10 border-[var(--color-brand-primary)] scale-105 z-10' : 'bg-white/5 border-white/10 hover:border-white/20'}`}>
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[var(--color-brand-primary)] text-black text-[10px] font-black uppercase tracking-tighter rounded-full">
                  {plan.badge}
                </span>
              )}
              <div className="mb-8">
                <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center ${plan.highlight ? 'bg-[var(--color-brand-primary)] text-black' : 'bg-white/10 text-white'}`}>
                  {i === 0 ? <Globe size={24} /> : i === 1 ? <Bot size={24} /> : i === 2 ? <Zap size={24} /> : <Rocket size={24} />}
                </div>
                <h3 className="text-xl font-display font-bold mb-2 leading-tight">{plan.name}</h3>
                <div className="text-3xl font-display font-bold text-[var(--color-brand-primary)]">{plan.price}</div>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {plan.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs text-zinc-400 leading-tight">
                    <CheckSquare size={14} className="text-[var(--color-brand-primary)] shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
              {plan.highlight && (
                 <div className="bg-white/5 p-4 rounded-xl mb-6 border border-white/10">
                   <p className="text-[10px] italic text-[var(--color-brand-primary)] text-center">Optional Maintenance: $49-$99/mo</p>
                 </div>
              )}
              <Button className={`w-full font-bold rounded-xl ${plan.highlight ? 'bg-[var(--color-brand-primary)] text-black hover:bg-[var(--color-brand-primary)]/90' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 italic">Client Success Stories</h2>
          <p className="text-zinc-400">Don't just take our word for it. Here's what industry leaders say about {settings.agencyName}.</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
           {[
             { 
               name: "Noah Bennett", role: "Product Manager", initial: "N", color: "blue",
               text: "\"Working with HCubeTech was effortless. They built a custom reporting module that saved our team hours every week and made data visualization surprisingly intuitive.\"" 
             },
             { 
               name: "Abdur Rafi Ahmad", role: "Project Manager (PMP)", initial: "A", color: "cyan",
               text: "\"Working with HCubeTech was a truly transformative experience. Together, we developed an advanced utilities management portal that not only streamlined direct sales but also unveiled a hidden digital realm.\"" 
             }
           ].map((testimonial, i) => (
             <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-3xl">
               <div className="flex items-center gap-4 mb-8">
                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black ${i === 0 ? 'bg-blue-500 text-white' : 'bg-cyan-500 text-black'}`}>
                   {testimonial.initial}
                 </div>
                 <div>
                   <h4 className="font-display font-bold text-lg">{testimonial.name}</h4>
                   <p className="text-zinc-500 text-sm">{testimonial.role}</p>
                 </div>
               </div>
               <p className="text-xl font-light italic leading-relaxed text-zinc-300 mb-8">{testimonial.text}</p>
               <div className="flex gap-1">
                 {[...Array(5)].map((_, idx) => <Star key={idx} size={14} className="fill-[var(--color-brand-primary)] text-[var(--color-brand-primary)]" />)}
               </div>
             </div>
           ))}
        </div>
        <div className="mt-16 flex justify-center gap-2">
           {[...Array(4)].map((_, i) => <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-[var(--color-brand-primary)]' : 'bg-zinc-800'}`} />)}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-white/5 border border-white/10 rounded-[3rem] p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-brand-primary)]/10 rounded-full blur-[100px]" />
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">Ready to Save Time and Book More Clients?</h2>
          <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Let's analyze your business and show you exactly how automation and a better website can grow your revenue.
          </p>
          <Button size="lg" className="bg-[var(--color-brand-primary)] text-black hover:bg-[var(--color-brand-primary)]/90 h-16 px-12 rounded-full font-bold text-lg">
            Book a Free Strategy Call
          </Button>
        </div>
      </section>

      {/* Contact / Footer Section */}
      <footer className="pt-32 pb-10 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] flex items-center justify-center">
                 <Bot className="text-black" size={28} />
              </div>
              <span className="text-4xl font-display font-bold uppercase tracking-tighter">{settings.agencyName}</span>
            </Link>
            <p className="text-lg text-zinc-400 mb-10 max-w-md">Let's discuss how we can help you build, scale, and automate your business for the digital age.</p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[var(--color-brand-primary)]">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Email us at</div>
                  <div className="font-medium">hello@{settings.agencyName.toLowerCase()}.com</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[var(--color-brand-primary)]">
                  <Linkedin size={20} />
                </div>
                <div>
                  <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Follow us</div>
                  <div className="font-medium">linkedin.com/company/{settings.agencyName.toLowerCase()}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem]">
            <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-8">Project Details</h4>
            <div className="space-y-6">
               <textarea 
                  placeholder="Tell us about your project..." 
                  className="w-full h-48 bg-black/40 border border-white/10 rounded-2xl p-6 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[var(--color-brand-primary)]/50 transition-colors"
                />
                <Button className="w-full h-14 bg-[var(--color-brand-primary)] text-black font-bold text-lg rounded-xl">
                  Send Message
                </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:row items-center justify-between gap-8 border-t border-white/5 pt-10">
           <div className="flex items-center gap-10">
             <Link to="/" className="text-xs text-zinc-500 hover:text-white uppercase tracking-widest font-bold">Home</Link>
             <Link to="/about" className="text-xs text-zinc-500 hover:text-white uppercase tracking-widest font-bold">About</Link>
             <Link to="/services" className="text-xs text-zinc-500 hover:text-white uppercase tracking-widest font-bold">Services</Link>
             <Link to="/blog" className="text-xs text-zinc-500 hover:text-white uppercase tracking-widest font-bold">Portfolio</Link>
           </div>
           <div className="flex gap-6 text-zinc-500">
             <Twitter size={18} className="hover:text-white cursor-pointer" />
             <Bot size={18} className="hover:text-white cursor-pointer" />
             <Linkedin size={18} className="hover:text-white cursor-pointer" />
           </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 flex flex-col md:flex-row justify-between items-center text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-black">
           <div>© 2026 {settings.agencyName}. All rights reserved.</div>
           <Button variant="ghost" className="h-auto p-0 text-white bg-blue-600 px-6 py-2 rounded-full text-[10px] hover:bg-blue-500">
              Schedule time with me powered by Calendly
           </Button>
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

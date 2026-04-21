import { Section, PageHero } from '@/components/shared/Section';
import { motion } from 'motion/react';
import { Bot, MessageSquare, LineChart, FileText, Share2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: <Bot size={40} className="text-[var(--color-brand-primary)]" />,
    title: "AI Concierge Systems",
    desc: "Autonomous agents that qualify leads, answer property inquiries, and book viewings 24/7 without human intervention."
  },
  {
    icon: <LineChart size={40} className="text-[var(--color-brand-primary)]" />,
    title: "Predictive Analytics",
    desc: "Advanced ML models that predict property value trends and identify high-value investment triggers before the market."
  },
  {
    icon: <MessageSquare size={40} className="text-[var(--color-brand-primary)]" />,
    title: "Multilingual Support",
    desc: "Communicate with international investors in over 50 languages with native-level fluency and cultural context."
  },
  {
    icon: <FileText size={40} className="text-[var(--color-brand-primary)]" />,
    title: "Smart Contracts & Docs",
    desc: "Automated document extraction and contract generation to reduce administrative overhead and errors."
  },
  {
    icon: <Share2 size={40} className="text-[var(--color-brand-primary)]" />,
    title: "Dynamic Ad Optimization",
    desc: "AI-driven marketing that adjusts property highlights and targeting real-time based on viewer engagement data."
  },
  {
    icon: <Search size={40} className="text-[var(--color-brand-primary)]" />,
    title: "Intelligent Search",
    desc: "Semantic search capabilities for your portfolio that understands natural language like 'family home with sunset views'."
  }
];

export default function Services() {
  return (
    <div>
      <PageHero 
        title="Solutions for a New Era."
        subtitle="Unleash the power of agentic AI across your entire property portfolio."
      />

      <Section className="bg-black">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-12 rounded-[40px] hover:bg-white/10 transition-all border-white/5"
            >
              <div className="mb-8">{service.icon}</div>
              <h3 className="text-3xl font-display font-bold mb-6 italic">{service.title}</h3>
              <p className="text-zinc-400 leading-relaxed mb-8">{service.desc}</p>
              <Button variant="link" className="p-0 text-[var(--color-brand-primary)] hover:text-white group">
                Learn more <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Button>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-zinc-950 pb-40">
        <div className="relative overflow-hidden bg-gradient-to-br from-[var(--color-brand-primary)]/10 to-[var(--color-brand-secondary)]/10 rounded-[60px] p-12 md:p-24 border border-white/10 text-center">
            <h2 className="text-4xl md:text-7xl font-display font-bold mb-10 max-w-4xl mx-auto tracking-tighter italic">Ready to deploy your first <span className="gradient-text">AI Agent?</span></h2>
            <Button size="lg" className="bg-white text-black hover:bg-zinc-200 rounded-full h-16 px-12 text-xl font-bold">
              Book a Strategy Call
            </Button>
            
            {/* Visual Flair */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-[var(--color-brand-primary)] opacity-10 blur-[100px]" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[var(--color-brand-secondary)] opacity-10 blur-[100px]" />
        </div>
      </Section>
    </div>
  );
}

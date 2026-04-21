import { motion } from 'motion/react';
import { Section, PageHero } from '@/components/shared/Section';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div>
      <PageHero 
        title="Connect with Excellence."
        subtitle="Schedule a consultation with our AI strategists to discuss how autonomous agents can scale your property portfolio."
      />

      <Section className="bg-black pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <div>
              <h2 className="text-4xl font-display font-bold mb-6 italic">Direct Consultation</h2>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
                Our team handles a limited number of premium partnerships per quarter to ensure white-glove service.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-6 p-8 glass-card rounded-3xl">
                <div className="w-12 h-12 rounded-2xl bg-[var(--color-brand-primary)]/10 flex items-center justify-center shrink-0">
                  <Mail className="text-[var(--color-brand-primary)]" size={24} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Email Us</div>
                  <div className="text-xl font-bold font-display">concierge@aipremier.com</div>
                </div>
              </div>

              <div className="flex items-start gap-6 p-8 glass-card rounded-3xl">
                <div className="w-12 h-12 rounded-2xl bg-[var(--color-brand-primary)]/10 flex items-center justify-center shrink-0">
                  <Phone className="text-[var(--color-brand-primary)]" size={24} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Call Us</div>
                  <div className="text-xl font-bold font-display">+1 (555) AI-PREMIER</div>
                </div>
              </div>

              <div className="flex items-start gap-6 p-8 glass-card rounded-3xl">
                <div className="w-12 h-12 rounded-2xl bg-[var(--color-brand-primary)]/10 flex items-center justify-center shrink-0">
                  <MapPin className="text-[var(--color-brand-primary)]" size={24} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Headquarters</div>
                  <div className="text-xl font-bold font-display">Silicon Valley, CA</div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-12 rounded-[40px] border-white/5 relative">
            <h2 className="text-3xl font-display font-bold mb-8">Inquiry Form</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2">Full Name</label>
                  <input className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-[var(--color-brand-primary)] transition-all" placeholder="John Wick" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2">Agency Name</label>
                  <input className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-[var(--color-brand-primary)] transition-all" placeholder="Continental Real Estate" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2">Service Interest</label>
                <select className="w-full bg-black border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-[var(--color-brand-primary)] transition-all appearance-none text-zinc-400">
                  <option>Autonomous Agents</option>
                  <option>Predictive Market Analysis</option>
                  <option>Strategic AI Advisory</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2">Message</label>
                <textarea rows={5} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-[var(--color-brand-primary)] transition-all resize-none" placeholder="Tell us about your portfolio and goals..." />
              </div>

              <Button className="w-full bg-white text-black font-bold h-16 rounded-2xl text-lg hover:bg-zinc-200 group">
                Send Inquiry <Send size={20} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </form>

            {/* Background Flair inside card */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-brand-primary)] opacity-5 blur-[60px] rounded-full" />
          </div>
        </div>
      </Section>
    </div>
  );
}

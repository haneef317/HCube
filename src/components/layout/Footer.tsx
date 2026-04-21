import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin, Cpu } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] flex items-center justify-center">
                <Cpu className="text-black" size={20} />
              </div>
              <span className="text-lg font-display font-bold tracking-tight">AI PREMIER</span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
              Transforming the real estate industry through advanced AI solutions and strategic automation. Premium services for high-end agencies.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[var(--color-brand-primary)] hover:text-black transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[var(--color-brand-primary)] hover:text-black transition-all">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[var(--color-brand-primary)] hover:text-black transition-all">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-zinc-400 hover:text-white transition-colors text-sm">Home</Link></li>
              <li><Link to="/about" className="text-zinc-400 hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link to="/services" className="text-zinc-400 hover:text-white transition-colors text-sm">Our Services</Link></li>
              <li><Link to="/blog" className="text-zinc-400 hover:text-white transition-colors text-sm">Research Lab (Blog)</Link></li>
              <li><Link to="/contact" className="text-zinc-400 hover:text-white transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-zinc-400 text-sm">
                <MapPin className="text-[var(--color-brand-primary)] shrink-0" size={18} />
                <span>123 AI Boulevard, Silicon Valley, CA 94025</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-400 text-sm">
                <Phone className="text-[var(--color-brand-primary)] shrink-0" size={18} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-400 text-sm">
                <Mail className="text-[var(--color-brand-primary)] shrink-0" size={18} />
                <span>concierge@aipremier.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6">Newsletter</h3>
            <p className="text-zinc-400 text-sm mb-4">Subscribe to our AI research reports for real estate.</p>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-brand-primary)] transition-colors"
                required
              />
              <button className="bg-white text-black font-bold py-3 rounded-lg text-sm hover:bg-zinc-200 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-500 text-xs">
            © {currentYear} AI Premier Agency. All rights reserved.
          </p>
          <div className="flex gap-8 text-xs text-zinc-500">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <Link to="/admin/login" className="hover:text-white opacity-20 hover:opacity-100">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

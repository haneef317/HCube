import { useState, useEffect } from 'react';
import { Section, PageHero } from '@/components/shared/Section';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db, handleFirestoreError } from '@/lib/firebase';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

export default function Portfolio() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const q = query(
          collection(db, 'blogPosts'),
          where('published', '==', true),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (docs.length > 0) {
          setProjects(docs);
        } else {
          throw new Error("No projects found");
        }
      } catch (error) {
        // Fallback to high-end dummy projects
        setProjects([
          {
            id: '1',
            title: 'NeuralSaaS Evolution',
            excerpt: 'A comprehensive overhaul of a FinTech SaaS, integrating real-time data orchestration and mobile-first design.',
            category: 'Web Development',
            author: 'HCube Core',
            imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
            createdAt: new Date().toISOString()
          },
          {
            id: '2',
            title: 'Autonomous Sales Agent X',
            excerpt: 'Deploying custom LLM-based agents to handle 10k+ monthly leads with 98% accuracy in discovery.',
            category: 'AI Agents',
            author: 'HCube AI',
            imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2664&auto=format&fit=crop',
            createdAt: new Date().toISOString()
          },
          {
            id: '3',
            title: 'Global Search Dominance',
            excerpt: 'Strategic SEO scaling for a multinational e-commerce brand, achieving 400% organic growth in 6 months.',
            category: 'Strategic SEO',
            author: 'HCube Ops',
            imageUrl: 'https://images.unsplash.com/photo-1551288049-bbda4865c71a?q=80&w=2670&auto=format&fit=crop',
            createdAt: new Date().toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
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
            Proof of <span className="text-[var(--color-brand-primary)]">Performance.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-zinc-500 font-light max-w-2xl"
          >
            Architecting digital ecosystems that redefine scale. Explore our recent deployments across development, intelligence, and visibility.
          </motion.p>
        </div>
      </Section>

      <Section className="pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-[400px] w-full rounded-3xl bg-white/5" />
                <Skeleton className="h-8 w-3/4 bg-white/5" />
              </div>
            ))
          ) : (
            projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <Link to={`/portfolio/${project.id}`}>
                  <div className="relative h-[500px] rounded-[40px] overflow-hidden mb-8 bg-zinc-900">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-60 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute top-8 left-8">
                      <span className="px-4 py-2 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-white border border-white/10">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <h2 className="text-3xl font-display font-bold mb-4 italic group-hover:text-[var(--color-brand-primary)] transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-6 font-light">
                    {project.excerpt}
                  </p>
                  <div className="flex items-center gap-2 font-bold text-white text-[10px] uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                    Initialize Overview <ArrowRight size={14} className="text-[var(--color-brand-primary)]" />
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </Section>
    </div>
  );
}

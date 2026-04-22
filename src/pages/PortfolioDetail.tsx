import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Section } from '@/components/shared/Section';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PortfolioDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const docRef = doc(db, 'blogPosts', id!);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          setProject({ id: snapshot.id, ...snapshot.data() });
        } else {
          // Dummy project fallback based on ID or defaults
          const dummies: Record<string, any> = {
            '1': {
                title: 'NeuralSaaS Evolution',
                content: `
# Architectural Transformation

Our objective was to re-engineer a legacy FinTech platform into a high-performance, mobile-first PWA.

## Execution Strategy

- **Real-time Synchronization**: Implementing low-latency data layers for market fluctuations.
- **Micro-interactions**: Enhancing user retention through tactile UI feedback.
- **Scalable Infrastructure**: Migration to an edge-focused deployment model.

> "The result was a 400% improvement in load times and a 60% increase in user session duration."
                `,
                category: 'Web Development',
                author: 'HCube Core',
                imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
                createdAt: new Date().toISOString()
            }
          };

          setProject(dummies[id!] || {
            title: 'Project Intelligence Overview',
            content: '# Detailed Analysis Pending\n\nThis project demonstrates our commitment to technical excellence and design precision.',
            category: 'Case Study',
            author: 'HCube Ops',
            imageUrl: 'https://images.unsplash.com/photo-1551288049-bbda4865c71a?q=80&w=2670&auto=format&fit=crop',
            createdAt: new Date().toISOString()
          });
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [id]);

  if (loading) return <div className="pt-40 text-center text-zinc-500 uppercase tracking-widest font-black text-xs">Accessing project archives...</div>;

  return (
    <div className="bg-[#050505] min-h-screen pb-40">
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white mb-12 group transition-colors uppercase text-[10px] font-black tracking-widest">
            <ArrowLeft size={14} className="text-[var(--color-brand-primary)] group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end"
          >
            <div>
                <div className="flex items-center gap-4 mb-8">
                <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-[var(--color-brand-primary)]">
                    {project.category}
                </span>
                </div>
                <h1 className="text-5xl md:text-8xl font-display font-bold mb-8 leading-tight italic tracking-tighter">
                {project.title}
                </h1>
            </div>
            <div className="flex flex-col gap-6 border-l border-white/10 pl-10 pb-4">
                <div className="space-y-1">
                    <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Deployment Date</div>
                    <div className="text-white font-display italic font-bold">{format(new Date(project.createdAt), 'MMMM yyyy')}</div>
                </div>
                <div className="space-y-1">
                    <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Lead Unit</div>
                    <div className="text-white font-display italic font-bold">{project.author}</div>
                </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="px-6 mb-32">
         <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-7xl mx-auto h-[70vh] rounded-[60px] overflow-hidden border border-white/10"
         >
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
         </motion.div>
      </div>

      <Section className="py-0">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-invert prose-brand lg:prose-xl max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:italic prose-p:text-zinc-400 prose-p:font-light prose-blockquote:border-[var(--color-brand-primary)] prose-blockquote:bg-white/5 prose-blockquote:p-10 prose-blockquote:rounded-[40px] prose-strong:text-white">
            <ReactMarkdown>{project.content}</ReactMarkdown>
          </div>
        </div>
      </Section>
    </div>
  );
}

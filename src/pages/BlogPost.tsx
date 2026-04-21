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

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const docRef = doc(db, 'blogPosts', id!);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          setPost({ id: snapshot.id, ...snapshot.data() });
        } else {
          // Dummy data fallback
          setPost({
            title: 'The Impact of Generative AI on Real Estate Marketing',
            content: `
# Artificial Intelligence in High-End Real Estate

The luxury real estate market is undergoes a profound transformation. As AI evolves from simple automation to **agentic reasoning**, the way high-value properties are marketed and sold is changing forever.

## The Rise of the AI Concierge

Gone are the days of simple chatbots. Modern agents are powered by large language models that can understand not just the property specs, but the emotional nuance of a buyer's request.

- **24/7 Availability**: Instant responses to global inquiries.
- **Deep Personalization**: Tailoring property highlights to specific buyer profiles.
- **Data-Driven Insights**: Predicting buyer intent through behavior analysis.

## Market Trends

Recent research suggests that agencies adopting AI agents early are seeing a **40% increase** in lead qualification efficiency.

> "AI is not just a tool; it's a strategic partner in the luxury experience." — Dr. Alexander Thorne
            `,
            category: 'AI Research',
            author: 'Dr. Alexander Thorne',
            imageUrl: 'https://picsum.photos/seed/realestate/1200/800',
            createdAt: new Date().toISOString()
          });
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  if (loading) return <div className="pt-40 text-center">Loading...</div>;

  return (
    <div className="pt-32 pb-40">
      <Section className="py-0">
        <Link to="/blog" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-12 group transition-colors">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Intelligence Lab
        </Link>
        
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-[var(--color-brand-primary)]">
                {post.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-7xl font-display font-bold mb-8 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-8 text-zinc-500 font-bold uppercase tracking-widest text-[10px] mb-12 border-y border-white/10 py-6">
              <div className="flex items-center gap-2">
                 <Calendar size={14} className="text-[var(--color-brand-primary)]" />
                 <span>{format(new Date(post.createdAt), 'MMMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2">
                 <User size={14} className="text-[var(--color-brand-primary)]" />
                 <span>{post.author}</span>
              </div>
              <div className="ml-auto flex gap-4">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/5">
                  <Share2 size={16} />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      <div className="container mx-auto px-6 mb-20">
         <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full h-[60vh] rounded-[60px] overflow-hidden"
         >
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
         </motion.div>
      </div>

      <Section className="py-0">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-invert prose-brand lg:prose-xl max-w-none prose-headings:font-display prose-headings:font-bold prose-p:text-zinc-400 prose-blockquote:border-[var(--color-brand-primary)] prose-blockquote:bg-white/5 prose-blockquote:p-8 prose-blockquote:rounded-3xl prose-strong:text-white">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      </Section>
    </div>
  );
}

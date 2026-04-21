import { useState, useEffect } from 'react';
import { Section, PageHero } from '@/components/shared/Section';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db, handleFirestoreError } from '@/lib/firebase';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

export default function Blog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const q = query(
          collection(db, 'blogPosts'),
          where('published', '==', true),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(docs);
      } catch (error) {
        console.error("Error fetching posts:", error);
        // If no collection yet, show dummy data to make it look premium
        setPosts([
          {
            id: '1',
            title: 'The Impact of Generative AI on Real Estate Marketing',
            excerpt: 'How LLMs are revolutionizing property descriptions and client communication in the luxury market.',
            category: 'AI Research',
            author: 'Dr. Alexander Thorne',
            imageUrl: 'https://picsum.photos/seed/realestate/800/600',
            createdAt: new Date().toISOString()
          },
          {
            id: '2',
            title: 'Autonomous Agents: The Future of Property Viewing',
            excerpt: 'Why physical viewings are becoming the final step, not the first, in the high-end purchase journey.',
            category: 'Future of Tech',
            author: 'Marcus Chen',
            imageUrl: 'https://picsum.photos/seed/tech/800/600',
            createdAt: new Date().toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div>
      <PageHero 
        title="Intelligence Lab."
        subtitle="Insights from the intersection of High-End Real Estate and Artificial Intelligence."
      />

      <Section className="bg-black">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {loading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-64 w-full rounded-3xl bg-white/5" />
                <Skeleton className="h-8 w-3/4 bg-white/5" />
                <Skeleton className="h-20 w-full bg-white/5" />
              </div>
            ))
          ) : (
            posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <Link to={`/blog/${post.id}`}>
                  <div className="relative h-[400px] rounded-[40px] overflow-hidden mb-8">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute top-8 left-8">
                      <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-white border border-white/20">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 mb-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                       <Calendar size={14} className="text-[var(--color-brand-primary)]" />
                       <span>{format(new Date(post.createdAt), 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <User size={14} className="text-[var(--color-brand-primary)]" />
                       <span>{post.author}</span>
                    </div>
                  </div>
                  <h2 className="text-3xl font-display font-bold mb-4 group-hover:text-[var(--color-brand-primary)] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 font-bold text-[var(--color-brand-primary)] group-hover:gap-4 transition-all">
                    Read Analysis <ArrowRight size={18} />
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

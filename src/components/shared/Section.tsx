import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section 
      id={id} 
      className={cn("py-24 md:py-32 overflow-hidden", className)}
    >
      <div className="container mx-auto px-6">
        {children}
      </div>
    </section>
  );
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  gradient?: boolean;
}

export function PageHero({ title, subtitle, gradient = true }: PageHeroProps) {
  return (
    <Section className="pt-40 pb-20 bg-gradient-to-b from-black to-zinc-950">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl"
      >
        <h1 className={cn(
          "text-5xl md:text-8xl font-display font-bold tracking-tight mb-8 leading-[1.1]",
          gradient && "gradient-text"
        )}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        )}
      </motion.div>
    </Section>
  );
}

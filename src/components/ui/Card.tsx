import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={hover ? { y: -6 } : {}}
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ${
        hover ? 'hover:shadow-xl hover:shadow-peach-900/10 hover:border-peach-200 transition-all duration-300' : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}

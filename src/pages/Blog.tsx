import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Tag } from 'lucide-react';
import Card from '../components/ui/Card';
import { Article } from '../types';

export default function Blog() {
  const [articles, setArticles] = useState<Article[]>([]);

  const [banner, setBanner] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/banners/artikel`)
      .then(res => res.json())
      .then(data => {
        if (data && data.banner_url) setBanner(data.banner_url);
      });
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/articles`)
      .then(res => res.json())
      .then(data => {
        const mapped = data.map((a: any) => ({
          id: a.id.toString(),
          title: a.title,
          excerpt: a.content.substring(0, 150) + '...',
          coverImage: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=600',
          author: a.author,
          publishedDate: a.created_at,
          category: 'Artikel',
          slug: a.id.toString()
        }));
        if (mapped.length > 0) setArticles(mapped);
      });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: banner ? `url(${banner})` : 'none' }}>
           {!banner && <div className="absolute inset-0 bg-gradient-to-r from-peach-300 to-peach-100" />}
           <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Artikel & Blog
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Inspirasi, tips, dan panduan seputar dunia literasi dan penerbitan
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card hover className="h-full flex flex-col">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1 bg-peach-100 text-peach-700 text-xs px-2 py-1 rounded-full">
                        <Tag className="h-3 w-3" />
                        {article.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{article.publishedDate}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

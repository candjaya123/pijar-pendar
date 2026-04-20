import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ShoppingBag, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import SectionTitle from '../components/ui/SectionTitle';
import { Book } from '../types';

export default function Store() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [sortBy, setSortBy] = useState<'title-asc' | 'title-desc' | 'price-asc' | 'price-desc'>('title-asc');

  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/books`)
      .then(res => res.json())
      .then(data => {
        const mapped = data.map((b: any) => ({
          id: b.id.toString(),
          title: b.title,
          author: b.author,
          category: b.category,
          price: b.price,
          coverImage: b.cover_image || 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: b.description,
          whatsappLink: b.whatsapp_link || `https://wa.me/6281234567890?text=Saya%20ingin%20pesan%20buku%20${encodeURIComponent(b.title)}`,
          shopeeLink: b.shopee_link || 'https://shopee.co.id',
          tokopediaLink: b.tokopedia_link
        }));
        setAllBooks(mapped);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching books:', err);
        setLoading(false);
      });
  }, []);

  const [banner, setBanner] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/banners/katalog`)
      .then(res => res.json())
      .then(data => {
        if (data && data.banner_url) setBanner(data.banner_url);
      });
  }, []);

  const categories = ['Semua', ...Array.from(new Set(allBooks.map(book => book.category)))];

  const filteredAndSortedBooks = useMemo(() => {
    let filtered = allBooks;

    if (searchQuery) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'Semua') {
      filtered = filtered.filter(book => book.category === selectedCategory);
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        default:
          return 0;
      }
    });

    return sorted;
  }, [searchQuery, selectedCategory, sortBy, allBooks]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: banner ? `url(${banner})` : 'none' }}>
           {!banner && <div className="absolute inset-0 bg-gradient-to-r from-peach-300 to-peach-100" />}
           <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Katalog Buku
            </h1>
            <p className="text-xl text-gray-700">
              Koleksi lengkap buku berkualitas dari berbagai kategori
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari judul atau penulis..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-peach-200 focus:border-peach-200 outline-none"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-peach-200 focus:border-peach-200 outline-none appearance-none bg-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'Semua' ? 'Semua Kategori' : category}
                    </option>
                  ))}
                </select>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-peach-200 focus:border-peach-200 outline-none appearance-none bg-white"
              >
                <option value="title-asc">Judul: A-Z</option>
                <option value="title-desc">Judul: Z-A</option>
                <option value="price-asc">Harga: Rendah ke Tinggi</option>
                <option value="price-desc">Harga: Tinggi ke Rendah</option>
              </select>
            </div>
          </div>

          <div className="mb-4 text-gray-600">
            Menampilkan {filteredAndSortedBooks.length} dari {allBooks.length} buku
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-peach-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Memuat katalog...</p>
            </div>
          ) : filteredAndSortedBooks.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Tidak ada buku ditemukan
              </h3>
              <p className="text-gray-500">
                Coba ubah kata kunci pencarian atau filter
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredAndSortedBooks.map((book) => (
                <Card key={book.id} hover>
                  {/* Clickable image & title area → goes to detail page */}
                  <Link to={`/katalog/${book.id}`} className="block">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-64 object-cover hover:opacity-90 transition-opacity"
                    />
                    <div className="px-4 pt-4 pb-2">
                      <span className="inline-block bg-peach-100 text-peach-700 text-xs px-2 py-1 rounded-full mb-2">
                        {book.category}
                      </span>
                      <h3 className="font-semibold text-lg mb-1 line-clamp-2 hover:text-peach-700 transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                      <p className="text-peach-700 font-bold text-xl mb-3">
                        Rp {book.price.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </Link>
                  {/* Order buttons stay outside Link to avoid nested anchor */}
                  <div className="px-4 pb-4 space-y-2">
                    <a
                      href={book.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full block"
                    >
                      <Button
                        variant="primary"
                        size="sm"
                        className="w-full flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Pesan di WA
                      </Button>
                    </a>
                    <a
                      href={book.shopeeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full block"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full flex items-center justify-center gap-2"
                      >
                        <ShoppingBag className="h-4 w-4" />
                        Pesan di Shopee
                      </Button>
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
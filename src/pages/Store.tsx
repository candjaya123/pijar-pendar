import { useState, useMemo } from 'react';
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

  const allBooks: Book[] = [
    {
      id: '1',
      title: 'Pendidikan Karakter di Era Digital',
      author: 'Dr. Ahmad Sutanto',
      category: 'Pendidikan',
      price: 85000,
      coverImage: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Implementasi pendidikan karakter dalam pembelajaran modern',
      whatsappLink: 'https://wa.me/6281234567890?text=Saya%20ingin%20pesan%20buku%20Pendidikan%20Karakter',
      shopeeLink: 'https://shopee.co.id'
    },
    {
      id: '2',
      title: 'Manajemen Keuangan Syariah',
      author: 'Prof. Budi Santoso',
      category: 'Ekonomi',
      price: 95000,
      coverImage: 'https://images.pexels.com/photos/256520/pexels-photo-256520.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Panduan lengkap manajemen keuangan berbasis syariah',
      whatsappLink: 'https://wa.me/6281234567890?text=Saya%20ingin%20pesan%20buku%20Manajemen%20Keuangan',
      shopeeLink: 'https://shopee.co.id'
    },
    {
      id: '3',
      title: 'Psikologi Perkembangan Anak',
      author: 'Dr. Siti Nurhaliza',
      category: 'Psikologi',
      price: 78000,
      coverImage: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Memahami tahapan perkembangan psikologi anak usia dini',
      whatsappLink: 'https://wa.me/6281234567890?text=Saya%20ingin%20pesan%20buku%20Psikologi%20Anak',
      shopeeLink: 'https://shopee.co.id'
    },
    {
      id: '4',
      title: 'Digital Marketing untuk UMKM',
      author: 'Andi Wijaya, S.Kom',
      category: 'Bisnis',
      price: 120000,
      coverImage: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Strategi pemasaran digital yang efektif untuk bisnis kecil',
      whatsappLink: 'https://wa.me/6281234567890?text=Saya%20ingin%20pesan%20buku%20Digital%20Marketing',
      shopeeLink: 'https://shopee.co.id'
    },
    {
      id: '5',
      title: 'Metodologi Penelitian Kualitatif',
      author: 'Prof. Dr. Rahman',
      category: 'Penelitian',
      price: 110000,
      coverImage: 'https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Panduan lengkap metodologi penelitian kualitatif',
      whatsappLink: 'https://wa.me/6281234567890?text=Saya%20ingin%20pesan%20buku%20Metodologi%20Penelitian',
      shopeeLink: 'https://shopee.co.id'
    },
    {
      id: '6',
      title: 'Kepemimpinan Transformasional',
      author: 'Dr. Hendra Gunawan',
      category: 'Manajemen',
      price: 92000,
      coverImage: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Konsep dan praktik kepemimpinan transformasional',
      whatsappLink: 'https://wa.me/6281234567890?text=Saya%20ingin%20pesan%20buku%20Kepemimpinan',
      shopeeLink: 'https://shopee.co.id'
    },
    {
      id: '7',
      title: 'Sastra Indonesia Modern',
      author: 'Dewi Lestari, M.Hum',
      category: 'Sastra',
      price: 75000,
      coverImage: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Analisis karya sastra Indonesia kontemporer',
      whatsappLink: 'https://wa.me/6281234567890?text=Saya%20ingin%20pesan%20buku%20Sastra%20Indonesia',
      shopeeLink: 'https://shopee.co.id'
    },
    {
      id: '8',
      title: 'Teknologi Informasi dalam Pendidikan',
      author: 'Ir. Bambang Sutrisno',
      category: 'Teknologi',
      price: 98000,
      coverImage: 'https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Implementasi teknologi informasi dalam dunia pendidikan',
      whatsappLink: 'https://wa.me/6281234567890?text=Saya%20ingin%20pesan%20buku%20Teknologi%20Informasi',
      shopeeLink: 'https://shopee.co.id'
    },
    {
      id: '9',
      title: 'Hukum Bisnis Indonesia',
      author: 'Prof. Dr. Susanto, S.H.',
      category: 'Hukum',
      price: 135000,
      coverImage: 'https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Aspek hukum dalam berbisnis di Indonesia',
      whatsappLink: 'https://wa.me/6281234567890?text=Saya%20ingin%20pesan%20buku%20Hukum%20Bisnis',
      shopeeLink: 'https://shopee.co.id'
    },
    {
      id: '10',
      title: 'Filsafat Pendidikan',
      author: 'Dr. Yusuf Hidayat',
      category: 'Pendidikan',
      price: 88000,
      coverImage: 'https://images.pexels.com/photos/415071/pexels-photo-415071.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Pemikiran filosofis dalam dunia pendidikan',
      whatsappLink: 'https://wa.me/6281234567890?text=Saya%20ingin%20pesan%20buku%20Filsafat%20Pendidikan',
      shopeeLink: 'https://shopee.co.id'
    },
    {
      id: '11',
      title: 'Akuntansi Manajemen',
      author: 'Dra. Sri Wahyuni, M.Ak',
      category: 'Ekonomi',
      price: 105000,
      coverImage: 'https://images.pexels.com/photos/7092611/pexels-photo-7092611.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Konsep dan aplikasi akuntansi manajemen',
      whatsappLink: 'https://wa.me/6281234567890?text=Saya%20ingin%20pesan%20buku%20Akuntansi%20Manajemen',
      shopeeLink: 'https://shopee.co.id'
    },
    {
      id: '12',
      title: 'Komunikasi Organisasi',
      author: 'Dr. Rina Melati',
      category: 'Komunikasi',
      price: 82000,
      coverImage: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Teori dan praktik komunikasi dalam organisasi',
      whatsappLink: 'https://wa.me/6281234567890?text=Saya%20ingin%20pesan%20buku%20Komunikasi%20Organisasi',
      shopeeLink: 'https://shopee.co.id'
    }
  ];

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
      <section className="bg-gradient-to-r from-peach-200 to-peach-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          {filteredAndSortedBooks.length === 0 ? (
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
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <span className="inline-block bg-peach-100 text-peach-700 text-xs px-2 py-1 rounded-full mb-2">
                      {book.category}
                    </span>
                    <h3 className="font-semibold text-lg mb-1 line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">{book.author}</p>
                    <p className="text-peach-700 font-bold text-xl mb-4">
                      Rp {book.price.toLocaleString('id-ID')}
                    </p>
                    <div className="space-y-2">
                      <a
                        href={book.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
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
                        className="w-full"
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

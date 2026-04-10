import { motion } from 'framer-motion';
import { Calendar, User, Tag } from 'lucide-react';
import Card from '../components/ui/Card';
import { Article } from '../types';

export default function Blog() {
  const articles: Article[] = [
    {
      id: '1',
      title: 'Tips Menulis Buku untuk Pemula',
      excerpt: 'Panduan lengkap memulai menulis buku pertama Anda dengan langkah-langkah praktis dan mudah dipahami.',
      coverImage: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=600',
      author: 'Ahmad Sutanto',
      publishedDate: '15 Maret 2026',
      category: 'Tips Menulis',
      slug: 'tips-menulis-buku-pemula'
    },
    {
      id: '2',
      title: 'Pentingnya ISBN dalam Penerbitan Buku',
      excerpt: 'Mengapa ISBN penting untuk buku Anda dan bagaimana cara mendapatkannya dengan mudah.',
      coverImage: 'https://images.pexels.com/photos/256520/pexels-photo-256520.jpeg?auto=compress&cs=tinysrgb&w=600',
      author: 'Budi Santoso',
      publishedDate: '10 Maret 2026',
      category: 'Penerbitan',
      slug: 'pentingnya-isbn'
    },
    {
      id: '3',
      title: 'Cara Membuat Cover Buku yang Menarik',
      excerpt: 'Desain cover yang baik dapat meningkatkan penjualan buku. Simak tips lengkapnya di sini.',
      coverImage: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600',
      author: 'Siti Nurhaliza',
      publishedDate: '5 Maret 2026',
      category: 'Desain',
      slug: 'cover-buku-menarik'
    },
    {
      id: '4',
      title: 'Strategi Marketing Buku di Era Digital',
      excerpt: 'Pelajari strategi efektif untuk memasarkan buku Anda di platform digital dan media sosial.',
      coverImage: 'https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=600',
      author: 'Andi Wijaya',
      publishedDate: '28 Februari 2026',
      category: 'Marketing',
      slug: 'marketing-buku-digital'
    },
    {
      id: '5',
      title: 'Mengubah Skripsi Menjadi Buku Populer',
      excerpt: 'Panduan praktis mengkonversi karya tulis ilmiah menjadi buku yang menarik untuk dibaca.',
      coverImage: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600',
      author: 'Rahman Abdullah',
      publishedDate: '20 Februari 2026',
      category: 'Tips Menulis',
      slug: 'skripsi-jadi-buku'
    },
    {
      id: '6',
      title: 'Hak Cipta dan Perlindungan Karya Tulis',
      excerpt: 'Memahami pentingnya melindungi karya tulis Anda melalui hak cipta dan HKI.',
      coverImage: 'https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&w=600',
      author: 'Dewi Lestari',
      publishedDate: '15 Februari 2026',
      category: 'Hukum',
      slug: 'hak-cipta-karya'
    },
    {
      id: '7',
      title: 'Membangun Kebiasaan Menulis Konsisten',
      excerpt: 'Tips praktis membangun rutinitas menulis yang konsisten dan produktif setiap hari.',
      coverImage: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=600',
      author: 'Yusuf Hidayat',
      publishedDate: '8 Februari 2026',
      category: 'Tips Menulis',
      slug: 'kebiasaan-menulis'
    },
    {
      id: '8',
      title: 'Peran Editor dalam Proses Penerbitan',
      excerpt: 'Mengapa editor penting dalam proses penerbitan dan bagaimana bekerja sama dengan mereka.',
      coverImage: 'https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg?auto=compress&cs=tinysrgb&w=600',
      author: 'Rina Melati',
      publishedDate: '1 Februari 2026',
      category: 'Penerbitan',
      slug: 'peran-editor'
    },
    {
      id: '9',
      title: 'Self Publishing vs Penerbit Mayor',
      excerpt: 'Perbandingan lengkap antara self publishing dan penerbit mayor, beserta kelebihan dan kekurangannya.',
      coverImage: 'https://images.pexels.com/photos/415071/pexels-photo-415071.jpeg?auto=compress&cs=tinysrgb&w=600',
      author: 'Hendra Gunawan',
      publishedDate: '25 Januari 2026',
      category: 'Penerbitan',
      slug: 'self-publishing-vs-mayor'
    },
    {
      id: '10',
      title: 'Menulis Buku Anak yang Berkualitas',
      excerpt: 'Panduan lengkap menulis buku anak yang edukatif, menarik, dan sesuai dengan usia pembaca.',
      coverImage: 'https://images.pexels.com/photos/7092611/pexels-photo-7092611.jpeg?auto=compress&cs=tinysrgb&w=600',
      author: 'Sri Wahyuni',
      publishedDate: '18 Januari 2026',
      category: 'Tips Menulis',
      slug: 'menulis-buku-anak'
    },
    {
      id: '11',
      title: 'Riset Pasar Sebelum Menulis Buku',
      excerpt: 'Mengapa riset pasar penting dan bagaimana melakukannya sebelum menulis buku Anda.',
      coverImage: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600',
      author: 'Bambang Sutrisno',
      publishedDate: '10 Januari 2026',
      category: 'Marketing',
      slug: 'riset-pasar-buku'
    },
    {
      id: '12',
      title: 'Mengatasi Writers Block Secara Efektif',
      excerpt: 'Strategi ampuh mengatasi kebuntuan ide saat menulis dan kembali produktif.',
      coverImage: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600',
      author: 'Ahmad Sutanto',
      publishedDate: '5 Januari 2026',
      category: 'Tips Menulis',
      slug: 'mengatasi-writers-block'
    }
  ];

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

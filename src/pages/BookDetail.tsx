import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ShoppingBag, ChevronLeft, ChevronRight, Star, BookOpen, Hash, Calendar, Ruler, FileText, Package } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import SectionTitle from '../components/ui/SectionTitle';
import { Book } from '../types';

// Extended book type for detail page
interface BookDetail extends Book {
  isbn?: string;
  eIsbn?: string;
  publishedYear?: string;
  dimensions?: string;
  pages?: string;
  paper?: string;
  stock?: 'available' | 'soldout';
  fullDescription?: string;
  tableOfContents?: string[];
  additionalImages?: string[];
  categories?: string[];
  rating?: number;
  reviewCount?: number;
}

// Mock data - in real app this would come from an API/store
const allBooksDetail: BookDetail[] = [
  {
    id: '1',
    title: 'Pendidikan Karakter di Era Digital',
    author: 'Dr. Ahmad Sutanto',
    category: 'Pendidikan',
    categories: ['Pendidikan', 'Sosial', 'Umum'],
    price: 85000,
    coverImage: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=600',
    additionalImages: [
      'https://images.pexels.com/photos/256520/pexels-photo-256520.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    description: 'Implementasi pendidikan karakter dalam pembelajaran modern',
    fullDescription: 'Buku ini membahas konsep dan implementasi pendidikan karakter dalam era digital yang terus berkembang. Pembaca diajak memahami bagaimana membangun karakter generasi muda di tengah gempuran teknologi dan informasi digital.\n\nPembahasan dilanjutkan dengan berbagai strategi dan pendekatan yang dapat diterapkan oleh guru, orang tua, dan praktisi pendidikan untuk menanamkan nilai-nilai karakter yang kuat pada peserta didik.',
    tableOfContents: [
      'Konsep Pendidikan Karakter',
      'Tantangan Era Digital',
      'Strategi Implementasi',
      'Peran Guru dan Orang Tua',
      'Evaluasi Pendidikan Karakter',
      'Studi Kasus dan Praktik Terbaik',
    ],
    isbn: '978-623-xxx-xx-x',
    eIsbn: '978-623-xxx-xx-x',
    publishedYear: '2025',
    dimensions: '15,5 x 23 cm',
    pages: '± 180 hlm.',
    paper: 'HVS',
    stock: 'available',
    whatsappLink: 'https://wa.me/6281234567890?text=Saya%20ingin%20pesan%20buku%20Pendidikan%20Karakter',
    shopeeLink: 'https://shopee.co.id',
    rating: 4.8,
    reviewCount: 24,
  },
  {
    id: '2',
    title: 'Manajemen Keuangan Syariah',
    author: 'Prof. Budi Santoso',
    category: 'Ekonomi',
    categories: ['Ekonomi', 'Keuangan', 'Umum'],
    price: 95000,
    coverImage: 'https://images.pexels.com/photos/256520/pexels-photo-256520.jpeg?auto=compress&cs=tinysrgb&w=600',
    additionalImages: [
      'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    description: 'Panduan lengkap manajemen keuangan berbasis syariah',
    fullDescription: 'Buku ini menyajikan panduan lengkap mengenai manajemen keuangan berbasis prinsip syariah Islam. Mulai dari konsep dasar hingga penerapan praktis dalam kehidupan sehari-hari dan dunia bisnis modern.',
    tableOfContents: [
      'Prinsip Keuangan Syariah',
      'Akad dan Transaksi Halal',
      'Investasi Berbasis Syariah',
      'Perbankan Syariah',
      'Zakat, Infak, dan Sedekah',
      'Perencanaan Keuangan Keluarga',
    ],
    isbn: '978-623-xxx-xx-x',
    eIsbn: '978-623-xxx-xx-x',
    publishedYear: '2025',
    dimensions: '15,5 x 23 cm',
    pages: '± 220 hlm.',
    paper: 'HVS',
    stock: 'available',
    whatsappLink: 'https://wa.me/6281234567890?text=Saya%20ingin%20pesan%20buku%20Manajemen%20Keuangan',
    shopeeLink: 'https://shopee.co.id',
    rating: 4.9,
    reviewCount: 31,
  },
  {
    id: '3',
    title: 'Psikologi Perkembangan Anak',
    author: 'Dr. Siti Nurhaliza',
    category: 'Psikologi',
    categories: ['Psikologi', 'Pendidikan', 'Umum'],
    price: 78000,
    coverImage: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600',
    additionalImages: [
      'https://images.pexels.com/photos/415071/pexels-photo-415071.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    description: 'Memahami tahapan perkembangan psikologi anak usia dini',
    fullDescription: 'Buku ini mengupas tuntas tahapan perkembangan psikologi anak dari masa bayi hingga remaja. Disajikan dengan bahasa yang mudah dipahami oleh orang tua, guru, dan praktisi pendidikan.',
    tableOfContents: [
      'Perkembangan Kognitif',
      'Perkembangan Emosi',
      'Perkembangan Sosial',
      'Gangguan Perkembangan',
      'Stimulasi Optimal',
      'Peran Lingkungan',
    ],
    isbn: '978-623-xxx-xx-x',
    publishedYear: '2025',
    dimensions: '14 x 21 cm',
    pages: '± 160 hlm.',
    paper: 'HVS',
    stock: 'available',
    whatsappLink: 'https://wa.me/6281234567890?text=Saya%20ingin%20pesan%20buku%20Psikologi%20Anak',
    shopeeLink: 'https://shopee.co.id',
    rating: 4.7,
    reviewCount: 18,
  },
  {
    id: '4',
    title: 'Digital Marketing untuk UMKM',
    author: 'Andi Wijaya, S.Kom',
    category: 'Bisnis',
    categories: ['Bisnis', 'Teknologi', 'Umum'],
    price: 120000,
    coverImage: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600',
    additionalImages: [
      'https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    description: 'Strategi pemasaran digital yang efektif untuk bisnis kecil',
    fullDescription: 'Panduan praktis digital marketing khusus untuk pelaku UMKM Indonesia. Buku ini menyajikan strategi yang terbukti efektif meningkatkan penjualan melalui platform digital.',
    tableOfContents: [
      'Pengenalan Digital Marketing',
      'Media Sosial untuk Bisnis',
      'SEO dan Content Marketing',
      'Iklan Digital Berbayar',
      'E-commerce Strategy',
      'Analitik dan Pengukuran',
    ],
    isbn: '978-623-xxx-xx-x',
    publishedYear: '2026',
    dimensions: '15,5 x 23 cm',
    pages: '± 240 hlm.',
    paper: 'HVS',
    stock: 'available',
    whatsappLink: 'https://wa.me/6281234567890?text=Saya%20ingin%20pesan%20buku%20Digital%20Marketing',
    shopeeLink: 'https://shopee.co.id',
    rating: 4.9,
    reviewCount: 42,
  },
  {
    id: '5',
    title: 'Metodologi Penelitian Kualitatif',
    author: 'Prof. Dr. Rahman',
    category: 'Penelitian',
    categories: ['Penelitian', 'Pendidikan', 'Umum'],
    price: 110000,
    coverImage: 'https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=600',
    additionalImages: [],
    description: 'Panduan lengkap metodologi penelitian kualitatif',
    fullDescription: 'Buku referensi komprehensif untuk peneliti, mahasiswa, dan akademisi yang ingin memahami dan menerapkan metodologi penelitian kualitatif secara benar dan sistematis.',
    tableOfContents: [
      'Paradigma Penelitian Kualitatif',
      'Desain Penelitian',
      'Teknik Pengumpulan Data',
      'Analisis Data Kualitatif',
      'Keabsahan Data',
      'Penulisan Laporan',
    ],
    isbn: '978-623-xxx-xx-x',
    publishedYear: '2025',
    dimensions: '15,5 x 23 cm',
    pages: '± 280 hlm.',
    paper: 'HVS',
    stock: 'available',
    whatsappLink: 'https://wa.me/6281234567890?text=Saya%20ingin%20pesan%20buku%20Metodologi%20Penelitian',
    shopeeLink: 'https://shopee.co.id',
    rating: 4.8,
    reviewCount: 29,
  },
  {
    id: '6',
    title: 'Kepemimpinan Transformasional',
    author: 'Dr. Hendra Gunawan',
    category: 'Manajemen',
    categories: ['Manajemen', 'Bisnis', 'Umum'],
    price: 92000,
    coverImage: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600',
    additionalImages: [],
    description: 'Konsep dan praktik kepemimpinan transformasional',
    fullDescription: 'Buku ini membahas konsep kepemimpinan transformasional secara mendalam dan bagaimana penerapannya dalam konteks organisasi modern di Indonesia.',
    tableOfContents: [
      'Konsep Kepemimpinan',
      'Teori Kepemimpinan',
      'Gaya Kepemimpinan',
      'Kepemimpinan Transformasional',
      'Implementasi dalam Organisasi',
      'Studi Kasus',
    ],
    isbn: '978-623-xxx-xx-x',
    publishedYear: '2025',
    dimensions: '15,5 x 23 cm',
    pages: '± 200 hlm.',
    paper: 'HVS',
    stock: 'available',
    whatsappLink: 'https://wa.me/6281234567890?text=Saya%20ingin%20pesan%20buku%20Kepemimpinan',
    shopeeLink: 'https://shopee.co.id',
    rating: 4.6,
    reviewCount: 15,
  },
  {
    id: '7',
    title: 'Sastra Indonesia Modern',
    author: 'Dewi Lestari, M.Hum',
    category: 'Sastra',
    categories: ['Sastra', 'Sosial', 'Umum'],
    price: 75000,
    coverImage: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=600',
    additionalImages: [],
    description: 'Analisis karya sastra Indonesia kontemporer',
    fullDescription: 'Eksplorasi mendalam karya-karya sastra Indonesia kontemporer yang merefleksikan dinamika sosial, budaya, dan politik masyarakat Indonesia modern.',
    tableOfContents: [
      'Perkembangan Sastra Indonesia',
      'Aliran dan Genre',
      'Analisis Karya Pilihan',
      'Sastra dan Masyarakat',
      'Kritik Sastra',
    ],
    isbn: '978-623-xxx-xx-x',
    publishedYear: '2025',
    dimensions: '14 x 21 cm',
    pages: '± 150 hlm.',
    paper: 'HVS',
    stock: 'available',
    whatsappLink: 'https://wa.me/6281234567890?text=Saya%20ingin%20pesan%20buku%20Sastra%20Indonesia',
    shopeeLink: 'https://shopee.co.id',
    rating: 4.5,
    reviewCount: 11,
  },
  {
    id: '8',
    title: 'Teknologi Informasi dalam Pendidikan',
    author: 'Ir. Bambang Sutrisno',
    category: 'Teknologi',
    categories: ['Teknologi', 'Pendidikan', 'Umum'],
    price: 98000,
    coverImage: 'https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg?auto=compress&cs=tinysrgb&w=600',
    additionalImages: [],
    description: 'Implementasi teknologi informasi dalam dunia pendidikan',
    fullDescription: 'Panduan komprehensif penerapan teknologi informasi dalam sistem pendidikan modern, mulai dari e-learning hingga kecerdasan buatan dalam pembelajaran.',
    tableOfContents: [
      'Teknologi dalam Pendidikan',
      'E-Learning dan LMS',
      'Media Pembelajaran Digital',
      'AI dalam Pendidikan',
      'Evaluasi Digital',
    ],
    isbn: '978-623-xxx-xx-x',
    publishedYear: '2026',
    dimensions: '15,5 x 23 cm',
    pages: '± 210 hlm.',
    paper: 'HVS',
    stock: 'available',
    whatsappLink: 'https://wa.me/6281234567890?text=Saya%20ingin%20pesan%20buku%20Teknologi%20Informasi',
    shopeeLink: 'https://shopee.co.id',
    rating: 4.7,
    reviewCount: 20,
  },
  {
    id: '9',
    title: 'Hukum Bisnis Indonesia',
    author: 'Prof. Dr. Susanto, S.H.',
    category: 'Hukum',
    categories: ['Hukum', 'Bisnis', 'Umum'],
    price: 135000,
    coverImage: 'https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&w=600',
    additionalImages: [],
    description: 'Aspek hukum dalam berbisnis di Indonesia',
    fullDescription: 'Referensi lengkap aspek-aspek hukum yang wajib dipahami oleh pelaku bisnis di Indonesia, mulai dari pendirian usaha hingga penyelesaian sengketa bisnis.',
    tableOfContents: [
      'Hukum Perusahaan',
      'Hukum Kontrak',
      'Hukum Persaingan Usaha',
      'Hukum Ketenagakerjaan',
      'Penyelesaian Sengketa',
    ],
    isbn: '978-623-xxx-xx-x',
    publishedYear: '2025',
    dimensions: '15,5 x 23 cm',
    pages: '± 300 hlm.',
    paper: 'HVS',
    stock: 'available',
    whatsappLink: 'https://wa.me/6281234567890?text=Saya%20ingin%20pesan%20buku%20Hukum%20Bisnis',
    shopeeLink: 'https://shopee.co.id',
    rating: 4.8,
    reviewCount: 16,
  },
  {
    id: '10',
    title: 'Filsafat Pendidikan',
    author: 'Dr. Yusuf Hidayat',
    category: 'Pendidikan',
    categories: ['Pendidikan', 'Filsafat', 'Umum'],
    price: 88000,
    coverImage: 'https://images.pexels.com/photos/415071/pexels-photo-415071.jpeg?auto=compress&cs=tinysrgb&w=600',
    additionalImages: [],
    description: 'Pemikiran filosofis dalam dunia pendidikan',
    fullDescription: 'Eksplorasi mendalam tentang landasan filosofis pendidikan dan implikasinya bagi praktik pendidikan di Indonesia.',
    tableOfContents: [
      'Filsafat dan Pendidikan',
      'Aliran Filsafat Pendidikan',
      'Pendidikan Humanis',
      'Pendidikan Kritis',
      'Filsafat Pendidikan Indonesia',
    ],
    isbn: '978-623-xxx-xx-x',
    publishedYear: '2025',
    dimensions: '14 x 21 cm',
    pages: '± 170 hlm.',
    paper: 'HVS',
    stock: 'available',
    whatsappLink: 'https://wa.me/6281234567890?text=Saya%20ingin%20pesan%20buku%20Filsafat%20Pendidikan',
    shopeeLink: 'https://shopee.co.id',
    rating: 4.6,
    reviewCount: 13,
  },
  {
    id: '11',
    title: 'Akuntansi Manajemen',
    author: 'Dra. Sri Wahyuni, M.Ak',
    category: 'Ekonomi',
    categories: ['Ekonomi', 'Bisnis', 'Umum'],
    price: 105000,
    coverImage: 'https://images.pexels.com/photos/7092611/pexels-photo-7092611.jpeg?auto=compress&cs=tinysrgb&w=600',
    additionalImages: [],
    description: 'Konsep dan aplikasi akuntansi manajemen',
    fullDescription: 'Buku teks akuntansi manajemen yang disusun secara sistematis untuk membantu pembaca memahami konsep dan penerapannya dalam pengambilan keputusan bisnis.',
    tableOfContents: [
      'Konsep Akuntansi Manajemen',
      'Biaya dan Perilaku Biaya',
      'Anggaran dan Pengendalian',
      'Pengambilan Keputusan',
      'Kinerja dan Evaluasi',
    ],
    isbn: '978-623-xxx-xx-x',
    publishedYear: '2025',
    dimensions: '15,5 x 23 cm',
    pages: '± 260 hlm.',
    paper: 'HVS',
    stock: 'available',
    whatsappLink: 'https://wa.me/6281234567890?text=Saya%20ingin%20pesan%20buku%20Akuntansi%20Manajemen',
    shopeeLink: 'https://shopee.co.id',
    rating: 4.7,
    reviewCount: 22,
  },
  {
    id: '12',
    title: 'Komunikasi Organisasi',
    author: 'Dr. Rina Melati',
    category: 'Komunikasi',
    categories: ['Komunikasi', 'Manajemen', 'Umum'],
    price: 82000,
    coverImage: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600',
    additionalImages: [],
    description: 'Teori dan praktik komunikasi dalam organisasi',
    fullDescription: 'Buku ini menyajikan teori dan praktik komunikasi organisasi yang relevan dengan kondisi organisasi modern di Indonesia.',
    tableOfContents: [
      'Dasar Komunikasi Organisasi',
      'Komunikasi Internal',
      'Komunikasi Eksternal',
      'Komunikasi Krisis',
      'Teknologi dalam Komunikasi Organisasi',
    ],
    isbn: '978-623-xxx-xx-x',
    publishedYear: '2025',
    dimensions: '14 x 21 cm',
    pages: '± 190 hlm.',
    paper: 'HVS',
    stock: 'available',
    whatsappLink: 'https://wa.me/6281234567890?text=Saya%20ingin%20pesan%20buku%20Komunikasi%20Organisasi',
    shopeeLink: 'https://shopee.co.id',
    rating: 4.5,
    reviewCount: 17,
  },
];

type TabType = 'deskripsi' | 'informasi' | 'ulasan';

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const book = allBooksDetail.find(b => b.id === id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<TabType>('deskripsi');

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Buku tidak ditemukan</h2>
          <Link to="/katalog">
            <Button>Kembali ke Katalog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const allImages = [book.coverImage, ...(book.additionalImages || [])];
  const relatedBooks = allBooksDetail.filter(b => b.category === book.category && b.id !== book.id).slice(0, 4);

  const handlePrevImage = () => setSelectedImage(prev => (prev - 1 + allImages.length) % allImages.length);
  const handleNextImage = () => setSelectedImage(prev => (prev + 1) % allImages.length);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="text-sm text-gray-500 flex items-center gap-2">
            <Link to="/" className="hover:text-peach-700 transition-colors">Beranda</Link>
            <span>/</span>
            <Link to="/katalog" className="hover:text-peach-700 transition-colors">Katalog Buku</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate max-w-xs">{book.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {/* Main Image */}
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-md mb-4 aspect-[4/3]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={allImages[selectedImage]}
                    alt={book.title}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
                {book.stock === 'soldout' && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                    SOLD OUT
                  </div>
                )}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all"
                    >
                      <ChevronLeft className="h-5 w-5 text-gray-700" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all"
                    >
                      <ChevronRight className="h-5 w-5 text-gray-700" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Row */}
              {allImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImage === idx ? 'border-peach-500 shadow-md' : 'border-gray-200 hover:border-peach-300'
                      }`}
                    >
                      <img src={img} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Book Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-3">
                {(book.categories || [book.category]).map(cat => (
                  <span key={cat} className="bg-peach-100 text-peach-700 text-xs px-3 py-1 rounded-full font-medium">
                    {cat}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>

              {/* Rating */}
              {book.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(s => (
                      <Star
                        key={s}
                        className={`h-4 w-4 ${s <= Math.round(book.rating!) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{book.rating}</span>
                  <span className="text-sm text-gray-500">({book.reviewCount} ulasan)</span>
                </div>
              )}

              <p className="text-3xl font-bold text-peach-700 mb-5">
                Rp {book.price.toLocaleString('id-ID')}
              </p>

              {/* Book Specs */}
              <div className="bg-gray-50 rounded-xl p-5 mb-6 space-y-3 text-sm">
                {[
                  { icon: BookOpen, label: 'Penulis', value: book.author },
                  ...(book.isbn ? [{ icon: Hash, label: 'ISBN', value: book.isbn }] : []),
                  ...(book.eIsbn ? [{ icon: Hash, label: 'E-ISBN', value: book.eIsbn }] : []),
                  ...(book.publishedYear ? [{ icon: Calendar, label: 'Terbit', value: book.publishedYear }] : []),
                  ...(book.dimensions ? [{ icon: Ruler, label: 'Ukuran', value: book.dimensions }] : []),
                  ...(book.pages ? [{ icon: FileText, label: 'Tebal', value: book.pages }] : []),
                  ...(book.paper ? [{ icon: Package, label: 'Kertas', value: book.paper }] : []),
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <Icon className="h-4 w-4 text-peach-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-500 w-20 flex-shrink-0">{label}</span>
                    <span className="text-gray-800 font-medium">: {value}</span>
                  </div>
                ))}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                <span className={`inline-flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-full ${
                  book.stock === 'soldout'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-green-100 text-green-700'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${book.stock === 'soldout' ? 'bg-red-500' : 'bg-green-500'}`} />
                  {book.stock === 'soldout' ? 'Stok Habis' : 'Stok Tersedia'}
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <a href={book.whatsappLink} target="_blank" rel="noopener noreferrer" className="block">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full flex items-center justify-center gap-2"
                    disabled={book.stock === 'soldout'}
                  >
                    <MessageCircle className="h-5 w-5" />
                    Pesan via WhatsApp
                  </Button>
                </a>
                <a href={book.shopeeLink} target="_blank" rel="noopener noreferrer" className="block">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full flex items-center justify-center gap-2"
                    disabled={book.stock === 'soldout'}
                  >
                    <ShoppingBag className="h-5 w-5" />
                    Pesan di Shopee
                  </Button>
                </a>
              </div>

              {/* Floating WA hint */}
              <p className="text-xs text-gray-400 text-center mt-3">
                Butuh bantuan?{' '}
                <a href="https://wa.me/6281234567890" className="text-peach-600 hover:underline">
                  Hubungi kami via WhatsApp
                </a>
              </p>
            </motion.div>
          </div>

          {/* Tabs Section */}
          <div className="mt-12">
            <div className="border-b border-gray-200 mb-6">
              <div className="flex gap-0 overflow-x-auto">
                {(['deskripsi', 'informasi', 'ulasan'] as TabType[]).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 text-sm font-semibold capitalize whitespace-nowrap border-b-2 transition-all ${
                      activeTab === tab
                        ? 'border-peach-500 text-peach-700'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab === 'deskripsi' ? 'Deskripsi' : tab === 'informasi' ? 'Informasi Tambahan' : `Ulasan (${book.reviewCount || 0})`}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-sm"
              >
                {activeTab === 'deskripsi' && (
                  <div>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-6">
                      {book.fullDescription || book.description}
                    </p>
                    {book.tableOfContents && book.tableOfContents.length > 0 && (
                      <>
                        <h3 className="text-lg font-bold mb-4">Daftar Isi:</h3>
                        <ul className="space-y-2">
                          {book.tableOfContents.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-700">
                              <span className="w-6 h-6 bg-peach-100 text-peach-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                {i + 1}
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                )}

                {activeTab === 'informasi' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    {[
                      { label: 'Judul', value: book.title },
                      { label: 'Penulis', value: book.author },
                      { label: 'Penerbit', value: 'CV Pijar Pendar Pustaka' },
                      ...(book.isbn ? [{ label: 'ISBN', value: book.isbn }] : []),
                      ...(book.publishedYear ? [{ label: 'Tahun Terbit', value: book.publishedYear }] : []),
                      ...(book.dimensions ? [{ label: 'Ukuran', value: book.dimensions }] : []),
                      ...(book.pages ? [{ label: 'Jumlah Halaman', value: book.pages }] : []),
                      ...(book.paper ? [{ label: 'Jenis Kertas', value: book.paper }] : []),
                      { label: 'Kategori', value: (book.categories || [book.category]).join(', ') },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex gap-3 border-b pb-3">
                        <span className="text-gray-500 w-36 flex-shrink-0">{label}</span>
                        <span className="text-gray-800 font-medium">: {value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'ulasan' && (
                  <div className="text-center py-8 text-gray-500">
                    <Star className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-lg font-medium mb-2">Belum ada ulasan tertulis</p>
                    <p className="text-sm">Jadilah yang pertama mengulas buku ini!</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Related Books */}
          {relatedBooks.length > 0 && (
            <div className="mt-16">
              <SectionTitle
                title="Produk Terkait"
                subtitle={`Buku lain dalam kategori ${book.category}`}
              />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {relatedBooks.map(related => (
                  <Link key={related.id} to={`/katalog/${related.id}`}>
                    <Card hover>
                      <img
                        src={related.coverImage}
                        alt={related.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <p className="text-xs text-peach-600 font-medium mb-1">{related.category}</p>
                        <h4 className="font-semibold text-sm line-clamp-2 mb-1">{related.title}</h4>
                        <p className="text-xs text-gray-500 mb-2">{related.author}</p>
                        <p className="text-peach-700 font-bold">
                          Rp {related.price.toLocaleString('id-ID')}
                        </p>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
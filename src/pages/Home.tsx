import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import {
  BookOpen, Palette, FileText, Printer, Shield, Users,
  ShoppingCart, Globe, Library, ChevronLeft, ChevronRight,
  Star, Award, TrendingUp, CheckCircle
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import SectionTitle from '../components/ui/SectionTitle';
import { HeroSlide, Book, Testimonial, Statistics } from '../types';

const AnimatedCounter = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView && ref.current) {
      animate(0, value, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate: (v) => {
          if (ref.current) {
            ref.current.textContent = Math.round(v).toString();
          }
        }
      });
    }
  }, [inView, value]);

  return <span ref={ref}>0</span>;
};

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides: HeroSlide[] = [
    {
      id: 1,
      title: 'Paket Penerbitan Lengkap',
      description: 'Terbitkan buku Anda dengan paket lengkap, ISBN mulai dari 550k',
      ctaText: 'Lihat Paket',
      ctaLink: '/layanan/penerbitan',
      image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=1200'
    },
    {
      id: 2,
      title: 'Ubah KTI Menjadi Buku ISBN',
      description: 'Konversi karya tulis ilmiah Anda menjadi buku ber-ISBN dengan mudah',
      ctaText: 'Pelajari Lebih Lanjut',
      ctaLink: '/layanan/konversi-kti',
      image: 'https://images.pexels.com/photos/256520/pexels-photo-256520.jpeg?auto=compress&cs=tinysrgb&w=1200'
    },
    {
      id: 3,
      title: 'Desain Premium & Layout Profesional',
      description: 'Desain cover dan layout buku berkualitas tinggi dari tim profesional',
      ctaText: 'Lihat Portofolio',
      ctaLink: '/layanan/desain-layout',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200'
    },
    {
      id: 4,
      title: 'Layanan Percetakan Berkualitas',
      description: 'Cetak buku Anda dengan kualitas terbaik dan harga kompetitif',
      ctaText: 'Cek Harga',
      ctaLink: '/layanan/percetakan',
      image: 'https://images.pexels.com/photos/159751/book-address-book-learning-learn-159751.jpeg?auto=compress&cs=tinysrgb&w=1200'
    }
  ];

  const services = [
    { name: 'Penerbitan Buku', icon: BookOpen, slug: 'penerbitan', color: 'bg-blue-50' },
    { name: 'Desain & Layout', icon: Palette, slug: 'desain-layout', color: 'bg-purple-50' },
    { name: 'Konversi KTI', icon: FileText, slug: 'konversi-kti', color: 'bg-green-50' },
    { name: 'Percetakan', icon: Printer, slug: 'percetakan', color: 'bg-orange-50' },
    { name: 'HKI', icon: Shield, slug: 'hki', color: 'bg-red-50' },
    { name: 'Event & Workshop', icon: Users, slug: 'event-workshop', color: 'bg-yellow-50' },
    { name: 'Reseller', icon: ShoppingCart, slug: 'reseller', color: 'bg-pink-50' },
    { name: 'Distribusi Digital', icon: Globe, slug: 'distribusi-digital', color: 'bg-indigo-50' },
    { name: 'Pengadaan Perpus', icon: Library, slug: 'pengadaan-perpus', color: 'bg-teal-50' }
  ];

  const recommendedBooks: Book[] = [
    {
      id: '1',
      title: 'Pendidikan Karakter',
      author: 'Dr. Ahmad Sutanto',
      category: 'Pendidikan',
      price: 85000,
      coverImage: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Buku tentang implementasi pendidikan karakter',
      whatsappLink: 'https://wa.me/6281234567890',
      shopeeLink: 'https://shopee.co.id'
    },
    {
      id: '2',
      title: 'Manajemen Keuangan',
      author: 'Prof. Budi Santoso',
      category: 'Ekonomi',
      price: 95000,
      coverImage: 'https://images.pexels.com/photos/256520/pexels-photo-256520.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Panduan lengkap manajemen keuangan modern',
      whatsappLink: 'https://wa.me/6281234567890',
      shopeeLink: 'https://shopee.co.id'
    },
    {
      id: '3',
      title: 'Psikologi Anak',
      author: 'Dr. Siti Nurhaliza',
      category: 'Psikologi',
      price: 78000,
      coverImage: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Memahami perkembangan psikologi anak',
      whatsappLink: 'https://wa.me/6281234567890',
      shopeeLink: 'https://shopee.co.id'
    },
    {
      id: '4',
      title: 'Digital Marketing',
      author: 'Andi Wijaya',
      category: 'Bisnis',
      price: 120000,
      coverImage: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Strategi pemasaran digital untuk UMKM',
      whatsappLink: 'https://wa.me/6281234567890',
      shopeeLink: 'https://shopee.co.id'
    }
  ];

  const statistics: Statistics = {
    booksPublished: 500,
    authorsServed: 350,
    yearsExperience: 8,
    partnerships: 50
  };

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Dr. Ahmad Sutanto',
      role: 'Dosen Universitas XYZ',
      content: 'Pelayanan sangat profesional dan hasil cetakan berkualitas. Proses penerbitan sangat mudah dan cepat.',
      rating: 5
    },
    {
      id: '2',
      name: 'Siti Nurhaliza',
      role: 'Penulis',
      content: 'Tim yang sangat responsif dan membantu. Buku saya terbit dengan hasil yang memuaskan!',
      rating: 5
    },
    {
      id: '3',
      name: 'Budi Santoso',
      role: 'Peneliti',
      content: 'Sangat terbantu dengan layanan konversi KTI ke buku. Recommended!',
      rating: 5
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="bg-gray-50">
      <section className="relative h-[600px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
            </div>
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
              <div className="max-w-2xl text-white">
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-6xl font-bold mb-4"
                >
                  {heroSlides[currentSlide].title}
                </motion.h1>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl mb-8"
                >
                  {heroSlides[currentSlide].description}
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link to={heroSlides[currentSlide].ctaLink}>
                    <Button size="lg">
                      {heroSlides[currentSlide].ctaText}
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full transition-colors"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full transition-colors"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Rekomendasi Buku"
            subtitle="Koleksi buku pilihan dari penerbit kami"
          />
          <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
            {recommendedBooks.map((book) => (
              <Card key={book.id} hover className="min-w-[280px] flex-shrink-0">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                  <p className="text-peach-700 font-bold text-xl mb-3">
                    Rp {book.price.toLocaleString('id-ID')}
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      Detail
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-peach-50 relative overflow-hidden">
        {/* Elemen dekoratif background soft glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-peach-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-peach-200/30 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle
            title="Layanan Kami"
            subtitle="Solusi lengkap untuk kebutuhan penerbitan Anda"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link key={service.slug} to={`/layanan/${service.slug}`}>
                  <Card hover className="h-full">
                    <div className="p-6 text-center">
                      <div className={`${service.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <Icon className="h-8 w-8 text-gray-700" />
                      </div>
                      <h3 className="text-lg font-semibold">{service.name}</h3>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-peach-100 to-peach-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Mengapa Memilih Kami?" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Award className="h-10 w-10 text-peach-700" />
              </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              <AnimatedCounter value={statistics.booksPublished} />+
            </h3>
              <p className="text-gray-600">Buku Diterbitkan</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="h-10 w-10 text-peach-700" />
              </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              <AnimatedCounter value={statistics.authorsServed} />+
            </h3>
              <p className="text-gray-600">Penulis Dilayani</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <TrendingUp className="h-10 w-10 text-peach-700" />
              </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              <AnimatedCounter value={statistics.yearsExperience} />+
            </h3>
              <p className="text-gray-600">Tahun Pengalaman</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <CheckCircle className="h-10 w-10 text-peach-700" />
              </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              <AnimatedCounter value={statistics.partnerships} />+
            </h3>
              <p className="text-gray-600">Mitra Kerja</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Testimoni"
            subtitle="Apa kata mereka tentang layanan kami"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id}>
                <div className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-peach-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Temukan Kami Di"
            subtitle="Buku-buku kami tersedia di berbagai platform"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Google Play Books', 'IPUSNAS', 'Shopee', 'Tokopedia'].map((platform) => (
              <Card key={platform} hover>
                <div className="p-6 text-center">
                  <p className="font-semibold text-gray-700">{platform}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

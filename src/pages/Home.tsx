import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import {
  BookOpen, Palette, FileText, Printer, Shield, Users,
  ShoppingCart, Globe, Library, ChevronLeft, ChevronRight,
  Star, Award, TrendingUp, CheckCircle, MessageCircle, ShoppingBag, Layers
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

  const getServiceIcon = (slug: string) => {
    switch (slug) {
      case 'penerbitan': return BookOpen;
      case 'desain-layout': return Palette;
      case 'konversi-kti': return FileText;
      case 'percetakan': return Printer;
      case 'hki': return Shield;
      case 'event-workshop': return Users;
      case 'reseller': return ShoppingCart;
      case 'distribusi-digital': return Globe;
      case 'pengadaan-perpus': return Library;
      default: return Layers;
    }
  };

  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [dbStats, setDbStats] = useState({
    booksPublished: 500,
    authorsServed: 350,
    yearsExperience: 8,
    partnerships: 50
  });

  useEffect(() => {
    // Fetch Recommended Books
    fetch(`${import.meta.env.VITE_API_URL}/api/books`)
      .then(res => res.json())
      .then(data => {
        const mapped = data.slice(0, 4).map((b: any) => ({
          id: b.id.toString(),
          title: b.title,
          author: b.author,
          category: b.category,
          price: b.price,
          coverImage: b.cover_image || 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: b.description,
          whatsappLink: b.whatsapp_link || `https://wa.me/6281234567890?text=Saya%20ingin%20pesan%20buku%20${encodeURIComponent(b.title)}`,
          shopeeLink: b.shopee_link || 'https://shopee.co.id'
        }));
        if (mapped.length > 0) setRecommendedBooks(mapped);
      });

    // Fetch Stats (Derived from DB counts)
    Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/api/books`).then(r => r.json()),
      fetch(`${import.meta.env.VITE_API_URL}/api/services`).then(r => r.json())
    ]).then(([books, fetchedServices]) => {
      setServices(fetchedServices);
      setDbStats(prev => ({
        ...prev,
        booksPublished: Math.max(prev.booksPublished, books.length),
        partnerships: Math.max(prev.partnerships, fetchedServices.length)
      }));
    });
  }, []);

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

  const [banner, setBanner] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/banners/home`)
      .then(res => res.json())
      .then(data => {
        if (data && data.banner_url) setBanner(data.banner_url);
      });
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Slider */}
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
              style={{ backgroundImage: `url(${banner || heroSlides[currentSlide].image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
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

      {/* Rekomendasi Buku */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Rekomendasi Buku"
            subtitle="Koleksi buku pilihan dari penerbit kami"
          />
          <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
            {recommendedBooks.map((book) => (
              <Card key={book.id} hover className="min-w-[280px] flex-shrink-0">
                <Link to={`/katalog/${book.id}`} className="block">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-64 object-cover hover:opacity-90 transition-opacity"
                  />
                  <div className="p-4 pb-2">
                    <h3 className="font-semibold text-lg mb-1 hover:text-peach-700 transition-colors">{book.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                    <p className="text-peach-700 font-bold text-xl mb-2">
                      Rp {book.price.toLocaleString('id-ID')}
                    </p>
                  </div>
                </Link>
                <div className="px-4 pb-4 flex gap-2">
                  <a href={book.whatsappLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button size="sm" className="w-full flex items-center justify-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      Pesan WA
                    </Button>
                  </a>
                  <Link to={`/katalog/${book.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      Detail
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== REVISI: Layanan Kami — Background lebih tegas dengan gradient kuat ===== */}
      <section className="py-24 bg-gradient-to-b from-peach-200 to-peach-50 relative overflow-hidden">
        {/* Dekoratif soft glow lebih kontras */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-orange-200/50 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 -left-32 w-[400px] h-[400px] bg-peach-300/40 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle
            title="Layanan Kami"
            subtitle="Solusi lengkap untuk kebutuhan penerbitan Anda"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = getServiceIcon(service.slug);
              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.07 }}
                >
                  <Link to={`/layanan/${service.slug}`}>
                    {/* Card putih di atas background peach — kontras jelas */}
                    <div className="bg-white rounded-3xl shadow-md border-2 border-transparent hover:border-peach-400 hover:shadow-2xl hover:shadow-peach-300/40 hover:-translate-y-2 transition-all duration-300 p-8 text-center h-full group">
                      <div className={`${service.color_class || 'bg-peach-50'} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3 group-hover:rotate-0 transition-transform shadow-inner`}>
                        <Icon className={`h-10 w-10 ${service.icon_color || 'text-peach-600'}`} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                      <div className="w-12 h-1 bg-peach-300 mx-auto rounded-full group-hover:w-24 transition-all" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mengapa Memilih Kami — Visual lebih bold */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="Mengapa Memilih Kami?" 
            subtitle="Komitmen kami untuk memberikan kualitas terbaik bagi karya Anda"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { icon: Award, value: dbStats.booksPublished, label: 'Buku Diterbitkan', color: 'text-orange-600', bg: 'bg-orange-50' },
              { icon: Users, value: dbStats.authorsServed, label: 'Penulis Dilayani', color: 'text-peach-700', bg: 'bg-peach-50' },
              { icon: TrendingUp, value: dbStats.yearsExperience, label: 'Tahun Pengalaman', color: 'text-amber-600', bg: 'bg-amber-50' },
              { icon: CheckCircle, value: dbStats.partnerships, label: 'Mitra Kerja', color: 'text-rose-600', bg: 'bg-rose-50' },
            ].map(({ icon: Icon, value, label, color, bg }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" }}
                className="relative group p-8 rounded-3xl hover:bg-peach-50/50 transition-colors"
              >
                <div className={`${bg} rounded-3xl w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-peach-100 group-hover:scale-110 transition-transform`}>
                  <Icon className={`h-12 w-12 ${color}`} />
                </div>
                <h3 className="text-4xl font-extrabold text-gray-900 mb-2">
                  <AnimatedCounter value={value} />+
                </h3>
                <p className="text-gray-500 font-medium uppercase tracking-wider text-xs">{label}</p>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-1 bg-peach-500 rounded-full group-hover:w-16 transition-all" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimoni */}
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

      {/* Platform */}
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
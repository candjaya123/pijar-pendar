import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen, Palette, FileText, Printer, Shield, Users,
  ShoppingCart, Globe, Library, ArrowRight
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import SectionTitle from '../components/ui/SectionTitle';

export default function Services() {
  const services = [
    {
      icon: BookOpen,
      name: 'Penerbitan Buku',
      slug: 'penerbitan',
      description: 'Layanan penerbitan buku profesional dengan ISBN resmi mulai dari Rp 550.000',
      color: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: Palette,
      name: 'Desain & Layout',
      slug: 'desain-layout',
      description: 'Desain cover premium dan layout profesional untuk buku Anda',
      color: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      icon: FileText,
      name: 'Konversi KTI ke Buku',
      slug: 'konversi-kti',
      description: 'Ubah karya tulis ilmiah menjadi buku ber-ISBN yang siap diterbitkan',
      color: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      icon: Printer,
      name: 'Percetakan',
      slug: 'percetakan',
      description: 'Layanan cetak buku dengan kualitas terbaik dan harga kompetitif',
      color: 'bg-orange-50',
      iconColor: 'text-orange-600'
    },
    {
      icon: Shield,
      name: 'Hak Kekayaan Intelektual',
      slug: 'hki',
      description: 'Pengurusan HKI untuk melindungi karya tulis Anda secara legal',
      color: 'bg-red-50',
      iconColor: 'text-red-600'
    },
    {
      icon: Users,
      name: 'Event & Workshop',
      slug: 'event-workshop',
      description: 'Workshop menulis, seminar penerbitan, dan berbagai acara literasi',
      color: 'bg-yellow-50',
      iconColor: 'text-yellow-600'
    },
    {
      icon: ShoppingCart,
      name: 'Program Reseller',
      slug: 'reseller',
      description: 'Bergabung sebagai reseller dengan komisi menarik hingga 30%',
      color: 'bg-pink-50',
      iconColor: 'text-pink-600'
    },
    {
      icon: Globe,
      name: 'Distribusi Digital',
      slug: 'distribusi-digital',
      description: 'Distribusikan buku Anda ke platform digital seperti Google Play Books',
      color: 'bg-indigo-50',
      iconColor: 'text-indigo-600'
    },
    {
      icon: Library,
      name: 'Pengadaan Perpustakaan',
      slug: 'pengadaan-perpus',
      description: 'Solusi pengadaan buku untuk perpustakaan sekolah, kampus, dan instansi',
      color: 'bg-teal-50',
      iconColor: 'text-teal-600'
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
              Layanan Kami
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Solusi lengkap untuk kebutuhan penerbitan dan literasi Anda
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/layanan/${service.slug}`}>
                    <Card hover className="h-full">
                      <div className="p-6">
                        <div className={`${service.color} w-16 h-16 rounded-full flex items-center justify-center mb-4`}>
                          <Icon className={`h-8 w-8 ${service.iconColor}`} />
                        </div>
                        <h3 className="text-xl font-bold mb-3">{service.name}</h3>
                        <p className="text-gray-600 mb-4">{service.description}</p>
                        <div className="flex items-center text-peach-700 font-semibold group">
                          <span>Pelajari Lebih Lanjut</span>
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Siap Menerbitkan Buku Anda?"
            subtitle="Konsultasikan kebutuhan penerbitan Anda dengan tim kami"
          />
          <div className="text-center">
            <a href="https://wa.me/6281234567890?text=Halo,%20saya%20ingin%20konsultasi%20tentang%20penerbitan%20buku">
              <Button size="lg">
                Hubungi Kami Sekarang
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

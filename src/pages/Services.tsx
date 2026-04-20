import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen, Palette, FileText, Printer, Shield, Users,
  ShoppingCart, Globe, Library, ArrowRight, Layers
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import SectionTitle from '../components/ui/SectionTitle';

export default function Services() {
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

  const [dbServices, setDbServices] = useState<any[]>([]);

  const [banner, setBanner] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/banners/layanan`)
      .then(res => res.json())
      .then(data => {
        if (data && data.banner_url) setBanner(data.banner_url);
      });
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/services`)
      .then(res => res.json())
      .then(data => setDbServices(data))
      .catch(err => console.error('Error fetching services:', err));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="relative py-24 overflow-hidden">
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
            {dbServices.map((service, index) => {
              const Icon = getServiceIcon(service.slug);
              return (
                <motion.div
                  key={`db-${service.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-white rounded-2xl h-full shadow-sm border border-peach-200/50 hover:shadow-lg hover:border-peach-400 hover:-translate-y-1 transition-all duration-300 p-8 flex flex-col">
                    <div className={`${service.color_class || 'bg-peach-50'} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm`}>
                      <Icon className={`h-8 w-8 ${service.icon_color || 'text-peach-600'}`} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">{service.name}</h3>
                    <p className="text-gray-600 mb-6 flex-grow leading-relaxed">{service.description}</p>
                    {service.price ? (
                       <p className="text-peach-700 font-extrabold text-lg mb-6 py-2 px-4 bg-peach-50 rounded-xl inline-block w-fit">
                         Mulai Rp {service.price.toLocaleString('id-ID')}
                       </p>
                    ) : (
                       <p className="text-peach-700 font-extrabold text-main mb-6 py-2 px-4 bg-peach-50 rounded-xl inline-block w-fit">
                         Harga Hubungi Kami
                       </p>
                    )}
                    <div className="flex flex-col gap-3">
                      <Link to={`/layanan/${service.slug}`} className="w-full">
                        <Button variant="primary" className="w-full flex items-center justify-center gap-2 group">
                          Detail Layanan
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                      <div className="flex gap-2">
                        {service.shopee_link && (
                          <a href={service.shopee_link} target="_blank" rel="noopener noreferrer" className="flex-1">
                            <Button size="sm" variant="outline" className="w-full">Shopee</Button>
                          </a>
                        )}
                        {service.tokopedia_link && (
                          <a href={service.tokopedia_link} target="_blank" rel="noopener noreferrer" className="flex-1">
                            <Button size="sm" variant="outline" className="w-full">Tokopedia</Button>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
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

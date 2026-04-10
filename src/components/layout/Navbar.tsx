import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, BookOpen, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Katalog Buku', path: '/katalog' },
    { name: 'Layanan', path: '/layanan' },
    { name: 'Komunitas', path: '/komunitas' },
    { name: 'Artikel', path: '/artikel' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Tentang Kami', path: '/tentang' },
  ];

  const serviceLinks = [
    { name: 'Penerbitan Buku', path: '/layanan/penerbitan' },
    { name: 'Desain & Layout', path: '/layanan/desain-layout' },
    { name: 'Konversi KTI ke Buku', path: '/layanan/konversi-kti' },
    { name: 'Percetakan', path: '/layanan/percetakan' },
    { name: 'Hak Kekayaan Intelektual', path: '/layanan/hki' },
    { name: 'Event & Workshop', path: '/layanan/event-workshop' },
    { name: 'Program Reseller', path: '/layanan/reseller' },
    { name: 'Distribusi Digital', path: '/layanan/distribusi-digital' },
    { name: 'Pengadaan Perpustakaan', path: '/layanan/pengadaan-perpus' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-peach-200 p-2 rounded-lg group-hover:bg-peach-300 transition-colors">
              <BookOpen className="h-6 w-6 text-peach-900" />
            </div>
            <span className="font-bold text-xl text-gray-900">
              Pijar Pendar Pustaka
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              if (link.name === 'Layanan') {
                return (
                  <div key={link.path} className="relative group">
                    <Link
                      to={link.path}
                      className="flex items-center gap-1 text-gray-700 hover:text-peach-700 font-medium transition-colors relative"
                    >
                      {link.name}
                      <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-peach-200 group-hover:w-full transition-all duration-300" />
                    </Link>
                    <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2 w-64">
                        {serviceLinks.map((service) => (
                          <Link
                            key={service.path}
                            to={service.path}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-peach-50 hover:text-peach-700 transition-colors"
                          >
                            {service.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-gray-700 hover:text-peach-700 font-medium transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-peach-200 group-hover:w-full transition-all duration-300" />
                </Link>
              );
            })}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                if (link.name === 'Layanan') {
                  return (
                    <div key={link.path}>
                      <div className="flex items-center justify-between">
                        <Link
                          to={link.path}
                          onClick={() => setIsOpen(false)}
                          className="block py-2 px-4 text-gray-700 hover:bg-peach-50 rounded-lg transition-colors flex-grow"
                        >
                          {link.name}
                        </Link>
                        <button
                          onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                          className="p-2 mr-2 rounded-lg hover:bg-peach-50 text-gray-700"
                        >
                          <ChevronDown
                            className={`h-5 w-5 transition-transform duration-300 ${
                              isMobileServicesOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      </div>
                      <AnimatePresence>
                        {isMobileServicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 pr-2 py-2 space-y-1 bg-gray-50/50 rounded-lg mt-1 mx-2">
                              {serviceLinks.map((service) => (
                                <Link
                                  key={service.path}
                                  to={service.path}
                                  onClick={() => setIsOpen(false)}
                                  className="block py-2 px-4 text-sm text-gray-600 hover:text-peach-700 hover:bg-peach-50 rounded-lg transition-colors"
                                >
                                  {service.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="block py-2 px-4 text-gray-700 hover:bg-peach-50 rounded-lg transition-colors"
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

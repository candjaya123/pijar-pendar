import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-peach-200">
              CV Pijar Pendar Pustaka
            </h3>
            <p className="text-gray-400 mb-4">
              Menerbitkan karya terbaik Anda dengan profesional dan terpercaya.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-peach-200 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-peach-200 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-peach-200 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-peach-200 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Tautan Cepat</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-peach-200 transition-colors">Beranda</Link></li>
              <li><Link to="/katalog" className="text-gray-400 hover:text-peach-200 transition-colors">Katalog Buku</Link></li>
              <li><Link to="/layanan" className="text-gray-400 hover:text-peach-200 transition-colors">Layanan</Link></li>
              <li><Link to="/komunitas" className="text-gray-400 hover:text-peach-200 transition-colors">Komunitas</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Layanan</h4>
            <ul className="space-y-2">
              <li><Link to="/layanan/penerbitan" className="text-gray-400 hover:text-peach-200 transition-colors">Penerbitan Buku</Link></li>
              <li><Link to="/layanan/desain-layout" className="text-gray-400 hover:text-peach-200 transition-colors">Desain & Layout</Link></li>
              <li><Link to="/layanan/percetakan" className="text-gray-400 hover:text-peach-200 transition-colors">Percetakan</Link></li>
              <li><Link to="/layanan/hki" className="text-gray-400 hover:text-peach-200 transition-colors">HKI</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>Jl. Contoh No. 123, Yogyakarta</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span>info@pijarpustaka.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} CV Pijar Pendar Pustaka. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

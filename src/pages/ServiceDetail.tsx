import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen, Palette, FileText, Printer, Shield, Users,
  ShoppingCart, Globe, Library, CheckCircle, ExternalLink
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import SectionTitle from '../components/ui/SectionTitle';
import { ManuscriptSubmission } from '../types';

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [formData, setFormData] = useState<ManuscriptSubmission>({
    name: '',
    email: '',
    phone: '',
    fileLink: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = {
    'penerbitan': {
      icon: BookOpen,
      name: 'Penerbitan Buku',
      description: 'Layanan penerbitan buku profesional dengan ISBN resmi',
      fullDescription: 'Kami menyediakan layanan penerbitan buku lengkap dengan ISBN resmi. Paket kami mencakup editing, layout, desain cover, dan pengurusan ISBN. Dengan pengalaman lebih dari 8 tahun, kami siap membantu mewujudkan impian Anda menjadi penulis buku ber-ISBN.',
      features: [
        'ISBN resmi dari Perpustakaan Nasional',
        'Editing profesional',
        'Desain cover menarik',
        'Layout berkualitas tinggi',
        'Konsultasi gratis',
        'Proses cepat (2-4 minggu)'
      ],
      pricing: 'Paket mulai dari Rp 550.000',
      image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=1200'
    },
    'desain-layout': {
      icon: Palette,
      name: 'Desain & Layout',
      description: 'Desain cover dan layout profesional untuk buku Anda',
      fullDescription: 'Tim desainer profesional kami siap membuat desain cover yang menarik dan layout buku yang rapi dan nyaman dibaca. Kami mengutamakan estetika dan keterbacaan untuk memberikan hasil terbaik.',
      features: [
        'Desain cover premium',
        'Layout interior profesional',
        'Revisi unlimited',
        'File siap cetak (PDF)',
        'Konsultasi desain',
        'Berbagai pilihan template'
      ],
      pricing: 'Mulai dari Rp 300.000',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200'
    },
    'konversi-kti': {
      icon: FileText,
      name: 'Konversi KTI ke Buku',
      description: 'Ubah karya tulis ilmiah menjadi buku ber-ISBN',
      fullDescription: 'Layanan konversi karya tulis ilmiah (skripsi, tesis, disertasi) menjadi buku ber-ISBN yang siap diterbitkan. Proses mudah dan hasil berkualitas.',
      features: [
        'Konversi format akademik ke buku',
        'Editing substansi',
        'Penyesuaian layout',
        'ISBN resmi',
        'Desain cover akademik',
        'Proses cepat'
      ],
      pricing: 'Mulai dari Rp 650.000',
      image: 'https://images.pexels.com/photos/256520/pexels-photo-256520.jpeg?auto=compress&cs=tinysrgb&w=1200'
    },
    'percetakan': {
      icon: Printer,
      name: 'Percetakan',
      description: 'Layanan cetak buku dengan kualitas terbaik',
      fullDescription: 'Cetak buku dengan teknologi modern dan bahan berkualitas. Kami melayani cetak dalam jumlah kecil maupun besar dengan harga kompetitif.',
      features: [
        'Cetak POD (Print on Demand)',
        'Berbagai pilihan kertas',
        'Finishing berkualitas',
        'Harga kompetitif',
        'Pengiriman ke seluruh Indonesia',
        'Minimal order fleksibel'
      ],
      pricing: 'Harga per eksemplar mulai Rp 15.000',
      image: 'https://images.pexels.com/photos/159751/book-address-book-learning-learn-159751.jpeg?auto=compress&cs=tinysrgb&w=1200'
    },
    'hki': {
      icon: Shield,
      name: 'Hak Kekayaan Intelektual',
      description: 'Pengurusan HKI untuk melindungi karya Anda',
      fullDescription: 'Layanan pengurusan Hak Kekayaan Intelektual (HKI) untuk melindungi karya tulis Anda. Tim ahli kami siap membantu proses pendaftaran hingga selesai.',
      features: [
        'Pendaftaran HKI resmi',
        'Konsultasi hukum',
        'Proses profesional',
        'Sertifikat resmi',
        'Tracking status aplikasi',
        'Dokumentasi lengkap'
      ],
      pricing: 'Mulai dari Rp 1.200.000',
      image: 'https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&w=1200'
    },
    'event-workshop': {
      icon: Users,
      name: 'Event & Workshop',
      description: 'Workshop menulis dan penerbitan buku',
      fullDescription: 'Kami menyelenggarakan workshop menulis, seminar penerbitan, dan berbagai acara literasi. Tingkatkan kemampuan menulis Anda bersama para ahli.',
      features: [
        'Workshop menulis rutin',
        'Seminar penerbitan',
        'Pelatihan editing',
        'Konsultasi karya',
        'Networking dengan penulis',
        'Sertifikat peserta'
      ],
      pricing: 'Mulai dari Rp 150.000/peserta',
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1200'
    },
    'reseller': {
      icon: ShoppingCart,
      name: 'Program Reseller',
      description: 'Bergabung sebagai reseller buku kami',
      fullDescription: 'Dapatkan penghasilan tambahan dengan menjadi reseller buku kami. Sistem mudah, komisi menarik, dan dukungan penuh dari tim kami.',
      features: [
        'Komisi hingga 30%',
        'Katalog lengkap',
        'Material promosi gratis',
        'Pelatihan reseller',
        'Support tim marketing',
        'Pengiriman dropship'
      ],
      pricing: 'Gratis bergabung',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200'
    },
    'distribusi-digital': {
      icon: Globe,
      name: 'Distribusi Digital',
      description: 'Distribusi buku ke platform digital',
      fullDescription: 'Perluas jangkauan pembaca dengan mendistribusikan buku Anda ke berbagai platform digital seperti Google Play Books, IPUSNAS, dan lainnya.',
      features: [
        'Distribusi multi-platform',
        'Google Play Books',
        'IPUSNAS',
        'E-commerce marketplace',
        'Royalti transparan',
        'Laporan penjualan berkala'
      ],
      pricing: 'Mulai dari Rp 500.000',
      image: 'https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg?auto=compress&cs=tinysrgb&w=1200'
    },
    'pengadaan-perpus': {
      icon: Library,
      name: 'Pengadaan Perpustakaan',
      description: 'Solusi pengadaan buku untuk perpustakaan',
      fullDescription: 'Kami menyediakan solusi pengadaan buku untuk perpustakaan sekolah, kampus, dan instansi. Proses mudah, harga khusus, dan pelayanan profesional.',
      features: [
        'Harga khusus institusi',
        'Katalog lengkap',
        'Proses tender',
        'Pengiriman terjadwal',
        'Invoice resmi',
        'Konsultasi koleksi'
      ],
      pricing: 'Harga disesuaikan volume',
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1200'
    }
  };

  const service = services[slug as keyof typeof services];
  const Icon = service?.icon;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      alert('Terima kasih! Naskah Anda telah diterima. Tim kami akan segera menghubungi Anda.');
      setFormData({ name: '', email: '', phone: '', fileLink: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Layanan tidak ditemukan</h2>
          <Link to="/layanan">
            <Button>Kembali ke Layanan</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <section
        className="relative h-[400px] bg-cover bg-center"
        style={{ backgroundImage: `url(${service.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white"
          >
            <div className="flex items-center gap-4 mb-4">
              {Icon && (
                <div className="bg-peach-200 p-4 rounded-full">
                  <Icon className="h-8 w-8 text-peach-900" />
                </div>
              )}
              <h1 className="text-4xl md:text-5xl font-bold">{service.name}</h1>
            </div>
            <p className="text-xl">{service.description}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Tentang Layanan</h2>
                <p className="text-gray-700 text-lg mb-6">{service.fullDescription}</p>

                <h3 className="text-xl font-bold mb-4">Fitur Layanan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">Kirim Naskah Anda</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-peach-200 focus:border-peach-200 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-peach-200 focus:border-peach-200 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      No. WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-peach-200 focus:border-peach-200 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Link File Naskah (Google Drive / Dropbox) *
                    </label>
                    <input
                      type="url"
                      name="fileLink"
                      value={formData.fileLink}
                      onChange={handleInputChange}
                      required
                      placeholder="https://drive.google.com/..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-peach-200 focus:border-peach-200 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pesan / Catatan (Opsional)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-peach-200 focus:border-peach-200 outline-none"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
                    Kirim Naskah
                  </Button>
                </form>
              </Card>
            </div>

            <div>
              <Card className="p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4">Informasi Harga</h3>
                <p className="text-3xl font-bold text-peach-700 mb-6">{service.pricing}</p>

                <a
                  href="https://forms.google.com/your-form-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="secondary" size="lg" className="w-full mb-4">
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Rencanakan Buku Anda
                  </Button>
                </a>

                <div className="border-t pt-6">
                  <h4 className="font-semibold mb-3">Butuh Bantuan?</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Tim kami siap membantu Anda. Hubungi kami melalui:
                  </p>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>WhatsApp:</strong> +62 812-3456-7890
                    </p>
                    <p>
                      <strong>Email:</strong> info@pijarpustaka.com
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

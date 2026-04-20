import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Palette, FileText, Printer, Shield, Users,
  ShoppingCart, Globe, Library, CheckCircle, ExternalLink,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import SectionTitle from '../components/ui/SectionTitle';
import { ManuscriptSubmission } from '../types';

// Photo gallery component for services that have portfolio photos
function PhotoGallery({ photos, title }: { photos: string[]; title: string }) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(p => (p - 1 + photos.length) % photos.length);
  const next = () => setCurrent(p => (p + 1) % photos.length);

  if (!photos.length) return null;

  return (
    <Card className="p-8 mb-8">
      <h2 className="text-2xl font-bold mb-6">Galeri {title}</h2>
      <div className="relative rounded-xl overflow-hidden bg-gray-100 aspect-video mb-4">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={photos[current]}
            alt={`${title} ${current + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {photos.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full transition-all"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full transition-all"
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === current ? 'bg-white w-6' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {photos.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {photos.map((photo, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                i === current ? 'border-peach-500' : 'border-gray-200 hover:border-peach-300'
              }`}
            >
              <img src={photo} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </Card>
  );
}

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

  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/services/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          // Parse JSON lists
          try {
            data.features = JSON.parse(data.features || '[]');
            data.galleryPhotos = JSON.parse(data.gallery_images || '[]');
          } catch(e) {
            data.features = data.features ? data.features.split('\n') : [];
            data.galleryPhotos = data.gallery_images ? data.gallery_images.split('\n') : [];
          }
          setService(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

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

  const Icon = service ? getServiceIcon(service.slug) : null;

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-peach-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Memuat Layanan...</p>
        </div>
      </div>
    );
  }

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
        style={{ backgroundImage: `url(${service.banner_image || service.image})` }}
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

              {/* ===== REVISI #5: Slide foto untuk layanan yang punya galeri ===== */}
              {service.galleryPhotos && service.galleryPhotos.length > 0 && (
                <PhotoGallery
                  photos={service.galleryPhotos}
                  title={service.name}
                />
              )}

              <Card className="p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b pb-4 border-gray-100">Tentang Layanan</h2>
                <div className="prose max-w-none text-gray-700 text-lg leading-relaxed whitespace-pre-line mb-8">
                  {service.full_description || service.fullDescription}
                </div>

                <h3 className="text-xl font-bold mb-4 text-gray-900">Fitur Layanan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.features && service.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-start gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium">{feature}</span>
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
              <Card className="p-6 sticky top-24 shadow-xl border-peach-100">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Informasi Harga</h3>
                <p className="text-2xl font-black text-peach-700 mb-6 bg-peach-50 p-4 rounded-2xl text-center border border-peach-100">
                  {service.pricing_text || service.pricing}
                </p>

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
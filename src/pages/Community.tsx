import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Target, CheckCircle } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import SectionTitle from '../components/ui/SectionTitle';
import { CommunityRegistration } from '../types';

export default function Community() {
  const [formData, setFormData] = useState<CommunityRegistration>({
    name: '',
    email: '',
    phone: '',
    interests: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ongoingProjects = [
    {
      id: '1',
      title: 'Antologi Puisi "Jejak Waktu"',
      description: 'Kumpulan puisi dari berbagai penulis dengan tema perjalanan waktu dan kenangan',
      deadline: '30 Mei 2026',
      status: 'Dibuka',
      slots: '15 penulis'
    },
    {
      id: '2',
      title: 'Buku Kolaborasi "Cerita dari Nusantara"',
      description: 'Kumpulan cerita pendek yang menampilkan kearifan lokal dari berbagai daerah',
      deadline: '15 Juni 2026',
      status: 'Dibuka',
      slots: '20 penulis'
    },
    {
      id: '3',
      title: 'Antologi Esai "Pendidikan Masa Depan"',
      description: 'Kumpulan esai dari praktisi pendidikan tentang masa depan pendidikan Indonesia',
      deadline: '10 Juli 2026',
      status: 'Dibuka',
      slots: '12 penulis'
    }
  ];

  const interests = [
    'Puisi',
    'Cerpen',
    'Novel',
    'Esai',
    'Non-Fiksi',
    'Buku Anak',
    'Ilmiah Populer'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      window.location.href = 'https://chat.whatsapp.com/your-group-link';
      setIsSubmitting(false);
    }, 1000);
  };

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
              Pena Pijar Community
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Wadah berkumpul para penulis untuk berbagi, belajar, dan berkarya bersama
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <Card className="p-8 text-center">
              <div className="bg-peach-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-peach-700" />
              </div>
              <h3 className="text-2xl font-bold mb-2">350+</h3>
              <p className="text-gray-600">Anggota Aktif</p>
            </Card>
            <Card className="p-8 text-center">
              <div className="bg-peach-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-peach-700" />
              </div>
              <h3 className="text-2xl font-bold mb-2">25+</h3>
              <p className="text-gray-600">Proyek Kolaborasi</p>
            </Card>
            <Card className="p-8 text-center">
              <div className="bg-peach-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-peach-700" />
              </div>
              <h3 className="text-2xl font-bold mb-2">100+</h3>
              <p className="text-gray-600">Buku Terbit</p>
            </Card>
          </div>

          <SectionTitle
            title="Undangan Menulis"
            subtitle="Proyek kolaborasi yang sedang dibuka untuk umum"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {ongoingProjects.map((project) => (
              <Card key={project.id} hover>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-semibold">
                      {project.status}
                    </span>
                    <span className="text-sm text-gray-500">{project.slots}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Deadline: {project.deadline}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">Tentang Komunitas</h2>
              <p className="text-gray-700 mb-4">
                Pena Pijar adalah komunitas penulis yang dibentuk untuk memfasilitasi
                penulis Indonesia dalam mengembangkan karya dan menerbitkan buku.
              </p>
              <h3 className="text-xl font-semibold mb-3">Benefit Bergabung:</h3>
              <ul className="space-y-3">
                {[
                  'Akses ke proyek penulisan kolaboratif',
                  'Workshop dan pelatihan menulis gratis',
                  'Networking dengan sesama penulis',
                  'Konsultasi karya dengan editor profesional',
                  'Diskon khusus untuk penerbitan buku',
                  'Kesempatan menerbitkan antologi bersama'
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Daftar Sekarang</h2>
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
                    Minat Menulis *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {interests.map((interest) => (
                      <label
                        key={interest}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.interests.includes(interest)}
                          onChange={() => handleInterestChange(interest)}
                          className="w-4 h-4 text-peach-600 border-gray-300 rounded focus:ring-peach-200"
                        />
                        <span className="text-sm text-gray-700">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  isLoading={isSubmitting}
                  disabled={formData.interests.length === 0}
                >
                  Gabung Komunitas
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Dengan mendaftar, Anda akan diarahkan ke grup WhatsApp komunitas
                </p>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

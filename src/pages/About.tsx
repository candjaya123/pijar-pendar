import { motion } from 'framer-motion';
import { Target, Eye, Award, Users, BookOpen, TrendingUp } from 'lucide-react';
import Card from '../components/ui/Card';
import SectionTitle from '../components/ui/SectionTitle';

export default function About() {
  const milestones = [
    { year: '2018', event: 'CV Pijar Pendar Pustaka didirikan' },
    { year: '2019', event: 'Menerbitkan 50 buku pertama' },
    { year: '2020', event: 'Ekspansi ke distribusi digital' },
    { year: '2022', event: 'Meluncurkan Komunitas Pena Pijar' },
    { year: '2024', event: 'Mencapai 500+ buku terbit' },
    { year: '2026', event: 'Membuka cabang layanan di 5 kota' }
  ];

  const values = [
    {
      icon: Award,
      title: 'Profesional',
      description: 'Kami berkomitmen memberikan layanan terbaik dengan standar profesional tinggi'
    },
    {
      icon: Users,
      title: 'Kolaboratif',
      description: 'Membangun kemitraan yang kuat dengan penulis dan seluruh stakeholder'
    },
    {
      icon: BookOpen,
      title: 'Inovatif',
      description: 'Selalu menghadirkan solusi penerbitan yang kreatif dan mengikuti perkembangan zaman'
    },
    {
      icon: TrendingUp,
      title: 'Berkualitas',
      description: 'Mengutamakan kualitas dalam setiap aspek penerbitan dari konten hingga produksi'
    }
  ];

  return (
    <div className="bg-gray-50">
      <section className="bg-gradient-to-r from-peach-200 to-peach-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Tentang Kami
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Mitra terpercaya dalam mewujudkan impian menerbitkan buku Anda
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Profil Perusahaan</h2>
              <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                CV Pijar Pendar Pustaka adalah penerbit profesional yang berkomitmen
                membantu penulis Indonesia mewujudkan karya terbaiknya. Sejak didirikan
                pada tahun 2018, kami telah membantu ratusan penulis menerbitkan buku
                mereka dengan standar kualitas tinggi.
              </p>
              <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                Kami menyediakan layanan penerbitan lengkap mulai dari editing,
                desain, layout, percetakan, hingga distribusi. Tim profesional kami
                siap membantu mewujudkan impian Anda menjadi penulis buku ber-ISBN.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Dengan pengalaman lebih dari 8 tahun dan telah menerbitkan 500+ buku,
                kami terus berinovasi untuk memberikan layanan terbaik bagi para penulis.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="About Us"
                className="rounded-xl shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-peach-100 p-3 rounded-full">
                  <Eye className="h-8 w-8 text-peach-700" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Visi</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Menjadi penerbit terdepan di Indonesia yang memberikan kontribusi
                    nyata dalam memajukan literasi dan memberdayakan penulis Indonesia
                    untuk berkarya dan bersaing di tingkat nasional maupun internasional.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-peach-100 p-3 rounded-full">
                  <Target className="h-8 w-8 text-peach-700" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Misi</h3>
                  <ul className="text-gray-700 space-y-2 leading-relaxed list-disc list-inside">
                    <li>Menyediakan layanan penerbitan berkualitas tinggi</li>
                    <li>Membantu penulis mewujudkan karya terbaiknya</li>
                    <li>Meningkatkan literasi masyarakat Indonesia</li>
                    <li>Membangun ekosistem penerbitan yang sehat dan berkelanjutan</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Nilai-Nilai Kami" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 text-center h-full">
                    <div className="bg-peach-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-peach-700" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Perjalanan Kami" />
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-peach-200" />
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <Card className="p-6">
                      <h4 className="text-2xl font-bold text-peach-700 mb-2">
                        {milestone.year}
                      </h4>
                      <p className="text-gray-700">{milestone.event}</p>
                    </Card>
                  </div>
                  <div className="w-4 h-4 bg-peach-700 rounded-full border-4 border-white shadow-md z-10" />
                  <div className="w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Lokasi Kami" />
          <Card className="overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.0308891867676!2d110.36493931477728!3d-7.782894394405266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a582b31e6f7b9%3A0x9d7d8a3f7b3e8a5c!2sYogyakarta%2C%20Indonesia!5e0!3m2!1sen!2sid!4v1234567890123!5m2!1sen!2sid"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi CV Pijar Pendar Pustaka"
            />
          </Card>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-2">Alamat</h3>
              <p className="text-gray-600">
                Jl. Contoh No. 123, Yogyakarta, Indonesia
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-2">Telepon</h3>
              <p className="text-gray-600">+62 812-3456-7890</p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-2">Email</h3>
              <p className="text-gray-600">info@pijarpustaka.com</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

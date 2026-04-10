import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';
import { FAQ as FAQType } from '../types';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQType[] = [
    {
      id: '1',
      question: 'Apa itu ISBN dan mengapa penting untuk buku saya?',
      answer: 'ISBN (International Standard Book Number) adalah nomor unik yang mengidentifikasi buku Anda secara internasional. ISBN penting karena memudahkan distribusi, penjualan, dan katalogisasi buku di perpustakaan dan toko buku. Dengan ISBN, buku Anda akan lebih mudah ditemukan dan diakui secara resmi.'
    },
    {
      id: '2',
      question: 'Berapa lama waktu yang dibutuhkan untuk menerbitkan buku?',
      answer: 'Waktu penerbitan bervariasi tergantung paket yang dipilih. Secara umum, proses penerbitan memakan waktu 2-4 minggu untuk paket standar, termasuk editing, layout, desain cover, dan pengurusan ISBN. Untuk paket express, bisa lebih cepat dengan tambahan biaya.'
    },
    {
      id: '3',
      question: 'Apakah saya bisa mencetak buku dalam jumlah kecil?',
      answer: 'Ya, kami melayani cetak POD (Print on Demand) sehingga Anda bisa mencetak buku mulai dari 1 eksemplar. Ini sangat cocok untuk penulis yang ingin test market atau mencetak sesuai kebutuhan tanpa harus stok dalam jumlah besar.'
    },
    {
      id: '4',
      question: 'Bagaimana cara mengkonversi skripsi/tesis menjadi buku?',
      answer: 'Kami menyediakan layanan konversi KTI (Karya Tulis Ilmiah) menjadi buku. Tim editor kami akan membantu mengubah format akademik menjadi format buku yang lebih populer dan mudah dibaca, termasuk penyesuaian bahasa, layout, dan struktur buku.'
    },
    {
      id: '5',
      question: 'Apakah ada biaya tersembunyi dalam paket penerbitan?',
      answer: 'Tidak ada biaya tersembunyi. Semua biaya sudah termasuk dalam paket yang dipilih. Kami transparansi dalam sistem pembayaran. Jika ada layanan tambahan yang diinginkan di luar paket, kami akan menginformasikan biayanya terlebih dahulu.'
    },
    {
      id: '6',
      question: 'Bagaimana sistem royalti untuk penulis?',
      answer: 'Sistem royalti bervariasi tergantung kesepakatan dan jalur distribusi. Untuk buku yang didistribusikan melalui kami, royalti berkisar 10-15% dari harga jual. Untuk detail lengkap, silakan konsultasi dengan tim kami.'
    },
    {
      id: '7',
      question: 'Apakah buku saya bisa dijual di toko online seperti Shopee dan Tokopedia?',
      answer: 'Ya, kami memiliki layanan distribusi ke berbagai platform e-commerce termasuk Shopee, Tokopedia, dan marketplace lainnya. Kami juga bisa membantu mendistribusikan ke platform digital seperti Google Play Books dan IPUSNAS.'
    },
    {
      id: '8',
      question: 'Apakah saya perlu mendaftarkan HKI untuk buku saya?',
      answer: 'Meskipun tidak wajib, mendaftarkan HKI (Hak Kekayaan Intelektual) sangat disarankan untuk melindungi karya Anda dari plagiarisme dan pelanggaran hak cipta. Kami menyediakan layanan pengurusan HKI lengkap hingga Anda mendapat sertifikat resmi.'
    },
    {
      id: '9',
      question: 'Berapa minimal halaman untuk bisa diterbitkan?',
      answer: 'Untuk buku umum, minimal 48 halaman. Untuk buku akademik atau ilmiah, minimal 60 halaman. Namun, jumlah halaman ideal umumnya berkisar 100-300 halaman tergantung jenis dan genre buku.'
    },
    {
      id: '10',
      question: 'Apakah saya bisa minta revisi desain cover dan layout?',
      answer: 'Ya, tentu saja! Kami memberikan kesempatan revisi unlimited untuk desain cover dan layout hingga Anda puas dengan hasilnya. Kepuasan Anda adalah prioritas kami.'
    },
    {
      id: '11',
      question: 'Bagaimana cara bergabung dengan komunitas Pena Pijar?',
      answer: 'Anda bisa bergabung dengan mengisi formulir pendaftaran di halaman Komunitas. Setelah mendaftar, Anda akan diundang ke grup WhatsApp komunitas dan mendapat akses ke berbagai benefit seperti workshop gratis, proyek kolaborasi, dan konsultasi karya.'
    },
    {
      id: '12',
      question: 'Apakah ada program workshop atau pelatihan menulis?',
      answer: 'Ya, kami rutin mengadakan workshop menulis, seminar penerbitan, dan pelatihan editing. Informasi lengkap tentang jadwal dan pendaftaran bisa Anda lihat di halaman Event & Workshop atau follow media sosial kami.'
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
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
              Pertanyaan yang Sering Diajukan
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Temukan jawaban untuk pertanyaan umum seputar layanan penerbitan kami
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-left text-lg">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-peach-700 flex-shrink-0 ml-4 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-gray-700 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <SectionTitle
              title="Masih Punya Pertanyaan?"
              subtitle="Tim kami siap membantu Anda"
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/6281234567890?text=Halo,%20saya%20punya%20pertanyaan"
                className="inline-block"
              >
                <button className="bg-peach-200 text-peach-900 px-8 py-4 rounded-lg font-medium hover:bg-peach-300 transition-colors shadow-md">
                  Hubungi via WhatsApp
                </button>
              </a>
              <a
                href="mailto:info@pijarpustaka.com"
                className="inline-block"
              >
                <button className="border-2 border-peach-200 text-peach-700 px-8 py-4 rounded-lg font-medium hover:bg-peach-50 transition-colors">
                  Email Kami
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

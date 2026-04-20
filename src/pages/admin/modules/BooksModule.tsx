import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, ExternalLink, Search } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  price: number;
  cover_image: string;
  description: string;
  whatsapp_link: string;
  shopee_link: string;
  tokopedia_link: string;
}

export default function BooksModule({ passcode }: { passcode: string }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchBooks = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/books`);
      const data = await res.json();
      setBooks(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus buku ini secara permanen?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/books/${id}`, {
        method: 'DELETE',
        headers: { 'x-passcode': passcode }
      });
      if (res.ok) fetchBooks();
    } catch (err) {
      alert('Gagal menghapus buku');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    const method = editingBook ? 'PUT' : 'POST';
    const url = editingBook 
      ? `${import.meta.env.VITE_API_URL}/api/books/${editingBook.id}` 
      : `${import.meta.env.VITE_API_URL}/api/books`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'x-passcode': passcode 
        },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        setIsModalOpen(false);
        setEditingBook(null);
        fetchBooks();
      }
    } catch (err) {
      alert('Gagal menyimpan data');
    }
  };

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Cari judul atau penulis..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-peach-500 outline-none transition-all"
          />
        </div>
        <Button 
          onClick={() => { setEditingBook(null); setIsModalOpen(true); }}
          className="flex items-center gap-2 px-6"
        >
          <Plus className="h-5 w-5" /> Tambah Buku
        </Button>
      </div>

      <Card className="overflow-hidden border-0 shadow-sm bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Buku</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Harga</th>
                <th className="px-6 py-4">Link Marketplace</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-500">Memuat data...</td></tr>
              ) : filteredBooks.map((book) => (
                <tr key={book.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img src={book.cover_image} alt={book.title} className="w-12 h-16 object-cover rounded shadow-sm" />
                      <div>
                        <div className="font-bold text-gray-900">{book.title}</div>
                        <div className="text-sm text-gray-500">{book.author}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-peach-50 text-peach-700 rounded-full text-xs font-medium">
                      {book.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-700">
                    Rp {book.price.toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                       {book.shopee_link && (
                         <a href={book.shopee_link} target="_blank" className="p-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors">
                           <ExternalLink className="h-4 w-4" />
                         </a>
                       )}
                       {book.tokopedia_link && (
                         <a href={book.tokopedia_link} target="_blank" className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                           <ExternalLink className="h-4 w-4" />
                         </a>
                       )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => { setEditingBook(book); setIsModalOpen(true); }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(book.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h3 className="text-xl font-bold text-gray-900">
                {editingBook ? 'Edit Data Buku' : 'Tambah Buku Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Judul Buku" name="title" defaultValue={editingBook?.title} required />
                <Input label="Penulis" name="author" defaultValue={editingBook?.author} required />
                <Input label="Kategori" name="category" defaultValue={editingBook?.category} required />
                <Input label="Harga (Rp)" name="price" type="number" defaultValue={editingBook?.price} required />
                <Input label="URL Cover Buku" name="cover_image" defaultValue={editingBook?.cover_image} required />
                <Input label="Link WhatsApp" name="whatsapp_link" defaultValue={editingBook?.whatsapp_link} />
                <Input label="Link Shopee" name="shopee_link" defaultValue={editingBook?.shopee_link} />
                <Input label="Link Tokopedia" name="tokopedia_link" defaultValue={editingBook?.tokopedia_link} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Buku</label>
                <textarea 
                  name="description" 
                  rows={4}
                  defaultValue={editingBook?.description}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-peach-500 outline-none transition-all"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Batal</Button>
                <Button type="submit">Simpan Data</Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input 
        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-peach-500 outline-none transition-all"
        {...props}
      />
    </div>
  );
}

function X({ className }: any) { return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg> }

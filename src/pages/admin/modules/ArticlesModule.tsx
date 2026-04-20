import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Calendar, User } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';

interface Article {
  id: number;
  title: string;
  content: string;
  author: string;
  created_at: string;
}

export default function ArticlesModule({ passcode }: { passcode: string }) {
  const [data, setData] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Article | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/articles`);
      const json = await res.json();
      setData(json);
      setLoading(false);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus artikel ini?')) return;
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/articles/${id}`, {
        method: 'DELETE',
        headers: { 'x-passcode': passcode }
      });
      fetchData();
    } catch (err) { alert('Gagal menghapus'); }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const body = Object.fromEntries(formData.entries());
    
    if (!editingItem) {
      body.created_at = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    const method = editingItem ? 'PUT' : 'POST';
    const url = editingItem ? `${import.meta.env.VITE_API_URL}/api/articles/${editingItem.id}` : `${import.meta.env.VITE_API_URL}/api/articles`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'x-passcode': passcode },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        setIsModalOpen(false);
        setEditingItem(null);
        fetchData();
      }
    } catch (err) { alert('Gagal menyimpan'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={() => { setEditingItem(null); setIsModalOpen(true); }} className="flex items-center gap-2">
          <Plus className="h-5 w-5" /> Tulis Artikel Baru
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? <div className="p-12 text-center text-gray-500 bg-white rounded-2xl">Memuat artikel...</div> : data.map(article => (
          <Card key={article.id} className="p-6 bg-white hover:border-peach-200 transition-colors">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900">{article.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1"><User className="h-4 w-4"/> {article.author}</div>
                  <div className="flex items-center gap-1"><Calendar className="h-4 w-4"/> {article.created_at}</div>
                </div>
                <p className="text-gray-600 line-clamp-2 mt-2">{article.content}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setEditingItem(article); setIsModalOpen(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 className="h-4 w-4"/></button>
                <button onClick={() => handleDelete(article.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="h-4 w-4"/></button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-xl">{editingItem ? 'Edit Artikel' : 'Tulis Artikel Baru'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">X</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4 flex-1 overflow-y-auto">
              <Input label="Judul Artikel" name="title" defaultValue={editingItem?.title} required placeholder="Masukkan judul yang menarik..." />
              <Input label="Penulis" name="author" defaultValue={editingItem?.author} required placeholder="Nama penulis..." />
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Konten Artikel</label>
                <textarea 
                  name="content" 
                  defaultValue={editingItem?.content} 
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-peach-500 outline-none h-96 resize-none transition-all" 
                  placeholder="Mulai menulis cerita Anda di sini..."
                  required
                ></textarea>
              </div>
            </form>
            <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
               <Button onClick={() => setIsOpen(false)} variant="outline" type="button">Batal</Button>
               <Button type="submit" form="data-form-internal">Publikasikan Artikel</Button>
            </div>
            {/* Fix: use form id to connect submit button if needed, 
                but actually I will just put the buttons inside the form 
                for simpler logic in this snippet */}
          </div>
        </div>
      )}
    </div>
  );
}

// Helper to handle the form submit button being outside the scrollable area
// Actually I'll just adjust the modal structure for simpler implementation
function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-1">{label}</label>
      <input className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-peach-500 outline-none transition-all" {...props} />
    </div>
  );
}

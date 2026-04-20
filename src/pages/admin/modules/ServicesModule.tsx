import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, ExternalLink } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';

interface Service {
  id: number;
  name: string;
  slug: string;
  description: string;
  full_description: string;
  features: string;
  pricing_text: string;
  banner_image: string;
  gallery_images: string;
  price: number;
  shopee_link: string;
  tokopedia_link: string;
  color_class: string;
  icon_color: string;
}

export default function ServicesModule({ passcode }: { passcode: string }) {
  const [data, setData] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Service | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/services`);
      const json = await res.json();
      setData(json);
      setLoading(false);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus layanan ini?')) return;
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/services/${id}`, {
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

    // Convert newlines to JSON arrays for features and gallery
    if (typeof body.features === 'string') {
      body.features = JSON.stringify(body.features.split('\n').filter(Boolean));
    }
    if (typeof body.gallery_images === 'string') {
      body.gallery_images = JSON.stringify(body.gallery_images.split('\n').filter(Boolean));
    }

    const method = editingItem ? 'PUT' : 'POST';
    const url = editingItem ? `${import.meta.env.VITE_API_URL}/api/services/${editingItem.id}` : `${import.meta.env.VITE_API_URL}/api/services`;

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
          <Plus className="h-5 w-5" /> Tambah Layanan
        </Button>
      </div>

      <Card className="bg-white overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">Nama Layanan</th>
              <th className="p-4">Harga</th>
              <th className="p-4">Links</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? <tr><td colSpan={4} className="p-12 text-center text-gray-500">Memuat...</td></tr> : data.map(item => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`${item.color_class || 'bg-peach-100'} w-10 h-10 rounded-lg flex items-center justify-center shrink-0`}>
                      <span className={`text-xs font-bold ${item.icon_color || 'text-peach-700'}`}>{item.slug?.substring(0,2).toUpperCase()}</span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{item.name}</div>
                      <div className="text-xs text-gray-500 font-mono">{item.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 font-semibold">
                  {item.price ? `Rp ${item.price.toLocaleString('id-ID')}` : 'Hubungi Kami'}
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    {item.shopee_link && <a href={item.shopee_link} target="_blank" className="p-1 text-orange-600"><ExternalLink className="h-4 w-4" /></a>}
                    {item.tokopedia_link && <a href={item.tokopedia_link} target="_blank" className="p-1 text-green-600"><ExternalLink className="h-4 w-4" /></a>}
                  </div>
                </td>
                <td className="p-4 text-right flex justify-end gap-2">
                  <button onClick={() => { setEditingItem(item); setIsModalOpen(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 className="h-4 w-4"/></button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="h-4 w-4"/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="font-bold text-xl">{editingItem ? 'Edit Layanan' : 'Tambah Layanan'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">X</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Nama Layanan" name="name" defaultValue={editingItem?.name} required />
                <Input label="Slug (Icon Map)" name="slug" defaultValue={editingItem?.slug} placeholder="e.g. hki" required />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Input label="Harga (Angka)" name="price" type="number" defaultValue={editingItem?.price} />
                <Input label="Teks Harga (Detail)" name="pricing_text" defaultValue={editingItem?.pricing_text} placeholder="e.g. Mulai Rp 500.000" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input label="Banner Image URL" name="banner_image" defaultValue={editingItem?.banner_image} />
                <Input label="Color Class (Tailwind)" name="color_class" defaultValue={editingItem?.color_class} placeholder="bg-blue-50" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input label="Link Shopee" name="shopee_link" defaultValue={editingItem?.shopee_link} />
                <Input label="Link Tokopedia" name="tokopedia_link" defaultValue={editingItem?.tokopedia_link} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Short Description (Card)</label>
                <textarea name="description" defaultValue={editingItem?.description} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-peach-500 outline-none text-sm" rows={2}></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Full Description (Detail Page)</label>
                <textarea name="full_description" defaultValue={editingItem?.full_description} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-peach-500 outline-none text-sm" rows={4}></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Features List (Satu per baris)</label>
                <textarea 
                  name="features" 
                  defaultValue={editingItem?.features ? (editingItem.features.startsWith('[') ? JSON.parse(editingItem.features).join('\n') : editingItem.features) : ''} 
                  placeholder="ISBN resmi&#10;Editing profesional"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-peach-500 outline-none text-sm font-mono" 
                  rows={4}
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Gallery Images URL (Satu per baris)</label>
                <textarea 
                  name="gallery_images" 
                  defaultValue={editingItem?.gallery_images ? (editingItem.gallery_images.startsWith('[') ? JSON.parse(editingItem.gallery_images).join('\n') : editingItem.gallery_images) : ''} 
                  placeholder="https://images...&#10;https://images..."
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-peach-500 outline-none text-sm font-mono" 
                  rows={4}
                ></textarea>
              </div>
              
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button onClick={() => setIsModalOpen(false)} variant="outline">Batal</Button>
                <Button type="submit">Simpan Perubahan</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input className="w-full p-2 border rounded-xl" {...props} />
    </div>
  );
}

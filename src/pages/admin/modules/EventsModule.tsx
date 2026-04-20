import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, MapPin, Calendar as CalendarIcon } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  shopee_link: string;
  tokopedia_link: string;
}

export default function EventsModule({ passcode }: { passcode: string }) {
  const [data, setData] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Event | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/events`);
      const json = await res.json();
      setData(json);
      setLoading(false);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus event ini?')) return;
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/events/${id}`, {
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
    const method = editingItem ? 'PUT' : 'POST';
    const url = editingItem ? `${import.meta.env.VITE_API_URL}/api/events/${editingItem.id}` : `${import.meta.env.VITE_API_URL}/api/events`;

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
          <Plus className="h-5 w-5" /> Tambah Event
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? <div className="col-span-full p-12 text-center text-gray-500 bg-white rounded-2xl">Memuat event...</div> : data.map(event => (
          <Card key={event.id} className="p-6 bg-white flex justify-between items-start">
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-900">{event.name}</h3>
              <div className="flex flex-col gap-1 text-sm text-gray-600">
                <div className="flex items-center gap-2"><CalendarIcon className="h-4 w-4 text-orange-500" /> {event.date}</div>
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-red-500" /> {event.location}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setEditingItem(event); setIsModalOpen(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 className="h-4 w-4"/></button>
              <button onClick={() => handleDelete(event.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="h-4 w-4"/></button>
            </div>
          </Card>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-xl">{editingItem ? 'Edit Event' : 'Tambah Event'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 font-bold">X</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <Input label="Nama Event" name="name" defaultValue={editingItem?.name} required />
              <Input label="Tanggal & Waktu" name="date" defaultValue={editingItem?.date} placeholder="Contoh: 25 Mei 2026, 10:00 WIB" required />
              <Input label="Lokasi" name="location" defaultValue={editingItem?.location} placeholder="Contoh: Gedung Serbaguna..." required />
              <Input label="Link Shopee (Tiket)" name="shopee_link" defaultValue={editingItem?.shopee_link} />
              <Input label="Link Tokopedia (Tiket)" name="tokopedia_link" defaultValue={editingItem?.tokopedia_link} />
              <div className="flex justify-end gap-3 pt-4">
                <Button onClick={() => setIsModalOpen(false)} variant="outline">Batal</Button>
                <Button type="submit">Simpan Event</Button>
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
      <label className="block text-sm font-bold text-gray-700 mb-1">{label}</label>
      <input className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-peach-500 outline-none transition-all" {...props} />
    </div>
  );
}

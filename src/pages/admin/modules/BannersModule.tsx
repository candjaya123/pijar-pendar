import { useState, useEffect } from 'react';
import { Image, Save, Globe } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';

interface Banner {
  id?: number;
  page_name: string;
  banner_url: string;
}

const PAGES = [
  { id: 'home', name: 'Beranda' },
  { id: 'katalog', name: 'Katalog Buku' },
  { id: 'layanan', name: 'Layanan' },
  { id: 'komunitas', name: 'Komunitas' },
  { id: 'artikel', name: 'Artikel' },
  { id: 'faq', name: 'FAQ' },
  { id: 'tentang', name: 'Tentang Kami' }
];

export default function BannersModule({ passcode }: { passcode: string }) {
  const [banners, setBanners] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/banners`)
      .then(res => res.json())
      .then(data => {
        const bMap: Record<string, string> = {};
        data.forEach((b: Banner) => {
          bMap[b.page_name] = b.banner_url;
        });
        setBanners(bMap);
        setLoading(false);
      });
  }, []);

  const handleUpdate = async (page_name: string, url: string) => {
    setSaving(page_name);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/banners`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-passcode': passcode 
        },
        body: JSON.stringify({ page_name, banner_url: url })
      });
      if (res.ok) {
        setBanners(prev => ({ ...prev, [page_name]: url }));
        alert(`Banner ${page_name} berhasil diperbarui!`);
      }
    } catch (err) {
      alert('Gagal memperbarui banner');
    } finally {
      setSaving(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-peach-50 border border-peach-200 p-6 rounded-2xl mb-8 flex items-center gap-4">
        <div className="bg-peach-200 p-3 rounded-xl">
          <Globe className="h-6 w-6 text-peach-700" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Pengaturan Banner Halaman</h2>
          <p className="text-sm text-gray-600">Sesuaikan gambar latar belakang (Banner) untuk setiap halaman website Anda.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-12 text-gray-500">Memuat data banner...</div>
        ) : PAGES.map(page => (
          <Card key={page.id} className="p-6 bg-white overflow-hidden group hover:border-peach-400 transition-all border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <Image className="h-4 w-4 text-peach-600" />
                {page.name}
              </h3>
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">{page.id}</span>
            </div>
            
            <div className="space-y-4">
              <div className="relative group/img aspect-video rounded-xl bg-gray-100 overflow-hidden border border-gray-200">
                {banners[page.id] ? (
                  <img src={banners[page.id]} alt={page.name} className="w-full h-full object-cover transition-transform group-hover/img:scale-105" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                    <Image className="h-8 w-8 mb-2 opacity-20" />
                    <span className="text-xs">Blom ada banner (Default)</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-xs font-medium px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/30">Preview Banner</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Banner URL</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    defaultValue={banners[page.id] || ''}
                    placeholder="https://..."
                    className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-peach-500 outline-none transition-all text-sm"
                    id={`input-${page.id}`}
                  />
                  <Button 
                    size="sm"
                    onClick={() => {
                      const input = document.getElementById(`input-${page.id}`) as HTMLInputElement;
                      handleUpdate(page.id, input.value);
                    }}
                    disabled={saving === page.id}
                    className="flex items-center gap-2 shadow-lg shadow-peach-200"
                  >
                    <Save className="h-4 w-4" />
                    {saving === page.id ? '...' : 'Update'}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

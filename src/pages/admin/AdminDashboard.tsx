import { useState, useEffect } from 'react';
import { 
  BarChart3, Book, Layers, Calendar, FileText, 
  LogOut, Plus, Edit2, Trash2, ExternalLink,
  ChevronLeft, ChevronRight, Menu, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import AdminLogin from './AdminLogin';
import BooksModule from './modules/BooksModule';
import ServicesModule from './modules/ServicesModule';
import EventsModule from './modules/EventsModule';
import ArticlesModule from './modules/ArticlesModule';
import BannersModule from './modules/BannersModule';

type Module = 'overview' | 'books' | 'services' | 'events' | 'articles' | 'banners';

export default function AdminDashboard() {
  const [passcode, setPasscode] = useState<string | null>(localStorage.getItem('admin_passcode'));
  const [activeModule, setActiveModule] = useState<Module>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogin = (code: string) => {
    localStorage.setItem('admin_passcode', code);
    setPasscode(code);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_passcode');
    setPasscode(null);
  };

  if (!passcode) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-orange-600 text-white flex flex-col sticky top-0 h-screen z-50 transition-all duration-300 shadow-2xl shadow-orange-900/20"
      >
        <div className="p-6 flex items-center justify-between border-b border-white/10">
          <AnimatePresence mode="wait">
            {isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="font-bold text-xl whitespace-nowrap"
              >
                Admin Panel
              </motion.div>
            )}
          </AnimatePresence>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isSidebarOpen ? <ChevronLeft /> : <Menu />}
          </button>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-2">
          <NavItem 
            icon={<BarChart3 />} 
            label="Overview" 
            active={activeModule === 'overview'} 
            collapsed={!isSidebarOpen}
            onClick={() => setActiveModule('overview')} 
          />
          <NavItem 
            icon={<Book />} 
            label="Katalog Buku" 
            active={activeModule === 'books'} 
            collapsed={!isSidebarOpen}
            onClick={() => setActiveModule('books')} 
          />
          <NavItem 
            icon={<Layers />} 
            label="Layanan" 
            active={activeModule === 'services'} 
            collapsed={!isSidebarOpen}
            onClick={() => setActiveModule('services')} 
          />
          <NavItem 
            icon={<Calendar />} 
            label="Event" 
            active={activeModule === 'events'} 
            collapsed={!isSidebarOpen}
            onClick={() => setActiveModule('events')} 
          />
          <NavItem 
            icon={<FileText />} 
            label="Artikel" 
            active={activeModule === 'articles'} 
            collapsed={!isSidebarOpen}
            onClick={() => setActiveModule('articles')} 
          />
          <NavItem 
            icon={<Layers />} 
            label="Manajemen Banner" 
            active={activeModule === 'banners'} 
            collapsed={!isSidebarOpen}
            onClick={() => setActiveModule('banners')} 
          />
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-red-500/20 rounded-xl transition-all"
          >
            <LogOut className="h-5 w-5" />
            {isSidebarOpen && <span className="font-medium">Keluar</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b px-8 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800 capitalize">
            {activeModule === 'overview' ? 'Dashboard Overview' : `Kelola ${activeModule}`}
          </h2>
          <div className="flex items-center gap-4">
             <span className="text-sm text-gray-500">Pijar Pendar Pustaka v1.0 Admin</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
           <AdminContent module={activeModule} passcode={passcode} />
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick, collapsed }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
        active 
          ? 'bg-white text-peach-700 shadow-lg' 
          : 'text-white/70 hover:text-white hover:bg-white/10'
      }`}
    >
      <div className={`${active ? 'text-peach-700' : 'group-hover:scale-110'} transition-transform`}>
        {icon}
      </div>
      {!collapsed && <span className="font-medium">{label}</span>}
      {collapsed && (
        <div className="absolute left-full ml-4 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
          {label}
        </div>
      )}
    </button>
  );
}

// Content Modules Dispatcher
function AdminContent({ module, passcode }: { module: Module, passcode: string }) {
  return (
    <div className="max-w-6xl">
       {module === 'overview' && <Overview />}
       {module === 'books' && <BooksModule passcode={passcode} />}
       {module === 'services' && <ServicesModule passcode={passcode} />}
       {module === 'events' && <EventsModule passcode={passcode} />}
       {module === 'articles' && <ArticlesModule passcode={passcode} />}
       {module === 'banners' && <BannersModule passcode={passcode} />}
    </div>
  );
}

function Overview() {
  const [counts, setCounts] = useState({ books: 0, services: 0, events: 0, articles: 0 });

  useEffect(() => {
    Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/api/books`).then(r => r.json()),
      fetch(`${import.meta.env.VITE_API_URL}/api/services`).then(r => r.json()),
      fetch(`${import.meta.env.VITE_API_URL}/api/events`).then(r => r.json()),
      fetch(`${import.meta.env.VITE_API_URL}/api/articles`).then(r => r.json())
    ]).then(([books, services, events, articles]) => {
      setCounts({
        books: books.length,
        services: services.length,
        events: events.length,
        articles: articles.length
      });
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
       <StatCard label="Total Buku" value={counts.books} icon={<Book />} color="text-blue-600" bg="bg-blue-50" />
       <StatCard label="Total Layanan" value={counts.services} icon={<Layers />} color="text-purple-600" bg="bg-purple-50" />
       <StatCard label="Event Aktif" value={counts.events} icon={<Calendar />} color="text-orange-600" bg="bg-orange-50" />
       <StatCard label="Artikel" value={counts.articles} icon={<FileText />} color="text-green-600" bg="bg-green-50" />
    </div>
  );
}

function StatCard({ label, value, icon, color, bg }: any) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`${bg} ${color} p-3 rounded-xl`}>{icon}</div>
      </div>
      <h3 className="text-gray-500 text-sm font-medium mb-1">{label}</h3>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </Card>
  );
}



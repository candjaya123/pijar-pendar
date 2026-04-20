import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Store from './pages/Store';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Community from './pages/Community';
import Blog from './pages/Blog';
import FAQ from './pages/FAQ';
import About from './pages/About';
import BookDetail from './pages/BookDetail';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Dashboard - Separate Layout */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Public Pages - Site Layout */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/katalog" element={<Store />} />
                <Route path="/katalog/:id" element={<BookDetail />} />
                <Route path="/layanan" element={<Services />} />
                <Route path="/layanan/:slug" element={<ServiceDetail />} />
                <Route path="/komunitas" element={<Community />} />
                <Route path="/artikel" element={<Blog />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/tentang" element={<About />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
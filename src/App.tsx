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

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/katalog" element={<Store />} />
          <Route path="/layanan" element={<Services />} />
          <Route path="/layanan/:slug" element={<ServiceDetail />} />
          <Route path="/komunitas" element={<Community />} />
          <Route path="/artikel" element={<Blog />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/tentang" element={<About />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

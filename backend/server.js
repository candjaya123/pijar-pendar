const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'database.db');
const PASSCODE = '5555'; // Simple passcode for admin

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Authentication Middleware (Simple)
const authMiddleware = (req, res, next) => {
  const code = req.headers['x-passcode'];
  if (code === PASSCODE) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized: Invalid Passcode' });
  }
};

// Generic Helper for CRUD
const handleRequest = (query, params, res, single = false) => {
  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (single) {
      res.json(rows[0] || null);
    } else {
      res.json(rows);
    }
  });
};

// Database Initialization
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    createTables();
  }
});

function seedServices() {
  const defaultServices = [
    { 
      name: 'Penerbitan Buku', 
      slug: 'penerbitan', 
      description: 'Layanan penerbitan buku profesional dengan ISBN resmi mulai dari Rp 550.000', 
      full_description: 'Kami menyediakan layanan penerbitan buku lengkap dengan ISBN resmi. Paket kami mencakup editing, layout, desain cover, dan pengurusan ISBN. Dengan pengalaman lebih dari 8 tahun, kami siap membantu mewujudkan impian Anda menjadi penulis buku ber-ISBN.',
      features: JSON.stringify(['ISBN resmi dari Perpustakaan Nasional', 'Editing profesional', 'Desain cover menarik', 'Layout berkualitas tinggi', 'Konsultasi gratis', 'Proses cepat (2-4 minggu)']),
      pricing_text: 'Paket mulai dari Rp 550.000',
      banner_image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=1200',
      gallery_images: JSON.stringify([]),
      color: 'bg-blue-50', 
      iconColor: 'text-blue-600' 
    },
    { 
      name: 'Desain & Layout', 
      slug: 'desain-layout', 
      description: 'Desain cover premium dan layout profesional untuk buku Anda', 
      full_description: 'Tim desainer profesional kami siap membuat desain cover yang menarik dan layout buku yang rapi dan nyaman dibaca. Kami mengutamakan estetika dan keterbacaan untuk memberikan hasil terbaik.',
      features: JSON.stringify(['Desain cover premium', 'Layout interior profesional', 'Revisi unlimited', 'File siap cetak (PDF)', 'Konsultasi desain', 'Berbagai pilihan template']),
      pricing_text: 'Mulai dari Rp 300.000',
      banner_image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200',
      gallery_images: JSON.stringify([
        'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2099691/pexels-photo-2099691.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]),
      color: 'bg-purple-50', 
      iconColor: 'text-purple-600' 
    },
    { 
      name: 'Konversi KTI ke Buku', 
      slug: 'konversi-kti', 
      description: 'Ubah karya tulis ilmiah menjadi buku ber-ISBN yang siap diterbitkan', 
      full_description: 'Layanan konversi karya tulis ilmiah (skripsi, tesis, disertasi) menjadi buku ber-ISBN yang siap diterbitkan. Proses mudah dan hasil berkualitas.',
      features: JSON.stringify(['Konversi format akademik ke buku', 'Editing substansi', 'Penyesuaian layout', 'ISBN resmi', 'Desain cover akademik', 'Proses cepat']),
      pricing_text: 'Mulai dari Rp 650.000',
      banner_image: 'https://images.pexels.com/photos/256520/pexels-photo-256520.jpeg?auto=compress&cs=tinysrgb&w=1200',
      gallery_images: JSON.stringify([]),
      color: 'bg-green-50', 
      iconColor: 'text-green-600' 
    },
    { 
      name: 'Percetakan', 
      slug: 'percetakan', 
      description: 'Layanan cetak buku dengan kualitas terbaik dan harga kompetitif', 
      full_description: 'Cetak buku dengan teknologi modern dan bahan berkualitas. Kami melayani cetak dalam jumlah kecil maupun besar dengan harga kompetitif.',
      features: JSON.stringify(['Cetak POD (Print on Demand)', 'Berbagai pilihan kertas', 'Finishing berkualitas', 'Harga kompetitif', 'Pengiriman ke seluruh Indonesia', 'Minimal order fleksibel']),
      pricing_text: 'Harga per eksemplar mulai Rp 15.000',
      banner_image: 'https://images.pexels.com/photos/159751/book-address-book-learning-learn-159751.jpeg?auto=compress&cs=tinysrgb&w=1200',
      gallery_images: JSON.stringify([
        'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]),
      color: 'bg-orange-50', 
      iconColor: 'text-orange-600' 
    },
    { 
      name: 'Hak Kekayaan Intelektual', 
      slug: 'hki', 
      description: 'Pengurusan HKI untuk melindungi karya tulis Anda secara legal', 
      full_description: 'Layanan pengurusan Hak Kekayaan Intelektual (HKI) untuk melindungi karya tulis Anda. Tim ahli kami siap membantu proses pendaftaran hingga selesai.',
      features: JSON.stringify(['Pendaftaran HKI resmi', 'Konsultasi hukum', 'Proses profesional', 'Sertifikat resmi', 'Tracking status aplikasi', 'Dokumentasi lengkap']),
      pricing_text: 'Mulai dari Rp 1.200.000',
      banner_image: 'https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&w=1200',
      gallery_images: JSON.stringify([]),
      color: 'bg-red-50', 
      iconColor: 'text-red-600' 
    },
    { 
      name: 'Event & Workshop', 
      slug: 'event-workshop', 
      description: 'Workshop menulis, seminar penerbitan, dan berbagai acara literasi', 
      full_description: 'Kami menyelenggarakan workshop menulis, seminar penerbitan, dan berbagai acara literasi. Tingkatkan kemampuan menulis Anda bersama para ahli.',
      features: JSON.stringify(['Workshop menulis rutin', 'Seminar penerbitan', 'Pelatihan editing', 'Konsultasi karya', 'Networking dengan penulis', 'Sertifikat peserta']),
      pricing_text: 'Mulai dari Rp 150.000/peserta',
      banner_image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1200',
      gallery_images: JSON.stringify([
        'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]),
      color: 'bg-yellow-50', 
      iconColor: 'text-yellow-600' 
    },
    { 
      name: 'Program Reseller', 
      slug: 'reseller', 
      description: 'Bergabung sebagai reseller dengan komisi menarik hingga 30%', 
      full_description: 'Dapatkan penghasilan tambahan dengan menjadi reseller buku kami. Sistem mudah, komisi menarik, dan dukungan penuh dari tim kami.',
      features: JSON.stringify(['Komisi hingga 30%', 'Katalog lengkap', 'Material promosi gratis', 'Pelatihan reseller', 'Support tim marketing', 'Pengiriman dropship']),
      pricing_text: 'Gratis bergabung',
      banner_image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200',
      gallery_images: JSON.stringify([]),
      color: 'bg-pink-50', 
      iconColor: 'text-pink-600' 
    },
    { 
      name: 'Distribusi Digital', 
      slug: 'distribusi-digital', 
      description: 'Distribusikan buku Anda ke platform digital seperti Google Play Books', 
      full_description: 'Perluas jangkauan pembaca dengan mendistribusikan buku Anda ke berbagai platform digital seperti Google Play Books, IPUSNAS, dan lainnya.',
      features: JSON.stringify(['Distribusi multi-platform', 'Google Play Books', 'IPUSNAS', 'E-commerce marketplace', 'Royalti transparan', 'Laporan penjualan berkala']),
      pricing_text: 'Mulai dari Rp 500.000',
      banner_image: 'https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg?auto=compress&cs=tinysrgb&w=1200',
      gallery_images: JSON.stringify([]),
      color: 'bg-indigo-50', 
      iconColor: 'text-indigo-600' 
    },
    { 
      name: 'Pengadaan Perpustakaan', 
      slug: 'pengadaan-perpus', 
      description: 'Solusi pengadaan buku untuk perpustakaan sekolah, kampus, dan instansi', 
      full_description: 'Kami menyediakan solusi pengadaan buku untuk perpustakaan sekolah, kampus, dan instansi. Proses mudah, harga khusus, dan pelayanan profesional.',
      features: JSON.stringify(['Harga khusus institusi', 'Katalog lengkap', 'Proses tender', 'Pengiriman terjadwal', 'Invoice resmi', 'Konsultasi koleksi']),
      pricing_text: 'Harga disesuaikan volume',
      banner_image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1200',
      gallery_images: JSON.stringify([]),
      color: 'bg-teal-50', 
      iconColor: 'text-teal-600' 
    }
  ];

  db.get("SELECT COUNT(*) as count FROM services", (err, row) => {
    if (row && row.count === 0) {
      const stmt = db.prepare("INSERT INTO services (name, slug, description, full_description, features, pricing_text, banner_image, gallery_images, color_class, icon_color) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
      defaultServices.forEach(s => stmt.run(s.name, s.slug, s.description, s.full_description, s.features, s.pricing_text, s.banner_image, s.gallery_images, s.color, s.iconColor));
      stmt.finalize();
      console.log('Seeded 9 default services with full details.');
    }
  });
}

function createTables() {
  db.serialize(() => {
    // Books Table
    db.run(`CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT,
      category TEXT,
      price INTEGER,
      cover_image TEXT,
      description TEXT,
      whatsapp_link TEXT,
      shopee_link TEXT,
      tokopedia_link TEXT
    )`);

    // Services Table
    db.run(`CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT UNIQUE,
      description TEXT,
      full_description TEXT,
      features TEXT,
      pricing_text TEXT,
      banner_image TEXT,
      gallery_images TEXT,
      price INTEGER,
      shopee_link TEXT,
      tokopedia_link TEXT,
      color_class TEXT,
      icon_color TEXT
    )`, () => {
      seedServices();
    });

    // Events Table
    db.run(`CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      date TEXT,
      location TEXT,
      shopee_link TEXT,
      tokopedia_link TEXT
    )`);

    // Articles Table
    db.run(`CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT,
      author TEXT,
      created_at TEXT
    )`);

    // Banners Table
    db.run(`CREATE TABLE IF NOT EXISTS banners (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      page_name TEXT UNIQUE NOT NULL,
      banner_url TEXT
    )`);
  });
}


// Banners
app.get('/api/banners', (req, res) => {
  handleRequest('SELECT * FROM banners', [], res);
});

app.get('/api/banners/:page', (req, res) => {
  handleRequest('SELECT * FROM banners WHERE page_name = ?', [req.params.page], res, true);
});

app.post('/api/banners', authMiddleware, (req, res) => {
  const { page_name, banner_url } = req.body;
  if (!page_name) return res.status(400).json({ error: 'Page name is required' });
  
  // Upsert logic
  db.run(`INSERT INTO banners (page_name, banner_url) VALUES (?, ?) 
          ON CONFLICT(page_name) DO UPDATE SET banner_url = EXCLUDED.banner_url`, 
    [page_name, banner_url], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Success', page_name, banner_url });
  });
});



// --- API ENDPOINTS ---



// Books
app.get('/api/books', (req, res) => {
  handleRequest('SELECT * FROM books', [], res);
});

app.post('/api/books', authMiddleware, (req, res) => {
  const { title, author, category, price, cover_image, description, whatsapp_link, shopee_link, tokopedia_link } = req.body;
  const sql = `INSERT INTO books (title, author, category, price, cover_image, description, whatsapp_link, shopee_link, tokopedia_link) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.run(sql, [title, author, category, price, cover_image, description, whatsapp_link, shopee_link, tokopedia_link], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, ...req.body });
  });
});

app.put('/api/books/:id', authMiddleware, (req, res) => {
  const { title, author, category, price, cover_image, description, whatsapp_link, shopee_link, tokopedia_link } = req.body;
  const sql = `UPDATE books SET title=?, author=?, category=?, price=?, cover_image=?, description=?, whatsapp_link=?, shopee_link=?, tokopedia_link=? WHERE id=?`;
  db.run(sql, [title, author, category, price, cover_image, description, whatsapp_link, shopee_link, tokopedia_link, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Success' });
  });
});

app.delete('/api/books/:id', authMiddleware, (req, res) => {
  db.run('DELETE FROM books WHERE id = ?', req.params.id, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Deleted' });
  });
});

// Services
app.get('/api/services', (req, res) => {
  handleRequest('SELECT * FROM services', [], res);
});

app.get('/api/services/:slug', (req, res) => {
  handleRequest('SELECT * FROM services WHERE slug = ?', [req.params.slug], res, true);
});

app.post('/api/services', authMiddleware, (req, res) => {
  const { 
    name, slug, description, full_description, features, 
    pricing_text, banner_image, gallery_images, 
    price, shopee_link, tokopedia_link, color_class, icon_color 
  } = req.body;
  
  db.run(`INSERT INTO services (
    name, slug, description, full_description, features, 
    pricing_text, banner_image, gallery_images, 
    price, shopee_link, tokopedia_link, color_class, icon_color
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
    [
      name, slug, description, full_description, features, 
      pricing_text, banner_image, gallery_images, 
      price, shopee_link, tokopedia_link, color_class, icon_color
    ], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, ...req.body });
  });
});

app.put('/api/services/:id', authMiddleware, (req, res) => {
  const { 
    name, slug, description, full_description, features, 
    pricing_text, banner_image, gallery_images, 
    price, shopee_link, tokopedia_link, color_class, icon_color 
  } = req.body;
  
  db.run(`UPDATE services SET 
    name=?, slug=?, description=?, full_description=?, features=?, 
    pricing_text=?, banner_image=?, gallery_images=?, 
    price=?, shopee_link=?, tokopedia_link=?, color_class=?, icon_color=? 
    WHERE id=?`, 
    [
      name, slug, description, full_description, features, 
      pricing_text, banner_image, gallery_images, 
      price, shopee_link, tokopedia_link, color_class, icon_color, 
      req.params.id
    ], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Success' });
  });
});

app.delete('/api/services/:id', authMiddleware, (req, res) => {
  db.run('DELETE FROM services WHERE id = ?', req.params.id, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Deleted' });
  });
});

// Events
app.get('/api/events', (req, res) => {
  handleRequest('SELECT * FROM events', [], res);
});

app.post('/api/events', authMiddleware, (req, res) => {
  const { name, date, location, shopee_link, tokopedia_link } = req.body;
  db.run(`INSERT INTO events (name, date, location, shopee_link, tokopedia_link) VALUES (?, ?, ?, ?, ?)`, 
    [name, date, location, shopee_link, tokopedia_link], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, ...req.body });
  });
});

app.delete('/api/events/:id', authMiddleware, (req, res) => {
  db.run('DELETE FROM events WHERE id = ?', req.params.id, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Deleted' });
  });
});

// Articles
app.get('/api/articles', (req, res) => {
  handleRequest('SELECT * FROM articles', [], res);
});

app.post('/api/articles', authMiddleware, (req, res) => {
  const { title, content, author, created_at } = req.body;
  db.run(`INSERT INTO articles (title, content, author, created_at) VALUES (?, ?, ?, ?)`, 
    [title, content, author, created_at], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, ...req.body });
  });
});

app.put('/api/articles/:id', authMiddleware, (req, res) => {
  const { title, content, author, created_at } = req.body;
  db.run(`UPDATE articles SET title=?, content=?, author=?, created_at=? WHERE id=?`, 
    [title, content, author, created_at, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Success' });
  });
});

app.delete('/api/articles/:id', authMiddleware, (req, res) => {
  db.run('DELETE FROM articles WHERE id = ?', req.params.id, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Deleted' });
  });
});

// Auth check endpoint
app.post('/api/login', (req, res) => {
  const { passcode } = req.body;
  if (passcode === PASSCODE) {
    res.json({ success: true, token: PASSCODE }); // Simple token
  } else {
    res.status(401).json({ success: false, message: 'Invalid Passcode' });
  }
});

// Serve static frontend files if ../dist exists
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// For React Router, catch all non-API routes and send index.html
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(distPath, 'index.html'));
  } else {
    res.status(404).json({ error: 'API route not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

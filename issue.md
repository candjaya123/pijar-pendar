# Tugas Implementasi: Admin Dashboard & Integrasi Backend SQLite

**Penugasan ke:** Junior Developer / AI Assistant
**Dari:** Senior Developer
**Status:** 🔴 High Priority / Ready for Dev

Halo tim/AI, kita perlu mengganti data statis (*mockup*) di proyek Pijar Pendar agar menjadi dinamis dan *real*. Tugas Anda adalah membangun *admin dashboard* sederhana lengkap dengan fungsionalitas CRUD. 

Baca instruksi dan spesifikasi teknis di bawah ini dengan sangat teliti. Pastikan hasil akhir berupa *working code* yang siap dijalankan.

---

## 1. Spesifikasi Utama

* **Integrasi Codebase (PENTING)**: Pengembangan fitur ini HARUS diintegrasikan langsung ke dalam *codebase* utama yang sudah ada tanpa melakukan perombakan total terhadap logika dan struktur yang sedang berjalan.
* **Sistem Keamanan Akses**: Sebelum bisa masuk ke laman Admin Dashboard, user harus memasukkan *passcode*. *Passcode* ini cukup di-*hardcode* / di-*embed* langsung di dalam program (baik di *frontend* js maupun *backend*, cukup buat sistem autentikasi sederhana).
* **Backend**: Node.js + Express.js
* **Database**: SQLite (file-based *local database* `database.db`, harus terbuat otomatis jika belum ada).
* **Frontend**: HTML, CSS, dan Vanilla JavaScript murni (TIDAK BOLEH menggunakan *framework*).

## 2. Struktur Proyek yang Diharapkan
Pisahkan *frontend* dan *backend* di dalam direktori baru.
```text
/backend
  ├── server.js
  ├── database.db (auto-generated)
  └── package.json
/frontend
  ├── index.html
  ├── style.css
  └── app.js
```

## 3. Desain UI & Tema (Peach Theme)

Gunakan variabel CSS berikut di root file `style.css` Anda:

```css
:root {
  --peach-50: #FFF5EE;
  --peach-100: #FFE9DC;
  --peach-200: #FFDAB9;
  --peach-300: #FFCB96;
  --peach-400: #FFB873;
  --peach-500: #FFA550;
  --peach-600: #FF922D;
  --peach-700: #E67300;
  --peach-800: #B35900;
  --peach-900: #804000;

  --primary: #FFDAB9;
}
```

**Panduan Styling:**
* **Background utama**: `--peach-50`
* **Sidebar**: Gunakan `--peach-600` atau `--peach-700`
* **Button Utama**: `--peach-500` (Hover: `--peach-600`)
* **Header Tabel**: `--peach-200`
* **Card/Container**: Warna putih solid dengan *soft shadow* untuk menonjolkan konten.
* UI harus minimalis, bersih, modern, dan tentunya responsif.

## 4. Fitur Dashboard & Fungsionalitas CRUD

Layout Sidebar harus memuat navigasi ke:
1. Dashboard (Home/Overview)
2. Books (Buku)
3. Services (Layanan)
4. Events (Acara)
5. Articles (Artikel)

Setiap entitas/modul **WAJIB** mendukung 4 operasi dasar: Create, Read, Update, Delete.

### Detail Database & Tabel (SQLite)

**1. Books**
* `id` (INTEGER, PRIMARY KEY, AUTOINCREMENT)
* `title` (TEXT)
* `author` (TEXT)
* `price` (INTEGER)
* `shopee_link` (TEXT)
* `tokopedia_link` (TEXT)

**2. Services**
* `id` (INTEGER, PRIMARY KEY, AUTOINCREMENT)
* `name` (TEXT)
* `description` (TEXT)
* `price` (INTEGER)
* `shopee_link` (TEXT)
* `tokopedia_link` (TEXT)

**3. Events**
* `id` (INTEGER, PRIMARY KEY, AUTOINCREMENT)
* `name` (TEXT)
* `date` (TEXT)
* `location` (TEXT)
* `shopee_link` (TEXT)
* `tokopedia_link` (TEXT)

**4. Articles**
* `id` (INTEGER, PRIMARY KEY, AUTOINCREMENT)
* `title` (TEXT)
* `content` (TEXT) - *(Dari sisi frontend form, gunakan tag `<textarea>`)*
* `author` (TEXT)
* `created_at` (TEXT) - *(Dari frontend, isi secara otomatis dengan tanggal hari ini saat dibuat)*

## 5. Spesifikasi Backend API (Express)

Pastikan ada *middleware* untuk mengizinkan **CORS** dan *parsing* `application/json`.
*Endpoint* RESTful API yang harus dibuat:

**Books**
* `GET /books`
* `POST /books`
* `PUT /books/:id`
* `DELETE /books/:id`

**Services**
* `GET /services`
* `POST /services`
* `PUT /services/:id`
* `DELETE /services/:id`

**Events**
* `GET /events`
* `POST /events`
* `PUT /events/:id`
* `DELETE /events/:id`

**Articles**
* `GET /articles`
* `POST /articles`
* `PUT /articles/:id`
* `DELETE /articles/:id`

## 6. Perilaku Frontend yang Diharapkan

1. Manfaatkan **Fetch API** browser bawaan untuk komunikasi dengan *backend*.
2. Memiliki *form input* untuk operasi penambahan (Create) & pengeditan (Update) di semua modul.
3. Menampilkan data dalam bentuk *Table*. Di setiap baris data, tambahkan 2 tombol *action*: **Edit** & **Delete**.
4. Untuk setiap nilai yang berisi tautan *(marketplace links)*, buat teks tersebut *clickable* (menggunakan tag `<a>`) yang mengarah ke *tab* baru (`target="_blank"`).
5. Munculkan pesan *success* atau *error* (Bisa berupa Toast UI sederhana atau `alert`) setiap kali selesai melakukan *action* spesifik (seperti saat sukses menyimpan/menghapus atau ketika gagal *fetch*).

## 7. Format Output Delivery

Yang ingin saya terima pada pengerjaan ini adalah:
1. Potongan **Full Working Code** untuk sisi frontend dan backend secara utuh.
2. Langkah-langkah / Terminal Commands untuk meng-*install* dependensi (*Install Steps*).
3. Langkah-langkah menjalankan server dan *frontend* (*Run Steps*).
4. Instruksi singkat penggunaan sistemnya, termasuk *passcode* yang telah dimasukkan.

Buat code base-nya bersih, mudah dibaca, dan standar pemula (*beginner-friendly*). *Good luck!*

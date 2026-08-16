# Panduan Deployment ke Biznet Shared Hosting

## 📋 Persiapan

### Prerequisites
- Akses FTP/SFTP ke Biznet
- File manager atau FTP client (FileZilla, WinSCP, dll)
- Folder `dist/` sudah dibuild (hasil `npm run build`)

---

## 🚀 Langkah-Langkah Deployment

### 1. Build Aplikasi untuk Production
```bash
npm run build
```
Hasil build akan tersimpan di folder `dist/`

### 2. Persiapkan File untuk Upload
Yang perlu di-upload ke hosting:
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].css
│   ├── index-[hash].js
│   └── [semua file lainnya]
└── [folder lain]

.htaccess (FILE INI PENTING!)
```

### 3. Upload ke Biznet via FTP

**Menggunakan FileZilla (Recommended):**

1. Buka FileZilla
2. Klik `File` → `Site Manager`
3. Isi data koneksi Biznet:
   - Host: `ftp.biznethosting.com` (atau sesuai dokumentasi Biznet Anda)
   - Username: `[username FTP Anda]`
   - Password: `[password FTP Anda]`
   - Port: `21`
4. Klik `Connect`
5. Navigasi ke folder `public_html/` atau folder domain Anda
6. Upload seluruh isi folder `dist/` ke sini
7. Upload file `.htaccess` ke root folder hosting

**Menggunakan File Manager Biznet (Jika tersedia):**

1. Login ke cPanel/Control Panel Biznet
2. Buka File Manager
3. Navigasi ke folder `public_html/`
4. Upload folder `dist/` dan file `.htaccess`

### 4. Verifikasi Struktur Folder di Hosting

Struktur akhir harus seperti ini:
```
public_html/
├── index.html (dari dist/)
├── assets/ (dari dist/)
├── .htaccess
└── [file lainnya dari dist/]
```

### 5. Test Website

Buka di browser:
```
https://yourdomain.com
https://yourdomain.com/?to=Raihan
```

Pastikan:
- ✅ Halaman loading dengan benar
- ✅ Semua gambar muncul
- ✅ URL parameter `?to=` bekerja
- ✅ Scroll parallax berjalan smooth

---

## 🔄 Update Website (Setelah Deploy)

### Jika ada perubahan code:

1. **Edit file di local machine**
2. **Build ulang:**
   ```bash
   npm run build
   ```
3. **Upload folder `dist/` baru via FTP**
   - Hapus folder `dist/` lama di hosting
   - Upload folder `dist/` baru
   - (File `.htaccess` tidak perlu di-upload lagi, kecuali diubah)

### Tips untuk update lebih cepat:
- Hanya upload file yang berubah di folder `assets/`
- File `index.html` selalu perlu di-update (karena berisi hash baru)

---

## 🛠️ Troubleshooting

### Masalah: Halaman blank / 404
**Solusi:**
- Pastikan file `.htaccess` sudah di-upload
- Cek bahwa mod_rewrite diaktifkan di server Biznet
- Hubungi support Biznet untuk enable mod_rewrite

### Masalah: Query parameter `?to=` tidak bekerja
**Solusi:**
- Pastikan `.htaccess` sudah di-upload
- Test dengan URL: `https://yourdomain.com/?to=test`

### Masalah: Gambar tidak muncul
**Solusi:**
- Pastikan folder `assets/` dan `images/` sudah terupload
- Cek console browser (F12) untuk error messages

### Masalah: CSS/JS tidak loaded
**Solusi:**
- Clear browser cache (Ctrl+Shift+Delete)
- Cek file size folder `assets/` di hosting
- Verifikasi struktur folder `dist/`

---

## 📊 Ukuran File

Ukuran yang di-upload ke hosting:
```
index.html: ~1 KB
assets/index-[hash].css: ~17 KB (gzipped: ~4 KB)
assets/index-[hash].js: ~275 KB (gzipped: ~89 KB)
images/: Bergantung jumlah & ukuran foto
Total: ~300-500 KB
```

---

## ⚙️ Konfigurasi Tambahan (Opsional)

### Custom Domain
Jika ingin menggunakan custom domain (bukan domain default Biznet):
1. Arahkan DNS domain Anda ke IP Biznet
2. Setup di cPanel Biznet
3. Dokumentasi: https://help.biznethosting.com/

### HTTPS/SSL
- Biznet biasanya menyediakan SSL gratis
- Setup di cPanel → SSL/TLS
- Pastikan website diakses via `https://`

---

## 📞 Support Biznet

Jika ada masalah teknis:
- Email: support@biznethosting.com
- Chat: https://www.biznethosting.com/contact/
- Dokumentasi: https://help.biznethosting.com/

---

## ✅ Checklist Sebelum Deploy

- [ ] `npm run build` berhasil tanpa error
- [ ] Folder `dist/` tidak kosong
- [ ] File `.htaccess` sudah dibuat
- [ ] Akses FTP ke Biznet sudah siap
- [ ] Test di local (`npm run dev`) berhasil
- [ ] Semua gambar sudah ada di `public/images/`
- [ ] URL parameter `?to=` tested

---

## 🎉 Selesai!

Website Anda sekarang live dan siap dibagikan ke tamu undangan!

Link untuk dibagikan:
```
https://yourdomain.com/?to=Nama+Tamu
```

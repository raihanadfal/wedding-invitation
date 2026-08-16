# 📘 Deployment ke Biznet via cPanel

Panduan lengkap deployment wedding invitation ke Biznet menggunakan cPanel.

---

## 🔑 Login ke cPanel

1. Buka browser: `https://cpanel.biznethosting.com`
2. Masukkan username & password cPanel Anda
3. Akan masuk ke dashboard cPanel

---

## 📤 Step 1: Upload Files via File Manager

### Navigasi ke Folder Public

1. Di cPanel, cari **File Manager**
2. Klik untuk buka
3. Pilih folder **public_html**
4. Sekarang Anda di folder yang bisa diakses dari website

### Upload Folder `dist/`

1. Klik tombol **Upload** di File Manager
2. Pilih folder `dist/` dari komputer Anda
3. Tunggu hingga selesai (tergantung ukuran file)

**Atau gunakan Drag & Drop:**
- Buka folder `dist/` di explorer komputer
- Drag semua file dari `dist/` ke File Manager cPanel
- Drop di folder `public_html/`

### Upload File `.htaccess`

1. Di File Manager cPanel, pastikan Anda di folder `public_html/`
2. Klik **Upload**
3. Pilih file `.htaccess` dari project
4. Upload

**Struktur akhir di cPanel harus seperti:**
```
public_html/
├── index.html
├── assets/
│   ├── index-[hash].css
│   ├── framer-motion-[hash].js
│   ├── index-[hash].js
│   └── [files lainnya]
└── .htaccess
```

---

## ✅ Step 2: Verify File Permissions

1. Di File Manager, klik kanan pada file `.htaccess`
2. Pilih **Change Permissions**
3. Set permission ke `644`
4. Klik **Change Permissions**

**Untuk folder `assets/`:**
1. Klik kanan pada folder `assets/`
2. Pilih **Change Permissions**
3. Set permission ke `755`
4. Klik **Change Permissions**

---

## 🌐 Step 3: Configure Domain (Jika perlu)

Jika ingin menggunakan custom domain:

1. Di cPanel, cari **Addon Domains** atau **Domains**
2. Tambahkan domain Anda
3. Pilih public_html sebagai folder root
4. Arahkan DNS domain ke IP Biznet
5. Tunggu 24 jam untuk propagasi

---

## 🔒 Step 4: Enable SSL/HTTPS (Recommended)

1. Di cPanel, cari **AutoSSL** atau **SSL/TLS**
2. Install SSL certificate (biasanya gratis dari Biznet)
3. Website Anda otomatis redirect ke HTTPS

---

## 🧪 Step 5: Test Website

1. Buka browser
2. Kunjungi: `https://yourdomain.com`
3. Atau gunakan domain default Biznet: `https://yourusername.biznethosting.com`

**Test URLs:**
```
https://yourdomain.com                    # Main page
https://yourdomain.com/?to=Raihan        # With guest name
https://yourdomain.com/?to=Devi+Resti    # Multi-word name
```

**Cek yang berfungsi:**
- [ ] Halaman loading
- [ ] Tidak ada error 404
- [ ] Semua gambar muncul
- [ ] CSS & styling benar
- [ ] Parallax scroll berjalan
- [ ] Query parameter `?to=` bekerja
- [ ] Countdown berfungsi

---

## 🔄 Update Website (Setelah Deploy)

Jika ada perubahan code:

### 1. Build di Local
```bash
npm run build
```

### 2. Upload File Baru

**Option A: Via File Manager (Recommended)**
1. Di cPanel File Manager, buka folder `public_html/`
2. Delete folder `assets/` lama
3. Delete file `index.html` lama
4. Upload folder `assets/` baru
5. Upload file `index.html` baru

**Option B: Via FTP**
1. Connect ke Biznet FTP via FileZilla
2. Replace folder `dist/` contents
3. Refresh website

### 3. Clear Cache
Di browser: `Ctrl+Shift+Delete` atau `Cmd+Shift+Delete` untuk clear cache.

---

## 📧 cPanel Features Berguna

### 1. Email Management
- Buat email professional: `info@yourdomain.com`
- Setup di cPanel → Email Accounts

### 2. Backup
- cPanel → Backups
- Download backup reguler

### 3. Error Logs
- cPanel → Error Log
- Gunakan untuk debugging jika ada error

### 4. Database Management
- Jika perlu database: cPanel → MySQL Databases
- (Tidak perlu untuk SPA ini, tapi tersedia)

---

## 🆘 Troubleshooting di cPanel

### Problem: Halaman Blank / 404

**Solusi:**
1. Cek file `.htaccess` sudah di-upload
2. Di cPanel, buka File Manager
3. Buka folder `public_html/`
4. Verify `.htaccess` ada di sana
5. Cek permission (harus 644)

### Problem: Images tidak muncul

**Solusi:**
1. Check di cPanel File Manager
2. Buka folder `public_html/assets/`
3. Pastikan ada file images di dalamnya
4. Cek permission folder (harus 755)

### Problem: CSS/JS tidak loaded

**Solusi:**
1. Force refresh: `Ctrl+Shift+R`
2. Clear browser cache completely
3. Cek file size folder `assets/` > 0 bytes
4. Cek di cPanel Error Log untuk clues

### Problem: Query parameter `?to=` tidak bekerja

**Solusi:**
1. Verify `.htaccess` sudah uploaded
2. Check permission `.htaccess` = 644
3. Hubungi Biznet: minta enable `mod_rewrite`

---

## 📞 Hubungi Biznet Support (Jika Perlu)

- **Email:** support@biznethosting.com
- **Chat/Ticket:** https://www.biznethosting.com/contact/
- **Help:** https://help.biznethosting.com/

**Siapkan info ini saat kontak:**
- Username cPanel
- Domain yang digunakan
- Error message yang diterima

---

## ✅ Quick Checklist cPanel Deployment

- [ ] Login ke cPanel berhasil
- [ ] File Manager bisa diakses
- [ ] Folder `public_html/` terlihat
- [ ] Upload folder `dist/` selesai
- [ ] Upload file `.htaccess` selesai
- [ ] Permission file `.htaccess` = 644
- [ ] Permission folder `assets/` = 755
- [ ] SSL/HTTPS enabled
- [ ] Website accessible di browser
- [ ] Query parameter berfungsi
- [ ] All images loaded
- [ ] Parallax animations smooth
- [ ] Ready to share with guests! 🎉

---

## 🎯 Share Link dengan Tamu

Setelah semua siap, share link unik untuk setiap tamu:

```
https://yourdomain.com/?to=Nama+Tamu

Contoh:
https://yourdomain.com/?to=Raihan
https://yourdomain.com/?to=Devi+Resti
https://yourdomain.com/?to=Tamu+Spesial
```

---

**Status:** ✅ **SIAP DEPLOY VIA cPANEL!**

Semua tools tersedia di cPanel untuk upload dan manage website Anda dengan mudah. 🚀

# 🔧 Troubleshooting: Domain Tidak Bisa Diakses

**Domain:** `www.weddinginvitation.raihan-devi.com`  
**Issue:** Tidak bisa diakses  
**Date:** 2026-08-16

---

## 🔍 Diagnosis Checklist

Ikuti langkah-langkah di bawah untuk menemukan masalahnya:

### Step 1: Test Domain Variants

Coba akses beberapa URL ini:

```
1. http://weddinginvitation.raihan-devi.com
   (tanpa www)

2. http://www.weddinginvitation.raihan-devi.com
   (dengan www)

3. https://weddinginvitation.raihan-devi.com
   (dengan https, tanpa www)

4. https://www.weddinginvitation.raihan-devi.com
   (dengan https dan www)
```

**Catat mana yang bisa diakses, mana yang tidak.**

---

### Step 2: Check di cPanel - File Manager

**Login ke cPanel:**

```
https://cpanel.biznethosting.com
Username: [your username]
Password: [your password]
```

**Navigate ke File Manager:**

1. Klik File Manager
2. Pastikan Anda di folder `public_html`
3. Lihat struktur folder:

```
public_html/
├── index.html           ← HARUS ADA
├── assets/              ← HARUS ADA
│   ├── index-[hash].css
│   ├── index-[hash].js
│   ├── framer-motion-[hash].js
│   └── [files lainnya]
├── .htaccess            ← HARUS ADA
└── [folder/file lainnya]
```

**Verifikasi:**

- [ ] `index.html` ada
- [ ] Folder `assets/` ada dan tidak kosong
- [ ] File `.htaccess` ada

**Jika ada yang missing:**
→ **Re-upload file yang hilang**

---

### Step 3: Check File Permissions

Di cPanel File Manager:

**Check `.htaccess` permission:**

1. Klik kanan pada `.htaccess`
2. Select "Change Permissions"
3. Lihat angkanya → harus **644**
4. Jika tidak, ubah jadi **644**

**Check `assets/` permission:**

1. Klik kanan pada folder `assets/`
2. Select "Change Permissions"
3. Lihat angkanya → harus **755**
4. Jika tidak, ubah jadi **755**

**Check `index.html` permission:**

1. Klik kanan pada `index.html`
2. Select "Change Permissions"
3. Lihat angkanya → harus **644**

---

### Step 4: Check DNS Configuration

**Di cPanel, cek domain pointing:**

1. Login ke cPanel
2. Cari **Addon Domains** atau **Domains**
3. Cari domain `weddinginvitation.raihan-devi.com`
4. Verify:
   - Domain menunjuk ke folder `public_html`
   - Status: Active/Parked

**Jika domain belum setup:**
→ **Hubungi Biznet support untuk setup domain**

---

### Step 5: Check Browser Cache

Jika domain sebelumnya error, browser mungkin cache error page:

**Clear cache:**

```
Windows: Ctrl+Shift+Delete
Mac: Cmd+Shift+Delete
```

Atau gunakan **Incognito/Private window** untuk test

---

### Step 6: Test di Browser Console

Buka browser DevTools (F12):

1. Tab **Console** → lihat ada error?
2. Tab **Network** → lihat 404 files?
3. Tab **Application** → lihat cache?

**Common errors:**

- `404 Not Found` → file tidak ada di server
- `CORS error` → permission issue
- `net::ERR_NAME_NOT_RESOLVED` → DNS tidak resolve

---

## 🆘 Common Issues & Solutions

### Issue 1: "ERR_NAME_NOT_RESOLVED" atau "Domain Not Found"

**Penyebab:** DNS belum propagate atau domain belum setup

**Solusi:**

1. Tunggu 24 jam untuk DNS propagate
2. Hubungi Biznet: domain setup di cPanel
3. Verify domain pointing ke IP Biznet

---

### Issue 2: "404 Page Not Found"

**Penyebab:** File tidak ada atau `.htaccess` tidak bekerja

**Solusi:**

1. Check `index.html` ada di `public_html`
2. Check `.htaccess` file ada & permission 644
3. Contact Biznet: request enable `mod_rewrite`

---

### Issue 3: "Blank Page" atau Error 500

**Penyebab:** `.htaccess` syntax error atau file permissions

**Solusi:**

1. Check `.htaccess` permission = 644
2. Check `assets/` permission = 755
3. Clear browser cache (Ctrl+Shift+R)
4. Check cPanel Error Log

---

### Issue 4: "www" version tidak bekerja tapi non-www bekerja

**Penyebab:** Domain redirect tidak configured

**Solusi:**

1. Di cPanel, check domain redirect settings
2. Atau setup .htaccess redirect:

```
RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
RewriteRule ^(.*)$ http://%1$1 [R=301,L]
```

---

## 📱 Quick Diagnosis Flowchart

```
Domain tidak bisa diakses?
│
├─→ Coba non-www version (tanpa www)?
│   ├─→ BISA ✓ → setup domain redirect (lihat Issue 4)
│   └─→ TIDAK → lanjut ke step berikutnya
│
├─→ Cek cPanel File Manager
│   ├─→ index.html ADA? ✓
│   ├─→ assets/ ADA? ✓
│   ├─→ .htaccess ADA? ✓
│   └─→ Permissions correct? ✓
│       ├─→ YA ✓ → lanjut ke step berikutnya
│       └─→ TIDAK → ubah permissions
│
├─→ Cek domain di cPanel
│   ├─→ Domain setup? ✓
│   ├─→ Pointing ke public_html? ✓
│   └─→ Status Active? ✓
│       ├─→ YA ✓ → tunggu 24 jam / contact Biznet
│       └─→ TIDAK → setup domain
│
└─→ Hubungi Biznet Support
    - Domain: weddinginvitation.raihan-devi.com
    - Error message: [screenshot]
    - Steps already taken: [list]
```

---

## 📞 Hubungi Biznet Support

Jika masalah tidak teratasi, siapkan info ini:

```
Domain: www.weddinginvitation.raihan-devi.com
cPanel Username: [your username]
Error Message: [screenshot]
Steps Already Tried:
- [ ] Cleared browser cache
- [ ] Checked file permissions
- [ ] Verified files exist
- [ ] Waited 24 hours for DNS

Browser Used: [Chrome/Firefox/Safari]
Device: [Windows/Mac/Mobile]
```

**Contact:**

- Email: support@biznethosting.com
- Help: https://help.biznethosting.com/
- Chat: https://www.biznethosting.com/contact/

---

## ✅ Next Steps

1. **Ikuti checklist diagnosis di atas** (Step 1-6)
2. **Catat hasil setiap step**
3. **Jika masih tidak bisa:**
   - Screenshot error message
   - Contact Biznet dengan info lengkap

---

**Untuk update:** Jawab pertanyaan berikut:

1. Domain mana yang Anda test? (www atau non-www?)
2. Error message apa yang muncul?
3. Sudah check cPanel File Manager? File ada semua?
4. Permissions sudah benar? (644 untuk .htaccess, 755 untuk assets/)

Berdasarkan jawaban, saya bisa memberikan solusi lebih spesifik! 🔧

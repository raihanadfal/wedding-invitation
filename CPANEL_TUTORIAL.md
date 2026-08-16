# 📹 Video Tutorial Text - cPanel Upload Step by Step

## 🎬 Bagian 1: Persiapan (5 menit)

### Yang Anda Butuhkan:
1. Username & password cPanel Biznet
2. Folder `dist/` dari hasil `npm run build`
3. File `.htaccess`
4. Browser (Chrome, Firefox, Safari)

### Persiapan di Local Machine:
```bash
# Di folder project Anda
npm run build

# Tunggu hingga selesai
# Folder dist/ akan terbuat di: c:\Users\raiha\Downloads\wedding-invitation\dist\
```

---

## 🎬 Bagian 2: Login ke cPanel (2 menit)

### Step 1: Buka cPanel
```
URL: https://cpanel.biznethosting.com
```

### Step 2: Input Credentials
```
Username: [masukkan username cPanel Anda]
Password: [masukkan password cPanel Anda]
```

### Step 3: Klik Login
- Tunggu dashboard cPanel loading
- Anda akan melihat interface cPanel

---

## 🎬 Bagian 3: Akses File Manager (2 menit)

### Step 1: Cari File Manager
- Di cPanel dashboard, scroll down
- Cari icon "File Manager" atau text "File Manager"
- Klik untuk buka

### Step 2: Navigasi ke public_html
- File Manager akan terbuka
- Cari folder `public_html` di sidebar kiri
- Klik folder `public_html`
- Sekarang Anda di dalam folder public_html

### Struktur yang Anda lihat:
```
public_html/
├── index.php (bisa ada, biarkan)
├── .htaccess (belum ada, akan di-upload)
└── [folder/file lainnya dari hosting]
```

---

## 🎬 Bagian 4: Upload Folder `dist/` (5 menit)

### Option A: Upload via Browser (Recommended for first time)

**Step 1: Klik Upload**
- Di File Manager, klik tombol **Upload** di toolbar atas
- Atau drag-drop files langsung

**Step 2: Select folder `dist/`**
- Dialog file chooser akan terbuka
- Navigate ke: `C:\Users\raiha\Downloads\wedding-invitation\dist\`
- Select semua file di dalam folder `dist/`
  - `index.html`
  - Folder `assets/`
  - Semua file lainnya
- Klik Open/Select

**Step 3: Wait for Upload**
- Progress bar akan muncul
- Tunggu hingga 100% complete
- Biasanya 2-5 menit tergantung speed

**Step 4: Verify**
- Di File Manager, Anda akan lihat:
  ```
  public_html/
  ├── index.html (baru dari dist/)
  ├── assets/ (baru dari dist/)
  └── .htaccess (masih belum ada)
  ```

### Option B: Drag & Drop (Faster)

**Step 1: Buka dua window**
- Window 1: File Manager cPanel (public_html folder)
- Window 2: Explorer lokal (`dist/` folder)

**Step 2: Arrange windows**
- Posisikan side-by-side

**Step 3: Drag semua files**
- Dari explorer lokal ke File Manager
- Drop di folder `public_html`

**Step 4: Wait**
- Upload akan auto-start
- Tunggu sampai selesai

---

## 🎬 Bagian 5: Upload File `.htaccess` (3 menit)

### Step 1: Pastikan di public_html
- Di File Manager, pastikan Anda di folder `public_html` (bukan di dalam `assets/`)
- Path di atas harus: `public_html`

### Step 2: Klik Upload
- Klik tombol **Upload** di toolbar
- File chooser akan terbuka

### Step 3: Select `.htaccess`
- Navigate ke: `C:\Users\raiha\Downloads\wedding-invitation\.htaccess`
- Klik file `.htaccess`
- Klik Open

### Step 4: Wait & Verify
- File `.htaccess` akan upload
- Di File Manager sekarang Anda akan lihat:
  ```
  public_html/
  ├── index.html
  ├── assets/
  ├── .htaccess ← NEW!
  └── [folder/file lainnya]
  ```

**Note:** `.htaccess` adalah file hidden di beberapa OS. Jika tidak terlihat, itu normal.

---

## 🎬 Bagian 6: Set File Permissions (3 menit)

### Set `.htaccess` Permission ke 644

**Step 1: Klik kanan `.htaccess`**
- Di File Manager, klik kanan pada file `.htaccess`
- Menu context akan muncul

**Step 2: Select "Change Permissions"**
- Klik pilihan "Change Permissions" atau "Properties"
- Dialog permissions akan terbuka

**Step 3: Set ke 644**
- Owner Read: ✓
- Owner Write: ✓
- Owner Execute: ☐
- Group Read: ✓
- Group Write: ☐
- Group Execute: ☐
- Other Read: ✓
- Other Write: ☐
- Other Execute: ☐
- Atau langsung type: `644`

**Step 4: Apply**
- Klik "Change Permissions" button
- Permission updated

### Set `assets/` folder Permission ke 755

**Step 1: Klik kanan folder `assets/`**
- Di File Manager, klik kanan pada folder `assets/`

**Step 2: Select "Change Permissions"**
- Klik pilihan "Change Permissions"

**Step 3: Set ke 755**
- Owner: Read ✓, Write ✓, Execute ✓
- Group: Read ✓, Write ☐, Execute ✓
- Other: Read ✓, Write ☐, Execute ✓
- Atau langsung type: `755`

**Step 4: Apply**
- Klik "Change Permissions" button

---

## 🎬 Bagian 7: Test Website (5 menit)

### Step 1: Close File Manager
- Klik X untuk close File Manager
- Kembali ke cPanel dashboard

### Step 2: Get Your Domain Info
- Jika punya domain custom: `https://yourdomain.com`
- Atau gunakan default Biznet: `https://yourusername.biznethosting.com`

### Step 3: Open New Browser Tab
- Buka tab baru di browser
- Type URL website Anda

### Step 4: Test Main Page
```
https://yourdomain.com
```
- Tunggu loading
- Lihat apakah halaman muncul
- Scroll dan test parallax animation

### Step 5: Test dengan Guest Name
```
https://yourdomain.com/?to=Raihan
```
- Check apakah nama "Raihan" muncul di halaman
- Pastikan RSVP form terisi dengan nama

### Step 6: Comprehensive Check
- [ ] Halaman loading tanpa error
- [ ] Semua gambar visible
- [ ] Parallax scroll smooth
- [ ] Countdown timer running
- [ ] Query parameter bekerja
- [ ] RSVP form ada
- [ ] Text readable
- [ ] Buttons clickable

---

## 🎬 Bagian 8: Troubleshooting (If Issues)

### Jika Halaman Blank / 404

**Solusi 1: Refresh Cache**
```
Tekan: Ctrl+Shift+R (atau Cmd+Shift+R di Mac)
```

**Solusi 2: Check .htaccess**
- Kembali ke cPanel File Manager
- Verify `.htaccess` file ada di `public_html/`
- Check permission = 644

**Solusi 3: Check index.html**
- Verify `index.html` ada di `public_html/`
- Bukan di dalam folder `dist/`

### Jika Images Tidak Muncul

**Solusi:**
- Verify folder `assets/` ada di `public_html/`
- Check permission = 755
- Check file size > 0

### Jika Styling tidak Muncul

**Solusi:**
- Force refresh dengan cache clear: `Ctrl+Shift+R`
- Check browser console (F12) untuk errors
- Verify folder `assets/` permission = 755

---

## ✅ Final Checklist

- [ ] cPanel login berhasil
- [ ] File Manager diakses
- [ ] `dist/` folder di-upload
- [ ] `.htaccess` file di-upload
- [ ] `.htaccess` permission = 644
- [ ] `assets/` permission = 755
- [ ] Website accessible di browser
- [ ] No 404 errors
- [ ] Images loading
- [ ] Query parameter works
- [ ] Parallax animations running

---

## 📊 File Size Summary

Total yang di-upload:
```
index.html: 1 KB
assets/css: 18 KB
assets/js: 273 KB
Total: ~290 KB
```

Biasanya upload selesai dalam 2-5 menit tergantung kecepatan internet.

---

## 🎉 SELESAI!

Website Anda sekarang LIVE dan siap dibagikan ke tamu undangan!

### Share Link:
```
https://yourdomain.com/?to=Nama+Tamu

Untuk setiap tamu, sesuaikan nama:
- https://yourdomain.com/?to=Raihan
- https://yourdomain.com/?to=Devi+Resti
- https://yourdomain.com/?to=Tamu+Lainnya
```

---

**Estimated Total Time:** 30-40 menit pertama kali
**Update Time (setelah ini):** 5-10 menit per update

Good luck! 🚀

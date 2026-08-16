# 🎊 Deployment Guide - weddinginvitation.raihan-devi.com

**Domain:** `http://weddinginvitation.raihan-devi.com/`

---

## 🚀 Quick Deploy Steps

### Step 1: Build Aplikasi (2 menit)
```bash
npm run build
```

### Step 2: Upload via cPanel (15 menit)
1. Login: `https://cpanel.biznethosting.com`
2. File Manager → `public_html`
3. Upload folder `dist/`
4. Upload file `.htaccess`
5. Set permissions

### Step 3: Test (5 menit)
```
http://weddinginvitation.raihan-devi.com/
http://weddinginvitation.raihan-devi.com/?to=Raihan
http://weddinginvitation.raihan-devi.com/?to=Devi+Resti
```

---

## 📋 URL Examples untuk Tamu

Setiap tamu mendapat link unik dengan namanya:

```
http://weddinginvitation.raihan-devi.com/?to=Raihan
http://weddinginvitation.raihan-devi.com/?to=Devi+Resti
http://weddinginvitation.raihan-devi.com/?to=Orang+Tua+Raihan
http://weddinginvitation.raihan-devi.com/?to=Teman+Dekat
http://weddinginvitation.raihan-devi.com/?to=Sahabat+Kerja
```

---

## ✅ Testing Checklist

Setelah upload, test di browser:

### Main URL
```
http://weddinginvitation.raihan-devi.com/
```
- [ ] Halaman loading
- [ ] Tidak ada error
- [ ] Semua gambar muncul
- [ ] Parallax scroll berfungsi

### With Guest Name
```
http://weddinginvitation.raihan-devi.com/?to=TestName
```
- [ ] Nama "TestName" muncul di invitation text
- [ ] RSVP form terisi dengan nama
- [ ] Form bisa disubmit

### Features Check
- [ ] Countdown timer berjalan
- [ ] Love story scroll smooth
- [ ] Venue parallax berfungsi
- [ ] Maps button clickable
- [ ] All animations smooth (60fps)

---

## 📧 Share Template untuk Tamu

Gunakan template ini saat mengirim undangan:

### Template 1: Casual
```
Halo Raihan!

Dengan penuh kegembiraan, kami mengundang Anda ke pernikahan kami.

Klik link di bawah untuk melihat undangan lengkap dan confirm kehadiran:

🔗 http://weddinginvitation.raihan-devi.com/?to=Raihan

Terima kasih atas kehadiran Anda!

Raihan & Devi
```

### Template 2: Formal
```
Assalamu'alaikum Wr. Wb.,

Dengan hormat dan penuh bahagia kami mengundang:

Raihan

Untuk menghadiri upacara pernikahan kami yang akan dilaksanakan pada:
23 Agustus 2026

Silakan klik link berikut untuk melihat detail acara dan mengisi RSVP:
🔗 http://weddinginvitation.raihan-devi.com/?to=Raihan

Wassalamu'alaikum Wr. Wb.

Raihan & Devi
```

---

## 🔄 Update Process

Jika ada perubahan:

```bash
# 1. Edit code
# 2. Build
npm run build

# 3. Upload folder dist/ baru via cPanel File Manager
# 4. Replace yang lama

# 5. Test
# Buka: http://weddinginvitation.raihan-devi.com/
# Refresh: Ctrl+Shift+R (clear cache)
```

---

## 🎯 Share Tracking

Untuk track siapa saja yang sudah buka undangan:

**Opsi 1: Manual Tracking**
- Biasanya orang akan submit RSVP
- Lihat responses di form

**Opsi 2: Analytics (Optional)**
- Gunakan Google Analytics (jika ingin)
- Setup di Biznet cPanel

**Format Link dengan Identifier (Advanced):**
```
http://weddinginvitation.raihan-devi.com/?to=Raihan&id=001
http://weddinginvitation.raihan-devi.com/?to=Devi&id=002
```

---

## 📱 Mobile Preview

Domain Anda akan terlihat bagus di:
- ✅ Desktop (Chrome, Firefox, Safari)
- ✅ Tablet (iPad, Android tablets)
- ✅ Mobile (iPhone, Android phones)

**Test di mobile:**
- Parallax smooth
- Touch gestures work
- Forms accessible
- Text readable

---

## 💾 Backup & Restore

### Backup sebelum update:
1. Di cPanel, buka Backups
2. Download backup berkala
3. Simpan file `.tar.gz` di tempat aman

### Jika ada masalah:
1. Contact Biznet support
2. Mereka bisa restore dari backup

---

## 🆘 Troubleshooting

### Domain tidak bisa diakses
**Solusi:**
- Cek DNS pointing ke IP Biznet
- Tunggu 24 jam untuk propagasi
- Contact Biznet support

### Halaman blank / 404
**Solusi:**
- Verify `.htaccess` di-upload
- Check file `index.html` ada
- Force refresh: `Ctrl+Shift+R`

### Query parameter tidak bekerja
**Solusi:**
- Verify `.htaccess` permission = 644
- Contact Biznet: minta enable `mod_rewrite`

### Images tidak muncul
**Solusi:**
- Check folder `assets/` ada
- Verify permission = 755
- Check file size > 0 bytes

---

## 📞 Support

### Biznet cPanel Support
- Email: support@biznethosting.com
- Help: https://help.biznethosting.com/
- Hubungi dengan:
  - Domain: `weddinginvitation.raihan-devi.com`
  - Username: [your cpanel username]
  - Issue description

---

## ✨ Ready to Deploy!

**Domain:** `http://weddinginvitation.raihan-devi.com/`
**Status:** ✅ Ready
**Estimated Time:** 30-40 menit (first time)

Next steps:
1. Run `npm run build`
2. Upload via cPanel File Manager
3. Test at `http://weddinginvitation.raihan-devi.com/`
4. Share link dengan tamu!

🎉 **Selamat mengundang tamu-tamu Anda!**

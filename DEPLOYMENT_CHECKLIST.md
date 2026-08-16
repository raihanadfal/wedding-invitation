# ✅ Deployment Checklist

## Sebelum Deploy ke Biznet

### Code & Build
- [ ] Semua perubahan sudah selesai di local
- [ ] `npm run dev` berjalan tanpa error
- [ ] Tested di mobile & desktop
- [ ] `npm run build` berhasil (0 errors)
- [ ] Folder `dist/` ada dan tidak kosong
- [ ] File `.htaccess` sudah ada

### Files Ready to Upload
- [ ] `dist/` folder (semua isinya)
- [ ] `.htaccess` file
- [ ] Images di `public/images/` (jika belum di-dist)

### Biznet Account
- [ ] Akses FTP/SFTP siap
- [ ] File Manager atau FTP client installed
- [ ] Domain sudah setup (atau pakai domain default)
- [ ] SSL/HTTPS tersedia

### Testing URLs
- [ ] `https://yourdomain.com` - halaman loading
- [ ] `https://yourdomain.com/?to=TestName` - nama muncul
- [ ] Scroll parallax berjalan smooth
- [ ] Countdown timer berfungsi
- [ ] Semua gambar muncul
- [ ] RSVP form bisa diakses

## Deployment Steps

### 1. Preparation
```bash
# Local machine
npm run build
# atau gunakan script
deploy.bat (Windows)
bash deploy.sh (Mac/Linux)
```

### 2. Upload via FTP
- Buka FileZilla / WinSCP
- Connect ke Biznet FTP
- Navigate ke `public_html/`
- Upload `dist/` folder
- Upload `.htaccess`

### 3. Verification
- [ ] Website loading
- [ ] No 404 errors
- [ ] Query parameters working
- [ ] CSS & JS loaded
- [ ] Images displayed

## After Deployment

### Share with Guests
```
Individual link untuk setiap tamu:
https://yourdomain.com/?to=Nama+Tamu

Contoh:
https://yourdomain.com/?to=Raihan
https://yourdomain.com/?to=Devi+Resti
https://yourdomain.com/?to=Pak+Budi
```

### Future Updates
Setiap kali ada perubahan:
1. Edit code di local
2. `npm run build`
3. Upload folder `dist/` ke hosting (replace yang lama)
4. Test: refresh browser (Ctrl+Shift+R)

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Blank page / 404 | Check `.htaccess` uploaded, enable mod_rewrite |
| Query param not working | Verify `.htaccess` in root folder |
| Images missing | Check `dist/` folder structure uploaded |
| Slow loading | Clear browser cache, check Biznet server |
| Style not loading | Force refresh (Ctrl+Shift+R) |

## Important Notes

⚠️ **Do NOT upload:**
- `node_modules/` folder
- `.git/` folder
- `src/` folder
- `.env` files

✅ **Only upload:**
- `dist/` folder contents
- `.htaccess` file

## Support Contacts

- **Biznet Support:** support@biznethosting.com
- **Biznet Help:** https://help.biznethosting.com/
- **FTP Issues:** Check FTP credentials in cPanel

## Quick Reference

```bash
# Development
npm run dev          # Start dev server
npm run build       # Build for production
npm run preview     # Preview build locally

# Windows Deployment
deploy.bat          # Run deployment script

# Upload
Use FileZilla or WinSCP to upload dist/ folder
```

---

**Status:** ✅ Ready for Deployment to Biznet
**Last Updated:** 2026-08-16
**Version:** 1.0.0

# 🎉 Wedding Invitation - Setup & Deployment

Aplikasi undangan pernikahan modern dengan React + Vite untuk Raihan & Devi.

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```
Buka `http://localhost:5173`

### Production Build
```bash
npm run build
```
Atau gunakan script automation:
```bash
# Windows
deploy.bat

# Mac/Linux
bash deploy.sh
```

## 📦 Build Output

```
dist/
├── index.html (0.88 KB)
├── assets/
│   ├── index-[hash].css (17.80 KB, gzipped: 4.13 KB)
│   ├── framer-motion-[hash].js (126.31 KB, gzipped: 40.71 KB)
│   └── index-[hash].js (146.48 KB, gzipped: 47.18 KB)
└── Total: ~290 KB (gzipped: ~92 KB)
```

## 🌐 Deployment ke Biznet

1. **Build aplikasi:**
   ```bash
   npm run build
   ```

2. **Upload ke hosting:**
   - Upload folder `dist/` ke `public_html/`
   - Upload file `.htaccess` ke root folder

3. **Test:**
   - `https://yourdomain.com`
   - `https://yourdomain.com/?to=NamaTamu`

📖 **Dokumentasi lengkap:** Lihat file `DEPLOYMENT_GUIDE.md`

## 🔗 URL Parameters

Tambahkan nama tamu di URL:
```
https://yourdomain.com/?to=Raihan
https://yourdomain.com/?to=Devi+Resti
```

Nama akan muncul di:
- Hero section invitation text
- RSVP form (auto-filled)

## 📁 Struktur Project

```
src/
├── components/
│   ├── HeroGrid.tsx (Parallax photo grid)
│   ├── LoveStorySticky.tsx (Stacking animation)
│   ├── Countdown.tsx (Countdown timer)
│   ├── Reveal.tsx (Scroll reveal)
│   └── VenueHero.tsx (Venue parallax hero)
├── App.tsx (Main component)
├── index.css (Tailwind + custom styles)
└── main.tsx (Entry point)

public/
└── images/
    ├── image-1.webp to image-5.webp (Hero grid photos)
    ├── venue.webp (Venue hero image)
    ├── brides/ (Pengantin photos)
    └── stages/ (Love story images)

dist/ (Build output - jangan di-commit)
.htaccess (SPA routing configuration)
```

## ✨ Fitur

- ✅ Responsive design (mobile-first)
- ✅ Smooth scroll parallax animations
- ✅ Stacking love story section
- ✅ Countdown timer
- ✅ Query parameter untuk nama tamu
- ✅ Optimized build size (~92KB gzipped)
- ✅ GPU-accelerated animations
- ✅ Image lazy-loading

## 🛠️ Development

### Available Scripts

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview build locally
npm run preview

# Type check
npm run lint
```

### Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Language:** TypeScript

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 🎨 Design System

### Colors
- Primary: `#1a1a1a` (ink)
- Accent: `#6b5b4a` (moss)
- Secondary: `#b87a5a` (clay)
- Background: `#f5f1e8` (cream)

### Typography
- Display: Playfair Display (serif)
- Body: Lora (serif)

## 📊 Performance

- Lighthouse Score: 90+
- First Contentful Paint: <1s
- Lighthouse LCP: <1.5s
- Animation FPS: 60fps

## 🔄 Update Process

Setiap kali ada perubahan:

1. Edit code di local
2. Test dengan `npm run dev`
3. Build: `npm run build`
4. Upload folder `dist/` ke hosting

**Hanya file dalam `dist/` yang perlu di-upload ke hosting.**

## 📞 Support

Pertanyaan tentang deployment ke Biznet:
- Biznet Help: https://help.biznethosting.com/
- Contact: support@biznethosting.com

## 📜 License

Private - Untuk Raihan & Devi's Wedding

---

**Made with ❤️ using React + Vite**

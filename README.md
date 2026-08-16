# Undangan Tessa & Kevin

## Jalankan
```bash
npm install
npm run dev
```
Buka http://localhost:3000

## Nama tamu dinamis
Tambahkan parameter `?to=` di URL, contoh:
```
http://localhost:3000/?to=Budi%20%26%20Keluarga
```
Nama otomatis muncul di bagian "Kepada Yth." dan terisi di form RSVP.
Logic ada di `app/page.tsx` (`searchParams.to`).

## Yang perlu diganti
- Nama pasangan & tanggal di `app/page.tsx` (COUPLE, WEDDING_DATE)
- Kotak gradient di `HeroGrid.tsx` & `LoveStorySticky.tsx` → ganti jadi `<img>` foto asli
- Isi cerita di STORY_STAGES, jadwal acara, lokasi

## Animasi scroll (seperti referensi)
- `HeroGrid.tsx`: foto pertama full-screen → mengecil & bergabung jadi grid 5 foto saat discroll → grid memudar → muncul teks "anda diundang ke pernikahan ...". Semua digerakkan oleh scroll (pakai `framer-motion` `useScroll`/`useTransform`), section ini punya tinggi scroll 350vh dengan viewport yang di-`sticky`.
- `LoveStorySticky.tsx`: tiap stage cerita muncul membesar di tengah, lalu saat discroll mengecil & bergeser ke belakang (opacity & scale turun) sementara stage berikutnya membesar di depan — efek tumpuk seperti di video.
- Jalankan `npm install` dulu supaya `framer-motion` terpasang.

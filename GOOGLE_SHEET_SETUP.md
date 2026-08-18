# Setup Google Sheet RSVP Integration

## Step 1: Buat Google Sheet Baru

1. Buka [Google Sheets](https://sheets.google.com)
2. Buat spreadsheet baru dengan nama "Wedding RSVP"
3. Buat header di row 1:
   - A1: Nama
   - B1: Kehadiran
   - C1: Jumlah Tamu
   - D1: Tanggal
   - E1: Jam

## Step 2: Buat Google Apps Script

1. Di Google Sheet, klik menu **Extensions** > **Apps Script**
2. Ganti kode di editor dengan:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    if (data.action === "addRSVP") {
      const rsvpData = data.data;
      sheet.appendRow([
        rsvpData.nama,
        rsvpData.kehadiran,
        rsvpData.jumlahTamu,
        rsvpData.tanggal,
        rsvpData.jam
      ]);
      return ContentService.createTextOutput("SUCCESS");
    }
  } catch (error) {
    console.error("Error:", error);
    return ContentService.createTextOutput("ERROR");
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Wedding RSVP Service");
}
```

3. Klik **Save** (ikon disk)
4. Klik **Deploy** > **New deployment**
5. Pilih type **Web app**
6. Isi:
   - Execute as: Your email
   - Who has access: Anyone
7. Klik **Deploy**
8. Copy URL yang muncul (format: `https://script.google.com/macros/d/SCRIPT_ID/usercontent`)

## Step 3: Konfigurasi Environment Variables

### Development (.env.local)
```
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercontent
```

### Production (.env.production)
```
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercontent
```

Ganti `YOUR_SCRIPT_ID` dengan Script ID dari Google Apps Script deployment Anda.

## Step 4: Test Locally

1. Update `.env.local` dengan Google Script URL
2. Run development server:
```bash
npm run dev
```
3. Scroll ke section "Konfirmasi Kehadiran"
4. Isi form dan submit
5. Cek Google Sheet - data harus masuk

## Step 5: Deploy ke Production

1. Update `.env.production` dengan Google Script URL yang sama
2. Build production:
```bash
npm run build
```
3. Deploy ke hosting (Vercel, Netlify, etc)
4. Setup environment variable di platform hosting:
   - Key: `VITE_GOOGLE_SCRIPT_URL`
   - Value: Paste Google Script URL

## Troubleshooting

### RSVP tidak tersubmit
- Pastikan Google Script URL sudah di-copy dengan benar
- Cek browser console (F12) untuk error messages
- Pastikan `.env` file sudah di-restart dev server

### Data tidak masuk ke Google Sheet
- Cek Google Apps Script deployment masih aktif
- Pastikan sheet name sama di Apps Script
- Cek permissions Google Sheet (harus public atau accessible)

### CORS Error
- Google Apps Script dengan `mode: "no-cors"` tidak perlu CORS
- Error mungkin dari hal lain, cek console log

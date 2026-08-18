# Debugging Google Sheet RSVP Integration

## Checklist Debugging

### 1. Verifikasi Google Apps Script URL
- [ ] URL sudah di-copy dengan benar
- [ ] URL format: `https://script.google.com/macros/s/SCRIPT_ID/exec`
- [ ] Update `.env.production` dengan URL yang benar

### 2. Verifikasi Google Apps Script Code
Di Google Apps Script Editor:
- [ ] Klik menu **View** > **Logs** 
- [ ] Submit form dan lihat apakah ada log masuk
- [ ] Jika ada error, log akan show di sini

**Script yang benar:**
```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    if (data.action === "addRSVP") {
      const sheet = SpreadsheetApp.getActiveSheet();
      const rsvpData = data.data;
      
      sheet.appendRow([
        rsvpData.nama || "",
        rsvpData.kehadiran || "",
        rsvpData.jumlahTamu || 0,
        rsvpData.tanggal || "",
        rsvpData.jam || ""
      ]);
      
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Data saved"
      })).setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Wedding RSVP Service - Ready");
}
```

### 3. Verifikasi Google Sheet
- [ ] Sheet name harus "Sheet1" atau sesuai di code
- [ ] Header sudah ada di row 1: Nama, Kehadiran, Jumlah Tamu, Tanggal, Jam
- [ ] Sheet permission: Public atau Anyone dengan Edit access

### 4. Verifikasi Deployment
- [ ] Di Google Apps Script, klik **Deploy** (icon ikon)
- [ ] Pilih **Manage deployments**
- [ ] Cek apakah ada deployment aktif
- [ ] Jika tidak ada, buat baru:
  - Type: **Web app**
  - Execute as: Your email
  - Who has access: **Anyone**

### 5. Test Browser Console
1. Buka halaman undangan
2. Klik F12 (Developer Tools)
3. Tab **Console**
4. Submit form
5. Lihat error atau response:
   - Jika ada error, screenshot dan debug
   - Jika no error tapi no data, cek Google Sheet

### 6. Test di Production
Setelah fix:
1. Build: `npm run build`
2. Deploy ke hosting
3. Test form submit
4. Cek Google Sheet real-time

## Common Issues & Solutions

### Issue: "Gagal mengirim konfirmasi"
**Kemungkinan penyebab:**
- Google Script URL salah/belum update di `.env.production`
- Google Apps Script belum di-deploy sebagai Web App
- Google Sheet tidak punya header yang sesuai

**Solusi:**
1. Verifikasi URL di `.env.production`
2. Re-deploy Google Apps Script sebagai Web App
3. Pastikan header ada: Nama, Kehadiran, Jumlah Tamu, Tanggal, Jam

### Issue: Form show success tapi data tidak masuk
**Kemungkinan penyebab:**
- Google Apps Script code error (check Logs)
- Sheet name berbeda
- Column order tidak sesuai

**Solusi:**
1. Cek Google Apps Script Logs (View > Logs)
2. Pastikan appendRow order sesuai dengan data
3. Pastikan sheet name "Sheet1"

### Issue: CORS Error
Tidak akan terjadi karena menggunakan `mode: "no-cors"`

## Manual Test

Untuk test tanpa form, buka browser console dan jalankan:

```javascript
fetch("YOUR_GOOGLE_SCRIPT_URL", {
  method: "POST",
  mode: "no-cors",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    action: "addRSVP",
    data: {
      nama: "Test Manual",
      kehadiran: "Hadir",
      jumlahTamu: 1,
      tanggal: new Date().toLocaleDateString("id-ID"),
      jam: new Date().toLocaleTimeString("id-ID")
    }
  })
}).then(() => console.log("Request sent"))
  .catch(e => console.error("Error:", e));
```

Kemudian cek Google Sheet apakah data masuk.

## Next Steps

1. Update Google Apps Script dengan code di atas
2. Re-deploy sebagai Web App
3. Verifikasi URL di `.env.production`
4. Test form submit
5. Cek Google Sheet
6. Report hasil di console log

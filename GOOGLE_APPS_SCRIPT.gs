// Google Apps Script untuk Wedding RSVP
// Deploy sebagai Web App dengan akses "Anyone"

function doPost(e) {
  try {
    Logger.log("Request received: " + e.postData.contents);
    
    const data = JSON.parse(e.postData.contents);
    
    if (data.action === "addRSVP") {
      const sheet = SpreadsheetApp.getActiveSheet();
      const rsvpData = data.data;
      
      // Append row ke sheet
      sheet.appendRow([
        rsvpData.nama || "",
        rsvpData.kehadiran || "",
        rsvpData.jumlahTamu || 0,
        rsvpData.tanggal || new Date().toLocaleDateString("id-ID"),
        rsvpData.jam || new Date().toLocaleTimeString("id-ID")
      ]);
      
      Logger.log("Data added successfully: " + rsvpData.nama);
      
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Data saved"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Invalid action"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log("Error: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    const action = e.parameter.action;
    
    if (action === "getRSVP") {
      const sheet = SpreadsheetApp.getActiveSheet();
      const data = sheet.getDataRange().getValues();
      
      // Skip header row
      const rsvpList = [];
      for (let i = 1; i < data.length; i++) {
        if (data[i][0]) { // Jika ada nama
          rsvpList.push({
            nama: data[i][0],
            kehadiran: data[i][1],
            jumlahTamu: parseInt(data[i][2]) || 0,
            tanggal: data[i][3],
            jam: data[i][4]
          });
        }
      }
      
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        data: rsvpList,
        count: rsvpList.length
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput("Wedding RSVP Service - Ready");
  } catch (error) {
    Logger.log("Error in doGet: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

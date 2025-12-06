// 📄 COPY THIS CODE INTO YOUR GOOGLE APPS SCRIPT
// Extensions > Apps Script

const SHEET_NAME = "Sheet1"; // Ensure your tab is named exactly this

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({ 
        result: "error", 
        message: "Tab 'Sheet1' not found" 
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const rawData = e.postData.contents;
    const data = JSON.parse(rawData);

    const newRow = [
      new Date(),       // Date
      data.jobTitle,    // Title
      data.company,     // Company
      data.location,    // Location
      data.source,      // Source
      data.url          // URL
    ];

    sheet.appendRow(newRow);

    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (e) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", message: e.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

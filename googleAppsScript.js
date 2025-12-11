/**
 * Google Apps Script for Google Sheets Integration
 *
 * Instructions:
 * 1. Open your Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Delete the default code and paste this entire file
 * 4. Save the project (give it a name like "Form Submission Handler")
 * 5. Click "Deploy" > "New deployment"
 * 6. Click the gear icon next to "Select type" and choose "Web app"
 * 7. Set:
 *    - Description: "Form Submission Handler"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 8. Click "Deploy"
 * 9. Copy the Web App URL
 * 10. Add it to your .env file as: REACT_APP_GOOGLE_SHEETS_URL=your_url_here
 *
 * Sheet Setup:
 * - Sheet1: Headers in row 1: Name, Email, Phone, Message, Timestamp
 * - Sheet2: Headers in row 1: Full Name, Email, Phone, Model, Price, Timestamp
 */

function doPost(e) {
  try {
    // Parse the incoming data
    const requestData = JSON.parse(e.postData.contents);
    const { type, data } = requestData;

    // Get the active spreadsheet
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

    let sheet;
    let rowData;

    if (type === "contact") {
      // Use Sheet1 for contact form
      sheet = spreadsheet.getSheetByName("Sheet1");
      if (!sheet) {
        sheet = spreadsheet.insertSheet("Sheet1");
        // Add headers
        sheet
          .getRange(1, 1, 1, 5)
          .setValues([["Name", "Email", "Phone", "Message", "Timestamp"]]);
      }

      // Prepare row data
      rowData = [
        data.name || "",
        data.email || "",
        data.phone || "",
        data.message || "",
        data.timestamp || new Date().toISOString(),
      ];
    } else if (type === "preorder") {
      // Use Sheet2 for pre-order form
      sheet = spreadsheet.getSheetByName("Sheet2");
      if (!sheet) {
        sheet = spreadsheet.insertSheet("Sheet2");
        // Add headers
        sheet
          .getRange(1, 1, 1, 6)
          .setValues([
            ["Full Name", "Email", "Phone", "Model", "Price", "Timestamp"],
          ]);
      }

      // Prepare row data
      rowData = [
        data.fullName || "",
        data.email || "",
        data.phone || "",
        data.model || "",
        data.price || "",
        data.timestamp || new Date().toISOString(),
      ];
    } else {
      return ContentService.createTextOutput(
        JSON.stringify({
          success: false,
          error: "Invalid form type",
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // Append the data to the sheet
    sheet.appendRow(rowData);

    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Data submitted successfully",
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error.toString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function (optional - for testing in Apps Script editor)
function testContactForm() {
  const testData = {
    type: "contact",
    data: {
      name: "Test User",
      email: "test@example.com",
      phone: "1234567890",
      message: "This is a test message",
      timestamp: new Date().toISOString(),
    },
  };

  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData),
    },
  };

  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}

function testPreOrderForm() {
  const testData = {
    type: "preorder",
    data: {
      fullName: "Test User",
      email: "test@example.com",
      phone: "1234567890",
      model: "premium",
      price: "₹1800",
      timestamp: new Date().toISOString(),
    },
  };

  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData),
    },
  };

  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}

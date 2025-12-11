/**
 * Google Sheets Integration Service
 *
 * This service sends form data to Google Sheets using Google Apps Script Web App.
 *
 * Setup Instructions:
 * 1. Create a new Google Sheet
 * 2. Create two sheets: "Sheet1" (for contact form) and "Sheet2" (for pre-order form)
 * 3. Add headers in row 1:
 *    - Sheet1: Name, Email, Phone, Message, Timestamp
 *    - Sheet2: Full Name, Email, Phone, Model, Price, Timestamp
 * 4. Go to Extensions > Apps Script
 * 5. Paste the Google Apps Script code (see googleAppsScript.js file)
 * 6. Deploy as web app and copy the URL
 * 7. Replace the URL below with your Google Apps Script Web App URL
 */

// Replace this URL with your Google Apps Script Web App URL
const GOOGLE_SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbxangDGGhDxJ_j_WcmbGf70prGrRdimxXA0PWyYcxjRMHh_afKfYLnSKUw4b155tIEyjw/exec";

/**
 * Submit contact form data to Google Sheets (Sheet1)
 * @param {Object} data - Contact form data
 * @returns {Promise} - Response from Google Sheets
 */
export const submitContactForm = async (data) => {
  if (!GOOGLE_SHEETS_URL) {
    console.warn("Google Sheets URL not configured");
    return { success: false, error: "Google Sheets URL not configured" };
  }

  try {
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: "POST",
      mode: "no-cors", // Google Apps Script doesn't support CORS, so we use no-cors
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "contact",
        data: {
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          message: data.message || "",
          timestamp: new Date().toISOString(),
        },
      }),
    });

    // With no-cors mode, we can't read the response, but we assume it's successful
    return { success: true };
  } catch (error) {
    console.error("Error submitting contact form to Google Sheets:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Submit pre-order form data to Google Sheets (Sheet2)
 * @param {Object} data - Pre-order form data
 * @returns {Promise} - Response from Google Sheets
 */
export const submitPreOrderForm = async (data) => {
  if (!GOOGLE_SHEETS_URL) {
    console.warn("Google Sheets URL not configured");
    return { success: false, error: "Google Sheets URL not configured" };
  }

  try {
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: "POST",
      mode: "no-cors", // Google Apps Script doesn't support CORS, so we use no-cors
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "preorder",
        data: {
          fullName: data.fullName || "",
          email: data.email || "",
          phone: data.phone || "",
          model: data.model || "",
          price: data.price || "",
          timestamp: new Date().toISOString(),
        },
      }),
    });

    // With no-cors mode, we can't read the response, but we assume it's successful
    return { success: true };
  } catch (error) {
    console.error("Error submitting pre-order form to Google Sheets:", error);
    return { success: false, error: error.message };
  }
};

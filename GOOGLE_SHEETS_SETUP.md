# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets integration for the Contact and Pre-Order forms.

## Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Rename it to something like "Hotmate Form Submissions"

## Step 2: Set Up Sheets

### Sheet1 (Contact Form)

1. Click on "Sheet1" (or create it if it doesn't exist)
2. In row 1, add these headers:
   - Column A: `Name`
   - Column B: `Email`
   - Column C: `Phone`
   - Column D: `Message`
   - Column E: `Timestamp`

### Sheet2 (Pre-Order Form)

1. Create a new sheet named "Sheet2" (or rename an existing one)
2. In row 1, add these headers:
   - Column A: `Full Name`
   - Column B: `Email`
   - Column C: `Phone`
   - Column D: `Model`
   - Column E: `Price`
   - Column F: `Timestamp`

## Step 3: Set Up Google Apps Script

1. In your Google Sheet, go to **Extensions** > **Apps Script**
2. Delete any default code
3. Copy the entire contents of `googleAppsScript.js` file
4. Paste it into the Apps Script editor
5. Click **Save** (Ctrl+S or Cmd+S)
6. Give your project a name (e.g., "Form Submission Handler")

## Step 4: Deploy as Web App

1. Click **Deploy** > **New deployment**
2. Click the gear icon (⚙️) next to "Select type"
3. Choose **Web app**
4. Configure the deployment:
   - **Description**: "Form Submission Handler" (or any name you prefer)
   - **Execute as**: "Me"
   - **Who has access**: "Anyone" (this allows your website to submit data)
5. Click **Deploy**
6. You may be asked to authorize the script:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** > **Go to [Project Name] (unsafe)**
   - Click **Allow**
7. Copy the **Web App URL** (it will look like: `https://script.google.com/macros/s/...`)

## Step 5: Configure Environment Variable

1. Create a `.env` file in the root of your project (if it doesn't exist)
2. Add the following line:
   ```
   REACT_APP_GOOGLE_SHEETS_URL=your_web_app_url_here
   ```
3. Replace `your_web_app_url_here` with the URL you copied in Step 4
4. Save the file

## Step 6: Restart Your Development Server

If your development server is running:

1. Stop it (Ctrl+C)
2. Start it again (`npm start` or `npm run dev`)

## Testing

1. Fill out the Contact form and submit it
2. Check Sheet1 in your Google Sheet - you should see the data
3. Fill out the Pre-Order form and submit it
4. Check Sheet2 in your Google Sheet - you should see the data

## Troubleshooting

### Data not appearing in sheets

- Make sure the sheet names are exactly "Sheet1" and "Sheet2" (case-sensitive)
- Check that headers are in row 1
- Verify the Web App URL is correct in your `.env` file
- Check the browser console for any errors

### CORS errors

- The script uses `no-cors` mode, so errors won't be visible in the console
- Check your Google Apps Script execution log: Apps Script > Executions

### Permission errors

- Make sure "Who has access" is set to "Anyone" in the deployment settings
- Re-deploy the web app if you changed permissions

## Security Note

The current setup allows anyone with the URL to submit data. For production:

- Consider adding authentication
- Use environment variables for sensitive data
- Regularly monitor your Google Sheet for spam submissions

/**
 * =========================================================================
 * ⚡ SHEETLY 1-CLICK WHATSAPP & PAYMENT RECOVERY AUTOMATION SCRIPT
 * Official Sheetly Bonus Asset #2 (Google Apps Script)
 * Compatible with: Google Sheets & Sheetly Business OS
 * =========================================================================
 * 
 * 📌 HOW TO INSTALL (Takes 60 seconds):
 * 1. Open your Sheetly Google Sheet.
 * 2. Click "Extensions" -> "Apps Script" in the top menu.
 * 3. Delete any default code in Code.gs.
 * 4. Paste this entire code into the editor.
 * 5. Click the "Save" (💾) icon and then reload your Google Sheet.
 * 6. You will see a new menu at the top: "⚡ Sheetly Automations"!
 * =========================================================================
 */

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('⚡ Sheetly Automations')
    .addItem('📱 Send Invoice via WhatsApp', 'sendInvoiceWhatsApp')
    .addItem('⏰ Send Payment Reminder (Overdue)', 'sendPaymentReminderWhatsApp')
    .addItem('✅ Send Payment Received Thank-You', 'sendPaymentThankYouWhatsApp')
    .addSeparator()
    .addItem('📄 1-Click Printable PDF Bill', 'exportActiveInvoicePDF')
    .addItem('⚙️ Configure Your Business & UPI Details', 'configureBusinessSettings')
    .addToUi();
}

/**
 * Configure your default business details & UPI ID
 */
function configureBusinessSettings() {
  var ui = SpreadsheetApp.getUi();
  var props = PropertiesService.getUserProperties();
  
  var currentName = props.getProperty('BUSINESS_NAME') || 'My Agency / Company';
  var currentUpi = props.getProperty('UPI_ID') || 'yourname@okhdfcbank';
  
  var nameResponse = ui.prompt('⚙️ Step 1 of 2: Business Name', 'Enter your Company or Agency Name:\n(Current: ' + currentName + ')', ui.ButtonSet.OK_CANCEL);
  if (nameResponse.getSelectedButton() == ui.Button.OK && nameResponse.getResponseText().trim() !== '') {
    props.setProperty('BUSINESS_NAME', nameResponse.getResponseText().trim());
  }
  
  var upiResponse = ui.prompt('⚙️ Step 2 of 2: UPI / Payment Details', 'Enter your UPI ID or Payment Link for quick client settlements:\n(Current: ' + currentUpi + ')', ui.ButtonSet.OK_CANCEL);
  if (upiResponse.getSelectedButton() == ui.Button.OK && upiResponse.getResponseText().trim() !== '') {
    props.setProperty('UPI_ID', upiResponse.getResponseText().trim());
  }
  
  ui.alert('✅ Settings Saved Successfully!', 'Your invoices and reminders will now automatically include these details.', ui.ButtonSet.OK);
}

/**
 * Helper to get business settings
 */
function getBusinessProps() {
  var props = PropertiesService.getUserProperties();
  return {
    name: props.getProperty('BUSINESS_NAME') || 'Our Business',
    upi: props.getProperty('UPI_ID') || 'your-upi-id-here'
  };
}

/**
 * Helper to retrieve client details from the currently active row or sheet
 */
function getActiveInvoiceData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var sheetName = sheet.getName();
  
  var invoiceNo = '';
  var clientName = '';
  var amount = '';
  var date = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd-MMM-yyyy");
  
  // If user is on the Print Invoice tab
  if (sheetName.indexOf('Print') !== -1 || sheetName.indexOf('Invoice') !== -1) {
    var range = sheet.getDataRange().getValues();
    // Look for client name in printable sheet
    for (var r = 0; r < Math.min(range.length, 15); r++) {
      for (var c = 0; c < range[r].length; c++) {
        var val = String(range[r][c] || '');
        if (val.toLowerCase().indexOf('bill to') !== -1) {
          clientName = String(range[r][c+2] || range[r][c+1] || '').trim();
        }
        if (val.toLowerCase().indexOf('invoice no') !== -1) {
          invoiceNo = String(range[r][c+1] || range[r][c+2] || '').trim();
        }
      }
    }
  }
  
  // If active row has data
  var activeCell = sheet.getActiveCell();
  var row = activeCell.getRow();
  if (row > 1) {
    var rowData = sheet.getRange(row, 1, 1, 10).getValues()[0];
    if (rowData[1] && String(rowData[1]).match(/\d+/)) {
      invoiceNo = invoiceNo || String(rowData[1]);
    }
    if (rowData[3]) {
      clientName = clientName || String(rowData[3]);
    }
  }
  
  return {
    invoiceNo: invoiceNo || 'INV-2026',
    clientName: clientName || 'Client',
    amount: amount || 'Agreed Amount',
    date: date
  };
}

/**
 * 1. Send Fresh Invoice via WhatsApp
 */
function sendInvoiceWhatsApp() {
  var ui = SpreadsheetApp.getUi();
  var data = getActiveInvoiceData();
  var biz = getBusinessProps();
  
  var phoneResponse = ui.prompt('📱 Client WhatsApp Number', 'Enter Client\'s 10-digit WhatsApp number (with 91, e.g. 919876543210):\nClient: ' + data.clientName, ui.ButtonSet.OK_CANCEL);
  if (phoneResponse.getSelectedButton() !== ui.Button.OK) return;
  
  var phone = phoneResponse.getResponseText().replace(/[^0-9]/g, '');
  if (phone.length === 10) phone = '91' + phone;
  
  var amountResponse = ui.prompt('💰 Total Invoice Amount (₹)', 'Enter the bill amount for Invoice #' + data.invoiceNo + ':', ui.ButtonSet.OK_CANCEL);
  var totalAmount = amountResponse.getSelectedButton() === ui.Button.OK && amountResponse.getResponseText().trim() !== '' ? '₹' + amountResponse.getResponseText().trim() : 'as per attached bill';
  
  var message = 
    "Hello *" + data.clientName + "*,\n\n" +
    "Greetings from *" + biz.name + "*! 🧾\n\n" +
    "Your invoice has been generated:\n" +
    "📄 *Invoice No:* #" + data.invoiceNo + "\n" +
    "💰 *Amount Payable:* " + totalAmount + "\n" +
    "📅 *Date:* " + data.date + "\n\n" +
    "Please clear the payment via UPI:\n" +
    "⚡ *UPI ID:* `" + biz.upi + "`\n\n" +
    "Kindly share the transaction screenshot once completed for our accounts reconciliation.\n\n" +
    "Thank you for choosing to work with us! 🙏";
    
  openWhatsAppModal(phone, message, "Send Invoice via WhatsApp");
}

/**
 * 2. Send Overdue Payment Reminder via WhatsApp
 */
function sendPaymentReminderWhatsApp() {
  var ui = SpreadsheetApp.getUi();
  var data = getActiveInvoiceData();
  var biz = getBusinessProps();
  
  var phoneResponse = ui.prompt('⏰ Overdue Reminder', 'Enter Client\'s WhatsApp number:\nClient: ' + data.clientName, ui.ButtonSet.OK_CANCEL);
  if (phoneResponse.getSelectedButton() !== ui.Button.OK) return;
  
  var phone = phoneResponse.getResponseText().replace(/[^0-9]/g, '');
  if (phone.length === 10) phone = '91' + phone;
  
  var amountResponse = ui.prompt('💰 Pending Amount', 'Enter overdue amount for Invoice #' + data.invoiceNo + ':', ui.ButtonSet.OK_CANCEL);
  var totalAmount = amountResponse.getSelectedButton() === ui.Button.OK && amountResponse.getResponseText().trim() !== '' ? '₹' + amountResponse.getResponseText().trim() : 'the pending amount';
  
  var message = 
    "Hi *" + data.clientName + "*,\n\n" +
    "Hope you are having a productive week! 👋\n\n" +
    "This is a gentle courtesy reminder regarding *Invoice #" + data.invoiceNo + "* for *" + totalAmount + "* which is currently marked pending on our accounts portal.\n\n" +
    "Just wanted to check if there is any approval or banking issue from your end? If not, could you please authorize the transfer today?\n\n" +
    "⚡ *UPI ID:* `" + biz.upi + "`\n\n" +
    "If you have already processed this in the last 2 hours, please disregard this note and share the UTR reference number.\n\n" +
    "Best regards,\n*" + biz.name + "*";
    
  openWhatsAppModal(phone, message, "Send Payment Reminder");
}

/**
 * 3. Send Payment Received Receipt / Thank You
 */
function sendPaymentThankYouWhatsApp() {
  var ui = SpreadsheetApp.getUi();
  var data = getActiveInvoiceData();
  var biz = getBusinessProps();
  
  var phoneResponse = ui.prompt('✅ Payment Receipt', 'Enter Client\'s WhatsApp number:\nClient: ' + data.clientName, ui.ButtonSet.OK_CANCEL);
  if (phoneResponse.getSelectedButton() !== ui.Button.OK) return;
  
  var phone = phoneResponse.getResponseText().replace(/[^0-9]/g, '');
  if (phone.length === 10) phone = '91' + phone;
  
  var message = 
    "Dear *" + data.clientName + "*,\n\n" +
    "We have successfully received your payment for *Invoice #" + data.invoiceNo + "*! 🎉\n\n" +
    "Your account is fully cleared and reconciled in our system.\n\n" +
    "It is always an absolute pleasure collaborating with you. If you need any further assistance, feel free to reach out anytime!\n\n" +
    "Warm regards,\n*" + biz.name + "*";
    
  openWhatsAppModal(phone, message, "Send Payment Receipt");
}

/**
 * Helper to show modal dialog with direct WhatsApp click
 */
function openWhatsAppModal(phone, message, title) {
  var encoded = encodeURIComponent(message);
  var waUrl = "https://wa.me/" + phone + "?text=" + encoded;
  
  var html = 
    '<div style="font-family: Arial, sans-serif; padding: 15px; color: #1e293b;">' +
    '  <h3 style="color: #059669; margin-top: 0;">🚀 Ready to Dispatch!</h3>' +
    '  <p style="font-size: 13px; line-height: 1.5;">Click below to open WhatsApp Web or App with this pre-formatted message:</p>' +
    '  <div style="background: #f1f5f9; padding: 12px; border-radius: 8px; font-size: 12px; white-space: pre-wrap; max-height: 140px; overflow-y: auto; border: 1px solid #cbd5e1; margin-bottom: 15px;">' +
       message + 
    '  </div>' +
    '  <a href="' + waUrl + '" target="_blank" style="display: block; background: #25D366; color: white; text-align: center; padding: 12px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">' +
    '    💬 Open in WhatsApp Now' +
    '  </a>' +
    '</div>';
    
  var htmlOutput = HtmlService.createHtmlOutput(html)
    .setWidth(450)
    .setHeight(320);
    
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, title);
}

/**
 * 4. 1-Click Printable PDF Bill Export
 */
function exportActiveInvoicePDF() {
  var ui = SpreadsheetApp.getUi();
  ui.alert(
    "📄 Printable PDF Invoice",
    "To save your invoice as a branded PDF:\n\n" +
    "1. Go to the '🖨️ Print - Invoice' tab.\n" +
    "2. Press Ctrl + P (or Cmd + P on Mac).\n" +
    "3. Set paper size to 'A4' and Scale to 'Fit to page'.\n" +
    "4. Click 'Next' and choose 'Save as PDF'!\n\n" +
    "Sheetly has pre-configured print margins so your bill looks like a corporate MNC invoice.",
    ui.ButtonSet.OK
  );
}

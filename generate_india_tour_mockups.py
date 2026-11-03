import os
from playwright.sync_api import sync_playwright
from PIL import Image

OUTPUT_DIR = "/Users/krishkumar/Desktop/Sheetly/public/Images"

COMMON_HEAD = """
<meta charset="utf-8">
<meta name="viewport" content="width=1588, initial-scale=1">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
<script>
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      }
    }
  }
}
</script>
<style>
body {
  font-family: 'Plus Jakarta Sans', sans-serif;
  background-color: #070b14;
  margin: 0;
  padding: 0;
  width: 1588px;
  height: 1206px;
  overflow: hidden;
  color: #f1f5f9;
}
.glass-card {
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.sheet-row:nth-child(even) {
  background: rgba(255, 255, 255, 0.02);
}
</style>
"""

def render(name, body_html):
    full_html = f"<!DOCTYPE html><html><head>{COMMON_HEAD}</head><body class='p-8 flex flex-col justify-between'>{body_html}</body></html>"
    temp_png = f"/tmp/{name}.png"
    target_webp = os.path.join(OUTPUT_DIR, f"{name}.webp")
    
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1588, "height": 1206})
        page.set_content(full_html, wait_until="networkidle")
        page.screenshot(path=temp_png)
        browser.close()
        
    im = Image.open(temp_png)
    im.save(target_webp, "WEBP", quality=92, method=6)
    print(f"✅ Generated {name}.webp ({os.path.getsize(target_webp)} bytes)")

# 2. gst-print-invoice
html_2 = """
  <!-- Top Navigation Bar -->
  <div class="flex items-center justify-between pb-4 border-b border-slate-800">
    <div class="flex items-center gap-4">
      <div class="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black text-xl">
        🖨️
      </div>
      <div>
        <div class="flex items-center gap-3">
          <h1 class="text-xl font-black text-white tracking-tight">1-Page GST Tax Invoice & Dynamic UPI QR</h1>
          <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Auto-Generated</span>
          <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-slate-800 text-slate-300 border border-slate-700">Tab: 🖨️ Print - Invoice</span>
        </div>
        <p class="text-xs text-slate-400 mt-0.5">Print-ready GST Tax Invoice with GSTIN, HSN/SAC, CGST/SGST/IGST & Dynamic Scan-to-Pay UPI QR</p>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <div class="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
        Active Invoice: <span class="font-bold text-emerald-400">#INV-2026-042</span>
      </div>
      <div class="px-3.5 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md">
        <span>🖨️ Print / Save as PDF</span>
      </div>
    </div>
  </div>

  <!-- Main Invoice Document Frame -->
  <div class="my-4 flex-1 flex justify-center items-center min-h-0">
    <div class="w-[980px] bg-white text-slate-900 rounded-xl p-8 shadow-2xl border border-slate-200 font-sans flex flex-col justify-between text-xs leading-tight">
      
      <!-- Invoice Header -->
      <div class="flex justify-between items-start pb-4 border-b-2 border-slate-900">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-xl">
            S9
          </div>
          <div>
            <div class="text-xl font-black text-slate-900 tracking-tight">Studio Nine Design</div>
            <div class="text-[11px] text-slate-600 font-medium">Digital Product & Brand Consulting LLP</div>
            <div class="text-[11px] text-slate-500 mt-0.5">402, Lotus Business Park, Andheri West, Mumbai, MH - 400053</div>
            <div class="text-[11px] font-mono font-bold text-emerald-700 mt-0.5">GSTIN: 27AABCS1429B1ZB | State: Maharashtra (27)</div>
          </div>
        </div>
        <div class="text-right">
          <div class="text-2xl font-black text-slate-900 tracking-wider uppercase">Tax Invoice</div>
          <div class="text-[11px] text-slate-500 mt-0.5">Original for Recipient</div>
          <div class="mt-2 text-xs font-mono">
            <div><span class="text-slate-500">Invoice No:</span> <strong class="text-slate-900 font-bold">INV-2026-042</strong></div>
            <div><span class="text-slate-500">Invoice Date:</span> <strong class="text-slate-900">28 Oct 2026</strong></div>
            <div><span class="text-slate-500">Due Date:</span> <strong class="text-rose-600 font-bold">07 Nov 2026</strong></div>
          </div>
        </div>
      </div>

      <!-- Bill To & Place of Supply -->
      <div class="grid grid-cols-2 gap-6 my-4 p-3.5 rounded-lg bg-slate-50 border border-slate-200">
        <div>
          <div class="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Billed To (Client):</div>
          <div class="text-sm font-bold text-slate-900 mt-0.5">Aman Traders</div>
          <div class="text-[11px] text-slate-600 mt-0.5">Ground Floor, Horizon Towers, Nariman Point, Mumbai - 400021</div>
          <div class="text-[11px] text-slate-600">Contact: Aman Verma • +91 98201 XXXXX</div>
        </div>
        <div class="text-right flex flex-col justify-between">
          <div>
            <div class="text-[10px] uppercase font-bold text-slate-500 tracking-wider">GST Compliance Info:</div>
            <div class="text-[11px] font-mono mt-0.5"><span class="text-slate-500">Client GSTIN:</span> <strong class="text-slate-900 font-bold">27AABCT9981A1ZQ</strong></div>
            <div class="text-[11px] text-slate-600 mt-0.5">Place of Supply: <strong class="text-slate-900">Maharashtra (27)</strong></div>
          </div>
          <div class="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px] self-end mt-1">
            Intra-State Transaction (CGST 9% + SGST 9%)
          </div>
        </div>
      </div>

      <!-- Line Items Table -->
      <table class="w-full text-left my-2 border-collapse">
        <thead>
          <tr class="border-y border-slate-900 bg-slate-100 text-[10px] uppercase font-bold text-slate-700">
            <th class="py-2 px-2">#</th>
            <th class="py-2 px-2">Item Description</th>
            <th class="py-2 px-2 text-center">HSN/SAC</th>
            <th class="py-2 px-2 text-center">Qty</th>
            <th class="py-2 px-2 text-right">Unit Rate (₹)</th>
            <th class="py-2 px-2 text-right">Taxable Amount (₹)</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200 text-xs">
          <tr>
            <td class="py-2.5 px-2 text-slate-500 font-mono">1</td>
            <td class="py-2.5 px-2">
              <div class="font-bold text-slate-900">UI/UX Design Retainer & Mobile Prototyping</div>
              <div class="text-[10px] text-slate-500">Monthly design sprint deliverables and interactive Figma components</div>
            </td>
            <td class="py-2.5 px-2 text-center font-mono text-slate-600">998314</td>
            <td class="py-2.5 px-2 text-center font-mono">1</td>
            <td class="py-2.5 px-2 text-right font-mono">40,000.00</td>
            <td class="py-2.5 px-2 text-right font-mono font-bold text-slate-900">40,000.00</td>
          </tr>
          <tr>
            <td class="py-2.5 px-2 text-slate-500 font-mono">2</td>
            <td class="py-2.5 px-2">
              <div class="font-bold text-slate-900">Brand Identity Guidelines & Vector Icon Assets</div>
              <div class="text-[10px] text-slate-500">Complete vector brand kit, typography standards, and social media templates</div>
            </td>
            <td class="py-2.5 px-2 text-center font-mono text-slate-600">998311</td>
            <td class="py-2.5 px-2 text-center font-mono">1</td>
            <td class="py-2.5 px-2 text-right font-mono">10,000.00</td>
            <td class="py-2.5 px-2 text-right font-mono font-bold text-slate-900">10,000.00</td>
          </tr>
        </tbody>
      </table>

      <!-- Totals & Tax Calculation Breakdown -->
      <div class="grid grid-cols-12 gap-6 pt-3 border-t border-slate-200 items-start">
        <div class="col-span-6 space-y-2 text-[11px] text-slate-600">
          <div><strong class="text-slate-900">Amount in Words:</strong></div>
          <div class="italic text-slate-800 font-medium">Fifty Nine Thousand Indian Rupees Only</div>
          <div class="pt-2 text-[10px] text-slate-500 leading-normal">
            Terms: Payment is due within 10 days of invoice date. Late payments subject to 1.5% interest per month.
          </div>
        </div>

        <div class="col-span-6 space-y-1.5 font-mono text-xs">
          <div class="flex justify-between text-slate-600">
            <span>Taxable Subtotal:</span>
            <span>₹ 50,000.00</span>
          </div>
          <div class="flex justify-between text-slate-600">
            <span>CGST (9.00%):</span>
            <span>₹ 4,500.00</span>
          </div>
          <div class="flex justify-between text-slate-600">
            <span>SGST (9.00%):</span>
            <span>₹ 4,500.00</span>
          </div>
          <div class="flex justify-between text-slate-400">
            <span>IGST (18.00%):</span>
            <span>₹ 0.00</span>
          </div>
          <div class="flex justify-between py-2 border-t-2 border-slate-900 font-black text-base text-slate-950">
            <span>Total Value:</span>
            <span>₹ 59,000.00</span>
          </div>
        </div>
      </div>

      <!-- Bottom Payment Box: Bank Details + Dynamic Scan-to-Pay UPI QR -->
      <div class="mt-4 pt-3 border-t-2 border-slate-900 grid grid-cols-12 gap-4 items-center">
        <!-- Bank details -->
        <div class="col-span-7 p-3 rounded-lg bg-slate-50 border border-slate-200 text-[11px] space-y-1">
          <div class="font-bold text-slate-900 uppercase text-[10px] tracking-wider">Bank Transfer Details:</div>
          <div class="font-mono text-slate-700">Bank: <strong class="text-slate-900">HDFC Bank Ltd</strong></div>
          <div class="font-mono text-slate-700">Account Name: <strong class="text-slate-900">Studio Nine Design LLP</strong></div>
          <div class="font-mono text-slate-700">Current A/C: <strong class="text-slate-900">50200084920192</strong> | IFSC: <strong class="text-slate-900">HDFC0000128</strong></div>
        </div>

        <!-- Dynamic UPI QR Card -->
        <div class="col-span-5 p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-3">
          <!-- QR Code Canvas Graphic -->
          <div class="w-16 h-16 bg-white p-1 rounded-md border border-slate-300 flex items-center justify-center flex-shrink-0 shadow-sm">
            <svg class="w-14 h-14" viewBox="0 0 100 100" fill="none">
              <rect width="100" height="100" fill="white"/>
              <rect x="10" y="10" width="24" height="24" fill="#0f172a"/>
              <rect x="14" y="14" width="16" height="16" fill="white"/>
              <rect x="18" y="18" width="8" height="8" fill="#0f172a"/>
              <rect x="66" y="10" width="24" height="24" fill="#0f172a"/>
              <rect x="70" y="14" width="16" height="16" fill="white"/>
              <rect x="74" y="18" width="8" height="8" fill="#0f172a"/>
              <rect x="10" y="66" width="24" height="24" fill="#0f172a"/>
              <rect x="14" y="70" width="16" height="16" fill="white"/>
              <rect x="18" y="74" width="8" height="8" fill="#0f172a"/>
              <rect x="42" y="12" width="6" height="16" fill="#0f172a"/>
              <rect x="52" y="20" width="6" height="8" fill="#0f172a"/>
              <rect x="42" y="42" width="16" height="16" fill="#0f172a"/>
              <rect x="66" y="42" width="8" height="8" fill="#0f172a"/>
              <rect x="78" y="52" width="12" height="6" fill="#0f172a"/>
              <rect x="42" y="66" width="8" height="20" fill="#0f172a"/>
              <rect x="54" y="74" width="20" height="8" fill="#0f172a"/>
              <rect x="78" y="70" width="12" height="18" fill="#0f172a"/>
            </svg>
          </div>
          <div>
            <div class="text-[10px] font-black uppercase text-emerald-900 tracking-wider">Scan to Pay via UPI</div>
            <div class="text-[11px] font-mono font-bold text-slate-900">studionine@okaxis</div>
            <div class="text-[9px] text-slate-600 mt-0.5">Pay ₹59,000 via GPay, PhonePe, Paytm, BHIM</div>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- Bottom Info -->
  <div class="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500 font-mono">
    <span>100% Native Google Sheets Print Layout • Zero External Warning Popups</span>
    <span>Auto-Populated from 🧾 Invoices Tab via Row Selection Checkbox</span>
  </div>
"""

render("gst-print-invoice", html_2)

# 3. gst-invoice-whatsapp
html_3 = """
  <!-- Top Navigation Bar -->
  <div class="flex items-center justify-between pb-5 border-b border-slate-800">
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black text-2xl">
        🧾
      </div>
      <div>
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-black text-white tracking-tight">Master Invoices Ledger & WhatsApp Recovery</h1>
          <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Auto GST Engine</span>
          <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-slate-800 text-slate-300 border border-slate-700">Tab: 🧾 Invoices</span>
        </div>
        <p class="text-xs text-slate-400 mt-1">Master ₹ invoice tracker with Paid/Part-Paid/Unpaid status & instant WhatsApp reminder link</p>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <div class="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-right font-mono">
        <span class="text-xs text-slate-400">Total Billed:</span> <strong class="text-white">₹ 6,45,000</strong> | 
        <span class="text-xs text-emerald-400">Paid:</span> <strong class="text-emerald-400">₹ 5,44,700</strong> | 
        <span class="text-xs text-amber-400">Pending:</span> <strong class="text-amber-400">₹ 1,00,300</strong>
      </div>
    </div>
  </div>

  <!-- Spreadsheet Table Container -->
  <div class="glass-card rounded-2xl p-5 my-5 flex-1 flex flex-col justify-between overflow-hidden">
    <div>
      <div class="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs">
        <div class="flex items-center gap-3">
          <span class="font-bold text-white uppercase tracking-wider">Invoices Master Sheet Data:</span>
          <span class="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[11px] font-mono">Showing Rows 11-16 of 1,000</span>
        </div>
        <div class="flex items-center gap-2 text-emerald-400 font-bold">
          <span>⚡ India GST (CGST/SGST/IGST) Auto-Calculated on Each Row</span>
        </div>
      </div>

      <!-- Mock Excel Grid -->
      <table class="w-full text-left font-mono text-xs border-collapse">
        <thead>
          <tr class="bg-slate-900/90 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-700">
            <th class="p-2.5 text-center">🖨️</th>
            <th class="p-2.5">INVOICE NO.</th>
            <th class="p-2.5">CLIENT / COMPANY</th>
            <th class="p-2.5">DUE DATE</th>
            <th class="p-2.5 text-right">TAXABLE (₹)</th>
            <th class="p-2.5 text-center">GST TYPE</th>
            <th class="p-2.5 text-right">CGST (9%)</th>
            <th class="p-2.5 text-right">SGST (9%)</th>
            <th class="p-2.5 text-right">IGST (18%)</th>
            <th class="p-2.5 text-right font-bold text-slate-200">TOTAL (₹)</th>
            <th class="p-2.5 text-center">STATUS</th>
            <th class="p-2.5 text-center">1-CLICK ACTION</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-800/80">
          <!-- Row 1 -->
          <tr class="bg-emerald-500/5 hover:bg-slate-800/50 transition-colors">
            <td class="p-2.5 text-center text-emerald-400 font-bold">☑️</td>
            <td class="p-2.5 font-bold text-emerald-400">INV-2026-042</td>
            <td class="p-2.5 font-sans font-bold text-white">Aman Traders</td>
            <td class="p-2.5 text-slate-400">07/11/2026</td>
            <td class="p-2.5 text-right text-slate-300">50,000.00</td>
            <td class="p-2.5 text-center"><span class="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">Intra-State</span></td>
            <td class="p-2.5 text-right text-slate-300">4,500.00</td>
            <td class="p-2.5 text-right text-slate-300">4,500.00</td>
            <td class="p-2.5 text-right text-slate-600">-</td>
            <td class="p-2.5 text-right font-black text-white">59,000.00</td>
            <td class="p-2.5 text-center"><span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">🟢 Fully Paid</span></td>
            <td class="p-2.5 text-center"><span class="text-xs text-slate-500">Paid via UPI</span></td>
          </tr>
          <!-- Row 2 (Unpaid & Alerted) -->
          <tr class="bg-amber-500/10 hover:bg-slate-800/50 transition-colors border-l-4 border-l-amber-500">
            <td class="p-2.5 text-center text-slate-500">☐</td>
            <td class="p-2.5 font-bold text-amber-400">INV-2026-043</td>
            <td class="p-2.5 font-sans font-bold text-white">Zenith Cloud (BLR)</td>
            <td class="p-2.5 text-rose-400 font-bold">26/10/2026</td>
            <td class="p-2.5 text-right text-slate-300">85,000.00</td>
            <td class="p-2.5 text-center"><span class="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 text-[10px]">Inter-State</span></td>
            <td class="p-2.5 text-right text-slate-600">-</td>
            <td class="p-2.5 text-right text-slate-600">-</td>
            <td class="p-2.5 text-right text-cyan-300 font-bold">15,300.00</td>
            <td class="p-2.5 text-right font-black text-amber-300">1,00,300.00</td>
            <td class="p-2.5 text-center"><span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">🔴 Overdue (2d)</span></td>
            <td class="p-2.5 text-center">
              <button class="px-2.5 py-1 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-[10px] flex items-center gap-1 mx-auto shadow-sm">
                <span>📱 1-Click WhatsApp</span>
              </button>
            </td>
          </tr>
          <!-- Row 3 -->
          <tr class="hover:bg-slate-800/50 transition-colors">
            <td class="p-2.5 text-center text-slate-500">☐</td>
            <td class="p-2.5 font-bold text-slate-300">INV-2026-044</td>
            <td class="p-2.5 font-sans font-bold text-white">Kunal Shah Studio</td>
            <td class="p-2.5 text-slate-400">05/11/2026</td>
            <td class="p-2.5 text-right text-slate-300">35,000.00</td>
            <td class="p-2.5 text-center"><span class="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">Intra-State</span></td>
            <td class="p-2.5 text-right text-slate-300">3,150.00</td>
            <td class="p-2.5 text-right text-slate-300">3,150.00</td>
            <td class="p-2.5 text-right text-slate-600">-</td>
            <td class="p-2.5 text-right font-black text-white">41,300.00</td>
            <td class="p-2.5 text-center"><span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">🟠 Part-Paid (50%)</span></td>
            <td class="p-2.5 text-center">
              <button class="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] mx-auto">
                Balance Alert
              </button>
            </td>
          </tr>
          <!-- Row 4 -->
          <tr class="hover:bg-slate-800/50 transition-colors">
            <td class="p-2.5 text-center text-slate-500">☐</td>
            <td class="p-2.5 font-bold text-slate-300">INV-2026-045</td>
            <td class="p-2.5 font-sans font-bold text-white">Pooja Nambiar Agency</td>
            <td class="p-2.5 text-slate-400">10/11/2026</td>
            <td class="p-2.5 text-right text-slate-300">60,000.00</td>
            <td class="p-2.5 text-center"><span class="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 text-[10px]">Inter-State</span></td>
            <td class="p-2.5 text-right text-slate-600">-</td>
            <td class="p-2.5 text-right text-slate-600">-</td>
            <td class="p-2.5 text-right text-cyan-300 font-bold">10,800.00</td>
            <td class="p-2.5 text-right font-black text-white">70,800.00</td>
            <td class="p-2.5 text-center"><span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">⚪ Unpaid</span></td>
            <td class="p-2.5 text-center">
              <button class="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] mx-auto">
                Send PDF
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- WhatsApp Fast Recovery Callout Card -->
    <div class="mt-4 p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="w-10 h-10 rounded-xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center font-bold text-xl flex-shrink-0">
          📱
        </div>
        <div>
          <div class="text-xs font-bold text-white flex items-center gap-2">
            <span>Automated 1-Click WhatsApp Payment Recovery Pack:</span>
            <span class="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">Bonus #2 Included</span>
          </div>
          <div class="text-xs text-slate-300 mt-1 font-sans">
            "Hi Zenith Cloud Team! 👋 Gentle reminder that GST Invoice #INV-2026-043 for ₹1,00,300 was due on 26 Oct. Pay via UPI: studionine@okaxis..."
          </div>
        </div>
      </div>
      <div class="px-3.5 py-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold whitespace-nowrap">
        ⚡ Zero Awkward Follow-ups
      </div>
    </div>
  </div>

  <!-- Bottom Info -->
  <div class="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500 font-mono">
    <span>Dropdown Integration: Clients Auto-feed from 🤝 Client Management Tab</span>
    <span>Clicking Checkbox (Column B) Instantly Feeds Active Invoice to 🖨️ Print Tab</span>
  </div>
"""

render("gst-invoice-whatsapp", html_3)

# 4. gst-command-center
html_4 = """
  <!-- Top Navigation Bar -->
  <div class="flex items-center justify-between pb-5 border-b border-slate-800">
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-black text-2xl">
        🧮
      </div>
      <div>
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-black text-white tracking-tight">GST & CA Intelligence Hub (GSTR-1 & 3B)</h1>
          <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">100% Automated</span>
          <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-slate-800 text-slate-300 border border-slate-700">Tab: 🏛️ GST Summary</span>
        </div>
        <p class="text-xs text-slate-400 mt-1">Live Output GST (GSTR-1), Expense ITC Shield, Net Payable (3B), B2B/B2C split & Overdue Aging Radar</p>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <div class="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-right">
        <div class="text-[10px] uppercase tracking-wider text-slate-500 font-bold">CA Filing Deadlines</div>
        <div class="text-sm font-bold font-mono text-emerald-400">GSTR-1: 11th • GSTR-3B: 20th</div>
      </div>
    </div>
  </div>

  <!-- 4 Top KPI Cards -->
  <div class="grid grid-cols-4 gap-5 my-5">
    <div class="glass-card rounded-2xl p-5 border-l-4 border-l-amber-500">
      <div class="text-xs font-bold uppercase tracking-wider text-slate-400">Total Output GST (GSTR-1)</div>
      <div class="text-3xl font-black text-amber-400 mt-2 font-mono">₹ 1,18,450<span class="text-lg text-slate-400 font-normal">.00</span></div>
      <div class="text-xs text-slate-400 mt-2 font-medium">Auto-summed from Invoices Tab</div>
    </div>
    <div class="glass-card rounded-2xl p-5 border-l-4 border-l-cyan-500">
      <div class="text-xs font-bold uppercase tracking-wider text-slate-400">Expense Input Tax Credit (ITC)</div>
      <div class="text-3xl font-black text-cyan-400 mt-2 font-mono">₹ 46,200<span class="text-lg text-slate-400 font-normal">.00</span></div>
      <div class="text-xs text-emerald-400 mt-2 font-bold">🛡️ Tax Shield Deducted from Expenses</div>
    </div>
    <div class="glass-card rounded-2xl p-5 border-l-4 border-l-emerald-500">
      <div class="text-xs font-bold uppercase tracking-wider text-slate-400">Net GST Payable (GSTR-3B)</div>
      <div class="text-3xl font-black text-emerald-400 mt-2 font-mono">₹ 72,250<span class="text-lg text-slate-400 font-normal">.00</span></div>
      <div class="text-xs text-slate-300 mt-2 font-mono">= Output Tax (₹1.18L) - ITC (₹46.2k)</div>
    </div>
    <div class="glass-card rounded-2xl p-5 border-l-4 border-l-violet-500">
      <div class="text-xs font-bold uppercase tracking-wider text-slate-400">Audit & HSN Health</div>
      <div class="text-3xl font-black text-violet-300 mt-2">100% Clean</div>
      <div class="text-xs text-emerald-400 mt-2 font-bold">✓ Zero Missing HSN / SAC Codes</div>
    </div>
  </div>

  <!-- Center Split Section -->
  <div class="grid grid-cols-12 gap-6 flex-1 min-h-0">
    <!-- Left: 12-Month Financial Year Schedule (7 Cols) -->
    <div class="col-span-7 glass-card rounded-2xl p-5 flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
          <div class="flex items-center gap-2">
            <span class="font-bold text-white uppercase tracking-wider">12-Month Financial Year GST Breakdown (FY 26-27):</span>
          </div>
          <span class="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">SUMIFS Formula Connected</span>
        </div>

        <table class="w-full text-left font-mono text-[11px] border-collapse mt-3">
          <thead>
            <tr class="bg-slate-900 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-700">
              <th class="p-2">MONTH</th>
              <th class="p-2 text-right">TAXABLE SALES</th>
              <th class="p-2 text-right">CGST (9%)</th>
              <th class="p-2 text-right">SGST (9%)</th>
              <th class="p-2 text-right">IGST (18%)</th>
              <th class="p-2 text-right text-emerald-400">NET GST</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/80">
            <tr>
              <td class="p-2 font-sans font-bold text-white">April 2026</td>
              <td class="p-2 text-right text-slate-300">₹ 2,40,000</td>
              <td class="p-2 text-right text-slate-300">₹ 14,400</td>
              <td class="p-2 text-right text-slate-300">₹ 14,400</td>
              <td class="p-2 text-right text-slate-500">-</td>
              <td class="p-2 text-right font-bold text-emerald-400">₹ 21,300</td>
            </tr>
            <tr>
              <td class="p-2 font-sans font-bold text-white">May 2026</td>
              <td class="p-2 text-right text-slate-300">₹ 3,10,000</td>
              <td class="p-2 text-right text-slate-300">₹ 18,900</td>
              <td class="p-2 text-right text-slate-300">₹ 18,900</td>
              <td class="p-2 text-right text-cyan-300 font-bold">₹ 18,000</td>
              <td class="p-2 text-right font-bold text-emerald-400">₹ 37,800</td>
            </tr>
            <tr>
              <td class="p-2 font-sans font-bold text-white">June 2026</td>
              <td class="p-2 text-right text-slate-300">₹ 2,85,000</td>
              <td class="p-2 text-right text-slate-300">₹ 17,100</td>
              <td class="p-2 text-right text-slate-300">₹ 17,100</td>
              <td class="p-2 text-right text-slate-500">-</td>
              <td class="p-2 text-right font-bold text-emerald-400">₹ 24,600</td>
            </tr>
            <tr class="bg-emerald-500/10 border-l-2 border-l-emerald-500">
              <td class="p-2 font-sans font-black text-emerald-300">October 2026 (Current)</td>
              <td class="p-2 text-right font-bold text-white">₹ 4,85,250</td>
              <td class="p-2 text-right font-bold text-slate-200">₹ 29,115</td>
              <td class="p-2 text-right font-bold text-slate-200">₹ 29,115</td>
              <td class="p-2 text-right text-cyan-300 font-bold">₹ 15,785</td>
              <td class="p-2 text-right font-black text-emerald-400">₹ 52,100</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono">
        <span class="text-slate-400 font-bold">ANNUAL GST TOTAL:</span>
        <span class="text-white font-black">₹ 13,20,250 Taxable Sales • ₹ 1,48,200 Net Tax Paid</span>
      </div>
    </div>

    <!-- Right: B2B vs B2C Split & Overdue Radar (5 Cols) -->
    <div class="col-span-5 space-y-4 flex flex-col justify-between">
      <!-- B2B vs B2C Split Card -->
      <div class="glass-card rounded-2xl p-5">
        <div class="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
          <span class="font-bold text-white uppercase tracking-wider">B2B vs B2C Split (CA Table Format):</span>
          <span class="text-xs text-emerald-400 font-bold">GSTR-1 Format</span>
        </div>
        <div class="mt-4 space-y-3">
          <div>
            <div class="flex justify-between text-xs font-mono mb-1">
              <span class="text-slate-300 font-bold">Table 4A: B2B with GSTIN (82%)</span>
              <span class="text-white font-bold">₹ 97,129.00</span>
            </div>
            <div class="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
              <div class="h-full bg-emerald-500 rounded-full" style="width: 82%"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between text-xs font-mono mb-1">
              <span class="text-slate-400">Table 7: B2C Consumers (18%)</span>
              <span class="text-slate-300">₹ 21,321.00</span>
            </div>
            <div class="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
              <div class="h-full bg-cyan-500 rounded-full" style="width: 18%"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Overdue GST Aging Radar -->
      <div class="glass-card rounded-2xl p-5 flex-1 flex flex-col justify-between">
        <div class="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
          <span class="font-bold text-white uppercase tracking-wider">Overdue GST Aging Radar:</span>
          <span class="text-xs text-amber-400 font-bold">Cash Recovery</span>
        </div>
        <div class="grid grid-cols-2 gap-3 mt-3">
          <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
            <div class="text-[10px] text-slate-500 font-bold">1–7 Days Overdue</div>
            <div class="text-base font-bold text-slate-200 mt-1">₹ 12,500</div>
            <div class="text-[10px] text-emerald-400 mt-0.5">Low risk (1 client)</div>
          </div>
          <div class="p-3 rounded-xl bg-slate-900 border border-amber-500/30 text-xs font-mono">
            <div class="text-[10px] text-amber-400 font-bold">8–15 Days Overdue</div>
            <div class="text-base font-bold text-amber-300 mt-1">₹ 18,000</div>
            <div class="text-[10px] text-amber-400 mt-0.5">Follow-up sent 📱</div>
          </div>
          <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
            <div class="text-[10px] text-slate-500 font-bold">16–30 Days Overdue</div>
            <div class="text-base font-bold text-slate-400 mt-1">₹ 0.00</div>
            <div class="text-[10px] text-emerald-400 mt-0.5">Zero stuck invoices</div>
          </div>
          <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
            <div class="text-[10px] text-slate-500 font-bold">30+ Days Critical</div>
            <div class="text-base font-bold text-emerald-400 mt-1">₹ 0.00</div>
            <div class="text-[10px] text-emerald-400 mt-0.5">100% Cash Recovered</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Bottom Info -->
  <div class="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500 font-mono">
    <span>Zero Manual GST Math • Dedicated Tab Index #11 in Sheetly 2.0</span>
    <span>Export clean figures to your CA in 30 seconds before filing deadline</span>
  </div>
"""

render("gst-command-center", html_4)

# 5. inr-monthly-overview
html_5 = """
  <!-- Top Navigation Bar -->
  <div class="flex items-center justify-between pb-5 border-b border-slate-800">
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-black text-2xl">
        📅
      </div>
      <div>
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-black text-white tracking-tight">Monthly Income, Operating Costs & Net P&L</h1>
          <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">Analytics View</span>
          <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-slate-800 text-slate-300 border border-slate-700">Tab: 📅 Monthly View</span>
        </div>
        <p class="text-xs text-slate-400 mt-1">Month-by-month ₹ revenue, expense categories & post-GST net income breakdown</p>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <div class="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
        Selected Month: <span class="font-bold text-cyan-400">October 2026</span>
      </div>
    </div>
  </div>

  <!-- 3 Top Big Metric Cards -->
  <div class="grid grid-cols-3 gap-6 my-6">
    <div class="glass-card rounded-2xl p-6 border-t-4 border-t-emerald-500">
      <div class="text-xs font-bold uppercase tracking-wider text-slate-400">Total Monthly Cash Inflow</div>
      <div class="text-4xl font-black text-white mt-2 font-mono">₹ 4,20,000<span class="text-xl text-slate-400 font-normal">.00</span></div>
      <div class="text-xs text-emerald-400 font-bold mt-2">↑ +18.2% vs previous month</div>
    </div>
    <div class="glass-card rounded-2xl p-6 border-t-4 border-t-rose-500">
      <div class="text-xs font-bold uppercase tracking-wider text-slate-400">Total Operating Expenses</div>
      <div class="text-4xl font-black text-slate-200 mt-2 font-mono">₹ 1,35,000<span class="text-xl text-slate-400 font-normal">.00</span></div>
      <div class="text-xs text-slate-400 mt-2">32.1% Operating Expense Ratio</div>
    </div>
    <div class="glass-card rounded-2xl p-6 border-t-4 border-t-cyan-500">
      <div class="text-xs font-bold uppercase tracking-wider text-slate-400">Net Post-Tax Profit</div>
      <div class="text-4xl font-black text-cyan-400 mt-2 font-mono">₹ 2,85,000<span class="text-xl text-cyan-500 font-normal">.00</span></div>
      <div class="text-xs text-cyan-300 font-bold mt-2">67.8% Healthy Net Margin</div>
    </div>
  </div>

  <!-- Center Breakdown -->
  <div class="grid grid-cols-12 gap-6 flex-1 min-h-0">
    <!-- Category Spending List -->
    <div class="col-span-7 glass-card rounded-2xl p-6 flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-bold uppercase text-white tracking-wider">
          <span>Expense Category Allocation:</span>
          <span class="text-slate-400 font-mono">October Spending</span>
        </div>
        <div class="space-y-3 mt-4 text-xs font-mono">
          <div class="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div>
              <div class="font-sans font-bold text-white">Freelance Contractor & Team Payouts</div>
              <div class="text-[10px] text-slate-400 font-mono">Direct Production Cost</div>
            </div>
            <div class="text-right">
              <div class="text-sm font-bold text-white">₹ 65,000.00</div>
              <div class="text-[10px] text-slate-400">48.1% of expenses</div>
            </div>
          </div>
          <div class="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div>
              <div class="font-sans font-bold text-white">Office Space & Coworking Retainer</div>
              <div class="text-[10px] text-slate-400 font-mono">Fixed Operating Cost</div>
            </div>
            <div class="text-right">
              <div class="text-sm font-bold text-white">₹ 32,000.00</div>
              <div class="text-[10px] text-slate-400">23.7% of expenses</div>
            </div>
          </div>
          <div class="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div>
              <div class="font-sans font-bold text-white">Meta & Google Ad Acquisition</div>
              <div class="text-[10px] text-slate-400 font-mono">Client Growth</div>
            </div>
            <div class="text-right">
              <div class="text-sm font-bold text-white">₹ 19,500.00</div>
              <div class="text-[10px] text-slate-400">14.4% of expenses</div>
            </div>
          </div>
          <div class="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div>
              <div class="font-sans font-bold text-white">Software Subscriptions (Figma, Workspace)</div>
              <div class="text-[10px] text-slate-400 font-mono">SaaS Tools</div>
            </div>
            <div class="text-right">
              <div class="text-sm font-bold text-white">₹ 18,500.00</div>
              <div class="text-[10px] text-slate-400">13.7% of expenses</div>
            </div>
          </div>
        </div>
      </div>
      <div class="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 font-mono">
        💡 Expense tracking feeds directly into Input Tax Credit (ITC) for your CA!
      </div>
    </div>

    <!-- Revenue Streams -->
    <div class="col-span-5 glass-card rounded-2xl p-6 flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-bold uppercase text-white tracking-wider">
          <span>Income Streams (By Service):</span>
        </div>
        <div class="space-y-4 mt-5">
          <div>
            <div class="flex justify-between text-xs font-mono mb-1">
              <span class="font-bold text-white">UI/UX Retainer Clients</span>
              <span class="text-emerald-400 font-bold">₹ 2,40,000 (57%)</span>
            </div>
            <div class="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
              <div class="h-full bg-emerald-500 rounded-full" style="width: 57%"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between text-xs font-mono mb-1">
              <span class="font-bold text-white">Brand Identity Sprint Projects</span>
              <span class="text-cyan-400 font-bold">₹ 1,20,000 (29%)</span>
            </div>
            <div class="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
              <div class="h-full bg-cyan-500 rounded-full" style="width: 29%"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between text-xs font-mono mb-1">
              <span class="font-bold text-white">Consulting & Strategy Workshops</span>
              <span class="text-violet-400 font-bold">₹ 60,000 (14%)</span>
            </div>
            <div class="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
              <div class="h-full bg-violet-500 rounded-full" style="width: 14%"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
        <div class="text-[10px] text-slate-500 uppercase font-bold">Profit Goal Achievement:</div>
        <div class="text-lg font-black text-white font-mono mt-1">₹ 2,85,000 / ₹ 3,50,000 Target</div>
        <div class="text-xs text-emerald-400 mt-1">81.4% of monthly target hit!</div>
      </div>
    </div>
  </div>

  <!-- Bottom Info -->
  <div class="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500 font-mono">
    <span>Automated Monthly Analysis • Changes in Income & Expense Entry Instantly Reflected</span>
    <span>Sheetly 2.0 • Complete Business Financial Command</span>
  </div>
"""

render("inr-monthly-overview", html_5)

# 6. inr-monthly-goals-upi
html_6 = """
  <!-- Top Navigation Bar -->
  <div class="flex items-center justify-between pb-5 border-b border-slate-800">
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black text-2xl">
        🎯
      </div>
      <div>
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-black text-white tracking-tight">Monthly Profit Goal & UPI Payment Allocation</h1>
          <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Target Tracker</span>
          <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-slate-800 text-slate-300 border border-slate-700">Tab: 💰 Budget & ⚖️ Balance</span>
        </div>
        <p class="text-xs text-slate-400 mt-1">Actual profit vs monthly ₹ goal progress & UPI vs Credit Card payment allocation</p>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <div class="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-mono font-bold text-xs">
        Target Achievement: 81.4%
      </div>
    </div>
  </div>

  <!-- Big Target Progress Card -->
  <div class="glass-card rounded-2xl p-6 my-6 border-l-4 border-l-emerald-500">
    <div class="flex justify-between items-end mb-4">
      <div>
        <div class="text-xs font-bold uppercase tracking-wider text-slate-400">October 2026 Target Progress</div>
        <div class="text-4xl font-black text-white mt-1 font-mono">₹ 2,85,000<span class="text-xl text-slate-500"> / ₹ 3,50,000 Goal</span></div>
      </div>
      <div class="text-right font-mono">
        <div class="text-2xl font-black text-emerald-400">81.4% Achieved</div>
        <div class="text-xs text-slate-400 mt-0.5">₹ 65,000 remaining to stretch goal</div>
      </div>
    </div>
    <div class="w-full h-4 rounded-full bg-slate-900 border border-slate-800 overflow-hidden p-0.5">
      <div class="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full" style="width: 81.4%"></div>
    </div>
  </div>

  <!-- Two Column Allocation Analysis -->
  <div class="grid grid-cols-12 gap-6 flex-1 min-h-0">
    <!-- Payment Mode Breakdown -->
    <div class="col-span-7 glass-card rounded-2xl p-6 flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-bold uppercase text-white tracking-wider">
          <span>Inflow By Payment Mode (India Focus):</span>
          <span class="text-emerald-400 font-mono">Zero Gateway Leakage</span>
        </div>

        <div class="space-y-4 mt-5">
          <div class="p-3.5 rounded-xl bg-slate-900 border border-emerald-500/30">
            <div class="flex justify-between text-xs font-mono">
              <span class="font-bold text-white flex items-center gap-2">
                <span class="text-base">📱</span> Direct UPI QR (GPay / PhonePe / Paytm)
              </span>
              <span class="font-bold text-emerald-400">₹ 2,60,400 (62%)</span>
            </div>
            <div class="w-full h-2 rounded-full bg-slate-800 mt-2 overflow-hidden">
              <div class="h-full bg-emerald-500 rounded-full" style="width: 62%"></div>
            </div>
            <div class="text-[10px] text-emerald-400/90 mt-2">Zero processing fees • Instant bank credit in 2 seconds</div>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <div class="flex justify-between text-xs font-mono">
              <span class="font-bold text-white flex items-center gap-2">
                <span class="text-base">🏦</span> NEFT / RTGS / IMPS Bank Transfer
              </span>
              <span class="font-bold text-cyan-400">₹ 1,17,600 (28%)</span>
            </div>
            <div class="w-full h-2 rounded-full bg-slate-800 mt-2 overflow-hidden">
              <div class="h-full bg-cyan-500 rounded-full" style="width: 28%"></div>
            </div>
            <div class="text-[10px] text-slate-400 mt-2">Preferred for enterprise retainer payments</div>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <div class="flex justify-between text-xs font-mono">
              <span class="font-bold text-white flex items-center gap-2">
                <span class="text-base">💳</span> Credit Card & Payment Gateway
              </span>
              <span class="font-bold text-slate-300">₹ 42,000 (10%)</span>
            </div>
            <div class="w-full h-2 rounded-full bg-slate-800 mt-2 overflow-hidden">
              <div class="h-full bg-slate-400 rounded-full" style="width: 10%"></div>
            </div>
            <div class="text-[10px] text-slate-500 mt-2">International clients and card checkouts</div>
          </div>
        </div>
      </div>

      <div class="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-mono">
        💰 <strong>Savings Highlight:</strong> Saved ₹7,812 in payment gateway fees by encouraging direct UPI QR payments on client invoices!
      </div>
    </div>

    <!-- Account Balances & Liquidity -->
    <div class="col-span-5 glass-card rounded-2xl p-6 flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-bold uppercase text-white tracking-wider">
          <span>Real-Time Cash Liquidity:</span>
          <span class="text-slate-400 font-mono">Tab: ⚖️ Balance</span>
        </div>

        <div class="space-y-3 mt-4 font-mono text-xs">
          <div class="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div class="text-[10px] text-slate-500">Primary Current Account (HDFC)</div>
            <div class="text-base font-bold text-white mt-1">₹ 3,42,850.00</div>
          </div>
          <div class="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div class="text-[10px] text-slate-500">Tax & GST Reserve Escrow Account</div>
            <div class="text-base font-bold text-cyan-400 mt-1">₹ 72,250.00</div>
          </div>
          <div class="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div class="text-[10px] text-slate-500">UPI Business Wallet Float</div>
            <div class="text-base font-bold text-emerald-400 mt-1">₹ 28,500.00</div>
          </div>
        </div>
      </div>

      <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
        <div class="text-[10px] uppercase font-bold text-slate-400">Total Liquid Reserves:</div>
        <div class="text-xl font-black text-white font-mono mt-1">₹ 4,43,600.00</div>
        <div class="text-[11px] text-slate-400 mt-1">3.3 Months of Operational Runway</div>
      </div>
    </div>
  </div>

  <!-- Bottom Info -->
  <div class="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500 font-mono">
    <span>Track Multiple Bank Accounts & Wallets • Reconciled against 📊 Reconcilation Tab</span>
    <span>Sheetly 2.0 • Financial Discipline for Modern Indian Creators & Agencies</span>
  </div>
"""

render("inr-monthly-goals-upi", html_6)

# 7. inr-custom-period-pnl
html_7 = """
  <!-- Top Navigation Bar -->
  <div class="flex items-center justify-between pb-5 border-b border-slate-800">
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 rounded-2xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-violet-400 font-black text-2xl">
        🧩
      </div>
      <div>
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-black text-white tracking-tight">Custom Date Range P&L & Tax Analyzer</h1>
          <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-violet-500/15 text-violet-400 border border-violet-500/30">Dynamic Filter</span>
          <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-slate-800 text-slate-300 border border-slate-700">Tab: 🧩 Custom Period View</span>
        </div>
        <p class="text-xs text-slate-400 mt-1">Filter any custom start & end date for instant Net Revenue, Gross Profit & GST totals</p>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <div class="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-right font-mono text-xs">
        <span class="text-slate-400">Date Range:</span> <strong class="text-violet-400">01/07/2026 to 30/09/2026</strong> (Q2)
      </div>
    </div>
  </div>

  <!-- Date Range Filter Selector Bar -->
  <div class="glass-card rounded-2xl p-5 my-5 border-l-4 border-l-violet-500 flex items-center justify-between">
    <div class="flex items-center gap-6">
      <div class="flex items-center gap-2">
        <span class="text-xs text-slate-400 font-bold uppercase">From Date:</span>
        <div class="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 font-mono text-xs text-white font-bold">
          01 / 07 / 2026
        </div>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-xs text-slate-400 font-bold uppercase">To Date:</span>
        <div class="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 font-mono text-xs text-white font-bold">
          30 / 09 / 2026
        </div>
      </div>
      <div class="px-3 py-1.5 rounded-lg bg-violet-500/20 text-violet-300 border border-violet-500/30 font-bold text-xs">
        Quarter 2 (Q2 FY 26-27)
      </div>
    </div>
    <div class="text-xs font-mono text-slate-400">
      ⚡ <strong class="text-white">92 Days</strong> Filtered • <strong class="text-white">48 Invoices</strong> Analyzed
    </div>
  </div>

  <!-- 4 Big P&L Result Cards -->
  <div class="grid grid-cols-4 gap-5 mb-5">
    <div class="glass-card rounded-2xl p-5">
      <div class="text-xs font-bold uppercase tracking-wider text-slate-400">Gross Billed Inflow</div>
      <div class="text-3xl font-black text-white mt-2 font-mono">₹ 12,80,000<span class="text-base text-slate-400">.00</span></div>
      <div class="text-xs text-emerald-400 font-bold mt-2">↑ +24.6% vs Q1</div>
    </div>
    <div class="glass-card rounded-2xl p-5">
      <div class="text-xs font-bold uppercase tracking-wider text-slate-400">Operating Deductions</div>
      <div class="text-3xl font-black text-slate-300 mt-2 font-mono">₹ 4,10,000<span class="text-base text-slate-500">.00</span></div>
      <div class="text-xs text-slate-400 mt-2">Direct & Overhead Costs</div>
    </div>
    <div class="glass-card rounded-2xl p-5 border-b-2 border-b-emerald-500">
      <div class="text-xs font-bold uppercase tracking-wider text-slate-400">Net Gross Profit</div>
      <div class="text-3xl font-black text-emerald-400 mt-2 font-mono">₹ 8,70,000<span class="text-base text-emerald-500">.00</span></div>
      <div class="text-xs text-emerald-300 font-bold mt-2">67.9% Profit Margin</div>
    </div>
    <div class="glass-card rounded-2xl p-5 border-b-2 border-b-amber-500">
      <div class="text-xs font-bold uppercase tracking-wider text-slate-400">GST Liability (Q2 Total)</div>
      <div class="text-3xl font-black text-amber-400 mt-2 font-mono">₹ 1,95,120<span class="text-base text-amber-500">.00</span></div>
      <div class="text-xs text-slate-400 mt-2">Ready for CA Quarterly Audit</div>
    </div>
  </div>

  <!-- Bottom Detailed Client Breakdown in Selected Window -->
  <div class="glass-card rounded-2xl p-5 flex-1 flex flex-col justify-between">
    <div>
      <div class="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
        <span class="font-bold text-white uppercase tracking-wider">Top Revenue Contributors in Selected Period:</span>
        <span class="text-slate-400 font-mono">Auto-Ranked by Billing Volume</span>
      </div>

      <div class="grid grid-cols-3 gap-4 mt-4 font-mono text-xs">
        <div class="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
          <div class="font-sans font-bold text-white text-sm">Aman Traders</div>
          <div class="text-slate-400 mt-0.5">3 Milestone Invoices</div>
          <div class="text-base font-black text-emerald-400 mt-2">₹ 3,40,000.00</div>
          <div class="text-[10px] text-slate-500 mt-1">26.5% of Period Revenue</div>
        </div>
        <div class="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
          <div class="font-sans font-bold text-white text-sm">Zenith Cloud Technologies</div>
          <div class="text-slate-400 mt-0.5">2 Cloud Architecture Sprints</div>
          <div class="text-base font-black text-emerald-400 mt-2">₹ 2,85,000.00</div>
          <div class="text-[10px] text-slate-500 mt-1">22.2% of Period Revenue</div>
        </div>
        <div class="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
          <div class="font-sans font-bold text-white text-sm">Kunal Shah Architecture</div>
          <div class="text-slate-400 mt-0.5">Brand Identity & Digital Assets</div>
          <div class="text-base font-black text-emerald-400 mt-2">₹ 1,80,000.00</div>
          <div class="text-[10px] text-slate-500 mt-1">14.0% of Period Revenue</div>
        </div>
      </div>
    </div>

    <div class="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
      <span>Ideal for Tax Audits, Investor Reports & Partner Profit-Sharing Reviews</span>
      <span class="text-emerald-400 font-bold">1-Click CSV/PDF Export Supported</span>
    </div>
  </div>
"""

render("inr-custom-period-pnl", html_7)

print("🎉 ALL 6 REMAINING MOCKUPS GENERATED SUCCESSFULLY!")

# Sheetly — High-Converting Landing Page 🚀

Ultra-fast, high-converting direct-response landing page built with **Vite + React + Tailwind CSS**.

## 📌 Quick Start

```bash
# 1. Install dependencies (already installed)
npm install

# 2. Start local development server
npm run dev

# 3. Build for production (output in /dist)
npm run build
```

The dev server will run locally at: `http://localhost:3000`

---

## ⚙️ Configuration & Customization

Aap saari settings **[`src/App.jsx`](file:///Users/krishkumar/Desktop/Sheetly/src/App.jsx)** ke top par `CONFIG` object se 1 minute mein badal sakte hain:

```javascript
const CONFIG = {
  productName: "Sheetly",
  price: "₹899",
  originalPrice: "₹2,499",
  totalValue: "₹11,496",
  checkoutUrl: "https://superprofile.bio/vp/tj9_xpSO", // <-- Apna Superprofile/Razorpay link yahan dalein
  whatsappNumber: "916201530733",                     // <-- Apna WhatsApp number yahan dalein
  supportEmail: "support@sheetly.com",
};
```

---

## 🎯 Meta Pixel (Facebook Ads) Integration

Aap apna Meta Pixel ID **[`index.html`](file:///Users/krishkumar/Desktop/Sheetly/index.html)** ke `<head>` mein daal sakte hain:

```html
<!-- Meta Pixel Code -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID_HERE'); // <-- Replace with your Pixel ID
  fbq('track', 'PageView');
</script>
```

---

## 🌐 1-Click Deployment (Cloudflare Pages or Vercel)

### Option 1: Cloudflare Pages (Recommended)
1. GitHub par repository push karein.
2. Cloudflare Dashboard me **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**.
3. Build Settings:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Deploy! Aur apna custom domain bind kar lein.

### Option 2: Vercel
```bash
npx vercel
```

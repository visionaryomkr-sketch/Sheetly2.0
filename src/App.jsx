import React, { useState, useEffect } from 'react';
import {
  CheckCircle,
  ShieldCheck,
  Zap,
  ArrowRight,
  Star,
  Clock,
  FileSpreadsheet,
  Users,
  Receipt,
  Calendar as CalendarIcon,
  TrendingUp,
  HelpCircle,
  DollarSign,
  IndianRupee,
  Smartphone,
  AlertTriangle,
  Layers,
  Sparkles,
  ChevronDown,
  Gift,
  ExternalLink,
  MessageCircle,
  ChevronRight,
  Check,
  X,
  Sun,
  Moon,
  Laptop,
  ArrowUpRight,
  Download,
  FileCheck,
  CreditCard,
  Maximize2,
  Filter,
  Calculator,
  Eye,
  SlidersHorizontal,
  Package,
  PlayCircle,
  Quote
} from 'lucide-react';
import SheetlyAiChatbot from './SheetlyAiChatbot.jsx';

// ==========================================
// CONFIGURATION (Aap yahan se links change kar sakte hain)
// ==========================================
const CONFIG = {
  productName: "Sheetly",
  price: "₹899",
  originalPrice: "₹4,999",
  totalValue: "₹14,494",
  checkoutUrl: "https://superprofile.bio/vp/tj9_xpSO",
  whatsappNumber: "916201530733",
  supportEmail: "birzcrown@gmail.com",
};

// ==========================================
// META PIXEL EVENT TRACKING HELPERS
// ==========================================
export const handleCheckoutClick = (e, source = 'CTA Button') => {
  if (e && e.preventDefault) {
    e.preventDefault();
  }
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    try {
      window.fbq('track', 'InitiateCheckout', {
        content_name: 'Sheetly 2.0 Business Operating System',
        content_category: 'Google Sheets Template',
        content_ids: ['sheetly-2-0'],
        currency: 'INR',
        value: 899,
        button_source: source
      });
    } catch (err) {
      console.error('Meta Pixel error:', err);
    }
  }
  setTimeout(() => {
    window.location.href = CONFIG.checkoutUrl;
  }, 180);
};

export const trackInitiateCheckout = (source = 'CTA Button') => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    try {
      window.fbq('track', 'InitiateCheckout', {
        content_name: 'Sheetly 2.0 Business Operating System',
        content_category: 'Google Sheets Template',
        content_ids: ['sheetly-2-0'],
        currency: 'INR',
        value: 899,
        button_source: source
      });
    } catch (err) {
      console.error('Meta Pixel error:', err);
    }
  }
};

export const trackWhatsAppClick = (source = 'WhatsApp CTA') => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Contact', {
      content_name: 'Sheetly WhatsApp Inquiry',
      channel: 'WhatsApp',
      source: source
    });
  }
};

export default function App() {
  // Theme State: 'dark' or 'light'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('sheetly-theme') || 'dark';
  });

  // Persistent Countdown Timer (stored in localStorage so refresh never resets to 15m)
  const [timeLeft, setTimeLeft] = useState(() => {
    const getDeadline = () => {
      const stored = localStorage.getItem('sheetly-timer-deadline');
      const now = Date.now();
      if (stored && Number(stored) > now) {
        return Number(stored);
      }
      const newDeadline = now + (11 * 3600 + 42 * 60 + 19) * 1000;
      localStorage.setItem('sheetly-timer-deadline', String(newDeadline));
      return newDeadline;
    };
    const diff = Math.max(0, Math.floor((getDeadline() - Date.now()) / 1000));
    return {
      hours: Math.floor(diff / 3600),
      minutes: Math.floor((diff % 3600) / 60),
      seconds: diff % 60,
    };
  });
  const [legalModal, setLegalModal] = useState(null); // 'terms' | 'privacy' | 'refund' | null
  const [zoomImage, setZoomImage] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  // Preview Tour States (Per-module subviews, collapsible details, and accordion)
  const [moduleSubViews, setModuleSubViews] = useState({});
  const [expandedCards, setExpandedCards] = useState({});
  const [openAccordion, setOpenAccordion] = useState(null);

  const getSubView = (moduleId) => moduleSubViews[moduleId] || 0;
  const setSubView = (moduleId, idx) => setModuleSubViews(prev => ({ ...prev, [moduleId]: idx }));
  const toggleCardExpand = (id) => setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleAccordion = (id) => setOpenAccordion(prev => prev === id ? null : id);

  // Savings Calculator State (Default 2 tools selected for realistic initial savings)
  const [tools, setTools] = useState({
    notion: true,
    clickup: true,
    quickbooks: false,
    calendly: false,
    airtable: false,
  });

  // Save theme changes
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('sheetly-theme', newTheme);
  };

  // Countdown effect (ticks accurately against persistent timestamp)
  useEffect(() => {
    const timer = setInterval(() => {
      const stored = localStorage.getItem('sheetly-timer-deadline');
      let deadline = stored ? Number(stored) : Date.now() + 3600000;
      let diff = Math.max(0, Math.floor((deadline - Date.now()) / 1000));
      if (diff <= 0) {
        deadline = Date.now() + (12 * 3600) * 1000;
        localStorage.setItem('sheetly-timer-deadline', String(deadline));
        diff = Math.floor((deadline - Date.now()) / 1000);
      }
      setTimeLeft({
        hours: Math.floor(diff / 3600),
        minutes: Math.floor((diff % 3600) / 60),
        seconds: diff % 60,
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Savings calculation
  const toolPrices = {
    notion: 800,
    clickup: 1200,
    quickbooks: 1500,
    calendly: 750,
    airtable: 1600,
  };

  const monthlySavings = Object.keys(tools).reduce((sum, key) => {
    return sum + (tools[key] ? toolPrices[key] : 0);
  }, 0);
  const annualSavings = monthlySavings * 12;

  // Ultra-detailed modules based on actual Google Sheet inspection
  const previewTabs = [
    {
      id: 'dashboard',
      sheetTabName: "🎛️ Dashboard",
      label: 'Executive Dashboard',
      numberPill: '01 / CORE ENGINE',
      icon: TrendingUp,
      title: '🎛️ Executive ₹ Dashboard',
      tagline: 'Your entire business health at a single glance — automated with zero manual math.',
      desc: 'Wake up, open your dashboard, and instantly know your daily schedule, active client deliverables, overdue invoice alerts, and live cashflow numbers. Links automatically to all your backend tabs.',
      views: [
        { label: "Live ₹ INR Cockpit", src: "/Images/inr-executive-dashboard.webp", caption: "Real-time ₹ revenue overview, unpaid GST bills, client inspector & daily CA schedule" },
        { label: 'Executive Cockpit', src: '/Images/business-dashboard.webp', caption: 'Live KPI gauges, revenue progress & daily schedule' },
        { label: 'Category Insights', src: '/Images/dashboard-insight.webp', caption: 'Visual income vs expense charts & low-balance alerts' },
        { label: 'Clean Overview Layout', src: '/Images/business-dashboards.webp', caption: 'Compact view for 13-inch laptops & tablets' }
      ],
      badge: 'Auto-Updated in Real Time',
      timeSaved: 'Saves ~45 mins/day',
      bullets: [
        { label: "Instant Client Inspector", text: "Select any client to auto-load contact details, status, and active work." },
        { label: "Daily Schedule Cockpit", text: "Auto-detects today's date to list all meetings, bills, and deadlines due today." },
        { label: "Live ₹ Profit & Overdue Radar", text: "Visual target trackers and high-visibility alerts for pending payments." }
      ],
      keyFeatures: [
        { title: 'Interactive Client Quick Inspector', desc: 'Select any client name from the dropdown: their phone, email, address, status, and active project immediately load automatically.' },
        { title: 'Today\'s Operational Schedule', desc: 'Automatically checks today\'s date and lists all meetings, invoice due dates, and task deliverables scheduled for today.' },
        { title: 'Visual Revenue & Profit Gauges', desc: 'Live gauge charts comparing your actual month-to-date collections against your monthly profit targets.' },
        { title: 'Overdue Payment Alerts', desc: 'High-visibility alert box highlighting invoices overdue by 7, 15, or 30 days so you can follow up without awkward delays.' }
      ],
      columnsTracked: ['Today\'s Schedule Message', 'Client Quick Inspector Dropdown', 'Email, Phone & City', 'Status & Priority Tags', 'Client Notes & History', 'Today\'s Tasks Counter']
    },
    {
      id: 'invoicing',
      sheetTabName: "🧾 Invoices & 🖨️ Print - Invoice",
      label: 'GST Invoicing Engine',
      numberPill: '02 / REVENUE ENGINE',
      icon: Receipt,
      title: '🧾 60-Sec GST Invoicing & UPI QR',
      tagline: 'Create, track, and export branded GST-compliant bills in under 60 seconds.',
      desc: 'No expensive invoicing software required. Manage your master invoice ledger with automatic 18% GST calculations (Inclusive & Exclusive), then switch to the Print tab to generate client-ready PDF bills in one click.',
      views: [
        { label: "1-Page GST Bill + UPI QR", src: "/Images/gst-print-invoice.webp", caption: "Print-ready GST Tax Invoice with GSTIN, HSN/SAC, CGST/SGST/IGST & Dynamic Scan-to-Pay UPI QR" },
        { label: "₹ Ledger + 1-Click WhatsApp", src: "/Images/gst-invoice-whatsapp.webp", caption: "Master ₹ invoice tracker with Paid/Part-Paid/Unpaid status & instant WhatsApp reminder link" },
        { label: 'Printable PDF Invoice', src: '/Images/invoice-dashboard.webp', caption: 'Pixel-perfect, print-ready branded GST invoice' },
        { label: 'Invoice Tracker Board', src: '/Images/invoice-tracker.webp', caption: 'Master invoice ledger with Fully Paid vs Unpaid tags' },
        { label: 'Client Billing View', src: '/Images/invoice.webp', caption: 'Line item breakdown with tax percentage splits' }
      ],
      badge: 'Indian GST Compliant (18% / 12% / 5%)',
      timeSaved: 'Saves ~29 mins/invoice',
      bullets: [
        { label: "Auto 18% GST Calculations", text: "Enter fee & tax rate — inclusive & exclusive totals calculate instantly." },
        { label: "1-Click Print & Branded PDF", text: "Select invoice number to generate a client-ready PDF with dynamic UPI QR code." },
        { label: "1-Click WhatsApp Payment Chaser", text: "Color-coded Paid/Unpaid tags with instant WhatsApp payment reminder link." }
      ],
      keyFeatures: [
        { title: 'Automatic 18% GST Calculations', desc: 'Just enter the base service fee and tax percentage: all Tax-Inclusive and Tax-Exclusive amounts calculate automatically with zero manual math.' },
        { title: '1-Click Printable PDF Bill Layout', desc: 'Select the invoice number from the dropdown on the Print tab — all client details, line items, and totals auto-fill into a gorgeous PDF-ready bill.' },
        { title: 'Color-Coded Status Tags', desc: 'Visual badges for Fully Paid, Partial, Unpaid, and Cancelled with automatic balance due calculation.' },
        { title: 'Auto-Incrementing Invoice Numbers', desc: 'Prevents duplicate invoice numbers and keeps your tax audit records 100% compliant and clean for your CA.' }
      ],
      columnsTracked: ['🖨️ Print Checkbox', 'INVOICE NO.', 'CLIENT / COMPANY', 'DATE SENT & DUE DATE', 'STATUS (Paid/Unpaid/Part-Paid)', 'PAID AMOUNT & BALANCE DUE', 'DISCOUNT %', 'TAX (18.00%) & TOTAL']
    },
    {
      id: "gst-hub",
      sheetTabName: "🧮 GST Summary (GSTR-1 & 3B)",
      label: "GST & CA Command Center",
      numberPill: '03 / TAX INTELLIGENCE',
      icon: Calculator,
      title: "🧮 GSTR-1, GSTR-3B & CA Hub",
      tagline: "Zero manual GST math. Hand clean monthly numbers to your CA in 30 seconds.",
      desc: "Automatically separates Intra-State (CGST + SGST) and Inter-State (IGST) sales, deducts eligible Expense Input Tax Credit (ITC), flags missing HSN/SAC codes, and tracks GST locked inside overdue client bills.",
      views: [
        { label: "GST & ITC Command Center", src: "/Images/gst-command-center.webp", caption: "Live Output GST (GSTR-1), Expense ITC Shield, Net Payable (3B), B2B/B2C split & Overdue Aging Radar" }
      ],
      badge: "GSTR-1 & GSTR-3B Ready",
      timeSaved: "Saves ₹15,000+/yr in CA cleanup",
      bullets: [
        { label: "Auto CGST/SGST vs IGST Split", text: "Automatically checks State vs Place of Supply for intra vs inter-state tax." },
        { label: "Expense ITC Tax Shield", text: "Pulls GST paid on business expenses to calculate exact Net Tax Payable (3B)." },
        { label: "B2B Audit & Overdue Watchlist", text: "Segregates GSTIN bills from B2C and flags missing HSN/SAC codes automatically." }
      ],
      keyFeatures: [
        { title: "Auto CGST / SGST vs IGST Split", desc: "Compares your business state with the client's Place of Supply to apply Intra-State or Inter-State GST automatically." },
        { title: "Expense Input Tax Credit (ITC) Shield", desc: "Pulls GST paid on business expenses to calculate exact Net GST Payable (Output Tax minus ITC)." },
        { title: "B2B vs B2C & HSN Audit Health", desc: "Separates GSTIN invoices (Table 4A) from B2C bills (Table 7) and alerts you if any HSN/SAC code is missing." },
        { title: "Overdue GST Watchlist", desc: "Highlights 1–7, 8–15, 16–30, and 30+ day overdue bills so you recover stuck cash fast." }
      ],
      columnsTracked: ["OUTPUT GST (GSTR-1)", "EXPENSE ITC CREDIT", "NET GST PAYABLE (3B)", "CGST / SGST / IGST", "B2B vs B2C AUDIT", "OVERDUE AGING RADAR"]
    },
    {
      id: 'finances',
      sheetTabName: "🟢 Income, 🔴 Expense, 📅 Monthly & 1️⃣2️⃣-Month Views",
      label: 'Cashflow & Profit Analytics',
      numberPill: '04 / PROFIT ENGINE',
      icon: IndianRupee,
      title: '💰 Cashflow, UPI Split & 12-Month Profit',
      tagline: 'Complete financial clarity. Eliminate tax season chaos forever.',
      desc: 'Comprehensive financial suite featuring dedicated Income & Expense ledgers, bank reconciliation, monthly category breakdowns, 12-month annual growth trends, and custom date range analyzers.',
      views: [
        { label: "₹ Monthly Income & Expenses", src: "/Images/inr-monthly-overview.webp", caption: "Month-by-month ₹ revenue, expense categories & post-GST net income breakdown" },
        { label: "Profit Goal & UPI Split", src: "/Images/inr-monthly-goals-upi.webp", caption: "Actual profit vs monthly ₹ goal progress & UPI vs Credit Card payment allocation" },
        { label: "Custom Date Range P&L", src: "/Images/inr-custom-period-pnl.webp", caption: "Filter any custom start & end date for instant Net Revenue, Gross Profit & GST totals" },
        { label: '12-Month Annual Trend', src: '/Images/master-finance.webp', caption: 'Full year revenue, expenses, and Monthly Profit vs Goals' },
        { label: 'Monthly Category Breakdown', src: '/Images/finance.webp', caption: 'Category-by-category spending charts & net profit margins' },
        { label: 'Bank Reconciliation Tab', src: '/Images/bookkeeping.webp', caption: 'Cross-check bank statement lines against spreadsheet entries' }
      ],
      badge: 'Chartered Accountant (CA) Approved',
      timeSaved: 'Saves 3 days of tax panic',
      bullets: [
        { label: "12-Month P&L Growth Engine", text: "Full year revenue, expenses, and monthly profit targets side-by-side." },
        { label: "Account & UPI Split Tracker", text: "Real-time breakdown of cash, UPI payments, credit cards, and bank balances." },
        { label: "Custom Date Range Analyzer", text: "Pick any custom date range for instant Net Revenue, Gross Margin & GST totals." }
      ],
      keyFeatures: [
        { title: 'Tax-Inclusive & Exclusive Calculation', desc: 'Handles GST 18%, 12%, 5% or 0% automatically, splitting Net Amount from Tax Amount for clean quarterly filing.' },
        { title: 'Monthly View & Goal Comparison', desc: 'Set a monthly profit goal (e.g. ₹5,00,000) and watch your live progress bar fill up as invoices are paid.' },
        { title: '12-Month Annual Growth Overview', desc: 'Side-by-side January-to-December financial comparison showing seasonal revenue peaks and cost trends.' },
        { title: 'Custom Date Range Analyzer', desc: 'Select any custom start and end date (e.g. Q1 or festival campaign) to calculate custom gross profit and net margin in 1 click.' }
      ],
      columnsTracked: ['INVOICE NO. / EXPENSE ID', 'DATE & CATEGORY', 'TOTAL AMOUNT', 'TAX % (Inclusive & Exclusive)', 'Reconciled Checkbox (☑️)', 'Monthly Profit Goal vs Actual', 'Custom Period (From/To)', 'Account Balances (Cash/UPI/Bank)']
    },
    {
      id: 'crm',
      sheetTabName: "🤝 Client Management & 💬 Communication Log",
      label: 'Client CRM & Log',
      numberPill: 'OPERATIONS / CLIENTS',
      icon: Users,
      title: '🤝 Client CRM & Activity Log',
      tagline: 'Never lose a lead or forget a client discussion again.',
      desc: 'Store unlimited client profiles with priority ratings, payment preferences, and contract histories. Connected directly to an automated communication ledger that logs every WhatsApp chat, phone call, and meeting.',
      views: [
        { label: 'Client Directory', src: '/Images/client-managnment.webp', caption: 'Full CRM database with status tags & payment modes' },
        { label: 'Communication Log', src: '/Images/relationship.webp', caption: 'Historical activity log with Next Action follow-ups' },
        { label: 'Client Profile Inspector', src: '/Images/client.webp', caption: 'Individual client contract & balance inspector' }
      ],
      badge: 'Unlimited Client Profiles',
      timeSaved: 'Zero communication confusion',
      bullets: [
        { label: "Unlimited Client Directory", text: "Store client profiles with priority tags (🔴 High, 🟠 Medium, 🟡 Low) & payment terms." },
        { label: "WhatsApp & Call History Log", text: "Record date, contact method, services pitched, and next follow-up dates." },
        { label: "1-Click Invoice Linkage", text: "Client details auto-feed into invoice dropdowns — type once, use everywhere." }
      ],
      keyFeatures: [
        { title: 'Built-in Client Highlighter Tool', desc: 'Pick any client from the top dropdown to automatically highlight and isolate their entire row across all tables.' },
        { title: 'Client Classification & Priority Tags', desc: 'Tag accounts by type (Small Business, Freelancer, Enterprise) with visual priority tags (🔴 High, 🟠 Medium, 🟡 Low).' },
        { title: 'Communication History Log', desc: 'Records contact person, date, contact method (Phone, WhatsApp, Meeting), service pitched, and "Next Action" reminders.' },
        { title: 'One-Click Integration With Invoices', desc: 'Client names and contact info automatically feed into the invoice dropdowns — type their name once, use forever.' }
      ],
      columnsTracked: ['CLIENT / COMPANY', 'TYPE (Business Category)', 'E-MAIL & PHONE', 'ADDRESS / CITY', 'STATUS & PRIORITY', 'PAYMENT METHOD (UPI/Bank)', 'CONTACT TYPE', 'NEXT ACTION FOLLOW-UP']
    },
    {
      id: 'tasks',
      sheetTabName: "☑️ Task-Project Tracker",
      label: 'Tasks & Projects',
      numberPill: 'OPERATIONS / PROJECTS',
      icon: Layers,
      title: '☑️ Tasks & Deliverable Tracker',
      tagline: 'Keep your team focused, deliverables on schedule, and clients delighted.',
      desc: 'A robust task and project management board that tracks deadlines, client milestones, team member assignments, and progress stages with interactive completion checkboxes.',
      views: [
        { label: 'Project Deliverables Board', src: '/Images/task-dashboard.webp', caption: 'Priority tags, delegate assignments & due date alerts' },
        { label: 'Milestone Stage View', src: '/Images/task-manage.webp', caption: 'Progress stages: In Progress, Review, Completed' }
      ],
      badge: 'Interactive Checkbox System',
      timeSaved: 'Saves 2+ hrs/wk on follow-ups',
      bullets: [
        { label: "Interactive Checkboxes (☑️)", text: "Tap to mark done, auto-update progress %, and clear from overdue alerts." },
        { label: "Client & CRM Connection", text: "Every task links to client dropdowns so workload stays neatly organized." },
        { label: "Delegation & Urgency Counter", text: "Assign team members with custom notes and track today's urgent midnight tasks." }
      ],
      keyFeatures: [
        { title: 'Interactive Completion Checkboxes (☑️)', desc: 'Clicking a checkbox instantly marks the task complete, updates progress percentages, and removes it from the overdue list.' },
        { title: 'Client & Project Linkage', desc: 'Tasks link directly to your Client CRM dropdown, so you always know which client each deliverable belongs to.' },
        { title: 'Team Member Delegation', desc: 'Assign specific team members or contractors to individual deliverables with custom notes and revision descriptions.' },
        { title: 'Today\'s Tasks Counter', desc: 'Automatically compares due dates against today\'s date to show an active badge of urgent tasks due before midnight.' }
      ],
      columnsTracked: ['☑️ Completion Checkbox', 'TASK / PROJECT', 'CLIENT / COMPANY Dropdown', 'START DATE & DUE DATE', 'PRIORITY (Low/Med/High)', 'STATUS (In Progress/Done)', 'DELEGATE (Team Member)', 'NOTES / DESCRIPTION']
    },
    {
      id: 'calendar',
      sheetTabName: "🗓️ Calendar",
      label: 'Smart Operations Calendar',
      numberPill: 'OPERATIONS / SCHEDULE',
      icon: CalendarIcon,
      title: '🗓️ Smart Operations Calendar',
      tagline: 'Your entire month mapped out automatically — with zero manual double-entry.',
      desc: 'A smart monthly grid that auto-populates directly from your invoices, tasks, and client renewal dates. Change the month and year dropdown to instantly review upcoming workload.',
      views: [
        { label: 'Monthly Operations Grid', src: '/Images/calender-insight.webp', caption: 'Visual calendar showing daily tasks, deadlines & payment due dates' },
        { label: 'Appointments Inspector', src: '/Images/calender-deadline.webp', caption: 'Dedicated schedule list for client calls & deliverables' }
      ],
      badge: '100% Formula-Driven Calendar Grid',
      timeSaved: 'Zero duplicate scheduling',
      bullets: [
        { label: "Dynamic Month/Year Dropdown", text: "Pick any month or year — calendar layout recalculates in real-time." },
        { label: "Auto-Synced Bills & Deadlines", text: "Invoice payment due dates and task milestones sync onto days automatically." },
        { label: "Today Marker & Appointments", text: "Current day highlighted with dedicated rows for calls, meetings, and shoots." }
      ],
      keyFeatures: [
        { title: 'Dynamic Month & Year Dropdowns', desc: 'Select any month (January to December) or year: the calendar grid automatically recalculates day layouts and weekends.' },
        { title: 'Auto-Synced Invoices & Deadlines', desc: 'You don\'t manually type into the calendar — invoice due dates and project milestones automatically sync onto their scheduled days.' },
        { title: 'Custom Appointments Section', desc: 'Dedicated rows to quickly add custom client coaching calls, photography shoots, or strategy workshops.' },
        { title: 'High-Visibility Weekend & Today Marker', desc: 'Current day is visually highlighted so you always know exactly where you are in the monthly cycle.' }
      ],
      columnsTracked: ['Dynamic Month & Year Dropdown', 'Don\'t Show Tasks Filter', '31-Day Interactive Calendar Grid', 'Other Entries & Appointments with Checkboxes (☑️)']
    }
  ];

  // Testimonials (Real Social Proof for Indian Market)
  const testimonials = [
    {
      name: "Aditya Verma",
      role: "Performance Marketing Agency Founder",
      location: "Delhi NCR",
      rating: 5,
      review: "We were burning ₹4,500 every single month on ClickUp and QuickBooks for our 6-person team. Half the team didn't even update ClickUp because it was too complicated. We shifted all client retainers and invoicing to Sheetly in one afternoon. Already saved ₹50k+ in software fees this year alone.",
      saved: "Saved ₹54,000/year"
    },
    {
      name: "Pooja Nambiar",
      role: "Freelance UI/UX Designer & Consultant",
      location: "Bengaluru",
      rating: 5,
      review: "The 1-click GST invoice generator alone is worth 10x the price. I used to hate tax season and always sent messy Excel screenshots to clients. Now I send branded, auto-numbered PDF invoices in 60 seconds. My clients take me way more seriously.",
      saved: "Saved 6 hours/week"
    },
    {
      name: "Kunal Shah",
      role: "Interior Design & Architecture Studio",
      location: "Mumbai",
      rating: 5,
      review: "Managing vendor advances, client payment milestones, and site deadlines across 8 ongoing renovations was pure chaos on WhatsApp. Sheetly's custom period view and cashflow dashboard brought 100% clarity. My CA was shocked at how clean my numbers were this quarter.",
      saved: "Zero Tax Filing Stress"
    }
  ];

  // FAQs List (In Professional English)
  const faqs = [
    {
      q: "Do I need any paid software or Microsoft Office to use Sheetly?",
      a: "No! Sheetly is built 100% natively on Google Sheets (India Edition), which is completely free forever. You never need to pay for Microsoft Office or Excel licenses. It syncs in real-time across your laptop, Mac, Windows PC, Android, and iPhone. (You can also export it to Excel anytime via File > Download > Microsoft Excel if needed)."
    },
    {
      q: "I am not a spreadsheet or formulas expert. Can I still use this?",
      a: "Absolutely! Sheetly is 100% plug-and-play. All formulas, lookups, GST calculations, and automated linkages are pre-configured behind the scenes. You simply type in your data or pick from dropdowns. A step-by-step 5-minute video setup guide is also included."
    },
    {
      q: "Is this a monthly subscription or a one-time payment?",
      a: "This is a one-time payment of just ₹899. No recurring monthly fees, no hidden charges. You get lifetime access and all future updates completely free."
    },
    {
      q: "How do I receive the product after payment?",
      a: "Immediately after completing payment (and within 1 to 5 minutes via email), you will receive on-screen access and an email containing your Google Sheets 1-Click Copy Link (India GST Edition), complete Video Setup Walkthrough, and your 3 Free Fast-Action Bonuses. You make a private copy into your personal Google Drive in 1 click and you're ready to go!"
    },
    {
      q: "Can I customize the templates with my own company logo and colors?",
      a: "Yes! Every single tab, invoice layout, and table is 100% customizable. You can add your brand logo, adjust colors, modify categories, and set your own tax rates."
    },
    {
      q: "What is your refund policy?",
      a: "Because Sheetly 2.0 and its bonuses are instant, non-revocable digital Google Sheets templates copied permanently into your Google Drive, we do not offer change-of-mind refunds once accessed. You are protected by our 7-Day Working-System Guarantee: if you experience accidental duplicate billing or a verifiable technical/formula defect in the unmodified master sheet within 7 calendar days of purchase that our team (birzcrown@gmail.com / WhatsApp) cannot resolve within 48 business hours of receiving your screenshot/video report, you receive a 100% full refund."
    }
  ];

  // Helper variables for theme styles
  const isDark = theme === 'dark';
  const cardClass = isDark ? 'dark-glass' : 'light-glass';
  const textPrimary = isDark ? 'text-white' : 'text-slate-900';
  const textSecondary = isDark ? 'text-slate-300' : 'text-slate-600';
  const textMuted = isDark ? 'text-slate-400' : 'text-slate-500';
  const borderSubtle = isDark ? 'border-slate-800' : 'border-slate-200';
  const bgSectionAlt = isDark ? 'bg-slate-950/60' : 'bg-slate-100/70';

  const coreModules = previewTabs.slice(0, 4);
  const operationsModules = previewTabs.slice(4, 7);

  const quickJumpPills = [
    { id: 'dashboard', label: '🎛️ Executive ₹ Dashboard', isAccordion: false },
    { id: 'invoicing', label: '🧾 60-Sec GST Invoicing', isAccordion: false },
    { id: 'gst-hub', label: '🧮 GST & CA Hub', isAccordion: false },
    { id: 'finances', label: '💰 Cashflow & P&L', isAccordion: false },
    { id: 'crm', label: '🤝 Client CRM', isAccordion: true },
    { id: 'tasks', label: '☑️ Tasks & Projects', isAccordion: true },
    { id: 'calendar', label: '🗓️ Smart Calendar', isAccordion: true },
  ];

  const handleQuickJump = (pillId, isAccordion) => {
    if (isAccordion) {
      setOpenAccordion(pillId);
    }
    setTimeout(() => {
      const el = document.getElementById(`module-${pillId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  return (
    <div className={`${theme} min-h-screen theme-transition font-sans relative overflow-x-hidden ${
      isDark ? 'bg-[#070b14] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      
      {/* ========================================================
          IMAGE ZOOM MODAL (When visitor clicks to inspect screenshot)
      ======================================================== */}
      {zoomImage && (
        <div 
          onClick={() => setZoomImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 cursor-zoom-out animate-fadeIn"
        >
          <div className="relative max-w-5xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
            <div className="p-3 bg-slate-950 flex items-center justify-between text-white text-xs border-b border-slate-800">
              <span className="font-semibold">{zoomImage.caption}</span>
              <button 
                onClick={() => setZoomImage(null)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <img 
              src={zoomImage.src} 
              alt={zoomImage.caption} 
              className="w-full h-auto max-h-[82vh] object-contain bg-slate-950" 
            />
          </div>
        </div>
      )}

      {/* ========================================================
          FLOATING AI CHATBOT (Full Sheetly Knowledge & Instant Answers)
      ======================================================== */}
      <SheetlyAiChatbot
        config={CONFIG}
        isDark={isDark}
        textPrimary={textPrimary}
        textSecondary={textSecondary}
        textMuted={textMuted}
        borderSubtle={borderSubtle}
        cardClass={cardClass}
      />

      {/* ========================================================
          1. TOP URGENCY ANNOUNCEMENT BAR (COMPACT & 1-LINE)
      ======================================================== */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white text-[11px] sm:text-xs font-semibold px-3 text-center sticky top-0 z-50 shadow-sm h-8 sm:h-9 flex items-center justify-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-1.5 sm:gap-2.5 whitespace-nowrap overflow-hidden">
          <span className="hidden xs:inline-flex items-center gap-1 bg-black/25 px-2 py-0.5 rounded-full text-emerald-100 text-[10px] uppercase tracking-wide flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            Special Deal
          </span>
          <span className="truncate">Save 82% Today (₹4,999 → ₹899) • 3 Free Bonuses Included</span>
          <span className="bg-black/30 px-2 py-0.5 rounded font-mono text-emerald-200 text-[11px] flex-shrink-0">
            {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* ========================================================
          2. NAVBAR WITH THEME TOGGLE (100% RESPONSIVE NO-WRAP)
      ======================================================== */}
      <nav className={`border-b ${borderSubtle} sticky top-8 sm:top-9 z-40 transition-all ${
        isDark ? 'bg-[#070b14]/90' : 'bg-[#f8fafc]/90'
      } backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
          
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 flex-shrink-0">
              <FileSpreadsheet className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className={`text-base sm:text-xl font-black tracking-tight ${textPrimary}`}>
                {CONFIG.productName}
              </span>
              <span className="text-[9px] sm:text-xs font-bold px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 whitespace-nowrap flex-shrink-0">
                2.0 OS
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className={`hidden md:flex items-center gap-6 lg:gap-7 text-sm font-semibold ${textSecondary}`}>
            <a href="#what-is-it" className="hover:text-emerald-500 transition-colors">What is it?</a>
            <a href="#comparison" className="hover:text-emerald-500 transition-colors">Why Buy?</a>
            <a href="#preview" className="text-emerald-500 font-bold flex items-center gap-1">
              <span>Live Tour</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </a>
            <a href="#features" className="hover:text-emerald-500 transition-colors">19 Tabs</a>
            <a href="#calculator" className="hover:text-emerald-500 transition-colors">Savings Calc</a>
            <a href="#bonuses" className="hover:text-emerald-500 transition-colors">Bonuses</a>
            <a href="#faqs" className="hover:text-emerald-500 transition-colors">FAQs</a>
          </div>

          {/* Right Action: Theme Switcher & Buy CTA */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            
            {/* Light / Dark Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
              className={`w-8 h-8 sm:w-auto sm:h-auto p-1.5 sm:p-2 rounded-xl border ${borderSubtle} ${
                isDark ? 'bg-slate-900 text-amber-300 hover:bg-slate-800' : 'bg-white text-slate-700 hover:bg-slate-100 shadow-sm'
              } transition-all duration-200 flex items-center justify-center gap-1.5 text-xs font-medium flex-shrink-0`}
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-700 flex-shrink-0" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </button>

            {/* Navbar CTA (Compact on mobile, full on desktop - NEVER WRAPS) */}
            <a
              href={CONFIG.checkoutUrl}
              onClick={(e) => handleCheckoutClick(e, 'Navbar')}
              className="relative group overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xs sm:text-sm px-2.5 sm:px-5 py-1.5 sm:py-2.5 rounded-xl shadow-lg shadow-emerald-500/25 transition-all duration-200 flex items-center gap-1 whitespace-nowrap flex-shrink-0"
            >
              <span className="hidden sm:inline">Get Access • {CONFIG.price}</span>
              <span className="sm:hidden font-extrabold">Get {CONFIG.price}</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </a>
          </div>
        </div>
      </nav>

      {/* ========================================================
          3. HERO SECTION
      ======================================================== */}
      <section className="relative pt-6 pb-12 sm:pt-12 sm:pb-20 md:pt-16 md:pb-28 overflow-hidden">
        {/* Glow Effects */}
        <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] rounded-full blur-[140px] pointer-events-none ${
          isDark ? 'bg-emerald-500/15' : 'bg-emerald-400/20'
        }`}></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Eyebrow Badge (No truncation, tight mobile fit) */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-[11px] sm:text-xs md:text-sm font-bold mb-3.5 sm:mb-5 shadow-sm max-w-full">
            <Sparkles className="w-3.5 h-3.5 flex-shrink-0 text-emerald-500" />
            <span className="leading-tight">Built for Indian Agencies, Freelancers & Businesses</span>
          </div>

          {/* Main Headline */}
          <h1 className={`text-[23px] sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight ${textPrimary} max-w-5xl mx-auto leading-[1.2] mb-3.5 sm:mb-5`}>
            Stop Paying ₹5,000/Month on 5 Tools.{' '}
            <span className="gradient-text">Run Your Entire Business In One Spreadsheet.</span>
          </h1>

          {/* Subtitle */}
          <p className={`text-xs sm:text-base md:text-lg ${textSecondary} max-w-3xl mx-auto leading-relaxed mb-5 sm:mb-7`}>
            Replace Notion, ClickUp & QuickBooks. Track clients, auto-generate GST invoices, manage project deadlines, and monitor your cashflow in real-time. <strong className={`${textPrimary} font-bold`}>One-time {CONFIG.price}. Zero monthly subscriptions.</strong>
          </p>

          {/* Main Hero CTA (Placed above pills so it's 100% above-the-fold on mobile) */}
          <div className="flex flex-col items-center justify-center gap-3 max-w-md mx-auto mb-5 sm:mb-7">
            <a
              href={CONFIG.checkoutUrl}
              onClick={(e) => handleCheckoutClick(e, 'Hero Section')}
              className="w-full relative group overflow-hidden bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-base sm:text-xl px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl shadow-2xl shadow-emerald-500/35 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 border border-emerald-400/30"
            >
              <span>Get Instant Access for {CONFIG.price}</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1.5 transition-transform" />
            </a>

            <div className={`flex items-center justify-center gap-2.5 sm:gap-4 text-[10px] sm:text-xs ${textMuted} flex-wrap`}>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> 100% Secure UPI / Cards
              </span>
              <span className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-500" /> Instant Download
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> 7-Day System Guarantee
              </span>
            </div>

            <a
              href={`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent("Hi! I have a question about Sheetly 2.0 before purchasing.")}`}
              onClick={() => trackWhatsAppClick('Hero Section')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors pt-0.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Have a question? Chat with us on WhatsApp</span>
            </a>
          </div>

          {/* Feature Highlights Pills (Clean 2x2 symmetric grid on mobile, flex row on desktop) */}
          <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto sm:max-w-none sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-3 mb-6 sm:mb-10 text-[11px] sm:text-xs font-semibold">
            <span className={`flex items-center justify-center gap-1.5 ${cardClass} px-2 py-1.5 rounded-lg sm:rounded-xl border ${borderSubtle} whitespace-nowrap`}>
              <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500 flex-shrink-0" /> 10-Minute Setup
            </span>
            <span className={`flex items-center justify-center gap-1.5 ${cardClass} px-2 py-1.5 rounded-lg sm:rounded-xl border ${borderSubtle} whitespace-nowrap`}>
              <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500 flex-shrink-0" /> GST Auto-Calculated
            </span>
            <span className={`flex items-center justify-center gap-1.5 ${cardClass} px-2 py-1.5 rounded-lg sm:rounded-xl border ${borderSubtle} whitespace-nowrap`}>
              <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500 flex-shrink-0" /> Cloud Google Sheets
            </span>
            <span className={`flex items-center justify-center gap-1.5 ${cardClass} px-2 py-1.5 rounded-lg sm:rounded-xl border ${borderSubtle} whitespace-nowrap`}>
              <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500 flex-shrink-0" /> Lifetime Updates
            </span>
          </div>

          {/* Hero Visual Mockup */}
          <div className="relative mx-auto max-w-5xl mt-2">
            <div className={`rounded-2xl sm:rounded-3xl p-1.5 sm:p-3 border ${borderSubtle} ${cardClass} shadow-2xl`}>
              <div className={`relative rounded-xl sm:rounded-2xl overflow-hidden border ${borderSubtle} ${isDark ? 'bg-[#0d131f]' : 'bg-slate-100'}`}>
                {/* Browser bar */}
                <div className={`h-8 sm:h-9 ${isDark ? 'bg-slate-900' : 'bg-slate-200'} px-3 sm:px-4 flex items-center justify-between border-b ${borderSubtle}`}>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500/80"></div>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/80"></div>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80"></div>
                  </div>
                  <div className={`text-[11px] sm:text-xs ${textMuted} font-mono px-2 sm:px-3 py-0.5 sm:py-1 rounded-md ${isDark ? 'bg-black/30' : 'bg-white/70'}`}>
                    sheetly-master-business-os (Google Sheets India Edition)
                  </div>
                  <div className="w-8"></div>
                </div>

                {/* Dashboard Image */}
                <img
                  src="/Images/hero-images.webp"
                  alt="Sheetly Business Spreadsheet OS Preview"
                  className="w-full h-auto object-cover"
                  fetchPriority="high"
                  loading="eager"
                  width="941"
                  height="1672"
                />
              </div>
            </div>

            {/* Floating Trust Pills on Visual */}
            <div className={`hidden sm:flex items-center gap-3 absolute -bottom-5 left-1/2 -translate-x-1/2 ${cardClass} px-6 py-2.5 rounded-full shadow-2xl backdrop-blur-md border ${borderSubtle}`}>
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-bold text-white border-2 border-slate-900">AV</div>
                <div className="w-7 h-7 rounded-full bg-teal-500 flex items-center justify-center text-xs font-bold text-white border-2 border-slate-900">PN</div>
                <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white border-2 border-slate-900">KS</div>
              </div>
              <div className="text-xs text-left">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                  <span className={`font-bold ${textPrimary} ml-1`}>4.9/5</span>
                </div>
                <span className={textMuted}>Trusted by 350+ Indian business owners</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          4. "WHAT EXACTLY IS SHEETLY?" (INSTANT VALUE CLARITY)
      ======================================================== */}
      <section id="what-is-it" className={`py-14 sm:py-16 ${bgSectionAlt} border-y ${borderSubtle} relative`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/25">
              Zero Confusion Guarantee
            </span>
            <h2 className={`text-2xl sm:text-4xl font-black ${textPrimary} mt-3 mb-2`}>
              What Exactly Is Sheetly?
            </h2>
            <p className={`text-sm sm:text-base ${textSecondary}`}>
              Understand what you get and how it transforms your workflow in under 60 seconds:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            
            <div className={`${cardClass} p-6 sm:p-7 rounded-2xl`}>
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4 font-bold text-lg">
                1
              </div>
              <h3 className={`text-lg font-bold ${textPrimary} mb-2`}>Pre-Built Business ERP</h3>
              <p className={`text-sm ${textSecondary} leading-relaxed`}>
                This is not a generic blank sheet. It is an interconnected <strong className={textPrimary}>19-tab operating system</strong> linking your CRM, GST invoicing, client projects, and cashflow into one command center.
              </p>
            </div>

            <div className={`${cardClass} p-6 sm:p-7 rounded-2xl`}>
              <div className="w-11 h-11 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center mb-4 font-bold text-lg">
                2
              </div>
              <h3 className={`text-lg font-bold ${textPrimary} mb-2`}>100% Plug-and-Play</h3>
              <p className={`text-sm ${textSecondary} leading-relaxed`}>
                Zero formula knowledge or coding required. Every calculation is automated behind the scenes. Just enter your client data and watch your business dashboards update live.
              </p>
            </div>

            <div className={`${cardClass} p-6 sm:p-7 rounded-2xl`}>
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4 font-bold text-lg">
                3
              </div>
              <h3 className={`text-lg font-bold ${textPrimary} mb-2`}>Pay Once, Own Forever</h3>
              <p className={`text-sm ${textSecondary} leading-relaxed`}>
                No monthly credit card deductions of ₹3,000–₹5,000 like bloated SaaS software. <strong className={textPrimary}>Pay just ₹899 once</strong> and enjoy unlimited, lifetime access forever.
              </p>
            </div>

          </div>

          {/* Quick 3-Step Walkthrough */}
          <div className={`mt-8 sm:mt-10 ${cardClass} rounded-2xl p-5 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6`}>
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/25">
                <Laptop className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h4 className={`text-sm sm:text-base font-bold ${textPrimary}`}>How to use Sheetly in 3 Simple Steps:</h4>
                <p className={`text-xs sm:text-sm ${textSecondary}`}>
                  1. Instant Access via Email ➔ 2. Add Your Logo & Rates in 5 Mins ➔ 3. Run Invoices & CRM on Autopilot!
                </p>
              </div>
            </div>

            <a
              href={CONFIG.checkoutUrl}
              onClick={(e) => handleCheckoutClick(e, '3-Step Walkthrough')}
              className="w-full md:w-auto flex-shrink-0 text-center text-xs sm:text-sm font-bold bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              <span>Claim for {CONFIG.price}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>

      {/* ========================================================
          5. THE OLD WAY VS THE SHEETLY WAY (COMPARISON TABLE)
      ======================================================== */}
      <section id="comparison" className="py-16 sm:py-20 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/25">
              Why You Need This
            </span>
            <h2 className={`text-2xl sm:text-4xl md:text-5xl font-black ${textPrimary} mt-3 mb-3`}>
              Without Sheetly vs With Sheetly
            </h2>
            <p className={`text-sm sm:text-base ${textSecondary}`}>
              See how switching to Sheetly saves you 15+ hours weekly and eliminates subscription fatigue:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
            
            {/* The Old Way (Pain) */}
            <div className={`rounded-3xl p-6 sm:p-8 border border-rose-500/30 ${
              isDark ? 'bg-rose-950/15' : 'bg-rose-50/70'
            }`}>
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-rose-500/20 text-rose-500 flex items-center justify-center font-bold">
                  <X className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
                </div>
                <div>
                  <h3 className={`text-lg sm:text-xl font-bold ${textPrimary}`}>The Old Way (Chaos)</h3>
                  <div className="text-xs text-rose-500 font-semibold">Expensive, Stressful & Scattered</div>
                </div>
              </div>

              <div className="space-y-3.5 sm:space-y-4 text-xs sm:text-sm">
                {[
                  "Wasting ₹3,000–₹5,000 every single month on bloated software subscriptions (₹60,000+/year).",
                  "Constantly app-switching across 5+ disconnected tools: Notion, WhatsApp, Excel, Gmail, and Calendly.",
                  "Manual invoice math and GST calculations prone to costly human errors and tax calculation mistakes.",
                  "Sending raw WhatsApp texts or messy screenshots that damage your premium brand perception.",
                  "Zero visibility into cashflow — never knowing which client invoice is 15+ days overdue.",
                  "Quarterly tax season panic: 3 sleepless nights digging through email threads to find missing receipts."
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <X className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span className={textSecondary}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* The Sheetly Way (Pleasure) */}
            <div className={`rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/50 ${
              isDark ? 'bg-emerald-950/25' : 'bg-emerald-50/70'
            } shadow-xl relative`}>
              <div className="absolute -top-3 right-5 sm:right-6 bg-emerald-500 text-white text-[10px] sm:text-[11px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md">
                Recommended Choice
              </div>

              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold shadow-lg shadow-emerald-500/30">
                  <Check className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
                </div>
                <div>
                  <h3 className={`text-lg sm:text-xl font-bold ${textPrimary}`}>The Sheetly Way (Peace)</h3>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Fast, Organized & Profitable</div>
                </div>
              </div>

              <div className="space-y-3.5 sm:space-y-4 text-xs sm:text-sm">
                {[
                  "One-time ₹899 payment for lifetime access — zero monthly subscription fees ever.",
                  "Your complete business command center in one cloud-synced Google Sheets spreadsheet (India GST Edition).",
                  "Auto-calculated 18% GST — generate compliant, branded PDF invoices with tax breakdown in 1 click.",
                  "Send sleek, numbered, professional invoices that command respect and prompt payments.",
                  "Real-time visual dashboard with color-coded alerts showing who has paid and what is overdue.",
                  "Stress-free tax filing: generate complete quarterly and annual revenue reports in seconds."
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className={`${textPrimary} font-medium`}>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 sm:mt-8 pt-4 border-t border-emerald-500/20">
                <a
                  href={CONFIG.checkoutUrl}
                  onClick={(e) => handleCheckoutClick(e, 'Comparison Card')}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all text-xs sm:text-sm"
                >
                  <span>Switch to Sheetly for {CONFIG.price}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          6. STATS & AUTHORITY TICKER
      ======================================================== */}
      <section className={`border-y ${borderSubtle} ${bgSectionAlt} py-8 sm:py-10 relative`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div className="p-2 sm:p-4">
              <div className="text-2xl sm:text-4xl font-black text-emerald-500 mb-1">₹60,000+</div>
              <div className={`text-[11px] sm:text-sm ${textMuted} font-semibold`}>Avg Annual Software Cost Saved</div>
            </div>
            <div className="p-2 sm:p-4">
              <div className={`text-2xl sm:text-4xl font-black ${textPrimary} mb-1`}>19 Tabs</div>
              <div className={`text-[11px] sm:text-sm ${textMuted} font-semibold`}>Pre-Linked Operations Engine</div>
            </div>
            <div className="p-2 sm:p-4">
              <div className="text-2xl sm:text-4xl font-black text-teal-500 mb-1">10 Minutes</div>
              <div className={`text-[11px] sm:text-sm ${textMuted} font-semibold`}>Zero Learning Curve Setup</div>
            </div>
            <div className="p-2 sm:p-4">
              <div className="text-2xl sm:text-4xl font-black text-amber-500 mb-1">100% Tax Ready</div>
              <div className={`text-[11px] sm:text-sm ${textMuted} font-semibold`}>GST Auto-Calculated Every Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. MOBILE-FIRST 30-SECOND VISUAL TOUR (CRO REDESIGN)
      ======================================================== */}
      <section id="preview" className="py-16 sm:py-24 md:py-28 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-wider bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/25">
              ⚡ 30-SECOND VISUAL TOUR
            </span>
            <h2 className={`text-2xl sm:text-4xl md:text-5xl font-black ${textPrimary} mt-3 mb-3 tracking-tight`}>
              Inside Sheetly 2.0: See What Runs Your Business
            </h2>
            <p className={`text-xs sm:text-base ${textSecondary} max-w-2xl mx-auto leading-relaxed`}>
              No complex software to learn. Scroll down to see your core automated sheets (tap any screenshot to zoom full-screen):
            </p>
          </div>

          {/* Compact 2-Row Wrapped Quick-Jump Pill Grid (NO horizontal scrolling!) */}
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-10 sm:mb-14 max-w-4xl mx-auto px-2">
            {quickJumpPills.map((pill) => (
              <button
                key={pill.id}
                type="button"
                onClick={() => handleQuickJump(pill.id, pill.isAccordion)}
                className={`text-xs font-bold px-3 py-1.5 sm:py-2 rounded-xl border transition-all flex items-center gap-1.5 shadow-sm hover:scale-[1.02] active:scale-[0.98] ${
                  cardClass
                } ${textSecondary} hover:${textPrimary} hover:border-emerald-500`}
              >
                <span>{pill.label}</span>
                <ChevronDown className="w-3 h-3 text-emerald-500" />
              </button>
            ))}
          </div>

          {/* Top 4 "Money-Maker" Modules — Vertical Stack on Mobile, Alternating 2-Col on Desktop */}
          <div className="space-y-8 sm:space-y-12">
            {coreModules.map((module, idx) => {
              const isEven = idx % 2 === 0;
              const currentSubViewIdx = getSubView(module.id);
              const activeImg = module.views[currentSubViewIdx] || module.views[0];
              const isExpanded = !!expandedCards[module.id];

              return (
                <div
                  key={module.id}
                  id={`module-${module.id}`}
                  className={`${cardClass} rounded-2xl sm:rounded-3xl p-5 sm:p-8 border ${borderSubtle} shadow-xl scroll-mt-24`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                    
                    {/* SCREENSHOT COMES FIRST ON MOBILE (order-1 on mobile, alternating on lg:) */}
                    <div className={`order-1 ${isEven ? 'lg:order-2 lg:col-span-7' : 'lg:order-1 lg:col-span-7'} space-y-3`}>
                      {/* Browser Frame */}
                      <div className={`rounded-xl sm:rounded-2xl overflow-hidden border ${borderSubtle} ${isDark ? 'bg-slate-900' : 'bg-slate-100'} shadow-lg group`}>
                        {/* Frame Header Bar */}
                        <div className={`h-8 px-3 flex items-center justify-between border-b ${borderSubtle} ${isDark ? 'bg-slate-950/90' : 'bg-slate-200/90'}`}>
                          <div className="flex items-center gap-1.5 min-w-0">
                            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80 flex-shrink-0" />
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80 flex-shrink-0" />
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 flex-shrink-0" />
                            <span className={`text-[10px] sm:text-[11px] font-mono ${textMuted} ml-2 truncate`}>
                              {activeImg.caption}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setZoomImage(activeImg)}
                            className="text-[11px] text-emerald-500 hover:text-emerald-400 flex items-center gap-1 font-semibold flex-shrink-0 bg-emerald-500/10 hover:bg-emerald-500/20 px-2 py-0.5 rounded transition-colors"
                            title="Click to view full size"
                          >
                            <Maximize2 className="w-3 h-3" />
                            <span>Tap to Zoom</span>
                          </button>
                        </div>

                        {/* Image Preview (Zoom on click) */}
                        <div
                          onClick={() => setZoomImage(activeImg)}
                          className="cursor-zoom-in relative overflow-hidden bg-slate-950/20"
                        >
                          <img
                            src={activeImg.src}
                            alt={activeImg.caption}
                            loading="lazy"
                            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                          />
                        </div>
                      </div>

                      {/* Angle Switcher Pills (Directly below image, compact 2-col on mobile) */}
                      {module.views.length > 1 && (
                        <div className="pt-0.5">
                          <div className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider ${textMuted} mb-1.5 flex items-center justify-between`}>
                            <span>Switch View / Angle ({module.views.length} views):</span>
                            <span className="text-[10px] text-emerald-500 font-medium">Tap to inspect</span>
                          </div>
                          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-1.5">
                            {module.views.map((v, idx) => {
                              const isCurrentView = currentSubViewIdx === idx;
                              return (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => setSubView(module.id, idx)}
                                  className={`text-left px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold transition-all flex items-center gap-1.5 min-w-0 ${
                                    isCurrentView
                                      ? 'border-emerald-500 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 shadow-sm'
                                      : `${borderSubtle} ${isDark ? 'bg-slate-900/60 hover:bg-slate-800' : 'bg-white hover:bg-slate-50'} ${textSecondary}`
                                  }`}
                                >
                                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isCurrentView ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                                  <span className="truncate">{idx + 1}. {v.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* ULTRA-CONCISE COPY (order-2 on mobile, alternating on lg:) */}
                    <div className={`order-2 ${isEven ? 'lg:order-1 lg:col-span-5' : 'lg:order-2 lg:col-span-5'} space-y-3.5`}>
                      {/* Module Number Pill + Time-Saved Badge */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider">
                          {module.numberPill}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                          <Clock className="w-3 h-3 text-emerald-500" />
                          {module.timeSaved}
                        </span>
                        <span className={`text-[10px] font-mono ${textMuted} bg-slate-900/30 px-2 py-0.5 rounded border ${borderSubtle}`}>
                          Tab: {module.sheetTabName}
                        </span>
                      </div>

                      {/* Title + Tagline */}
                      <div>
                        <h3 className={`text-lg sm:text-2xl font-black ${textPrimary} tracking-tight`}>
                          {module.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                          {module.tagline}
                        </p>
                      </div>

                      {/* 3 Punchy 1-Line Checkmark Bullets */}
                      <div className="space-y-2 pt-1">
                        {module.bullets.map((b, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-2">
                            <div className="mt-0.5 w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center flex-shrink-0">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                            <p className={`text-xs sm:text-sm ${textSecondary} leading-snug`}>
                              <strong className={`${textPrimary} font-bold`}>{b.label}:</strong> {b.text}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Collapsible Details & Columns */}
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => toggleCardExpand(module.id)}
                          className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 flex items-center gap-1.5 transition-colors"
                        >
                          <span>{isExpanded ? 'Hide automations & tracked columns ▴' : 'See all automations & tracked columns ▾'}</span>
                        </button>

                        {isExpanded && (
                          <div className={`mt-3.5 space-y-3.5 p-3.5 sm:p-4 rounded-xl border ${borderSubtle} ${isDark ? 'bg-slate-900/70' : 'bg-slate-50'} animate-fadeIn`}>
                            <p className={`text-xs ${textSecondary} leading-relaxed`}>
                              {module.desc}
                            </p>

                            {/* 4 Deep Automation Features */}
                            <div>
                              <div className={`text-[11px] font-bold uppercase tracking-wider ${textMuted} mb-2 flex items-center gap-1.5`}>
                                <SlidersHorizontal className="w-3 h-3 text-emerald-500" />
                                <span>Automations Built Into This Tab:</span>
                              </div>
                              <div className="space-y-2">
                                {module.keyFeatures.map((feat, fIdx) => (
                                  <div key={fIdx} className={`p-2.5 rounded-lg border ${borderSubtle} ${isDark ? 'bg-slate-950/40' : 'bg-white'}`}>
                                    <div className={`text-xs font-bold ${textPrimary} flex items-center gap-1.5 mb-0.5`}>
                                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                                      <span>{feat.title}</span>
                                    </div>
                                    <p className={`text-[11px] ${textSecondary} leading-relaxed pl-5`}>
                                      {feat.desc}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Columns Tracked */}
                            <div>
                              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1.5 flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                <span>Exact Columns & Formulas Tracked:</span>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {module.columnsTracked.map((col, cIdx) => (
                                  <span key={cIdx} className={`text-[10px] font-medium px-2 py-0.5 rounded border ${borderSubtle} ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-white text-slate-700'}`}>
                                    {col}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Quick Link */}
                      <div className="pt-1">
                        <a
                          href={CONFIG.checkoutUrl}
                          onClick={(e) => handleCheckoutClick(e, 'Product Tour Link - ' + module.title)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-500 hover:text-emerald-400 transition-colors"
                        >
                          <span>Get this sheet unlocked in Sheetly ({CONFIG.price})</span>
                          <ChevronRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Plus 3 More Operations Modules Interactive Accordion */}
          <div className="mt-14 sm:mt-20">
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-xs font-black tracking-wider uppercase">
                ➕ PLUS 3 MORE AUTOMATED SHEETS INCLUDED INSIDE YOUR ₹899 OS (TAP TO PREVIEW):
              </div>
            </div>

            <div className="space-y-3.5 max-w-5xl mx-auto">
              {operationsModules.map((mod) => {
                const isOpen = openAccordion === mod.id;
                const currentSubViewIdx = getSubView(mod.id);
                const activeImg = mod.views[currentSubViewIdx] || mod.views[0];
                const isExpanded = !!expandedCards[mod.id];

                return (
                  <div
                    key={mod.id}
                    id={`module-${mod.id}`}
                    className={`rounded-2xl border transition-all ${borderSubtle} ${cardClass} overflow-hidden shadow-md scroll-mt-24`}
                  >
                    {/* Accordion Bar Toggle */}
                    <button
                      type="button"
                      onClick={() => toggleAccordion(mod.id)}
                      className={`w-full text-left p-3.5 sm:p-5 flex items-center justify-between gap-3 transition-colors ${
                        isOpen ? (isDark ? 'bg-slate-900/90' : 'bg-slate-100/90') : 'hover:bg-emerald-500/5'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={mod.views[0].src}
                          alt={mod.title}
                          className="w-12 h-9 sm:w-14 sm:h-10 rounded-lg object-cover border border-slate-700/60 flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-sm sm:text-base font-bold ${textPrimary} truncate`}>
                              {mod.title}
                            </span>
                            <span className="hidden sm:inline-block text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                              {mod.timeSaved}
                            </span>
                          </div>
                          <p className={`text-[11px] sm:text-xs ${textSecondary} truncate mt-0.5`}>
                            {mod.tagline}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1 ${
                          isOpen
                            ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                            : `${borderSubtle} ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-white text-slate-700'}`
                        }`}>
                          <span>{isOpen ? 'Close' : 'View'}</span>
                          <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                        </span>
                      </div>
                    </button>

                    {/* Accordion Body */}
                    {isOpen && (
                      <div className={`p-4 sm:p-7 border-t ${borderSubtle} ${isDark ? 'bg-slate-950/40' : 'bg-slate-50/50'} animate-fadeIn`}>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                          {/* Screenshot Column (order-1 on mobile) */}
                          <div className="order-1 lg:order-2 lg:col-span-7 space-y-3">
                            <div className={`rounded-xl sm:rounded-2xl overflow-hidden border ${borderSubtle} ${isDark ? 'bg-slate-900' : 'bg-slate-100'} shadow-lg group`}>
                              <div className={`h-8 px-3 flex items-center justify-between border-b ${borderSubtle} ${isDark ? 'bg-slate-950/90' : 'bg-slate-200/90'}`}>
                                <div className="flex items-center gap-1.5 min-w-0">
                                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80 flex-shrink-0" />
                                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80 flex-shrink-0" />
                                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 flex-shrink-0" />
                                  <span className={`text-[10px] sm:text-[11px] font-mono ${textMuted} ml-2 truncate`}>
                                    {activeImg.caption}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setZoomImage(activeImg)}
                                  className="text-[11px] text-emerald-500 hover:text-emerald-400 flex items-center gap-1 font-semibold flex-shrink-0 bg-emerald-500/10 hover:bg-emerald-500/20 px-2 py-0.5 rounded transition-colors"
                                  title="Click to view full size"
                                >
                                  <Maximize2 className="w-3 h-3" />
                                  <span>Tap to Zoom</span>
                                </button>
                              </div>
                              <div
                                onClick={() => setZoomImage(activeImg)}
                                className="cursor-zoom-in relative overflow-hidden bg-slate-950/20"
                              >
                                <img
                                  src={activeImg.src}
                                  alt={activeImg.caption}
                                  loading="lazy"
                                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                                />
                              </div>
                            </div>

                            {/* Angle Switcher Pills */}
                            {mod.views.length > 1 && (
                              <div className="pt-0.5">
                                <div className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider ${textMuted} mb-1.5 flex items-center justify-between`}>
                                  <span>Switch View / Angle ({mod.views.length} views):</span>
                                  <span className="text-[10px] text-emerald-500 font-medium">Tap to inspect</span>
                                </div>
                                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-1.5">
                                  {mod.views.map((v, idx) => {
                                    const isCurrentView = currentSubViewIdx === idx;
                                    return (
                                      <button
                                        key={idx}
                                        type="button"
                                        onClick={() => setSubView(mod.id, idx)}
                                        className={`text-left px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold transition-all flex items-center gap-1.5 min-w-0 ${
                                          isCurrentView
                                            ? 'border-emerald-500 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 shadow-sm'
                                            : `${borderSubtle} ${isDark ? 'bg-slate-900/60 hover:bg-slate-800' : 'bg-white hover:bg-slate-50'} ${textSecondary}`
                                        }`}
                                      >
                                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isCurrentView ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                                        <span className="truncate">{idx + 1}. {v.label}</span>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Copy Column (order-2 on mobile) */}
                          <div className="order-2 lg:order-1 lg:col-span-5 space-y-3.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                                <Clock className="w-3 h-3 text-emerald-500" />
                                {mod.timeSaved}
                              </span>
                              <span className={`text-[10px] font-mono ${textMuted} bg-slate-900/30 px-2 py-0.5 rounded border ${borderSubtle}`}>
                                Tab: {mod.sheetTabName}
                              </span>
                            </div>

                            <div>
                              <h4 className={`text-base sm:text-xl font-black ${textPrimary}`}>
                                {mod.title}
                              </h4>
                              <p className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                                {mod.tagline}
                              </p>
                            </div>

                            {/* 3 Bullets */}
                            <div className="space-y-2 pt-1">
                              {mod.bullets.map((b, bIdx) => (
                                <div key={bIdx} className="flex items-start gap-2">
                                  <div className="mt-0.5 w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center flex-shrink-0">
                                    <Check className="w-3 h-3 stroke-[3]" />
                                  </div>
                                  <p className={`text-xs sm:text-sm ${textSecondary} leading-snug`}>
                                    <strong className={`${textPrimary} font-bold`}>{b.label}:</strong> {b.text}
                                  </p>
                                </div>
                              ))}
                            </div>

                            {/* Collapsible toggle */}
                            <div className="pt-1">
                              <button
                                type="button"
                                onClick={() => toggleCardExpand(mod.id)}
                                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 flex items-center gap-1.5 transition-colors"
                              >
                                <span>{isExpanded ? 'Hide automations & tracked columns ▴' : 'See all automations & tracked columns ▾'}</span>
                              </button>

                              {isExpanded && (
                                <div className={`mt-3.5 space-y-3.5 p-3.5 rounded-xl border ${borderSubtle} ${isDark ? 'bg-slate-900/70' : 'bg-slate-50'} animate-fadeIn`}>
                                  <p className={`text-xs ${textSecondary} leading-relaxed`}>
                                    {mod.desc}
                                  </p>
                                  <div>
                                    <div className={`text-[11px] font-bold uppercase tracking-wider ${textMuted} mb-2 flex items-center gap-1.5`}>
                                      <SlidersHorizontal className="w-3 h-3 text-emerald-500" />
                                      <span>Automations Built Into This Tab:</span>
                                    </div>
                                    <div className="space-y-2">
                                      {mod.keyFeatures.map((feat, fIdx) => (
                                        <div key={fIdx} className={`p-2.5 rounded-lg border ${borderSubtle} ${isDark ? 'bg-slate-950/40' : 'bg-white'}`}>
                                          <div className={`text-xs font-bold ${textPrimary} flex items-center gap-1.5 mb-0.5`}>
                                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                                            <span>{feat.title}</span>
                                          </div>
                                          <p className={`text-[11px] ${textSecondary} leading-relaxed pl-5`}>
                                            {feat.desc}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1.5 flex items-center gap-1">
                                      <Eye className="w-3 h-3" />
                                      <span>Exact Columns & Formulas Tracked:</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                      {mod.columnsTracked.map((col, cIdx) => (
                                        <span key={cIdx} className={`text-[10px] font-medium px-2 py-0.5 rounded border ${borderSubtle} ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-white text-slate-700'}`}>
                                          {col}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Quick Link */}
                            <div className="pt-1">
                              <a
                                href={CONFIG.checkoutUrl}
                                onClick={(e) => handleCheckoutClick(e, 'Product Tour Link - ' + mod.title)}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-500 hover:text-emerald-400 transition-colors"
                              >
                                <span>Get this sheet unlocked in Sheetly ({CONFIG.price})</span>
                                <ChevronRight className="w-4 h-4" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom High-Intent Micro-CTA Bar Inside #preview */}
          <div className="mt-12 sm:mt-16 max-w-4xl mx-auto">
            <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-emerald-950/30 backdrop-blur-xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                    Instant 1-Click Access
                  </span>
                  <span className="text-slate-400 text-xs font-semibold">
                    7-Day Working-System Guarantee 🛡️
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-extrabold text-white">
                  All 19 pre-linked tabs, GST Invoice Generator & CA Hub — ₹899 One-Time (Lifetime Access)
                </h4>
                <p className="text-xs text-slate-400">
                  No recurring fees. Instant Google Drive copy link sent immediately after checkout.
                </p>
              </div>

              <div className="w-full sm:w-auto flex-shrink-0">
                <a
                  href={CONFIG.checkoutUrl}
                  onClick={(e) => handleCheckoutClick(e, 'Preview Tour Bottom Micro-CTA')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>Get Sheetly 2.0 Now ({CONFIG.price})</span>
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          8. COMPLETE 19-TAB BREAKDOWN GRID
      ======================================================== */}
      <section id="features" className={`py-16 sm:py-20 ${bgSectionAlt} border-y ${borderSubtle}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/25">
              Complete Feature Suite
            </span>
            <h2 className={`text-2xl sm:text-4xl md:text-5xl font-black ${textPrimary} mt-3 mb-3`}>
              All 19 Pre-Linked Tabs In The System
            </h2>
            <p className={`text-xs sm:text-base ${textSecondary}`}>
              Every single tab is already connected through pre-engineered formulas and dropdowns:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {[
              { title: "🎛️ Master Business Dashboard", desc: "Automated executive summary of cashflow, overdue bills, and pipeline.", cat: "Core OS" },
              { title: "🤝 Client Relationship CRM", desc: "Unlimited client database with contact info, status, and contract terms.", cat: "Clients" },
              { title: "💬 Communication History Log", desc: "Keep track of every meeting note, call decision, and promised deadline.", cat: "Clients" },
              { title: "🧾 GST-Ready Invoicing Engine", desc: "Calculates standard 18% GST automatically with inclusive & exclusive tax breakdown.", cat: "Billing" },
              { title: "🖨️ 1-Click Print Invoice", desc: "Select any invoice number to generate a gorgeous, printable PDF bill.", cat: "Billing" },
              { title: "🧮 GST Summary (GSTR-1 & 3B Hub)", desc: "Auto-splits CGST/SGST & IGST, deducts Expense ITC, tracks B2B/B2C & overdue GST bills.", cat: "Tax & CA" },
              { title: "☑️ Task & Deliverable Tracker", desc: "Manage team workload, task priorities, and project milestones.", cat: "Projects" },
              { title: "🗓️ Visual Smart Calendar", desc: "Deadlines, invoice due dates, and follow-ups auto-sync onto the calendar.", cat: "Operations" },
              { title: "🟢 Income Entry Ledger", desc: "Record every payment received, payment method, and client source.", cat: "Finance" },
              { title: "🔴 Expense Management", desc: "Track operating costs, software subscriptions, team payouts, and travel.", cat: "Finance" },
              { title: "📅 Monthly Overview", desc: "Select any month to view income vs expense charts and net profit margins.", cat: "Analytics" },
              { title: "1️⃣2️⃣ 12-Month Annual Trend", desc: "Full year comparison to spot seasonal growth and revenue dips.", cat: "Analytics" },
              { title: "🧩 Custom Period View", desc: "Pick any date range to analyze custom gross profit and tax liability.", cat: "Analytics" },
              { title: "📊 Bank Reconciliation Tab", desc: "Cross-check bank statement balances against your recorded transactions.", cat: "Finance" },
              { title: "⚖️ Balance Sheet", desc: "Real-time summary of cash on hand, bank accounts, and UPI wallets.", cat: "Finance" },
              { title: "💰 Budget Planner", desc: "Set monthly revenue goals and monitor real-time achievement percentages.", cat: "Growth" },
              { title: "⚙️ Custom Setup Page", desc: "Customize 20+ income/expense categories and your company details in 1 place.", cat: "Settings" },
              { title: "💡 Instructions & Setup Guide", desc: "Step-by-step 5-minute setup instructions so you never feel lost.", cat: "Support" },
              { title: "🔒 Automated Backend Engine", desc: "Pre-sorted formulas and query engines linking all tabs seamlessly.", cat: "System" },
            ].map((feature, idx) => (
              <div key={idx} className={`${cardClass} p-5 sm:p-6 rounded-2xl`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {feature.cat}
                  </span>
                  <span className={`text-xs font-mono ${textMuted}`}>Tab #{idx + 1}</span>
                </div>
                <h4 className={`text-base sm:text-lg font-bold ${textPrimary} mb-1.5`}>{feature.title}</h4>
                <p className={`text-xs sm:text-sm ${textSecondary} leading-relaxed`}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          9. "WHAT'S IN THE BOX" (VISUAL UNBOXING STACK - HIGH CRO)
      ======================================================== */}
      <section className="py-16 sm:py-20 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/25">
              Instant Download Package
            </span>
            <h2 className={`text-2xl sm:text-4xl md:text-5xl font-black ${textPrimary} mt-3 mb-3`}>
              What You Receive In Your Email In 10 Seconds
            </h2>
            <p className={`text-xs sm:text-base ${textSecondary}`}>
              The second your payment is confirmed, you get immediate access to all 5 digital assets:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className={`${cardClass} p-5 rounded-2xl border ${borderSubtle} flex flex-col justify-between`}>
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-3">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-emerald-500 mb-1">ASSET #1</div>
                <h4 className={`text-sm font-bold ${textPrimary} mb-1.5`}>Google Sheets Master OS (India Edition)</h4>
                <p className={`text-xs ${textSecondary} leading-relaxed`}>
                  1-Click duplicate straight into your private Google Drive. 19 pre-linked tabs, 18% GST engine, and auto P&L.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-800 text-[11px] font-semibold text-emerald-500 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> 100% Free Forever
              </div>
            </div>

            <div className={`${cardClass} p-5 rounded-2xl border ${borderSubtle} flex flex-col justify-between`}>
              <div>
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center mb-3">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-teal-500 mb-1">ASSET #2</div>
                <h4 className={`text-sm font-bold ${textPrimary} mb-1.5`}>Multi-Device Cloud Access</h4>
                <p className={`text-xs ${textSecondary} leading-relaxed`}>
                  Real-time auto-sync across your Android phone, iPhone, Mac, and Windows laptop. Zero Microsoft license needed.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-800 text-[11px] font-semibold text-teal-500 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Real-Time Auto-Save
              </div>
            </div>

            <div className={`${cardClass} p-5 rounded-2xl border ${borderSubtle} flex flex-col justify-between`}>
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-3">
                  <PlayCircle className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-blue-500 mb-1">ASSET #3</div>
                <h4 className={`text-sm font-bold ${textPrimary} mb-1.5`}>Video Setup Masterclass</h4>
                <p className={`text-xs ${textSecondary} leading-relaxed`}>
                  5-minute screen-by-screen walkthrough explaining how to customize your logo, GST, and categories.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-800 text-[11px] font-semibold text-blue-500 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Zero Learning Curve
              </div>
            </div>

            <div className={`${cardClass} p-5 rounded-2xl border border-amber-500/30 flex flex-col justify-between`}>
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-3">
                  <Gift className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-amber-500 mb-1">ASSETS #4, #5 & #6</div>
                <h4 className={`text-sm font-bold ${textPrimary} mb-1.5`}>3 Fast-Action Bonuses</h4>
                <p className={`text-xs ${textSecondary} leading-relaxed`}>
                  Service Pricing Calculator + WhatsApp Invoicing Automation Pack + Lifetime Free Updates Forever.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-800 text-[11px] font-semibold text-amber-500 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> ₹9,497 Value Free
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          10. REAL CUSTOMER REVIEWS (AUTHENTIC SOCIAL PROOF)
      ======================================================== */}
      <section className={`py-16 sm:py-20 ${bgSectionAlt} border-y ${borderSubtle}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/25">
              Verified Social Proof
            </span>
            <h2 className={`text-2xl sm:text-4xl md:text-5xl font-black ${textPrimary} mt-3 mb-3`}>
              Trusted by 350+ Indian Agency Owners & Freelancers
            </h2>
            <p className={`text-xs sm:text-base ${textSecondary}`}>
              Read how real business owners transitioned from subscription chaos to Sheetly:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className={`${cardClass} p-6 sm:p-7 rounded-2xl border ${borderSubtle} flex flex-col justify-between`}>
                <div>
                  {/* Rating Stars & Saved Pill */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-500 border border-emerald-500/20">
                      {t.saved}
                    </span>
                  </div>

                  <p className={`text-xs sm:text-sm ${textSecondary} leading-relaxed italic mb-6`}>
                    "{t.review}"
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-800 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 text-white font-bold flex items-center justify-center text-sm flex-shrink-0">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className={`text-sm font-bold ${textPrimary}`}>{t.name}</div>
                    <div className={`text-[11px] ${textMuted}`}>{t.role} • {t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================
          11. INTERACTIVE SAVINGS CALCULATOR
      ======================================================== */}
      <section id="calculator" className="py-16 sm:py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`${cardClass} rounded-3xl p-5 sm:p-10 border border-emerald-500/20 shadow-2xl relative overflow-hidden`}>
            
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                Subscription Reality Check
              </span>
              <h2 className={`text-2xl sm:text-4xl font-black ${textPrimary} mt-3 mb-2`}>
                Calculate How Much You Waste Every Year
              </h2>
              <p className={`${textSecondary} text-xs sm:text-base`}>
                Select the tools you or your team are currently paying for:
              </p>
            </div>

            {/* Checkbox grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-8">
              {[
                { id: 'notion', name: 'Notion Team', cost: 800, desc: 'Project notes & tasks' },
                { id: 'clickup', name: 'ClickUp / Asana', cost: 1200, desc: 'Team task tracker' },
                { id: 'quickbooks', name: 'QuickBooks / Invoicing', cost: 1500, desc: 'GST bills & accounting' },
                { id: 'calendly', name: 'Calendly / Booking Tool', cost: 750, desc: 'Client appointments' },
                { id: 'airtable', name: 'Airtable Pro', cost: 1600, desc: 'Client database CRM' },
              ].map((tool) => (
                <label
                  key={tool.id}
                  onClick={() => setTools(prev => ({ ...prev, [tool.id]: !prev[tool.id] }))}
                  className={`flex items-center justify-between p-3.5 sm:p-4 rounded-xl border cursor-pointer transition-all ${
                    tools[tool.id]
                      ? isDark ? 'bg-emerald-950/30 border-emerald-500/50 text-white' : 'bg-emerald-50 border-emerald-500/60 text-slate-900'
                      : isDark ? 'bg-slate-900/40 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                      tools[tool.id] ? 'bg-emerald-500 border-emerald-500 text-white' : borderSubtle
                    }`}>
                      {tools[tool.id] && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <div>
                      <div className="font-bold text-xs sm:text-sm">{tool.name}</div>
                      <div className={`text-[11px] ${textMuted}`}>{tool.desc}</div>
                    </div>
                  </div>
                  <div className={`text-xs sm:text-sm font-bold ${textPrimary}`}>
                    ₹{tool.cost}<span className={`text-[10px] ${textMuted} font-normal`}>/mo</span>
                  </div>
                </label>
              ))}
            </div>

            {/* Total Comparison Box */}
            <div className={`${isDark ? 'bg-slate-900/90' : 'bg-slate-50'} p-5 sm:p-6 rounded-2xl border ${borderSubtle} flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 text-center sm:text-left`}>
              <div>
                <div className={`text-xs font-semibold ${textMuted} uppercase tracking-wider mb-1`}>
                  Your Current Annual Software Bill:
                </div>
                <div className="text-2xl sm:text-4xl font-black text-rose-500 line-through">
                  ₹{annualSavings.toLocaleString('en-IN')}/year
                </div>
                <div className={`text-[11px] sm:text-xs ${textMuted} mt-1`}>
                  (Plus price hikes and GST every 12 months)
                </div>
              </div>

              <div className={`h-12 w-px ${borderSubtle} hidden sm:block`}></div>

              <div>
                <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
                  With Sheetly (Lifetime Access):
                </div>
                <div className="text-2xl sm:text-4xl font-black text-emerald-500">
                  Just {CONFIG.price} <span className={`text-xs font-normal ${textMuted}`}>once</span>
                </div>
                <div className="text-xs text-emerald-600 dark:text-emerald-300 font-bold mt-1">
                  You Save ₹{(annualSavings - 899).toLocaleString('en-IN')} in Year 1 alone!
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          12. BONUSES STACK
      ======================================================== */}
      <section id="bonuses" className="py-16 sm:py-20 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-amber-500 text-xs font-bold uppercase tracking-wider bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/25">
              Free Fast-Action Bonuses
            </span>
            <h2 className={`text-2xl sm:text-4xl md:text-5xl font-black ${textPrimary} mt-3 mb-3`}>
              Get {CONFIG.totalValue} In Total Value Today
            </h2>
            <p className={`text-xs sm:text-base ${textSecondary}`}>
              When you purchase Sheetly today, you also unlock these 3 Free Bonuses for 100% free:
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            
            {/* Bonus 1 */}
            <div className={`${cardClass} rounded-2xl p-5 sm:p-8 border border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6`}>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center flex-shrink-0">
                  <Gift className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <div className="inline-block bg-amber-500/20 text-amber-600 dark:text-amber-300 text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded mb-1">
                    BONUS #1 (FREE TODAY)
                  </div>
                  <h3 className={`text-lg sm:text-xl font-bold ${textPrimary} mb-1`}>
                    Professional Service Pricing Calculator
                  </h3>
                  <p className={`text-xs sm:text-sm ${textSecondary} leading-relaxed max-w-xl`}>
                    Stop guessing your service rates. This dynamic calculator figures out your exact hourly cost, profit margins, and 5 client pricing models before you send a proposal.
                  </p>
                </div>
              </div>
              <div className="text-right w-full sm:w-auto">
                <div className={`text-xs ${textMuted} line-through`}>Regular: ₹1,999</div>
                <div className="text-lg sm:text-xl font-black text-emerald-500">FREE</div>
              </div>
            </div>

            {/* Bonus 2 */}
            <div className={`${cardClass} rounded-2xl p-5 sm:p-8 border border-emerald-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6`}>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <div className="inline-block bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded mb-1">
                    BONUS #2 (FREE TODAY)
                  </div>
                  <h3 className={`text-lg sm:text-xl font-bold ${textPrimary} mb-1`}>
                    The WhatsApp Invoicing & 3x Faster Payment Recovery Automation Pack
                  </h3>
                  <p className={`text-xs sm:text-sm ${textSecondary} leading-relaxed max-w-xl`}>
                    1-Click Google Apps Script to dispatch formatted WhatsApp bills + 35+ battle-tested reminder sequences to collect overdue payments and eliminate client ghosting without awkwardness.
                  </p>
                </div>
              </div>
              <div className="text-right w-full sm:w-auto">
                <div className={`text-xs ${textMuted} line-through`}>Regular: ₹2,499</div>
                <div className="text-lg sm:text-xl font-black text-emerald-500">FREE</div>
              </div>
            </div>

            {/* Bonus 3 */}
            <div className={`${cardClass} rounded-2xl p-5 sm:p-8 border border-emerald-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6`}>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <div className="inline-block bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded mb-1">
                    BONUS #3 (INCLUDED)
                  </div>
                  <h3 className={`text-lg sm:text-xl font-bold ${textPrimary} mb-1`}>
                    Lifetime Updates & Future Tab Refinements
                  </h3>
                  <p className={`text-xs sm:text-sm ${textSecondary} leading-relaxed max-w-xl`}>
                    Whenever we add new tabs, update formulas, or refine GST slabs, you get the updated template delivered directly to your inbox forever.
                  </p>
                </div>
              </div>
              <div className="text-right w-full sm:w-auto">
                <div className={`text-xs ${textMuted} line-through`}>Regular: ₹1,999</div>
                <div className="text-lg sm:text-xl font-black text-emerald-500">FREE</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          13. FINAL PRICING & VALUE STACK BOX
      ======================================================== */}
      <section id="pricing" className="py-16 sm:py-24 md:py-28 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`${cardClass} rounded-3xl p-6 sm:p-12 border-2 border-emerald-500/40 shadow-2xl relative overflow-hidden text-center`}>
            
            {/* Top Ribbon */}
            <div className="absolute top-0 right-0 bg-gradient-to-l from-emerald-500 to-teal-500 text-white text-[10px] sm:text-xs font-black px-5 sm:px-6 py-1 sm:py-1.5 rounded-bl-xl uppercase tracking-wider shadow-md">
              Save 82% Limited Offer
            </div>

            <div className="max-w-2xl mx-auto mb-6 sm:mb-8">
              <h2 className={`text-2xl sm:text-4xl md:text-5xl font-black ${textPrimary} mb-2.5`}>
                Get Instant Lifetime Access
              </h2>
              <p className={`text-xs sm:text-base ${textSecondary}`}>
                Everything you need to organize your clients, invoices, team tasks, and cashflow in one place.
              </p>
            </div>

            {/* Value checklist */}
            <div className={`max-w-lg mx-auto ${isDark ? 'bg-slate-900/60' : 'bg-slate-50'} rounded-2xl p-5 sm:p-6 border ${borderSubtle} text-left space-y-2.5 sm:space-y-3 mb-6 sm:mb-8`}>
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className={`flex items-center gap-2 ${textPrimary} font-medium`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Complete Sheetly 19-Tab Business OS
                </span>
                <span className={`text-xs ${textMuted} line-through`}>₹4,999</span>
              </div>
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className={`flex items-center gap-2 ${textPrimary} font-medium`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Native Google Sheets (India Edition with 18% GST)
                </span>
                <span className={`text-xs ${textMuted} line-through`}>₹999</span>
              </div>
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className={`flex items-center gap-2 ${textPrimary} font-medium`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> GST Invoicing with 1-Click PDF Export
                </span>
                <span className={`text-xs ${textMuted} line-through`}>₹1,999</span>
              </div>
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className={`flex items-center gap-2 ${textPrimary} font-medium`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Bonus 1: Service Pricing Calculator
                </span>
                <span className={`text-xs ${textMuted} line-through`}>₹1,999</span>
              </div>
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className={`flex items-center gap-2 ${textPrimary} font-medium`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Bonus 2: WhatsApp Invoicing & Payment Recovery Pack
                </span>
                <span className={`text-xs ${textMuted} line-through`}>₹2,499</span>
              </div>
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className={`flex items-center gap-2 ${textPrimary} font-medium`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Bonus 3: Lifetime Free Updates Forever
                </span>
                <span className={`text-xs ${textMuted} line-through`}>₹1,999</span>
              </div>

              <div className={`pt-3 border-t ${borderSubtle} flex items-center justify-between font-bold text-xs sm:text-sm`}>
                <span className={textPrimary}>Total Value:</span>
                <span className="text-rose-500 line-through">{CONFIG.totalValue}</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="mb-6 sm:mb-8">
              <div className={`text-[10px] sm:text-xs ${textMuted} uppercase tracking-widest font-bold mb-1`}>
                One-Time Payment • Lifetime Access
              </div>
              <div className="flex items-baseline justify-center gap-2 sm:gap-3">
                <span className="text-4xl sm:text-6xl md:text-7xl font-black text-emerald-500">{CONFIG.price}</span>
                <span className={`text-lg sm:text-2xl ${textMuted} line-through`}>{CONFIG.originalPrice}</span>
              </div>
              <div className="text-[11px] sm:text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                (Zero Monthly Fees • Pay Once, Own It Forever)
              </div>
            </div>

            {/* CTA Button */}
            <div className="max-w-md mx-auto">
              <a
                href={CONFIG.checkoutUrl}
                onClick={(e) => handleCheckoutClick(e, 'Bonuses Offer Section')}
                className="w-full relative group overflow-hidden bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-lg sm:text-xl px-6 sm:px-8 py-4 sm:py-5 rounded-2xl shadow-2xl shadow-emerald-500/40 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2.5 border border-emerald-400/40"
              >
                <span>Download Sheetly Now →</span>
              </a>

              <div className={`mt-3.5 sm:mt-4 text-[11px] sm:text-xs ${textMuted} flex items-center justify-center gap-3 sm:gap-4 flex-wrap font-medium`}>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> 100% Secure via UPI / Razorpay
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-500" /> Instant Download Link
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          14. RISK REVERSAL: 7-DAY GUARANTEE
      ======================================================== */}
      <section className={`py-14 sm:py-16 ${bgSectionAlt} border-y ${borderSubtle}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto mb-5 sm:mb-6 border border-emerald-500/30">
            <ShieldCheck className="w-8 h-8 sm:w-9 sm:h-9" />
          </div>
          <h3 className={`text-xl sm:text-3xl font-black ${textPrimary} mb-3 sm:mb-4`}>
            7-Day Working-System Guarantee
          </h3>
          <p className={`text-xs sm:text-base ${textSecondary} leading-relaxed mb-5 sm:mb-6`}>
            Because Sheetly 2.0 and its bonuses are instant, non-revocable digital Google Sheets templates copied permanently into your Google Drive, <strong className={textPrimary}>we do not offer change-of-mind refunds once accessed</strong>. You are protected by our <strong className={textPrimary}>7-Day Working-System Guarantee</strong>: if you experience accidental duplicate billing or a verifiable technical/formula defect in the unmodified master sheet within <strong className={textPrimary}>7 calendar days</strong> of purchase that our team ({CONFIG.supportEmail} / WhatsApp) cannot resolve within <strong className={textPrimary}>48 business hours</strong> of receiving your screenshot/video report, you receive a 100% full refund.
          </p>
          <div className="text-[11px] sm:text-xs text-emerald-600 dark:text-emerald-400 font-extrabold tracking-wide uppercase">
            Technical Defect & Duplicate Protection • 100% Verified Refund
          </div>
        </div>
      </section>

      {/* ========================================================
          14.1 WHO IS SHEETLY FOR & NOT FOR (HONEST QUALIFICATION)
      ======================================================== */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/25">
              Honest Fit Guide
            </span>
            <h2 className={`text-xl sm:text-3xl font-black ${textPrimary} mt-2.5 mb-2`}>
              Is Sheetly 2.0 Right For Your Business?
            </h2>
            <p className={`text-xs sm:text-sm ${textSecondary} max-w-xl mx-auto`}>
              We believe in 100% transparency. Please review who Sheetly is built for before purchasing:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {/* Who is it for */}
            <div className={`${cardClass} p-5 sm:p-6 rounded-2xl border border-emerald-500/35 relative`}>
              <div className="flex items-center gap-2 mb-3.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-black text-sm">
                  ✓
                </div>
                <h3 className={`text-base font-bold ${textPrimary}`}>Sheetly is PERFECT for you if:</h3>
              </div>
              <ul className={`space-y-2.5 text-xs sm:text-sm ${textSecondary}`}>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>You are an Indian freelancer, marketing agency, consultant, or service firm with 1 to 50 active clients.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>You are tired of burning ₹5,000+ every single month on Notion, ClickUp, or accounting software you barely use.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>You want clean 18% GST invoices (CGST/SGST/IGST breakdown) that download to client-ready PDFs in 60 seconds.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>You want real-time cloud auto-sync across your laptop, Mac, Windows, Android, and iPhone without software licenses.</span>
                </li>
              </ul>
            </div>

            {/* Who is it NOT for */}
            <div className={`${cardClass} p-5 sm:p-6 rounded-2xl border border-rose-500/35 relative`}>
              <div className="flex items-center gap-2 mb-3.5">
                <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-500 flex items-center justify-center font-black text-sm">
                  ✕
                </div>
                <h3 className={`text-base font-bold ${textPrimary}`}>Please DO NOT buy if:</h3>
              </div>
              <ul className={`space-y-2.5 text-xs sm:text-sm ${textSecondary}`}>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold flex-shrink-0">✕</span>
                  <span>You run a heavy manufacturing warehouse that requires physical barcode scanning and hardware POS scanners.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold flex-shrink-0">✕</span>
                  <span>You already have a dedicated full-time accountant handling complex Tally ERP setups and you never check your cashflow.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold flex-shrink-0">✕</span>
                  <span>You want a native offline iOS/Android app rather than a Google Sheets cloud workspace.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          15. OBJECTION-KILLER FAQS
      ======================================================== */}
      <section id="faqs" className="py-16 sm:py-24 md:py-28 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/25">
              Clear Answers
            </span>
            <h2 className={`text-2xl sm:text-4xl font-black ${textPrimary} mt-3 mb-3`}>
              Frequently Asked Questions
            </h2>
            <p className={`text-xs sm:text-base ${textSecondary}`}>
              Have questions before getting started? Here are answers to the most common queries:
            </p>
          </div>

          <div className="space-y-3.5 sm:space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`${cardClass} rounded-2xl border ${borderSubtle} overflow-hidden transition-all`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className={`w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 font-bold ${textPrimary} text-sm sm:text-base hover:text-emerald-500 transition-colors`}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${textMuted} transition-transform duration-200 flex-shrink-0 ${
                      openFaq === idx ? 'rotate-180 text-emerald-500' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className={`px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm ${textSecondary} leading-relaxed border-t ${borderSubtle} pt-3`}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* WhatsApp Support Box */}
          <div className={`mt-10 sm:mt-12 p-5 sm:p-6 rounded-2xl ${cardClass} border ${borderSubtle} text-center`}>
            <p className={`text-xs sm:text-sm ${textSecondary} mb-3`}>
              Have a specific question or custom business requirement? Chat directly with our team on WhatsApp:
            </p>
            <a
              href={`https://wa.me/${CONFIG.whatsappNumber}?text=Hi%2C%20I%20have%20a%20question%20about%20Sheetly`}
              onClick={() => trackWhatsAppClick('FAQ Support Box')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-emerald-500 hover:text-emerald-600 font-bold text-xs sm:text-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat with Support Team on WhatsApp</span>
            </a>
          </div>

        </div>
      </section>

      {/* ========================================================
          16. FOOTER
      ======================================================== */}
      <footer className={`border-t ${borderSubtle} ${isDark ? 'bg-[#05080f]' : 'bg-slate-100'} py-10 sm:py-12 text-xs ${textMuted} pb-24 md:pb-12`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div>
              <div className={`text-sm font-black ${textPrimary}`}>{CONFIG.productName}</div>
              <div>© {new Date().getFullYear()} Sheetly. All rights reserved.</div>
            </div>
          </div>

          <div className={`flex items-center gap-4 sm:gap-6 font-medium ${textSecondary} text-xs flex-wrap justify-center sm:justify-end`}>
            <a href="#pricing" className="hover:text-emerald-500 transition-colors">Pricing</a>
            <a href="#features" className="hover:text-emerald-500 transition-colors">Features</a>
            <a href="#faqs" className="hover:text-emerald-500 transition-colors">Support & FAQs</a>
            <button onClick={() => setLegalModal('terms')} className="hover:text-emerald-500 transition-colors underline-offset-4 hover:underline">Terms</button>
            <button onClick={() => setLegalModal('privacy')} className="hover:text-emerald-500 transition-colors underline-offset-4 hover:underline">Privacy</button>
            <button onClick={() => setLegalModal('refund')} className="hover:text-emerald-500 transition-colors underline-offset-4 hover:underline">Refund Policy</button>
            <a href={`mailto:${CONFIG.supportEmail}`} className="hover:text-emerald-500 transition-colors">Email Us</a>
          </div>
        </div>
      </footer>

      {/* ========================================================
          17. MOBILE STICKY FLOATING CTA BAR (OPTIMIZED)
      ======================================================== */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 z-40 ${
        isDark ? 'bg-[#090e18]/95' : 'bg-white/95'
      } backdrop-blur-lg border-t ${borderSubtle} py-2.5 px-3.5 flex items-center justify-between gap-2 shadow-2xl`}>
        <div>
          <div className={`text-[10px] ${textMuted} font-semibold uppercase tracking-wider`}>One-Time Offer</div>
          <div className="text-base font-black text-emerald-500 flex items-center gap-1.5 leading-tight">
            {CONFIG.price}
            <span className={`text-xs ${textMuted} line-through font-normal`}>{CONFIG.originalPrice}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent("Hi! I have a question about Sheetly 2.0 before purchasing.")}`}
            onClick={() => trackWhatsAppClick('Sticky Mobile Bar')}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp"
            className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 flex items-center justify-center hover:bg-emerald-500/25 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
          <a
            href={CONFIG.checkoutUrl}
            onClick={(e) => handleCheckoutClick(e, 'Sticky Mobile Bar')}
            className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-xs py-2.5 px-3.5 rounded-xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-1.5 transition-transform active:scale-95"
          >
            <span>Get Sheetly Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* ========================================================
          18. LEGAL & COMPLIANCE MODAL (TERMS / PRIVACY / REFUND)
      ======================================================== */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className={`${cardClass} max-w-2xl w-full max-h-[85vh] rounded-2xl border ${borderSubtle} p-6 sm:p-8 flex flex-col shadow-2xl overflow-hidden relative`}>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-800">
              <h3 className={`text-lg sm:text-xl font-black ${textPrimary}`}>
                {legalModal === 'terms' && "Terms & Conditions"}
                {legalModal === 'privacy' && "Privacy Policy"}
                {legalModal === 'refund' && "7-Day Working-System Guarantee"}
              </h3>
              <button
                onClick={() => setLegalModal(null)}
                className={`p-1.5 rounded-lg ${cardClass} border ${borderSubtle} text-gray-400 hover:text-white transition-colors`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className={`overflow-y-auto py-5 space-y-4 text-xs sm:text-sm ${textSecondary} leading-relaxed`}>
              {legalModal === 'terms' && (
                <>
                  <p><strong>Last Updated: October 2026</strong></p>
                  <p>Welcome to Sheetly 2.0. By purchasing and downloading our Google Sheets business operating system, you agree to these Terms and Conditions.</p>
                  <h4 className={`font-bold ${textPrimary}`}>1. License & Commercial Usage</h4>
                  <p>When you purchase Sheetly 2.0 for a one-time fee of ₹899, you receive a non-exclusive, perpetual, single-user license to use the system for your personal business, freelance work, or internal company operations. You may customize, duplicate, and modify the sheets freely for your own business.</p>
                  <h4 className={`font-bold ${textPrimary}`}>2. Restrictions</h4>
                  <p>You may NOT re-sell, redistribute, sublicense, lease, or publicly share access to Sheetly 2.0 or its bonus templates as a standalone digital product or course asset.</p>
                  <h4 className={`font-bold ${textPrimary}`}>3. Support & Updates</h4>
                  <p>We provide email and WhatsApp support for setup guidance and formula inquiries. Future tab updates and refinements are provided free of charge.</p>
                </>
              )}

              {legalModal === 'privacy' && (
                <>
                  <p><strong>Last Updated: October 2026</strong></p>
                  <p>At Sheetly, your privacy is our top priority. This policy outlines how your data is handled.</p>
                  <h4 className={`font-bold ${textPrimary}`}>1. 100% Private Business Data</h4>
                  <p>Sheetly 2.0 operates entirely inside your private Google Drive account. We NEVER have access to your spreadsheet, financial figures, client records, or invoices. Your business data remains completely confidential under your own Google Workspace security.</p>
                  <h4 className={`font-bold ${textPrimary}`}>2. Payment Information</h4>
                  <p>Payments are processed securely via encrypted, PCI-DSS compliant Indian payment gateways (Razorpay / UPI / Superprofile). We never store or handle your credit card numbers or UPI PINs.</p>
                  <h4 className={`font-bold ${textPrimary}`}>3. Communications</h4>
                  <p>We only use your purchase email to send your product copy link, setup walkthrough video, and product update notifications. We never sell or share your contact info with third parties.</p>
                </>
              )}

              {legalModal === 'refund' && (
                <>
                  <p><strong>Last Updated: October 2026</strong></p>
                  <p>We stand behind the engineering of Sheetly 2.0 with our <strong>7-Day Working-System Guarantee</strong>.</p>
                  <h4 className={`font-bold ${textPrimary}`}>1. Digital Goods Policy</h4>
                  <p>Because Sheetly 2.0 and its bonus resources are instant, non-revocable digital Google Sheets templates copied permanently into your personal Google Drive, <strong>we do not offer change-of-mind refunds once accessed</strong>.</p>
                  <h4 className={`font-bold ${textPrimary}`}>2. 7-Day Working-System Guarantee</h4>
                  <p>You are protected by our <strong>7-Day Working-System Guarantee</strong>: if you experience accidental duplicate billing or a verifiable technical/formula defect in the unmodified master sheet within <strong>7 calendar days</strong> of purchase that our team ({CONFIG.supportEmail} / WhatsApp) cannot resolve within <strong>48 business hours</strong> of receiving your screenshot/video report, you receive a 100% full refund.</p>
                  <h4 className={`font-bold ${textPrimary}`}>3. Resolution & 100% Refund Process</h4>
                  <p>To report an issue, simply send your order details and a screenshot or short video demonstrating the defect to our team via WhatsApp ({CONFIG.whatsappNumber}) or email ({CONFIG.supportEmail}). If our technical team cannot resolve the verified issue within 48 business hours of receiving your report, your full 100% refund of ₹899 will be initiated back to your original payment method (UPI / Bank Account / Card).</p>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-gray-800 flex justify-end">
              <button
                onClick={() => setLegalModal(null)}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

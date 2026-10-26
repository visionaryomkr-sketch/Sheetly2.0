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
  originalPrice: "₹2,499",
  totalValue: "₹11,496",
  checkoutUrl: "https://superprofile.bio/vp/tj9_xpSO",
  whatsappNumber: "916201530733",
  supportEmail: "support@sheetly.com",
};

export default function App() {
  // Theme State: 'dark' or 'light'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('sheetly-theme') || 'dark';
  });

  // Countdown Timer State
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 48 });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeSubViewIndex, setActiveSubViewIndex] = useState(0);
  const [zoomImage, setZoomImage] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  // Savings Calculator State
  const [tools, setTools] = useState({
    notion: true,
    clickup: true,
    quickbooks: true,
    calendly: false,
    airtable: true,
  });

  // Save theme changes
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('sheetly-theme', newTheme);
  };

  // Reset subview when active tab changes
  useEffect(() => {
    setActiveSubViewIndex(0);
  }, [activeTab]);

  // Countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return { minutes: 15, seconds: 0 };
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

  // Ultra-detailed tabs based on actual Google Sheet inspection
  const previewTabs = [
    {
      id: 'dashboard',
      sheetTabName: "🎛️ Dashboard",
      label: 'Executive Dashboard',
      icon: TrendingUp,
      title: 'Real-Time Business Command Center',
      tagline: 'Your entire business health at a single glance — automated with zero manual math.',
      desc: 'Wake up, open your dashboard, and instantly know your daily schedule, active client deliverables, overdue invoice alerts, and live cashflow numbers. Links automatically to all your backend tabs.',
      views: [
        { label: 'Executive Cockpit', src: '/Images/business-dashboard.webp', caption: 'Live KPI gauges, revenue progress & daily schedule' },
        { label: 'Category Insights', src: '/Images/dashboard-insight.webp', caption: 'Visual income vs expense charts & low-balance alerts' },
        { label: 'Clean Overview Layout', src: '/Images/business-dashboards.webp', caption: 'Compact view for 13-inch laptops & tablets' }
      ],
      badge: 'Auto-Updated in Real Time',
      timeSaved: 'Saves ~45 mins every morning on status checking',
      keyFeatures: [
        { title: 'Interactive Client Quick Inspector', desc: 'Select any client name from the dropdown: their phone, email, address, status, and active project immediately load automatically.' },
        { title: 'Today\'s Operational Schedule', desc: 'Automatically checks today\'s date and lists all meetings, invoice due dates, and task deliverables scheduled for today.' },
        { title: 'Visual Revenue & Profit Gauges', desc: 'Live gauge charts comparing your actual month-to-date collections against your monthly profit targets.' },
        { title: 'Overdue Payment Alerts', desc: 'High-visibility alert box highlighting invoices overdue by 7, 15, or 30 days so you can follow up without awkward delays.' }
      ],
      columnsTracked: ['Today\'s Schedule Message', 'Client Quick Inspector Dropdown', 'Email, Phone & City', 'Status & Priority Tags', 'Client Notes & History', 'Today\'s Tasks Counter']
    },
    {
      id: 'crm',
      sheetTabName: "🤝 Client Management & 💬 Communication Log",
      label: 'Client CRM & Log',
      icon: Users,
      title: 'Complete Client CRM & Activity Log',
      tagline: 'Never lose a lead or forget a client discussion again.',
      desc: 'Store unlimited client profiles with priority ratings, payment preferences, and contract histories. Connected directly to an automated communication ledger that logs every WhatsApp chat, phone call, and meeting.',
      views: [
        { label: 'Client Directory', src: '/Images/client-managnment.webp', caption: 'Full CRM database with status tags & payment modes' },
        { label: 'Communication Log', src: '/Images/relationship.webp', caption: 'Historical activity log with Next Action follow-ups' },
        { label: 'Client Profile Inspector', src: '/Images/client.webp', caption: 'Individual client contract & balance inspector' }
      ],
      badge: 'Unlimited Client Profiles',
      timeSaved: 'Eliminates 100% of "Where did we leave that discussion?" confusion',
      keyFeatures: [
        { title: 'Built-in Client Highlighter Tool', desc: 'Pick any client from the top dropdown to automatically highlight and isolate their entire row across all tables.' },
        { title: 'Client Classification & Priority Tags', desc: 'Tag accounts by type (Small Business, Freelancer, Enterprise) with visual priority tags (🔴 High, 🟠 Medium, 🟡 Low).' },
        { title: 'Communication History Log', desc: 'Records contact person, date, contact method (Phone, WhatsApp, Meeting), service pitched, and "Next Action" reminders.' },
        { title: 'One-Click Integration With Invoices', desc: 'Client names and contact info automatically feed into the invoice dropdowns — type their name once, use forever.' }
      ],
      columnsTracked: ['CLIENT / COMPANY', 'TYPE (Business Category)', 'E-MAIL & PHONE', 'ADDRESS / CITY', 'STATUS & PRIORITY', 'PAYMENT METHOD (UPI/Bank)', 'CONTACT TYPE', 'NEXT ACTION FOLLOW-UP']
    },
    {
      id: 'invoicing',
      sheetTabName: "🧾 Invoices & 🖨️ Print - Invoice",
      label: 'GST Invoicing Engine',
      icon: Receipt,
      title: 'GST Invoicing & 1-Click PDF Generator',
      tagline: 'Create, track, and export branded GST-compliant bills in under 60 seconds.',
      desc: 'No expensive invoicing software required. Manage your master invoice ledger with automatic 18% GST calculations (Inclusive & Exclusive), then switch to the Print tab to generate client-ready PDF bills in one click.',
      views: [
        { label: 'Printable PDF Invoice', src: '/Images/invoice-dashboard.webp', caption: 'Pixel-perfect, print-ready branded GST invoice' },
        { label: 'Invoice Tracker Board', src: '/Images/invoice-tracker.webp', caption: 'Master invoice ledger with Fully Paid vs Unpaid tags' },
        { label: 'Client Billing View', src: '/Images/invoice.webp', caption: 'Line item breakdown with tax percentage splits' }
      ],
      badge: 'Indian GST Compliant (18% / 12% / 5%)',
      timeSaved: 'Reduces billing time from 30 mins to 60 seconds per client',
      keyFeatures: [
        { title: 'Automatic 18% GST Calculations', desc: 'Just enter the base service fee and tax percentage: all Tax-Inclusive and Tax-Exclusive amounts calculate automatically with zero manual math.' },
        { title: '1-Click Printable PDF Bill Layout', desc: 'Select the invoice number from the dropdown on the Print tab — all client details, line items, and totals auto-fill into a gorgeous PDF-ready bill.' },
        { title: 'Color-Coded Status Tags', desc: 'Visual badges for Fully Paid, Partial, Unpaid, and Cancelled with automatic balance due calculation.' },
        { title: 'Auto-Incrementing Invoice Numbers', desc: 'Prevents duplicate invoice numbers and keeps your tax audit records 100% compliant and clean for your CA.' }
      ],
      columnsTracked: ['🖨️ Print Checkbox', 'INVOICE NO.', 'CLIENT / COMPANY', 'DATE SENT & DUE DATE', 'STATUS (Paid/Unpaid/Part-Paid)', 'PAID AMOUNT & BALANCE DUE', 'DISCOUNT %', 'TAX (18.00%) & TOTAL']
    },
    {
      id: 'tasks',
      sheetTabName: "☑️ Task-Project Tracker",
      label: 'Tasks & Projects',
      icon: Layers,
      title: 'Deliverables & Milestone Tracker',
      tagline: 'Keep your team focused, deliverables on schedule, and clients delighted.',
      desc: 'A robust task and project management board that tracks deadlines, client milestones, team member assignments, and progress stages with interactive completion checkboxes.',
      views: [
        { label: 'Project Deliverables Board', src: '/Images/task-dashboard.webp', caption: 'Priority tags, delegate assignments & due date alerts' },
        { label: 'Milestone Stage View', src: '/Images/task-manage.webp', caption: 'Progress stages: In Progress, Review, Completed' }
      ],
      badge: 'Interactive Checkbox System',
      timeSaved: 'Saves 2+ hours every week spent on internal team follow-ups',
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
      icon: CalendarIcon,
      title: 'Visual Operations & Appointments Calendar',
      tagline: 'Your entire month mapped out automatically — with zero manual double-entry.',
      desc: 'A smart monthly grid that auto-populates directly from your invoices, tasks, and client renewal dates. Change the month and year dropdown to instantly review upcoming workload.',
      views: [
        { label: 'Monthly Operations Grid', src: '/Images/calender-insight.webp', caption: 'Visual calendar showing daily tasks, deadlines & payment due dates' },
        { label: 'Appointments Inspector', src: '/Images/calender-deadline.webp', caption: 'Dedicated schedule list for client calls & deliverables' }
      ],
      badge: '100% Formula-Driven Calendar Grid',
      timeSaved: 'Never miss an invoice due date or client meeting again',
      keyFeatures: [
        { title: 'Dynamic Month & Year Dropdowns', desc: 'Select any month (January to December) or year: the calendar grid automatically recalculates day layouts and weekends.' },
        { title: 'Auto-Synced Invoices & Deadlines', desc: 'You don\'t manually type into the calendar — invoice due dates and project milestones automatically sync onto their scheduled days.' },
        { title: 'Custom Appointments Section', desc: 'Dedicated rows to quickly add custom client coaching calls, photography shoots, or strategy workshops.' },
        { title: 'High-Visibility Weekend & Today Marker', desc: 'Current day is visually highlighted so you always know exactly where you are in the monthly cycle.' }
      ],
      columnsTracked: ['Dynamic Month & Year Dropdown', 'Don\'t Show Tasks Filter', '31-Day Interactive Calendar Grid', 'Other Entries & Appointments with Checkboxes (☑️)']
    },
    {
      id: 'finances',
      sheetTabName: "🟢 Income, 🔴 Expense, 📅 Monthly & 1️⃣2️⃣-Month Views",
      label: 'Cashflow & Profit Analytics',
      icon: IndianRupee,
      title: 'Master Income, Expense & P&L Suite',
      tagline: 'Complete financial clarity. Eliminate tax season chaos forever.',
      desc: 'Comprehensive financial suite featuring dedicated Income & Expense ledgers, bank reconciliation, monthly category breakdowns, 12-month annual growth trends, and custom date range analyzers.',
      views: [
        { label: '12-Month Annual Trend', src: '/Images/master-finance.webp', caption: 'Full year revenue, expenses, and Monthly Profit vs Goals' },
        { label: 'Monthly Category Breakdown', src: '/Images/finance.webp', caption: 'Category-by-category spending charts & net profit margins' },
        { label: 'Bank Reconciliation Tab', src: '/Images/bookkeeping.webp', caption: 'Cross-check bank statement lines against spreadsheet entries' }
      ],
      badge: 'Chartered Accountant (CA) Approved',
      timeSaved: 'Turns 3 days of tax-filing panic into a 15-minute export',
      keyFeatures: [
        { title: 'Tax-Inclusive & Exclusive Calculation', desc: 'Handles GST 18%, 12%, 5% or 0% automatically, splitting Net Amount from Tax Amount for clean quarterly filing.' },
        { title: 'Monthly View & Goal Comparison', desc: 'Set a monthly profit goal (e.g. ₹5,00,000) and watch your live progress bar fill up as invoices are paid.' },
        { title: '12-Month Annual Growth Overview', desc: 'Side-by-side January-to-December financial comparison showing seasonal revenue peaks and cost trends.' },
        { title: 'Custom Date Range Analyzer', desc: 'Select any custom start and end date (e.g. Q1 or festival campaign) to calculate custom gross profit and net margin in 1 click.' }
      ],
      columnsTracked: ['INVOICE NO. / EXPENSE ID', 'DATE & CATEGORY', 'TOTAL AMOUNT', 'TAX % (Inclusive & Exclusive)', 'Reconciled Checkbox (☑️)', 'Monthly Profit Goal vs Actual', 'Custom Period (From/To)', 'Account Balances (Cash/UPI/Bank)']
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
      a: "Within 10 seconds of completing payment, you will receive an instant email and on-screen access link with the Google Sheets 1-Click Copy Link (India GST Edition), complete Video Setup Walkthrough, and your 2 Free Fast-Action Bonuses. You make a private copy into your personal Google Drive in 1 click and you're ready to go!"
    },
    {
      q: "Can I customize the templates with my own company logo and colors?",
      a: "Yes! Every single tab, invoice layout, and table is 100% customizable. You can add your brand logo, adjust colors, modify categories, and set your own tax rates."
    },
    {
      q: "What is your refund policy if it doesn't work for me?",
      a: "We offer a 100% Risk-Free 7-Day Money-Back Guarantee. If Sheetly doesn't save you time or streamline your business operations, simply email or WhatsApp us within 7 days and you will receive a full 100% refund within 48 hours. No awkward questions asked."
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

  const currentTab = previewTabs.find(t => t.id === activeTab) || previewTabs[0];
  const activeImage = currentTab.views[activeSubViewIndex] || currentTab.views[0];

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
          <span className="truncate">Save 92% Today + 2 Free Bonuses Included</span>
          <span className="bg-black/30 px-2 py-0.5 rounded font-mono text-emerald-200 text-[11px] flex-shrink-0">
            {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
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
            <a href="#features" className="hover:text-emerald-500 transition-colors">18 Tabs</a>
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
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> 7-Day Money Back
              </span>
            </div>
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
                This is not a generic blank sheet. It is an interconnected <strong className={textPrimary}>18-tab operating system</strong> linking your CRM, GST invoicing, client projects, and cashflow into one command center.
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
              <div className={`text-2xl sm:text-4xl font-black ${textPrimary} mb-1`}>18+ Tabs</div>
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
          7. ULTRA-DETAILED PRODUCT WALKTHROUGH STUDIO (FIXED CLIPPING!)
      ======================================================== */}
      <section id="preview" className="py-16 sm:py-24 md:py-28 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/25">
              Deep Product Tour
            </span>
            <h2 className={`text-2xl sm:text-4xl md:text-5xl font-black ${textPrimary} mt-3 mb-3`}>
              Inside Sheetly: See Exactly What You Get
            </h2>
            <p className={`text-xs sm:text-base ${textSecondary}`}>
              Click each core tab below to inspect the actual layouts, automated calculations, and interactive views built into your spreadsheet:
            </p>
          </div>

          {/* Main Core Tab Selector (FIXED: w-max mx-auto px-4 prevents any left-side clipping!) */}
          <div className="w-full overflow-x-auto pb-4 mb-8 scrollbar-none py-1">
            <div className="flex items-center gap-2 w-max mx-auto px-4">
              {previewTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 scale-105'
                        : `${cardClass} ${textSecondary} hover:${textPrimary}`
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Tab Master Card */}
          <div className={`${cardClass} rounded-2xl sm:rounded-3xl p-5 sm:p-10 border ${borderSubtle} shadow-2xl`}>
            
            {/* Tab Header Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 pb-5 sm:pb-6 mb-6 sm:mb-8 border-b border-gray-800/60 dark:border-gray-800">
              <div>
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 px-2.5 py-0.5 rounded-md text-[11px] font-bold">
                    {currentTab.badge}
                  </span>
                  <span className={`text-[11px] font-mono font-medium ${textMuted} bg-slate-900/40 dark:bg-slate-900 px-2 py-0.5 rounded border ${borderSubtle}`}>
                    Spreadsheet Tab: {currentTab.sheetTabName}
                  </span>
                </div>
                <h3 className={`text-xl sm:text-3xl font-black ${textPrimary}`}>
                  {currentTab.title}
                </h3>
                <p className={`text-xs sm:text-sm font-medium text-emerald-600 dark:text-emerald-400 mt-0.5`}>
                  {currentTab.tagline}
                </p>
              </div>

              {/* Time saved pill */}
              <div className={`flex items-center gap-2 ${isDark ? 'bg-slate-900/80' : 'bg-slate-100'} px-3 sm:px-3.5 py-2 rounded-xl border ${borderSubtle} flex-shrink-0 text-xs font-semibold ${textPrimary}`}>
                <Clock className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>{currentTab.timeSaved}</span>
              </div>
            </div>

            {/* Two-Column Deep-Dive Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              
              {/* Left Column: Deep Feature Explanation & Column Spec */}
              <div className="lg:col-span-5 space-y-5 sm:space-y-6 text-left">
                <p className={`text-xs sm:text-sm md:text-base ${textSecondary} leading-relaxed`}>
                  {currentTab.desc}
                </p>

                {/* 4 Deep Automation Features */}
                <div>
                  <div className={`text-xs font-bold uppercase tracking-wider ${textMuted} mb-3 flex items-center gap-1.5`}>
                    <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Automations Built Into This Tab:</span>
                  </div>

                  <div className="space-y-2.5 sm:space-y-3">
                    {currentTab.keyFeatures.map((feat, i) => (
                      <div key={i} className={`p-3 sm:p-3.5 rounded-xl border ${borderSubtle} ${isDark ? 'bg-slate-900/40' : 'bg-slate-50'}`}>
                        <div className={`text-xs sm:text-sm font-bold ${textPrimary} flex items-center gap-1.5 mb-1`}>
                          <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 flex-shrink-0" />
                          <span>{feat.title}</span>
                        </div>
                        <p className={`text-xs ${textSecondary} leading-relaxed pl-5`}>
                          {feat.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* What Columns Are Included Box */}
                <div className={`p-3.5 sm:p-4 rounded-xl border ${borderSubtle} ${isDark ? 'bg-slate-900/70' : 'bg-emerald-50/50'}`}>
                  <div className={`text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-1`}>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Exact Data Points & Columns Tracked:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {currentTab.columnsTracked.map((col, i) => (
                      <span key={i} className={`text-[10px] sm:text-[11px] font-medium px-2 sm:px-2.5 py-1 rounded-md border ${borderSubtle} ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-white text-slate-700'}`}>
                        {col}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick Link */}
                <div className="pt-1">
                  <a
                    href={CONFIG.checkoutUrl}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-500 hover:text-emerald-600 transition-colors"
                  >
                    <span>Get this sheet unlocked in Sheetly ({CONFIG.price})</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Right Column: High-Res Screenshot Showcase with Sub-View Switcher */}
              <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
                
                {/* Main Active Screenshot */}
                <div className={`relative rounded-xl sm:rounded-2xl overflow-hidden border ${borderSubtle} ${isDark ? 'bg-slate-900' : 'bg-slate-100'} shadow-2xl group`}>
                  
                  {/* Top image bar */}
                  <div className={`h-8 px-3 sm:px-3.5 flex items-center justify-between border-b ${borderSubtle} ${isDark ? 'bg-slate-950/80' : 'bg-slate-200'}`}>
                    <div className="flex items-center gap-1.5 min-w-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500 flex-shrink-0"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500 flex-shrink-0"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0"></div>
                      <span className={`text-[10px] sm:text-[11px] font-mono ${textMuted} ml-2 truncate`}>
                        {activeImage.caption}
                      </span>
                    </div>

                    {/* Click to zoom button */}
                    <button
                      onClick={() => setZoomImage(activeImage)}
                      className="text-xs text-emerald-500 hover:text-emerald-400 flex items-center gap-1 font-semibold flex-shrink-0"
                      title="Click to view full size"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Zoom</span>
                    </button>
                  </div>

                  {/* Image with zoom on click */}
                  <div 
                    onClick={() => setZoomImage(activeImage)}
                    className="cursor-zoom-in relative"
                  >
                    <img
                      src={activeImage.src}
                      alt={activeImage.caption}
                      className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    />
                    <div className="absolute bottom-2.5 right-2.5 bg-black/75 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-1 rounded-md flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-3 h-3" />
                      <span>Click to enlarge preview</span>
                    </div>
                  </div>
                </div>

                {/* Sub-View Thumbnails Selector */}
                {currentTab.views.length > 1 && (
                  <div>
                    <div className={`text-[11px] font-bold uppercase tracking-wider ${textMuted} mb-2`}>
                      Switch View / Angle:
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {currentTab.views.map((v, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveSubViewIndex(idx)}
                          className={`text-left p-1.5 sm:p-2 rounded-xl border transition-all flex items-center gap-2 ${
                            activeSubViewIndex === idx
                              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500'
                              : `${borderSubtle} ${isDark ? 'bg-slate-900/60' : 'bg-slate-50'} hover:border-gray-500`
                          }`}
                        >
                          <img 
                            src={v.src} 
                            alt={v.label} 
                            className="w-9 h-7 sm:w-10 sm:h-8 rounded object-cover flex-shrink-0 border border-slate-700/50" 
                          />
                          <div className="min-w-0">
                            <div className="text-[11px] sm:text-xs font-bold truncate">{v.label}</div>
                            <div className={`text-[9px] sm:text-[10px] ${textMuted} truncate`}>{v.caption}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          8. COMPLETE 18-TAB BREAKDOWN GRID
      ======================================================== */}
      <section id="features" className={`py-16 sm:py-20 ${bgSectionAlt} border-y ${borderSubtle}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/25">
              Complete Feature Suite
            </span>
            <h2 className={`text-2xl sm:text-4xl md:text-5xl font-black ${textPrimary} mt-3 mb-3`}>
              All 18 Pre-Linked Tabs In The System
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
                  1-Click duplicate straight into your private Google Drive. 18 pre-linked tabs, 18% GST engine, and auto P&L.
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
                <div className="text-xs font-bold text-amber-500 mb-1">ASSETS #4 & #5</div>
                <h4 className={`text-sm font-bold ${textPrimary} mb-1.5`}>2 Fast-Action Bonuses</h4>
                <p className={`text-xs ${textSecondary} leading-relaxed`}>
                  Service Pricing Calculator + 1-Click WhatsApp Invoicing & 35+ Payment Recovery Automation Scripts.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-800 text-[11px] font-semibold text-amber-500 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> ₹4,498 Value Free
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
              When you purchase Sheetly today, you also unlock these 2 fast-action bonuses for 100% free:
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
              Save 92% Limited Offer
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
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Complete Sheetly 18-Tab Business OS
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
            100% Risk-Free 7-Day Money-Back Guarantee
          </h3>
          <p className={`text-xs sm:text-base ${textSecondary} leading-relaxed mb-5 sm:mb-6`}>
            We want you to try Sheetly with complete confidence. Download it, plug in your clients and invoices, and put it to work. If within 7 days you don't feel it saves you hours of admin chaos and money, simply email or WhatsApp us: <strong className={`${textPrimary} font-bold`}>you will receive a full 100% refund within 48 hours, no questions asked.</strong>
          </p>
          <div className="text-[11px] sm:text-xs text-emerald-600 dark:text-emerald-400 font-extrabold tracking-wide uppercase">
            Zero Questions Asked • Instant 100% Refund
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

          <div className={`flex items-center gap-5 sm:gap-6 font-medium ${textSecondary} text-xs`}>
            <a href="#pricing" className="hover:text-emerald-500 transition-colors">Pricing</a>
            <a href="#features" className="hover:text-emerald-500 transition-colors">Features</a>
            <a href="#faqs" className="hover:text-emerald-500 transition-colors">Support & FAQs</a>
            <a href={`mailto:${CONFIG.supportEmail}`} className="hover:text-emerald-500 transition-colors">Email Us</a>
          </div>
        </div>
      </footer>

      {/* ========================================================
          17. MOBILE STICKY FLOATING CTA BAR (OPTIMIZED)
      ======================================================== */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 z-40 ${
        isDark ? 'bg-[#090e18]/95' : 'bg-white/95'
      } backdrop-blur-lg border-t ${borderSubtle} py-2.5 px-4 flex items-center justify-between gap-3 shadow-2xl`}>
        <div>
          <div className={`text-[10px] ${textMuted} font-semibold uppercase tracking-wider`}>One-Time Offer</div>
          <div className="text-base font-black text-emerald-500 flex items-center gap-1.5 leading-tight">
            {CONFIG.price}
            <span className={`text-xs ${textMuted} line-through font-normal`}>{CONFIG.originalPrice}</span>
          </div>
        </div>

        <a
          href={CONFIG.checkoutUrl}
          className="flex-1 max-w-[210px] bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-xs py-2.5 px-4 rounded-xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-1.5 transition-transform active:scale-95"
        >
          <span>Get Sheetly Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ArrowRight,
  RotateCcw,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  Clock
} from 'lucide-react';

export default function SheetlyAiChatbot({ config, isDark, textPrimary, textSecondary, textMuted, borderSubtle, cardClass }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const [unreadBadge, setUnreadBadge] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const initialMessages = [
    {
      id: 'welcome-1',
      sender: 'bot',
      text: "👋 Hi! I'm the **Sheetly AI Assistant**.\n\nAsk me anything about Sheetly — whether it's pricing (₹899), 1-click GST invoicing, 18 pre-built tabs, or compatibility with your business. How can I help you today?",
      time: 'Just now',
      chips: [
        "💰 Is it one-time or monthly?",
        "🧾 How does GST invoicing work?",
        "📱 Will it work on Google Sheets & mobile?",
        "⚡ What if I don't know Excel formulas?",
        "🛡️ What is the refund policy?"
      ]
    }
  ];

  const [messages, setMessages] = useState(initialMessages);

  // Auto-scroll to latest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setUnreadBadge(false);
      setHasOpenedOnce(true);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  // Intelligent intent & response generator
  const generateAiResponse = (userText) => {
    const t = userText.toLowerCase();

    const rules = [
      {
        intent: 'HUMAN_SUPPORT',
        keywords: ['human', 'person', 'whatsapp', 'wa.me', 'call', 'talk to someone', 'real person', 'contact support', 'agent', 'phone', 'help team'],
        response: "Need personalized assistance or want to talk to our team directly? 💬\n\nYou can chat with us right now on WhatsApp! We're here to answer your custom workflow questions or assist with setup.",
        cta: {
          type: 'whatsapp',
          label: 'Chat on WhatsApp (+91 6201530733)',
          url: `https://wa.me/${config.whatsappNumber}?text=Hi%2C%20I%20have%20a%20question%20about%20Sheetly`
        }
      },
      {
        intent: 'PRICING',
        keywords: ['price', 'cost', 'kitna', 'kitne', 'rupee', 'rupaye', 'rs', '₹', '899', 'discount', 'subscription', 'monthly', 'recurring', 'pay once', 'buy', 'purchase', 'kharid', 'cheap', 'expensive', 'sasta'],
        response: `Sheetly is just **${config.price} (one-time payment)** for lifetime access! 🚀\n\n• **Zero monthly fees:** No recurring ₹3,000–₹5,000 monthly deductions like Notion or ClickUp.\n• **Lifetime access:** All 18 tabs + free future tab updates.\n• **Massive savings:** Saves Indian business owners ₹50,000+ every single year in software costs.`,
        cta: {
          type: 'buy',
          label: `Get Sheetly for ${config.price} →`,
          url: config.checkoutUrl
        }
      },
      {
        intent: 'GST_INVOICING',
        keywords: ['gst', 'invoice', 'invoicing', 'bill', 'billing', 'cgst', 'sgst', 'igst', 'pdf invoice', 'tax', 'taxation', 'print invoice', 'ca'],
        response: `Yes! Sheetly has a built-in **GST-Ready Invoicing Engine** designed specifically for India: 🧾\n\n• **Auto Tax Calculations:** Calculates standard 18% GST (or 12%, 5%) automatically with both Tax-Inclusive and Tax-Exclusive formulas.\n• **1-Click Printable PDF Bill:** Simply check the print box (🖨️) next to any invoice to automatically populate a clean, branded PDF bill in seconds.\n• **Payment Status Tracking:** Automatically tracks Fully Paid, Part-Paid, Unpaid, and Overdue bills with zero manual math.`,
        cta: {
          type: 'buy',
          label: `Unlock GST Invoicing (${config.price})`,
          url: config.checkoutUrl
        }
      },
      {
        intent: 'COMPATIBILITY',
        keywords: ['google sheet', 'excel', 'mac', 'windows', 'phone', 'mobile', 'android', 'iphone', 'ios', 'ipad', 'laptop', 'offline', 'drive'],
        response: `Sheetly works seamlessly on all your devices: 💻📱\n\n• **Google Sheets:** 100% cloud-synced. Open on Chrome, Safari, iPad, or Android/iPhone mobile apps.\n• **Microsoft Excel:** Compatible with Excel 2019, 2021, and Office 365 on Mac & Windows.\n\nYou receive both files instantly so you can choose whichever you prefer!`
      },
      {
        intent: 'SKILL_LEVEL',
        keywords: ['formula', 'beginner', 'learn', 'seekhna', 'coding', 'difficult', 'mushkil', 'expert', 'hard', 'easy to use', 'know excel', 'training'],
        response: `You don't need to know any formulas or coding! 🙌\n\n• Sheetly is **100% plug-and-play**. All lookup formulas, dropdown linkages, and calculations are pre-built.\n• You simply type in your data or pick from dropdowns.\n• Plus, it includes a **5-minute video setup masterclass** that guides you step-by-step.`
      },
      {
        intent: 'REFUND',
        keywords: ['refund', 'money back', 'guarantee', 'wapas', 'safe', 'risk', 'fraud', 'scam', 'return', 'policy'],
        response: `You are protected by a **100% Risk-Free 7-Day Money-Back Guarantee**! 🛡️\n\nTry Sheetly for 7 full days. If it doesn't streamline your business operations or save you hours of admin chaos, simply email us at **${config.supportEmail}** or message us on WhatsApp.\n\nYou will receive a **100% full refund within 48 hours**, no questions asked!`
      },
      {
        intent: 'DELIVERY',
        keywords: ['delivery', 'deliver', 'receive', 'download', 'milega', 'kaise mile', 'access link', 'instant email', 'after payment'],
        response: `Delivery is **instant**! ⚡\n\nWithin 10 seconds of payment confirmation, you will receive an automated email with:\n1. Direct Google Sheets Copy Link\n2. Microsoft Excel (.xlsx) Download File\n3. 5-Minute Video Setup Masterclass\n4. Two Fast-Action Bonuses\n\nYou can set it up and start managing clients in under 5 minutes!`
      },
      {
        intent: 'BONUSES',
        keywords: ['bonus', 'free', 'gift', 'pricing calculator', 'whatsapp script', 'payment recovery', 'automation pack', 'apps script'],
        response: `When you grab Sheetly today, you get **2 Free Bonuses Worth ₹4,498**: 🎁\n\n1. **Professional Service Pricing Calculator (Value ₹1,999):** Computes your exact hourly cost, profit margins, and 5 client pricing models before proposing.\n2. **The WhatsApp Invoicing & Payment Recovery Pack (Value ₹2,499):** 1-Click Google Apps Script to send bills via WhatsApp + 35+ battle-tested reminder scripts to recover overdue money from clients!`
      },
      {
        intent: 'USE_CASES',
        keywords: ['agency', 'agencies', 'freelanc', 'designer', 'interior', 'coach', 'consult', 'photograph', 'developer', 'creator', 'suitable', 'chalega', 'my business', 'niche'],
        response: `Yes! Sheetly is custom-tailored for **Indian service businesses**: 💼\n\n• **Digital & Creative Agencies:** Retainers, project milestones, and team tasks.\n• **Freelancers & Consultants:** Client follow-ups, GST billing, and cashflow tracking.\n• **Interior Designers & Studios:** Multi-stage vendor advances and project deadlines.\n• **Coaches & Trainers:** Package enrollments, renewals, and call logs.\n\nYou can customize 20+ income/expense categories on the Setup page to fit your exact workflow.`
      },
      {
        intent: 'FEATURES_TABS',
        keywords: ['tab', 'tabs', 'feature', 'inside', 'include', 'what do i get', 'system', 'kya hai'],
        response: `Sheetly includes **18 pre-linked tabs** across 6 core pillars: 🎛️\n\n1. **Dashboard:** Executive command center with live KPI gauges.\n2. **Client Management & CRM:** Directory, priority tags & contact history.\n3. **GST Invoices & 1-Click Print:** Automated tax calculations & PDF bills.\n4. **Task & Project Tracker:** Checkbox milestones & team delegation.\n5. **Smart Calendar:** Auto-synced deadlines & client renewals.\n6. **Cashflow Analytics:** Income, expenses, monthly breakdown & 12-month P&L.`
      },
      {
        intent: 'GREETING',
        keywords: ['hi', 'hello', 'hey', 'namaste', 'kaise ho', 'good morning', 'good evening', 'sup'],
        response: `Hello there! 👋 I am the Sheetly AI Assistant.\n\nAsk me anything — whether it's pricing (${config.price}), GST invoicing, device support, or how the 18 tabs work. How can I help you today?`
      }
    ];

    // Score intents based on keyword matches
    let bestMatch = null;
    let highestScore = 0;

    for (const rule of rules) {
      let score = 0;
      for (const kw of rule.keywords) {
        if (t.includes(kw)) {
          score += kw.length > 5 ? 2 : 1; // Give extra weight to longer specific terms
        }
      }
      if (score > highestScore) {
        highestScore = score;
        bestMatch = rule;
      }
    }

    if (bestMatch && highestScore > 0) {
      return {
        text: bestMatch.response,
        cta: bestMatch.cta
      };
    }

    // Default Fallback
    return {
      text: `Sheetly is an all-in-one business management operating system (18 pre-linked tabs) in Google Sheets & Excel. For a one-time payment of **${config.price}**, it replaces Notion, ClickUp, and QuickBooks with zero monthly fees!\n\nWould you like to know about:\n• **Pricing & Lifetime Access**\n• **GST Invoicing & 1-Click PDF Bills**\n• **Device & Mobile Support**\n• **Or chat directly with our human team on WhatsApp?**`,
      cta: {
        type: 'whatsapp',
        label: 'Chat With Team on WhatsApp',
        url: `https://wa.me/${config.whatsappNumber}?text=Hi%2C%20I%20have%20a%20question%20about%20Sheetly`
      }
    };
  };

  const handleSendMessage = (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      time: 'Just now'
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Realistic AI thinking delay (400 - 700ms)
    setTimeout(() => {
      const responseData = generateAiResponse(text);
      const botMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: responseData.text,
        time: 'Just now',
        cta: responseData.cta
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, botMessage]);
    }, 550);
  };

  const handleReset = () => {
    setMessages(initialMessages);
    setIsTyping(false);
  };

  return (
    <>
      {/* ========================================================
          FLOATING AI CHAT LAUNCHER BUTTON (Bottom Right)
      ======================================================== */}
      <div className="fixed bottom-[66px] sm:bottom-6 right-3 sm:right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white font-bold w-10 h-10 sm:w-auto sm:h-auto p-0 sm:py-3.5 sm:px-5 rounded-full shadow-2xl shadow-emerald-950/50 hover:scale-105 transition-all duration-300 border border-emerald-400/30"
          title="Ask Sheetly AI Assistant"
        >
          {/* Notification ping badge if unopened */}
          {unreadBadge && (
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 sm:h-4 sm:w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 bg-emerald-500 border-2 border-white dark:border-slate-900 text-[8px] sm:text-[9px] font-black items-center justify-center text-white">
                1
              </span>
            </span>
          )}

          <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
            {isOpen ? <X className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-pulse" />}
          </div>

          <span className="hidden sm:inline-block text-xs sm:text-sm font-extrabold tracking-tight">
            {isOpen ? 'Close Chat' : 'Ask Sheetly AI'}
          </span>

          <span className="hidden sm:inline-block w-2 h-2 rounded-full bg-emerald-300 animate-ping"></span>
        </button>
      </div>

      {/* ========================================================
          AI CHATBOT MODAL WINDOW
      ======================================================== */}
      {isOpen && (
        <div
          className={`fixed bottom-[72px] sm:bottom-20 right-2 sm:right-6 z-50 w-[calc(100vw-16px)] sm:w-[420px] max-w-full h-[520px] max-h-[75vh] sm:max-h-[82vh] rounded-2xl sm:rounded-3xl shadow-2xl border ${borderSubtle} flex flex-col overflow-hidden animate-slideUp backdrop-blur-xl ${
            isDark ? 'bg-slate-950/95 text-slate-100' : 'bg-white/95 text-slate-900'
          }`}
          style={{ boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.45)' }}
        >
          {/* Chat Header */}
          <div className={`p-4 border-b ${borderSubtle} flex items-center justify-between ${
            isDark ? 'bg-slate-900/90' : 'bg-slate-50/90'
          }`}>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className={`text-sm font-black ${textPrimary}`}>Sheetly AI Assistant</h4>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-500 border border-emerald-500/25">
                    Live
                  </span>
                </div>
                <p className={`text-[11px] ${textMuted}`}>
                  Instant answers to all your Sheetly questions
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Reset conversation"
                className={`p-1.5 rounded-lg ${isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-200 text-slate-600'} transition-colors`}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className={`p-1.5 rounded-lg ${isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-200 text-slate-600'} transition-colors`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-500 flex items-center justify-center flex-shrink-0 mt-1 border border-emerald-500/20">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-br-none shadow-md font-medium'
                    : isDark
                      ? 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-sm'
                      : 'bg-slate-100 border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
                }`}>
                  {/* Message formatted with basic line breaks and bolding */}
                  <div className="whitespace-pre-line">
                    {msg.text.split('\n').map((line, idx) => {
                      // Process bold text
                      const parts = line.split(/(\*\*.*?\*\*)/g);
                      return (
                        <p key={idx} className={idx > 0 ? 'mt-1.5' : ''}>
                          {parts.map((part, pIdx) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return <strong key={pIdx} className="font-bold text-emerald-400 dark:text-emerald-300">{part.slice(2, -2)}</strong>;
                            }
                            return part;
                          })}
                        </p>
                      );
                    })}
                  </div>

                  {/* Optional CTA Button inside message */}
                  {msg.cta && (
                    <div className="mt-3 pt-2.5 border-t border-slate-700/40">
                      <a
                        href={msg.cta.url}
                        target={msg.cta.type === 'whatsapp' ? '_blank' : '_self'}
                        rel="noreferrer"
                        className={`inline-flex items-center gap-1.5 font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-md ${
                          msg.cta.type === 'whatsapp'
                            ? 'bg-[#25D366] hover:bg-[#20ba59] text-white'
                            : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                        }`}
                      >
                        <span>{msg.cta.label}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}

                  {/* Suggestion Chips */}
                  {msg.chips && (
                    <div className="mt-3.5 pt-2.5 border-t border-slate-700/40 space-y-1.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Popular Questions:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.chips.map((chip, cIdx) => (
                          <button
                            key={cIdx}
                            onClick={() => handleSendMessage(chip)}
                            className={`text-[11px] font-medium text-left px-2.5 py-1.5 rounded-lg border transition-all ${
                              isDark
                                ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700 hover:border-emerald-500'
                                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-500'
                            }`}
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2.5 items-center">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-500 flex items-center justify-center flex-shrink-0 border border-emerald-500/20">
                  <Bot className="w-4 h-4" />
                </div>
                <div className={`p-3 rounded-2xl rounded-bl-none border ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
                }`}>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Footer */}
          <div className={`p-3 border-t ${borderSubtle} ${
            isDark ? 'bg-slate-900/80' : 'bg-slate-50/80'
          }`}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about pricing, GST, 18 tabs, etc..."
                className={`flex-1 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border focus:outline-none focus:border-emerald-500 transition-colors ${
                  isDark
                    ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500'
                    : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                }`}
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 disabled:hover:bg-emerald-500 text-white p-2.5 rounded-xl transition-all flex items-center justify-center flex-shrink-0 shadow-md shadow-emerald-500/20"
                title="Send question"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2 px-1">
              <span>⚡ Answers in 1 sec</span>
              <a
                href={`https://wa.me/${config.whatsappNumber}?text=Hi%2C%20I%20have%20a%20question%20about%20Sheetly`}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-500 hover:underline flex items-center gap-0.5"
              >
                <span>Or chat on WhatsApp</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

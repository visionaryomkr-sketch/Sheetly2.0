import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Sequence,
  Audio,
  Img,
  staticFile,
} from 'remotion';

// =========================================================================
// REUSABLE MAC BROWSER WINDOW WRAPPER WITH PAN & ZOOM CAPABILITY
// =========================================================================
const BrowserMockup = ({
  title,
  tag,
  src,
  scale = 1,
  translateX = 0,
  translateY = 0,
  badgeText = null,
  badgeColor = '#10b981',
}) => {
  return (
    <div
      style={{
        width: 1440,
        height: 820,
        backgroundColor: '#0b0f19',
        borderRadius: 24,
        border: '1.5px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 40px 100px -20px rgba(0, 0, 0, 0.8), 0 0 60px rgba(16, 185, 129, 0.15)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Top macOS Browser Header */}
      <div
        style={{
          height: 52,
          backgroundColor: '#111827',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#ef4444' }} />
          <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#f59e0b' }} />
          <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#10b981' }} />
          <div
            style={{
              marginLeft: 16,
              padding: '4px 14px',
              borderRadius: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              fontSize: 14,
              color: '#94a3b8',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span>🔒 sheetly.google.com</span>
            <span style={{ color: '#475569' }}>/</span>
            <span style={{ color: '#38bdf8' }}>{tag || 'Command OS'}</span>
          </div>
        </div>

        <div style={{ fontSize: 16, fontWeight: 700, color: '#e2e8f0' }}>
          {title}
        </div>

        <div
          style={{
            fontSize: 13,
            fontWeight: 800,
            padding: '5px 14px',
            borderRadius: 999,
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            color: '#10b981',
            border: '1px solid rgba(16, 185, 129, 0.3)',
          }}
        >
          LIVE INR AUTOPILOT
        </div>
      </div>

      {/* Viewport Frame with Smooth Ken-Burns Pan & Zoom */}
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#030712',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
            transformOrigin: 'center center',
            transition: 'transform 0.05s linear',
          }}
        >
          <Img
            src={staticFile(src)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </div>

        {/* Floating Spotlight Badge */}
        {badgeText && (
          <div
            style={{
              position: 'absolute',
              bottom: 28,
              right: 32,
              padding: '12px 24px',
              borderRadius: 14,
              backgroundColor: 'rgba(15, 23, 42, 0.92)',
              border: `2px solid ${badgeColor}`,
              boxShadow: `0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px ${badgeColor}40`,
              backdropFilter: 'blur(12px)',
              fontSize: 18,
              fontWeight: 800,
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              zIndex: 10,
            }}
          >
            <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: badgeColor }} />
            <span>{badgeText}</span>
          </div>
        )}
      </div>
    </div>
  );
};

// =========================================================================
// SCENE 1: HOOK & PAIN (0 - 470 frames | 0.00s - 15.67s)
// =========================================================================
const Scene1Hook = ({ frame, fps }) => {
  const popTitle = spring({ frame, fps, config: { damping: 12, stiffness: 120 } });
  const card1Spring = spring({ frame: frame - 45, fps, config: { damping: 14 } });
  const card2Spring = spring({ frame: frame - 90, fps, config: { damping: 14 } });
  const card3Spring = spring({ frame: frame - 135, fps, config: { damping: 14 } });
  const solutionSpring = spring({ frame: frame - 240, fps, config: { damping: 10, stiffness: 150 } });

  const showSolution = frame >= 240;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        padding: '0 80px',
        textAlign: 'center',
      }}
    >
      {!showSolution ? (
        <div style={{ transform: `scale(${popTitle})` }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 24px',
              borderRadius: 999,
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#f87171',
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: 2,
              marginBottom: 28,
            }}
          >
            <span>⚠️ THE MONTHLY SUBSCRIPTION TRAP</span>
          </div>

          <h1
            style={{
              fontSize: 70,
              fontWeight: 900,
              lineHeight: 1.15,
              marginBottom: 44,
              color: '#ffffff',
              letterSpacing: '-1.5px',
            }}
          >
            Business Abhi Bhi{' '}
            <span style={{ color: '#25D366' }}>WhatsApp Chats</span> Aur{' '}
            <span style={{ color: '#f43f5e' }}>Random Sheets</span> Par Chal Raha Hai?
          </h1>

          {/* 3 Pain Points Grid */}
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center' }}>
            <div
              style={{
                transform: `scale(${Math.max(0, card1Spring)})`,
                padding: '24px 32px',
                borderRadius: 18,
                backgroundColor: 'rgba(30, 41, 59, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                width: 380,
                textAlign: 'left',
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 12 }}>💸</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#f43f5e', marginBottom: 6 }}>
                ₹3,000–₹5,000 / Month
              </div>
              <div style={{ fontSize: 16, color: '#94a3b8', lineHeight: 1.4 }}>
                Wasted on complicated SaaS tools team barely updates.
              </div>
            </div>

            <div
              style={{
                transform: `scale(${Math.max(0, card2Spring)})`,
                padding: '24px 32px',
                borderRadius: 18,
                backgroundColor: 'rgba(30, 41, 59, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                width: 380,
                textAlign: 'left',
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 12 }}>⏳</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#f59e0b', marginBottom: 6 }}>
                Unpaid Overdue Bills
              </div>
              <div style={{ fontSize: 16, color: '#94a3b8', lineHeight: 1.4 }}>
                Lost payment follow-ups & zero automated reminders.
              </div>
            </div>

            <div
              style={{
                transform: `scale(${Math.max(0, card3Spring)})`,
                padding: '24px 32px',
                borderRadius: 18,
                backgroundColor: 'rgba(30, 41, 59, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                width: 380,
                textAlign: 'left',
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 12 }}>🤯</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#38bdf8', marginBottom: 6 }}>
                GST & Tax Panic
              </div>
              <div style={{ fontSize: 16, color: '#94a3b8', lineHeight: 1.4 }}>
                Manual formula mistakes and CA cleanup stress.
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ transform: `scale(${solutionSpring})` }}>
          <div
            style={{
              padding: '10px 28px',
              borderRadius: 999,
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              border: '2px solid #10b981',
              color: '#34d399',
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: 2,
              marginBottom: 24,
              display: 'inline-block',
            }}
          >
            🚀 THE SMART SOLUTION
          </div>
          <h1
            style={{
              fontSize: 84,
              fontWeight: 900,
              lineHeight: 1.1,
              color: '#ffffff',
              marginBottom: 20,
            }}
          >
            Meet <span style={{ color: '#10b981' }}>Sheetly 2.0</span>
          </h1>
          <p style={{ fontSize: 30, color: '#94a3b8', fontWeight: 600, maxWidth: 900, margin: '0 auto' }}>
            Complete 19-Tab Business, GST Billing & Profit OS Inside Google Sheets
          </p>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// SCENE 2: 19-TAB OS ARCHITECTURE & SETUP (470 - 1038 | 15.67s - 34.61s)
// =========================================================================
const Scene2SetupArchitecture = ({ frame, fps }) => {
  // Smooth slow Ken-Burns zoom on Executive Cockpit
  const zoom = interpolate(frame, [0, 568], [1.02, 1.18]);
  const panY = interpolate(frame, [0, 568], [0, -40]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <div style={{ marginBottom: 20, textAlign: 'center' }}>
        <span
          style={{
            fontSize: 16,
            fontWeight: 800,
            color: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            padding: '6px 20px',
            borderRadius: 999,
            textTransform: 'uppercase',
            letterSpacing: 1.5,
          }}
        >
          100% Native Google Sheets • Plug & Play
        </span>
        <h2 style={{ fontSize: 38, fontWeight: 900, color: '#ffffff', marginTop: 10 }}>
          19 Pre-Linked Automated Tabs — Zero Formula Skills Needed
        </h2>
      </div>

      <BrowserMockup
        title="Setup & Master Business Configuration (Takes 5 Mins)"
        tag="Setup Tab"
        src="Images/inr-executive-dashboard.webp"
        scale={zoom}
        translateY={panY}
        badgeText="⚡ One-Time Setup Configures All 19 Tabs"
        badgeColor="#10b981"
      />
    </div>
  );
};

// =========================================================================
// SCENE 3: EXECUTIVE COCKPIT & DASHBOARD (1038 - 1419 | 34.61s - 47.31s)
// =========================================================================
const Scene3Dashboard = ({ frame, fps }) => {
  const zoom = interpolate(frame, [0, 381], [1.15, 1.35]);
  const panX = interpolate(frame, [0, 381], [0, -80]);
  const panY = interpolate(frame, [0, 381], [-40, -100]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <div style={{ marginBottom: 20, textAlign: 'center' }}>
        <span
          style={{
            fontSize: 16,
            fontWeight: 800,
            color: '#38bdf8',
            backgroundColor: 'rgba(56, 189, 248, 0.15)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            padding: '6px 20px',
            borderRadius: 999,
            textTransform: 'uppercase',
            letterSpacing: 1.5,
          }}
        >
          Morning Executive Cockpit
        </span>
        <h2 style={{ fontSize: 38, fontWeight: 900, color: '#ffffff', marginTop: 10 }}>
          Total Business Clarity In 5 Seconds — Revenue, Tasks & Overdues
        </h2>
      </div>

      <BrowserMockup
        title="Executive ₹ Dashboard — Live Revenue & Operations Radar"
        tag="Dashboard"
        src="Images/inr-executive-dashboard.webp"
        scale={zoom}
        translateX={panX}
        translateY={panY}
        badgeText="🎯 Live Revenue Gauges + Overdue Radar"
        badgeColor="#38bdf8"
      />
    </div>
  );
};

// =========================================================================
// SCENE 4: 60-SEC GST INVOICE & SCAN-TO-PAY UPI QR (1419 - 2025 | 47.31s - 67.49s)
// =========================================================================
const Scene4InvoicingUPI = ({ frame, fps }) => {
  // Starts showing top invoice, then zooms deeply onto the UPI QR Code
  const zoom = interpolate(frame, [0, 250, 606], [1.05, 1.25, 1.75]);
  const panX = interpolate(frame, [0, 250, 606], [0, 0, 160]);
  const panY = interpolate(frame, [0, 250, 606], [0, -60, -220]);

  const showQrHighlight = frame >= 280;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <div style={{ marginBottom: 20, textAlign: 'center' }}>
        <span
          style={{
            fontSize: 16,
            fontWeight: 800,
            color: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            padding: '6px 20px',
            borderRadius: 999,
            textTransform: 'uppercase',
            letterSpacing: 1.5,
          }}
        >
          Automated GST Invoicing Engine
        </span>
        <h2 style={{ fontSize: 38, fontWeight: 900, color: '#ffffff', marginTop: 10 }}>
          {showQrHighlight ? 'Scan-to-Pay UPI QR Code (GPay / PhonePe / Paytm)' : 'Dropdown Selection → 60-Sec Print-Ready A4 GST Invoice'}
        </h2>
      </div>

      <BrowserMockup
        title="Print-Ready Tax Invoice with HSN/SAC & Dynamic UPI QR"
        tag="Tax Invoice"
        src="Images/gst-print-invoice.webp"
        scale={zoom}
        translateX={panX}
        translateY={panY}
        badgeText={showQrHighlight ? '📲 Instant Scan-to-Pay UPI QR Code' : '🧾 Auto CGST / SGST / IGST Calculations'}
        badgeColor={showQrHighlight ? '#22c55e' : '#10b981'}
      />
    </div>
  );
};

// =========================================================================
// SCENE 5: 1-CLICK WHATSAPP REMINDERS & LEDGER (2025 - 2412 | 67.49s - 80.38s)
// =========================================================================
const Scene5WhatsAppLedger = ({ frame, fps }) => {
  const zoom = interpolate(frame, [0, 387], [1.1, 1.4]);
  const panX = interpolate(frame, [0, 387], [0, -90]);
  const panY = interpolate(frame, [0, 387], [-30, -90]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <div style={{ marginBottom: 20, textAlign: 'center' }}>
        <span
          style={{
            fontSize: 16,
            fontWeight: 800,
            color: '#25D366',
            backgroundColor: 'rgba(37, 211, 102, 0.15)',
            border: '1px solid rgba(37, 211, 102, 0.3)',
            padding: '6px 20px',
            borderRadius: 999,
            textTransform: 'uppercase',
            letterSpacing: 1.5,
          }}
        >
          1-Click WhatsApp Follow-ups
        </span>
        <h2 style={{ fontSize: 38, fontWeight: 900, color: '#ffffff', marginTop: 10 }}>
          Recover Overdue Payments 3X Faster With Built-In WhatsApp Links
        </h2>
      </div>

      <BrowserMockup
        title="GST Invoice Ledger with Paid / Part-Paid / Unpaid Status"
        tag="Invoice Ledger"
        src="Images/gst-invoice-whatsapp.webp"
        scale={zoom}
        translateX={panX}
        translateY={panY}
        badgeText="💬 1-Click WhatsApp Reminder Sent In Seconds"
        badgeColor="#25D366"
      />
    </div>
  );
};

// =========================================================================
// SCENE 6: GSTR-1, 3B & CA TAX HUB (2412 - 2880 | 80.38s - 95.98s)
// =========================================================================
const Scene6TaxHub = ({ frame, fps }) => {
  const zoom = interpolate(frame, [0, 468], [1.08, 1.35]);
  const panY = interpolate(frame, [0, 468], [-10, -70]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <div style={{ marginBottom: 20, textAlign: 'center' }}>
        <span
          style={{
            fontSize: 16,
            fontWeight: 800,
            color: '#a855f7',
            backgroundColor: 'rgba(168, 85, 247, 0.15)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            padding: '6px 20px',
            borderRadius: 999,
            textTransform: 'uppercase',
            letterSpacing: 1.5,
          }}
        >
          Zero Tax Panic • CA-Ready In 30 Seconds
        </span>
        <h2 style={{ fontSize: 38, fontWeight: 900, color: '#ffffff', marginTop: 10 }}>
          GSTR-1 Output Tax, Expense ITC Shield & Net GSTR-3B Auto-Calculated
        </h2>
      </div>

      <BrowserMockup
        title="GSTR-1, GSTR-3B & Input Tax Credit (ITC) Command Hub"
        tag="Tax Intelligence"
        src="Images/gst-command-center.webp"
        scale={zoom}
        translateY={panY}
        badgeText="📊 Hand Clean Monthly Numbers to CA in 30 Seconds"
        badgeColor="#a855f7"
      />
    </div>
  );
};

// =========================================================================
// SCENE 7: CASHFLOW, CRM & SMART OPERATIONS (2880 - 3249 | 95.98s - 108.29s)
// =========================================================================
const Scene7Operations = ({ frame, fps }) => {
  const zoom = interpolate(frame, [0, 369], [1.05, 1.25]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <div style={{ marginBottom: 20, textAlign: 'center' }}>
        <span
          style={{
            fontSize: 16,
            fontWeight: 800,
            color: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            padding: '6px 20px',
            borderRadius: 999,
            textTransform: 'uppercase',
            letterSpacing: 1.5,
          }}
        >
          Full-Year Cashflow & CRM Intelligence
        </span>
        <h2 style={{ fontSize: 38, fontWeight: 900, color: '#ffffff', marginTop: 10 }}>
          Just 4 Daily Entries Auto-Update All 15 Financial & Operational Reports
        </h2>
      </div>

      <BrowserMockup
        title="12-Month Profit & Loss, Client Directory & Smart Calendar"
        tag="Finance Overview"
        src="Images/inr-monthly-overview.webp"
        scale={zoom}
        badgeText="📈 Auto P&L, UPI vs Bank Split & Net Margin"
        badgeColor="#f59e0b"
      />
    </div>
  );
};

// =========================================================================
// SCENE 8: FOUNDING 100 OFFER (₹499) & 7-DAY GUARANTEE (3249 - 3860)
// =========================================================================
const Scene8OfferCTA = ({ frame, fps }) => {
  const pop = spring({ frame, fps, config: { damping: 10, stiffness: 130 } });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        padding: '0 60px',
      }}
    >
      <div
        style={{
          transform: `scale(${pop})`,
          backgroundColor: '#0c121e',
          border: '2px solid rgba(16, 185, 129, 0.4)',
          borderRadius: 32,
          padding: '48px 80px',
          boxShadow: '0 30px 100px rgba(0, 0, 0, 0.9), 0 0 80px rgba(16, 185, 129, 0.25)',
          maxWidth: 1320,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '8px 24px',
            borderRadius: 999,
            backgroundColor: '#f59e0b',
            color: '#0f172a',
            fontSize: 18,
            fontWeight: 900,
            letterSpacing: 1.5,
            marginBottom: 20,
          }}
        >
          🔥 FOUNDING 100 EXCLUSIVE LAUNCH
        </div>

        <h1
          style={{
            fontSize: 64,
            fontWeight: 900,
            lineHeight: 1.1,
            color: '#ffffff',
            marginBottom: 16,
          }}
        >
          Sheetly 2.0 (India GST Edition)
        </h1>

        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 20, marginBottom: 24 }}>
          <span style={{ fontSize: 38, color: '#f43f5e', textDecoration: 'line-through', fontWeight: 800 }}>
            ₹899
          </span>
          <span style={{ fontSize: 104, color: '#10b981', fontWeight: 900, letterSpacing: -2 }}>
            ₹499
          </span>
          <span style={{ fontSize: 24, color: '#94a3b8', fontWeight: 700 }}>
            (ONE-TIME PAYMENT • LIFETIME ACCESS)
          </span>
        </div>

        {/* 3 Bonuses + Guarantee Row */}
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginBottom: 36 }}>
          <div style={{ padding: '12px 24px', borderRadius: 14, backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)', fontSize: 18, fontWeight: 700, color: '#e2e8f0' }}>
            🎁 3 Fast-Action Bonuses (Free)
          </div>
          <div style={{ padding: '12px 24px', borderRadius: 14, backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)', fontSize: 18, fontWeight: 700, color: '#e2e8f0' }}>
            ♾️ Free Lifetime Tab Updates
          </div>
          <div style={{ padding: '12px 24px', borderRadius: 14, backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', fontSize: 18, fontWeight: 700, color: '#34d399' }}>
            🛡️ 7-Day Working-System Guarantee
          </div>
        </div>

        <div
          style={{
            display: 'inline-block',
            padding: '20px 60px',
            borderRadius: 999,
            background: 'linear-gradient(90deg, #10b981, #059669)',
            fontSize: 28,
            fontWeight: 900,
            color: '#ffffff',
            boxShadow: '0 12px 35px rgba(16, 185, 129, 0.5)',
            letterSpacing: 1,
          }}
        >
          CLAIM INSTANT ACCESS FOR ₹499 →
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// MAIN ROOT COMPOSITION (1920x1080 | 16:9 | 3860 Frames | 128.67s)
// =========================================================================
export const SheetlyHomepageVideo = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#050811',
        backgroundImage: 'radial-gradient(ellipse at 50% 20%, rgba(16, 185, 129, 0.12) 0%, rgba(5, 8, 17, 1) 75%)',
        color: '#ffffff',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Segoe UI", Roboto, sans-serif',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Mixed Audio Track (Voiceover + Ambient Pad) */}
      <Audio src={staticFile('homepage_audio_mixed.wav')} />

      {/* Top Fixed Brand Watermark Bar */}
      <div
        style={{
          position: 'absolute',
          top: 36,
          left: 60,
          right: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 50,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              backgroundColor: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)',
              fontSize: 22,
            }}
          >
            📊
          </div>
          <div style={{ fontSize: 24, fontWeight: 900, color: '#ffffff', letterSpacing: -0.5 }}>
            Sheetly <span style={{ color: '#10b981' }}>2.0</span>
          </div>
        </div>

        <div
          style={{
            fontSize: 15,
            fontWeight: 800,
            padding: '8px 22px',
            borderRadius: 999,
            backgroundColor: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            color: '#fbbf24',
          }}
        >
          🔥 FOUNDING 100 • ₹499 (ONE-TIME)
        </div>
      </div>

      {/* Main Staged Sequences */}
      <div style={{ flex: 1, position: 'relative', width: '100%', height: '100%' }}>
        <Sequence from={0} durationInFrames={470}>
          <Scene1Hook frame={frame} fps={30} />
        </Sequence>

        <Sequence from={470} durationInFrames={568}>
          <Scene2SetupArchitecture frame={frame - 470} fps={30} />
        </Sequence>

        <Sequence from={1038} durationInFrames={381}>
          <Scene3Dashboard frame={frame - 1038} fps={30} />
        </Sequence>

        <Sequence from={1419} durationInFrames={606}>
          <Scene4InvoicingUPI frame={frame - 1419} fps={30} />
        </Sequence>

        <Sequence from={2025} durationInFrames={387}>
          <Scene5WhatsAppLedger frame={frame - 2025} fps={30} />
        </Sequence>

        <Sequence from={2412} durationInFrames={468}>
          <Scene6TaxHub frame={frame - 2412} fps={30} />
        </Sequence>

        <Sequence from={2880} durationInFrames={369}>
          <Scene7Operations frame={frame - 2880} fps={30} />
        </Sequence>

        <Sequence from={3249} durationInFrames={611}>
          <Scene8OfferCTA frame={frame - 3249} fps={30} />
        </Sequence>
      </div>

      {/* Bottom Sleek Progress Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 6,
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          zIndex: 50,
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${(frame / 3860) * 100}%`,
            background: 'linear-gradient(90deg, #10b981, #38bdf8)',
          }}
        />
      </div>
    </div>
  );
};

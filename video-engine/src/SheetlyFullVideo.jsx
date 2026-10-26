import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Sequence,
  Audio,
  staticFile,
} from 'remotion';

export const SheetlyFullVideo = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background subtle gradient pulse
  const bgHue = interpolate(frame, [0, 4076], [160, 220]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#06090e',
        color: '#ffffff',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Full 135.85s Audio Track */}
      <Audio src={staticFile('full_audio.wav')} />

      {/* Ambient glowing orb in the center */}
      <div
        style={{
          position: 'absolute',
          width: 850,
          height: 850,
          borderRadius: '50%',
          background: `radial-gradient(circle, hsla(${bgHue}, 80%, 45%, 0.22) 0%, rgba(6, 9, 14, 0) 70%)`,
          filter: 'blur(70px)',
          top: '30%',
          left: '12%',
          pointerEvents: 'none',
        }}
      />

      {/* Persistent Top Brand Pill */}
      <div
        style={{
          position: 'absolute',
          top: 90,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 28px',
          borderRadius: 999,
          background: 'rgba(255, 255, 255, 0.06)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          zIndex: 50,
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: '#10b981',
            boxShadow: '0 0 12px #10b981',
          }}
        />
        <span
          style={{
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: 2,
            color: '#e2e8f0',
            textTransform: 'uppercase',
          }}
        >
          Sheetly 2.0 Business OS
        </span>
      </div>

      {/* ========================================================
          PHASE 1: 0.00s - 3.44s (0 - 103 frames)
          Hook: Ruko! Ruko! Ruko! Scroll mat karo. Mujhe ek baat batao...
      ======================================================== */}
      <Sequence from={0} durationInFrames={103}>
        <SceneHook frame={frame} fps={fps} />
      </Sequence>

      {/* ========================================================
          PHASE 2: 3.44s - 13.58s (103 - 407 frames)
          Problem: WhatsApp ya Expensive SaaS? Time, Paisa, Growth lose!
      ======================================================== */}
      <Sequence from={103} durationInFrames={304}>
        <SceneWhatsAppSaaSChaos frame={frame - 103} fps={fps} />
      </Sequence>

      {/* ========================================================
          PHASE 3: 13.58s - 35.64s (407 - 1069 frames)
          Daily Chaos: Client numbers, payments missing, notes lost, deadlines miss!
      ======================================================== */}
      <Sequence from={407} durationInFrames={662}>
        <SceneDailyChaosDeepDive frame={frame - 407} fps={fps} />
      </Sequence>

      {/* ========================================================
          PHASE 4: 35.64s - 45.74s (1069 - 1372 frames)
          The Solution Reveal: Sheetly 2.0 All-In-One OS
      ======================================================== */}
      <Sequence from={1069} durationInFrames={303}>
        <SceneHeroSolutionReveal frame={frame - 1069} fps={fps} />
      </Sequence>

      {/* ========================================================
          PHASE 5: 45.74s - 56.72s (1372 - 1702 frames)
          Feature 1: Client Management CRM
      ======================================================== */}
      <Sequence from={1372} durationInFrames={330}>
        <SceneClientManagement frame={frame - 1372} fps={fps} />
      </Sequence>

      {/* ========================================================
          PHASE 6: 56.72s - 68.96s (1702 - 2069 frames)
          Feature 2: Task & Project Tracker
      ======================================================== */}
      <Sequence from={1702} durationInFrames={367}>
        <SceneTaskTracker frame={frame - 1702} fps={fps} />
      </Sequence>

      {/* ========================================================
          PHASE 7: 68.96s - 84.04s (2069 - 2521 frames)
          Feature 3: Invoice & Cashflow Management + Reports
      ======================================================== */}
      <Sequence from={2069} durationInFrames={452}>
        <SceneInvoiceManagement frame={frame - 2069} fps={fps} />
      </Sequence>

      {/* ========================================================
          PHASE 8: 84.04s - 114.14s (2521 - 3424 frames)
          18 Integrated Tabs Ecosystem
      ======================================================== */}
      <Sequence from={2521} durationInFrames={903}>
        <Scene18TabsEcosystem frame={frame - 2521} fps={fps} />
      </Sequence>

      {/* ========================================================
          PHASE 9: 114.14s - 121.60s (3424 - 3648 frames)
          The Offer: ₹899 Lifetime Access
      ======================================================== */}
      <Sequence from={3424} durationInFrames={224}>
        <SceneOfferPricing frame={frame - 3424} fps={fps} />
      </Sequence>

      {/* ========================================================
          PHASE 10: 121.60s - 135.85s (3648 - 4076 frames)
          Guarantee & Call to Action: Risk Mera Hai, Growth Aapki!
      ======================================================== */}
      <Sequence from={3648} durationInFrames={428}>
        <SceneGuaranteeCTA frame={frame - 3648} fps={fps} />
      </Sequence>

      {/* Persistent Bottom Progress Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: `${(frame / 4076) * 100}%`,
          height: 12,
          background: 'linear-gradient(90deg, #10b981, #06b6d4)',
          boxShadow: '0 0 20px #10b981',
          zIndex: 100,
        }}
      />
    </div>
  );
};

// ==========================================================
// SCENE 1: HOOK (0.00s - 3.44s | 0 - 103 frames)
// ==========================================================
const SceneHook = ({ frame, fps }) => {
  const pop1 = spring({ frame, fps, config: { damping: 10, stiffness: 140 } });
  const isScrollMatKaro = frame >= 38; // 1.28s
  const isMujheEkBaat = frame >= 64;   // 2.12s

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: 40 }}>
      <div
        style={{
          padding: '10px 24px',
          borderRadius: 16,
          backgroundColor: 'rgba(239, 68, 68, 0.15)',
          border: '2px solid #ef4444',
          color: '#ef4444',
          fontSize: 32,
          fontWeight: 900,
          letterSpacing: 3,
          marginBottom: 30,
        }}
      >
        🚨 STOP SCROLLING
      </div>

      {!isMujheEkBaat ? (
        <h1 style={{ fontSize: 110, fontWeight: 900, lineHeight: 1.1, margin: 0, transform: `scale(${pop1})` }}>
          <span style={{ color: '#ffffff' }}>RUKO! </span>
          <span style={{ color: '#facc15' }}>RUKO! </span>
          <br />
          {isScrollMatKaro ? (
            <span style={{ color: '#ef4444' }}>SCROLL MAT KARO! ✋</span>
          ) : (
            <span style={{ color: '#ffffff' }}>RUKO! 🛑</span>
          )}
        </h1>
      ) : (
        <h1 style={{ fontSize: 92, fontWeight: 900, lineHeight: 1.15, margin: 0, color: '#38bdf8' }}>
          MUJHE EK BAAT <br />
          <span style={{ color: '#ffffff' }}>BATAO... 🤔</span>
        </h1>
      )}
    </div>
  );
};

// ==========================================================
// SCENE 2: WHATSAPP / SAAS CHAOS (3.44s - 13.58s | 0 - 304 frames)
// ==========================================================
const SceneWhatsAppSaaSChaos = ({ frame, fps }) => {
  const isLossSegment = frame >= 156; // 8.74s (Agar haan, to time, paisa, growth lose kar rahe ho)
  const springIn = spring({ frame, fps, config: { damping: 12 } });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%', padding: '0 50px', transform: `scale(${springIn})` }}>
      {!isLossSegment ? (
        <>
          <div style={{ fontSize: 32, fontWeight: 800, color: '#38bdf8', letterSpacing: 2, marginBottom: 16 }}>
            ⚠️ CURRENT SITUATION
          </div>
          <h2 style={{ fontSize: 72, fontWeight: 900, lineHeight: 1.2, marginBottom: 36 }}>
            Business Abhi Bhi <br />
            <span style={{ color: '#25D366' }}>WhatsApp 💬</span> Ya <br />
            <span style={{ color: '#f43f5e' }}>Expensive SaaS Software 💸</span> <br />
            Par Chal Raha Hai?
          </h2>
          <div style={{ padding: '16px 36px', borderRadius: 999, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', fontSize: 28, color: '#94a3b8' }}>
            Paying ₹2,000 to ₹10,000 every single month?
          </div>
        </>
      ) : (
        <>
          <div style={{ fontSize: 30, fontWeight: 900, color: '#ef4444', letterSpacing: 3, marginBottom: 16 }}>
            ❌ ANJAANE MEIN MASSIVE LEAK
          </div>
          <h2 style={{ fontSize: 78, fontWeight: 900, lineHeight: 1.15, marginBottom: 30 }}>
            Teeno Lose Kar Rahe Ho:
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 840 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 32px', borderRadius: 16, background: 'rgba(234, 179, 8, 0.15)', border: '2px solid #eab308' }}>
              <span style={{ fontSize: 38, fontWeight: 900, color: '#facc15' }}>⏳ TIME</span>
              <span style={{ fontSize: 26, color: '#e2e8f0', fontWeight: 700 }}>2+ Hours Daily Lost in Chaos</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 32px', borderRadius: 16, background: 'rgba(34, 197, 94, 0.15)', border: '2px solid #22c55e' }}>
              <span style={{ fontSize: 38, fontWeight: 900, color: '#4ade80' }}>💰 PAISA</span>
              <span style={{ fontSize: 26, color: '#e2e8f0', fontWeight: 700 }}>Overdue Invoices Stalled</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 32px', borderRadius: 16, background: 'rgba(56, 189, 248, 0.15)', border: '2px solid #38bdf8' }}>
              <span style={{ fontSize: 38, fontWeight: 900, color: '#38bdf8' }}>📈 GROWTH</span>
              <span style={{ fontSize: 26, color: '#e2e8f0', fontWeight: 700 }}>Business Trapped in Low Scale</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// ==========================================================
// SCENE 3: DAILY CHAOS (13.58s - 35.64s | 0 - 662 frames)
// ==========================================================
const SceneDailyChaosDeepDive = ({ frame, fps }) => {
  // Sub-segments based on voice:
  // 13.58 - 20.0s (0 - 193): Client numbers lost, payment details missing
  // 20.0s - 27.0s (193 - 402): Tasks in diary, searching old chats
  // 27.0s - 35.6s (402 - 662): Followups miss, deadlines miss, payments atak gaye!
  const phase = frame < 193 ? 1 : frame < 402 ? 2 : 3;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%', padding: '0 50px' }}>
      {phase === 1 && (
        <div style={{ width: '100%', maxWidth: 880 }}>
          <div style={{ fontSize: 30, fontWeight: 900, color: '#f43f5e', letterSpacing: 2, marginBottom: 14 }}>
            🤯 SITUATION #1: ZERO RECORDS
          </div>
          <h2 style={{ fontSize: 72, fontWeight: 900, lineHeight: 1.2, marginBottom: 30 }}>
            Client Ka Number Ek Jagah Nahi... <br />
            <span style={{ color: '#facc15' }}>Payment Details Ka Pata Nahi!</span>
          </h2>
          <div style={{ background: 'rgba(15, 23, 42, 0.85)', borderRadius: 20, padding: 30, border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: 32, fontWeight: 700, color: '#f87171', marginBottom: 10 }}>"Kab paisa aa raha hai, kab ja raha hai?"</div>
            <div style={{ fontSize: 24, color: '#94a3b8' }}>Zero visibility on bank balance & pending collections.</div>
          </div>
        </div>
      )}

      {phase === 2 && (
        <div style={{ width: '100%', maxWidth: 880 }}>
          <div style={{ fontSize: 30, fontWeight: 900, color: '#a855f7', letterSpacing: 2, marginBottom: 14 }}>
            📑 SITUATION #2: UNORGANIZED NOTES
          </div>
          <h2 style={{ fontSize: 72, fontWeight: 900, lineHeight: 1.2, marginBottom: 30 }}>
            Tasks Ke Liye Alag Diary... <br />
            <span style={{ color: '#38bdf8' }}>Purani Chats Khol Ke Dhoondhna Padta Hai! 🔍</span>
          </h2>
          <div style={{ background: 'rgba(15, 23, 42, 0.85)', borderRadius: 20, padding: 30, border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: 28, color: '#e2e8f0', lineHeight: 1.6 }}>
              Files lost in WhatsApp groups. Important client requirements forgotten.
            </div>
          </div>
        </div>
      )}

      {phase === 3 && (
        <div style={{ width: '100%', maxWidth: 880 }}>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#ef4444', letterSpacing: 3, marginBottom: 20 }}>
            💥 THE NIGHTMARE CLIMAX
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ padding: '22px 30px', borderRadius: 16, background: 'rgba(239, 68, 68, 0.2)', border: '2px solid #ef4444', fontSize: 44, fontWeight: 900, color: '#fca5a5' }}>
              ❌ FOLLOW-UPS MISS!
            </div>
            <div style={{ padding: '22px 30px', borderRadius: 16, background: 'rgba(239, 68, 68, 0.2)', border: '2px solid #ef4444', fontSize: 44, fontWeight: 900, color: '#fca5a5' }}>
              ❌ DEADLINES MISS!
            </div>
            <div style={{ padding: '22px 30px', borderRadius: 16, background: 'rgba(245, 158, 11, 0.2)', border: '2px solid #f59e0b', fontSize: 44, fontWeight: 900, color: '#fde68a' }}>
              ❌ PAYMENTS ATTAK JAATE HAIN!
            </div>
          </div>
          <div style={{ marginTop: 24, fontSize: 32, color: '#94a3b8', fontWeight: 700 }}>
            Ye roz ka chaos business ki growth slow kar deta hai!
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================================
// SCENE 4: HERO SOLUTION (35.64s - 45.74s | 0 - 303 frames)
// ==========================================================
const SceneHeroSolutionReveal = ({ frame, fps }) => {
  const pop = spring({ frame, fps, config: { damping: 10, mass: 0.5 } });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', transform: `scale(${pop})`, padding: 40 }}>
      <div style={{ padding: '10px 28px', borderRadius: 999, background: 'rgba(16, 185, 129, 0.2)', border: '2px solid #10b981', color: '#34d399', fontSize: 30, fontWeight: 900, letterSpacing: 3, marginBottom: 24 }}>
        ✨ THE COMPLETE SOLUTION
      </div>
      <h1 style={{ fontSize: 100, fontWeight: 900, lineHeight: 1.05, margin: '0 0 24px 0' }}>
        SHEETLY 2.0 <br />
        <span style={{ background: 'linear-gradient(90deg, #10b981, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          BUSINESS OS 🚀
        </span>
      </h1>
      <p style={{ fontSize: 42, color: '#e2e8f0', fontWeight: 700, maxWidth: 850 }}>
        Jahan Tumhara Poora Business <br />
        <span style={{ color: '#facc15' }}>Ek Hi Jagah Organize Ho Jaata Hai!</span>
      </p>
    </div>
  );
};

// ==========================================================
// SCENE 5: FEATURE 1 - CLIENT CRM (45.74s - 56.72s | 0 - 330 frames)
// ==========================================================
const SceneClientManagement = ({ frame, fps }) => {
  const cardSpring = spring({ frame, fps, config: { damping: 12 } });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '0 50px', transform: `scale(${cardSpring})` }}>
      <div style={{ padding: '8px 24px', borderRadius: 12, background: 'rgba(56, 189, 248, 0.15)', border: '1px solid #38bdf8', color: '#38bdf8', fontSize: 26, fontWeight: 800, marginBottom: 16 }}>
        SYSTEM #1 • CRM
      </div>
      <h2 style={{ fontSize: 72, fontWeight: 900, textAlign: 'center', lineHeight: 1.15, marginBottom: 30 }}>
        Client Management 👥
      </h2>
      <div style={{ width: '100%', maxWidth: 880, background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(20px)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.15)', padding: 32 }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#ef4444' }} />
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#f59e0b' }} />
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#10b981' }} />
          <span style={{ marginLeft: 15, fontSize: 18, color: '#94a3b8', fontWeight: 600 }}>👥 Client Directory & Profiles</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {['Aman Sharma • Active Retainer (VIP)', 'Rohit Verma • High Priority Client', 'Digital Studio • ₹85,000 Contract'].map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 20px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize: 24, fontWeight: 700, color: '#ffffff' }}>{item}</span>
              <span style={{ fontSize: 20, color: '#34d399', fontWeight: 800 }}>Saved</span>
            </div>
          ))}
        </div>
      </div>
      <p style={{ fontSize: 32, color: '#38bdf8', fontWeight: 700, marginTop: 24, textAlign: 'center' }}>
        Name, Number, Email, Status & Priority — Sab Ek Jagah!
      </p>
    </div>
  );
};

// ==========================================================
// SCENE 6: FEATURE 2 - TASK TRACKER (56.72s - 68.96s | 0 - 367 frames)
// ==========================================================
const SceneTaskTracker = ({ frame, fps }) => {
  const cardSpring = spring({ frame, fps, config: { damping: 12 } });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '0 50px', transform: `scale(${cardSpring})` }}>
      <div style={{ padding: '8px 24px', borderRadius: 12, background: 'rgba(168, 85, 247, 0.15)', border: '1px solid #a855f7', color: '#c084fc', fontSize: 26, fontWeight: 800, marginBottom: 16 }}>
        SYSTEM #2 • OPERATIONS
      </div>
      <h2 style={{ fontSize: 72, fontWeight: 900, textAlign: 'center', lineHeight: 1.15, marginBottom: 30 }}>
        Task & Project Tracker ⏱️
      </h2>
      <div style={{ width: '100%', maxWidth: 880, background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(20px)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.15)', padding: 32 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 20px', borderRadius: 12, background: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22c55e' }}>
            <span style={{ fontSize: 24, fontWeight: 700, color: '#ffffff' }}>✅ Landing Page Redesign</span>
            <span style={{ fontSize: 18, color: '#4ade80', fontWeight: 800 }}>Completed</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 20px', borderRadius: 12, background: 'rgba(234, 179, 8, 0.1)', border: '1px solid #eab308' }}>
            <span style={{ fontSize: 24, fontWeight: 700, color: '#ffffff' }}>⏳ Ad Creatives Review</span>
            <span style={{ fontSize: 18, color: '#facc15', fontWeight: 800 }}>Due Today (5 PM)</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 20px', borderRadius: 12, background: 'rgba(56, 189, 248, 0.1)', border: '1px solid #38bdf8' }}>
            <span style={{ fontSize: 24, fontWeight: 700, color: '#ffffff' }}>📌 GST Invoice Dispatch</span>
            <span style={{ fontSize: 18, color: '#38bdf8', fontWeight: 800 }}>Assigned</span>
          </div>
        </div>
      </div>
      <p style={{ fontSize: 32, color: '#c084fc', fontWeight: 700, marginTop: 24, textAlign: 'center' }}>
        Priority Set Karo & Deadlines Track Karo — Zero Delays!
      </p>
    </div>
  );
};

// ==========================================================
// SCENE 7: FEATURE 3 - INVOICE & REPORTS (68.96s - 84.04s | 0 - 452 frames)
// ==========================================================
const SceneInvoiceManagement = ({ frame, fps }) => {
  const cardSpring = spring({ frame, fps, config: { damping: 12 } });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '0 50px', transform: `scale(${cardSpring})` }}>
      <div style={{ padding: '8px 24px', borderRadius: 12, background: 'rgba(34, 197, 94, 0.15)', border: '1px solid #22c55e', color: '#4ade80', fontSize: 26, fontWeight: 800, marginBottom: 16 }}>
        SYSTEM #3 • FINANCE
      </div>
      <h2 style={{ fontSize: 72, fontWeight: 900, textAlign: 'center', lineHeight: 1.15, marginBottom: 30 }}>
        Invoice Management 🧾
      </h2>
      <div style={{ width: '100%', maxWidth: 880, background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(20px)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.15)', padding: 32 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          <div style={{ padding: 20, borderRadius: 16, background: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22c55e' }}>
            <div style={{ fontSize: 18, color: '#86efac', fontWeight: 700 }}>PAID INVOICES</div>
            <div style={{ fontSize: 44, fontWeight: 900, color: '#ffffff' }}>₹3,45,000</div>
          </div>
          <div style={{ padding: 20, borderRadius: 16, background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444' }}>
            <div style={{ fontSize: 18, color: '#fca5a5', fontWeight: 700 }}>PENDING DUE</div>
            <div style={{ fontSize: 44, fontWeight: 900, color: '#ffffff' }}>₹45,000</div>
          </div>
        </div>
        <div style={{ padding: '16px 20px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', fontSize: 22, color: '#94a3b8', textAlign: 'center' }}>
          Detailed Monthly Profit, Expenses & Tax Reports in 1 Click!
        </div>
      </div>
    </div>
  );
};

// ==========================================================
// SCENE 8: 18 TABS ECOSYSTEM (84.04s - 114.14s | 0 - 903 frames)
// ==========================================================
const Scene18TabsEcosystem = ({ frame, fps }) => {
  const tabs = [
    'Executive Dashboard', 'Calendar Deadlines', 'Communication Log',
    'Income Tracking', 'Expense Tracking', 'Budget Planning',
    'Balance Tracking', 'Reconciliation Reports', 'Custom Business Analytics'
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%', padding: '0 40px' }}>
      <div style={{ padding: '8px 24px', borderRadius: 999, background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#34d399', fontSize: 26, fontWeight: 800, marginBottom: 16 }}>
        ⚡ COMPLETE BUSINESS ARCHITECTURE
      </div>
      <h2 style={{ fontSize: 72, fontWeight: 900, lineHeight: 1.15, marginBottom: 28 }}>
        18 Integrated Tabs <br />
        <span style={{ color: '#facc15' }}>Sab Kuch Ek Hi Place Par!</span>
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, width: '100%', maxWidth: 900 }}>
        {tabs.map((t, idx) => (
          <div key={idx} style={{ padding: '18px 20px', borderRadius: 14, background: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(255,255,255,0.1)', fontSize: 24, fontWeight: 700, color: '#e2e8f0' }}>
            ⚡ {t}
          </div>
        ))}
      </div>
      <p style={{ fontSize: 32, color: '#94a3b8', fontWeight: 600, marginTop: 24 }}>
        Normal Google Sheet nahi — Complete Operating System hai!
      </p>
    </div>
  );
};

// ==========================================================
// SCENE 9: OFFER PRICING (114.14s - 121.60s | 0 - 224 frames)
// ==========================================================
const SceneOfferPricing = ({ frame, fps }) => {
  const pop = spring({ frame, fps, config: { damping: 10, mass: 0.5 } });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', transform: `scale(${pop})`, padding: 40 }}>
      <div style={{ padding: '8px 24px', borderRadius: 8, background: '#facc15', color: '#0f172a', fontSize: 24, fontWeight: 900, marginBottom: 20 }}>
        🔥 SPECIAL LAUNCH OFFER
      </div>
      <h2 style={{ fontSize: 84, fontWeight: 900, lineHeight: 1.1, marginBottom: 20 }}>
        Sheetly 2.0 Aaj Milta Hai <br />
        <span style={{ fontSize: 130, color: '#10b981', display: 'block', margin: '10px 0' }}>SIRF ₹899</span>
      </h2>
      <div style={{ display: 'flex', gap: 16, fontSize: 30, color: '#94a3b8', fontWeight: 700 }}>
        <span>⚡ 1-Time Payment</span> • <span>♾️ Lifetime Access</span> • <span>🎁 2 Free Bonuses</span>
      </div>
    </div>
  );
};

// ==========================================================
// SCENE 10: GUARANTEE & CTA (121.60s - 135.85s | 0 - 428 frames)
// ==========================================================
const SceneGuaranteeCTA = ({ frame, fps }) => {
  const pop = spring({ frame, fps, config: { damping: 12 } });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', transform: `scale(${pop})`, padding: 40 }}>
      <div style={{ padding: '14px 32px', borderRadius: 999, background: 'rgba(34, 197, 94, 0.2)', border: '2px solid #22c55e', color: '#4ade80', fontSize: 32, fontWeight: 900, letterSpacing: 2, marginBottom: 24 }}>
        🛡️ 7-DAY 100% MONEY BACK GUARANTEE
      </div>
      <h2 style={{ fontSize: 88, fontWeight: 900, lineHeight: 1.1, marginBottom: 24 }}>
        Risk Mera Hai, <br />
        <span style={{ color: '#10b981' }}>Growth Aapki! 📈</span>
      </h2>
      <p style={{ fontSize: 36, color: '#e2e8f0', fontWeight: 600, maxWidth: 850, marginBottom: 40 }}>
        Apne business ko WhatsApp, expensive SaaS aur daily chaos se nikaal kar ek proper system do.
      </p>
      <div
        style={{
          padding: '24px 60px',
          borderRadius: 999,
          background: 'linear-gradient(90deg, #10b981, #059669)',
          boxShadow: '0 15px 40px rgba(16, 185, 129, 0.5)',
          fontSize: 40,
          fontWeight: 900,
          color: '#ffffff',
          letterSpacing: 1,
        }}
      >
        CLICK LINK BELOW TO GET SHEETLY 👇
      </div>
    </div>
  );
};

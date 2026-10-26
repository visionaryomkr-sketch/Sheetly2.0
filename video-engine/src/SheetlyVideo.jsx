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

export const SheetlyVideo = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Background subtle gradient pulse
  const bgHue = interpolate(frame, [0, 405], [160, 200]);

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
      {/* Voiceover Audio */}
      <Audio src={staticFile('audio.wav')} />

      {/* Ambient background glow orb */}
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: `radial-gradient(circle, hsla(${bgHue}, 80%, 45%, 0.22) 0%, rgba(6, 9, 14, 0) 70%)`,
          filter: 'blur(60px)',
          top: '30%',
          left: '14%',
          pointerEvents: 'none',
        }}
      />

      {/* Persistent Top Brand Pill */}
      <div
        style={{
          position: 'absolute',
          top: 100,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 28px',
          borderRadius: 999,
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
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
          Sheetly 2.0 OS
        </span>
      </div>

      {/* ========================================================
          SCENE 1: 0 - 2.2s (Hook: RUKO RUKO! SCROLL MAT KARO)
      ======================================================== */}
      <Sequence from={0} durationInFrames={66}>
        <Scene1Hook frame={frame} fps={fps} />
      </Sequence>

      {/* ========================================================
          SCENE 2: 2.2 - 5.5s (Agitation: Running on WhatsApp?)
      ======================================================== */}
      <Sequence from={66} durationInFrames={99}>
        <Scene2Agitation frame={frame - 66} fps={fps} />
      </Sequence>

      {/* ========================================================
          SCENE 3: 5.5 - 9.0s (SaaS Nightmare: Losing Time & Paisa)
      ======================================================== */}
      <Sequence from={165} durationInFrames={105}>
        <Scene3LosingEverything frame={frame - 165} fps={fps} />
      </Sequence>

      {/* ========================================================
          SCENE 4: 9.0 - 13.5s (The Solution & Offer: Sheetly ₹899)
      ======================================================== */}
      <Sequence from={270} durationInFrames={135}>
        <Scene4SolutionOffer frame={frame - 270} fps={fps} />
      </Sequence>

      {/* Persistent Bottom Progress Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: `${(frame / 405) * 100}%`,
          height: 12,
          background: 'linear-gradient(90deg, #10b981, #06b6d4)',
          boxShadow: '0 0 20px #10b981',
        }}
      />
    </div>
  );
};

// ==========================================
// SCENE 1: HOOK COMPONENT
// ==========================================
const Scene1Hook = ({ frame, fps }) => {
  const pop = spring({ frame, fps, config: { damping: 10, mass: 0.5, stiffness: 140 } });
  const pulse = Math.sin(frame * 0.2) * 5;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        transform: `scale(${pop})`,
        padding: 40,
      }}
    >
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
          boxShadow: '0 0 30px rgba(239, 68, 68, 0.3)',
        }}
      >
        🚨 STOP SCROLLING
      </div>

      <h1
        style={{
          fontSize: 120,
          fontWeight: 900,
          lineHeight: 1.05,
          margin: 0,
          letterSpacing: -2,
          textShadow: '0 10px 40px rgba(0,0,0,0.8)',
        }}
      >
        <span style={{ color: '#ffffff' }}>RUKO! </span>
        <span style={{ color: '#facc15' }}>RUKO! </span>
        <br />
        <span
          style={{
            color: '#ef4444',
            display: 'inline-block',
            transform: `scale(${1 + pulse * 0.01})`,
          }}
        >
          SCROLL MAT KARO! ✋
        </span>
      </h1>

      <p
        style={{
          fontSize: 38,
          color: '#94a3b8',
          marginTop: 40,
          fontWeight: 600,
          maxWidth: 800,
        }}
      >
        Are you losing thousands of rupees every month?
      </p>
    </div>
  );
};

// ==========================================
// SCENE 2: AGITATION (WHATSAPP CHAOS)
// ==========================================
const Scene2Agitation = ({ frame, fps }) => {
  const cardSpring = spring({ frame, fps, config: { damping: 12, mass: 0.6 } });
  const float = Math.sin(frame * 0.1) * 8;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${cardSpring}) translateY(${float}px)`,
        width: '100%',
        padding: '0 60px',
      }}
    >
      <div
        style={{
          fontSize: 32,
          fontWeight: 800,
          color: '#38bdf8',
          letterSpacing: 2,
          marginBottom: 20,
          textTransform: 'uppercase',
        }}
      >
        🤔 Mujhe Ek Baat Batao...
      </div>

      <h2
        style={{
          fontSize: 76,
          fontWeight: 900,
          textAlign: 'center',
          lineHeight: 1.15,
          marginBottom: 40,
        }}
      >
        Business Abhi Bhi <br />
        <span
          style={{
            background: 'linear-gradient(90deg, #25D366, #34d399)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          WhatsApp Pe Chal Raha Hai? 💬
        </span>
      </h2>

      {/* Realistic Mac OS App Window with Red Overdue Alerts */}
      <div
        style={{
          width: '100%',
          maxWidth: 900,
          borderRadius: 24,
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.6)',
          overflow: 'hidden',
          padding: 30,
        }}
      >
        {/* Window controls */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#ef4444' }} />
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#f59e0b' }} />
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#10b981' }} />
          <span style={{ marginLeft: 15, fontSize: 16, color: '#64748b', fontWeight: 600 }}>Daily Business Chaos Inspector</span>
        </div>

        {/* Chaos Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 20px',
              borderRadius: 14,
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
            }}
          >
            <span style={{ fontSize: 24, fontWeight: 700, color: '#f87171' }}>❌ Client Numbers Lost in Chats</span>
            <span style={{ fontSize: 18, color: '#fca5a5', fontWeight: 800 }}>142 Unread</span>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 20px',
              borderRadius: 14,
              background: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
            }}
          >
            <span style={{ fontSize: 24, fontWeight: 700, color: '#fbbf24' }}>⚠️ Unpaid Invoices Stalled</span>
            <span style={{ fontSize: 20, color: '#fde68a', fontWeight: 800 }}>₹1,85,000 Overdue</span>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 20px',
              borderRadius: 14,
              background: 'rgba(168, 85, 247, 0.12)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
            }}
          >
            <span style={{ fontSize: 24, fontWeight: 700, color: '#c084fc' }}>📝 Tasks Forgotten on Diary</span>
            <span style={{ fontSize: 18, color: '#e9d5ff', fontWeight: 800 }}>Deadline Missed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 3: LOSING TIME & MONEY
// ==========================================
const Scene3LosingEverything = ({ frame, fps }) => {
  const shake = Math.sin(frame * 0.8) * Math.max(0, 10 - frame * 0.1);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        transform: `translateX(${shake}px)`,
        padding: 40,
      }}
    >
      <div
        style={{
          padding: '8px 24px',
          borderRadius: 999,
          background: 'rgba(244, 63, 94, 0.15)',
          color: '#fb7185',
          fontSize: 28,
          fontWeight: 800,
          letterSpacing: 2,
          marginBottom: 24,
          border: '1px solid rgba(244, 63, 94, 0.3)',
        }}
      >
        💸 UNNOTICED LEAK
      </div>

      <h2
        style={{
          fontSize: 82,
          fontWeight: 900,
          lineHeight: 1.15,
          color: '#ffffff',
          marginBottom: 30,
        }}
      >
        Anjaane Mein Ye <br />
        <span style={{ color: '#ef4444' }}>3 Cheezein Lose Kar Rahe Ho:</span>
      </h2>

      {/* 3 Metrics Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', maxWidth: 840 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '24px 36px',
            borderRadius: 20,
            background: 'linear-gradient(90deg, rgba(239, 68, 68, 0.2), rgba(15, 23, 42, 0.8))',
            border: '2px solid #ef4444',
            boxShadow: '0 10px 30px rgba(239, 68, 68, 0.2)',
          }}
        >
          <span style={{ fontSize: 44, fontWeight: 900, color: '#fef08a' }}>⏳ TIME</span>
          <span style={{ fontSize: 32, fontWeight: 700, color: '#cbd5e1' }}>Lost in Admin Chaos</span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '24px 36px',
            borderRadius: 20,
            background: 'linear-gradient(90deg, rgba(234, 179, 8, 0.2), rgba(15, 23, 42, 0.8))',
            border: '2px solid #eab308',
            boxShadow: '0 10px 30px rgba(234, 179, 8, 0.2)',
          }}
        >
          <span style={{ fontSize: 44, fontWeight: 900, color: '#fef08a' }}>💰 PAISA</span>
          <span style={{ fontSize: 32, fontWeight: 700, color: '#cbd5e1' }}>Overdue Invoices Stalled</span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '24px 36px',
            borderRadius: 20,
            background: 'linear-gradient(90deg, rgba(56, 189, 248, 0.2), rgba(15, 23, 42, 0.8))',
            border: '2px solid #38bdf8',
            boxShadow: '0 10px 30px rgba(56, 189, 248, 0.2)',
          }}
        >
          <span style={{ fontSize: 44, fontWeight: 900, color: '#38bdf8' }}>📈 GROWTH</span>
          <span style={{ fontSize: 32, fontWeight: 700, color: '#cbd5e1' }}>Stuck at Same Revenue</span>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 4: THE SOLUTION (SHEETLY 2.0 @ ₹899)
// ==========================================
const Scene4SolutionOffer = ({ frame, fps }) => {
  const heroSpring = spring({ frame, fps, config: { damping: 10, mass: 0.5 } });
  const glowPulse = Math.sin(frame * 0.15) * 15;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${heroSpring})`,
        textAlign: 'center',
        padding: '0 40px',
      }}
    >
      <div
        style={{
          padding: '10px 30px',
          borderRadius: 999,
          background: 'rgba(16, 185, 129, 0.2)',
          border: '2px solid #10b981',
          color: '#34d399',
          fontSize: 28,
          fontWeight: 800,
          letterSpacing: 3,
          marginBottom: 20,
          boxShadow: `0 0 ${30 + glowPulse}px rgba(16, 185, 129, 0.5)`,
        }}
      >
        ✨ THE COMPLETE SOLUTION
      </div>

      <h1
        style={{
          fontSize: 98,
          fontWeight: 900,
          lineHeight: 1.05,
          margin: '0 0 20px 0',
          letterSpacing: -2,
        }}
      >
        SHEETLY 2.0 <br />
        <span
          style={{
            background: 'linear-gradient(90deg, #10b981, #06b6d4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          BUSINESS OS 🚀
        </span>
      </h1>

      <p style={{ fontSize: 34, color: '#94a3b8', margin: '0 0 36px 0', fontWeight: 600 }}>
        18 Integrated Tabs • CRM • Invoicing • Cashflow
      </p>

      {/* Pricing Card */}
      <div
        style={{
          width: '100%',
          maxWidth: 820,
          borderRadius: 30,
          background: 'linear-gradient(145deg, rgba(16, 185, 129, 0.15), rgba(15, 23, 42, 0.95))',
          border: '2px solid rgba(16, 185, 129, 0.4)',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.7)',
          padding: '36px 40px',
          marginBottom: 40,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ fontSize: 28, color: '#94a3b8', textDecoration: 'line-through' }}>Regular: ₹9,999</span>
          <span
            style={{
              padding: '6px 16px',
              borderRadius: 8,
              background: '#facc15',
              color: '#0f172a',
              fontWeight: 900,
              fontSize: 22,
            }}
          >
            SAVE 92% TODAY
          </span>
        </div>

        <div style={{ fontSize: 96, fontWeight: 900, color: '#10b981', lineHeight: 1 }}>
          ₹899 <span style={{ fontSize: 32, color: '#94a3b8', fontWeight: 600 }}>ONLY</span>
        </div>

        <div style={{ fontSize: 26, color: '#cbd5e1', marginTop: 14, fontWeight: 600 }}>
          ⚡ One-Time Payment • Lifetime Access • 7-Day Guarantee
        </div>
      </div>

      {/* CTA Button */}
      <div
        style={{
          padding: '24px 60px',
          borderRadius: 999,
          background: 'linear-gradient(90deg, #10b981, #059669)',
          boxShadow: '0 15px 40px rgba(16, 185, 129, 0.5)',
          fontSize: 38,
          fontWeight: 900,
          color: '#ffffff',
          letterSpacing: 1,
        }}
      >
        CLICK LINK BELOW TO ACCESS 👇
      </div>
    </div>
  );
};

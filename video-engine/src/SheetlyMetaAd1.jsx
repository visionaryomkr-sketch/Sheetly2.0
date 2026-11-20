import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Sequence,
  Audio,
  Video,
  Img,
  staticFile,
} from 'remotion';

// =========================================================================
// REUSABLE GLASS CARD WRAPPER
// =========================================================================
const GlassCard = ({ children, style = {}, glow = 'rgba(16, 185, 129, 0.2)' }) => (
  <div
    style={{
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(20px)',
      border: '1.5px solid rgba(255, 255, 255, 0.12)',
      borderRadius: 28,
      boxShadow: `0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px ${glow}`,
      overflow: 'hidden',
      ...style,
    }}
  >
    {children}
  </div>
);

// =========================================================================
// MAC WINDOW CONTAINER FOR SCREEN RECORDING CLIPS
// =========================================================================
const MacClipPlayer = ({
  title,
  tag,
  videoSrc,
  scale = 1,
  transformOrigin = 'center center',
  badgeText = null,
  badgeColor = '#10b981',
  badgePosition = 'bottom-right', // 'bottom-right', 'bottom-left', 'top-right'
}) => {
  const getBadgeStyle = () => {
    const base = {
      position: 'absolute',
      padding: '10px 22px',
      borderRadius: 999,
      backgroundColor: badgeColor,
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 800,
      boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      zIndex: 30,
    };
    if (badgePosition === 'top-right') {
      return { ...base, top: 24, right: 24 };
    }
    if (badgePosition === 'bottom-left') {
      return { ...base, bottom: 24, left: 24 };
    }
    return { ...base, bottom: 24, right: 24 };
  };

  return (
    <div
      style={{
        width: 980,
        height: 820,
        backgroundColor: '#0a0f1d',
        borderRadius: 24,
        border: '1.5px solid rgba(255, 255, 255, 0.14)',
        boxShadow: '0 30px 80px -15px rgba(0,0,0,0.85), 0 0 50px rgba(16, 185, 129, 0.15)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* macOS Top Bar */}
      <div
        style={{
          height: 48,
          backgroundColor: '#111827',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: 13, height: 13, borderRadius: '50%', backgroundColor: '#ef4444' }} />
          <div style={{ width: 13, height: 13, borderRadius: '50%', backgroundColor: '#f59e0b' }} />
          <div style={{ width: 13, height: 13, borderRadius: '50%', backgroundColor: '#10b981' }} />
          <div
            style={{
              marginLeft: 14,
              padding: '3px 12px',
              borderRadius: 6,
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              fontSize: 13,
              color: '#94a3b8',
              fontWeight: 600,
            }}
          >
            sheetly.google.com/{tag || 'tab'}
          </div>
        </div>

        <div style={{ fontSize: 13, fontWeight: 700, color: '#38bdf8' }}>
          {title}
        </div>
      </div>

      {/* Video Content with zoom */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#050811',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            transform: `scale(${scale})`,
            transformOrigin: transformOrigin,
          }}
        >
          <Video
            src={staticFile(videoSrc)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </div>

        {badgeText && (
          <div style={getBadgeStyle()}>
            {badgeText}
          </div>
        )}
      </div>
    </div>
  );
};

// =========================================================================
// SCENE 1: THE HOOK (0.00s -> 7.00s | Frames 0 -> 210)
// "Sach batao. Aap din bhar client work mein busy rehte ho ya apne hi business ka admin work sambhalte sambhalte thak jaate ho?"
// =========================================================================
const Scene1Hook = ({ frame, fps }) => {
  const pop1 = spring({ frame, fps, config: { damping: 12 } });
  const pop2 = spring({ frame: frame - 45, fps, config: { damping: 12 } });
  const pop3 = spring({ frame: frame - 120, fps, config: { damping: 10 } });

  // Stressed shake effect for "THAK JAATE HO?"
  const shake = frame > 120 ? Math.sin(frame * 0.8) * 6 : 0;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 60px',
        position: 'relative',
      }}
    >
      {/* Top Floating Question Pill */}
      <div
        style={{
          transform: `scale(${Math.min(1, pop1)})`,
          padding: '14px 34px',
          borderRadius: 999,
          backgroundColor: 'rgba(251, 191, 36, 0.15)',
          border: '1.5px solid rgba(251, 191, 36, 0.4)',
          color: '#fbbf24',
          fontSize: 28,
          fontWeight: 900,
          letterSpacing: 1,
          marginBottom: 48,
          boxShadow: '0 0 35px rgba(251, 191, 36, 0.25)',
        }}
      >
        SACH BATAO... 🤔
      </div>

      {/* Main Kinetic Typography */}
      <div
        style={{
          textAlign: 'center',
          maxWidth: 960,
          lineHeight: 1.25,
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: '#e2e8f0',
            opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' }),
            transform: `translateY(${interpolate(frame, [0, 20], [30, 0], { extrapolateRight: 'clamp' })}px)`,
          }}
        >
          Aap din bhar <span style={{ color: '#38bdf8', fontWeight: 900 }}>Client Work</span> mein busy rehte ho...
        </div>

        {frame >= 45 && (
          <div
            style={{
              marginTop: 32,
              fontSize: 48,
              fontWeight: 800,
              color: '#94a3b8',
              transform: `scale(${pop2})`,
            }}
          >
            ya apne hi business ka <span style={{ color: '#f87171' }}>Admin Work</span> sambhalte sambhalte...
          </div>
        )}

        {frame >= 120 && (
          <div
            style={{
              marginTop: 44,
              fontSize: 72,
              fontWeight: 900,
              color: '#ef4444',
              textShadow: '0 0 40px rgba(239, 68, 68, 0.6)',
              transform: `scale(${pop3}) translateX(${shake}px)`,
              letterSpacing: -1,
            }}
          >
            THAK JAATE HO? 😫
          </div>
        )}
      </div>

      {/* Visual Metaphor: Draining Battery Icon */}
      {frame >= 100 && (
        <div
          style={{
            marginTop: 60,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '16px 32px',
            borderRadius: 20,
            backgroundColor: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
          }}
        >
          <div style={{ fontSize: 36 }}>🪫</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#fca5a5' }}>
            Energy Drained in Repetitive Admin Chaos
          </div>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// SCENE 2: THE FRAGMENTED CHAOS (7.00s -> 22.00s | Frames 210 -> 660)
// "Ek naya client aata hai to details WhatsApp par, tasks notebook mein, invoice Canva ya Word par banao, aur month end par CA ke liye saara data dobara dhoondo..."
// =========================================================================
const Scene2Chaos = ({ frame, fps }) => {
  const popCard1 = spring({ frame, fps, config: { damping: 12 } });
  const popCard2 = spring({ frame: frame - 90, fps, config: { damping: 12 } });
  const popCard3 = spring({ frame: frame - 180, fps, config: { damping: 12 } });
  const popCard4 = spring({ frame: frame - 280, fps, config: { damping: 12 } });
  const popAlert = spring({ frame: frame - 370, fps, config: { damping: 10 } });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 60px',
        position: 'relative',
      }}
    >
      {/* Top Warning Banner */}
      <div
        style={{
          position: 'absolute',
          top: 140,
          padding: '10px 28px',
          borderRadius: 999,
          backgroundColor: 'rgba(239, 68, 68, 0.15)',
          border: '1.5px solid rgba(239, 68, 68, 0.35)',
          color: '#f87171',
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: 1,
        }}
      >
        ⚠️ THE SCATTERED ADMIN TRAP
      </div>

      <div
        style={{
          fontSize: 44,
          fontWeight: 900,
          color: '#ffffff',
          textAlign: 'center',
          marginBottom: 44,
          maxWidth: 900,
        }}
      >
        Ek Naya Client Aata Hai Toh...
      </div>

      {/* 4 Staggered Chaos Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', maxWidth: 900 }}>
        {/* 1. WhatsApp Card */}
        {frame >= 0 && (
          <div
            style={{
              transform: `scale(${popCard1})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '24px 32px',
              borderRadius: 22,
              backgroundColor: 'rgba(37, 211, 102, 0.12)',
              border: '1.5px solid rgba(37, 211, 102, 0.35)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <span style={{ fontSize: 44 }}>💬</span>
              <div>
                <div style={{ fontSize: 30, fontWeight: 900, color: '#25d366' }}>
                  Details WhatsApp Par
                </div>
                <div style={{ fontSize: 19, color: '#94a3b8', marginTop: 4 }}>
                  Chats scroll karke requirements dhoondo...
                </div>
              </div>
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#ef4444' }}>❌ Lost Data</div>
          </div>
        )}

        {/* 2. Tasks Card */}
        {frame >= 90 && (
          <div
            style={{
              transform: `scale(${popCard2})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '24px 32px',
              borderRadius: 22,
              backgroundColor: 'rgba(245, 158, 11, 0.12)',
              border: '1.5px solid rgba(245, 158, 11, 0.35)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <span style={{ fontSize: 44 }}>📝</span>
              <div>
                <div style={{ fontSize: 30, fontWeight: 900, color: '#fbbf24' }}>
                  Tasks Notebook / Diary Mein
                </div>
                <div style={{ fontSize: 19, color: '#94a3b8', marginTop: 4 }}>
                  Handwritten notes jo kahin kho jaate hain
                </div>
              </div>
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#ef4444' }}>❌ Missed Deadlines</div>
          </div>
        )}

        {/* 3. Invoice Card */}
        {frame >= 180 && (
          <div
            style={{
              transform: `scale(${popCard3})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '24px 32px',
              borderRadius: 22,
              backgroundColor: 'rgba(56, 189, 248, 0.12)',
              border: '1.5px solid rgba(56, 189, 248, 0.35)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <span style={{ fontSize: 44 }}>📄</span>
              <div>
                <div style={{ fontSize: 30, fontWeight: 900, color: '#38bdf8' }}>
                  Invoice Canva / Word Par
                </div>
                <div style={{ fontSize: 19, color: '#94a3b8', marginTop: 4 }}>
                  Har baar manual copy-paste & formula math
                </div>
              </div>
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#ef4444' }}>❌ 45 Mins Waste</div>
          </div>
        )}

        {/* 4. Month-end CA Card */}
        {frame >= 280 && (
          <div
            style={{
              transform: `scale(${popCard4})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '24px 32px',
              borderRadius: 22,
              backgroundColor: 'rgba(168, 85, 247, 0.12)',
              border: '1.5px solid rgba(168, 85, 247, 0.35)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <span style={{ fontSize: 44 }}>📊</span>
              <div>
                <div style={{ fontSize: 30, fontWeight: 900, color: '#c084fc' }}>
                  Month End Par CA Ke Liye Dhoondo
                </div>
                <div style={{ fontSize: 19, color: '#94a3b8', marginTop: 4 }}>
                  GSTR-1, 3B aur ITC calculate karne ka panic
                </div>
              </div>
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#ef4444' }}>❌ Tax Headache</div>
          </div>
        )}
      </div>

      {/* Climax Red Callout */}
      {frame >= 370 && (
        <div
          style={{
            marginTop: 40,
            transform: `scale(${popAlert})`,
            padding: '20px 48px',
            borderRadius: 24,
            backgroundColor: '#ef4444',
            color: '#ffffff',
            fontSize: 34,
            fontWeight: 900,
            boxShadow: '0 20px 50px rgba(239, 68, 68, 0.5)',
            letterSpacing: 0.5,
          }}
        >
          🚨 POORA WEEK REPEAT KARTE NIKAL JAATA HAI!
        </div>
      )}
    </div>
  );
};

// =========================================================================
// SCENE 3: THE SOLUTION REVEAL (22.00s -> 36.80s | Frames 660 -> 1104)
// "Ab live dekho kaise Sheetly 2.0 aapka yeh saara manual work ek single Google Sheet mein automate karta hai. Yeh koi normal spreadsheet nahi..."
// =========================================================================
const Scene3SolutionReveal = ({ frame, fps }) => {
  const popTitle = spring({ frame, fps, config: { damping: 10 } });
  const zoom = interpolate(frame, [0, 444], [1, 1.08], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 50px',
        position: 'relative',
      }}
    >
      {/* Glow Backdrop */}
      <div
        style={{
          position: 'absolute',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, rgba(5, 8, 17, 0) 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      {/* Headline */}
      <div
        style={{
          textAlign: 'center',
          transform: `scale(${popTitle})`,
          marginBottom: 36,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '8px 24px',
            borderRadius: 999,
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1.5px solid rgba(16, 185, 129, 0.4)',
            color: '#10b981',
            fontSize: 20,
            fontWeight: 800,
            marginBottom: 16,
          }}
        >
          ⚡ THE ALL-IN-ONE SOLUTION
        </div>
        <div style={{ fontSize: 58, fontWeight: 900, color: '#ffffff', letterSpacing: -1 }}>
          Meet Sheetly <span style={{ color: '#10b981' }}>2.0</span>
        </div>
        <div style={{ fontSize: 24, color: '#94a3b8', fontWeight: 600, marginTop: 8 }}>
          Not a blank sheet — A Complete 19-Tab Business Operating System!
        </div>
      </div>

      {/* Video Container showing Real Setup / CRM Screen */}
      <MacClipPlayer
        title="19 Pre-Linked Tabs Inside Google Drive"
        tag="client-crm"
        videoSrc="clips/Clip_07_Client_CRM.mp4"
        scale={zoom}
        transformOrigin="top center"
        badgeText="⚡ 100% Pre-Built Formulas"
        badgeColor="#10b981"
        badgePosition="top-right"
      />

      {/* Quick Feature Badges Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12,
          marginTop: 28,
          width: '100%',
          maxWidth: 980,
        }}
      >
        {[
          '🧾 Branded GST Bills',
          '📲 Scan-to-Pay UPI QR',
          '💬 1-Click WhatsApp',
          '📊 GSTR-1 & 3B Hub',
          '📈 12-Month P&L',
          '🎯 Executive Cockpit',
        ].map((item, idx) => (
          <div
            key={idx}
            style={{
              padding: '12px 14px',
              borderRadius: 14,
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              fontSize: 16,
              fontWeight: 700,
              color: '#e2e8f0',
              textAlign: 'center',
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

// =========================================================================
// SCENE 4: LIVE DEMO - 60-SEC INVOICE & UPI QR (36.80s -> 50.30s | Frames 1104 -> 1509)
// "Client CRM mein client add kiya, aur invoice tab mein dropdown select karte hi dynamic UPI QR wala GST bill ready..."
// =========================================================================
const Scene4LiveDemoInvoice = ({ frame, fps }) => {
  const zoom = interpolate(frame, [0, 405], [1.02, 1.18], { extrapolateRight: 'clamp' });
  const showWhatsApp = frame >= 240; // ~45s in audio

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 50px',
        position: 'relative',
      }}
    >
      {/* Top Floating Badge */}
      <div
        style={{
          marginBottom: 24,
          padding: '12px 30px',
          borderRadius: 999,
          backgroundColor: 'rgba(34, 197, 94, 0.15)',
          border: '1.5px solid rgba(34, 197, 94, 0.4)',
          color: '#22c55e',
          fontSize: 22,
          fontWeight: 800,
        }}
      >
        ✨ 60-SECOND GST INVOICING + UPI QR
      </div>

      {/* Screen Recording Video: Print Invoice with UPI QR (Badge positioned top-right so QR code is unobstructed!) */}
      <MacClipPlayer
        title="Tax Invoice Tab • Dynamic Scan-to-Pay QR"
        tag="print-invoice"
        videoSrc="clips/Clip_04_Print_Invoice_UPI_QR.mp4"
        scale={zoom}
        transformOrigin="bottom right"
        badgeText="📲 Exact Bill Amount UPI QR"
        badgeColor="#22c55e"
        badgePosition="top-right"
      />

      {/* Live Feature Highlights Below Window */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          width: '100%',
          maxWidth: 980,
          marginTop: 28,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '14px 24px',
            borderRadius: 16,
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
          }}
        >
          <div style={{ fontSize: 28 }}>👉</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#ffffff' }}>
            <span style={{ color: '#10b981' }}>1. Dropdown Select:</span> Client details, HSN codes & GST auto-fill!
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '14px 24px',
            borderRadius: 16,
            backgroundColor: 'rgba(56, 189, 248, 0.1)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
          }}
        >
          <div style={{ fontSize: 28 }}>📲</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#ffffff' }}>
            <span style={{ color: '#38bdf8' }}>2. Dynamic UPI QR:</span> Client scans on PhonePe/GPay & pays instantly!
          </div>
        </div>

        {showWhatsApp && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '14px 24px',
              borderRadius: 16,
              backgroundColor: 'rgba(37, 211, 102, 0.18)',
              border: '1.5px solid rgba(37, 211, 102, 0.5)',
              boxShadow: '0 0 30px rgba(37, 211, 102, 0.3)',
            }}
          >
            <div style={{ fontSize: 28 }}>💬</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#25d366' }}>
              3. 1-Click WhatsApp Button: Prefilled payment message sent in 2 seconds!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// =========================================================================
// SCENE 5: ZERO DOUBLE ENTRY & DASHBOARDS (50.30s -> 63.30s | Frames 1509 -> 1899)
// "Aur sabse best part, usi single entry se aapka GST aur ITC summary bhi update ho gaya, aur executive dashboard..."
// =========================================================================
const Scene5ZeroDoubleEntry = ({ frame, fps }) => {
  const zoom = interpolate(frame, [0, 390], [1.02, 1.10], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 50px',
        position: 'relative',
      }}
    >
      {/* Top Floating Badge */}
      <div
        style={{
          marginBottom: 24,
          padding: '12px 30px',
          borderRadius: 999,
          backgroundColor: 'rgba(168, 85, 247, 0.15)',
          border: '1.5px solid rgba(168, 85, 247, 0.4)',
          color: '#c084fc',
          fontSize: 22,
          fontWeight: 800,
        }}
      >
        🛡️ ZERO DOUBLE ENTRY MAGIC
      </div>

      {/* Screen Recording Video: GST Command Center */}
      <MacClipPlayer
        title="GSTR-1, 3B & ITC Summary Command Hub"
        tag="gst-command-center"
        videoSrc="clips/Clip_05_GST_Command_Center.mp4"
        scale={zoom}
        transformOrigin="top center"
        badgeText="📊 Auto GSTR-1, 3B & ITC Shield"
        badgeColor="#a855f7"
        badgePosition="top-right"
      />

      {/* 3 Live Metric Dials */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
          marginTop: 28,
          width: '100%',
          maxWidth: 980,
        }}
      >
        <div
          style={{
            padding: '20px 16px',
            borderRadius: 20,
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
            border: '1.5px solid rgba(16, 185, 129, 0.35)',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 16, color: '#94a3b8', fontWeight: 600 }}>Real Profit</div>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#10b981', marginTop: 4 }}>LIVE ₹ TRACKER</div>
        </div>

        <div
          style={{
            padding: '20px 16px',
            borderRadius: 20,
            backgroundColor: 'rgba(239, 68, 68, 0.12)',
            border: '1.5px solid rgba(239, 68, 68, 0.35)',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 16, color: '#94a3b8', fontWeight: 600 }}>Pending Dues</div>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#f87171', marginTop: 4 }}>OVERDUE RADAR</div>
        </div>

        <div
          style={{
            padding: '20px 16px',
            borderRadius: 20,
            backgroundColor: 'rgba(251, 191, 36, 0.12)',
            border: '1.5px solid rgba(251, 191, 36, 0.35)',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 16, color: '#94a3b8', fontWeight: 600 }}>Tax Payable</div>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#fbbf24', marginTop: 4 }}>AUTO ITC SHIELD</div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// SCENE 6: COMPARISON VS HEAVY SOFTWARE (63.30s -> 77.30s | Frames 1899 -> 2319)
// "Jo kaam yearly 20,000 rupees waale heavy softwares karte hain, woh poora 19-tab Sheetly 2.0 abhi mil raha hai sirf 499 rupees mein..."
// =========================================================================
const Scene6PriceComparison = ({ frame, fps }) => {
  const popLeft = spring({ frame, fps, config: { damping: 12 } });
  const popRight = spring({ frame: frame - 40, fps, config: { damping: 10 } });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 60px',
        position: 'relative',
      }}
    >
      <div
        style={{
          fontSize: 48,
          fontWeight: 900,
          color: '#ffffff',
          textAlign: 'center',
          marginBottom: 40,
        }}
      >
        Kyun Hazaron Rupaye Barbaad Karna?
      </div>

      {/* Side by Side Comparison Cards */}
      <div style={{ display: 'flex', gap: 24, width: '100%', maxWidth: 960 }}>
        {/* Left: Heavy Softwares */}
        <div
          style={{
            flex: 1,
            transform: `scale(${popLeft})`,
            padding: '36px 28px',
            borderRadius: 28,
            backgroundColor: 'rgba(239, 68, 68, 0.08)',
            border: '1.5px solid rgba(239, 68, 68, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 800, color: '#f87171' }}>HEAVY SAAS TOOLS</div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 900,
              color: '#ef4444',
              textDecoration: 'line-through',
              marginTop: 12,
            }}
          >
            ₹20,000+
          </div>
          <div style={{ fontSize: 16, color: '#fca5a5', fontWeight: 600 }}>Per Year (Recurring!)</div>

          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 17, color: '#94a3b8' }}>
            <div>❌ Monthly subscription headache</div>
            <div>❌ Complex to learn</div>
            <div>❌ Separate tools for everything</div>
          </div>
        </div>

        {/* Right: Sheetly 2.0 */}
        <div
          style={{
            flex: 1.1,
            transform: `scale(${popRight})`,
            padding: '36px 28px',
            borderRadius: 28,
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '2px solid rgba(16, 185, 129, 0.5)',
            boxShadow: '0 0 50px rgba(16, 185, 129, 0.35)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: -16,
              padding: '6px 20px',
              borderRadius: 999,
              backgroundColor: '#10b981',
              color: '#ffffff',
              fontSize: 14,
              fontWeight: 900,
            }}
          >
            FOUNDING 100 DEAL
          </div>

          <div style={{ fontSize: 20, fontWeight: 800, color: '#34d399', marginTop: 8 }}>
            SHEETLY 2.0 (19 TABS)
          </div>
          <div
            style={{
              fontSize: 68,
              fontWeight: 900,
              color: '#ffffff',
              marginTop: 8,
              textShadow: '0 0 30px rgba(16, 185, 129, 0.8)',
            }}
          >
            ₹499
          </div>
          <div style={{ fontSize: 17, color: '#10b981', fontWeight: 800 }}>
            One-Time • Lifetime Access
          </div>

          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 17, color: '#e2e8f0', fontWeight: 600 }}>
            <div>✅ 100% Google Drive privacy</div>
            <div>✅ Zero Excel formula skills needed</div>
            <div>✅ 3 Free Fast-Action Bonuses</div>
          </div>
        </div>
      </div>

      {/* 3 Free Bonuses Pill */}
      {frame >= 140 && (
        <div
          style={{
            marginTop: 40,
            padding: '16px 36px',
            borderRadius: 20,
            backgroundColor: 'rgba(251, 191, 36, 0.12)',
            border: '1.5px solid rgba(251, 191, 36, 0.35)',
            fontSize: 22,
            fontWeight: 800,
            color: '#fbbf24',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <span>🎁</span>
          <span>PLUS 3 FREE BONUSES INCLUDED TODAY!</span>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// SCENE 7: CALL TO ACTION (77.30s -> 83.96s | Frames 2319 -> 2519)
// "Apna manual headache khatam karo. Abhi neeche diye link par click karo aur five minutes mein apna business OS live karo!"
// =========================================================================
const Scene7CallToAction = ({ frame, fps }) => {
  const pop = spring({ frame, fps, config: { damping: 10 } });
  const pulse = 1 + Math.sin(frame * 0.15) * 0.04;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 60px',
        position: 'relative',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          transform: `scale(${pop})`,
          fontSize: 54,
          fontWeight: 900,
          color: '#ffffff',
          lineHeight: 1.2,
          maxWidth: 900,
        }}
      >
        Apna Manual Headache <span style={{ color: '#ef4444' }}>Khatam Karo!</span> 🚀
      </div>

      <div
        style={{
          fontSize: 24,
          color: '#94a3b8',
          fontWeight: 600,
          marginTop: 18,
          marginBottom: 44,
        }}
      >
        5 Minutes mein apna business operating system live karo
      </div>

      {/* Glowing Big Button */}
      <div
        style={{
          transform: `scale(${pulse})`,
          padding: '28px 64px',
          borderRadius: 30,
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          boxShadow: '0 20px 60px rgba(16, 185, 129, 0.6), 0 0 35px #10b981',
          border: '2px solid rgba(255, 255, 255, 0.4)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <div style={{ fontSize: 38, fontWeight: 900, color: '#ffffff', letterSpacing: 0.5 }}>
          👉 GET SHEETLY 2.0 (₹499) 👈
        </div>
        <div style={{ fontSize: 18, fontWeight: 700, color: 'rgba(255, 255, 255, 0.9)' }}>
          Founding 100 Batch • Instant Access Link
        </div>
      </div>

      {/* Trust Badges */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 32,
          marginTop: 44,
          fontSize: 20,
          fontWeight: 700,
          color: '#cbd5e1',
        }}
      >
        <div>🛡️ 7-Day Guarantee</div>
        <div>⚡ 1-Click Google Drive Copy</div>
        <div>🔒 100% Private Data</div>
      </div>

      {/* Meta Ad Click Pointer */}
      <div
        style={{
          marginTop: 36,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 28px',
          borderRadius: 999,
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          color: '#fbbf24',
          fontSize: 22,
          fontWeight: 800,
        }}
      >
        <span>👇 TAP "LEARN MORE" / "SHOP NOW" BELOW 👇</span>
      </div>
    </div>
  );
};

// =========================================================================
// MAIN ROOT COMPOSITION: SHEETLY META AD 1 (9:16 VERTICAL | 1080x1920 | 2519 Frames)
// =========================================================================
export const SheetlyMetaAd1 = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        backgroundColor: '#050811',
        backgroundImage: 'radial-gradient(ellipse at 50% 15%, rgba(16, 185, 129, 0.15) 0%, rgba(5, 8, 17, 1) 75%)',
        color: '#ffffff',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Segoe UI", Roboto, sans-serif',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Mixed Audio Track (User Uploaded ElevenLabs Voice + Subtle Warm Music) */}
      <Audio src={staticFile('sheetly_ad1_mixed.mp3')} />

      {/* Top Fixed Brand Watermark */}
      <div
        style={{
          position: 'absolute',
          top: 60,
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
              width: 44,
              height: 44,
              borderRadius: 12,
              backgroundColor: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 18px rgba(16, 185, 129, 0.4)',
              fontSize: 24,
            }}
          >
            📊
          </div>
          <div style={{ fontSize: 26, fontWeight: 900, color: '#ffffff', letterSpacing: -0.5 }}>
            Sheetly <span style={{ color: '#10b981' }}>2.0</span>
          </div>
        </div>

        <div
          style={{
            fontSize: 16,
            fontWeight: 800,
            padding: '8px 24px',
            borderRadius: 999,
            backgroundColor: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            color: '#fbbf24',
          }}
        >
          🔥 FOUNDING DEAL • ₹499
        </div>
      </div>

      {/* Staged Sequences Matching Exact Voiceover Timings */}
      <div style={{ flex: 1, position: 'relative', width: '100%', height: '100%' }}>
        {/* Scene 1: Hook (0s - 7s | 0 - 210 frames) */}
        <Sequence from={0} durationInFrames={210}>
          <Scene1Hook frame={frame} fps={30} />
        </Sequence>

        {/* Scene 2: Admin Chaos (7s - 22s | 210 - 660 frames) */}
        <Sequence from={210} durationInFrames={450}>
          <Scene2Chaos frame={frame - 210} fps={30} />
        </Sequence>

        {/* Scene 3: Solution Reveal (22s - 36.8s | 660 - 1104 frames) */}
        <Sequence from={660} durationInFrames={444}>
          <Scene3SolutionReveal frame={frame - 660} fps={30} />
        </Sequence>

        {/* Scene 4: Live Demo - GST Invoice & UPI QR (36.8s - 50.3s | 1104 - 1509 frames) */}
        <Sequence from={1104} durationInFrames={405}>
          <Scene4LiveDemoInvoice frame={frame - 1104} fps={30} />
        </Sequence>

        {/* Scene 5: Zero Double Entry (50.3s - 63.3s | 1509 - 1899 frames) */}
        <Sequence from={1509} durationInFrames={390}>
          <Scene5ZeroDoubleEntry frame={frame - 1509} fps={30} />
        </Sequence>

        {/* Scene 6: Price Comparison vs Heavy Softwares (63.3s - 77.3s | 1899 - 2319 frames) */}
        <Sequence from={1899} durationInFrames={420}>
          <Scene6PriceComparison frame={frame - 1899} fps={30} />
        </Sequence>

        {/* Scene 7: Call to Action (77.3s - 83.96s | 2319 - 2519 frames) */}
        <Sequence from={2319} durationInFrames={200}>
          <Scene7CallToAction frame={frame - 2319} fps={30} />
        </Sequence>
      </div>

      {/* Bottom Progress Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          zIndex: 50,
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${(frame / 2519) * 100}%`,
            background: 'linear-gradient(90deg, #10b981, #38bdf8, #fbbf24)',
          }}
        />
      </div>
    </div>
  );
};

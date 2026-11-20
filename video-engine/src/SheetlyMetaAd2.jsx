import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Sequence,
  Audio,
  Video,
  staticFile,
} from 'remotion';

// =========================================================================
// REUSABLE MAC CLIP PLAYER FOR SCREEN RECORDINGS (TALL & IMMERSIVE)
// =========================================================================
const MacClipPlayer = ({
  title,
  tag,
  videoSrc,
  scale = 1,
  transformOrigin = 'center center',
  badgeText = null,
  badgeColor = '#10b981',
  badgePosition = 'top-right',
  height = 920,
}) => {
  const getBadgeStyle = () => {
    const base = {
      position: 'absolute',
      padding: '12px 26px',
      borderRadius: 999,
      backgroundColor: badgeColor,
      color: '#ffffff',
      fontSize: 18,
      fontWeight: 800,
      boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      zIndex: 30,
    };
    if (badgePosition === 'top-right') return { ...base, top: 22, right: 22 };
    if (badgePosition === 'top-left') return { ...base, top: 22, left: 22 };
    if (badgePosition === 'bottom-left') return { ...base, bottom: 22, left: 22 };
    return { ...base, bottom: 22, right: 22 };
  };

  return (
    <div
      style={{
        width: 1000,
        height: height,
        backgroundColor: '#0a0f1d',
        borderRadius: 28,
        border: '1.5px solid rgba(255, 255, 255, 0.16)',
        boxShadow: '0 35px 90px -15px rgba(0,0,0,0.9), 0 0 60px rgba(16, 185, 129, 0.18)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* macOS Top Bar */}
      <div
        style={{
          height: 52,
          backgroundColor: '#111827',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
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
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              fontSize: 14,
              color: '#94a3b8',
              fontWeight: 600,
            }}
          >
            sheetly.google.com/{tag || 'tab'}
          </div>
        </div>

        <div style={{ fontSize: 15, fontWeight: 800, color: '#38bdf8' }}>
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

        {badgeText && <div style={getBadgeStyle()}>{badgeText}</div>}
      </div>
    </div>
  );
};

// =========================================================================
// SCENE 1: THE HARSH TRUTH HOOK (0.00s -> 8.50s | Frames 0 -> 255)
// "Ek harsh truth bataun? Clients aapki payment isliye delay nahi karte ki unke paas paise nahi hain. Wo delay karte hain kyunki aapka billing process casual hai."
// =========================================================================
const Scene1HarshTruthHook = ({ frame, fps }) => {
  const popPill = spring({ frame, fps, config: { damping: 12 } });
  const popLine1 = spring({ frame: frame - 20, fps, config: { damping: 12 } });
  const popNoMoney = spring({ frame: frame - 55, fps, config: { damping: 10 } });
  const popClimax = spring({ frame: frame - 145, fps, config: { damping: 9 } });

  // Camera shake when "BILLING CASUAL HAI" hits
  const shake = frame >= 165 ? Math.sin(frame * 0.9) * 8 : 0;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '160px 60px 80px',
        position: 'relative',
        textAlign: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Top Warning Radar Pill */}
      <div
        style={{
          transform: `scale(${Math.min(1, popPill)})`,
          padding: '14px 38px',
          borderRadius: 999,
          backgroundColor: 'rgba(239, 68, 68, 0.18)',
          border: '2px solid rgba(239, 68, 68, 0.5)',
          color: '#f87171',
          fontSize: 26,
          fontWeight: 900,
          letterSpacing: 2,
          boxShadow: '0 0 40px rgba(239, 68, 68, 0.35)',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}
      >
        <span style={{ fontSize: 32 }}>🚨</span>
        <span>EK HARSH TRUTH BATAUN?</span>
      </div>

      {/* Main Kinetic Content Center */}
      <div style={{ maxWidth: 980, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 36 }}>
        {frame >= 20 && (
          <div
            style={{
              fontSize: 66,
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.25,
              transform: `scale(${popLine1})`,
              letterSpacing: -1,
            }}
          >
            Clients aapki <span style={{ color: '#38bdf8' }}>Payment</span> isliye delay nahi karte...
          </div>
        )}

        {/* Crossed Out Card: Unke paas paise nahi hain */}
        {frame >= 55 && (
          <div
            style={{
              transform: `scale(${popNoMoney})`,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 16,
              padding: '20px 48px',
              borderRadius: 24,
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              border: '2px solid rgba(239, 68, 68, 0.45)',
              boxShadow: '0 15px 40px rgba(239, 68, 68, 0.25)',
            }}
          >
            <span style={{ fontSize: 36 }}>❌</span>
            <span
              style={{
                fontSize: 38,
                fontWeight: 900,
                color: '#fca5a5',
                textDecoration: 'line-through',
              }}
            >
              "Unke paas paise nahi hain"
            </span>
          </div>
        )}

        {/* Climax Reveal: Aapka billing process CASUAL hai */}
        {frame >= 145 && (
          <div
            style={{
              transform: `scale(${popClimax}) translateX(${shake}px)`,
              padding: '36px 48px',
              borderRadius: 32,
              backgroundColor: 'rgba(15, 23, 42, 0.92)',
              border: '2.5px solid #ef4444',
              boxShadow: '0 25px 80px rgba(239, 68, 68, 0.5), 0 0 50px rgba(239, 68, 68, 0.3)',
              width: '100%',
            }}
          >
            <div style={{ fontSize: 32, color: '#94a3b8', fontWeight: 700, marginBottom: 10 }}>
              Wo delay karte hain kyunki...
            </div>
            <div
              style={{
                fontSize: 68,
                fontWeight: 900,
                color: '#fbbf24',
                textShadow: '0 0 45px rgba(251, 191, 36, 0.7)',
                letterSpacing: -1,
                lineHeight: 1.15,
              }}
            >
              AAPKA BILLING PROCESS <br />
              <span style={{ color: '#ef4444' }}>CASUAL HAI! ⚠️</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Subtitle / Anchor */}
      <div
        style={{
          padding: '14px 32px',
          borderRadius: 20,
          backgroundColor: 'rgba(255, 255, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          fontSize: 22,
          fontWeight: 700,
          color: '#cbd5e1',
        }}
      >
        Casual WhatsApp messages = Ignored chats & delayed bank balance
      </div>
    </div>
  );
};

// =========================================================================
// SCENE 2: THE CASUAL WHATSAPP DISASTER (8.50s -> 22.00s | Frames 255 -> 660)
// "Socho. Jab aap work complete karke WhatsApp par sirf text likh dete ho, 'Sir, is number par UPI kar dena.' To client sochta hai, 'Baad mein karunga.' Aur fir aapko baar-baar awkward follow-ups aur payment reminders bhejne padte hain."
// =========================================================================
const Scene2WhatsAppDisaster = ({ frame, fps }) => {
  const popPhone = spring({ frame, fps, config: { damping: 12 } });
  const popMsg1 = spring({ frame: frame - 40, fps, config: { damping: 12 } });
  const popThought = spring({ frame: frame - 170, fps, config: { damping: 10 } });
  const popMsg2 = spring({ frame: frame - 250, fps, config: { damping: 12 } });
  const popAlert = spring({ frame: frame - 310, fps, config: { damping: 9 } });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '140px 50px 70px',
        position: 'relative',
        justifyContent: 'space-between',
      }}
    >
      {/* Header Pill */}
      <div
        style={{
          padding: '12px 34px',
          borderRadius: 999,
          backgroundColor: 'rgba(239, 68, 68, 0.16)',
          border: '1.5px solid rgba(239, 68, 68, 0.45)',
          color: '#f87171',
          fontSize: 24,
          fontWeight: 900,
        }}
      >
        📱 THE "CASUAL TEXT" PAYMENT TRAP
      </div>

      {/* Realistic WhatsApp Chat Box Simulation (TALL & IMMERSIVE) */}
      <div
        style={{
          transform: `scale(${popPhone})`,
          width: '100%',
          maxWidth: 960,
          height: 1080,
          backgroundColor: '#0c1317',
          borderRadius: 36,
          border: '2px solid rgba(255, 255, 255, 0.14)',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 50px rgba(37, 211, 102, 0.15)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* WhatsApp Top Chat Header */}
        <div
          style={{
            height: 90,
            backgroundColor: '#1f2c34',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 30px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: '50%',
                backgroundColor: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 26,
                fontWeight: 900,
                color: '#ffffff',
              }}
            >
              R
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#e9edef' }}>
                Rahul Sharma (Client)
              </div>
              <div style={{ fontSize: 16, color: '#8696a0', marginTop: 2 }}>Active 2 hours ago</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 24, fontSize: 26, color: '#aebac1' }}>
            <span>📞</span>
            <span>📹</span>
          </div>
        </div>

        {/* WhatsApp Chat Body */}
        <div
          style={{
            flex: 1,
            padding: '40px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: 28,
            backgroundColor: '#0b141a',
            justifyContent: 'space-around',
          }}
        >
          {/* Founder Casual Message 1 */}
          {frame >= 40 && (
            <div
              style={{
                alignSelf: 'flex-end',
                maxWidth: '85%',
                backgroundColor: '#005c4b',
                borderRadius: '24px 24px 6px 24px',
                padding: '24px 30px',
                color: '#e9edef',
                transform: `scale(${popMsg1})`,
                boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
              }}
            >
              <div style={{ fontSize: 28, fontWeight: 600, lineHeight: 1.4 }}>
                Sir, project complete ho gaya hai! Is number par UPI kar dena: <b style={{ color: '#fef08a' }}>98200XXXXX</b> 🙏
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: 8,
                  marginTop: 10,
                  fontSize: 16,
                  color: '#8696a0',
                }}
              >
                <span>11:42 AM</span>
                <span style={{ color: '#53bdeb', fontWeight: 900, fontSize: 18 }}>✓✓</span>
              </div>
            </div>
          )}

          {/* Client's Inner Thought Bubble */}
          {frame >= 170 && (
            <div
              style={{
                alignSelf: 'flex-start',
                maxWidth: '80%',
                transform: `scale(${popThought})`,
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                border: '2px dashed rgba(239, 68, 68, 0.6)',
                borderRadius: 26,
                padding: '22px 30px',
                display: 'flex',
                alignItems: 'center',
                gap: 18,
              }}
            >
              <span style={{ fontSize: 48 }}>💭</span>
              <div>
                <div style={{ fontSize: 18, color: '#fca5a5', fontWeight: 700 }}>Client Sochta Hai:</div>
                <div style={{ fontSize: 30, fontWeight: 900, color: '#ef4444', marginTop: 4 }}>
                  "Baad mein aaram se karunga..." 😴
                </div>
              </div>
            </div>
          )}

          {/* Founder Awkward Follow-up 3 Days Later */}
          {frame >= 250 && (
            <div
              style={{
                alignSelf: 'flex-end',
                maxWidth: '85%',
                backgroundColor: '#005c4b',
                borderRadius: '24px 24px 6px 24px',
                padding: '24px 30px',
                color: '#e9edef',
                transform: `scale(${popMsg2})`,
                boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
              }}
            >
              <div style={{ fontSize: 15, color: '#fbbf24', fontWeight: 800, marginBottom: 6 }}>
                ⏱️ 3 DAYS LATER (NO REPLY)
              </div>
              <div style={{ fontSize: 27, fontWeight: 600, lineHeight: 1.4 }}>
                Hi sir, payment ka koi update? Just checking in... 😅
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: 8,
                  marginTop: 10,
                  fontSize: 16,
                  color: '#8696a0',
                }}
              >
                <span>2:15 PM</span>
                <span style={{ color: '#8696a0', fontSize: 18 }}>✓✓</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Red Callout Box: Awkward follow-ups & reminders */}
      {frame >= 310 && (
        <div
          style={{
            transform: `scale(${popAlert})`,
            padding: '18px 44px',
            borderRadius: 24,
            backgroundColor: '#ef4444',
            color: '#ffffff',
            fontSize: 28,
            fontWeight: 900,
            boxShadow: '0 15px 45px rgba(239, 68, 68, 0.55)',
            textAlign: 'center',
            letterSpacing: 0.5,
          }}
        >
          ❌ BAAR-BAAR AWKWARD FOLLOW-UPS & DELAYED CASH!
        </div>
      )}
    </div>
  );
};

// =========================================================================
// SCENE 3: SMART FOUNDER INVOICE & DYNAMIC UPI QR (22.00s -> 33.00s | Frames 660 -> 990)
// "Ab ye dekho. Smart founders kaise invoices send karte hain. Is Google Sheet mein bas drop-down se client select karo, aur exact amount ke saath dynamic UPI QR wala GST invoice ready!"
// =========================================================================
const Scene3SmartInvoicing = ({ frame, fps }) => {
  const popTitle = spring({ frame, fps, config: { damping: 10 } });
  // Zoom focuses on the bottom-right dynamic QR and Total amount
  const zoom = interpolate(frame, [0, 330], [1.02, 1.18], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '140px 50px 70px',
        position: 'relative',
        justifyContent: 'space-between',
      }}
    >
      {/* Top Header Badge */}
      <div
        style={{
          transform: `scale(${popTitle})`,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 32px',
            borderRadius: 999,
            backgroundColor: 'rgba(16, 185, 129, 0.18)',
            border: '2px solid rgba(16, 185, 129, 0.5)',
            color: '#10b981',
            fontSize: 24,
            fontWeight: 900,
            letterSpacing: 1,
            marginBottom: 14,
          }}
        >
          ⚡ HOW SMART FOUNDERS INVOICE
        </div>
        <div style={{ fontSize: 50, fontWeight: 900, color: '#ffffff', letterSpacing: -1 }}>
          Dropdown Select ➔ Dynamic UPI QR Ready!
        </div>
      </div>

      {/* Screen Recording Clip: Print Invoice with Dynamic UPI QR (TALL 960px) */}
      <MacClipPlayer
        title="Sheetly 2.0 • Dynamic Scan-to-Pay GST Invoice"
        tag="print-invoice"
        videoSrc="clips/Clip_04_Print_Invoice_UPI_QR.mp4"
        scale={zoom}
        height={960}
        transformOrigin="bottom right"
        badgeText="📲 Exact ₹ Amount Dynamic QR"
        badgeColor="#10b981"
        badgePosition="top-right"
      />

      {/* 3 Live Feature Micro-Pills Below */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
          width: '100%',
          maxWidth: 1000,
        }}
      >
        <div
          style={{
            padding: '16px 20px',
            borderRadius: 18,
            backgroundColor: 'rgba(56, 189, 248, 0.14)',
            border: '1.5px solid rgba(56, 189, 248, 0.4)',
            fontSize: 18,
            fontWeight: 800,
            color: '#38bdf8',
            textAlign: 'center',
          }}
        >
          👉 1-Sec Client Dropdown
        </div>

        <div
          style={{
            padding: '16px 20px',
            borderRadius: 18,
            backgroundColor: 'rgba(16, 185, 129, 0.18)',
            border: '1.5px solid rgba(16, 185, 129, 0.5)',
            fontSize: 18,
            fontWeight: 900,
            color: '#10b981',
            textAlign: 'center',
          }}
        >
          📲 Dynamic Scan-to-Pay QR
        </div>

        <div
          style={{
            padding: '16px 20px',
            borderRadius: 18,
            backgroundColor: 'rgba(251, 191, 36, 0.14)',
            border: '1.5px solid rgba(251, 191, 36, 0.4)',
            fontSize: 18,
            fontWeight: 800,
            color: '#fbbf24',
            textAlign: 'center',
          }}
        >
          🧾 100% Valid GST Formula
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// SCENE 4: 1-CLICK WHATSAPP & INSTANT SCAN-TO-PAY (33.00s -> 41.00s | Frames 990 -> 1230)
// "Yahan se one-click WhatsApp dabao, aur client ko professional payment message send ho jaata hai. Client bas apne phone se QR scan karta hai, aur payment done!"
// =========================================================================
const Scene4OneClickWhatsAppScan = ({ frame, fps }) => {
  const popBtn = spring({ frame, fps, config: { damping: 10 } });
  const popSuccess = spring({ frame: frame - 90, fps, config: { damping: 9 } });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '140px 60px 70px',
        position: 'relative',
        textAlign: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Top Floating Badge */}
      <div
        style={{
          padding: '12px 34px',
          borderRadius: 999,
          backgroundColor: 'rgba(37, 211, 102, 0.18)',
          border: '2px solid rgba(37, 211, 102, 0.5)',
          color: '#25d366',
          fontSize: 24,
          fontWeight: 900,
        }}
      >
        💬 1-CLICK WHATSAPP DELIVERY + INSTANT SCAN
      </div>

      {/* Main Interactive Stage (Fills vertical space with rich visuals) */}
      <div style={{ width: '100%', maxWidth: 960, display: 'flex', flexDirection: 'column', gap: 32 }}>
        {/* Step 1: Big WhatsApp Send Button Card */}
        <div
          style={{
            transform: `scale(${popBtn})`,
            padding: '30px 48px',
            borderRadius: 30,
            backgroundColor: 'rgba(37, 211, 102, 0.16)',
            border: '2.5px solid rgba(37, 211, 102, 0.55)',
            boxShadow: '0 25px 60px rgba(37, 211, 102, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: 24,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 22,
              backgroundColor: '#25d366',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 48,
              boxShadow: '0 12px 30px rgba(37, 211, 102, 0.6)',
              flexShrink: 0,
            }}
          >
            💬
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 34, fontWeight: 900, color: '#ffffff' }}>
              Click "Send on WhatsApp"
            </div>
            <div style={{ fontSize: 20, color: '#86efac', fontWeight: 600, marginTop: 4 }}>
              Prefilled professional GST invoice PDF + instant scan link!
            </div>
          </div>
        </div>

        {/* Step 2: Realistic PhonePe / UPI Payment Received Success Card */}
        {frame >= 90 && (
          <div
            style={{
              transform: `scale(${popSuccess})`,
              padding: '44px 48px',
              borderRadius: 36,
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.35) 0%, rgba(5, 150, 105, 0.25) 100%)',
              border: '3px solid #10b981',
              boxShadow: '0 30px 80px rgba(16, 185, 129, 0.6), 0 0 60px rgba(16, 185, 129, 0.4)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
            }}
          >
            <div
              style={{
                width: 90,
                height: 90,
                borderRadius: '50%',
                backgroundColor: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 52,
                color: '#ffffff',
                boxShadow: '0 15px 35px rgba(16, 185, 129, 0.6)',
                marginBottom: 18,
              }}
            >
              ✓
            </div>

            <div style={{ fontSize: 42, fontWeight: 900, color: '#ffffff', letterSpacing: -0.5 }}>
              PAYMENT RECEIVED! 🎉
            </div>
            <div style={{ fontSize: 60, fontWeight: 900, color: '#34d399', marginTop: 8 }}>
              ₹106,200.00
            </div>
            <div style={{ fontSize: 22, color: '#94a3b8', fontWeight: 700, marginTop: 4 }}>
              Client scanned QR on PhonePe / GPay & paid in 10 seconds!
            </div>

            <div
              style={{
                marginTop: 24,
                padding: '12px 32px',
                borderRadius: 16,
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                fontSize: 22,
                fontWeight: 800,
                color: '#f8fafc',
              }}
            >
              ⚡ Zero Follow-ups • Zero Cashflow Delay
            </div>
          </div>
        )}
      </div>

      {/* Bottom Anchor Note */}
      <div
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: '#cbd5e1',
          padding: '12px 28px',
          borderRadius: 16,
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        }}
      >
        Make it impossible for clients to delay your hard-earned money
      </div>
    </div>
  );
};

// =========================================================================
// SCENE 5: THE 19 AUTOMATED TABS ECOSYSTEM (41.00s -> 51.00s | Frames 1230 -> 1530)
// "Aur is single Google Sheet mein sirf invoicing nahi, Client CRM, team tasks, automatic GSTR calculation, aur live profit samet poore 19 automated tabs hain."
// =========================================================================
const Scene5NineteenTabsEcosystem = ({ frame, fps }) => {
  const popTitle = spring({ frame, fps, config: { damping: 10 } });
  const zoom = interpolate(frame, [0, 300], [1.02, 1.10], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '140px 50px 70px',
        position: 'relative',
        justifyContent: 'space-between',
      }}
    >
      {/* Headline */}
      <div
        style={{
          textAlign: 'center',
          transform: `scale(${popTitle})`,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            padding: '10px 28px',
            borderRadius: 999,
            backgroundColor: 'rgba(168, 85, 247, 0.18)',
            border: '2px solid rgba(168, 85, 247, 0.5)',
            color: '#c084fc',
            fontSize: 22,
            fontWeight: 800,
            marginBottom: 12,
          }}
        >
          ⚡ NOT JUST INVOICING — A COMPLETE 19-TAB OS
        </div>
        <div style={{ fontSize: 52, fontWeight: 900, color: '#ffffff', letterSpacing: -1 }}>
          1 Single Google Sheet. 19 Power Tabs.
        </div>
      </div>

      {/* Screen Recording Video: GST Command Center & Invoices (TALL 920px) */}
      <MacClipPlayer
        title="Sheetly 2.0 • 19 Pre-Linked Automated Tabs"
        tag="gst-command-center"
        videoSrc="clips/Clip_05_GST_Command_Center.mp4"
        scale={zoom}
        height={920}
        transformOrigin="top center"
        badgeText="📊 Auto GSTR-1, 3B & ITC Shield"
        badgeColor="#a855f7"
        badgePosition="top-right"
      />

      {/* 6 Feature Badges Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 14,
          width: '100%',
          maxWidth: 1000,
        }}
      >
        {[
          '👥 Client CRM & Pipeline',
          '📋 Team Tasks & Timelines',
          '🧾 Branded GST Bills',
          '📲 Scan-to-Pay UPI QR',
          '📊 GSTR-1, 3B & ITC Hub',
          '📈 12-Month Live P&L',
        ].map((item, idx) => (
          <div
            key={idx}
            style={{
              padding: '14px 16px',
              borderRadius: 16,
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              fontSize: 18,
              fontWeight: 800,
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
// SCENE 6: ZERO SUBSCRIPTION & FOUNDING 100 DEAL (51.00s -> 59.50s | Frames 1530 -> 1785)
// "Zero monthly subscription. Founding 100 offer mein Sheetly 2.0 mil raha hai sirf ₹499 mein lifetime access ke saath."
// =========================================================================
const Scene6Founding100Offer = ({ frame, fps }) => {
  const popLeft = spring({ frame, fps, config: { damping: 12 } });
  const popRight = spring({ frame: frame - 25, fps, config: { damping: 10 } });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '150px 50px 70px',
        position: 'relative',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          fontSize: 54,
          fontWeight: 900,
          color: '#ffffff',
          textAlign: 'center',
          letterSpacing: -1,
        }}
      >
        Kyun Har Saal Hazaron Rupaye Barbaad Karna?
      </div>

      {/* Side by Side Pricing Comparison (TALL 680px) */}
      <div style={{ display: 'flex', gap: 26, width: '100%', maxWidth: 980 }}>
        {/* Left: Heavy Softwares */}
        <div
          style={{
            flex: 1,
            transform: `scale(${popLeft})`,
            padding: '44px 32px',
            borderRadius: 32,
            backgroundColor: 'rgba(239, 68, 68, 0.08)',
            border: '2px solid rgba(239, 68, 68, 0.35)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'space-between',
            height: 640,
          }}
        >
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#f87171' }}>HEAVY SAAS TOOLS</div>
            <div
              style={{
                fontSize: 60,
                fontWeight: 900,
                color: '#ef4444',
                textDecoration: 'line-through',
                marginTop: 16,
              }}
            >
              ₹20,000+
            </div>
            <div style={{ fontSize: 18, color: '#fca5a5', fontWeight: 600 }}>Per Year (Recurring!)</div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              fontSize: 19,
              color: '#94a3b8',
              textAlign: 'left',
              width: '100%',
              padding: '0 10px',
            }}
          >
            <div>❌ Monthly subscription trap</div>
            <div>❌ Complex setup & learning curve</div>
            <div>❌ Separate tools for CRM & Invoices</div>
          </div>

          <div
            style={{
              padding: '10px 20px',
              borderRadius: 12,
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              fontSize: 16,
              fontWeight: 800,
              color: '#ef4444',
            }}
          >
            Expensive Recurring Cost
          </div>
        </div>

        {/* Right: Sheetly 2.0 Deal */}
        <div
          style={{
            flex: 1.15,
            transform: `scale(${popRight})`,
            padding: '44px 32px',
            borderRadius: 32,
            backgroundColor: 'rgba(16, 185, 129, 0.16)',
            border: '2.5px solid rgba(16, 185, 129, 0.6)',
            boxShadow: '0 0 60px rgba(16, 185, 129, 0.4)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            justifyContent: 'space-between',
            height: 640,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: -18,
              padding: '8px 26px',
              borderRadius: 999,
              backgroundColor: '#10b981',
              color: '#ffffff',
              fontSize: 16,
              fontWeight: 900,
              boxShadow: '0 8px 25px rgba(16, 185, 129, 0.6)',
            }}
          >
            FOUNDING 100 DEAL
          </div>

          <div>
            <div style={{ fontSize: 24, fontWeight: 900, color: '#34d399', marginTop: 10 }}>
              SHEETLY 2.0 (19 TABS)
            </div>
            <div
              style={{
                fontSize: 84,
                fontWeight: 900,
                color: '#ffffff',
                marginTop: 8,
                textShadow: '0 0 40px rgba(16, 185, 129, 0.9)',
              }}
            >
              ₹499
            </div>
            <div style={{ fontSize: 20, color: '#10b981', fontWeight: 800 }}>
              One-Time • Lifetime Access
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              fontSize: 19,
              color: '#e2e8f0',
              fontWeight: 700,
              textAlign: 'left',
              width: '100%',
              padding: '0 10px',
            }}
          >
            <div>✅ 100% Google Drive privacy</div>
            <div>✅ Zero Excel formula skills needed</div>
            <div>✅ 3 Free Fast-Action Bonuses</div>
          </div>

          <div
            style={{
              padding: '10px 24px',
              borderRadius: 14,
              backgroundColor: '#10b981',
              fontSize: 17,
              fontWeight: 900,
              color: '#ffffff',
            }}
          >
            0 Monthly Subscriptions
          </div>
        </div>
      </div>

      {/* 3 Free Bonuses Pill */}
      {frame >= 80 && (
        <div
          style={{
            padding: '18px 44px',
            borderRadius: 24,
            backgroundColor: 'rgba(251, 191, 36, 0.15)',
            border: '2px solid rgba(251, 191, 36, 0.45)',
            fontSize: 24,
            fontWeight: 900,
            color: '#fbbf24',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            boxShadow: '0 10px 30px rgba(251, 191, 36, 0.25)',
          }}
        >
          <span>🎁</span>
          <span>PLUS 3 FREE BONUSES INCLUDED TODAY! (₹1,500 VALUE)</span>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// SCENE 7: CALL TO ACTION (59.50s -> 63.40s | Frames 1785 -> 1902)
// "Neeche diye link par click karo aur aaj hi apna access unlock karo!"
// =========================================================================
const Scene7CallToAction = ({ frame, fps }) => {
  const pop = spring({ frame, fps, config: { damping: 10 } });
  const pulse = 1 + Math.sin(frame * 0.25) * 0.04;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '160px 60px 80px',
        position: 'relative',
        textAlign: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <div
          style={{
            transform: `scale(${pop})`,
            fontSize: 60,
            fontWeight: 900,
            color: '#ffffff',
            lineHeight: 1.2,
            maxWidth: 960,
            letterSpacing: -1,
          }}
        >
          Apna Billing Process <span style={{ color: '#10b981' }}>Upgrade Karo!</span> 🚀
        </div>

        <div
          style={{
            fontSize: 26,
            color: '#94a3b8',
            fontWeight: 600,
            marginTop: 18,
          }}
        >
          Founding 100 Batch • Instant Google Drive Access
        </div>
      </div>

      {/* Glowing Big Button */}
      <div
        style={{
          transform: `scale(${pulse})`,
          padding: '32px 72px',
          borderRadius: 36,
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          boxShadow: '0 25px 70px rgba(16, 185, 129, 0.7), 0 0 45px #10b981',
          border: '2.5px solid rgba(255, 255, 255, 0.45)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          maxWidth: 900,
          width: '100%',
        }}
      >
        <div style={{ fontSize: 44, fontWeight: 900, color: '#ffffff', letterSpacing: 0.5 }}>
          👉 GET SHEETLY 2.0 (₹499) 👈
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: 'rgba(255, 255, 255, 0.95)' }}>
          Founding 100 Batch • Instant Access Link
        </div>
      </div>

      {/* Trust Badges */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 36,
          fontSize: 22,
          fontWeight: 800,
          color: '#cbd5e1',
        }}
      >
        <div>🛡️ 7-Day Guarantee</div>
        <div>⚡ 1-Click Drive Copy</div>
        <div>🔒 100% Private Data</div>
      </div>

      {/* Meta Ad Click Pointer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '16px 36px',
          borderRadius: 999,
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          border: '1.5px solid rgba(255, 255, 255, 0.2)',
          color: '#fbbf24',
          fontSize: 24,
          fontWeight: 900,
        }}
      >
        <span>👇 TAP "LEARN MORE" / "SHOP NOW" BELOW 👇</span>
      </div>
    </div>
  );
};

// =========================================================================
// MAIN ROOT COMPOSITION: SHEETLY META AD 2 (9:16 VERTICAL | 1080x1920 | 1902 Frames)
// =========================================================================
export const SheetlyMetaAd2 = () => {
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
      {/* Mixed Audio Track (Script 2 Voiceover + Ambient Music) */}
      <Audio src={staticFile('sheetly_ad2_mixed.mp3')} />

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
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              backgroundColor: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(16, 185, 129, 0.45)',
              fontSize: 26,
            }}
          >
            📊
          </div>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#ffffff', letterSpacing: -0.5 }}>
            Sheetly <span style={{ color: '#10b981' }}>2.0</span>
          </div>
        </div>

        <div
          style={{
            fontSize: 17,
            fontWeight: 800,
            padding: '10px 26px',
            borderRadius: 999,
            backgroundColor: 'rgba(245, 158, 11, 0.18)',
            border: '1.5px solid rgba(245, 158, 11, 0.4)',
            color: '#fbbf24',
          }}
        >
          🔥 FOUNDING DEAL • ₹499
        </div>
      </div>

      {/* Staged Sequences Matching Script 2 Voiceover Timings (Total: 1902 Frames @ 30fps) */}
      <div style={{ flex: 1, position: 'relative', width: '100%', height: '100%' }}>
        {/* Scene 1: Harsh Truth Hook (0s - 8.5s | 0 - 255 frames) */}
        <Sequence from={0} durationInFrames={255}>
          <Scene1HarshTruthHook frame={frame} fps={30} />
        </Sequence>

        {/* Scene 2: The Casual WhatsApp Disaster (8.5s - 22s | 255 - 660 frames) */}
        <Sequence from={255} durationInFrames={405}>
          <Scene2WhatsAppDisaster frame={frame - 255} fps={30} />
        </Sequence>

        {/* Scene 3: Smart Founder Invoicing (22s - 33s | 660 - 990 frames) */}
        <Sequence from={660} durationInFrames={330}>
          <Scene3SmartInvoicing frame={frame - 660} fps={30} />
        </Sequence>

        {/* Scene 4: 1-Click WhatsApp Delivery & Instant Scan (33s - 41s | 990 - 1230 frames) */}
        <Sequence from={990} durationInFrames={240}>
          <Scene4OneClickWhatsAppScan frame={frame - 990} fps={30} />
        </Sequence>

        {/* Scene 5: 19 Automated Tabs Ecosystem (41s - 51s | 1230 - 1530 frames) */}
        <Sequence from={1230} durationInFrames={300}>
          <Scene5NineteenTabsEcosystem frame={frame - 1230} fps={30} />
        </Sequence>

        {/* Scene 6: Founding 100 Deal vs Software (51s - 59.5s | 1530 - 1785 frames) */}
        <Sequence from={1530} durationInFrames={255}>
          <Scene6Founding100Offer frame={frame - 1530} fps={30} />
        </Sequence>

        {/* Scene 7: High-Impact Call to Action (59.5s - 63.4s | 1785 - 1902 frames) */}
        <Sequence from={1785} durationInFrames={117}>
          <Scene7CallToAction frame={frame - 1785} fps={30} />
        </Sequence>
      </div>

      {/* Bottom Sleek Progress Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 10,
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          zIndex: 50,
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${(frame / 1902) * 100}%`,
            background: 'linear-gradient(90deg, #10b981, #38bdf8, #fbbf24)',
          }}
        />
      </div>
    </div>
  );
};

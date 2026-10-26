import os
import subprocess
import numpy as np
from PIL import Image, ImageDraw, ImageFont

WIDTH = 1080
HEIGHT = 1920
FPS = 30
DURATION = 65.5
TOTAL_FRAMES = int(FPS * DURATION)

FONT_PATH = "/System/Library/Fonts/Supplemental/Impact.ttf"
FONT_SECONDARY = "/System/Library/Fonts/HelveticaNeue.ttc"

def get_font(size):
    try:
        return ImageFont.truetype(FONT_PATH, size)
    except:
        return ImageFont.load_default()

def get_font_sec(size):
    try:
        return ImageFont.truetype(FONT_SECONDARY, size)
    except:
        return ImageFont.load_default()

# 65.5s Script Timeline Scenes
SCENES = [
    # 0.0 - 1.25s
    {
        "start": 0.0,
        "end": 1.25,
        "badge": "🚨 ATTENTION",
        "badge_color": (239, 68, 68),
        "lines": [
            [("RUKO! ", (255, 255, 255)), ("RUKO! ", (255, 255, 255)), ("RUKO! 🛑", (239, 68, 68))]
        ],
        "sub": "STOP RIGHT HERE",
        "glow": (239, 68, 68)
    },
    # 1.25 - 2.2s
    {
        "start": 1.25,
        "end": 2.2,
        "badge": "✋ WAIT",
        "badge_color": (250, 204, 21),
        "lines": [
            [("SCROLL ", (255, 255, 255)), ("MAT KARO! 🚫", (250, 204, 21))]
        ],
        "sub": "DON'T SWIPE AWAY",
        "glow": (250, 204, 21)
    },
    # 2.2 - 3.5s
    {
        "start": 2.2,
        "end": 3.5,
        "badge": "🤔 QUICK QUESTION",
        "badge_color": (56, 189, 248),
        "lines": [
            [("MUJHE EK BAAT", (255, 255, 255))],
            [("BATAO...", (56, 189, 248))]
        ],
        "sub": "BE HONEST WITH YOUR BUSINESS",
        "glow": (56, 189, 248)
    },
    # 3.5 - 6.0s
    {
        "start": 3.5,
        "end": 6.0,
        "badge": "📱 DAILY MESS",
        "badge_color": (34, 197, 94),
        "lines": [
            [("KYA AAPKA BUSINESS", (255, 255, 255))],
            [("ABHI BHI ", (255, 255, 255)), ("WHATSAPP 💬", (34, 197, 94))]
        ],
        "sub": "RUNNING EVERYTHING IN CHATS?",
        "glow": (34, 197, 94)
    },
    # 6.0 - 8.6s
    {
        "start": 6.0,
        "end": 8.6,
        "badge": "💸 MONEY WASTED",
        "badge_color": (244, 63, 94),
        "lines": [
            [("YA EXPENSIVE", (255, 255, 255))],
            [("SAAS SOFTWARE 💸", (244, 63, 94))],
            [("PAR CHAL RAHA HAI?", (255, 255, 255))]
        ],
        "sub": "PAYING MONTHLY SUBSCRIPTIONS?",
        "glow": (244, 63, 94)
    },
    # 8.6 - 10.5s
    {
        "start": 8.6,
        "end": 10.5,
        "badge": "⚠️ THE REALITY",
        "badge_color": (251, 146, 60),
        "lines": [
            [("AGAR HAAN, TO TUM", (255, 255, 255))],
            [("ANJAANE MEIN...", (251, 146, 60))]
        ],
        "sub": "LOSING WITHOUT REALIZING",
        "glow": (251, 146, 60)
    },
    # 10.5 - 13.5s
    {
        "start": 10.5,
        "end": 13.5,
        "badge": "❌ MASSIVE LOSS",
        "badge_color": (239, 68, 68),
        "lines": [
            [("⏳ TIME", (250, 204, 21)), (" • ", (100, 116, 139)), ("💰 PAISA", (34, 197, 94))],
            [("AUR ", (255, 255, 255)), ("GROWTH 📈", (56, 189, 248))],
            [("TEENO LOSE KAR RAHE HO!", (239, 68, 68))]
        ],
        "sub": "YOUR BUSINESS IS SUFFERING",
        "glow": (239, 68, 68)
    },
    # 13.5 - 16.8s
    {
        "start": 13.5,
        "end": 16.8,
        "badge": "📋 CHAOS #1",
        "badge_color": (244, 63, 94),
        "lines": [
            [("CLIENT KA NUMBER 👤", (244, 63, 94))],
            [("EK JAGAH NAHI HOTA!", (255, 255, 255))]
        ],
        "sub": "NUMBERS LOST IN 100S OF CHATS",
        "glow": (244, 63, 94)
    },
    # 16.8 - 20.0s
    {
        "start": 16.8,
        "end": 20.0,
        "badge": "💳 CHAOS #2",
        "badge_color": (250, 204, 21),
        "lines": [
            [("PAYMENT DETAILS KA", (255, 255, 255))],
            [("KUCH PATA NAHI! 🤷‍♂️", (250, 204, 21))],
            [("KAB AAYA • KAB GAYA", (148, 163, 184))]
        ],
        "sub": "ZERO CASHFLOW VISIBILITY",
        "glow": (250, 204, 21)
    },
    # 20.0 - 24.0s
    {
        "start": 20.0,
        "end": 24.0,
        "badge": "📝 CHAOS #3",
        "badge_color": (168, 85, 247),
        "lines": [
            [("TASKS YAAD RAKHNE KE", (255, 255, 255))],
            [("LIYE ALAG NOTES 📑", (168, 85, 247))],
            [("FILES DHOONDHNI PADTI HAIN", (255, 255, 255))]
        ],
        "sub": "WASTING 2 HOURS EVERY DAY",
        "glow": (168, 85, 247)
    },
    # 24.0 - 27.5s
    {
        "start": 24.0,
        "end": 27.5,
        "badge": "🔍 DAILY SEARCH",
        "badge_color": (56, 189, 248),
        "lines": [
            [("PURANI CHATS MEIN", (255, 255, 255))],
            [("FILES DHOONDH RAHE HO? 🔎", (56, 189, 248))]
        ],
        "sub": "SCROLLING UP FOR 30 MINUTES",
        "glow": (56, 189, 248)
    },
    # 27.5 - 31.4s
    {
        "start": 27.5,
        "end": 31.4,
        "badge": "💥 THE NIGHTMARE",
        "badge_color": (239, 68, 68),
        "lines": [
            [("❌ FOLLOW-UPS MISS!", (239, 68, 68))],
            [("❌ DEADLINES MISS!", (239, 68, 68))],
            [("❌ PAYMENTS ATTEK GAYE!", (250, 204, 21))]
        ],
        "sub": "UNPAID BILLS & ANGRY CLIENTS",
        "glow": (239, 68, 68)
    },
    # 31.4 - 35.5s
    {
        "start": 31.4,
        "end": 35.5,
        "badge": "📉 GROWTH KILLER",
        "badge_color": (244, 63, 94),
        "lines": [
            [("YE ROZ KA CHAOS", (255, 255, 255))],
            [("GROWTH SLOW 📉", (244, 63, 94))],
            [("KAR DETA HAI!", (255, 255, 255))]
        ],
        "sub": "STRESS + LOSS OF REVENUE",
        "glow": (244, 63, 94)
    },
    # 35.5 - 39.5s
    {
        "start": 35.5,
        "end": 39.5,
        "badge": "💡 THE SOLUTION",
        "badge_color": (16, 185, 129),
        "lines": [
            [("ISKA SIMPLE AUR", (255, 255, 255))],
            [("PROFESSIONAL SOLUTION ✨", (16, 185, 129))]
        ],
        "sub": "MEET THE GAME CHANGER",
        "glow": (16, 185, 129)
    },
    # 39.5 - 45.0s
    {
        "start": 39.5,
        "end": 45.0,
        "badge": "👑 SHEETLY 2.0",
        "badge_color": (16, 185, 129),
        "lines": [
            [("SHEETLY 2.0 🚀", (16, 185, 129))],
            [("POORA BUSINESS", (255, 255, 255))],
            [("EK HI JAGAH ORGANIZE!", (250, 204, 21))]
        ],
        "sub": "18 INTEGRATED TABS BUSINESS OS",
        "glow": (16, 185, 129)
    },
    # 45.0 - 50.0s
    {
        "start": 45.0,
        "end": 50.0,
        "badge": "💰 SPECIAL LAUNCH DEAL",
        "badge_color": (250, 204, 21),
        "lines": [
            [("AAJ MILTA HAI", (255, 255, 255))],
            [("SIRF ₹899 MEIN! 🏷️", (250, 204, 21))],
            [("REGULAR: ₹9,999 (92% OFF)", (148, 163, 184))]
        ],
        "sub": "LIMITED LAUNCH PRICE",
        "glow": (250, 204, 21)
    },
    # 50.0 - 55.0s
    {
        "start": 50.0,
        "end": 55.0,
        "badge": "⚡ ZERO SUBSCRIPTIONS",
        "badge_color": (16, 185, 129),
        "lines": [
            [("ONE-TIME PAYMENT 💳", (255, 255, 255))],
            [("LIFETIME ACCESS ♾️", (16, 185, 129))],
            [("+ ALL FUTURE UPDATES FREE", (255, 255, 255))]
        ],
        "sub": "NO MONTHLY EXPENSIVE FEES",
        "glow": (16, 185, 129)
    },
    # 55.0 - 60.5s
    {
        "start": 55.0,
        "end": 60.5,
        "badge": "🛡️ 100% RISK-FREE",
        "badge_color": (34, 197, 94),
        "lines": [
            [("7 DAYS 100% 🛡️", (250, 204, 21))],
            [("MONEY-BACK GUARANTEE", (34, 197, 94))],
            [("NO QUESTIONS ASKED!", (255, 255, 255))]
        ],
        "sub": "RISK IS ON US • NOT YOU",
        "glow": (34, 197, 94)
    },
    # 60.5 - 65.5s
    {
        "start": 60.5,
        "end": 65.5,
        "badge": "🚀 FINAL CALL TO ACTION",
        "badge_color": (16, 185, 129),
        "lines": [
            [("RISK MERA HAI,", (255, 255, 255))],
            [("GROWTH AAPKI! 📈", (16, 185, 129))],
            [("CLICK LINK BELOW 👇", (250, 204, 21))]
        ],
        "sub": "GET SHEETLY AT ₹899 NOW",
        "glow": (16, 185, 129)
    }
]

def render_frame(frame_num):
    t = frame_num / FPS
    
    scene = SCENES[-1]
    for s in SCENES:
        if s["start"] <= t < s["end"]:
            scene = s
            break

    dur = max(0.1, scene["end"] - scene["start"])
    p = (t - scene["start"]) / dur
    
    # Scale pop-in
    if p < 0.18:
        scale = 1.18 - (p / 0.18) * 0.18
    else:
        scale = 1.0

    img = Image.new("RGB", (WIDTH, HEIGHT), (11, 15, 25))
    draw = ImageDraw.Draw(img)

    # Ambient glow in center
    glow_color = scene.get("glow", (16, 185, 129))
    center_y = int(HEIGHT * 0.48)
    for r in range(500, 50, -60):
        c = (
            min(255, glow_color[0] + 15),
            min(255, glow_color[1] + 15),
            min(255, glow_color[2] + 15)
        )
        draw.ellipse([WIDTH//2 - r, center_y - r, WIDTH//2 + r, center_y + r], fill=(c[0]//8, c[1]//8, c[2]//8))

    # Top Brand Pill
    brand_text = "SHEETLY • BUSINESS MANAGEMENT OS"
    b_font = get_font_sec(28)
    b_bbox = draw.textbbox((0, 0), brand_text, font=b_font)
    bw = b_bbox[2] - b_bbox[0]
    bh = b_bbox[3] - b_bbox[1]
    bx = (WIDTH - bw) // 2
    by = 170
    draw.rounded_rectangle([bx - 24, by - 10, bx + bw + 24, by + bh + 14], radius=20, fill=(24, 32, 50), outline=(51, 65, 85), width=2)
    draw.text((bx, by), brand_text, font=b_font, fill=(148, 163, 184))

    # Badge Box
    badge_text = scene.get("badge", "")
    if badge_text:
        badge_font = get_font_sec(36)
        badge_bbox = draw.textbbox((0, 0), badge_text, font=badge_font)
        bgw = badge_bbox[2] - badge_bbox[0]
        bgh = badge_bbox[3] - badge_bbox[1]
        bgx = (WIDTH - bgw) // 2
        bgy = center_y - 290
        badge_col = scene.get("badge_color", (34, 197, 94))
        draw.rounded_rectangle([bgx - 30, bgy - 12, bgx + bgw + 30, bgy + bgh + 16], radius=24, fill=(badge_col[0]//6, badge_col[1]//6, badge_col[2]//6), outline=badge_col, width=3)
        draw.text((bgx, bgy), badge_text, font=badge_font, fill=badge_col)

    # Main Lines
    lines = scene.get("lines", [])
    font_size = int(88 * scale)
    main_font = get_font(font_size)
    line_height = int(font_size * 1.18)
    
    total_text_h = len(lines) * line_height
    start_y = center_y - (total_text_h // 2)

    for l_idx, line_chunks in enumerate(lines):
        y = start_y + (l_idx * line_height)
        full_line_str = "".join([chunk[0] for chunk in line_chunks])
        l_bbox = draw.textbbox((0, 0), full_line_str, font=main_font)
        lw = l_bbox[2] - l_bbox[0]
        cur_x = (WIDTH - lw) // 2

        for text, color in line_chunks:
            # Dropshadow
            draw.text((cur_x + 5, y + 5), text, font=main_font, fill=(0, 0, 0))
            draw.text((cur_x + 2, y + 2), text, font=main_font, fill=(15, 23, 42))
            draw.text((cur_x, y), text, font=main_font, fill=color)
            c_bbox = draw.textbbox((0, 0), text, font=main_font)
            cw = c_bbox[2] - c_bbox[0]
            cur_x += cw

    # Subtext
    sub_text = scene.get("sub", "")
    if sub_text:
        sub_font = get_font_sec(32)
        s_bbox = draw.textbbox((0, 0), sub_text, font=sub_font)
        sw = s_bbox[2] - s_bbox[0]
        sx = (WIDTH - sw) // 2
        sy = center_y + (total_text_h // 2) + 120
        draw.text((sx, sy), sub_text, font=sub_font, fill=(100, 116, 139))

    # Bottom Progress Bar
    bar_w = int(WIDTH * (t / DURATION))
    draw.rectangle([0, HEIGHT - 18, WIDTH, HEIGHT], fill=(20, 28, 44))
    draw.rectangle([0, HEIGHT - 18, bar_w, HEIGHT], fill=(16, 185, 129))

    # Bottom CTA Box
    cta_font = get_font_sec(32)
    cta_text = "GET SHEETLY 2.0 • JUST ₹899 🚀"
    c_bbox = draw.textbbox((0, 0), cta_text, font=cta_font)
    cw = c_bbox[2] - c_bbox[0]
    ch = c_bbox[3] - c_bbox[1]
    cx = (WIDTH - cw) // 2
    cy = HEIGHT - 180
    draw.rounded_rectangle([cx - 40, cy - 16, cx + cw + 40, cy + ch + 20], radius=26, fill=(16, 185, 129), outline=(52, 211, 153), width=2)
    draw.text((cx, cy), cta_text, font=cta_font, fill=(255, 255, 255))

    return np.array(img)

def generate_video(output_mp4, audio_wav):
    print(f"Rendering full video: {TOTAL_FRAMES} frames ({DURATION}s @ {FPS}fps)...")
    
    ffmpeg_cmd = [
        "ffmpeg", "-y",
        "-f", "rawvideo",
        "-vcodec", "rawvideo",
        "-s", f"{WIDTH}x{HEIGHT}",
        "-pix_fmt", "rgb24",
        "-r", str(FPS),
        "-i", "-",
        "-i", audio_wav,
        "-c:v", "libx264",
        "-preset", "ultrafast",
        "-pix_fmt", "yuv420p",
        "-c:a", "aac",
        "-b:a", "192k",
        "-shortest",
        output_mp4
    ]
    
    proc = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    for f in range(TOTAL_FRAMES):
        frame = render_frame(f)
        proc.stdin.write(frame.tobytes())
        if f % 150 == 0 or f == TOTAL_FRAMES - 1:
            print(f"Rendered {f+1}/{TOTAL_FRAMES} frames ({(f+1)/TOTAL_FRAMES*100:.1f}%)")
            
    proc.stdin.close()
    proc.wait()
    print(f"Full video generated successfully: {output_mp4}")

if __name__ == '__main__':
    out_path = "/Users/krishkumar/Desktop/Sheetly/public/sheetly_kinetic_ad_full.mp4"
    audio_path = "/tmp/stitched_ad_audio.wav"
    generate_video(out_path, audio_path)

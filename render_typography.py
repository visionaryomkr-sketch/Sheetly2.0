import os
import subprocess
import numpy as np
from PIL import Image, ImageDraw, ImageFont

# Canvas dimensions (Vertical 9:16)
WIDTH = 1080
HEIGHT = 1920
FPS = 30
DURATION = 13.5
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

# Script timeline events
# (start_time, end_time, main_words, highlighted_words, subtitle, badge_text, theme_color)
SCENES = [
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
    {
        "start": 2.2,
        "end": 3.5,
        "badge": "🤔 QUICK QUESTION",
        "badge_color": (56, 189, 248),
        "lines": [
            [("MUJHE EK BAAT", (255, 255, 255))],
            [("BATAO...", (56, 189, 248))]
        ],
        "sub": "BE HONEST WITH YOURSELF",
        "glow": (56, 189, 248)
    },
    {
        "start": 3.5,
        "end": 5.8,
        "badge": "📱 DAILY MESS",
        "badge_color": (34, 197, 94),
        "lines": [
            [("KYA AAPKA BUSINESS", (255, 255, 255))],
            [("ABHI BHI ", (255, 255, 255)), ("WHATSAPP 💬", (34, 197, 94))]
        ],
        "sub": "CHATS, CALLS & UNORGANIZED MESS",
        "glow": (34, 197, 94)
    },
    {
        "start": 5.8,
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
        "sub": "UNTIL YOU GET SHEETLY OS 🚀",
        "glow": (239, 68, 68)
    }
]

def render_frame(frame_num):
    t = frame_num / FPS
    
    # Find active scene
    scene = SCENES[-1]
    for s in SCENES:
        if s["start"] <= t < s["end"]:
            scene = s
            break

    # Scene progress for animations (0.0 -> 1.0)
    dur = max(0.1, scene["end"] - scene["start"])
    p = (t - scene["start"]) / dur
    
    # Scale animation (Pop in bounce)
    if p < 0.2:
        scale = 1.15 - (p / 0.2) * 0.15
    else:
        scale = 1.0

    # Base Background Image (Dark luxury gradient)
    img = Image.new("RGB", (WIDTH, HEIGHT), (11, 15, 25))
    draw = ImageDraw.Draw(img)

    # Ambient Glow in the center
    glow_color = scene.get("glow", (16, 185, 129))
    center_y = int(HEIGHT * 0.48)
    for r in range(500, 50, -50):
        alpha = int(12 * (1.0 - r / 500))
        c = (
            min(255, glow_color[0] + 15),
            min(255, glow_color[1] + 15),
            min(255, glow_color[2] + 15)
        )
        # Draw soft radial circle
        draw.ellipse([WIDTH//2 - r, center_y - r, WIDTH//2 + r, center_y + r], fill=(c[0]//8, c[1]//8, c[2]//8))

    # Top Brand Pill
    brand_text = "SHEETLY • BUSINESS OS"
    b_font = get_font_sec(28)
    b_bbox = draw.textbbox((0, 0), brand_text, font=b_font)
    bw = b_bbox[2] - b_bbox[0]
    bh = b_bbox[3] - b_bbox[1]
    bx = (WIDTH - bw) // 2
    by = 180
    
    # Draw top pill box
    draw.rounded_rectangle([bx - 24, by - 10, bx + bw + 24, by + bh + 14], radius=20, fill=(24, 32, 50), outline=(51, 65, 85), width=2)
    draw.text((bx, by), brand_text, font=b_font, fill=(148, 163, 184))

    # Scene Badge
    badge_text = scene.get("badge", "")
    if badge_text:
        badge_font = get_font_sec(36)
        badge_bbox = draw.textbbox((0, 0), badge_text, font=badge_font)
        bgw = badge_bbox[2] - badge_bbox[0]
        bgh = badge_bbox[3] - badge_bbox[1]
        bgx = (WIDTH - bgw) // 2
        bgy = center_y - 280

        badge_col = scene.get("badge_color", (34, 197, 94))
        draw.rounded_rectangle([bgx - 30, bgy - 12, bgx + bgw + 30, bgy + bgh + 16], radius=24, fill=(badge_col[0]//6, badge_col[1]//6, badge_col[2]//6), outline=badge_col, width=3)
        draw.text((bgx, bgy), badge_text, font=badge_font, fill=badge_col)

    # Draw Main Kinetic Lines
    lines = scene.get("lines", [])
    font_size = int(92 * scale)
    main_font = get_font(font_size)
    line_height = int(font_size * 1.15)
    
    total_text_h = len(lines) * line_height
    start_y = center_y - (total_text_h // 2)

    for l_idx, line_chunks in enumerate(lines):
        y = start_y + (l_idx * line_height)
        
        # Calculate full line width
        full_line_str = "".join([chunk[0] for chunk in line_chunks])
        l_bbox = draw.textbbox((0, 0), full_line_str, font=main_font)
        lw = l_bbox[2] - l_bbox[0]
        cur_x = (WIDTH - lw) // 2

        # Draw chunks
        for text, color in line_chunks:
            # Drop shadow
            draw.text((cur_x + 4, y + 4), text, font=main_font, fill=(0, 0, 0))
            draw.text((cur_x + 2, y + 2), text, font=main_font, fill=(15, 23, 42))
            # Text
            draw.text((cur_x, y), text, font=main_font, fill=color)
            
            c_bbox = draw.textbbox((0, 0), text, font=main_font)
            cw = c_bbox[2] - c_bbox[0]
            cur_x += cw

    # Subtitle / Footer Callout
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
    draw.rectangle([0, HEIGHT - 16, WIDTH, HEIGHT], fill=(20, 28, 44))
    draw.rectangle([0, HEIGHT - 16, bar_w, HEIGHT], fill=(16, 185, 129))

    # Bottom CTA Box
    cta_font = get_font_sec(30)
    cta_text = "GET SHEETLY 2.0 • JUST ₹899"
    c_bbox = draw.textbbox((0, 0), cta_text, font=cta_font)
    cw = c_bbox[2] - c_bbox[0]
    ch = c_bbox[3] - c_bbox[1]
    cx = (WIDTH - cw) // 2
    cy = HEIGHT - 180
    draw.rounded_rectangle([cx - 36, cy - 14, cx + cw + 36, cy + ch + 18], radius=24, fill=(16, 185, 129), outline=(52, 211, 153), width=2)
    draw.text((cx, cy), cta_text, font=cta_font, fill=(255, 255, 255))

    return np.array(img)

def generate_video(output_mp4, audio_wav):
    print(f"Rendering {TOTAL_FRAMES} frames ({DURATION}s @ {FPS}fps)...")
    
    ffmpeg_cmd = [
        "ffmpeg", "-y",
        "-f", "rawvideo",
        "-vcodec", "rawvideo",
        "-s", f"{WIDTH}x{HEIGHT}",
        "-pix_fmt", "rgb24",
        "-r", str(FPS),
        "-i", "-", # Pipe input from python
        "-i", audio_wav, # Audio track
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
        if f % 45 == 0 or f == TOTAL_FRAMES - 1:
            print(f"Rendered {f+1}/{TOTAL_FRAMES} frames ({(f+1)/TOTAL_FRAMES*100:.1f}%)")
            
    proc.stdin.close()
    proc.wait()
    print(f"Video generated successfully: {output_mp4}")

if __name__ == '__main__':
    out_path = "/Users/krishkumar/Desktop/Sheetly/public/typography_sample.mp4"
    audio_path = "/tmp/sample_audio.wav"
    generate_video(out_path, audio_path)

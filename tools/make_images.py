"""Generate assets/og.png (1200x630 social card) and assets/favicon.png (64x64).
Run: uv run --with pillow python3 tools/make_images.py
"""
import math, os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BG, BG_ALT, TEXT, MUTED, ACCENT, INK = "#fbf8f1", "#f3ecda", "#221d15", "#5f584b", "#d99a00", "#221d15"
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_REG = "/System/Library/Fonts/Supplemental/Arial.ttf"

def font(path, size):
    try: return ImageFont.truetype(path, size)
    except OSError: return ImageFont.load_default()

def hexagon(cx, cy, r):
    return [(cx + r * math.cos(math.radians(60 * i - 90)), cy + r * math.sin(math.radians(60 * i - 90))) for i in range(6)]

def honeycomb(draw, w, h, r, fill, outline, alpha_fill):
    dx, dy = r * math.sqrt(3) + 4, r * 1.5 + 3.5
    row = 0
    y = -r
    while y < h + r:
        x = -r + (dx / 2 if row % 2 else 0)
        while x < w + r:
            draw.polygon(hexagon(x, y, r - 2), fill=alpha_fill, outline=outline)
            x += dx
        y += dy; row += 1

def bee(draw, cx, cy, s):
    # wings
    for sx in (-1, 1):
        draw.ellipse([cx + sx * 0.55 * s - 0.5 * s, cy - 1.05 * s, cx + sx * 0.55 * s + 0.5 * s, cy - 0.45 * s], fill="#eaf7ff", outline="#6bb6e6", width=max(2, s // 20))
    # body
    draw.ellipse([cx - s, cy - 0.72 * s, cx + s, cy + 0.72 * s], fill="#f6c21a", outline="#2b2416", width=max(3, s // 12))
    for off in (0.02, 0.42):
        x = cx + off * s
        draw.line([(x, cy - 0.62 * s), (x, cy + 0.62 * s)], fill="#2b2416", width=max(6, s // 5))
    # face
    for ex in (-0.55, -0.2):
        draw.ellipse([cx + ex * s - 0.09 * s, cy - 0.12 * s - 0.09 * s, cx + ex * s + 0.09 * s, cy - 0.12 * s + 0.09 * s], fill="#2b2416")
    draw.arc([cx - 0.68 * s, cy - 0.02 * s, cx - 0.12 * s, cy + 0.36 * s], 15, 165, fill="#2b2416", width=max(3, s // 14))
    # antennae
    draw.line([(cx - 0.45 * s, cy - 0.7 * s), (cx - 0.85 * s, cy - 1.25 * s)], fill="#2b2416", width=max(3, s // 14))
    draw.line([(cx - 0.1 * s, cy - 0.72 * s), (cx + 0.05 * s, cy - 1.3 * s)], fill="#2b2416", width=max(3, s // 14))
    # cap
    draw.polygon([(cx - 0.95 * s, cy - 0.95 * s), (cx - 0.3 * s, cy - 1.25 * s), (cx + 0.35 * s, cy - 0.95 * s), (cx - 0.3 * s, cy - 0.65 * s)], fill="#2b2416")

def og():
    W, H = 1200, 630
    im = Image.new("RGBA", (W, H), BG)
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    honeycomb(d, W, H, 40, None, (217, 154, 0, 60), (217, 154, 0, 22))
    im.alpha_composite(layer)
    d = ImageDraw.Draw(im)
    # big hexagon with bee, right side
    cx, cy, R = 930, 315, 200
    d.polygon(hexagon(cx, cy, R), fill="#f6c21a", outline="#e2a400")
    bee(d, cx, cy + 10, 95)
    # text, left
    name = font(FONT_BOLD, 76); tag = font(FONT_BOLD, 40); sub = font(FONT_REG, 28)
    d.text((80, 150), "Gia Bach Nguyen", font=name, fill=TEXT)
    d.text((80, 250), "I make hard things click.", font=tag, fill=ACCENT)
    d.text((80, 330), "Bachelor of AI student at UTS, Sydney.", font=sub, fill=MUTED)
    d.text((80, 372), "Maths tutor. Builder of small useful things.", font=sub, fill=MUTED)
    # small stat chips
    chips = [("790", "SAT Math"), ("2", "AMC firsts coached"), ("615", "blocks in Buzz")]
    x = 80
    for big, small in chips:
        w = 60 + max(d.textlength(big, font=font(FONT_BOLD, 34)), d.textlength(small, font=font(FONT_REG, 20)))
        d.rounded_rectangle([x, 450, x + w, 540], radius=18, fill="#fff1c2", outline="#e8c565", width=2)
        d.text((x + 30, 462), big, font=font(FONT_BOLD, 34), fill=INK)
        d.text((x + 30, 505), small, font=font(FONT_REG, 20), fill=MUTED)
        x += w + 16
    im.convert("RGB").save(os.path.join(ROOT, "assets", "og.png"), optimize=True)

def favicon():
    S = 64
    im = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.polygon(hexagon(S / 2, S / 2, 30), fill="#f6c21a", outline="#2b2416")
    for x in (24, 32, 40):
        d.line([(x, 18), (x, 46)], fill="#2b2416", width=5)
    im.save(os.path.join(ROOT, "assets", "favicon.png"), optimize=True)

if __name__ == "__main__":
    og(); favicon(); print("wrote assets/og.png and assets/favicon.png")

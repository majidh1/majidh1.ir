from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import arabic_reshaper
from bidi.algorithm import get_display

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "screenshots" / "arzin"
FONT_DIR = ROOT / "public" / "fonts"

W, H = 1600, 900
NAVY = "#10263f"
BLUE = "#145da0"
CYAN = "#27b3c7"
GREEN = "#26b878"
GOLD = "#d6a43b"
BG = "#f4f7fb"
TEXT = "#1f2937"
MUTED = "#667085"


def font(size, bold=False):
    name = "IranianSansBold.ttf" if bold else "IranianSansRegular.ttf"
    return ImageFont.truetype(str(FONT_DIR / name), size)


def rtl(text):
    return get_display(arabic_reshaper.reshape(text))


def text_size(draw, text, fnt):
    box = draw.textbbox((0, 0), text, font=fnt)
    return box[2] - box[0], box[3] - box[1]


def draw_text(draw, xy, text, fnt, fill=TEXT, anchor="ra"):
    draw.text(xy, rtl(text), font=fnt, fill=fill, anchor=anchor)


def draw_ltr(draw, xy, text, fnt, fill=TEXT, anchor="la"):
    draw.text(xy, text, font=fnt, fill=fill, anchor=anchor)


def wrap_rtl(draw, text, fnt, max_width):
    lines = []
    current = ""
    for word in text.split():
        candidate = word if not current else f"{current} {word}"
        shaped = rtl(candidate)
        if text_size(draw, shaped, fnt)[0] <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def paragraph(draw, x_right, y, text, fnt, fill=MUTED, max_width=640, line_gap=12):
    line_h = fnt.size + 12
    for line in wrap_rtl(draw, text, fnt, max_width):
        draw_text(draw, (x_right, y), line, fnt, fill)
        y += line_h + line_gap
    return y


def round_rect(draw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def shadow_card(draw, box, radius=24, fill="#ffffff", outline="#d9e2ef"):
    x1, y1, x2, y2 = box
    for i, alpha in enumerate([22, 14, 8]):
        offset = (i + 1) * 4
        draw.rounded_rectangle((x1, y1 + offset, x2, y2 + offset), radius=radius, fill=(0, 0, 0, alpha))
    round_rect(draw, box, radius, fill, outline)


def gradient_bg():
    img = Image.new("RGB", (W, H), BG)
    px = img.load()
    c1 = (237, 248, 251)
    c2 = (244, 247, 251)
    c3 = (232, 241, 255)
    for y in range(H):
        for x in range(W):
            t = (x / W) * 0.65 + (y / H) * 0.35
            a = tuple(int(c1[i] * (1 - t) + c2[i] * t) for i in range(3))
            b = tuple(int(a[i] * 0.86 + c3[i] * 0.14) for i in range(3))
            px[x, y] = b
    return img


def nav(draw):
    round_rect(draw, (70, 34, 1530, 104), 22, "#ffffff", "#dde7f2")
    draw_text(draw, (1455, 73), "ارزین", font(30, True), NAVY)
    draw_text(draw, (1375, 75), "مرجع خرید و فروش شرکت‌ها", font(15), MUTED)
    for label, x in [("فرصت‌ها", 1060), ("سرمایه‌گذاران", 925), ("مشاوران", 790), ("درباره ارزین", 650)]:
        draw_text(draw, (x, 75), label, font(17), TEXT)
    round_rect(draw, (120, 52, 315, 88), 18, BLUE)
    draw_text(draw, (282, 76), "ورود مشاوران", font(14, True), "#ffffff")
    round_rect(draw, (335, 52, 505, 88), 18, "#eaf6fb", CYAN)
    draw_text(draw, (468, 76), "ثبت فرصت", font(14, True), BLUE)


def badge(draw, box, label, value, color):
    shadow_card(draw, box, 18)
    x1, y1, x2, y2 = box
    round_rect(draw, (x2 - 72, y1 + 22, x2 - 28, y1 + 66), 14, color)
    draw_text(draw, (x2 - 92, y1 + 42), label, font(15), MUTED)
    draw_text(draw, (x2 - 92, y1 + 78), value, font(26, True), TEXT)


def screen_landing():
    img = gradient_bg()
    draw = ImageDraw.Draw(img, "RGBA")
    nav(draw)
    draw.ellipse((90, 130, 460, 500), fill=(39, 179, 199, 38))
    draw.ellipse((1120, 80, 1600, 560), fill=(20, 93, 160, 30))

    draw_text(draw, (1450, 210), "ارزین؛ بازار تخصصی معاملات شرکت‌ها و پروژه‌ها", font(36, True), NAVY)
    body = (
        "ارزین وابسته به شرکت تأمین سرمایه نوین، بستری برای انجام معاملات ساختارمند ادغام و تملک است؛ "
        "جایی که صاحبان شرکت‌ها، سرمایه‌گذاران و مشاوران مالی باتجربه در یک شبکه تخصصی به هم متصل می‌شوند."
    )
    paragraph(draw, 1450, 275, body, font(20), MUTED, 760, 8)
    round_rect(draw, (1130, 430, 1450, 492), 22, BLUE)
    draw_text(draw, (1410, 470), "مشاهده فرصت‌های سرمایه‌گذاری", font(20, True), "#ffffff")
    round_rect(draw, (910, 430, 1115, 492), 22, "#ffffff", "#cde3ef")
    draw_text(draw, (1080, 470), "ثبت شرکت یا پروژه", font(18, True), BLUE)

    for i, (label, value, color) in enumerate(
        [("شرکت‌های آماده واگذاری", "۲۴۰+", CYAN), ("سرمایه‌گذاران فعال", "۱۲۰۰+", GREEN), ("مشاوران M&A", "۸۵+", GOLD)]
    ):
        badge(draw, (980 - i * 310, 570, 1260 - i * 310, 705), label, value, color)

    shadow_card(draw, (120, 205, 760, 760), 30)
    draw_text(draw, (710, 270), "شبکه ارزین", font(28, True), NAVY)
    nodes = [("صاحبان پروژه", 610, 385, CYAN), ("سرمایه‌گذاران", 370, 315, GREEN), ("مشاوران ادغام و تملک", 315, 555, GOLD), ("ارزش‌گذاری و مذاکره", 585, 620, BLUE)]
    for label, cx, cy, color in nodes:
        draw.ellipse((cx - 54, cy - 54, cx + 54, cy + 54), fill=color)
        draw_text(draw, (cx + 95, cy + 8), label, font(16, True), TEXT)
    for a, b in [(0, 1), (1, 2), (2, 3), (3, 0), (0, 2)]:
        _, x1, y1, _ = nodes[a]
        _, x2, y2, _ = nodes[b]
        draw.line((x1, y1, x2, y2), fill=(20, 93, 160, 70), width=4)
    img.save(OUT / "landing.png")


def screen_marketplace():
    img = Image.new("RGB", (W, H), "#f7f9fc")
    draw = ImageDraw.Draw(img, "RGBA")
    nav(draw)
    draw_text(draw, (1460, 160), "فرصت‌های خرید شرکت و جذب سرمایه", font(34, True), NAVY)
    draw_text(draw, (1460, 205), "نمایی از بازار اختصاصی ارزین برای پروژه‌ها و شرکت‌های قابل واگذاری", font(18), MUTED)
    round_rect(draw, (90, 145, 510, 205), 18, "#ffffff", "#dce6ef")
    draw_text(draw, (480, 184), "جستجو در صنعت، مبلغ، استان یا نوع معامله", font(16), MUTED)
    for i, label in enumerate(["همه صنایع", "ادغام و تملک", "جذب سرمایه", "واگذاری سهام"]):
        x = 1080 - i * 155
        round_rect(draw, (x, 240, x + 130, 280), 16, "#ffffff" if i else BLUE, "#dce6ef")
        draw_text(draw, (x + 104, 266), label, font(14, True), "#ffffff" if i == 0 else TEXT)

    projects = [
        ("هلدینگ غذایی", "جذب سرمایه", "۳۲۰ میلیارد ریال", GREEN),
        ("کارخانه قطعات خودرو", "واگذاری ۶۰٪ سهام", "۱,۸۰۰ میلیارد ریال", BLUE),
        ("پلتفرم سلامت دیجیتال", "سرمایه‌گذار راهبردی", "۴۵۰ میلیارد ریال", CYAN),
        ("شرکت لجستیک منطقه‌ای", "فروش کامل", "۹۲۰ میلیارد ریال", GOLD),
        ("نیروگاه مقیاس کوچک", "توسعه پروژه", "۲,۱۰۰ میلیارد ریال", GREEN),
        ("تولیدکننده مواد شیمیایی", "ادغام و تملک", "۷۸۰ میلیارد ریال", BLUE),
    ]
    for i, item in enumerate(projects):
        col = i % 3
        row = i // 3
        x1 = 105 + col * 490
        y1 = 330 + row * 225
        shadow_card(draw, (x1, y1, x1 + 440, y1 + 178), 20)
        title, tag, price, color = item
        round_rect(draw, (x1 + 235, y1 + 22, x1 + 408, y1 + 58), 16, color)
        draw_text(draw, (x1 + 392, y1 + 46), tag, font(12, True), "#ffffff")
        draw_text(draw, (x1 + 394, y1 + 92), title, font(23, True), NAVY)
        draw_text(draw, (x1 + 394, y1 + 126), price, font(18), TEXT)
        draw_text(draw, (x1 + 394, y1 + 154), "دارای گزارش اولیه و مشاور اختصاصی", font(14), MUTED)
        draw.line((x1 + 30, y1 + 72, x1 + 160, y1 + 72), fill=color, width=8)
        draw.line((x1 + 30, y1 + 102, x1 + 205, y1 + 102), fill=(20, 93, 160, 70), width=8)
    img.save(OUT / "marketplace.png")


def screen_dashboard():
    img = Image.new("RGB", (W, H), "#eef3f8")
    draw = ImageDraw.Draw(img, "RGBA")
    nav(draw)
    draw_text(draw, (1460, 155), "داشبورد شبکه معاملات", font(34, True), NAVY)

    for i, (label, value, color) in enumerate(
        [("فرصت‌های فعال", "۷۶", BLUE), ("سرمایه‌گذاران بررسی‌شده", "۳۴۸", GREEN), ("ارزش معاملات در جریان", "۱۲.۴ همت", GOLD)]
    ):
        badge(draw, (1060 - i * 325, 205, 1365 - i * 325, 330), label, value, color)

    shadow_card(draw, (870, 380, 1465, 760), 24)
    draw_text(draw, (1415, 430), "قیف معامله", font(24, True), NAVY)
    steps = [("ثبت فرصت", 82), ("ارزیابی اولیه", 58), ("ارسال NDA", 41), ("مذاکره", 24), ("توافق نهایی", 9)]
    for i, (label, value) in enumerate(steps):
        y = 495 + i * 45
        draw_text(draw, (1415, y), label, font(16), TEXT)
        round_rect(draw, (1010, y - 18, 1330, y + 4), 10, "#dbeafe")
        round_rect(draw, (1010, y - 18, 1010 + value * 3, y + 4), 10, BLUE)
        draw_ltr(draw, (960, y - 17), str(value), font(16, True), BLUE)

    shadow_card(draw, (110, 380, 820, 760), 24)
    draw_text(draw, (770, 430), "نقشه صنایع", font(24, True), NAVY)
    bars = [220, 310, 170, 280, 360, 250]
    labels = ["فناوری", "صنعت", "سلامت", "انرژی", "مالی", "لجستیک"]
    for i, b in enumerate(bars):
        x = 190 + i * 95
        draw.rounded_rectangle((x, 700 - b, x + 48, 700), radius=12, fill=[BLUE, GREEN, CYAN, GOLD, "#7c3aed", "#ef4444"][i])
        draw_text(draw, (x + 60, 730), labels[i], font(13), MUTED, anchor="ma")
    img.save(OUT / "dashboard.png")


def screen_advisors():
    img = Image.new("RGB", (W, H), "#f8fafc")
    draw = ImageDraw.Draw(img, "RGBA")
    nav(draw)
    draw_text(draw, (1460, 160), "فرآیند تخصصی مشاوران ادغام و تملک", font(34, True), NAVY)
    paragraph(
        draw,
        1460,
        210,
        "ارزین با کمک شبکه‌ای از مشاوران مالی، مسیر شناسایی فرصت، ارزش‌گذاری، مذاکره، مستندسازی و نهایی‌سازی معامله را ساختارمند می‌کند.",
        font(19),
        MUTED,
        880,
        8,
    )
    stages = [
        ("۱", "شناسایی فرصت", "ثبت شرکت، پروژه یا نیاز سرمایه‌گذاری"),
        ("۲", "غربالگری و اعتبارسنجی", "بررسی مدارک، مالکیت و شاخص‌های مالی"),
        ("۳", "معرفی به سرمایه‌گذاران", "ارسال فرصت به شبکه هدفمند سرمایه‌گذاران"),
        ("۴", "مذاکره و ارزش‌گذاری", "پشتیبانی مشاوران M&A تا توافق نهایی"),
    ]
    for i, (num, title, desc) in enumerate(stages):
        x1 = 955 - (i % 2) * 640
        y1 = 340 + (i // 2) * 210
        shadow_card(draw, (x1, y1, x1 + 560, y1 + 155), 24)
        draw.ellipse((x1 + 455, y1 + 34, x1 + 525, y1 + 104), fill=BLUE if i % 2 == 0 else GREEN)
        draw_ltr(draw, (x1 + 490, y1 + 51), num, font(28, True), "#ffffff", anchor="ma")
        draw_text(draw, (x1 + 430, y1 + 62), title, font(22, True), NAVY)
        paragraph(draw, x1 + 430, y1 + 98, desc, font(16), MUTED, 370, 2)

    round_rect(draw, (520, 760, 1080, 820), 24, NAVY)
    draw_text(draw, (1025, 800), "نتیجه: معامله شفاف‌تر، سریع‌تر و قابل اعتمادتر", font(21, True), "#ffffff")
    img.save(OUT / "advisor-network.png")


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    screen_landing()
    screen_marketplace()
    screen_dashboard()
    screen_advisors()
    print(f"generated {OUT}")


if __name__ == "__main__":
    main()

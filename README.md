# OptiVerse Academy — Website

A professional, colorful, light-themed single-page site by **Dr. Navid Shirzadi** — Applied Scientist & Ph.D. in Engineering. Every course card links directly to the corresponding Udemy course.

Inspired by [The App Brewery](https://www.appbrewery.com/), the site uses a warm cream background, playful serif headlines (Fraunces), bold pop-shadow cards, and unique auto-generated SVG cover art for every course — no external images required.

---

## 📁 Structure

```
Academy Website/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── courses.js   ← EDIT THIS to update course data
│   └── main.js
└── README.md
```

No dependencies. No build step. Pure HTML/CSS/JS.

---

## 🚀 Run locally

```powershell
# Option 1: Python
python -m http.server 8000

# Option 2: Node
npx serve .
```

Then open http://localhost:8000

---

## ✏️ Customize

### 1. Course Udemy URLs (important!)

Open `js/courses.js` and replace each course's `url` with the real Udemy link from your instructor dashboard. The placeholders follow Udemy's slug convention but should be verified.

### 2. Course cover art

Every course auto-generates a unique SVG cover based on two fields in `js/courses.js`:

- **`theme`** — background color palette. Options: `pink`, `purple`, `teal`, `yellow`, `green`, `blue`, `coral`, `sunset`, `forest`, `midnight`
- **`icon`** — foreground icon. Options: `brain`, `rocket`, `chip`, `code`, `chart`, `flask`, `wind`, `building`, `bolt`, `leaf`, `gears`, `target`, `git`, `data`, `terminal`, `atom`

Mix and match freely — there are 16 icons × 10 themes = 160 combinations.

If you'd rather use real photos/thumbnails instead of the generated SVGs, you can:
- Add an `image` field to a course (e.g. `image: "assets/my-course.jpg"`)
- Adjust `buildCoverSvg()` in `js/main.js` to render an `<img>` when `course.image` is set

### 3. Replace the instructor photo

The About section currently uses a stylized placeholder avatar (SVG). To use a real photo:

1. Save your image to `assets/navid.jpg`
2. In `index.html`, replace the `<svg>` inside `.photo-frame` with:

   ```html
   <img src="assets/navid.jpg" alt="Dr. Navid Shirzadi" style="width:100%;height:100%;object-fit:cover;" />
   ```

### 4. Update contact email

Search `mailto:hello@optiverse.academy` in `index.html` and swap in your real address.

### 5. Colors / theme

Edit the CSS variables at the top of `css/styles.css`:

```css
:root {
  --bg: #FFF8F1;
  --pink: #FF5A87;
  --purple: #7C5CFF;
  --teal: #22C1DC;
  --yellow: #FFB020;
  ...
}
```

---

## 🌐 Deploying

The site is 100% static — deploy anywhere free:

- **GitHub Pages**: Push to a repo, enable Pages on `main`.
- **Netlify**: Drag-and-drop the folder at [app.netlify.com/drop](https://app.netlify.com/drop).
- **Vercel**: `npx vercel` in the folder.
- **Cloudflare Pages**: Connect the repo, no build command needed.

---

## ✨ Features

- Light, warm, colorful theme with playful pop-shadows (App Brewery-style)
- Fraunces serif headlines paired with Inter body text
- Category selection cards + filter chips + live search
- Auto-generated SVG cover art for every course (16 icons × 10 palettes)
- Highest-rated courses shown first automatically
- Fully responsive (mobile / tablet / desktop)
- Sticky navigation, animated hero, marquee tech strip
- Accessible: semantic HTML, ARIA labels, keyboard-friendly, respects `prefers-reduced-motion`
- SEO meta tags
- Zero dependencies, zero build tools

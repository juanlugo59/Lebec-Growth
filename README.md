# Lebec Investor One-Pager

Password-protected scrollytelling investor page for Lebec's $1M SAFE note raise.

## Quick Start

1. Open `index.html` in a browser
2. Enter password: `lebec2026` (change in `js/main.js`)
3. Scroll through the presentation

## Structure

```
investor-page/
├── index.html          # Main page
├── css/
│   └── style.css       # All styles (brand colors, animations)
├── js/
│   └── main.js         # Password gate, GSAP animations, D3 chart
├── assets/             # Images (add team photos here)
└── README.md
```

## Features

- **Password Protection** — Session-based, stored in sessionStorage
- **GSAP Scroll Animations** — Fade-up reveals, parallax, staggered elements
- **D3.js Data Viz** — Animated bar chart for the $5T gap
- **Team Carousel** — 3D tilt effect inspired by Stripe Sessions
- **Animated Counters** — Numbers count up on scroll
- **Responsive** — Mobile-friendly layout
- **Analytics Ready** — Plausible + Clarity snippets (uncomment to enable)

## Customization

### Change Password

In `js/main.js`, line 10:
```js
const CONFIG = {
  password: 'lebec2026', // Change this
  ...
};
```

### Add Team Photos

Replace the placeholder initials with actual images:

1. Add photos to `assets/` folder
2. In `index.html`, replace:
```html
<div class="team-photo-placeholder">AL</div>
```
with:
```html
<img src="assets/alix-lebec.jpg" alt="Alix Lebec" class="team-photo-img">
```

3. Add this CSS to `style.css`:
```css
.team-photo-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}
```

### Enable Analytics

#### Plausible
1. Sign up at plausible.io
2. Add your domain
3. Uncomment the script in `index.html` (line 25)
4. Replace `invest.lebec.co` with your domain

#### Microsoft Clarity
1. Sign up at clarity.microsoft.com
2. Create a new project
3. Copy your project ID
4. Uncomment the script in `index.html` (lines 28-35)
5. Replace `YOUR_CLARITY_PROJECT_ID`

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import in Vercel
3. Set custom domain: `invest.lebec.co`

### Netlify
1. Drag-drop the `investor-page` folder
2. Set custom domain in Site Settings

### Manual
Upload files to any static hosting (S3, GitHub Pages, etc.)

## Brand Colors

| Color | Hex | CSS Variable |
|-------|-----|--------------|
| Royal Blue | #362983 | `--royal-blue` |
| Lilac | #E7E2E8 | `--lilac` |
| Sky Blue | #CFDFE8 | `--sky-blue` |
| Mint Green | #CEDDC7 | `--mint-green` |
| Olive Green | #3FA162 | `--olive-green` |
| Mustard Yellow | #EFB142 | `--mustard-yellow` |
| Ivory | #F6F1E8 | `--ivory` |

## Typography

- **Headlines:** Playfair Display (serif)
- **Body:** Inter (sans-serif)

## Dependencies (CDN)

- GSAP 3.12.5 + ScrollTrigger
- D3.js 7.8.5
- Google Fonts (Playfair Display, Inter)

No build step required — pure HTML/CSS/JS.

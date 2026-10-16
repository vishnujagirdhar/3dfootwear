# NOIR — Luxury Bespoke Footwear Landing Page

A cinematic, minimal, high-end single-page home / landing page for the fictional luxury formal shoe brand **"NOIR"** (black leather oxford).

Visual and motion inspiration: *syntilay.com* (clean, minimal, high-end product storytelling, huge serif typography, smooth scroll-driven 3D choreography).

---

## Tech Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Smooth Scroll**: Lenis (synced with GSAP ScrollTrigger ticker)
- **Animation**: GSAP + ScrollTrigger
- **3D**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Icons**: Lucide React

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
```bash
npm run build
npm run preview
```

---

## How to Replace the 3D Model with a Real GLB

The application includes a universal `<Shoe />` component (`src/components/Shoe.jsx`) with automatic asset detection:

1. Place your 3D shoe model file in the public folder as:
   ```
   public/shoe.glb
   ```
2. Reload the page. The app will immediately detect the file and render your custom GLB model in place of the procedural oxford.
3. If the file is absent or fails to load, it automatically falls back to the stylized procedural Three.js oxford without any manual code changes.
4. To customize the path, update `DEFAULT_MODEL_PATH` in `src/components/Shoe.jsx`.

---

## Design System & Motion Features

- **Palette**: Near-black (`#0a0a0a`), off-white (`#f4f1ec`), and warm brushed brass (`#b08d57`).
- **Typography**: Cormorant Garamond & Playfair Display (editorial serif) + Inter (clean geometric sans).
- **Sticky Nav**: Minimal pill navbar with background blur that hides on scroll down and reveals on scroll up.
- **Preloader**: 0 to 100% counter with curtain reveal.
- **Hero**: Line-by-line masked typography reveal with idle floating 3D oxford.
- **Pinned 3D Scroll Story**: 500vh sticky sequence with two-way scrubbed 360° rotation, tilt angles (upper, top welt, oak bark sole, finished profile), and four narrative callouts.
- **Velocity Marquee**: Infinite typography ribbon that accelerates smoothly on fast scroll.
- **Stacked Sticky Collection Cards**: Oxford No. 01, Derby No. 02, and Loafer No. 03 that stack and scale down to 0.92 with dimming.
- **Craft Horizontal Sequence**: Pinned horizontal process track with large numerals that fill with color on scroll.
- **Manifesto & Story Stats**: Word-by-word scroll highlighting paragraph and animated number counters.
- **Accessible FAQ**: Smooth animated accordion with rotating brass plus glyphs.
- **Footer**: Grand rising NOIR wordmark, newsletter subscription, and salon directory.

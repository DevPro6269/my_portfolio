# Portfolio — GSAP Animated Design Spec

**Date:** 2026-06-09
**Status:** Approved

---

## Overview

A single-page personal portfolio for Dev Rathore, AI Full Stack Engineer. Built with Next.js + TypeScript, GSAP ScrollTrigger for scroll-driven animations, and Lenis for smooth scrolling. Dark Futuristic visual theme — neon cyan/green on black, terminal/glitch aesthetics. Targets mixed audiences: recruiters, freelance clients, and the dev community.

---

## Visual Identity

| Property | Value |
|---|---|
| Background | `#0a0a0f` (near-black) |
| Primary accent | `#00ffcc` (neon cyan) |
| Secondary accent | `#ff0066` (used only in glitch effects) |
| Body font | Inter (via `next/font/google`) |
| Code/label font | Monospace (JetBrains Mono or similar) |
| Scanline overlay | Repeating linear gradient at 2% opacity — subtle CRT feel |

---

## Tech Stack

| Package | Purpose |
|---|---|
| `next` + `typescript` | Framework, SSG/SSR, routing |
| `gsap` | Core animations + ScrollTrigger plugin (free) |
| `splitting` | Character/word splitting for text animations — free alternative to GSAP's paid SplitText plugin |
| `@gsap/react` | `useGSAP()` hook — auto-cleanup of GSAP contexts |
| `lenis` | Smooth scroll, ticker integrated with GSAP |
| `tailwindcss` | Utility CSS for layout and spacing only |

---

## Architecture

### Approach: Component-Per-Section

Each section is a self-contained React component with its own `useGSAP()` hook and `ScrollTrigger` instance. No centralized animation orchestrator — GSAP contexts handle cleanup automatically.

### Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout, Lenis provider
│   │   ├── page.tsx                # Single page — all sections composed here
│   │   └── globals.css             # CSS vars, base dark theme, scanlines
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          # Fixed top nav with section anchor links
│   │   │   └── SmoothScroller.tsx  # Lenis wrapper, GSAP ticker integration
│   │   └── sections/
│   │       ├── Hero.tsx
│   │       ├── About.tsx
│   │       ├── Skills.tsx
│   │       ├── Projects.tsx
│   │       ├── Experience.tsx
│   │       └── Contact.tsx
│   ├── hooks/
│   │   └── useScrollTrigger.ts     # Thin wrapper for consistent ScrollTrigger defaults
│   └── lib/
│       └── gsap.ts                 # GSAP plugin registration (ScrollTrigger, SplitText)
└── public/
```

### Lenis + GSAP Integration

```ts
// SmoothScroller.tsx
const lenis = new Lenis()
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
ScrollTrigger.scrollerProxy(...)
```

---

## Sections

### 01 — Hero

**Layout:** Full viewport (`100vh`), vertically centered content, fixed Navbar overlaid.

**Content:**
- Label: `HELLO, I AM` (monospace, cyan, small caps)
- Name line 1: `Dev` (white, 52px, 900 weight)
- Name line 2: `Rathore` (cyan, 52px, 900 weight)
- Subtitle: 1-line bio — "AI Full Stack Engineer — building intelligent products with Python, FastAPI, Next.js & LLMs."
- CTAs: `View Projects` (solid cyan/black) + `Download CV` (outlined)
- Scroll indicator: thin vertical line + `SCROLL` label at bottom center
- Background: scanline overlay, subtle grid or noise texture

**GSAP Animation (on page load — no ScrollTrigger):**
1. Label `HELLO, I AM` — fade in from opacity 0, delay 0.2s
2. `Dev` — slides up from `translateY(40px)`, opacity 0 → 1, duration 0.6s
3. `Rathore` — same, stagger 0.1s after `Dev`
4. Subtitle — fade in, delay after name
5. CTA buttons — scale from 0.9, fade in, stagger 0.1s
6. Navbar — fade in last
7. Scroll indicator — fade in + subtle float loop

---

### 02 — About

**Layout:** Two-column grid. Left: text + stats. Right: avatar/photo placeholder.

**Content:**
- Section label: `// about.me`
- Headline: `I build things that think.`
- Bio paragraph: 2–3 sentences about background and focus
- Stats: `3+ Years`, `20+ Projects`, `5+ Clients` (numbers to be updated by user)
- Right: circular avatar with double-ring border glow

**GSAP Animation (ScrollTrigger, `start: "top 75%"`):**
1. Left column — slides in from `translateX(-60px)`, opacity 0 → 1
2. Avatar — scales from 0.8, opacity 0 → 1 (simultaneous, slight delay)
3. Counter numbers — count up from 0 to final value over 1.2s once in view

---

### 03 — Skills

**Layout:** Section label + 4-column grid of skill cards. Cards grouped by category (AI, Backend, Frontend, Tools).

**Content:**
- Categories: AI (LLMs, LangChain, Google ADK, RAG), Backend (Python, FastAPI, PostgreSQL, SQLAlchemy), Frontend (Next.js, TypeScript, React, Tailwind), Tools (Docker, Git, Alembic, Bun)
- Each card: icon + skill name

**GSAP Animation (ScrollTrigger, `start: "top 70%"`):**
1. Category label slides in first
2. Cards stagger-reveal (scale + fade) with 0.05s between each
3. Cards in same row stagger left-to-right
4. Hover: card lifts (`translateY -4px`), border glow intensifies

---

### 04 — Projects

**Layout:** Section label + horizontal card row. Uses a wide inner container (not native `overflow-x: scroll`) — GSAP `Draggable` handles the drag interaction so it works cleanly with Lenis. 3–4 cards visible at a time on desktop.

**Content per card:**
- Project image/screenshot placeholder (user fills in)
- Project name
- 1-line description
- Tech stack tags
- `View Project` link (reveals on hover via clip-path wipe)
- `GitHub` icon link

**Projects to include (user to verify/update):**
- Siharilabs Platform — AI agent runtime + WhatsApp API (Python, FastAPI, PostgreSQL)
- Chatverce — WhatsApp Manager frontend (Next.js, TypeScript, Redux)
- Additional projects as desired

**GSAP Animation (ScrollTrigger, `start: "top 70%"`):**
1. Cards slide in from right with stagger 0.12s
2. Active/first card has full cyan border glow
3. Hover: card lifts `translateY -8px`, border glow increases
4. `View Project` button: clip-path wipe reveal on hover (left → right)

---

### 05 — Experience

**Layout:** Two-column — thin left column for timeline line + dots, right column for entries.

**Content:**
- Entry format: Date range (monospace cyan) → Role title → Company + description
- Entries to be filled in by user (at least 2–3 roles)

**GSAP Animation (ScrollTrigger, `scrub: true`):**
1. Timeline vertical line draws downward (`scaleY` 0 → 1, `transformOrigin: top`)
2. Each entry fades + slides in from left as the timeline line reaches it
3. Active dot pulses with a repeating glow (`box-shadow` animation, `repeat: -1, yoyo: true`)

---

### 06 — Contact

**Layout:** Full-width centered section. Big headline, 1-line tagline, CTA button + social icon row.

**Content:**
- Headline: `Let's Build Something.`
- Tagline: `Open for freelance work and full-time roles.`
- Primary CTA: `Send Email` (mailto link)
- Social links: GitHub, LinkedIn, Twitter/X
- Footer line: copyright + built-with note

**GSAP Animation (ScrollTrigger, `start: "top 75%"`):**
1. `Let's Build` — typewriter effect, character by character
2. `Something.` — glitch reveal (RGB split, resolves to clean text)
3. Tagline — fade in
4. Social icons — spring stagger pop-in (scale 0 → 1.1 → 1)
5. CTA button — subtle idle pulse (`scale 1 → 1.02`, `repeat: -1, yoyo: true`)

---

## Navbar

**Fixed** at top. Transparent initially, adds `backdrop-filter: blur` + subtle border on scroll.

**Items:** Logo (`DR` monospace) | About | Skills | Projects | Experience | Hire Me (cyan outlined CTA)

**GSAP:** Active section highlight updates as ScrollTrigger fires per section.

---

## Global Animation Defaults

```ts
// lib/gsap.ts
gsap.defaults({ ease: "power3.out", duration: 0.7 })
ScrollTrigger.defaults({ toggleActions: "play none none none" })
```

- All `useGSAP()` calls use `{ scope: containerRef }` to scope selectors
- All ScrollTriggers cleaned up automatically via GSAP context on component unmount

---

## Deployment

- Host: Vercel (free tier)
- Domain: user's custom domain (optional)
- Add `.superpowers/` to `.gitignore`

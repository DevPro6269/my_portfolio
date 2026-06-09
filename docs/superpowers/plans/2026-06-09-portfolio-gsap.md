# Portfolio GSAP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page animated portfolio for Dev Rathore using Next.js 15, TypeScript, GSAP ScrollTrigger, and Lenis smooth scroll with a Dark Futuristic (neon cyan/black) aesthetic.

**Architecture:** Component-per-section — each of the 6 sections (Hero, About, Skills, Projects, Experience, Contact) is a self-contained `'use client'` component with its own `useGSAP()` hook. Lenis smooth scroll feeds into GSAP's ticker via a `SmoothScroller` wrapper in the root layout.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, GSAP 3 + ScrollTrigger + Draggable (all free), `@gsap/react` (`useGSAP` hook), Lenis, Vitest + React Testing Library.

---

## File Map

| File | Responsibility |
|---|---|
| `src/lib/gsap.ts` | Register GSAP plugins once; export `gsap`, `ScrollTrigger`, `Draggable` |
| `src/app/globals.css` | CSS vars (`--color-bg`, `--color-accent`), `.scanlines` utility, base reset |
| `src/app/layout.tsx` | Inter font, metadata, `SmoothScroller` + `Navbar` wrappers |
| `src/app/page.tsx` | Compose all 6 section components |
| `src/components/layout/SmoothScroller.tsx` | Lenis + GSAP ticker integration |
| `src/components/layout/Navbar.tsx` | Fixed nav, scroll-blur effect, anchor links |
| `src/components/sections/Hero.tsx` | Split-text stagger entrance, scanlines, CTAs |
| `src/components/sections/About.tsx` | Two-column layout, count-up stats |
| `src/components/sections/Skills.tsx` | Category grid, stagger-reveal cards |
| `src/components/sections/Projects.tsx` | GSAP Draggable horizontal card track |
| `src/components/sections/Experience.tsx` | Animated vertical timeline |
| `src/components/sections/Contact.tsx` | Typewriter headline, glitch reveal, social links |
| `src/data/skills.ts` | Skills data by category |
| `src/data/projects.ts` | Projects data |
| `src/data/experience.ts` | Experience entries |
| `src/test/setup.ts` | Vitest globals, GSAP + Lenis mocks |
| `vitest.config.ts` | Vitest config with jsdom + path alias |

---

## Task 1: Project Scaffold + Test Setup

**Files:**
- Create: `portfolio/` (root — run scaffold here)
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`

- [ ] **Step 1: Scaffold Next.js app**

Run from `/Users/devrathore/Desktop/developement/`:
```bash
cd portfolio && bunx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git
```
When prompted: choose defaults (yes to all).

- [ ] **Step 2: Install animation dependencies**

```bash
bun add gsap @gsap/react lenis
bun add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom
```

- [ ] **Step 3: Create vitest.config.ts**

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    alias: { '@': resolve(__dirname, './src') },
  },
})
```

- [ ] **Step 4: Create src/test/setup.ts**

```ts
import '@testing-library/jest-dom'
import { vi } from 'vitest'

vi.mock('@/lib/gsap', () => ({
  gsap: {
    registerPlugin: vi.fn(),
    defaults: vi.fn(),
    timeline: () => ({
      from: vi.fn().mockReturnThis(),
      to: vi.fn().mockReturnThis(),
      call: vi.fn().mockReturnThis(),
    }),
    from: vi.fn(),
    to: vi.fn(),
    ticker: { add: vi.fn(), remove: vi.fn(), lagSmoothing: vi.fn() },
  },
  ScrollTrigger: {
    create: vi.fn(),
    defaults: vi.fn(),
    update: vi.fn(),
  },
  Draggable: { create: vi.fn() },
}))

vi.mock('@gsap/react', () => ({
  useGSAP: vi.fn(),
}))

vi.mock('lenis', () => ({
  default: vi.fn().mockImplementation(() => ({
    on: vi.fn(),
    raf: vi.fn(),
    destroy: vi.fn(),
  })),
}))
```

- [ ] **Step 5: Add test script to package.json**

Open `package.json` and add to `"scripts"`:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 6: Add .gitignore entries**

Append to `.gitignore`:
```
.superpowers/
```

- [ ] **Step 7: Verify scaffold runs**

```bash
bun dev
```
Expected: Next.js dev server starts on http://localhost:3000, default page visible.

- [ ] **Step 8: Commit**

```bash
git init && git add package.json package-lock.json bun.lock tsconfig.json next.config.ts tailwind.config.ts postcss.config.mjs vitest.config.ts src/test/setup.ts .gitignore
git commit -m "feat: scaffold Next.js portfolio with GSAP + Lenis + Vitest"
```

---

## Task 2: GSAP Registration + Global Styles + Layout

**Files:**
- Create: `src/lib/gsap.ts`
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create src/lib/gsap.ts**

```ts
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/Draggable'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Draggable)
  gsap.defaults({ ease: 'power3.out', duration: 0.7 })
  ScrollTrigger.defaults({ toggleActions: 'play none none none' })
}

export { gsap, ScrollTrigger, Draggable }
```

- [ ] **Step 2: Replace src/app/globals.css**

```css
@import "tailwindcss";

:root {
  --color-bg: #0a0a0f;
  --color-accent: #00ffcc;
  --color-accent-dim: rgba(0, 255, 204, 0.15);
  --color-muted: #555555;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: auto; /* Lenis handles smooth scroll */
}

body {
  background-color: var(--color-bg);
  color: #ffffff;
  -webkit-font-smoothing: antialiased;
}

.scanlines {
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 3px,
    rgba(0, 255, 204, 0.015) 3px,
    rgba(0, 255, 204, 0.015) 4px
  );
  pointer-events: none;
}
```

- [ ] **Step 3: Replace src/app/layout.tsx**

```tsx
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Dev Rathore — AI Full Stack Engineer',
  description:
    'Portfolio of Dev Rathore, AI Full Stack Engineer building intelligent products with Python, FastAPI, Next.js & LLMs.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="font-[var(--font-inter)]">{children}</body>
    </html>
  )
}
```

Note: `SmoothScroller` and `Navbar` are added in Task 3.

- [ ] **Step 4: Run tests**

```bash
bun test
```
Expected: 0 tests, 0 failures (no tests yet).

- [ ] **Step 5: Commit**

```bash
git add src/lib/gsap.ts src/app/globals.css src/app/layout.tsx
git commit -m "feat: GSAP plugin registration, global dark theme styles, Inter + JetBrains Mono fonts"
```

---

## Task 3: SmoothScroller + Navbar

**Files:**
- Create: `src/components/layout/SmoothScroller.tsx`
- Create: `src/components/layout/Navbar.tsx`
- Create: `src/test/components/Navbar.test.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Write failing test**

Create `src/test/components/Navbar.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { Navbar } from '@/components/layout/Navbar'

it('renders logo and nav links', () => {
  render(<Navbar />)
  expect(screen.getByText('DR')).toBeInTheDocument()
  expect(screen.getByText('About')).toBeInTheDocument()
  expect(screen.getByText('Hire Me')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
bun test Navbar
```
Expected: FAIL — `Cannot find module '@/components/layout/Navbar'`

- [ ] **Step 3: Create src/components/layout/SmoothScroller.tsx**

```tsx
'use client'
import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export function SmoothScroller({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis()
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
```

- [ ] **Step 4: Create src/components/layout/Navbar.tsx**

```tsx
'use client'
import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useGSAP(() => {
    gsap.from(navRef.current, { opacity: 0, y: -20, duration: 0.6, delay: 1.2 })
  }, { scope: navRef })

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-4 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md border-b border-white/5' : ''
      }`}
    >
      <a href="#hero" className="font-[var(--font-mono)] text-sm tracking-[3px] text-[var(--color-accent)] font-bold">
        DR
      </a>
      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            className="text-xs tracking-wider text-white/40 hover:text-white transition-colors"
          >
            {label}
          </a>
        ))}
        <a
          href="#contact"
          className="text-xs tracking-wider text-[var(--color-accent)] border border-[var(--color-accent)]/30 px-4 py-1.5 rounded hover:bg-[var(--color-accent)]/10 transition-colors"
        >
          Hire Me
        </a>
      </div>
    </nav>
  )
}
```

- [ ] **Step 5: Update src/app/layout.tsx to add SmoothScroller + Navbar**

```tsx
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Navbar } from '@/components/layout/Navbar'
import { SmoothScroller } from '@/components/layout/SmoothScroller'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Dev Rathore — AI Full Stack Engineer',
  description:
    'Portfolio of Dev Rathore, AI Full Stack Engineer building intelligent products with Python, FastAPI, Next.js & LLMs.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="font-[var(--font-inter)]">
        <SmoothScroller>
          <Navbar />
          {children}
        </SmoothScroller>
      </body>
    </html>
  )
}
```

- [ ] **Step 6: Run test — verify it passes**

```bash
bun test Navbar
```
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/components/layout/ src/app/layout.tsx src/test/components/Navbar.test.tsx
git commit -m "feat: SmoothScroller (Lenis + GSAP ticker) and Navbar with scroll-blur effect"
```

---

## Task 4: Hero Section

**Files:**
- Create: `src/components/sections/Hero.tsx`
- Create: `src/test/components/Hero.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/test/components/Hero.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { Hero } from '@/components/sections/Hero'

it('renders name and CTAs', () => {
  render(<Hero />)
  expect(screen.getByText('Dev')).toBeInTheDocument()
  expect(screen.getByText('Rathore')).toBeInTheDocument()
  expect(screen.getByText('View Projects')).toBeInTheDocument()
  expect(screen.getByText('Download CV')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
bun test Hero
```
Expected: FAIL — `Cannot find module '@/components/sections/Hero'`

- [ ] **Step 3: Create src/components/sections/Hero.tsx**

```tsx
'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline()
    tl.from('.hero-label',  { opacity: 0, y: 10, duration: 0.5 }, 0.3)
      .from('.hero-line-1', { opacity: 0, y: 50, duration: 0.6 }, 0.5)
      .from('.hero-line-2', { opacity: 0, y: 50, duration: 0.6 }, 0.65)
      .from('.hero-sub',    { opacity: 0, duration: 0.5 }, 0.9)
      .from('.hero-cta',    { opacity: 0, scale: 0.9, stagger: 0.1, duration: 0.4 }, 1.0)
      .from('.hero-scroll', { opacity: 0, duration: 0.4 }, 1.3)

    gsap.to('.hero-scroll-bar', {
      scaleY: 0.4,
      transformOrigin: 'top',
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex h-screen flex-col justify-center px-8 md:px-16 lg:px-24"
    >
      <div className="scanlines absolute inset-0" />

      <span className="hero-label font-[var(--font-mono)] text-[10px] tracking-[4px] text-[var(--color-accent)]/70 mb-4 uppercase">
        Hello, I am
      </span>
      <h1
        className="hero-line-1 font-black leading-[0.9] tracking-tight text-white overflow-hidden"
        style={{ fontSize: 'clamp(56px, 10vw, 100px)' }}
      >
        Dev
      </h1>
      <h1
        className="hero-line-2 font-black leading-[0.9] tracking-tight text-[var(--color-accent)] mb-6 overflow-hidden"
        style={{ fontSize: 'clamp(56px, 10vw, 100px)' }}
      >
        Rathore
      </h1>
      <p className="hero-sub max-w-md text-sm text-white/35 leading-relaxed mb-10">
        AI Full Stack Engineer — building intelligent products with Python, FastAPI, Next.js &amp; LLMs.
      </p>
      <div className="flex flex-wrap gap-4">
        <a
          href="#projects"
          className="hero-cta px-7 py-3 bg-[var(--color-accent)] text-black text-xs font-bold tracking-widest rounded hover:opacity-80 transition-opacity"
        >
          View Projects
        </a>
        <a
          href="/cv.pdf"
          className="hero-cta px-7 py-3 border border-white/15 text-white/50 text-xs tracking-widest rounded hover:border-white/30 transition-colors"
        >
          Download CV
        </a>
      </div>

      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-[var(--font-mono)] text-[8px] tracking-[4px] text-white/15">SCROLL</span>
        <div className="hero-scroll-bar w-px h-6 bg-gradient-to-b from-[var(--color-accent)]/50 to-transparent" />
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test — verify it passes**

```bash
bun test Hero
```
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Hero.tsx src/test/components/Hero.test.tsx
git commit -m "feat: Hero section with split-text stagger entrance animation"
```

---

## Task 5: About Section

**Files:**
- Create: `src/components/sections/About.tsx`
- Create: `src/test/components/About.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/test/components/About.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { About } from '@/components/sections/About'

it('renders headline and stat labels', () => {
  render(<About />)
  expect(screen.getByText(/I build things/)).toBeInTheDocument()
  expect(screen.getByText('Years')).toBeInTheDocument()
  expect(screen.getByText('Projects')).toBeInTheDocument()
  expect(screen.getByText('Clients')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
bun test About
```
Expected: FAIL

- [ ] **Step 3: Create src/components/sections/About.tsx**

```tsx
'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

const STATS = [
  { value: 3, suffix: '+', label: 'Years' },
  { value: 20, suffix: '+', label: 'Projects' },
  { value: 5, suffix: '+', label: 'Clients' },
]

export function About() {
  const containerRef = useRef<HTMLElement>(null)
  const statRefs = useRef<(HTMLSpanElement | null)[]>([])

  useGSAP(() => {
    gsap.from('.about-left', {
      opacity: 0,
      x: -60,
      duration: 0.7,
      scrollTrigger: { trigger: containerRef.current, start: 'top 75%' },
    })
    gsap.from('.about-right', {
      opacity: 0,
      scale: 0.85,
      duration: 0.7,
      scrollTrigger: { trigger: containerRef.current, start: 'top 75%' },
    })

    STATS.forEach(({ value }, i) => {
      const el = statRefs.current[i]
      if (!el) return
      const counter = { val: 0 }
      gsap.to(counter, {
        val: value,
        duration: 1.2,
        ease: 'power1.out',
        onUpdate: () => { el.textContent = Math.round(counter.val).toString() },
        scrollTrigger: { trigger: containerRef.current, start: 'top 70%' },
      })
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} id="about" className="py-24 px-8 md:px-16 lg:px-24">
      <span className="font-[var(--font-mono)] text-[10px] tracking-[4px] text-[var(--color-accent)]/70 mb-10 block">
        // about.me
      </span>
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="about-left">
          <h2 className="text-4xl font-black text-white leading-tight mb-5">
            I build things
            <br />
            that <span className="text-[var(--color-accent)]">think.</span>
          </h2>
          <p className="text-sm text-white/40 leading-relaxed mb-10">
            Full stack developer specialising in AI-powered products. I bridge the gap between
            intelligent backends and polished frontends — from LLM agents to production-ready web apps.
          </p>
          <div className="flex gap-10">
            {STATS.map(({ value, suffix, label }, i) => (
              <div key={label}>
                <div className="text-3xl font-black text-[var(--color-accent)]">
                  <span ref={(el) => { statRefs.current[i] = el }}>{value}</span>
                  {suffix}
                </div>
                <div className="font-[var(--font-mono)] text-[9px] text-white/30 tracking-widest mt-1 uppercase">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-right flex justify-center">
          <div className="relative">
            <div className="w-44 h-44 rounded-full border-2 border-[var(--color-accent)]/25 bg-gradient-to-br from-[#0d1a15] to-[#1a1a2e] flex items-center justify-center">
              <span className="font-black text-5xl text-[var(--color-accent)]">DR</span>
            </div>
            <div className="absolute inset-[-12px] rounded-full border border-[var(--color-accent)]/10" />
            <div className="absolute inset-[-24px] rounded-full border border-dashed border-[var(--color-accent)]/5" />
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test — verify it passes**

```bash
bun test About
```
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/About.tsx src/test/components/About.test.tsx
git commit -m "feat: About section with slide-in columns and count-up stats"
```

---

## Task 6: Skills Section + Data

**Files:**
- Create: `src/data/skills.ts`
- Create: `src/components/sections/Skills.tsx`
- Create: `src/test/components/Skills.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/test/components/Skills.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { Skills } from '@/components/sections/Skills'

it('renders skill categories and individual skills', () => {
  render(<Skills />)
  expect(screen.getByText('AI')).toBeInTheDocument()
  expect(screen.getByText('Backend')).toBeInTheDocument()
  expect(screen.getByText('LLMs')).toBeInTheDocument()
  expect(screen.getByText('Python')).toBeInTheDocument()
  expect(screen.getByText('Next.js')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
bun test Skills
```
Expected: FAIL

- [ ] **Step 3: Create src/data/skills.ts**

```ts
export type SkillCategory = {
  label: string
  skills: { name: string; icon: string }[]
}

export const SKILLS: SkillCategory[] = [
  {
    label: 'AI',
    skills: [
      { name: 'LLMs', icon: '🤖' },
      { name: 'LangChain', icon: '🔗' },
      { name: 'Google ADK', icon: '🧠' },
      { name: 'RAG', icon: '📚' },
    ],
  },
  {
    label: 'Backend',
    skills: [
      { name: 'Python', icon: '🐍' },
      { name: 'FastAPI', icon: '⚡' },
      { name: 'PostgreSQL', icon: '🗃️' },
      { name: 'SQLAlchemy', icon: '🔷' },
    ],
  },
  {
    label: 'Frontend',
    skills: [
      { name: 'Next.js', icon: '▲' },
      { name: 'TypeScript', icon: '📘' },
      { name: 'React', icon: '⚛️' },
      { name: 'Tailwind', icon: '🎨' },
    ],
  },
  {
    label: 'Tools',
    skills: [
      { name: 'Docker', icon: '🐳' },
      { name: 'Git', icon: '📦' },
      { name: 'Alembic', icon: '🔄' },
      { name: 'Bun', icon: '🥟' },
    ],
  },
]
```

- [ ] **Step 4: Create src/components/sections/Skills.tsx**

```tsx
'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { SKILLS } from '@/data/skills'

export function Skills() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    containerRef.current!.querySelectorAll('.skill-category').forEach((cat) => {
      const label = cat.querySelector('.skill-cat-label')
      const cards = cat.querySelectorAll('.skill-card')

      ScrollTrigger.create({
        trigger: cat,
        start: 'top 75%',
        onEnter: () => {
          gsap.from(label, { opacity: 0, x: -20, duration: 0.4 })
          gsap.from(cards, {
            opacity: 0, scale: 0.85, y: 20,
            stagger: 0.05, duration: 0.4, delay: 0.15,
          })
        },
      })
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} id="skills" className="py-24 px-8 md:px-16 lg:px-24">
      <span className="font-[var(--font-mono)] text-[10px] tracking-[4px] text-[var(--color-accent)]/70 mb-10 block">
        // tech.stack
      </span>
      <div className="space-y-12">
        {SKILLS.map((cat) => (
          <div key={cat.label} className="skill-category">
            <h3 className="skill-cat-label font-[var(--font-mono)] text-xs tracking-widest text-[var(--color-accent)]/60 mb-4 uppercase">
              {cat.label}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {cat.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="skill-card border border-[var(--color-accent)]/15 rounded-lg p-4 text-center bg-[#0d1a15]/40 hover:-translate-y-1 hover:border-[var(--color-accent)]/40 transition-transform cursor-default"
                >
                  <div className="text-2xl mb-2">{skill.icon}</div>
                  <div className="font-[var(--font-mono)] text-[10px] text-[var(--color-accent)]/80">
                    {skill.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Run test — verify it passes**

```bash
bun test Skills
```
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/data/skills.ts src/components/sections/Skills.tsx src/test/components/Skills.test.tsx
git commit -m "feat: Skills section with per-category stagger-reveal cards"
```

---

## Task 7: Projects Section + Data

**Files:**
- Create: `src/data/projects.ts`
- Create: `src/components/sections/Projects.tsx`
- Create: `src/test/components/Projects.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/test/components/Projects.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { Projects } from '@/components/sections/Projects'

it('renders project titles', () => {
  render(<Projects />)
  expect(screen.getByText('Siharilabs Platform')).toBeInTheDocument()
  expect(screen.getByText('Chatverce')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
bun test Projects
```
Expected: FAIL

- [ ] **Step 3: Create src/data/projects.ts**

```ts
export type Project = {
  title: string
  description: string
  tags: string[]
  liveUrl: string
  githubUrl: string
}

export const PROJECTS: Project[] = [
  {
    title: 'Siharilabs Platform',
    description: 'AI agent runtime + WhatsApp Business API management platform with multi-tenant architecture.',
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'Google ADK'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Chatverce',
    description: 'WhatsApp Manager — real-time messaging frontend with SSE, infinite scroll, and Redux.',
    tags: ['Next.js', 'TypeScript', 'Redux', 'MUI'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Add Your Project',
    description: 'Update src/data/projects.ts to add your own project here.',
    tags: ['React', 'Node.js'],
    liveUrl: '#',
    githubUrl: '#',
  },
]
```

- [ ] **Step 4: Create src/components/sections/Projects.tsx**

```tsx
'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, Draggable } from '@/lib/gsap'
import { PROJECTS } from '@/data/projects'

export function Projects() {
  const containerRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Entrance: cards slide in from right
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 70%',
      onEnter: () => {
        gsap.from('.project-card', {
          opacity: 0, x: 80, stagger: 0.12, duration: 0.6,
        })
      },
    })

    // Draggable horizontal scroll (no native overflow — compatible with Lenis)
    const track = trackRef.current!
    const container = track.parentElement!
    Draggable.create(track, {
      type: 'x',
      bounds: {
        minX: -(track.scrollWidth - container.offsetWidth),
        maxX: 0,
      },
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} id="projects" className="py-24 overflow-hidden">
      <div className="px-8 md:px-16 lg:px-24 mb-10">
        <span className="font-[var(--font-mono)] text-[10px] tracking-[4px] text-[var(--color-accent)]/70">
          // selected.work
        </span>
      </div>

      {/* No overflow-x:scroll — Draggable handles it */}
      <div className="overflow-hidden pl-8 md:pl-16 lg:pl-24">
        <div ref={trackRef} className="flex gap-5 w-max cursor-grab active:cursor-grabbing select-none">
          {PROJECTS.map((project) => (
            <div
              key={project.title}
              className="project-card w-[300px] flex-shrink-0 border border-[var(--color-accent)]/15 rounded-xl overflow-hidden hover:border-[var(--color-accent)]/35 transition-colors"
            >
              <div className="h-44 bg-gradient-to-br from-[#0d1a15] to-[#0d0d1a] flex items-center justify-center">
                <span className="font-[var(--font-mono)] text-[10px] text-[var(--color-accent)]/15">
                  [ screenshot ]
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-white mb-1 text-sm">{project.title}</h3>
                <p className="text-xs text-white/35 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-[var(--font-mono)] text-[9px] text-[var(--color-accent)]/60 border border-[var(--color-accent)]/15 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.liveUrl}
                    className="text-[10px] text-white/40 hover:text-white transition-colors"
                  >
                    Live ↗
                  </a>
                  <a
                    href={project.githubUrl}
                    className="text-[10px] text-white/40 hover:text-white transition-colors"
                  >
                    GitHub ↗
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Run test — verify it passes**

```bash
bun test Projects
```
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/data/projects.ts src/components/sections/Projects.tsx src/test/components/Projects.test.tsx
git commit -m "feat: Projects section with GSAP Draggable horizontal card track"
```

---

## Task 8: Experience Section + Data

**Files:**
- Create: `src/data/experience.ts`
- Create: `src/components/sections/Experience.tsx`
- Create: `src/test/components/Experience.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/test/components/Experience.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { Experience } from '@/components/sections/Experience'

it('renders experience entries', () => {
  render(<Experience />)
  expect(screen.getByText('Founder & Lead Engineer')).toBeInTheDocument()
  expect(screen.getByText('Siharilabs')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
bun test Experience
```
Expected: FAIL

- [ ] **Step 3: Create src/data/experience.ts**

```ts
export type ExperienceEntry = {
  period: string
  role: string
  company: string
  description: string
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    period: '2023 — Present',
    role: 'Founder & Lead Engineer',
    company: 'Siharilabs',
    description:
      'Building AI-powered communication tools — WhatsApp Business API platform with multi-tenant architecture and LLM-driven agents.',
  },
  {
    period: '2022 — 2023',
    role: 'Full Stack Developer',
    company: 'Freelance',
    description:
      'Built web applications and AI integrations for clients. Specialised in FastAPI backends and React frontends.',
  },
  {
    period: '2021 — 2022',
    role: 'Junior Developer',
    company: 'Previous Company',
    description: 'Started professional development career working on web projects with React and Node.js.',
  },
]
```

- [ ] **Step 4: Create src/components/sections/Experience.tsx**

```tsx
'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { EXPERIENCE } from '@/data/experience'

export function Experience() {
  const containerRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Timeline spine draws downward, scrubbed to scroll
    gsap.from(lineRef.current, {
      scaleY: 0,
      transformOrigin: 'top',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
        end: 'bottom 80%',
        scrub: true,
      },
    })

    // Entries stagger in
    gsap.from('.exp-entry', {
      opacity: 0,
      x: -30,
      stagger: 0.2,
      duration: 0.5,
      scrollTrigger: { trigger: containerRef.current, start: 'top 65%' },
    })

    // Active dot pulse
    gsap.to('.exp-dot-active', {
      boxShadow: '0 0 14px #00ffcc, 0 0 4px #00ffcc',
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} id="experience" className="py-24 px-8 md:px-16 lg:px-24">
      <span className="font-[var(--font-mono)] text-[10px] tracking-[4px] text-[var(--color-accent)]/70 mb-10 block">
        // career.log
      </span>
      <div className="flex gap-8">
        {/* Timeline spine */}
        <div className="flex flex-col items-center pt-1">
          <div ref={lineRef} className="flex flex-col items-center">
            {EXPERIENCE.map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                    i === 0
                      ? 'exp-dot-active bg-[var(--color-accent)]'
                      : 'border-2 border-[var(--color-accent)]/20'
                  }`}
                />
                {i < EXPERIENCE.length - 1 && (
                  <div className="w-px min-h-[90px] bg-gradient-to-b from-[var(--color-accent)]/35 to-[var(--color-accent)]/05" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Entries */}
        <div className="flex flex-col gap-10 flex-1">
          {EXPERIENCE.map((entry) => (
            <div key={entry.role} className="exp-entry">
              <span className="font-[var(--font-mono)] text-[9px] tracking-[2px] text-[var(--color-accent)]/60">
                {entry.period}
              </span>
              <h3 className="font-bold text-white mt-1 mb-0.5 text-base">{entry.role}</h3>
              <p className="text-xs text-white/35 mb-2">{entry.company}</p>
              <p className="text-sm text-white/25 leading-relaxed">{entry.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Run test — verify it passes**

```bash
bun test Experience
```
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/data/experience.ts src/components/sections/Experience.tsx src/test/components/Experience.test.tsx
git commit -m "feat: Experience section with scroll-scrubbed timeline draw animation"
```

---

## Task 9: Contact Section

**Files:**
- Create: `src/components/sections/Contact.tsx`
- Create: `src/test/components/Contact.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/test/components/Contact.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { Contact } from '@/components/sections/Contact'

it('renders CTA and social links', () => {
  render(<Contact />)
  expect(screen.getByText('Send Email')).toBeInTheDocument()
  expect(screen.getByText('GitHub')).toBeInTheDocument()
  expect(screen.getByText('LinkedIn')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
bun test Contact
```
Expected: FAIL

- [ ] **Step 3: Create src/components/sections/Contact.tsx**

```tsx
'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/' },
  { label: 'Twitter', href: 'https://twitter.com/' },
]

export function Contact() {
  const containerRef = useRef<HTMLElement>(null)
  const typeRef = useRef<HTMLSpanElement>(null)
  const glitchRef = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: containerRef.current, start: 'top 75%' },
    })

    // Typewriter: "Let's Build"
    const buildText = "Let's Build"
    if (typeRef.current) {
      typeRef.current.textContent = ''
      buildText.split('').forEach((char, i) => {
        tl.call(() => { typeRef.current!.textContent += char }, [], i * 0.06)
      })
    }

    const afterType = buildText.length * 0.06 + 0.1

    // Glitch reveal: "Something."
    tl.from(glitchRef.current, { opacity: 0, duration: 0.01 }, afterType)
    tl.to(
      glitchRef.current,
      { x: 5, skewX: 10, duration: 0.05, ease: 'none', repeat: 3, yoyo: true },
      afterType,
    )
    tl.to(glitchRef.current, { x: 0, skewX: 0, duration: 0.05 })

    // Rest of section
    tl.from('.contact-sub', { opacity: 0, duration: 0.4 }, '+=0.1')
    tl.from(
      '.contact-social',
      { opacity: 0, scale: 0, stagger: 0.08, duration: 0.3, ease: 'back.out(1.7)' },
      '-=0.1',
    )
    tl.from('.contact-cta', { opacity: 0, scale: 0.9, duration: 0.3 }, '-=0.1')

    // Idle pulse on CTA
    gsap.to('.contact-cta', {
      scale: 1.025,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 2,
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} id="contact" className="py-32 px-8 md:px-16 lg:px-24 text-center">
      <span className="font-[var(--font-mono)] text-[10px] tracking-[4px] text-[var(--color-accent)]/70 mb-8 block">
        // say.hello
      </span>
      <h2
        className="font-black text-white mb-3 leading-tight"
        style={{ fontSize: 'clamp(40px, 8vw, 72px)' }}
      >
        <span ref={typeRef} />
        <br />
        <span ref={glitchRef} className="text-[var(--color-accent)] inline-block">
          Something.
        </span>
      </h2>
      <p className="contact-sub text-sm text-white/35 mb-10">
        Open for freelance work and full-time roles.
      </p>
      <div className="flex justify-center gap-3 mb-8">
        {SOCIALS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-social px-5 py-2.5 border border-white/10 text-white/40 text-xs tracking-wider rounded hover:border-white/25 hover:text-white/70 transition-colors"
          >
            {label}
          </a>
        ))}
      </div>
      <a
        href="mailto:devrathore653@gmail.com"
        className="contact-cta inline-block px-10 py-4 bg-[var(--color-accent)] text-black text-xs font-bold tracking-widest rounded hover:opacity-90 transition-opacity"
      >
        Send Email
      </a>
      <p className="mt-16 font-[var(--font-mono)] text-[10px] text-white/15 tracking-wider">
        © 2026 Dev Rathore · Built with Next.js + GSAP
      </p>
    </section>
  )
}
```

- [ ] **Step 4: Run test — verify it passes**

```bash
bun test Contact
```
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Contact.tsx src/test/components/Contact.test.tsx
git commit -m "feat: Contact section with typewriter + glitch headline and social links"
```

---

## Task 10: Page Composition + Final Polish

**Files:**
- Modify: `src/app/page.tsx`
- Remove: `src/app/favicon.ico` default content (optional, replace with custom)

- [ ] **Step 1: Replace src/app/page.tsx**

```tsx
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { Projects } from '@/components/sections/Projects'
import { Experience } from '@/components/sections/Experience'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </main>
  )
}
```

- [ ] **Step 2: Run all tests**

```bash
bun test
```
Expected: All tests PASS (Navbar, Hero, About, Skills, Projects, Experience, Contact)

- [ ] **Step 3: Start dev server and visually verify each section**

```bash
bun dev
```

Open http://localhost:3000 and manually check:
- [ ] Hero text staggers in on load, scroll indicator pulses
- [ ] Navbar fades in last, blurs on scroll
- [ ] About columns slide in on scroll, numbers count up
- [ ] Skills cards stagger in per category
- [ ] Projects cards drag horizontally, slide in on scroll
- [ ] Experience timeline draws on scroll, dot pulses
- [ ] Contact typewriter runs, "Something." glitches in, CTA pulses

- [ ] **Step 4: Update data files with real content**

Edit `src/data/projects.ts` — replace placeholder `liveUrl` and `githubUrl` values with real links.
Edit `src/data/experience.ts` — update company names and descriptions to match your actual history.
Edit `src/components/sections/About.tsx` — update stat values (`3+`, `20+`, `5+`) if needed.
Edit `src/components/sections/Contact.tsx` — update SOCIALS `href` values with your real profiles.

- [ ] **Step 5: Final commit**

```bash
git add src/app/page.tsx
git commit -m "feat: compose all sections into single-page portfolio"
```

---

## Post-Build: Deploy to Vercel

- [ ] Push to GitHub: `git remote add origin <your-repo-url> && git push -u origin main`
- [ ] Go to https://vercel.com → New Project → Import your repo
- [ ] Vercel auto-detects Next.js — click Deploy
- [ ] Set custom domain in Vercel dashboard (optional)

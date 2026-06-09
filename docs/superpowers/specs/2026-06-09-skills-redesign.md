# Skills Section Redesign

**Date:** 2026-06-09
**Status:** Approved

## Overview

Redesign the Skills section of the portfolio to use real resume data, organized into 4 condensed category tabs with interactive pill-style skill tags and a soft fade animation on tab switch.

## Data

`src/data/skills.ts` is simplified — the `icon` field is dropped entirely. Each category becomes a string array.

```ts
export type SkillCategory = {
  label: string
  skills: string[]
}

export const SKILLS: SkillCategory[] = [
  {
    label: 'Frontend',
    skills: ['Next.js', 'React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
  {
    label: 'Backend',
    skills: ['Python', 'FastAPI', 'Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'MySQL'],
  },
  {
    label: 'Cloud & DevOps',
    skills: ['AWS EC2', 'AWS RDS', 'AWS S3', 'CloudFront', 'NGINX', 'PM2', 'CI/CD', 'Git'],
  },
  {
    label: 'AI',
    skills: ['AI Agents', 'LLMs', 'Google ADK', 'WhatsApp API', 'Instagram API', 'Telegram API'],
  },
]
```

The 6 original resume categories (Languages, Frameworks & Libraries, Databases, Cloud & DevOps, Architecture & Patterns, AI & Integrations) are condensed into 4 by:
- Merging Languages + Frameworks + Databases into Frontend / Backend by role
- Absorbing Architecture & Patterns items into Backend
- Renaming AI & Integrations to AI

## Component Architecture

`src/components/sections/Skills.tsx` — single component, no sub-components.

**State:**
- `activeTab: number` (useState, default 0 = Frontend)

**Refs:**
- `containerRef` on `<section>` — scoped to GSAP context

**Layout:**
```
<section>
  <span>  // tech.stack eyebrow </span>
  <div>   // tab strip — maps SKILLS to <button> elements </div>
  <div>   // pill area — maps SKILLS[activeTab].skills to pill <div>s </div>
</section>
```

## Animations

### Scroll entry (GSAP ScrollTrigger, fires once)
GSAP targets elements by class: `.skills-eyebrow`, `.skills-tab-btn`, `.skills-pill`

- `.skills-eyebrow`: `opacity 0 → 1, x -20 → 0, duration 0.4`
- `.skills-tab-btn`: `opacity 0 → 1, y 10 → 0, stagger 0.06, duration 0.35, delay 0.15`
- `.skills-pill` (initial load only): `opacity 0 → 1, y 12 → 0, stagger 0.04, duration 0.3, delay 0.4`

### Tab switch (CSS transition, no GSAP)
1. Add a `transitioning` CSS class to the pill area wrapper → triggers `opacity: 0` via CSS transition (0.22s ease)
2. A `setTimeout` (220ms, stored in a `useRef` to avoid leaks on unmount) updates `activeTab` state → pills rerender
3. Remove `transitioning` class in the same timeout callback → pills fade back in
4. No stagger on switch — all pills fade as a group for speed

### Pill hover (CSS only)
- `border-color: #ffffff1a → #00ffcc44`
- `color: #ffffff66 → #00ffccaa`
- `transition: 0.2s`
- No translate or scale

## Styling

All styles via Tailwind utility classes, matching the existing portfolio design tokens:

| Token | Value |
|---|---|
| Background | `#0a0a0f` (var --color-bg) |
| Accent | `#00ffcc` (var --color-accent) |
| Font | `font-[var(--font-mono)]` |
| Section padding | `py-24 px-8 md:px-16 lg:px-24` |

**Tab button (inactive):** `border border-[var(--color-accent)]/15 rounded text-[10px] tracking-[2px] uppercase px-4 py-1.5 text-[var(--color-accent)]/40`

**Tab button (active):** adds `border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent)]/8`

**Pill:** `border border-white/10 rounded-full text-[11px] px-[18px] py-[7px] text-white/40 hover:border-[var(--color-accent)]/25 hover:text-[var(--color-accent)]/65 transition-colors`

## Files Changed

| File | Change |
|---|---|
| `src/data/skills.ts` | Remove `icon` field; restructure to 4 categories with string arrays |
| `src/components/sections/Skills.tsx` | Full rewrite — tabbed UI replacing category grid |
| `src/test/components/Skills.test.tsx` | Update tests to match new data shape and tab interaction |

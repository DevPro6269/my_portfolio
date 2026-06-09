# Skills Section Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the emoji-card Skills grid with a 4-tab (Frontend / Backend / Cloud & DevOps / AI) interface showing outline pill badges, with a soft fade on tab switch and a GSAP scroll-entry animation.

**Architecture:** `skills.ts` data is restructured from `{name, icon}[]` objects to plain `string[]` arrays under 4 condensed categories drawn from the resume. `Skills.tsx` is fully rewritten as a single component with `activeTab` + `isTransitioning` state driving the tab UI; GSAP fires once on scroll entry; the tab-switch fade is a pure CSS opacity transition gated by a `setTimeout`.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, GSAP 3 + ScrollTrigger, Vitest + @testing-library/react

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/data/skills.ts` | Rewrite | Data only — 4 categories with `string[]` skills |
| `src/components/sections/Skills.tsx` | Rewrite | Tab UI, fade transition, GSAP scroll entry |
| `src/test/components/Skills.test.tsx` | Rewrite | Verify tabs render, default tab, tab switching |

---

### Task 1: Rewrite skills.ts with resume data

**Files:**
- Modify: `src/data/skills.ts`

- [ ] **Step 1: Replace the file contents**

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

- [ ] **Step 2: Verify TypeScript is happy with the new shape**

Run: `bunx tsc --noEmit 2>&1 | grep skills`

Expected: errors in `Skills.tsx` (it still accesses `.name` and `.icon`), none in `skills.ts` itself. That's correct — `Skills.tsx` will be fixed in Task 3.

- [ ] **Step 3: Commit**

```bash
git add src/data/skills.ts
git commit -m "feat: restructure skills data — 4 categories, plain string arrays"
```

---

### Task 2: Write failing tests for the new tab UI

**Files:**
- Modify: `src/test/components/Skills.test.tsx`

The existing test checks for skills that have moved categories (e.g. `'LLMs'` is still in AI, `'Python'` is in Backend). These will fail once the component is updated because the tab-switch mechanism means non-default-tab skills are hidden. Write the correct tests now so they drive the implementation.

- [ ] **Step 1: Replace the test file**

```tsx
import { render, screen, fireEvent, act } from '@testing-library/react'
import { vi } from 'vitest'
import { Skills } from '@/components/sections/Skills'

describe('Skills', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders all 4 tab buttons', () => {
    render(<Skills />)
    expect(screen.getByRole('button', { name: 'Frontend' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Backend' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cloud & DevOps' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'AI' })).toBeInTheDocument()
  })

  it('shows Frontend skills by default', () => {
    render(<Skills />)
    expect(screen.getByText('Next.js')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.queryByText('Python')).not.toBeInTheDocument()
    expect(screen.queryByText('AWS EC2')).not.toBeInTheDocument()
  })

  it('switches to Backend skills after clicking Backend tab', () => {
    vi.useFakeTimers()
    render(<Skills />)

    fireEvent.click(screen.getByRole('button', { name: 'Backend' }))

    act(() => { vi.advanceTimersByTime(220) })

    expect(screen.getByText('Python')).toBeInTheDocument()
    expect(screen.getByText('FastAPI')).toBeInTheDocument()
    expect(screen.queryByText('Next.js')).not.toBeInTheDocument()
  })

  it('switches to AI skills after clicking AI tab', () => {
    vi.useFakeTimers()
    render(<Skills />)

    fireEvent.click(screen.getByRole('button', { name: 'AI' }))

    act(() => { vi.advanceTimersByTime(220) })

    expect(screen.getByText('AI Agents')).toBeInTheDocument()
    expect(screen.getByText('Google ADK')).toBeInTheDocument()
    expect(screen.queryByText('Next.js')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the tests — confirm they FAIL**

Run: `bun run test src/test/components/Skills.test.tsx 2>&1`

Expected: FAIL. The component still uses the old data shape (`skill.name`, `skill.icon`) so the tab buttons and skill pills won't render correctly. This is expected — the tests are driving the new implementation.

- [ ] **Step 3: Commit the failing tests**

```bash
git add src/test/components/Skills.test.tsx
git commit -m "test: skills tab UI — failing tests for new tabbed layout"
```

---

### Task 3: Rewrite Skills.tsx to make tests pass

**Files:**
- Modify: `src/components/sections/Skills.tsx`

- [ ] **Step 1: Replace the file contents**

```tsx
'use client'
import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { SKILLS } from '@/data/skills'

export function Skills() {
  const containerRef = useRef<HTMLElement>(null)
  const [activeTab, setActiveTab] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 75%',
      onEnter: () => {
        gsap.from('.skills-eyebrow', { opacity: 0, x: -20, duration: 0.4 })
        gsap.from('.skills-tab-btn', {
          opacity: 0, y: 10, stagger: 0.06, duration: 0.35, delay: 0.15,
        })
        gsap.from('.skills-pill', {
          opacity: 0, y: 12, stagger: 0.04, duration: 0.3, delay: 0.4,
        })
      },
    })
  }, { scope: containerRef })

  function handleTabClick(i: number) {
    if (i === activeTab) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveTab(i)
      setIsTransitioning(false)
    }, 220)
  }

  return (
    <section ref={containerRef} id="skills" className="py-24 px-8 md:px-16 lg:px-24">
      <span className="skills-eyebrow font-[var(--font-mono)] text-[10px] tracking-[4px] text-[var(--color-accent)]/70 mb-10 block">
        // tech.stack
      </span>

      <div className="flex flex-wrap gap-2 mb-8">
        {SKILLS.map((cat, i) => (
          <button
            key={cat.label}
            onClick={() => handleTabClick(i)}
            className={`skills-tab-btn font-[var(--font-mono)] text-[10px] tracking-[2px] uppercase px-4 py-1.5 rounded border transition-colors ${
              i === activeTab
                ? 'border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent)]/8'
                : 'border-[var(--color-accent)]/15 text-[var(--color-accent)]/40 hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)]/70'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div
        className={`flex flex-wrap gap-2.5 transition-opacity duration-[220ms] ease ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {SKILLS[activeTab].skills.map((skill) => (
          <div
            key={skill}
            className="skills-pill font-[var(--font-mono)] border border-white/10 rounded-full text-[11px] px-[18px] py-[7px] text-white/40 hover:border-[var(--color-accent)]/25 hover:text-[var(--color-accent)]/65 transition-colors cursor-default"
          >
            {skill}
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Run all tests — confirm they PASS**

Run: `bun run test 2>&1`

Expected:
```
Test Files  7 passed (7)
     Tests  10 passed (10)
```

If any test fails, read the error carefully before changing code. Common issues:
- `getByRole('button', { name: 'Cloud & DevOps' })` — the `&` in "Cloud & DevOps" may be encoded as `&amp;` in some environments; try `{ name: /cloud/i }` if this fails.
- Fake timer interaction with React state: if `act(() => vi.advanceTimersByTime(220))` doesn't flush, try `await act(async () => { vi.advanceTimersByTime(220) })`.

- [ ] **Step 3: TypeScript check**

Run: `bunx tsc --noEmit 2>&1`

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Skills.tsx
git commit -m "feat: skills section — 4-tab UI with fade transition and GSAP scroll entry"
```

---

### Task 4: Smoke test in the browser

**Files:** none changed

- [ ] **Step 1: Start the dev server**

Run: `bun run dev`

Open: `http://localhost:3000` and scroll to the Skills section.

- [ ] **Step 2: Verify each tab**

Check:
- Frontend tab is active on load; shows Next.js, React, TypeScript etc. as outline pills
- Click Backend → pills fade out, Backend skills (Python, FastAPI…) fade in
- Click Cloud & DevOps → Cloud skills appear
- Click AI → AI Agents, Google ADK etc. appear
- Active tab has cyan border + tinted background; inactive tabs are dim
- Hovering a pill shifts it to a cyan tint (no movement)
- Scroll entry: on first scroll into view, eyebrow and tabs animate in

- [ ] **Step 3: Stop the dev server**

`Ctrl+C`

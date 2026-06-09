'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

const STATS = [
  { value: 3, suffix: '+', label: 'Years' },
  { value: 20, suffix: '+', label: 'Projects' },
  { value: 5, suffix: '+', label: 'Clients' },
]

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const statRefs = useRef<(HTMLSpanElement | null)[]>([])

  useGSAP(() => {
    const tl = gsap.timeline()
    tl.from('.hero-label',  { opacity: 0, y: 10, duration: 0.5 }, 0.3)
      .from('.hero-line-1', { opacity: 0, y: 50, duration: 0.6 }, 0.5)
      .from('.hero-line-2', { opacity: 0, y: 50, duration: 0.6 }, 0.65)
      .from('.hero-bio',    { opacity: 0, duration: 0.5 }, 0.85)
      .from('.hero-stats',  { opacity: 0, y: 10, duration: 0.4 }, 0.95)
      .from('.hero-cta',    { opacity: 0, scale: 0.9, stagger: 0.1, duration: 0.4 }, 1.05)
      .from('.hero-avatar', { opacity: 0, scale: 0.85, duration: 0.6 }, 0.7)
      .from('.hero-scroll', { opacity: 0, duration: 0.4 }, 1.3)

    gsap.to('.hero-scroll-bar', {
      scaleY: 0.4,
      transformOrigin: 'top',
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    STATS.forEach(({ value }, i) => {
      const el = statRefs.current[i]
      if (!el) return
      const counter = { val: 0 }
      gsap.to(counter, {
        val: value,
        duration: 1.2,
        ease: 'power1.out',
        delay: 1.0,
        onUpdate: () => { el.textContent = Math.round(counter.val).toString() },
      })
    })
  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center px-8 md:px-16 lg:px-24 py-24"
    >
      <div className="scanlines absolute inset-0" />

      <div className="grid md:grid-cols-2 gap-16 items-center w-full">
        <div>
          <span className="hero-label font-[var(--font-mono)] text-[10px] tracking-[4px] text-[var(--color-accent)]/70 mb-4 block uppercase">
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
          <p className="hero-bio max-w-md text-sm text-white/40 leading-relaxed mb-8">
            Full stack developer specialising in AI-powered products. I bridge the gap between
            intelligent backends and polished frontends — from LLM agents to production-ready web apps.
          </p>
          <div className="hero-stats flex gap-10 mb-10">
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
        </div>

        <div className="hero-avatar flex justify-center">
          <div className="relative">
            <div className="w-44 h-44 rounded-full border-2 border-[var(--color-accent)]/25 bg-gradient-to-br from-[#0d1a15] to-[#1a1a2e] flex items-center justify-center">
              <span className="font-black text-5xl text-[var(--color-accent)]">DR</span>
            </div>
            <div className="absolute inset-[-12px] rounded-full border border-[var(--color-accent)]/10" />
            <div className="absolute inset-[-24px] rounded-full border border-dashed border-[var(--color-accent)]/5" />
          </div>
        </div>
      </div>

      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-[var(--font-mono)] text-[8px] tracking-[4px] text-white/15">SCROLL</span>
        <div className="hero-scroll-bar w-px h-6 bg-gradient-to-b from-[var(--color-accent)]/50 to-transparent" />
      </div>
    </section>
  )
}

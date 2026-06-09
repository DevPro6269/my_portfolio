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

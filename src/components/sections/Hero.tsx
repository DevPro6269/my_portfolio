'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

const STATS = [
  { value: '3+', label: 'Years' },
  { value: '20+', label: 'Projects' },
  { value: '5+', label: 'Clients' },
]

const LINKS = [
  { label: 'GitHub ↗',   href: 'https://github.com/DevPro6269', external: true },
  { label: 'LinkedIn ↗', href: 'https://linkedin.com/in/dev-rathore-15299a201', external: true },
  { label: 'Email',      href: 'mailto:devrathore653@gmail.com', external: false },
  { label: 'CV ↓',       href: '/cv.pdf', external: false },
]

const linkStyle: React.CSSProperties = {
  fontFamily: 'var(--font-geist-mono), monospace',
  fontSize: 11,
  color: 'var(--text)',
  textDecoration: 'underline',
  textUnderlineOffset: 3,
  textDecorationColor: 'var(--border)',
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline()
    tl.from('.hero-eyebrow', { opacity: 0, y: 8,  duration: 0.4 }, 0.2)
      .from('.hero-name',    { opacity: 0, y: 20, duration: 0.5 }, 0.35)
      .from('.hero-bio',     { opacity: 0,        duration: 0.4 }, 0.55)
      .from('.hero-stats',   { opacity: 0, y: 10, duration: 0.4 }, 0.7)
      .from('.hero-links',   { opacity: 0,        duration: 0.35 }, 0.85)
  }, { scope: containerRef })

  return (
    <section ref={containerRef} id="hero" style={{ padding: '48px 0 44px' }}>
      <span
        className="hero-eyebrow"
        style={{
          display: 'block',
          fontFamily: 'var(--font-geist-mono), monospace',
          fontSize: 11,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          marginBottom: 12,
        }}
      >
        Full Stack &amp; AI Engineer · Gwalior, India
      </span>

      <h1
        className="hero-name"
        style={{
          fontFamily: 'var(--font-lora), serif',
          fontSize: 'clamp(40px, 6vw, 58px)',
          fontWeight: 700,
          lineHeight: 1.0,
          color: 'var(--text)',
          marginBottom: 16,
        }}
      >
        Dev Rathore
      </h1>

      <p
        className="hero-bio"
        style={{ fontSize: 16, color: 'var(--sub)', lineHeight: 1.8, marginBottom: 20, maxWidth: 560 }}
      >
        Building AI-powered products that bridge intelligent backends and polished frontends — from
        LLM agents to production-ready web apps.
      </p>

      <div
        className="hero-stats"
        style={{ display: 'flex', gap: 32, marginBottom: 24, alignItems: 'baseline' }}
      >
        {STATS.map(({ value, label }) => (
          <div key={label}>
            <span
              style={{
                fontFamily: 'var(--font-lora), serif',
                fontSize: 24,
                fontWeight: 700,
                color: 'var(--text)',
                display: 'block',
                lineHeight: 1,
              }}
            >
              {value}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-geist-mono), monospace',
                fontSize: 10,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: 'var(--label)',
                marginTop: 3,
                display: 'block',
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      <div className="hero-links" style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {LINKS.map(({ label, href, external }) => (
          <a
            key={label}
            href={href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            style={linkStyle}
          >
            {label}
          </a>
        ))}
      </div>
    </section>
  )
}

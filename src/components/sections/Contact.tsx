'use client'
import { useRef } from 'react'
import type { CSSProperties } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

const LINKS = [
  { label: 'Email',      href: 'mailto:devrathore653@gmail.com', external: false },
  { label: 'GitHub ↗',   href: 'https://github.com/DevPro6269',  external: true },
  { label: 'LinkedIn ↗', href: 'https://linkedin.com/in/dev-rathore-15299a201', external: true },
]

const sectionLabelStyle: CSSProperties = {
  fontFamily: 'var(--font-geist-mono), monospace',
  fontSize: 11,
  letterSpacing: '2px',
  textTransform: 'uppercase' as const,
  color: 'var(--label)',
  marginBottom: 20,
  display: 'block',
}

const linkStyle: CSSProperties = {
  fontFamily: 'var(--font-geist-mono), monospace',
  fontSize: 11,
  color: 'var(--text)',
  textDecoration: 'underline',
  textUnderlineOffset: 3,
  textDecorationColor: 'var(--border)',
}

export function Contact() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const els = containerRef.current?.querySelectorAll(
      '.contact-label, .contact-heading, .contact-body, .contact-links, .contact-footer'
    )
    if (!els?.length) return
    gsap.from(els, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 88%',
        once: true,
      },
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} id="contact" style={{ padding: '60px 0 80px' }}>
      <span className="contact-label" style={sectionLabelStyle}>Contact</span>

      <h2
        className="contact-heading"
        style={{
          fontFamily: 'var(--font-lora), serif',
          fontSize: 26,
          fontWeight: 700,
          color: 'var(--text)',
          marginBottom: 16,
          lineHeight: 1.2,
        }}
      >
        Let's build something.
      </h2>

      <p
        className="contact-body"
        style={{ fontSize: 15, color: 'var(--sub)', lineHeight: 1.8, marginBottom: 32, maxWidth: 500 }}
      >
        I'm open to full-time roles, freelance projects, and interesting collaborations.
        Reach out — I respond within a day.
      </p>

      <div
        className="contact-links"
        style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}
      >
        {LINKS.map(({ label, href, external }) => (
          <a
            key={label}
            href={href}
            style={linkStyle}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {label}
          </a>
        ))}
      </div>

      <footer
        className="contact-footer"
        style={{
          marginTop: 60,
          paddingTop: 20,
          borderTop: '1px solid var(--border)',
          fontFamily: 'var(--font-geist-mono), monospace',
          fontSize: 10,
          letterSpacing: '1px',
          color: 'var(--border)',
        }}
      >
        © 2026 Dev Rathore · Built with Next.js
      </footer>
    </section>
  )
}

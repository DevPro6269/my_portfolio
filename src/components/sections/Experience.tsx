'use client'
import { useRef } from 'react'
import type { CSSProperties } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { EXPERIENCE } from '@/data/experience'

const sectionLabelStyle: CSSProperties = {
  fontFamily: 'var(--font-geist-mono), monospace',
  fontSize: 11,
  letterSpacing: '2px',
  textTransform: 'uppercase',
  color: 'var(--label)',
  display: 'block',
  marginBottom: 20,
}

export function Experience() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 88%',
      onEnter: () => {
        gsap.from(containerRef.current!.querySelectorAll('.exp-entry'), {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power2.out',
        })
      },
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} id="work">
      <span style={sectionLabelStyle}>Work</span>

      {EXPERIENCE.map((entry, i) => {
        const [companyName, ...locationParts] = entry.company.split(' · ')
        const location = locationParts.join(' · ')
        return (
          <div
            key={entry.role}
            className="exp-entry"
            style={i > 0 ? { marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--border)' } : {}}
          >
            <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>
              {entry.role}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-geist-mono), monospace',
                fontSize: 11,
                color: 'var(--muted)',
                letterSpacing: '0.3px',
                marginBottom: 7,
              }}
            >
              <a
                href={entry.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--muted)',
                  textDecoration: 'underline',
                  textUnderlineOffset: 2,
                  textDecorationColor: 'var(--border)',
                }}
              >
                {companyName} ↗
              </a>
              {location ? ` · ${location}` : ''}
              {' · '}
              {entry.period}
            </div>
            <div style={{ fontSize: 15, color: 'var(--sub)', lineHeight: 1.75 }}>
              {entry.description}
            </div>
          </div>
        )
      })}
    </section>
  )
}

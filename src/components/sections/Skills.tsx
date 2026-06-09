'use client'
import { useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { SKILLS } from '@/data/skills'

const sectionLabelStyle: CSSProperties = {
  fontFamily: 'var(--font-geist-mono), monospace',
  fontSize: 11,
  letterSpacing: '2px',
  textTransform: 'uppercase',
  color: 'var(--label)',
  display: 'block',
  marginBottom: 20,
}

export function Skills() {
  const containerRef = useRef<HTMLElement>(null)
  const [activeTab, setActiveTab] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        const el = containerRef.current!
        gsap.from(el.querySelector('.skills-label'), { opacity: 0, y: 8, duration: 0.4 })
        gsap.from(el.querySelectorAll('.skills-tab-btn'), {
          opacity: 0, y: 10, stagger: 0.06, duration: 0.35, delay: 0.15,
        })
        gsap.from(el.querySelectorAll('.skills-pill'), {
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
    <section ref={containerRef} id="skills">
      <span className="skills-label" style={sectionLabelStyle}>Skills</span>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
        {SKILLS.map((cat, i) => (
          <button
            key={cat.label}
            onClick={() => handleTabClick(i)}
            className="skills-tab-btn"
            style={{
              fontFamily: 'var(--font-geist-mono), monospace',
              fontSize: 10,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              padding: '5px 14px',
              borderRadius: 20,
              border: `1px solid ${i === activeTab ? 'var(--text)' : 'var(--border)'}`,
              background: i === activeTab ? 'var(--text)' : 'transparent',
              color: i === activeTab ? 'var(--bg)' : 'var(--muted)',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          opacity: isTransitioning ? 0 : 1,
          transition: 'opacity 220ms ease-in-out',
        }}
      >
        {SKILLS[activeTab].skills.map((skill) => (
          <div
            key={skill}
            className="skills-pill"
            style={{
              fontFamily: 'var(--font-geist-mono), monospace',
              fontSize: 11,
              color: 'var(--sub)',
              background: 'var(--tag-bg)',
              padding: '5px 14px',
              borderRadius: 20,
              cursor: 'default',
            }}
          >
            {skill}
          </div>
        ))}
      </div>
    </section>
  )
}

'use client'
import { useState } from 'react'
import type { CSSProperties } from 'react'
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
  const [activeTab, setActiveTab] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  function handleTabClick(i: number) {
    if (i === activeTab) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveTab(i)
      setIsTransitioning(false)
    }, 220)
  }

  return (
    <section id="skills">
      <span style={sectionLabelStyle}>Skills</span>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
        {SKILLS.map((cat, i) => (
          <button
            key={cat.label}
            onClick={() => handleTabClick(i)}
            style={{
              fontFamily: 'var(--font-geist-mono), monospace',
              fontSize: 10,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              padding: '5px 14px',
              borderRadius: 20,
              border: `1px solid ${i === activeTab ? 'var(--text)' : 'var(--border)'}`,
              background: i === activeTab ? 'var(--text)' : 'var(--tag-bg)',
              color: i === activeTab ? 'var(--bg)' : 'var(--sub)',
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

'use client'
import { useState } from 'react'
import type { CSSProperties } from 'react'
import { SKILLS } from '@/data/skills'
import { trackCustom } from '@/lib/fbpixel'

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
    trackCustom('ViewSkillCategory', { category: SKILLS[i].label })
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveTab(i)
      setIsTransitioning(false)
    }, 220)
  }

  return (
    <section id="skills">
      <span style={sectionLabelStyle}>Skills</span>

      <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: 22, rowGap: 6, marginBottom: 26 }}>
        {SKILLS.map((cat, i) => {
          const active = i === activeTab
          return (
            <button
              key={cat.label}
              onClick={() => handleTabClick(i)}
              className="skill-tab"
              data-active={active}
              aria-pressed={active}
              style={{
                fontFamily: 'var(--font-geist-mono), monospace',
                fontSize: 11,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                padding: '0 0 6px',
                background: 'none',
                border: 'none',
                borderBottom: `2px solid ${active ? 'var(--text)' : 'transparent'}`,
                color: active ? 'var(--text)' : 'var(--muted)',
                cursor: 'pointer',
                transition: 'color 0.15s, border-color 0.15s',
              }}
            >
              {cat.label}
            </button>
          )
        })}
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
              fontSize: 12,
              color: 'var(--sub)',
              background: 'var(--tag-bg)',
              padding: '6px 14px',
              borderRadius: 6,
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

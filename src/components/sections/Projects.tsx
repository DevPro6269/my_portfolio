'use client'
import { useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { ArrowUpRight } from 'lucide-react'
import { PROJECTS, CATEGORY_ORDER } from '@/data/projects'
import type { ProjectCategory } from '@/data/projects'
import { GithubIcon } from '@/components/icons/BrandIcons'

const FILTERS = CATEGORY_ORDER

const sectionLabelStyle: CSSProperties = {
  fontFamily: 'var(--font-geist-mono), monospace',
  fontSize: 11,
  letterSpacing: '2px',
  textTransform: 'uppercase',
  color: 'var(--label)',
  display: 'block',
  marginBottom: 20,
}

const separatorStyle: CSSProperties = {
  marginTop: 24,
  paddingTop: 24,
  borderTop: '1px solid var(--border)',
}

export function Projects() {
  const containerRef = useRef<HTMLElement>(null)
  const [filter, setFilter] = useState<ProjectCategory>(CATEGORY_ORDER[0].key)

  const visibleCategories = CATEGORY_ORDER.filter((c) => c.key === filter)

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        const entries = containerRef.current?.querySelectorAll('.project-entry')
        if (!entries?.length) return
        gsap.from(entries, {
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
    <section ref={containerRef} id="projects">
      <span style={sectionLabelStyle}>Projects</span>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
        {FILTERS.map(({ key, label }) => {
          const active = filter === key
          return (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              aria-pressed={active}
              style={{
                fontFamily: 'var(--font-geist-mono), monospace',
                fontSize: 11,
                letterSpacing: '0.5px',
                cursor: 'pointer',
                padding: '5px 14px',
                borderRadius: 20,
                border: '1px solid var(--border)',
                color: active ? 'var(--bg)' : 'var(--sub)',
                backgroundColor: active ? 'var(--text)' : 'transparent',
                transition: 'color 0.2s ease, background-color 0.2s ease',
              }}
            >
              {label}
            </button>
          )
        })}
      </div>

      {visibleCategories.map(({ key }, groupIndex) => {
        const items = PROJECTS.filter((p) => p.category === key)
        if (!items.length) return null

        return (
          <div
            key={key}
            style={groupIndex > 0 ? { marginTop: 48 } : {}}
          >

            {items.map((project, i) => (
              <div
                key={project.title}
                className="project-entry"
                style={i > 0 ? separatorStyle : {}}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-lora), serif', fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 5 }}>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      color: 'var(--text)',
                      textDecoration: 'none',
                      borderBottom: '1px solid var(--border)',
                      paddingBottom: 1,
                    }}
                  >
                    {project.title}
                    <ArrowUpRight size={15} />
                  </a>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} on GitHub`}
                      style={{ color: 'var(--sub)', display: 'inline-flex', lineHeight: 0 }}
                    >
                      <GithubIcon size={17} />
                    </a>
                  )}
                </div>
                <p style={{ fontSize: 15, color: 'var(--sub)', lineHeight: 1.75, marginBottom: 10 }}>
                  {project.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: 'var(--font-geist-mono), monospace',
                        fontSize: 10,
                        color: 'var(--sub)',
                        background: 'var(--tag-bg)',
                        padding: '3px 10px',
                        borderRadius: 20,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )
      })}
    </section>
  )
}

'use client'
import { useRef } from 'react'
import type { CSSProperties } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { PROJECTS } from '@/data/projects'

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

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.from(containerRef.current?.querySelectorAll('.project-entry'), {
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

      {PROJECTS.map((project, i) => (
        <div
          key={project.title}
          className="project-entry"
          style={i > 0 ? separatorStyle : {}}
        >
          <div style={{ fontFamily: 'var(--font-lora), serif', fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 5 }}>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--text)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--border)',
                paddingBottom: 1,
              }}
            >
              {project.title} ↗
            </a>
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
    </section>
  )
}

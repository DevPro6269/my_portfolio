'use client'
import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { SKILLS } from '@/data/skills'

export function Skills() {
  const containerRef = useRef<HTMLElement>(null)
  const [activeTab, setActiveTab] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 75%',
      onEnter: () => {
        const el = containerRef.current!
        gsap.from(el.querySelector('.skills-eyebrow'), { opacity: 0, x: -20, duration: 0.4 })
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
    <section ref={containerRef} id="skills" className="py-24 px-8 md:px-16 lg:px-24">
      <span className="skills-eyebrow font-[var(--font-mono)] text-[10px] tracking-[4px] text-[var(--color-accent)]/70 mb-10 block">
        // tech.stack
      </span>

      <div className="flex flex-wrap gap-2 mb-8">
        {SKILLS.map((cat, i) => (
          <button
            key={cat.label}
            onClick={() => handleTabClick(i)}
            className={`skills-tab-btn font-[var(--font-mono)] text-[10px] tracking-[2px] uppercase px-4 py-1.5 rounded border transition-colors ${
              i === activeTab
                ? 'border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent)]/8'
                : 'border-[var(--color-accent)]/15 text-[var(--color-accent)]/40 hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)]/70'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div
        className={`flex flex-wrap gap-2.5 transition-opacity duration-[220ms] ease-in-out ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {SKILLS[activeTab].skills.map((skill) => (
          <div
            key={skill}
            className="skills-pill font-[var(--font-mono)] border border-white/10 rounded-full text-[11px] px-[18px] py-[7px] text-white/40 hover:border-[var(--color-accent)]/25 hover:text-[var(--color-accent)]/65 transition-colors cursor-default"
          >
            {skill}
          </div>
        ))}
      </div>
    </section>
  )
}

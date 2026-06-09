'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { SKILLS } from '@/data/skills'

export function Skills() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    containerRef.current!.querySelectorAll('.skill-category').forEach((cat) => {
      const label = cat.querySelector('.skill-cat-label')
      const cards = cat.querySelectorAll('.skill-card')

      ScrollTrigger.create({
        trigger: cat,
        start: 'top 75%',
        onEnter: () => {
          gsap.from(label, { opacity: 0, x: -20, duration: 0.4 })
          gsap.from(cards, {
            opacity: 0, scale: 0.85, y: 20,
            stagger: 0.05, duration: 0.4, delay: 0.15,
          })
        },
      })
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} id="skills" className="py-24 px-8 md:px-16 lg:px-24">
      <span className="font-[var(--font-mono)] text-[10px] tracking-[4px] text-[var(--color-accent)]/70 mb-10 block">
        // tech.stack
      </span>
      <div className="space-y-12">
        {SKILLS.map((cat) => (
          <div key={cat.label} className="skill-category">
            <h3 className="skill-cat-label font-[var(--font-mono)] text-xs tracking-widest text-[var(--color-accent)]/60 mb-4 uppercase">
              {cat.label}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {cat.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="skill-card border border-[var(--color-accent)]/15 rounded-lg p-4 text-center bg-[#0d1a15]/40 hover:-translate-y-1 hover:border-[var(--color-accent)]/40 transition-transform cursor-default"
                >
                  <div className="text-2xl mb-2">{skill.icon}</div>
                  <div className="font-[var(--font-mono)] text-[10px] text-[var(--color-accent)]/80">
                    {skill.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

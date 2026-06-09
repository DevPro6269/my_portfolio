'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { EXPERIENCE } from '@/data/experience'

export function Experience() {
  const containerRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from(lineRef.current, {
      scaleY: 0,
      transformOrigin: 'top',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
        end: 'bottom 80%',
        scrub: true,
      },
    })

    gsap.from('.exp-entry', {
      opacity: 0,
      x: -30,
      stagger: 0.2,
      duration: 0.5,
      scrollTrigger: { trigger: containerRef.current, start: 'top 65%' },
    })

    gsap.to('.exp-dot-active', {
      boxShadow: '0 0 14px #00ffcc, 0 0 4px #00ffcc',
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} id="experience" className="py-24 px-8 md:px-16 lg:px-24">
      <span className="font-[var(--font-mono)] text-[10px] tracking-[4px] text-[var(--color-accent)]/70 mb-10 block">
        // career.log
      </span>
      <div className="flex gap-8">
        <div className="flex flex-col items-center pt-1">
          <div ref={lineRef} className="flex flex-col items-center">
            {EXPERIENCE.map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                    i === 0
                      ? 'exp-dot-active bg-[var(--color-accent)]'
                      : 'border-2 border-[var(--color-accent)]/20'
                  }`}
                />
                {i < EXPERIENCE.length - 1 && (
                  <div className="w-px min-h-[90px] bg-gradient-to-b from-[var(--color-accent)]/35 to-[var(--color-accent)]/05" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-10 flex-1">
          {EXPERIENCE.map((entry) => (
            <div key={entry.role} className="exp-entry">
              <span className="font-[var(--font-mono)] text-[9px] tracking-[2px] text-[var(--color-accent)]/60">
                {entry.period}
              </span>
              <h3 className="font-bold text-white mt-1 mb-0.5 text-base">{entry.role}</h3>
              <p className="text-xs text-white/35 mb-2">{entry.company}</p>
              <p className="text-sm text-white/25 leading-relaxed">{entry.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

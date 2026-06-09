'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

const STATS = [
  { value: 3, suffix: '+', label: 'Years' },
  { value: 20, suffix: '+', label: 'Projects' },
  { value: 5, suffix: '+', label: 'Clients' },
]

export function About() {
  const containerRef = useRef<HTMLElement>(null)
  const statRefs = useRef<(HTMLSpanElement | null)[]>([])

  useGSAP(() => {
    gsap.from('.about-left', {
      opacity: 0,
      x: -60,
      duration: 0.7,
      scrollTrigger: { trigger: containerRef.current, start: 'top 75%' },
    })
    gsap.from('.about-right', {
      opacity: 0,
      scale: 0.85,
      duration: 0.7,
      scrollTrigger: { trigger: containerRef.current, start: 'top 75%' },
    })

    STATS.forEach(({ value }, i) => {
      const el = statRefs.current[i]
      if (!el) return
      const counter = { val: 0 }
      gsap.to(counter, {
        val: value,
        duration: 1.2,
        ease: 'power1.out',
        onUpdate: () => { el.textContent = Math.round(counter.val).toString() },
        scrollTrigger: { trigger: containerRef.current, start: 'top 70%' },
      })
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} id="about" className="py-24 px-8 md:px-16 lg:px-24">
      <span className="font-[var(--font-mono)] text-[10px] tracking-[4px] text-[var(--color-accent)]/70 mb-10 block">
        // about.me
      </span>
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="about-left">
          <h2 className="text-4xl font-black text-white leading-tight mb-5">
            I build things
            <br />
            that <span className="text-[var(--color-accent)]">think.</span>
          </h2>
          <p className="text-sm text-white/40 leading-relaxed mb-10">
            Full stack developer specialising in AI-powered products. I bridge the gap between
            intelligent backends and polished frontends — from LLM agents to production-ready web apps.
          </p>
          <div className="flex gap-10">
            {STATS.map(({ value, suffix, label }, i) => (
              <div key={label}>
                <div className="text-3xl font-black text-[var(--color-accent)]">
                  <span ref={(el) => { statRefs.current[i] = el }}>{value}</span>
                  {suffix}
                </div>
                <div className="font-[var(--font-mono)] text-[9px] text-white/30 tracking-widest mt-1 uppercase">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-right flex justify-center">
          <div className="relative">
            <div className="w-44 h-44 rounded-full border-2 border-[var(--color-accent)]/25 bg-gradient-to-br from-[#0d1a15] to-[#1a1a2e] flex items-center justify-center">
              <span className="font-black text-5xl text-[var(--color-accent)]">DR</span>
            </div>
            <div className="absolute inset-[-12px] rounded-full border border-[var(--color-accent)]/10" />
            <div className="absolute inset-[-24px] rounded-full border border-dashed border-[var(--color-accent)]/5" />
          </div>
        </div>
      </div>
    </section>
  )
}

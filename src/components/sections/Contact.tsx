'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/' },
  { label: 'Twitter', href: 'https://twitter.com/' },
]

export function Contact() {
  const containerRef = useRef<HTMLElement>(null)
  const typeRef = useRef<HTMLSpanElement>(null)
  const glitchRef = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: containerRef.current, start: 'top 75%' },
    })

    const buildText = "Let's Build"
    if (typeRef.current) {
      typeRef.current.textContent = ''
      buildText.split('').forEach((char, i) => {
        tl.call(() => { typeRef.current!.textContent += char }, [], i * 0.06)
      })
    }

    const afterType = buildText.length * 0.06 + 0.1

    tl.from(glitchRef.current, { opacity: 0, duration: 0.01 }, afterType)
    tl.to(
      glitchRef.current,
      { x: 5, skewX: 10, duration: 0.05, ease: 'none', repeat: 3, yoyo: true },
      afterType,
    )
    tl.to(glitchRef.current, { x: 0, skewX: 0, duration: 0.05 })

    tl.from('.contact-sub', { opacity: 0, duration: 0.4 }, '+=0.1')
    tl.from(
      '.contact-social',
      { opacity: 0, scale: 0, stagger: 0.08, duration: 0.3, ease: 'back.out(1.7)' },
      '-=0.1',
    )
    tl.from('.contact-cta', { opacity: 0, scale: 0.9, duration: 0.3 }, '-=0.1')

    gsap.to('.contact-cta', {
      scale: 1.025,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 2,
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} id="contact" className="py-32 px-8 md:px-16 lg:px-24 text-center">
      <span className="font-[var(--font-mono)] text-[10px] tracking-[4px] text-[var(--color-accent)]/70 mb-8 block">
        // say.hello
      </span>
      <h2
        className="font-black text-white mb-3 leading-tight"
        style={{ fontSize: 'clamp(40px, 8vw, 72px)' }}
      >
        <span ref={typeRef} />
        <br />
        <span ref={glitchRef} className="text-[var(--color-accent)] inline-block">
          Something.
        </span>
      </h2>
      <p className="contact-sub text-sm text-white/35 mb-10">
        Open for freelance work and full-time roles.
      </p>
      <div className="flex justify-center gap-3 mb-8">
        {SOCIALS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-social px-5 py-2.5 border border-white/10 text-white/40 text-xs tracking-wider rounded hover:border-white/25 hover:text-white/70 transition-colors"
          >
            {label}
          </a>
        ))}
      </div>
      <a
        href="mailto:devrathore653@gmail.com"
        className="contact-cta inline-block px-10 py-4 bg-[var(--color-accent)] text-black text-xs font-bold tracking-widest rounded hover:opacity-90 transition-opacity"
      >
        Send Email
      </a>
      <p className="mt-16 font-[var(--font-mono)] text-[10px] text-white/15 tracking-wider">
        © 2026 Dev Rathore · Built with Next.js + GSAP
      </p>
    </section>
  )
}

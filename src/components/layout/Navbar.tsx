'use client'
import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useGSAP(() => {
    gsap.from(navRef.current, { opacity: 0, y: -20, duration: 0.6, delay: 1.2 })
  }, { scope: navRef })

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-4 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md border-b border-white/5' : ''
      }`}
    >
      <a href="#hero" className="font-[var(--font-mono)] text-sm tracking-[3px] text-[var(--color-accent)] font-bold">
        DR
      </a>
      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            className="text-xs tracking-wider text-white/40 hover:text-white transition-colors"
          >
            {label}
          </a>
        ))}
        <a
          href="#contact"
          className="text-xs tracking-wider text-[var(--color-accent)] border border-[var(--color-accent)]/30 px-4 py-1.5 rounded hover:bg-[var(--color-accent)]/10 transition-colors"
        >
          Hire Me
        </a>
      </div>
    </nav>
  )
}

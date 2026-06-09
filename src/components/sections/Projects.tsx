'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, Draggable } from '@/lib/gsap'
import { PROJECTS } from '@/data/projects'

export function Projects() {
  const containerRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const cards = containerRef.current!.querySelectorAll('.project-card')

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 70%',
      onEnter: () => {
        gsap.from(cards, {
          opacity: 0, x: 80, stagger: 0.12, duration: 0.6,
        })
      },
    })

    const track = trackRef.current!
    const container = track.parentElement!
    Draggable.create(track, {
      type: 'x',
      bounds: {
        minX: -(track.scrollWidth - container.offsetWidth),
        maxX: 0,
      },
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} id="projects" className="py-24 overflow-hidden">
      <div className="px-8 md:px-16 lg:px-24 mb-10">
        <span className="font-[var(--font-mono)] text-[10px] tracking-[4px] text-[var(--color-accent)]/70">
          // selected.work
        </span>
      </div>

      <div className="overflow-hidden pl-8 md:pl-16 lg:pl-24">
        <div ref={trackRef} className="flex gap-5 w-max cursor-grab active:cursor-grabbing select-none">
          {PROJECTS.map((project) => (
            <div
              key={project.title}
              className="project-card w-[300px] flex-shrink-0 border border-[var(--color-accent)]/15 rounded-xl overflow-hidden hover:border-[var(--color-accent)]/35 transition-colors"
            >
              <div className="h-44 bg-gradient-to-br from-[#0d1a15] to-[#0d0d1a] flex items-center justify-center">
                <span className="font-[var(--font-mono)] text-[10px] text-[var(--color-accent)]/15">
                  [ screenshot ]
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-white mb-1 text-sm">{project.title}</h3>
                <p className="text-xs text-white/35 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-[var(--font-mono)] text-[9px] text-[var(--color-accent)]/60 border border-[var(--color-accent)]/15 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a href={project.liveUrl} className="text-[10px] text-white/40 hover:text-white transition-colors">
                    Live ↗
                  </a>
                  <a href={project.githubUrl} className="text-[10px] text-white/40 hover:text-white transition-colors">
                    GitHub ↗
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

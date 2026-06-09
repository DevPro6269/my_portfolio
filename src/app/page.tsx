import { Hero } from '@/components/sections/Hero'
import { Experience } from '@/components/sections/Experience'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <main style={{ maxWidth: 680, margin: '0 auto', padding: '0 32px' }}>
      <Hero />
      <hr className="divider" />
      <Experience />
      <hr className="divider" />
      <Projects />
      <hr className="divider" />
      <Skills />
      <hr className="divider" />
      <Contact />
    </main>
  )
}

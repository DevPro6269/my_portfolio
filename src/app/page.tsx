import { Hero } from '@/components/sections/Hero'
import { Skills } from '@/components/sections/Skills'
import { Projects } from '@/components/sections/Projects'
import { Experience } from '@/components/sections/Experience'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </main>
  )
}

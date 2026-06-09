export type SkillCategory = {
  label: string
  skills: { name: string; icon: string }[]
}

export const SKILLS: SkillCategory[] = [
  {
    label: 'AI',
    skills: [
      { name: 'LLMs', icon: '🤖' },
      { name: 'LangChain', icon: '🔗' },
      { name: 'Google ADK', icon: '🧠' },
      { name: 'RAG', icon: '📚' },
    ],
  },
  {
    label: 'Backend',
    skills: [
      { name: 'Python', icon: '🐍' },
      { name: 'FastAPI', icon: '⚡' },
      { name: 'PostgreSQL', icon: '🗃️' },
      { name: 'SQLAlchemy', icon: '🔷' },
    ],
  },
  {
    label: 'Frontend',
    skills: [
      { name: 'Next.js', icon: '▲' },
      { name: 'TypeScript', icon: '📘' },
      { name: 'React', icon: '⚛️' },
      { name: 'Tailwind', icon: '🎨' },
    ],
  },
  {
    label: 'Tools',
    skills: [
      { name: 'Docker', icon: '🐳' },
      { name: 'Git', icon: '📦' },
      { name: 'Alembic', icon: '🔄' },
      { name: 'Bun', icon: '🥟' },
    ],
  },
]

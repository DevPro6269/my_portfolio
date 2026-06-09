export type Project = {
  title: string
  description: string
  tags: string[]
  liveUrl: string
  githubUrl: string
}

export const PROJECTS: Project[] = [
  {
    title: 'Siharilabs Platform',
    description: 'AI agent runtime + WhatsApp Business API management platform with multi-tenant architecture.',
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'Google ADK'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Chatverce',
    description: 'WhatsApp Manager — real-time messaging frontend with SSE, infinite scroll, and Redux.',
    tags: ['Next.js', 'TypeScript', 'Redux', 'MUI'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Add Your Project',
    description: 'Update src/data/projects.ts to add your own project here.',
    tags: ['React', 'Node.js'],
    liveUrl: '#',
    githubUrl: '#',
  },
]

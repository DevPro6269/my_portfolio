export type Project = {
  title: string
  description: string
  tags: string[]
  liveUrl: string
  githubUrl: string
}

export const PROJECTS: Project[] = [
  {
    title: 'Chatverce',
    description:
      'Multi-tenant WhatsApp API SaaS platform enabling businesses to automate customer conversations at scale. AI-driven chat workflows with intent detection, automated replies, and intelligent handover to human support.',
    tags: ['Next.js', 'FastAPI', 'PostgreSQL', 'AWS', 'Google ADK'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Acadma',
    description:
      'End-to-end online art course marketplace with course management, payments, authentication, and instructor dashboards. Reusable backend APIs consumed by both web and mobile apps.',
    tags: ['Next.js', 'Node.js', 'MongoDB', 'AWS'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Eu-Pay',
    description:
      'PhonePe-style digital payments app with user onboarding, wallet balance handling, and peer-to-peer money transfer. JWT-based auth middleware, transaction validation, and webhook processing for real-time status updates.',
    tags: ['Node.js', 'MongoDB', 'JWT', 'REST API'],
    liveUrl: '#',
    githubUrl: '#',
  },
]

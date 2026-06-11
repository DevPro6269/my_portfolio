export type ProjectCategory = 'product' | 'freelance' | 'personal'

export type Project = {
  title: string
  description: string
  tags: string[]
  liveUrl: string
  githubUrl?: string
  category: ProjectCategory
}

// Display order + labels for the grouped sections.
export const CATEGORY_ORDER: { key: ProjectCategory; label: string }[] = [
  { key: 'product', label: 'Product' },
  { key: 'freelance', label: 'Freelance' },
  { key: 'personal', label: 'Personal' },
]

export const PROJECTS: Project[] = [
  {
    title: 'Chatverce',
    description:
      'Multi-tenant WhatsApp API SaaS platform enabling businesses to automate customer conversations at scale. AI-driven chat workflows with intent detection, automated replies, and intelligent handover to human support.',
    tags: ['Next.js', 'FastAPI', 'PostgreSQL', 'AWS', 'Google ADK'],
    liveUrl: 'https://chatverce.com/',
    category: 'product',
  },
  {
    title: 'AI WhatsApp Agent',
    description:
      'A live AI agent on WhatsApp (+91 89350 18962) that understands natural-language queries, replies intelligently, and automates tasks like customer support and lead qualification. I built the backend logic, integrated the AI capabilities, and wired up the WhatsApp messaging workflow for a seamless conversational experience.',
    tags: ['AI Agent', 'WhatsApp API', 'FastAPI', 'Google ADK', 'NLP'],
    liveUrl: 'https://wa.me/918935018962',
    category: 'product',
  },
  {
    title: 'Real Estate Management Platform',
    description:
      'Internal real-estate management platform for tracking properties, listings, and operational workflows. Built as a full-stack app with a Next.js frontend and a Node.js API backed by Prisma and PostgreSQL.',
    tags: ['Next.js', 'Node.js', 'Prisma', 'PostgreSQL'],
    liveUrl: 'https://app.siharilabs.com/',
    category: 'freelance',
  },
  {
    title: 'Occult House Tarot',
    description:
      'Freelance website for a tarot and occult brand, offering tarot readings and related services with a themed, on-brand experience. Built and shipped the full site end to end.',
    tags: ['Next.js', 'Freelance', 'Web'],
    liveUrl: 'http://tarot.occulthouse.in/',
    category: 'freelance',
  },
  {
    title: 'Ecom Tax',
    description:
      'Freelance e-commerce tax tool that helps online sellers calculate and manage taxes on their transactions. Built and deployed as a Next.js app on Vercel.',
    tags: ['Next.js', 'Vercel', 'Freelance'],
    liveUrl: 'https://ecom-tax.vercel.app/',
    category: 'freelance',
  },
  {
    title: 'Acadma',
    description:
      'End-to-end online art course marketplace with course management, payments, authentication, and instructor dashboards. Reusable backend APIs consumed by both web and mobile apps.',
    tags: ['Next.js', 'Node.js', 'PostgreSQL','RDS', 'AWS'],
    liveUrl: 'https://acadma.in/',
    category: 'product',
  },
  {
    title: 'Eu-Pay',
    description:
      'PhonePe-style digital payments app with user onboarding, wallet balance handling, and peer-to-peer money transfer. JWT-based auth middleware, transaction validation, and webhook processing for real-time status updates.',
    tags: ['Node.js', 'MongoDB', 'JWT', 'REST API'],
    liveUrl: 'https://www.european-pay.fr/',
    category: 'product',
  },
  {
    title: 'VibeApply',
    description:
      'AI-powered Chrome extension that auto-applies to jobs by intelligently filling application forms from your resume. Parses resume data and maps it to form fields so applying is one click instead of dozens.',
    tags: ['Chrome Extension', 'AI', 'JavaScript', 'DOM manipulation'],
    liveUrl: 'https://github.com/DevPro6269/VibeApply',
    githubUrl: 'https://github.com/DevPro6269/VibeApply',
    category: 'personal',
  },
  {
    title: 'SocietyDesk',
    description:
      'Multi-tenant maintenance tracker for housing societies. Residents raise complaint tickets just by chatting with an AI agent, which captures the details and files the ticket; committee leaders triage and resolve them through a role-based workflow (Open → In Progress → Resolved → Closed). Society-specific access via join codes.',
    tags: ['Next.js', 'AI Agent', 'Multi-tenant', 'Vercel'],
    liveUrl: 'https://problem-tracker-eta.vercel.app/',
    category: 'personal',
  },
  {
    title: 'VideoZilla',
    description:
      'A YouTube clone with video browsing, search, and playback. Built to explore video-streaming UI patterns and API-driven content feeds.',
    tags: ['React', 'JavaScript', 'REST API', 'Node.js', 'Cloudinary'],
    liveUrl: 'https://videozilla.netlify.app/',
    category: 'personal',
  },
]

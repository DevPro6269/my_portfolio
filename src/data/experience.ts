export type ExperienceEntry = {
  period: string
  role: string
  company: string
  description: string
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    period: '2023 — Present',
    role: 'Founder & Lead Engineer',
    company: 'Siharilabs',
    description:
      'Building AI-powered communication tools — WhatsApp Business API platform with multi-tenant architecture and LLM-driven agents.',
  },
  {
    period: '2022 — 2023',
    role: 'Full Stack Developer',
    company: 'Freelance',
    description:
      'Built web applications and AI integrations for clients. Specialised in FastAPI backends and React frontends.',
  },
  {
    period: '2021 — 2022',
    role: 'Junior Developer',
    company: 'Previous Company',
    description: 'Started professional development career working on web projects with React and Node.js.',
  },
]

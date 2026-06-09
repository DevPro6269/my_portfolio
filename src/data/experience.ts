export type ExperienceEntry = {
  period: string
  role: string
  company: string
  companyUrl: string
  description: string
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    period: 'Jun 2025 — Present',
    role: 'Founding Engineer — Full Stack & AI',
    company: 'Sihari Labs · Jhansi, India',
    companyUrl: 'https://www.linkedin.com/company/107545856/',
    description:
      'Led end-to-end development of an AI-powered SaaS platform enabling businesses to deploy drag-and-drop AI agents on WhatsApp, Instagram, and Telegram. Architected Next.js frontend and FastAPI backend with real-time messaging pipelines, webhook processing, and multi-tenant RBAC. Designed full AWS infrastructure (EC2, RDS, S3, NGINX, PM2) with CI/CD pipelines.',
  },
  {
    period: 'May 2025 — Jul 2025',
    role: 'Full Stack Developer Intern',
    company: 'Infotech Global Consultancy · Remote',
    companyUrl: 'https://www.linkedin.com/company/european-pay/',
    description:
      'Built and secured money transfer APIs using Node.js and MongoDB, handling real-time transaction flows with balance validation and webhook-based status updates. Developed JWT authentication middleware for a PhonePe-style digital payments application (Eu-Pay).',
  },
]

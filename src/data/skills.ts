export type SkillCategory = {
  label: string
  skills: string[]
}

export const SKILLS: SkillCategory[] = [
  {
    label: 'Frontend',
    skills: ['Next.js', 'React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
  {
    label: 'Backend',
    skills: ['Python', 'FastAPI', 'Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'MySQL'],
  },
  {
    label: 'Cloud & DevOps',
    skills: ['AWS EC2', 'AWS RDS', 'AWS S3', 'CloudFront', 'NGINX', 'PM2', 'CI/CD', 'Git'],
  },
  {
    label: 'AI',
    skills: ['AI Agents', 'LLMs', 'Google ADK', 'WhatsApp API', 'RAG', 'Multi-Tenant SaaS'],
  },
]

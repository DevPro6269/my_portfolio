import { render, screen } from '@testing-library/react'
import { Experience } from '@/components/sections/Experience'

it('renders experience entries with company links', () => {
  render(<Experience />)
  expect(screen.getByText('Founding Engineer — Full Stack & AI')).toBeInTheDocument()
  expect(screen.getByText('Full Stack Developer Intern')).toBeInTheDocument()

  const sihari = screen.getByRole('link', { name: 'Sihari Labs ↗' })
  expect(sihari).toHaveAttribute('href', 'https://www.linkedin.com/company/107545856/')

  const infotech = screen.getByRole('link', { name: 'Infotech Global Consultancy ↗' })
  expect(infotech).toHaveAttribute('href', 'https://www.linkedin.com/company/european-pay/')
})

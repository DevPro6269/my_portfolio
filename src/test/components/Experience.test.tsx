import { render, screen } from '@testing-library/react'
import { Experience } from '@/components/sections/Experience'

it('renders experience entries', () => {
  render(<Experience />)
  expect(screen.getByText('Founding Engineer — Full Stack & AI')).toBeInTheDocument()
  expect(screen.getByText(/Sihari Labs/)).toBeInTheDocument()
  expect(screen.getByText('Full Stack Developer Intern')).toBeInTheDocument()
})

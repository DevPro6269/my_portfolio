import { render, screen } from '@testing-library/react'
import { Hero } from '@/components/sections/Hero'

it('renders name, bio, stats and links', () => {
  render(<Hero />)
  expect(screen.getByRole('heading', { name: 'Dev Rathore' })).toBeInTheDocument()
  expect(screen.getByText(/Building AI-powered products/)).toBeInTheDocument()
  expect(screen.getByText('3+')).toBeInTheDocument()
  expect(screen.getByText('Years')).toBeInTheDocument()
  expect(screen.getByText('20+')).toBeInTheDocument()
  expect(screen.getByText('Projects')).toBeInTheDocument()
  expect(screen.getByText('5+')).toBeInTheDocument()
  expect(screen.getByText('Clients')).toBeInTheDocument()

  const github = screen.getByRole('link', { name: 'GitHub ↗' })
  expect(github).toBeInTheDocument()
  expect(github).toHaveAttribute('target', '_blank')
  expect(github).toHaveAttribute('rel', 'noopener noreferrer')

  expect(screen.getByRole('link', { name: 'LinkedIn ↗' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Email' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'CV ↓' })).toBeInTheDocument()
})

import { render, screen } from '@testing-library/react'
import { Hero } from '@/components/sections/Hero'

it('renders name and CTAs', () => {
  render(<Hero />)
  expect(screen.getByText('Dev')).toBeInTheDocument()
  expect(screen.getByText('Rathore')).toBeInTheDocument()
  expect(screen.getByText('View Projects')).toBeInTheDocument()
  expect(screen.getByText('Download CV')).toBeInTheDocument()
})

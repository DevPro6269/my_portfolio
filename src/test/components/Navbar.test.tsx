import { render, screen } from '@testing-library/react'
import { Navbar } from '@/components/layout/Navbar'

it('renders logo and nav links', () => {
  render(<Navbar />)
  expect(screen.getByText('DR')).toBeInTheDocument()
  expect(screen.getByText('About')).toBeInTheDocument()
  expect(screen.getByText('Hire Me')).toBeInTheDocument()
})

import { render, screen } from '@testing-library/react'
import { Navbar } from '@/components/layout/Navbar'

it('renders logo and nav links', () => {
  render(<Navbar />)
  expect(screen.getByRole('link', { name: 'Dev Rathore' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Work' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Projects' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Skills' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument()
})

import { render, screen } from '@testing-library/react'
import { Navbar } from '@/components/layout/Navbar'

it('renders logo and nav links', () => {
  render(<Navbar />)

  const logo = screen.getByRole('link', { name: 'Dev Rathore' })
  expect(logo).toBeInTheDocument()
  expect(logo).toHaveAttribute('href', '#hero')

  expect(screen.getByRole('link', { name: 'Work' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Projects' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Skills' })).toBeInTheDocument()

  const contact = screen.getByRole('link', { name: 'Contact' })
  expect(contact).toBeInTheDocument()
  expect(contact).toHaveAttribute('href', '#contact')
})

import { render, screen } from '@testing-library/react'
import { About } from '@/components/sections/About'

it('renders headline and stat labels', () => {
  render(<About />)
  expect(screen.getByText(/I build things/)).toBeInTheDocument()
  expect(screen.getByText('Years')).toBeInTheDocument()
  expect(screen.getByText('Projects')).toBeInTheDocument()
  expect(screen.getByText('Clients')).toBeInTheDocument()
})

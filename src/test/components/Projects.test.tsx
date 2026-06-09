import { render, screen } from '@testing-library/react'
import { Projects } from '@/components/sections/Projects'

it('renders project titles', () => {
  render(<Projects />)
  expect(screen.getByText('Chatverce')).toBeInTheDocument()
  expect(screen.getByText('Acadma')).toBeInTheDocument()
  expect(screen.getByText('Eu-Pay')).toBeInTheDocument()
})

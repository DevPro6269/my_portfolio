import { render, screen } from '@testing-library/react'
import { Projects } from '@/components/sections/Projects'

it('renders project titles', () => {
  render(<Projects />)
  expect(screen.getByText('Siharilabs Platform')).toBeInTheDocument()
  expect(screen.getByText('Chatverce')).toBeInTheDocument()
})

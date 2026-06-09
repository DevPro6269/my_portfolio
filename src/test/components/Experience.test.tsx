import { render, screen } from '@testing-library/react'
import { Experience } from '@/components/sections/Experience'

it('renders experience entries', () => {
  render(<Experience />)
  expect(screen.getByText('Founder & Lead Engineer')).toBeInTheDocument()
  expect(screen.getByText('Siharilabs')).toBeInTheDocument()
})

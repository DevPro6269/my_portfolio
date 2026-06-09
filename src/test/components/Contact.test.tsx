import { render, screen } from '@testing-library/react'
import { Contact } from '@/components/sections/Contact'

it('renders CTA and social links', () => {
  render(<Contact />)
  expect(screen.getByText('Send Email')).toBeInTheDocument()
  expect(screen.getByText('GitHub')).toBeInTheDocument()
  expect(screen.getByText('LinkedIn')).toBeInTheDocument()
})

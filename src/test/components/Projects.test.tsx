import { render, screen } from '@testing-library/react'
import { Projects } from '@/components/sections/Projects'

it('renders projects with live-site links', () => {
  render(<Projects />)

  const chatverce = screen.getByRole('link', { name: 'Chatverce ↗' })
  expect(chatverce).toHaveAttribute('href', 'https://chatverce.com/')

  const acadma = screen.getByRole('link', { name: 'Acadma ↗' })
  expect(acadma).toHaveAttribute('href', 'https://acadma.in/')

  const eupay = screen.getByRole('link', { name: 'Eu-Pay ↗' })
  expect(eupay).toHaveAttribute('href', 'https://www.european-pay.fr/')
})

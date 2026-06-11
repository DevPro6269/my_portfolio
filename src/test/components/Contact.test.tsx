import { render, screen } from '@testing-library/react'
import { Contact } from '@/components/sections/Contact'

it('renders heading and contact links', () => {
  render(<Contact />)

  expect(screen.getByRole('heading', { name: "Let's build something." })).toBeInTheDocument()

  const email = screen.getByRole('link', { name: 'Email' })
  expect(email).toHaveAttribute('href', 'mailto:devrathore653@gmail.com')

  const github = screen.getByRole('link', { name: 'GitHub' })
  expect(github).toHaveAttribute('href', 'https://github.com/DevPro6269')
  expect(github).toHaveAttribute('target', '_blank')
  expect(github).toHaveAttribute('rel', 'noopener noreferrer')

  const linkedin = screen.getByRole('link', { name: 'LinkedIn' })
  expect(linkedin).toHaveAttribute('href', 'https://linkedin.com/in/dev-rathore-15299a201')
})

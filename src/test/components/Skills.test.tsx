import { render, screen } from '@testing-library/react'
import { Skills } from '@/components/sections/Skills'

it('renders skill categories and individual skills', () => {
  render(<Skills />)
  expect(screen.getByText('AI')).toBeInTheDocument()
  expect(screen.getByText('Backend')).toBeInTheDocument()
  expect(screen.getByText('LLMs')).toBeInTheDocument()
  expect(screen.getByText('Python')).toBeInTheDocument()
  expect(screen.getByText('Next.js')).toBeInTheDocument()
})

import { render, screen, fireEvent } from '@testing-library/react'
import { Projects } from '@/components/sections/Projects'

it('shows the first category by default with live-site links', () => {
  render(<Projects />)

  const chatverce = screen.getByRole('link', { name: 'Chatverce' })
  expect(chatverce).toHaveAttribute('href', 'https://chatverce.com/')

  // Other categories are hidden until their filter is selected.
  expect(screen.queryByRole('link', { name: 'VibeApply' })).toBeNull()
})

it('filters projects when a category is selected', () => {
  render(<Projects />)

  fireEvent.click(screen.getByRole('button', { name: 'Personal' }))

  expect(screen.getByRole('link', { name: 'VibeApply' })).toBeTruthy()

  // Product projects are no longer visible once filtered to Personal.
  expect(screen.queryByRole('link', { name: 'Chatverce' })).toBeNull()
})

import { render, screen, fireEvent, act } from '@testing-library/react'
import { vi } from 'vitest'
import { Skills } from '@/components/sections/Skills'

describe('Skills', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders all 4 tab buttons', () => {
    render(<Skills />)
    expect(screen.getByRole('button', { name: 'Frontend' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Backend' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cloud & DevOps' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'AI' })).toBeInTheDocument()
  })

  it('shows Frontend skills by default', () => {
    render(<Skills />)
    expect(screen.getByText('Next.js')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.queryByText('Python')).not.toBeInTheDocument()
    expect(screen.queryByText('AWS EC2')).not.toBeInTheDocument()
  })

  it('switches to Backend skills after clicking Backend tab', () => {
    vi.useFakeTimers()
    render(<Skills />)

    fireEvent.click(screen.getByRole('button', { name: 'Backend' }))

    act(() => { vi.advanceTimersByTime(220) })

    expect(screen.getByText('Python')).toBeInTheDocument()
    expect(screen.getByText('FastAPI')).toBeInTheDocument()
    expect(screen.queryByText('Next.js')).not.toBeInTheDocument()
  })

  it('switches to AI skills after clicking AI tab', () => {
    vi.useFakeTimers()
    render(<Skills />)

    fireEvent.click(screen.getByRole('button', { name: 'AI' }))

    act(() => { vi.advanceTimersByTime(220) })

    expect(screen.getByText('AI Agents')).toBeInTheDocument()
    expect(screen.getByText('Google ADK')).toBeInTheDocument()
    expect(screen.queryByText('Next.js')).not.toBeInTheDocument()
  })
})

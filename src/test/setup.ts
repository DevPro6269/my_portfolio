import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mocks src/lib/gsap.ts (created in Task 2) — must appear before any component import
vi.mock('@/lib/gsap', () => ({
  gsap: {
    registerPlugin: vi.fn(),
    defaults: vi.fn(),
    timeline: () => ({
      from: vi.fn().mockReturnThis(),
      to: vi.fn().mockReturnThis(),
      fromTo: vi.fn().mockReturnThis(),
      set: vi.fn().mockReturnThis(),
      call: vi.fn().mockReturnThis(),
      kill: vi.fn().mockReturnThis(),
      pause: vi.fn().mockReturnThis(),
    }),
    from: vi.fn(),
    to: vi.fn(),
    fromTo: vi.fn(),
    set: vi.fn(),
    ticker: { add: vi.fn(), remove: vi.fn(), lagSmoothing: vi.fn() },
  },
  ScrollTrigger: {
    create: vi.fn(),
    defaults: vi.fn(),
    update: vi.fn(),
    kill: vi.fn(),
    refresh: vi.fn(),
    getAll: vi.fn(() => []),
  },
  Draggable: { create: vi.fn() },
}))

vi.mock('@gsap/react', () => ({
  useGSAP: vi.fn(),
}))

vi.mock('lenis', () => ({
  default: vi.fn().mockImplementation(() => ({
    on: vi.fn(),
    raf: vi.fn(),
    destroy: vi.fn(),
    scrollTo: vi.fn(),
    stop: vi.fn(),
    start: vi.fn(),
  })),
}))

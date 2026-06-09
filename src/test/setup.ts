import '@testing-library/jest-dom'
import { vi } from 'vitest'

vi.mock('@/lib/gsap', () => ({
  gsap: {
    registerPlugin: vi.fn(),
    defaults: vi.fn(),
    timeline: () => ({
      from: vi.fn().mockReturnThis(),
      to: vi.fn().mockReturnThis(),
      call: vi.fn().mockReturnThis(),
    }),
    from: vi.fn(),
    to: vi.fn(),
    ticker: { add: vi.fn(), remove: vi.fn(), lagSmoothing: vi.fn() },
  },
  ScrollTrigger: {
    create: vi.fn(),
    defaults: vi.fn(),
    update: vi.fn(),
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
  })),
}))

// Thin, SSR-safe wrappers around the Meta Pixel `fbq` global.
// `trackEvent` is for Meta *standard* events (Contact, Lead, ViewContent, …);
// `trackCustom` is for your own custom event names.

type Fbq = (...args: unknown[]) => void

declare global {
  interface Window {
    fbq?: Fbq
  }
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', name, params)
  }
}

export function trackCustom(name: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('trackCustom', name, params)
  }
}

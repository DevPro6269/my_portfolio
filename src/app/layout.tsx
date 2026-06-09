import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Dev Rathore — AI Full Stack Engineer',
  description:
    'Portfolio of Dev Rathore, AI Full Stack Engineer building intelligent products with Python, FastAPI, Next.js & LLMs.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="font-[var(--font-inter)]">{children}</body>
    </html>
  )
}

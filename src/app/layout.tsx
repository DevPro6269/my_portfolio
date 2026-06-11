import type { Metadata } from 'next'
import { Lora, Geist_Mono } from 'next/font/google'
import { Navbar } from '@/components/layout/Navbar'
import { MetaPixel } from '@/components/analytics/MetaPixel'
import './globals.css'

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'Dev Rathore — Full Stack & AI Engineer',
  description:
    'Portfolio of Dev Rathore, Full Stack & AI Engineer building intelligent products with Next.js, FastAPI, and LLMs.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lora.variable} ${geistMono.variable}`}>
      <body>
        <MetaPixel />
        <Navbar />
        {children}
      </body>
    </html>
  )
}

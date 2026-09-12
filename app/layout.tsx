import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'siklus. — Organic Exchange',
  description: 'Platform pertukaran limbah organik untuk industri HORECA dan peternak maggot.',
  generator: 'v0.app',
  icons: { icon: '/icon.svg', apple: '/apple-icon.png' },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f6f8f3',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className="bg-background">
      <body>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body>
    </html>
  )
}


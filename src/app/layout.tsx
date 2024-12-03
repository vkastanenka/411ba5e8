// components
import { Toaster } from '@/components/ui/toaster'

// utils
import { cn } from '@/lib/utils'
import { Inter } from 'next/font/google'

// types
import type { Metadata } from 'next'

// styles
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Aircall',
  description: 'Make calls from the air',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}

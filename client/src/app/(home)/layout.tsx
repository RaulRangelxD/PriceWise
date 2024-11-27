import type { Metadata } from 'next'
import '@/app/globals.css'
import { RootLayout } from '@/components/template/RootLayout'

export const metadata: Metadata = {
  title: 'Perro',
  description: 'Created by RaulRangelxD',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='es' className='dark'>
      <body className='min-h-screen'>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  )
}

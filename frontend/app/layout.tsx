import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Navigation } from '@/components/Navigation'
import { ClientOnly } from '@/components/ClientOnly'
import { WalletGuard } from '@/components/WalletGuard'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { ConsoleErrorSuppressor } from '@/components/ConsoleErrorSuppressor'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'porto bootstrap test',
  description: 'testing porto integration with wagmi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ErrorBoundary>
          <ConsoleErrorSuppressor />
          <ClientOnly>
            <WalletGuard>
              <Providers>
                <Navigation />
                {children}
              </Providers>
            </WalletGuard>
          </ClientOnly>
        </ErrorBoundary>
      </body>
    </html>
  )
}
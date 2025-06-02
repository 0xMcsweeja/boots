'use client'

import { useEffect, useState } from 'react'

interface WalletGuardProps {
  children: React.ReactNode
}

export function WalletGuard({ children }: WalletGuardProps) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true)
    }, 100)

    if (typeof window !== 'undefined') {
      const checkProviders = () => {
        setIsReady(true)
      }
      
      if (document.readyState === 'complete') {
        checkProviders()
      } else {
        window.addEventListener('load', checkProviders)
        return () => {
          window.removeEventListener('load', checkProviders)
          clearTimeout(timer)
        }
      }
    }

    return () => clearTimeout(timer)
  }, [])

  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return <>{children}</>
}
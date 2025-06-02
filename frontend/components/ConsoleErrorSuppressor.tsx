'use client'

import { useEffect } from 'react'

export function ConsoleErrorSuppressor() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const originalError = console.error
      const originalWarn = console.warn
      
      console.error = (...args) => {
        const message = args[0]?.toString() || ''
        
        if (
          message.includes('Cannot set property ethereum') ||
          message.includes('ethereum of #<Window>') ||
          message.includes('which has only a getter') ||
          message.includes('inpage.js') ||
          message.includes('requestProvider.js')
        ) {
          return
        }
        
        originalError.apply(console, args)
      }
      
      console.warn = (...args) => {
        const message = args[0]?.toString() || ''
        
        if (
          message.includes('wallet provider') ||
          message.includes('ethereum provider') ||
          message.includes('Unable to get preferred account types')
        ) {
          return
        }
        
        originalWarn.apply(console, args)
      }
      
      return () => {
        console.error = originalError
        console.warn = originalWarn
      }
    }
  }, [])
  
  return null
}
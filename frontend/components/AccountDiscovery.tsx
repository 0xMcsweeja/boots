'use client'

import { useAccount } from 'wagmi'
import { useState } from 'react'

export function AccountDiscovery() {
  const { address, connector } = useAccount()
  const [showDetails, setShowDetails] = useState(false)

  if (!address) return null

  const isPortoAccount = connector?.id === 'xyz.ithaca.porto'

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-medium mb-6 text-gray-900 dark:text-white">account info</h2>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              connected account
            </p>
            {isPortoAccount && (
              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                porto
              </span>
            )}
          </div>
          <p className="font-mono text-sm break-all">{address}</p>
          
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="mt-3 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          >
            {showDetails ? 'hide' : 'details'}
          </button>
          
          {showDetails && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-gray-900 dark:text-white">connector:</span> {connector?.name}
                </p>
                {isPortoAccount ? (
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <p>• gasless transactions</p>
                    <p>• batch operations</p>
                    <p>• session keys</p>
                    <p>• social recovery</p>
                  </div>
                ) : (
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p>standard ethereum account</p>
                    <p className="text-xs mt-1">porto integration available</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
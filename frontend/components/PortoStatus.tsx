'use client'

import { useConnect } from 'wagmi'

export function PortoStatus() {
  const { connectors } = useConnect()
  
  const portoConnector = connectors.find(
    (connector) => connector.id === 'xyz.ithaca.porto'
  )

  if (portoConnector) {
    return (
      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
          <span className="text-sm text-green-700 dark:text-green-300">
            porto sdk ready
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          porto sdk not loaded - using fallback
        </span>
      </div>
    </div>
  )
}
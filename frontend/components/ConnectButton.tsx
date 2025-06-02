'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useState } from 'react'

export function ConnectButton() {
  const { address, isConnected, connector } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const [showConnectors, setShowConnectors] = useState(false)

  const portoConnector = connectors.find(
    (connector) => connector.id === 'xyz.ithaca.porto'
  )
  const otherConnectors = connectors.filter(
    (connector) => connector.id !== 'xyz.ithaca.porto'
  )

  if (isConnected) {
    return (
      <div className="flex items-center gap-4">
        <div className="text-sm">
          <p className="text-gray-500">Connected with {connector?.name}</p>
          <p className="font-mono">{address?.slice(0, 6)}...{address?.slice(-4)}</p>
          {connector?.id === 'xyz.ithaca.porto' && (
            <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full mt-1">
              porto
            </span>
          )}
        </div>
        <button
          onClick={() => disconnect()}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="flex gap-2">
        {portoConnector && (
          <button
            onClick={() => connect({ connector: portoConnector })}
            disabled={isPending}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isPending ? 'connecting...' : 'connect with porto'}
          </button>
        )}
        <button
          onClick={() => setShowConnectors(!showConnectors)}
          disabled={isPending}
          className="px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
        >
          {portoConnector ? 'other wallets' : 'connect wallet'}
        </button>
      </div>

      {showConnectors && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2 z-10">
          {otherConnectors.map((connector) => (
            <button
              key={connector.id}
              onClick={() => {
                connect({ connector })
                setShowConnectors(false)
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            >
              {connector.name}
            </button>
          ))}
          {!portoConnector && (
            <div className="px-4 py-2 text-sm text-gray-500 italic">
              porto not available
            </div>
          )}
        </div>
      )}
    </div>
  )
}
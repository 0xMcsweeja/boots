'use client'

import { ConnectButton } from '@/components/ConnectButton'
import { AccountDiscovery } from '@/components/AccountDiscovery'
import { PortoStatus } from '@/components/PortoStatus'
import { useAccount } from 'wagmi'

export default function Home() {
  const { isConnected } = useAccount()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-4xl text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-light text-gray-900 dark:text-white tracking-tight">
            porto bootstrap test
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            testing account abstraction integration with wagmi
          </p>
        </div>
        
        <ConnectButton />
      </div>

      <div className="w-full max-w-4xl space-y-6">
        <PortoStatus />
        {isConnected && <AccountDiscovery />}
      </div>

      <div className="w-full max-w-4xl">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">porto</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              account abstraction for better ux
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">wagmi</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              react hooks for ethereum
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">foundry</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              smart contract development
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="/contracts"
            className="inline-flex items-center px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            test contract interactions →
          </a>
        </div>
      </div>
    </main>
  )
}
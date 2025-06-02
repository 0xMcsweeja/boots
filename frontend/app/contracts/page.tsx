'use client'

import { useAccount } from 'wagmi'
import { ConnectButton } from '@/components/ConnectButton'
import { CounterContract } from '@/components/CounterContract'
import { SimpleTokenContract } from '@/components/SimpleTokenContract'

export default function ContractsPage() {
  const { isConnected } = useAccount()

  if (!isConnected) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
        <h1 className="text-3xl font-light text-gray-900 dark:text-white">contract testing</h1>
        <p className="text-gray-600 dark:text-gray-400">connect wallet to test interactions</p>
        <ConnectButton />
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-light text-gray-900 dark:text-white">contract testing</h1>
          <ConnectButton />
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          <CounterContract />
          <SimpleTokenContract />
        </div>
        
        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium mb-2 text-gray-900 dark:text-white">local setup</h3>
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <p>• anvil running on localhost:8545</p>
            <p>• contracts deployed locally</p>
            <p>• wallet connected to local network</p>
          </div>
        </div>
      </div>
    </div>
  )
}
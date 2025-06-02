'use client'

import { WagmiProvider, createConfig } from 'wagmi'
import { mainnet, sepolia, baseSepolia, localhost } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http } from 'viem'
import { injected, metaMask } from 'wagmi/connectors'

function getPortoConnector() {
  try {
    const { porto } = require('porto/wagmi')
    return porto()
  } catch (error) {
    console.warn('Porto connector not available:', error.message)
    return null
  }
}

const portoConnector = getPortoConnector()
const connectors = [
  injected(),
  metaMask(),
  ...(portoConnector ? [portoConnector] : [])
]

const config = createConfig({
  chains: [localhost, sepolia, baseSepolia, mainnet],
  connectors,
  transports: {
    [localhost.id]: http('http://localhost:8545'),
    [sepolia.id]: http(),
    [baseSepolia.id]: http(),
    [mainnet.id]: http(),
  },
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
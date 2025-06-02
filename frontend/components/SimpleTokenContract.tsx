'use client'

import React, { useState } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { formatUnits, parseUnits } from 'viem'

const tokenABI = [
  {
    "inputs": [],
    "name": "name",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "to", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "transfer",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const

const TOKEN_ADDRESS = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'

export function SimpleTokenContract() {
  const { address } = useAccount()
  const [transferTo, setTransferTo] = useState('')
  const [transferAmount, setTransferAmount] = useState('')
  
  const { data: tokenName } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: tokenABI,
    functionName: 'name',
  })
  
  const { data: tokenSymbol } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: tokenABI,
    functionName: 'symbol',
  })
  
  const { data: totalSupply } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: tokenABI,
    functionName: 'totalSupply',
  })
  
  const { data: balance, refetch: refetchBalance } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: tokenABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: !!address }
  })
  
  const { 
    writeContract: writeTransfer, 
    data: transferHash, 
    isPending: isTransferPending 
  } = useWriteContract()
  
  const { isLoading: isTransferConfirming, isSuccess: isTransferSuccess } = useWaitForTransactionReceipt({
    hash: transferHash,
  })
  React.useEffect(() => {
    if (isTransferSuccess) {
      refetchBalance()
      setTransferTo('')
      setTransferAmount('')
    }
  }, [isTransferSuccess, refetchBalance])
  
  const handleTransfer = () => {
    if (!transferTo || !transferAmount) return
    writeTransfer({
      address: TOKEN_ADDRESS,
      abi: tokenABI,
      functionName: 'transfer',
      args: [transferTo as `0x${string}`, parseUnits(transferAmount, 18)],
    })
  }
  
  const formatTokenAmount = (amount: bigint | undefined) => {
    if (!amount) return '0'
    return formatUnits(amount, 18)
  }
  
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-medium mb-6 text-gray-900 dark:text-white">token contract</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600 dark:text-gray-400">Name</p>
                <p className="font-semibold">{tokenName || 'Loading...'}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Symbol</p>
                <p className="font-semibold">{tokenSymbol || 'Loading...'}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Total Supply</p>
                <p className="font-semibold">{formatTokenAmount(totalSupply)}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Your Balance</p>
                <p className="font-semibold">{formatTokenAmount(balance)}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">transfer tokens</h3>
          
          <div className="space-y-3">
            <input
              type="text"
              value={transferTo}
              onChange={(e) => setTransferTo(e.target.value)}
              placeholder="Recipient address (0x...)"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
            />
            
            <div className="flex gap-2">
              <input
                type="number"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                placeholder="Amount"
                step="0.001"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              />
              <button
                onClick={handleTransfer}
                disabled={!transferTo || !transferAmount || isTransferPending || isTransferConfirming}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isTransferPending || isTransferConfirming ? 'Transferring...' : 'Transfer'}
              </button>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setTransferTo('0x70997970C51812dc3A010C7d01b50e0d17dc79C8')}
              className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
            >
              Test Address 1
            </button>
            <button
              onClick={() => setTransferTo('0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC')}
              className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
            >
              Test Address 2
            </button>
          </div>
        </div>
        
        <div className="text-xs text-gray-500 dark:text-gray-400">
          <p>Contract: {TOKEN_ADDRESS}</p>
          {transferHash && <p>Last transfer: {transferHash}</p>}
        </div>
      </div>
    </div>
  )
}
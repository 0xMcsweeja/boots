'use client'

import React, { useState } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { formatEther, parseEther } from 'viem'

const counterABI = [
  {
    "inputs": [],
    "name": "number",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "newNumber", "type": "uint256"}],
    "name": "setNumber",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "increment",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
    "name": "getUserCount",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const

const COUNTER_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

export function CounterContract() {
  const { address } = useAccount()
  const [newNumber, setNewNumber] = useState('')
  
  const { data: currentNumber, refetch: refetchNumber } = useReadContract({
    address: COUNTER_ADDRESS,
    abi: counterABI,
    functionName: 'number',
  })
  
  const { data: userCount, refetch: refetchUserCount } = useReadContract({
    address: COUNTER_ADDRESS,
    abi: counterABI,
    functionName: 'getUserCount',
    args: address ? [address] : undefined,
    query: { enabled: !!address }
  })
  
  const { 
    writeContract: writeIncrement, 
    data: incrementHash, 
    isPending: isIncrementPending 
  } = useWriteContract()
  
  const { 
    writeContract: writeSetNumber, 
    data: setNumberHash, 
    isPending: isSetNumberPending 
  } = useWriteContract()
  
  const { isLoading: isIncrementConfirming, isSuccess: isIncrementSuccess } = useWaitForTransactionReceipt({
    hash: incrementHash,
  })
  
  const { isLoading: isSetNumberConfirming, isSuccess: isSetNumberSuccess } = useWaitForTransactionReceipt({
    hash: setNumberHash,
  })
  React.useEffect(() => {
    if (isIncrementSuccess) {
      refetchNumber()
      refetchUserCount()
    }
  }, [isIncrementSuccess, refetchNumber, refetchUserCount])
  
  React.useEffect(() => {
    if (isSetNumberSuccess) {
      refetchNumber()
      refetchUserCount()
    }
  }, [isSetNumberSuccess, refetchNumber, refetchUserCount])
  
  const handleIncrement = () => {
    writeIncrement({
      address: COUNTER_ADDRESS,
      abi: counterABI,
      functionName: 'increment',
    })
  }
  
  const handleSetNumber = () => {
    if (!newNumber) return
    writeSetNumber({
      address: COUNTER_ADDRESS,
      abi: counterABI,
      functionName: 'setNumber',
      args: [BigInt(newNumber)],
    })
  }
  
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-medium mb-6 text-gray-900 dark:text-white">counter contract</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">global</p>
            <p className="text-2xl font-light">{currentNumber?.toString() || '0'}</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">yours</p>
            <p className="text-2xl font-light">{userCount?.toString() || '0'}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={handleIncrement}
            disabled={isIncrementPending || isIncrementConfirming}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isIncrementPending || isIncrementConfirming ? 'Incrementing...' : 'Increment'}
          </button>
          
          <div className="flex gap-2">
            <input
              type="number"
              value={newNumber}
              onChange={(e) => setNewNumber(e.target.value)}
              placeholder="Enter number"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
            />
            <button
              onClick={handleSetNumber}
              disabled={!newNumber || isSetNumberPending || isSetNumberConfirming}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSetNumberPending || isSetNumberConfirming ? 'Setting...' : 'Set Number'}
            </button>
          </div>
        </div>
        
        <div className="text-xs text-gray-500 dark:text-gray-400">
          <p>Contract: {COUNTER_ADDRESS}</p>
          {incrementHash && <p>Last increment: {incrementHash}</p>}
          {setNumberHash && <p>Last set: {setNumberHash}</p>}
        </div>
      </div>
    </div>
  )
}
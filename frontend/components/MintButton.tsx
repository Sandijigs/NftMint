'use client';

import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract';
import { useState, useEffect } from 'react';
import { formatEther } from '@/lib/utils';

export function MintButton() {
  const { address, isConnected } = useAccount();
  const [isMinting, setIsMinting] = useState(false);

  // Read mint price
  const { data: mintPrice } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'mintPrice',
  });

  // Read user stats
  const { data: userStats, refetch: refetchStats } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getUserStats',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  const { writeContract, data: hash, error, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess, isError: isConfirmError } = useWaitForTransactionReceipt({
    hash,
  });

  // Debug logging
  useEffect(() => {
    console.log('Transaction Status:', {
      hash: hash?.toString(),
      isPending,
      isConfirming,
      isSuccess,
      isConfirmError,
      error: error?.message,
    });
  }, [hash, isPending, isConfirming, isSuccess, isConfirmError, error]);

  useEffect(() => {
    if (isSuccess) {
      setIsMinting(false);
      refetchStats();
    }
    if (isConfirmError) {
      setIsMinting(false);
    }
  }, [isSuccess, isConfirmError, refetchStats]);

  const handleMint = async () => {
    if (!isConnected || !address) return;

    setIsMinting(true);
    try {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'mintDaily',
        value: mintPrice || 0n,
      });
    } catch (err) {
      console.error('Mint error:', err);
      setIsMinting(false);
    }
  };

  const canMint = userStats?.[4] ?? true; // canMint boolean from getUserStats (default true if undefined)
  const currentStreak = userStats?.[1] || 0;
  const totalMints = userStats?.[3] || 0;
  const loading = isPending || isConfirming || isMinting;

  // Debug logging
  console.log('User Stats:', {
    canMint,
    currentStreak,
    totalMints,
    rawStats: userStats,
  });

  if (!isConnected) {
    return (
      <div className="text-center text-gray-500">
        Connect your wallet to mint
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="text-sm font-medium">Error: {error.message}</p>
        </div>
      )}

      {hash && isConfirming && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg">
          <p className="text-sm font-medium">⏳ Transaction submitted! Waiting for confirmation...</p>
          <a
            href={`https://sepolia.basescan.org/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs mt-1 underline hover:text-blue-900"
          >
            View on Basescan →
          </a>
        </div>
      )}

      {isSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          <p className="text-sm font-medium">🎉 Successfully minted today's NFT!</p>
          <p className="text-xs mt-1">Your streak: {Number(currentStreak) + 1} days 🔥</p>
          {hash && (
            <a
              href={`https://sepolia.basescan.org/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs mt-1 underline hover:text-green-900 block"
            >
              View transaction →
            </a>
          )}
        </div>
      )}

      <button
        onClick={handleMint}
        disabled={!canMint || loading}
        className={`
          w-full py-4 px-6 rounded-xl font-bold text-lg
          transition-all duration-200 transform hover:scale-105
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
          ${
            canMint && !loading
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-600'
          }
        `}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {isConfirming ? 'Confirming...' : 'Minting...'}
          </span>
        ) : canMint ? (
          <span className="flex items-center justify-center gap-2">
            ✨ Mint Today's NFT
            {mintPrice && mintPrice > 0n && (
              <span className="text-sm opacity-90">
                ({formatEther(mintPrice)} ETH)
              </span>
            )}
          </span>
        ) : (
          'Already Minted Today ✅'
        )}
      </button>

      {canMint && (
        <p className="text-center text-sm text-gray-600">
          Mint before the day ends to keep your streak!
        </p>
      )}
    </div>
  );
}

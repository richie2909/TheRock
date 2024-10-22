'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  Users,
  Coins,
  Timer,
  RefreshCcw,
  ExternalLink,
} from 'lucide-react';
import { formatEther, parseEther } from 'viem';
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { abi, contractAddress } from '../constants/contractInfo';
import GameSearchCard from './GameSearchCard';
import toast from 'react-hot-toast';
import { extractErrorMessages } from '../utils';


// This would typically come from your contract interactions
const mockActiveGames = [
  {
    gameId: '0x123...abc',
    creator: '0x456...def',
    stake: '0.01',
    gameType: 0,
    createdAt: new Date().getTime() - 1000 * 60 * 5, // 5 minutes ago
  },
  // Add more mock games as needed
];

export default function JoinGame() {
      const {
        data: hash,
        error,
        isPending,
        writeContract,
      } = useWriteContract();
            const { isLoading: isConfirming, isSuccess: isConfirmed } =
              useWaitForTransactionReceipt({
                hash,
              });
  const [activeGames, setActiveGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState<number|null>();
  const [refreshToken, setRefreshToken] = useState('')
  const account = useAccount()

  const proofedSearchQuery = searchQuery | 0


  // Function to get game type label
  const getGameTypeLabel = (type) => {
    const types = ['One Round', 'Best of Three', 'Best of Five'];
    return types[type] || 'Unknown';
  };

  // const handleJoinGame = async (gameId, stake) => {
  //   setIsLoading(true);
  //   try {
  //     // Contract interaction logic will go here
  //     console.log('Joining game:', gameId, stake);
  //   } catch (error) {
  //     console.error('Error joining game:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

      const gamesIdResult = useReadContract({
        abi,
        address: contractAddress,
        functionName: 'getGameById',
        args: [BigInt(proofedSearchQuery)],
        scopeKey: refreshToken
      });



  const handleSearch = async () => {
    setIsLoading(true);
    try {
      // Fetch active games logic will go here

      console.log(gamesIdResult);
      
      setActiveGames(mockActiveGames);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinGame = async(id,stake)=>{
    console.log({id, stake});
    
    const toastId = toast.loading('Preparing to join game...',)
try {
  await writeContract({
    address: contractAddress,
    abi,
    functionName: 'joinGame',
    args: [id],
    value: (stake),
  });
        toast.loading('Waiting for transaction confirmation...', {
          id: toastId,
          icon: '⏳',
          duration: 3000,
        });
} catch (err) {
        toast.error(
          err instanceof Error ? err.message : 'Failed to create game',
          {
            id: toastId,
            duration: 3000,
            icon: '❌',
          }
        );
        console.error('Error joining game:', err);
}
  }


useEffect(() => {
      if (isConfirmed) {
        toast.success('Game joined successfully! 🎮', {
          duration: 3000,
          icon: '🎉',
        });
        // Reset form
      }
      setRefreshToken(Date.now().toString())
    }, [isConfirmed]);

        React.useEffect(() => {
          if (error) {
            toast.error(extractErrorMessages(error?.message), {
              duration: 3000,
              icon: '🎉',
            });
  console.log(error);
          }
        }, [error]);

  return (
    <div className='space-y-6 text-white'>
      {/* Search and Refresh Section */}
      <div className='flex gap-4'>
        <div className='flex-1 relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
          <input
            type='number'
            placeholder='Search game by ID'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full pl-10 pr-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-white'
          />
        </div>
        <button
          onClick={handleSearch}
          className='p-3 bg-gray-800 border-2 border-gray-700 rounded-lg hover:border-gray-600 transition-colors'
        >
          {/* // this should be search */}
          <RefreshCcw
            className={`w-5 h-5 text-gray-400 ${
              isLoading ? 'animate-spin' : ''
            }`}
          />
        </button>
      </div>

      {/* Active Games List */}
      <div className='space-y-4'>
        <div className='flex justify-between items-center'>
          <h2 className='text-xl font-semibold text-gray-200'>Active Games</h2>
          <span className='text-sm text-gray-400'>
            {activeGames.length} available
          </span>
        </div>

        <div className='space-y-4'>
          {activeGames.length === 0 ? (
            <div className='text-center py-8 bg-gray-800 rounded-lg'>
              <Users className='w-12 h-12 text-gray-600 mx-auto mb-3' />
              <p className='text-gray-400'>No active games found</p>
              <button
                onClick={handleSearch}
                className='mt-4 text-blue-400 hover:text-blue-300 text-sm flex items-center justify-center gap-2'
              >
                <RefreshCcw className='w-4 h-4' />
                Refresh games
              </button>
            </div>
          ) : (
            <GameSearchCard game={gamesIdResult.data} isLoading={isPending} onJoinGame={()=>handleJoinGame(gamesIdResult.data.gameId, gamesIdResult.data.stake)} userAddress={account.address} />
          )}
        </div>
      </div>
    </div>
  );
}

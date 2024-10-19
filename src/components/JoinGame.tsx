'use client';

import { useState, useEffect } from 'react';
import {
  Search,
  Users,
  Coins,
  Timer,
  RefreshCcw,
  ExternalLink,
} from 'lucide-react';
import { formatEther } from 'viem';

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
  const [activeGames, setActiveGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Function to format time ago
  const getTimeAgo = (timestamp) => {
    const seconds = Math.floor((new Date().getTime() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  // Function to get game type label
  const getGameTypeLabel = (type) => {
    const types = ['One Round', 'Best of Three', 'Best of Five'];
    return types[type] || 'Unknown';
  };

  const handleJoinGame = async (gameId, stake) => {
    setIsLoading(true);
    try {
      // Contract interaction logic will go here
      console.log('Joining game:', gameId, stake);
    } catch (error) {
      console.error('Error joining game:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      // Fetch active games logic will go here
      setActiveGames(mockActiveGames);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='space-y-6 text-white'>
      {/* Search and Refresh Section */}
      <div className='flex gap-4'>
        <div className='flex-1 relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
          <input
            type='text'
            placeholder='Search by game ID or creator address'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full pl-10 pr-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-white'
          />
        </div>
        <button
          onClick={handleRefresh}
          className='p-3 bg-gray-800 border-2 border-gray-700 rounded-lg hover:border-gray-600 transition-colors'
        >
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
                onClick={handleRefresh}
                className='mt-4 text-blue-400 hover:text-blue-300 text-sm flex items-center justify-center gap-2'
              >
                <RefreshCcw className='w-4 h-4' />
                Refresh games
              </button>
            </div>
          ) : (
            activeGames.map((game) => (
              <div
                key={game.gameId}
                className='bg-gray-800 rounded-lg p-4 border-2 border-gray-700 hover:border-gray-600 transition-colors'
              >
                <div className='flex justify-between items-start mb-4'>
                  <div>
                    <div className='flex items-center gap-2 mb-1'>
                      <h3 className='font-medium'>
                        Game #{game.gameId.slice(0, 6)}
                      </h3>
                      <button
                        onClick={() =>
                          navigator.clipboard.writeText(game.gameId)
                        }
                        className='text-gray-400 hover:text-gray-300'
                      >
                        <ExternalLink className='w-4 h-4' />
                      </button>
                    </div>
                    <p className='text-sm text-gray-400'>
                      Created by {game.creator.slice(0, 6)}...
                      {game.creator.slice(-4)}
                    </p>
                  </div>
                  <span className='text-sm text-gray-400'>
                    {getTimeAgo(game.createdAt)}
                  </span>
                </div>

                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-2'>
                      <Coins className='w-4 h-4 text-yellow-400' />
                      <span>{game.stake} ETH</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Timer className='w-4 h-4 text-blue-400' />
                      <span>{getGameTypeLabel(game.gameType)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleJoinGame(game.gameId, game.stake)}
                    disabled={isLoading}
                    className='px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2'
                  >
                    <Users className='w-4 h-4' />
                    Join Game
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import {
  Timer,
  ChevronDown,
  ChevronUp,
  Users,
  Coins,
  Trophy,
  Clock,
  PlayCircle,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from 'lucide-react';
import { useAccount, useReadContract } from 'wagmi';
import { abi, contractAddress } from '../constants/contractInfo';


// GameHistoryCard component
const GameHistoryCard = ({ game }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!game) return null;

  const getGameStateIcon = (state) => {
    if (!state) return null;

    const stateString =
      typeof state === 'number'
        ? ['WAITING', 'ACTIVE', 'COMPLETED', 'CANCELLED', 'TIMEOUT'][state]
        : state;

    switch (stateString) {
      case 0:
      case 'WAITING':
        return <Clock className='text-yellow-500' size={20} />;
      case 1:
      case 'ACTIVE':
        return <PlayCircle className='text-green-500' size={20} />;
      case 2:
      case 'COMPLETED':
        return <CheckCircle className='text-blue-500' size={20} />;
      case 3:
      case 'CANCELLED':
        return <XCircle className='text-red-500' size={20} />;
      case 4:
      case 'TIMEOUT':
        return <AlertTriangle className='text-yellow-500' size={20} />;
      default:
        return null;
    }
  };

  const formatAddress = (address) => {
    if (!address) return 'Unknown';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getScoreColor = (index) => {
    if (!game.scores) return 'text-gray-400';
    if (game.scores[0] === game.scores[1]) return 'text-yellow-500';
    return game.scores[index] > game.scores[1 - index]
      ? 'text-green-500'
      : 'text-red-500';
  };

  const getGameTypeString = (type) => {
    if (type === undefined || type === null) return 'Unknown';
    const types = ['STANDARD', 'BLITZ', 'TOURNAMENT'];
    return types[Number(type)] || 'Unknown';
  };

  return (
    <div className='bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-4'>
      {/* Header - Always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className='w-full p-4 flex items-center justify-between text-left hover:bg-gray-700 transition-colors'
      >
        <div className='flex items-center space-x-3'>
          {getGameStateIcon(game.state)}
          <div>
            <div className='text-base font-medium text-white'>
              Game #{game.gameId || 'Unknown'}
            </div>
            <div className='text-sm text-gray-400'>
              {formatTimestamp(game.gameStartTime)}
            </div>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp size={20} className='text-gray-400' />
        ) : (
          <ChevronDown size={20} className='text-gray-400' />
        )}
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className='px-4 pb-4 space-y-4'>
          {/* Players Section */}
          <div className='space-y-2'>
            <div className='flex items-center text-gray-400 mb-1'>
              <Users size={16} className='mr-2' />
              <span className='text-sm'>Players</span>
            </div>
            {(game.players || []).map((player, index) => (
              <div
                key={player || index}
                className='flex items-center justify-between bg-gray-700 p-2 rounded'
              >
                <div className='text-sm text-gray-300'>Player {index + 1}</div>
                <div className='flex items-center space-x-2'>
                  <span
                    className={`text-sm font-medium ${getScoreColor(index)}`}
                  >
                    {game.scores ? `${game.scores[index]} wins` : '0 wins'}
                  </span>
                  <span className='text-sm text-gray-400'>
                    {formatAddress(player)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Game Details */}
          <div className='grid grid-cols-2 gap-3'>
            <div className='bg-gray-700 p-3 rounded'>
              <div className='flex items-center text-gray-400 mb-1'>
                <Coins size={16} className='mr-2' />
                <span className='text-sm'>Stake</span>
              </div>
              <div className='text-white font-medium'>
                {game.stake ? `${game.stake} ETH` : 'N/A'}
              </div>
            </div>

            <div className='bg-gray-700 p-3 rounded'>
              <div className='flex items-center text-gray-400 mb-1'>
                <Trophy size={16} className='mr-2' />
                <span className='text-sm'>Rounds</span>
              </div>
              <div className='text-white font-medium'>
                {game.roundsPlayed || 0} played
              </div>
            </div>

            <div className='bg-gray-700 p-3 rounded'>
              <div className='flex items-center text-gray-400 mb-1'>
                <Timer size={16} className='mr-2' />
                <span className='text-sm'>Game Type</span>
              </div>
              <div className='text-white font-medium'>
                {getGameTypeString(game.gameType)}
              </div>
            </div>

            <div className='bg-gray-700 p-3 rounded'>
              <div className='flex items-center text-gray-400 mb-1'>
                <Clock size={16} className='mr-2' />
                <span className='text-sm'>Last Move</span>
              </div>
              <div className='text-white font-medium'>
                {formatTimestamp(game.lastMoveTimestamp)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Example usage component with dummy data
const GameHistory = () => {
  const account = useAccount()
  console.log(account.address);
  
  const gamesIdResult = useReadContract({
    abi,
    address: contractAddress,
    functionName: 'getUserGames',
    args: [account.address],
    // account: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  });

    const gamesResult = useReadContract({
      abi,
      address: contractAddress,
      functionName: 'getGamesInfo',
      args: [gamesIdResult.data],
      // account: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    });


console.log(gamesResult.data, 'result here');


  // console.log(result.data);
  

  // Dummy data array
  const dummyGames = [
    {
      gameId: '1',
      players: [
        '0x1234567890abcdef1234567890abcdef12345678',
        '0xabcdef1234567890abcdef1234567890abcdef12',
      ],
      stake: '0.1',
      gameType: 0, // STANDARD
      roundsPlayed: 3,
      scores: [2, 1],
      state: 1, // ACTIVE
      lastMoveTimestamp: Math.floor(Date.now() / 1000) - 300, // 5 minutes ago
      gameStartTime: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago
    },
    {
      gameId: '2',
      players: [
        '0x9876543210fedcba9876543210fedcba98765432',
        '0xfedcba9876543210fedcba9876543210fedcba98',
      ],
      stake: '0.05',
      gameType: 1, // BLITZ
      roundsPlayed: 5,
      scores: [2, 2],
      state: 2, // COMPLETED
      lastMoveTimestamp: Math.floor(Date.now() / 1000) - 7200, // 2 hours ago
      gameStartTime: Math.floor(Date.now() / 1000) - 10800, // 3 hours ago
    },
    {
      gameId: '3',
      players: [
        '0x5555555555555555555555555555555555555555',
        '0x6666666666666666666666666666666666666666',
      ],
      stake: '0.2',
      gameType: 2, // TOURNAMENT
      roundsPlayed: 1,
      scores: [0, 1],
      state: 4, // TIMEOUT
      lastMoveTimestamp: Math.floor(Date.now() / 1000) - 86400, // 1 day ago
      gameStartTime: Math.floor(Date.now() / 1000) - 90000, // 25 hours ago
    },
  ];

  return (
    <div className='p-4 bg-gray-900 min-h-screen'>
      <h1 className='text-xl font-bold text-white mb-6'>Game History</h1>
      <div className='space-y-4'>
        {dummyGames.map((game) => (
          <GameHistoryCard key={game.gameId} game={game} />
        ))}
      </div>
    </div>
  );
};

export default GameHistory;

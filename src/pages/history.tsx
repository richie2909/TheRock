import React, { useState } from 'react';
import {
  Users,
  Swords,
  Trophy,
  ChevronsUpDown,
  Gamepad2,
  Timer,
  CircleDollarSign,
  UserCheck,
  UserX,
  GamepadIcon,
} from 'lucide-react';
import { formatEther } from 'viem';
import { useAccount, useReadContract } from 'wagmi';
import { abi, contractAddress } from '../constants/contractInfo';



const GameHistory = ({ userAddress }) => {
  
  const account = useAccount()

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


  if (!gamesResult.data || gamesResult?.data.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center p-8 text-center'>
        <div className='mb-4 rounded-full bg-gray-800/50 p-4'>
          <GamepadIcon className='h-8 w-8 text-gray-400' />
        </div>
        <h3 className='mb-2 text-lg font-medium text-white'>No Games Found</h3>
        <p className='text-sm text-gray-400'>
          Start a new game to begin your gaming journey!
        </p>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <p>Game History</p>
      {gamesResult?.data.map((game) => (
        <GameHistoryCard
          key={game.gameId.toString()}
          game={game}
          userAddress={account.address}
        />
      ))}
    </div>
  );
};

const GameHistoryCard = ({ game, userAddress }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatAddress = (address) => {
    if (address === userAddress) return 'Me';
    if (address === '0x0000000000000000000000000000000000000000') return null;
    return `${address.slice(0, 4)}...${address.slice(-3)}`;
  };

  const getGameTypeInfo = (type) => {
    switch (Number(type)) {
      case 0:
        return {
          name: 'Quick Match',
          rounds: 1,
          icon: <Gamepad2 className='w-5 h-5 text-emerald-500' />,
        };
      case 1:
        return {
          name: 'Best of Three',
          rounds: 3,
          icon: <Swords className='w-5 h-5 text-blue-500' />,
        };
      case 2:
        return {
          name: 'Championship',
          rounds: 5,
          icon: <Trophy className='w-5 h-5 text-yellow-500' />,
        };
      default:
        return {
          name: 'Unknown',
          rounds: 0,
          icon: <Gamepad2 className='w-5 h-5 text-gray-500' />,
        };
    }
  };

  const gameTypeInfo = getGameTypeInfo(game.gameType);
  const player2Joined =
    game.players[1] !== '0x0000000000000000000000000000000000000000';
  const formattedStake = formatEther(game.stake);

  return (
    <div className='w-full overflow-hidden rounded-lg border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 shadow-lg hover:border-gray-600 transition-all duration-200'>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className='w-full text-left'
      >
        <div className='flex items-center justify-between p-4'>
          <div className='flex items-center space-x-4'>
            <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800'>
              {gameTypeInfo.icon}
            </div>
            <div>
              <div className='flex items-center space-x-2'>
                <h3 className='text-lg font-semibold text-white'>
                  Game #{game.gameId.toString()}
                </h3>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    game.isActive
                      ? 'bg-green-900/50 text-green-400'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {game.isActive ? 'Active' : 'Completed'}
                </span>
              </div>
              <p className='text-sm text-gray-400'>
                {gameTypeInfo.name} • {formattedStake} ETH Stake
              </p>
            </div>
          </div>
          <ChevronsUpDown
            className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
              isExpanded ? 'rotate-180 transform' : ''
            }`}
          />
        </div>
      </button>

      {isExpanded && (
        <div className='px-4 pb-4 space-y-6'>
          {/* Players Section */}
          <div className='space-y-3'>
            <div className='flex items-center text-gray-400'>
              <Users className='mr-2 h-4 w-4' />
              <span className='text-sm font-medium'>Players</span>
            </div>

            <div className='rounded-lg bg-gray-800/50 p-4'>
              {/* Player 1 */}
              <div className='mb-3 flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                  <UserCheck className='h-4 w-4 text-green-500' />
                  <span className='text-sm text-gray-300'>
                    {formatAddress(game.players[0])}
                  </span>
                </div>
                <span className='font-medium text-green-500'>
                  {game.scores[0]} wins
                </span>
              </div>

              {/* VS Divider */}
              <div className='my-2 flex items-center justify-center'>
                <div className='rounded-full bg-gray-700 px-4 py-1 text-xs text-gray-400'>
                  VS
                </div>
              </div>

              {/* Player 2 */}
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                  {player2Joined ? (
                    <UserCheck className='h-4 w-4 text-green-500' />
                  ) : (
                    <UserX className='h-4 w-4 text-yellow-500' />
                  )}
                  <span className='text-sm text-gray-300'>
                    {player2Joined
                      ? formatAddress(game.players[1])
                      : 'Waiting for player...'}
                  </span>
                </div>
                <span className='font-medium text-green-500'>
                  {game.scores[1]} wins
                </span>
              </div>
            </div>
          </div>

          {/* Game Stats */}
          <div className='grid grid-cols-3 gap-4'>
            <div className='rounded-lg bg-gray-800/50 p-3'>
              <div className='mb-1 flex items-center text-gray-400'>
                <Timer className='mr-2 h-4 w-4' />
                <span className='text-xs'>Progress</span>
              </div>
              <div className='font-medium text-white'>
                {game.roundsPlayed} / {gameTypeInfo.rounds} rounds
              </div>
            </div>

            <div className='rounded-lg bg-gray-800/50 p-3'>
              <div className='mb-1 flex items-center text-gray-400'>
                <CircleDollarSign className='mr-2 h-4 w-4' />
                <span className='text-xs'>Total Stake</span>
              </div>
              <div className='font-medium text-white'>{formattedStake} ETH</div>
            </div>

            <div className='rounded-lg bg-gray-800/50 p-3'>
              <div className='mb-1 flex items-center text-gray-400'>
                <Trophy className='mr-2 h-4 w-4' />
                <span className='text-xs'>Game Type</span>
              </div>
              <div className='font-medium text-white'>{gameTypeInfo.name}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameHistory;

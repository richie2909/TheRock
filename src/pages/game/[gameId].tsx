'use client';

// import React, { useState, useEffect } from 'react';
// import {
//   Hand,
//   Scissors,
//   Layers,
//   CheckCircle,
//   Timer,
//   AlertCircle,
// } from 'lucide-react';
// import toast from 'react-hot-toast';
// import { useRouter } from 'next/router' // Import useRouter

// const GameInterface = ({
//   onMakeMove,
//   gameDetails,
//   isConnected = false,
//   userAddress = '',
//   onConnect,
// }) => {
//   const [selectedMove, setSelectedMove] = useState(null);
//   const [gameStatus, setGameStatus] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const router = useRouter();
//     const { gameId } = router.query;

//   useEffect(() => {
//     if (gameDetails) {
//       setGameStatus(gameDetails.isActive ? 'Active' : 'Inactive');
//       // Reset move if game becomes inactive
//       if (!gameDetails.isActive) {
//         setSelectedMove(null);
//       }
//     }
//   }, [gameDetails]);

//   const handleMoveSelection = async (choice) => {
//     try {
//       setIsSubmitting(true);
//       await onMakeMove(gameId, choice);
//       setSelectedMove(choice);
//       toast.success(`Move submitted: ${choice}`);
//     } catch (err) {
//       toast.error('Failed to submit move. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const isPlayerTurn =
//     gameDetails?.isActive &&
//     gameDetails.players.includes(userAddress) &&
//     !selectedMove;

//   const getMoveButton = (moveName, Icon, color) => (
//     <button
//       onClick={() => handleMoveSelection(moveName)}
//       disabled={!isPlayerTurn || isSubmitting}
//       className={`
//         flex items-center justify-center p-4 rounded-lg
//         ${selectedMove === moveName ? `bg-${color}-500` : 'bg-gray-700'}
//         ${
//           isPlayerTurn
//             ? `hover:bg-${color}-500`
//             : 'opacity-50 cursor-not-allowed'
//         }
//         transition duration-200 ease-in-out transform hover:scale-105
//         disabled:opacity-50 disabled:cursor-not-allowed
//       `}
//     >
//       <Icon size={36} className='mr-2' />
//       <span className='text-lg font-medium'>{moveName}</span>
//     </button>
//   );

//   const getGameStatusColor = () => {
//     if (!gameDetails?.isActive) return 'text-red-500';
//     if (selectedMove) return 'text-yellow-500';
//     return 'text-green-500';
//   };

//   return (
//     <div className='flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4'>
//       <div className='w-full max-w-lg bg-gray-800 rounded-lg shadow-xl p-6'>
//         {/* Header */}
//         <div className='text-center mb-6'>
//           <h1 className='text-2xl font-bold mb-4'>Rock Paper Scissors</h1>
//           <div className='flex justify-between items-center'>
//             <span className='text-sm opacity-75'>Game #{gameId}</span>
//             <span className={`flex items-center ${getGameStatusColor()}`}>
//               {gameDetails?.isActive ? (
//                 <Timer className='mr-2' />
//               ) : (
//                 <AlertCircle className='mr-2' />
//               )}
//               {gameStatus}
//             </span>
//           </div>
//         </div>

//         {/* Game Details */}
//         <div className='space-y-4 mb-8'>
//           <div className='flex justify-between items-center p-3 bg-gray-700 rounded-lg'>
//             <span>Stake</span>
//             <span className='font-bold'>{gameDetails?.stake} ETH</span>
//           </div>

//           <div className='flex flex-col gap-4'>
//             <div className='p-3 bg-gray-700 rounded-lg'>
//               <div className='text-sm opacity-75'>Player 1</div>
//               <div className='truncate'>{gameDetails?.players[0] || '...'}</div>
//             </div>
//             <div className='p-3 bg-gray-700 rounded-lg'>
//               <div className='text-sm opacity-75'>Player 2</div>
//               <div className='truncate'>
//                 {gameDetails?.players[1] || 'Waiting...'}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Move Selection */}
//         <div className='flex flex-col sm:flex-row justify-around gap-4 mb-8'>
//           {getMoveButton('Rock', Hand, 'blue')}
//           {getMoveButton('Paper', Layers, 'yellow')}
//           {getMoveButton('Scissors', Scissors, 'red')}
//         </div>

//         {/* Move Confirmation */}
//         {selectedMove && (
//           <div className='flex items-center justify-center gap-2 mt-4'>
//             <CheckCircle className='text-green-500' />
//             <span className='text-lg font-medium'>
//               Move submitted: {selectedMove}
//             </span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GameInterface;

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { formatEther } from 'viem';
import {
  Hand,
  Scissors,
  File,
  Trophy,
  Timer,
  AlertCircle,
  Gamepad2,
  Swords,
  Users,
  Coins,
  ArrowLeftRight,
  CheckCircle2,
  Circle,
  Crown,
  GamepadIcon,
  CircleDot,
} from 'lucide-react';
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { abi, contractAddress } from '../../constants/contractInfo';
import { extractErrorMessages } from '../../utils';
import toast from 'react-hot-toast';

const GameInterface = ({ onMakeMove }) => {
  const router = useRouter();
  const account = useAccount();
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

  const { gameId } = router.query;
  const proofedGamedId = Number(gameId) || 0;

  const gamesIdResult = useReadContract({
    abi,
    address: contractAddress,
    functionName: 'getGameById',
    args: [BigInt(Number(proofedGamedId))],
    // account: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  });

  console.log(gamesIdResult.data);

  const pending = isPending || isConfirming;

  const [selectedMove, setSelectedMove] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [playerMove, setPlayerMove] = useState();
  const gameDetails = gamesIdResult.data;
  const userAddress = account.address;


  const handleMakeMove = async()=>{
    try {
        await writeContract({
          address: contractAddress,
          abi,
          functionName: 'makeMove',
          args: [BigInt(proofedGamedId), playerMove],
        });
    } catch (error) {
      console.log(error);
      
    }
  }


  useEffect(()=>{
    console.log('rerendering player move', playerMove);
    
  },[playerMove])


      React.useEffect(() => {
      if (isConfirmed) {
        toast.success('Game created successfully! 🎮', {
          duration: 3000,
          icon: '🎉',
        });
      }
    }, [isConfirmed]);

    React.useEffect(() => {
      if (error) {
        toast.error(extractErrorMessages(error?.message), {
          duration: 3000,
          icon: '🎉',
        });
        console.log(error);
        
        // Reset form
        // setSelectedType(0);
        // setStakeAmount('');
      }
    }, [error]);

  console.log({ gameDetails });
  console.log({ proofedGamedId });

  // Early return for inactive games
  if (!gameDetails?.isActive) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[400px] bg-slate-900 text-white p-6'>
        <div className='bg-slate-800/50 p-8 rounded-2xl shadow-xl backdrop-blur-sm flex flex-col items-center max-w-md w-full'>
          <div className='bg-red-500/10 p-4 rounded-full mb-4'>
            <AlertCircle className='w-12 h-12 text-red-500' />
          </div>
          <h2 className='text-2xl font-bold mb-3'>Game Ended</h2>
          <p className='text-slate-400 text-center mb-6'>
            This game has concluded or is no longer active
          </p>
          <button
            onClick={() => router.push('/games')}
            className='flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors'
          >
            <GamepadIcon className='w-5 h-5' />
            <span>Find New Games</span>
          </button>
        </div>
      </div>
    );
  }

  // Early return for non-players
  if (!gameDetails.players.includes(userAddress)) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[400px] bg-slate-900 text-white p-6'>
        <div className='bg-slate-800/50 p-8 rounded-2xl shadow-xl backdrop-blur-sm flex flex-col items-center max-w-md w-full'>
          <div className='bg-yellow-500/10 p-4 rounded-full mb-4'>
            <Users className='w-12 h-12 text-yellow-500' />
          </div>
          <h2 className='text-2xl font-bold mb-3'>Not a Player</h2>
          <p className='text-slate-400 text-center mb-6'>
            You are not participating in this game
          </p>
          <button
            onClick={() => router.push('/games')}
            className='flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors'
          >
            <ArrowLeftRight className='w-5 h-5' />
            <span>Browse Games</span>
          </button>
        </div>
      </div>
    );
  }

  // Early return for waiting for players
  if (
    gameDetails.players.includes('0x0000000000000000000000000000000000000000')
  ) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[400px] bg-slate-900 text-white p-6'>
        <div className='bg-slate-800/50 p-8 rounded-2xl shadow-xl backdrop-blur-sm flex flex-col items-center max-w-md w-full'>
          <div className='bg-blue-500/10 p-4 rounded-full mb-4 animate-pulse'>
            <Timer className='w-12 h-12 text-blue-500' />
          </div>
          <h2 className='text-2xl font-bold mb-3'>Waiting for Opponent</h2>
          <p className='text-slate-400 text-center'>
            Another player needs to join before the game can begin
          </p>
        </div>
      </div>
    );
  }

  const formatAddress = (address) => {
    if (address === userAddress) return 'Me';
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const getGameTypeInfo = (type) => {
    switch (Number(type)) {
      case 0:
        return {
          name: 'Quick Match',
          rounds: 1,
          icon: <Gamepad2 className='h-6 w-6 text-emerald-500' />,
          bgColor: 'bg-emerald-500/10',
        };
      case 1:
        return {
          name: 'Best of Three',
          rounds: 3,
          icon: <Swords className='h-6 w-6 text-blue-500' />,
          bgColor: 'bg-blue-500/10',
        };
      case 2:
        return {
          name: 'Championship',
          rounds: 5,
          icon: <Crown className='h-6 w-6 text-yellow-500' />,
          bgColor: 'bg-yellow-500/10',
        };
      default:
        return {
          name: 'Unknown',
          rounds: 0,
          icon: <CircleDot className='h-6 w-6 text-gray-500' />,
          bgColor: 'bg-gray-500/10',
        };
    }
  };

  const handleMoveSelection = async (choice) => {
    try {
      // setIsSubmitting(true);
      console.log('Choice type:', typeof choice);
      console.log('Choice:', choice);

      // Mapping choices to player moves
      const moveMapping = {
        Rock: 1,
        Paper: 2,
        Scissors: 3,
      };

      setPlayerMove(moveMapping[choice]);
      
    } catch (error) {
      console.error('Move submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const gameType = getGameTypeInfo(gameDetails.gameType);
  const isPlayerTurn = !selectedMove;

  const getMoveButton = (moveName, Icon, color) => (
    <button
      onClick={() => handleMoveSelection(moveName)}
      disabled={!isPlayerTurn || isSubmitting}
      className={`
        relative flex flex-col items-center justify-center p-6 rounded-xl
        ${
          selectedMove === moveName
            ? `${color.bg} ${color.text}`
            : 'bg-slate-800 hover:bg-slate-700'
        }
        ${isPlayerTurn ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}
        transition-all duration-200 ease-out
        disabled:opacity-50 disabled:cursor-not-allowed
        group
      `}
    >
      <div
        className={`
        p-3 rounded-lg mb-2
        ${
          selectedMove === moveName
            ? color.iconBg
            : 'bg-slate-700 group-hover:bg-slate-600'
        }
        transition-colors
      `}
      >
        <Icon
          size={32}
          className={selectedMove === moveName ? color.text : 'text-white'}
        />
      </div>
      <span className='text-lg font-medium'>{moveName}</span>
    </button>
  );

  const moveColors = {
    Rock: {
      bg: 'bg-blue-500/20',
      text: 'text-blue-500',
      iconBg: 'bg-blue-500/20',
    },
    Paper: {
      bg: 'bg-yellow-500/20',
      text: 'text-yellow-500',
      iconBg: 'bg-yellow-500/20',
    },
    Scissors: {
      bg: 'bg-red-500/20',
      text: 'text-red-500',
      iconBg: 'bg-red-500/20',
    },
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4'>
      <div className='w-full max-w-xl bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-6'>
        {/* Header */}
        <div className='text-center mb-8'>
          <div className='flex items-center justify-center gap-3 mb-4'>
            <div className={`p-2 rounded-lg ${gameType.bgColor}`}>
              {gameType.icon}
            </div>
            <h1 className='text-2xl font-bold'>{gameType.name}</h1>
          </div>

          <div className='flex justify-between items-center px-4 py-2 bg-slate-800 rounded-xl'>
            <div className='flex items-center gap-2'>
              <Trophy className='w-5 h-5 text-indigo-400' />
              <span>Game #{Number(gameDetails.gameId)}</span>
            </div>
            <div className='flex items-center gap-2'>
              <Circle
                className={
                  gameDetails.isActive
                    ? 'w-4 h-4 text-green-500'
                    : 'w-4 h-4 text-red-500'
                }
              />
              <span className='text-sm'>
                Round {gameDetails.roundsPlayed + 1}/{gameType.rounds}
              </span>
            </div>
          </div>
        </div>

        {/* Game Info */}
        <div className='space-y-4 mb-8'>
          <div className='flex items-center justify-between p-4 bg-slate-800 rounded-xl'>
            <div className='flex items-center gap-2'>
              <Coins className='w-5 h-5 text-yellow-500' />
              <span>Stake</span>
            </div>
            <span className='font-bold text-yellow-500'>
              {formatEther(gameDetails.stake)} ETH
            </span>
          </div>

          {gameDetails.players.map((player, index) => (
            <div
              key={player}
              className={`p-4 rounded-xl ${
                player === userAddress
                  ? 'bg-indigo-500/10 border border-indigo-500/20'
                  : 'bg-slate-800'
              }`}
            >
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-3'>
                  <div
                    className={`p-2 rounded-lg ${
                      player === userAddress
                        ? 'bg-indigo-500/20'
                        : 'bg-slate-700'
                    }`}
                  >
                    <Users
                      className={`w-5 h-5 ${
                        player === userAddress
                          ? 'text-indigo-500'
                          : 'text-slate-400'
                      }`}
                    />
                  </div>
                  <div>
                    <div className='text-sm text-slate-400'>
                      Player {index + 1}
                    </div>
                    <div className='font-medium'>{formatAddress(player)}</div>
                  </div>
                </div>
                <div className='text-2xl font-bold'>
                  {gameDetails.scores[index]}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Moves */}
        <div className='grid grid-cols-3 gap-4 mb-6'>
          {getMoveButton('Rock', Hand, moveColors.Rock)}
          {getMoveButton('Paper', File, moveColors.Paper)}
          {getMoveButton('Scissors', Scissors, moveColors.Scissors)}
        </div>

        {/* Move Confirmation */}
        {/* {true && (
          <div className='flex items-center justify-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl'>
            <CheckCircle2 className='w-6 h-6 text-green-500' />
            <span className='text-lg font-medium text-green-500'>
              Move submitted: {selectedMove}
            </span>
          </div>
        )} */}

        {playerMove && (
          <button
            onClick={handleMakeMove}
            disabled={pending}
            className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center space-x-2
          ${
            !playerMove
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90'
          }
        `}
          >
            {pending ? (
              <div className='w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin' />
            ) : (
              <>
                <CheckCircle2 className='w-5 h-5' />
                <span>Make move</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default GameInterface;

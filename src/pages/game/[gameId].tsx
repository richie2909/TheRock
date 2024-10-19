// import React, { useState, useEffect } from 'react';
// import {
//   Hand,
//   Scissors,
//   Layers,
//   CheckCircle,
//   Timer,
//   AlertCircle,
// } from 'lucide-react';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// const GameInterface = ({
//   onMakeMove,
//   gameDetails,
//   gameId,
//   isConnected = false,
//   userAddress = '',
//   onConnect,
// }) => {
//   const [selectedMove, setSelectedMove] = useState(null);
//   const [gameStatus, setGameStatus] = useState('');
//   const [error, setError] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

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
//       setError('');
//       setIsSubmitting(true);
//       await onMakeMove(gameId, choice);
//       setSelectedMove(choice);
//     } catch (err) {
//       setError('Failed to submit move. Please try again.');
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
//       <Card className='w-full max-w-lg bg-gray-800'>
//         <CardHeader>
//           <CardTitle className='text-center text-2xl'>
//             Rock Paper Scissors
//           </CardTitle>
//           <div className='flex justify-between items-center mt-2'>
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
//         </CardHeader>

//         <CardContent>
//           {/* Game Details */}
//           <div className='space-y-4 mb-8'>
//             <div className='flex justify-between items-center p-3 bg-gray-700 rounded-lg'>
//               <span>Stake</span>
//               <span className='font-bold'>{gameDetails?.stake} ETH</span>
//             </div>

//             <div className='grid grid-cols-2 gap-4'>
//               <div className='p-3 bg-gray-700 rounded-lg'>
//                 <div className='text-sm opacity-75'>Player 1</div>
//                 <div className='truncate'>
//                   {gameDetails?.players[0] || '...'}
//                 </div>
//               </div>
//               <div className='p-3 bg-gray-700 rounded-lg'>
//                 <div className='text-sm opacity-75'>Player 2</div>
//                 <div className='truncate'>
//                   {gameDetails?.players[1] || 'Waiting...'}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Move Selection */}
//           <div className='flex flex-col sm:flex-row justify-around gap-4 mb-8'>
//             {getMoveButton('Rock', Hand, 'blue')}
//             {getMoveButton('Paper', Layers, 'yellow')}
//             {getMoveButton('Scissors', Scissors, 'red')}
//           </div>

//           {/* Status Messages */}
//           {error && (
//             <Alert variant='destructive'>
//               <AlertDescription>{error}</AlertDescription>
//             </Alert>
//           )}

//           {selectedMove && (
//             <div className='flex items-center justify-center gap-2 mt-4'>
//               <CheckCircle className='text-green-500' />
//               <span className='text-lg font-medium'>
//                 Move submitted: {selectedMove}
//               </span>
//             </div>
//           )}

//           {!isConnected && (
//             <Alert variant='warning' className='mt-4'>
//               <AlertDescription>
//                 <button
//                   onClick={onConnect}
//                   className='text-blue-500 hover:text-blue-400 underline'
//                 >
//                   Connect your wallet
//                 </button>{' '}
//                 to participate in the game.
//               </AlertDescription>
//             </Alert>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default GameInterface;

import React, { useState, useEffect } from 'react';
import {
  Hand,
  Scissors,
  Layers,
  CheckCircle,
  Timer,
  AlertCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';

const GameInterface = ({
  onMakeMove,
  gameDetails,
  gameId,
  isConnected = false,
  userAddress = '',
  onConnect,
}) => {
  const [selectedMove, setSelectedMove] = useState(null);
  const [gameStatus, setGameStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (gameDetails) {
      setGameStatus(gameDetails.isActive ? 'Active' : 'Inactive');
      // Reset move if game becomes inactive
      if (!gameDetails.isActive) {
        setSelectedMove(null);
      }
    }
  }, [gameDetails]);

  const handleMoveSelection = async (choice) => {
    try {
      setIsSubmitting(true);
      await onMakeMove(gameId, choice);
      setSelectedMove(choice);
      toast.success(`Move submitted: ${choice}`);
    } catch (err) {
      toast.error('Failed to submit move. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isPlayerTurn =
    gameDetails?.isActive &&
    gameDetails.players.includes(userAddress) &&
    !selectedMove;

  const getMoveButton = (moveName, Icon, color) => (
    <button
      onClick={() => handleMoveSelection(moveName)}
      disabled={!isPlayerTurn || isSubmitting}
      className={`
        flex items-center justify-center p-4 rounded-lg
        ${selectedMove === moveName ? `bg-${color}-500` : 'bg-gray-700'}
        ${
          isPlayerTurn
            ? `hover:bg-${color}-500`
            : 'opacity-50 cursor-not-allowed'
        }
        transition duration-200 ease-in-out transform hover:scale-105
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      <Icon size={36} className='mr-2' />
      <span className='text-lg font-medium'>{moveName}</span>
    </button>
  );

  const getGameStatusColor = () => {
    if (!gameDetails?.isActive) return 'text-red-500';
    if (selectedMove) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4'>
      <div className='w-full max-w-lg bg-gray-800 rounded-lg shadow-xl p-6'>
        {/* Header */}
        <div className='text-center mb-6'>
          <h1 className='text-2xl font-bold mb-4'>Rock Paper Scissors</h1>
          <div className='flex justify-between items-center'>
            <span className='text-sm opacity-75'>Game #{gameId}</span>
            <span className={`flex items-center ${getGameStatusColor()}`}>
              {gameDetails?.isActive ? (
                <Timer className='mr-2' />
              ) : (
                <AlertCircle className='mr-2' />
              )}
              {gameStatus}
            </span>
          </div>
        </div>

        {/* Game Details */}
        <div className='space-y-4 mb-8'>
          <div className='flex justify-between items-center p-3 bg-gray-700 rounded-lg'>
            <span>Stake</span>
            <span className='font-bold'>{gameDetails?.stake} ETH</span>
          </div>

          <div className='flex flex-col gap-4'>
            <div className='p-3 bg-gray-700 rounded-lg'>
              <div className='text-sm opacity-75'>Player 1</div>
              <div className='truncate'>{gameDetails?.players[0] || '...'}</div>
            </div>
            <div className='p-3 bg-gray-700 rounded-lg'>
              <div className='text-sm opacity-75'>Player 2</div>
              <div className='truncate'>
                {gameDetails?.players[1] || 'Waiting...'}
              </div>
            </div>
          </div>
        </div>

        {/* Move Selection */}
        <div className='flex flex-col sm:flex-row justify-around gap-4 mb-8'>
          {getMoveButton('Rock', Hand, 'blue')}
          {getMoveButton('Paper', Layers, 'yellow')}
          {getMoveButton('Scissors', Scissors, 'red')}
        </div>

        {/* Move Confirmation */}
        {selectedMove && (
          <div className='flex items-center justify-center gap-2 mt-4'>
            <CheckCircle className='text-green-500' />
            <span className='text-lg font-medium'>
              Move submitted: {selectedMove}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameInterface;

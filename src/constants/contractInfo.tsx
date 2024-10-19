// export const contractAddress = "0x2a7F1765A8Dc331be619145d312acF0198c91525";

// export const contractAbi = [
//   {
//     inputs: [
//       {
//         internalType: "enum RockPaperScissors.GameType",
//         name: "_gameType",
//         type: "uint8",
//       },
//     ],
//     name: "createGame",
//     outputs: [],
//     stateMutability: "payable",
//     type: "function",
//   },
//   {
//     inputs: [],
//     stateMutability: "nonpayable",
//     type: "constructor",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: "bytes32",
//         name: "gameId",
//         type: "bytes32",
//       },
//       {
//         indexed: false,
//         internalType: "address",
//         name: "player1",
//         type: "address",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "stake",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "enum RockPaperScissors.GameType",
//         name: "gameType",
//         type: "uint8",
//       },
//     ],
//     name: "GameCreated",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: "bytes32",
//         name: "gameId",
//         type: "bytes32",
//       },
//       {
//         indexed: false,
//         internalType: "address",
//         name: "winner",
//         type: "address",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "payout",
//         type: "uint256",
//       },
//     ],
//     name: "GameEnded",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: "bytes32",
//         name: "gameId",
//         type: "bytes32",
//       },
//       {
//         indexed: false,
//         internalType: "address",
//         name: "player2",
//         type: "address",
//       },
//     ],
//     name: "GameJoined",
//     type: "event",
//   },
//   {
//     inputs: [
//       {
//         internalType: "bytes32",
//         name: "_gameId",
//         type: "bytes32",
//       },
//     ],
//     name: "joinGame",
//     outputs: [],
//     stateMutability: "payable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "bytes32",
//         name: "_gameId",
//         type: "bytes32",
//       },
//       {
//         internalType: "enum RockPaperScissors.Choice",
//         name: "_choice",
//         type: "uint8",
//       },
//     ],
//     name: "playRound",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: "bytes32",
//         name: "gameId",
//         type: "bytes32",
//       },
//       {
//         indexed: false,
//         internalType: "uint8",
//         name: "roundNumber",
//         type: "uint8",
//       },
//       {
//         indexed: false,
//         internalType: "enum RockPaperScissors.Choice",
//         name: "player1Choice",
//         type: "uint8",
//       },
//       {
//         indexed: false,
//         internalType: "enum RockPaperScissors.Choice",
//         name: "player2Choice",
//         type: "uint8",
//       },
//     ],
//     name: "RoundPlayed",
//     type: "event",
//   },
//   {
//     inputs: [],
//     name: "creatorFee",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "bytes32",
//         name: "",
//         type: "bytes32",
//       },
//     ],
//     name: "games",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "stake",
//         type: "uint256",
//       },
//       {
//         internalType: "enum RockPaperScissors.GameType",
//         name: "gameType",
//         type: "uint8",
//       },
//       {
//         internalType: "uint8",
//         name: "roundsPlayed",
//         type: "uint8",
//       },
//       {
//         internalType: "bool",
//         name: "isActive",
//         type: "bool",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "bytes32",
//         name: "_gameId",
//         type: "bytes32",
//       },
//     ],
//     name: "getGameState",
//     outputs: [
//       {
//         internalType: "address[2]",
//         name: "players",
//         type: "address[2]",
//       },
//       {
//         internalType: "uint256",
//         name: "stake",
//         type: "uint256",
//       },
//       {
//         internalType: "enum RockPaperScissors.GameType",
//         name: "gameType",
//         type: "uint8",
//       },
//       {
//         internalType: "uint8",
//         name: "roundsPlayed",
//         type: "uint8",
//       },
//       {
//         internalType: "uint8[2]",
//         name: "scores",
//         type: "uint8[2]",
//       },
//       {
//         internalType: "bool",
//         name: "isActive",
//         type: "bool",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "owner",
//     outputs: [
//       {
//         internalType: "address",
//         name: "",
//         type: "address",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
// ];

export const contractAddress = '0x7EA6b145DF6D7B66cD7E376196b699e4ED5A5269';

export const abi = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'AddressInsufficientBalance',
    type: 'error',
  },
  { inputs: [], name: 'FailedInnerCall', type: 'error' },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'OwnableInvalidOwner',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
    type: 'error',
  },
  { inputs: [], name: 'ReentrancyGuardReentrantCall', type: 'error' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'gameId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'player1',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'stake',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum RockPaperScissors.GameType',
        name: 'gameType',
        type: 'uint8',
      },
    ],
    name: 'GameCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'gameId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'winner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'payout',
        type: 'uint256',
      },
    ],
    name: 'GameEnded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'gameId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'player2',
        type: 'address',
      },
    ],
    name: 'GameJoined',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'gameId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'roundNumber',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'enum RockPaperScissors.Choice',
        name: 'player1Choice',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'enum RockPaperScissors.Choice',
        name: 'player2Choice',
        type: 'uint8',
      },
    ],
    name: 'RoundPlayed',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'enum RockPaperScissors.GameType',
        name: '_gameType',
        type: 'uint8',
      },
    ],
    name: 'createGame',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'creatorFee',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'games',
    outputs: [
      { internalType: 'uint256', name: 'gameId', type: 'uint256' },
      { internalType: 'uint256', name: 'stake', type: 'uint256' },
      {
        internalType: 'enum RockPaperScissors.GameType',
        name: 'gameType',
        type: 'uint8',
      },
      { internalType: 'uint8', name: 'roundsPlayed', type: 'uint8' },
      { internalType: 'bool', name: 'isActive', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256[]', name: 'gameIds', type: 'uint256[]' }],
    name: 'getGamesInfo',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'gameId', type: 'uint256' },
          { internalType: 'address[2]', name: 'players', type: 'address[2]' },
          { internalType: 'uint256', name: 'stake', type: 'uint256' },
          { internalType: 'uint8', name: 'gameType', type: 'uint8' },
          { internalType: 'uint8', name: 'roundsPlayed', type: 'uint8' },
          { internalType: 'uint8[2]', name: 'scores', type: 'uint8[2]' },
          { internalType: 'uint8[2]', name: 'choices', type: 'uint8[2]' },
          { internalType: 'bool', name: 'isActive', type: 'bool' },
        ],
        internalType: 'struct RockPaperScissors.GameView[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_user', type: 'address' }],
    name: 'getUserGames',
    outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_gameId', type: 'uint256' }],
    name: 'joinGame',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_gameId', type: 'uint256' },
      {
        internalType: 'enum RockPaperScissors.Choice',
        name: '_choice',
        type: 'uint8',
      },
    ],
    name: 'makeMove',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'uint256', name: '', type: 'uint256' },
    ],
    name: 'userGames',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];
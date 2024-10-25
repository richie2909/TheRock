# Rock-Paper-Scissors on Ethereum

This is a decentralized Rock-Paper-Scissors game built on the Ethereum Sepolia network. The application allows users to create and join games, track their move history, and view past game results, all while ensuring transparency and fairness through blockchain technology.

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [Architecture](#architecture)
- [Team Information](#team-information)
- [License](#license)

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/rockpaperscissors.git
   cd rockpaperscissors
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Features

- **Home Page**: Provides an overview of the game and a button to navigate to the game tab.
- **Game Tab**: 
  - **Create Game**: Users can create a game by selecting the game type (Quick Match, Best of Three, Championship) and setting a stake in Sepolia ETH.
  - **Join Game**: Users can search for existing games using a game ID and join if there is an available slot.
- **Real-Time Gameplay**: Players are notified of their opponent's moves, and results are displayed only after both players have made their moves.
- **History Tab**: Users can view their past games and move history for transparency.

## Architecture

The application is structured as follows:

- **Frontend**: Built with Next.js, utilizing React for the UI and Wagmi for Ethereum interactions.
- **Smart Contracts**: The game logic is implemented in Solidity, ensuring secure and transparent gameplay.
- **Blockchain**: All game states and transactions are recorded on the Ethereum Sepolia network.

### Key Components

- **Smart Contract**: `rockpaperscissors.sol` - Contains the game logic, including game creation, joining, and move handling.
- **Frontend Pages**: 
  - `src/pages/index.tsx`: Home page.
  - `src/pages/game.tsx`: Game creation and joining interface.
  - `src/pages/history.tsx`: Displays the user's game history.
- **Components**: 
  - `CreateGame.tsx`: UI for creating a game.
  - `JoinGame.tsx`: UI for joining a game.
  - `GameInterface.tsx`: Displays the game in progress.

## Team Information

- **Yinkatotti**: Solidity Developer  
  Yinkatotti is responsible for developing the smart contracts that power the rock-paper-scissors game, ensuring secure and efficient game logic.

- **Ayoashy**: Frontend Engineer  
  Ayoashy focuses on building the user interface of the application, creating an engaging and intuitive experience for players.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
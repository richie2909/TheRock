// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract RockPaperScissors {
    address public owner;
    uint256 public creatorFee = 25; // 0.25% fee

    enum Choice { None, Rock, Paper, Scissors }
    enum GameType { OneRound, BestOfThree, BestOfFive }

    struct Game {
        address[2] players;
        uint256 stake;
        GameType gameType;
        // okay this makes sense after going through the contract
        uint8 roundsPlayed;
        uint8[2] scores;
        // is this a good design pattern
        Choice[2] choices;
        bool isActive;
    }

    mapping(bytes32 => Game) public games;

    event GameCreated(bytes32 gameId, address player1, uint256 stake, GameType gameType);
    event GameJoined(bytes32 gameId, address player2);
    event RoundPlayed(bytes32 gameId, uint8 roundNumber, Choice player1Choice, Choice player2Choice);
    event GameEnded(bytes32 gameId, address winner, uint256 payout);

    constructor() {
        owner = msg.sender;
    }

    function createGame(GameType _gameType) external payable {
        // is msg.value the stake or fee?
        require(msg.value > 0, "Stake must be greater than 0");
        
        bytes32 gameId = keccak256(abi.encodePacked(msg.sender, block.timestamp));
        games[gameId] = Game({
            players: [msg.sender, address(0)],
            stake: msg.value,
            gameType: _gameType,
            roundsPlayed: 0,
            scores: [0, 0],
            choices: [Choice.None, Choice.None],
            isActive: true
        });

        emit GameCreated(gameId, msg.sender, msg.value, _gameType);
    }

    function joinGame(bytes32 _gameId) external payable {
        Game storage game = games[_gameId];
        require(game.isActive, "Game is not active");
        require(game.players[1] == address(0), "Game is full");
        require(msg.value == game.stake, "Incorrect stake amount");

        game.players[1] = msg.sender;
        emit GameJoined(_gameId, msg.sender);
    }

    function playRound(bytes32 _gameId, Choice _choice) external {
        Game storage game = games[_gameId];
        require(game.isActive, "Game is not active");
        require(_choice == Choice.Rock || _choice == Choice.Paper || _choice == Choice.Scissors, "Invalid choice");

        uint8 playerIndex = game.players[0] == msg.sender ? 0 : 1;
        require(game.players[playerIndex] == msg.sender, "Not a player in this game");
        // possible bug - user can detect their opponent move. okay this is for the player trying to ensure they do not change their initial choice
        require(game.choices[playerIndex] == Choice.None, "Choice already made");

        game.choices[playerIndex] = _choice;

        if (game.choices[0] != Choice.None && game.choices[1] != Choice.None) {
            _resolveRound(_gameId);
        }

        // is this function checking for gameType?

        // does this function cater to the fact that a player can make a move when the other user is not online

        //is there a check whether the other player has made a move?
    }

    function _resolveRound(bytes32 _gameId) private {
        Game storage game = games[_gameId];
        Choice player1Choice = game.choices[0];
        Choice player2Choice = game.choices[1];

        // they should be a check if the two players have both played before emitting the RoundPlayed event

        //some actions should take place if either of the player is yet to play

        emit RoundPlayed(_gameId, game.roundsPlayed + 1, player1Choice, player2Choice);

        if (player1Choice == player2Choice) {
            // Tie, no points awarded
        } else if (
            (player1Choice == Choice.Rock && player2Choice == Choice.Scissors) ||
            (player1Choice == Choice.Paper && player2Choice == Choice.Rock) ||
            (player1Choice == Choice.Scissors && player2Choice == Choice.Paper)
        ) {
            game.scores[0]++;
        } else {
            game.scores[1]++;
        }

        game.roundsPlayed++;
        game.choices = [Choice.None, Choice.None];

        if (_isGameOver(game)) {
            _endGame(_gameId);
        }
    }

    function _isGameOver(Game storage game) private view returns (bool) {
        if (game.gameType == GameType.OneRound) {
            return game.roundsPlayed == 1;
        } else if (game.gameType == GameType.BestOfThree) {
            return game.roundsPlayed == 3 || game.scores[0] == 2 || game.scores[1] == 2;
        } else { // BestOfFive
            return game.roundsPlayed == 5 || game.scores[0] == 3 || game.scores[1] == 3;
        }
    }

    function _endGame(bytes32 _gameId) private {
        Game storage game = games[_gameId];
        address winner;
        uint256 payout;

        if (game.scores[0] > game.scores[1]) {
            winner = game.players[0];
        } else if (game.scores[1] > game.scores[0]) {
            winner = game.players[1];
        } else {
            // In case of a tie, return stakes to both players
            payable(game.players[0]).transfer(game.stake);
            payable(game.players[1]).transfer(game.stake);
            game.isActive = false;
            emit GameEnded(_gameId, address(0), 0);
            return;
        }

// hmm fee taking when game ends
        payout = (game.stake * 2 * (10000 - creatorFee)) / 10000;
        uint256 fee = (game.stake * 2) - payout;

// is this not susceptible  to reentrancy? can we make use of safeTransfer here?
        payable(winner).transfer(payout);
        payable(owner).transfer(fee);

        game.isActive = false;
        emit GameEnded(_gameId, winner, payout);
    }

    function getGameState(bytes32 _gameId) external view returns (
        address[2] memory players,
        uint256 stake,
        GameType gameType,
        uint8 roundsPlayed,
        uint8[2] memory scores,
        bool isActive
    ) {
        Game storage game = games[_gameId];
        return (
            game.players,
            game.stake,
            game.gameType,
            game.roundsPlayed,
            game.scores,
            game.isActive
        );
    }
}
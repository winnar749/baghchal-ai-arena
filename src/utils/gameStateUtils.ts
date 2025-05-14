
import { GameState } from '../types/game';
import { createEmptyBoard, TOTAL_GOATS } from './gameBoard';

// Initialize a new game state
export const createInitialGameState = (): GameState => {
  const board = createEmptyBoard();
  
  // Place tigers at the corners
  board[0][0] = 'tiger';
  board[0][4] = 'tiger';
  board[4][0] = 'tiger';
  board[4][4] = 'tiger';
  
  return {
    board,
    currentPlayer: 'goat', // Start with goat
    phase: 'placing', // Start with the goat placing phase
    placedGoats: 0,
    capturedGoats: 0,
    selectedPosition: null,
    lastMove: null,
    winner: null,
    aiThinking: false,
  };
};

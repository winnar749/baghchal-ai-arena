
import { GameState } from '../types/game';

export function createInitialGameState(): GameState {
  // Create empty 5x5 board
  const board = Array(5).fill(null).map(() => Array(5).fill(null));
  
  // Place tigers at the four corners
  board[0][0] = 'tiger'; // top-left
  board[0][4] = 'tiger'; // top-right
  board[4][0] = 'tiger'; // bottom-left
  board[4][4] = 'tiger'; // bottom-right
  
  return {
    board,
    currentPlayer: 'goat',
    phase: 'placing',
    placedGoats: 0,
    capturedGoats: 0,
    selectedPosition: null,
    lastMove: null,
    winner: null,
    aiThinking: false,
    tigerTime: 0,
    goatTime: 0,
    turnStartTime: Date.now(),
  };
}

import { GameState, PieceType } from '../types/game';
import { INITIAL_BOARD } from './gameBoard';

// Initialize the game board
export function initializeBoard(): PieceType[][] {
  return INITIAL_BOARD.map(row => [...row]);
}

export function createInitialGameState(): GameState {
  return {
    board: initializeBoard(),
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

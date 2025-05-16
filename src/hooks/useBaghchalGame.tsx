
import { useState, useCallback } from 'react';
import { GameState } from '../types/game';
import { createInitialGameState } from '../utils/gameStateUtils';
import { useGameActions } from './useGameActions';
import { useAI } from './useAI';
import { useValidMovesHelper } from './useValidMovesHelper';
import { useGameTimer } from './useGameTimer';
import { TOTAL_GOATS } from '../utils/gameBoard';

export function useBaghchalGame() {
  const [gameState, setGameState] = useState<GameState>(createInitialGameState());
  
  // Reset the game
  const resetGame = useCallback(() => {
    setGameState(createInitialGameState());
  }, []);

  // Import functionality from smaller hook files
  const { handleIntersectionClick } = useGameActions(gameState, setGameState);
  const { makeAIMove } = useAI(setGameState);
  const { getValidMovesForSelected } = useValidMovesHelper(gameState);
  const { updateTurnStartTime } = useGameTimer(gameState, setGameState);

  return {
    gameState,
    resetGame,
    handleIntersectionClick,
    getValidMovesForSelected,
    makeAIMove,
    updateTurnStartTime,
  };
}

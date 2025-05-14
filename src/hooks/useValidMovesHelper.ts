
import { useCallback } from 'react';
import { GameState, Position } from '../types/game';
import { getValidMoves } from '../utils/gameBoard';
import { getCaptureMoves } from '../utils/gameRules';

export function useValidMovesHelper(gameState: GameState) {
  // Get valid moves for the currently selected position
  const getValidMovesForSelected = useCallback((): Position[] => {
    const { board, selectedPosition } = gameState;
    if (!selectedPosition) return [];
    
    const validMoves = getValidMoves(selectedPosition).filter(
      move => board[move.row][move.col] === null
    );
    
    // Add capture moves for tigers
    if (board[selectedPosition.row][selectedPosition.col] === 'tiger') {
      const captureMoves = getCaptureMoves(selectedPosition, board, validMoves);
      captureMoves.forEach(move => {
        validMoves.push(move.to);
      });
    }
    
    return validMoves;
  }, [gameState]);
  
  return { getValidMovesForSelected };
}

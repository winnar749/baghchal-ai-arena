
import { useState, useCallback } from 'react';
import { GameState, Position } from '../types/game';
import { getValidMoves, TOTAL_GOATS } from '../utils/gameBoard';
import { getCaptureMoves, checkWinner } from '../utils/gameRules';

export function useGameActions(gameState: GameState, setGameState: React.Dispatch<React.SetStateAction<GameState>>) {
  // Handle intersection click
  const handleIntersectionClick = useCallback((position: Position) => {
    if (gameState.winner || gameState.aiThinking) return;
    
    setGameState(prevState => {
      const { board, currentPlayer, phase, selectedPosition, placedGoats } = prevState;
      const newBoard = board.map(row => [...row]);
      
      // PLACING PHASE (for goats)
      if (phase === 'placing' && currentPlayer === 'goat') {
        // If the spot is empty, place a goat
        if (board[position.row][position.col] === null) {
          newBoard[position.row][position.col] = 'goat';
          const newPlacedGoats = placedGoats + 1;
          
          return {
            ...prevState,
            board: newBoard,
            placedGoats: newPlacedGoats,
            currentPlayer: 'tiger' as const,
            lastMove: { from: position, to: position },
            phase: newPlacedGoats >= TOTAL_GOATS ? 'moving' as const : 'placing' as const,
          };
        }
        return prevState;
      }
      
      // MOVING PHASE
      if (phase === 'moving' || (phase === 'placing' && currentPlayer === 'tiger')) {
        // If no piece is selected and the clicked position has the current player's piece
        if (!selectedPosition && board[position.row][position.col] === currentPlayer) {
          return {
            ...prevState,
            selectedPosition: position,
          };
        }
        
        // If a piece is already selected
        if (selectedPosition) {
          const pieceType = board[selectedPosition.row][selectedPosition.col];
          
          // Make sure the selected piece belongs to the current player
          if (pieceType !== currentPlayer) {
            return {
              ...prevState,
              selectedPosition: null,
            };
          }
          
          // If clicking on the same piece, deselect it
          if (position.row === selectedPosition.row && position.col === selectedPosition.col) {
            return {
              ...prevState,
              selectedPosition: null,
            };
          }
          
          // Check if the move is valid (adjacent or capturing)
          const validMoves = getValidMoves(selectedPosition).filter(
            move => board[move.row][move.col] === null
          );
          
          // Check for regular move
          const isValidMove = validMoves.some(
            move => move.row === position.row && move.col === position.col
          );
          
          // Check for capture move (for tigers)
          const captureMoves = getCaptureMoves(selectedPosition, board, validMoves);
          const captureMove = captureMoves.find(
            move => move.to.row === position.row && move.to.col === position.col
          );
          
          // If it's a valid regular move
          if (isValidMove && !captureMove) {
            newBoard[position.row][position.col] = pieceType;
            newBoard[selectedPosition.row][selectedPosition.col] = null;
            
            const newState = {
              ...prevState,
              board: newBoard,
              currentPlayer: currentPlayer === 'tiger' ? ('goat' as const) : ('tiger' as const),
              selectedPosition: null,
              lastMove: {
                from: selectedPosition,
                to: position,
              },
            };
            
            // Check if there's a winner after this move
            const winner = checkWinner(newState);
            return winner ? { ...newState, winner } : newState;
          }
          
          // If it's a valid capture move (only tigers can capture)
          if (captureMove) {
            newBoard[position.row][position.col] = pieceType;
            newBoard[selectedPosition.row][selectedPosition.col] = null;
            newBoard[captureMove.capture.row][captureMove.capture.col] = null;
            
            const newState = {
              ...prevState,
              board: newBoard,
              currentPlayer: currentPlayer === 'tiger' ? ('goat' as const) : ('tiger' as const),
              selectedPosition: null,
              capturedGoats: prevState.capturedGoats + 1,
              lastMove: {
                from: selectedPosition,
                to: position,
                capture: captureMove.capture,
              },
            };
            
            // Check if there's a winner after this move
            const winner = checkWinner(newState);
            return winner ? { ...newState, winner } : newState;
          }
          
          // If it's an invalid move, just deselect the piece
          return {
            ...prevState,
            selectedPosition: null,
          };
        }
      }
      
      return prevState;
    });
  }, [gameState.winner, gameState.aiThinking, setGameState]);

  return { handleIntersectionClick };
}

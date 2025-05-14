
import { useCallback } from 'react';
import { GameState, Position } from '../types/game';
import { BOARD_SIZE, TOTAL_GOATS, getValidMoves } from '../utils/gameBoard';
import { getCaptureMoves, checkWinner } from '../utils/gameRules';

export function useAI(setGameState: React.Dispatch<React.SetStateAction<GameState>>) {
  // Mock AI move - for future reinforcement learning integration
  const makeAIMove = useCallback(() => {
    setGameState(prevState => ({
      ...prevState,
      aiThinking: true
    }));

    // Simulate AI thinking time
    setTimeout(() => {
      setGameState(prevState => {
        if (prevState.winner) return prevState;
        
        const { board, currentPlayer, phase, placedGoats } = prevState;
        const newBoard = board.map(row => [...row]);
        let move = null;
        
        // Simple random AI logic (to be replaced with RL)
        if (phase === 'placing' && currentPlayer === 'goat') {
          // Find all empty spots
          const emptySpots: Position[] = [];
          for (let r = 0; r < BOARD_SIZE; r++) {
            for (let c = 0; c < BOARD_SIZE; c++) {
              if (board[r][c] === null) {
                emptySpots.push({ row: r, col: c });
              }
            }
          }
          
          // Randomly select an empty spot
          if (emptySpots.length > 0) {
            const randomSpot = emptySpots[Math.floor(Math.random() * emptySpots.length)];
            newBoard[randomSpot.row][randomSpot.col] = 'goat';
            
            const newPlacedGoats = placedGoats + 1;
            const newPhase: 'placing' | 'moving' = newPlacedGoats >= TOTAL_GOATS ? 'moving' : 'placing';
            
            const newState = {
              ...prevState,
              board: newBoard,
              placedGoats: newPlacedGoats,
              currentPlayer: 'tiger' as const,
              aiThinking: false,
              lastMove: { from: randomSpot, to: randomSpot },
              phase: newPhase,
            };
            
            // Check for winner
            const winner = checkWinner(newState);
            return winner ? { ...newState, winner } : newState;
          }
        } else {
          // Find all pieces of the current player
          const pieces: Position[] = [];
          for (let r = 0; r < BOARD_SIZE; r++) {
            for (let c = 0; c < BOARD_SIZE; c++) {
              if (board[r][c] === currentPlayer) {
                pieces.push({ row: r, col: c });
              }
            }
          }
          
          // For each piece, find valid moves
          const allMoves: { from: Position; to: Position; capture?: Position }[] = [];
          
          pieces.forEach(piece => {
            const validMoves = getValidMoves(piece).filter(
              move => board[move.row][move.col] === null
            );
            
            validMoves.forEach(to => {
              allMoves.push({ from: piece, to });
            });
            
            // Add capture moves for tigers
            if (currentPlayer === 'tiger') {
              const captureMoves = getCaptureMoves(piece, board, validMoves);
              captureMoves.forEach(move => {
                allMoves.push({
                  from: piece,
                  to: move.to,
                  capture: move.capture
                });
              });
            }
          });
          
          // Prioritize capture moves
          const captureMoves = allMoves.filter(move => move.capture);
          const movePool = captureMoves.length > 0 ? captureMoves : allMoves;
          
          if (movePool.length > 0) {
            // Randomly select a move
            move = movePool[Math.floor(Math.random() * movePool.length)];
            
            // Execute the move
            newBoard[move.to.row][move.to.col] = board[move.from.row][move.from.col];
            newBoard[move.from.row][move.from.col] = null;
            
            let capturedGoats = prevState.capturedGoats;
            
            // Handle capture
            if (move.capture) {
              newBoard[move.capture.row][move.capture.col] = null;
              capturedGoats++;
            }
            
            const newState = {
              ...prevState,
              board: newBoard,
              currentPlayer: currentPlayer === 'tiger' ? ('goat' as const) : ('tiger' as const),
              aiThinking: false,
              capturedGoats,
              lastMove: move,
            };
            
            // Check for winner
            const winner = checkWinner(newState);
            return winner ? { ...newState, winner } : newState;
          }
        }
        
        // If no move could be made (shouldn't normally happen)
        return {
          ...prevState,
          aiThinking: false
        };
      });
    }, 500); // 500ms thinking time
  }, [setGameState]);

  return { makeAIMove };
}

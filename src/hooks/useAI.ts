
import { useState, useCallback } from 'react';
import { GameState, Position, PieceType } from '../types/game';
import { getValidMoves } from '../utils/gameBoard';
import { getCaptureMoves, checkWinner } from '../utils/gameRules';

export function useAI(setGameState: React.Dispatch<React.SetStateAction<GameState>>) {
  // Generate and execute AI move
  const makeAIMove = useCallback(() => {
    setGameState(prevState => {
      // Skip if game is over or AI is already thinking
      if (prevState.winner || prevState.aiThinking) {
        return prevState;
      }

      // Mark that AI is thinking
      return {
        ...prevState,
        aiThinking: true
      };
    });

    // Simple timeout to simulate "thinking" time
    setTimeout(() => {
      setGameState(prevState => {
        // Skip if game is already over
        if (prevState.winner) {
          return {
            ...prevState,
            aiThinking: false
          };
        }

        const currentPlayer = prevState.currentPlayer;
        const board = prevState.board.map(row => [...row]);

        // Execute AI move based on some strategy
        // For now, just find any valid move
        if (currentPlayer === 'tiger') {
          for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
              if (board[row][col] === 'tiger') {
                const tigerPosition: Position = { row, col };
                const validMoves = getValidMoves(tigerPosition).filter(
                  move => board[move.row][move.col] === null
                );
                const captureMoves = getCaptureMoves(tigerPosition, board, validMoves);

                if (captureMoves.length > 0) {
                  // Prioritize capture moves
                  const captureMove = captureMoves[0];
                  board[captureMove.to.row][captureMove.to.col] = 'tiger';
                  board[tigerPosition.row][tigerPosition.col] = null;
                  board[captureMove.capture.row][captureMove.capture.col] = null;

                  const newState = {
                    ...prevState,
                    board: board,
                    currentPlayer: 'goat' as const,
                    aiThinking: false,
                    capturedGoats: prevState.capturedGoats + 1,
                    lastMove: {
                      from: tigerPosition,
                      to: captureMove.to,
                      capture: captureMove.capture,
                    },
                    turnStartTime: Date.now(),
                  };

                  // Check if there's a winner after this move
                  const winner = checkWinner(newState);
                  return winner ? { ...newState, winner } : newState;
                } else if (validMoves.length > 0) {
                  // If no capture moves, make a regular move
                  const move = validMoves[0];
                  board[move.row][move.col] = 'tiger';
                  board[tigerPosition.row][tigerPosition.col] = null;

                  const newState = {
                    ...prevState,
                    board: board,
                    currentPlayer: 'goat' as const,
                    aiThinking: false,
                    lastMove: {
                      from: tigerPosition,
                      to: move,
                    },
                    turnStartTime: Date.now(),
                  };

                  // Check if there's a winner after this move
                  const winner = checkWinner(newState);
                  return winner ? { ...newState, winner } : newState;
                }
              }
            }
          }
        } else {
          for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
              if (board[row][col] === 'goat') {
                const goatPosition: Position = { row, col };
                const validMoves = getValidMoves(goatPosition).filter(
                  move => board[move.row][move.col] === null
                );

                if (validMoves.length > 0) {
                  const move = validMoves[0];
                  board[move.row][move.col] = 'goat';
                  board[goatPosition.row][goatPosition.col] = null;

                  const newState = {
                    ...prevState,
                    board: board,
                    currentPlayer: 'tiger' as const,
                    aiThinking: false,
                    lastMove: {
                      from: goatPosition,
                      to: move,
                    },
                    turnStartTime: Date.now(),
                  };

                  // Check if there's a winner after this move
                  const winner = checkWinner(newState);
                  return winner ? { ...newState, winner } : newState;
                }
              }
            }
          }

          // If no goat can move, try placing a goat
          for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
              if (board[row][col] === null) {
                board[row][col] = 'goat';
                const newState = {
                  ...prevState,
                  board: board,
                  currentPlayer: 'tiger' as const,
                  aiThinking: false,
                  placedGoats: prevState.placedGoats + 1,
                  phase: prevState.placedGoats + 1 >= 20 ? 'moving' as const : 'placing' as const,
                  lastMove: {
                    from: { row, col },
                    to: { row, col },
                  },
                  turnStartTime: Date.now(),
                };

                // Check if there's a winner after this move
                const winner = checkWinner(newState);
                return winner ? { ...newState, winner } : newState;
              }
            }
          }
        }

        return {
          ...prevState,
          aiThinking: false,
          turnStartTime: Date.now(), // Reset turn start time when AI makes a move
        };
      });
    }, 500);
  }, [setGameState]);

  return { makeAIMove };
}

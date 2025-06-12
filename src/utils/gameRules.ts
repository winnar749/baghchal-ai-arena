
import { GameState, Position, PieceType } from '../types/game';
import { BOARD_SIZE, getValidMoves } from './gameBoard';

// Check if a piece can be captured
export const getCaptureMoves = (
  position: Position,
  board: PieceType[][],
  validMoves: Position[]
): { to: Position; capture: Position }[] => {
  const captureMoves: { to: Position; capture: Position }[] = [];
  
  // A tiger can jump over a goat to an empty space (in a straight line)
  if (board[position.row][position.col] === 'tiger') {
    // Get all valid single moves from current position
    const adjacentMoves = getValidMoves(position);
    
    for (const adjacentMove of adjacentMoves) {
      // Check if there's a goat at the adjacent position
      if (board[adjacentMove.row][adjacentMove.col] === 'goat') {
        // Calculate the direction vector
        const dirRow = adjacentMove.row - position.row;
        const dirCol = adjacentMove.col - position.col;
        
        // Calculate landing position (2 steps in same direction)
        const landingRow = position.row + (dirRow * 2);
        const landingCol = position.col + (dirCol * 2);
        
        // Check if landing position is within bounds
        if (landingRow >= 0 && landingRow < BOARD_SIZE && 
            landingCol >= 0 && landingCol < BOARD_SIZE) {
          
          // Check if the landing position is empty
          if (board[landingRow][landingCol] === null) {
            // Verify that the landing position is a valid move from the goat's position
            const validFromGoat = getValidMoves(adjacentMove);
            const isValidLanding = validFromGoat.some(
              move => move.row === landingRow && move.col === landingCol
            );
            
            if (isValidLanding) {
              captureMoves.push({
                to: { row: landingRow, col: landingCol },
                capture: { row: adjacentMove.row, col: adjacentMove.col },
              });
            }
          }
        }
      }
    }
  }
  
  return captureMoves;
};

// Check if the game is over
export const checkWinner = (gameState: GameState): 'tiger' | 'goat' | null => {
  const { board, capturedGoats } = gameState;
  
  // Tigers win if they capture 5 or more goats
  if (capturedGoats >= 5) {
    return 'tiger';
  }
  
  // Goats win if tigers can't move
  let tigerCanMove = false;
  
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] === 'tiger') {
        const position = { row, col };
        const validMoves = getValidMoves(position).filter(
          move => board[move.row][move.col] === null
        );
        const captureMoves = getCaptureMoves(position, board, validMoves);
        
        if (validMoves.length > 0 || captureMoves.length > 0) {
          tigerCanMove = true;
          break;
        }
      }
    }
    if (tigerCanMove) break;
  }
  
  return !tigerCanMove ? 'goat' : null;
};

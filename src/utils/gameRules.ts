
import { GameState, Position, PieceType } from '../types/game';
import { BOARD_SIZE, getValidMoves } from './gameBoard';

// Check if a piece can be captured
export const getCaptureMoves = (
  position: Position,
  board: PieceType[][],
  validMoves: Position[]
): { to: Position; capture: Position }[] => {
  const captureMoves: { to: Position; capture: Position }[] = [];
  
  // A tiger can jump over a goat to an empty space (in a straight line or diagonal)
  if (board[position.row][position.col] === 'tiger') {
    // Define all possible directions including diagonals
    const directions = [
      { row: -1, col: 0 },  // up
      { row: 1, col: 0 },   // down
      { row: 0, col: -1 },  // left
      { row: 0, col: 1 },   // right
      { row: -1, col: -1 }, // up-left diagonal
      { row: -1, col: 1 },  // up-right diagonal
      { row: 1, col: -1 },  // down-left diagonal
      { row: 1, col: 1 },   // down-right diagonal
    ];
    
    for (const dir of directions) {
      // Check adjacent position for a goat
      const adjacentRow = position.row + dir.row;
      const adjacentCol = position.col + dir.col;
      
      // Check if adjacent position is within bounds
      if (adjacentRow >= 0 && adjacentRow < BOARD_SIZE && 
          adjacentCol >= 0 && adjacentCol < BOARD_SIZE) {
        
        // Check if there's a goat at the adjacent position
        if (board[adjacentRow][adjacentCol] === 'goat') {
          // Calculate landing position (2 steps in same direction)
          const landingRow = position.row + (dir.row * 2);
          const landingCol = position.col + (dir.col * 2);
          
          // Check if landing position is within bounds
          if (landingRow >= 0 && landingRow < BOARD_SIZE && 
              landingCol >= 0 && landingCol < BOARD_SIZE) {
            
            // Check if the landing position is empty
            if (board[landingRow][landingCol] === null) {
              // For diagonal moves, we need to check if the path is valid on the board
              const adjacentPos = { row: adjacentRow, col: adjacentCol };
              const landingPos = { row: landingRow, col: landingCol };
              
              // Check if both positions are connected by valid moves
              const validFromTiger = getValidMoves(position);
              const validFromGoat = getValidMoves(adjacentPos);
              
              const canReachGoat = validFromTiger.some(
                move => move.row === adjacentRow && move.col === adjacentCol
              );
              const canReachLanding = validFromGoat.some(
                move => move.row === landingRow && move.col === landingCol
              );
              
              if (canReachGoat && canReachLanding) {
                captureMoves.push({
                  to: landingPos,
                  capture: adjacentPos,
                });
              }
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

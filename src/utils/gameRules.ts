
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
    for (const dir of [
      { row: -2, col: 0, captureRow: -1, captureCol: 0 },    // up
      { row: 2, col: 0, captureRow: 1, captureCol: 0 },     // down
      { row: 0, col: -2, captureRow: 0, captureCol: -1 },   // left
      { row: 0, col: 2, captureRow: 0, captureCol: 1 },     // right
      { row: -2, col: -2, captureRow: -1, captureCol: -1 }, // up-left
      { row: -2, col: 2, captureRow: -1, captureCol: 1 },   // up-right
      { row: 2, col: -2, captureRow: 1, captureCol: -1 },   // down-left
      { row: 2, col: 2, captureRow: 1, captureCol: 1 },     // down-right
    ]) {
      const newRow = position.row + dir.row;
      const newCol = position.col + dir.col;
      const captureRow = position.row + dir.captureRow;
      const captureCol = position.col + dir.captureCol;
      
      // Check if the move is valid (within bounds)
      if (newRow >= 0 && newRow < BOARD_SIZE && newCol >= 0 && newCol < BOARD_SIZE) {
        // Check if the capture is along a valid path (some diagonals aren't allowed)
        const isValidPath = getValidMoves({ row: position.row, col: position.col }).some(
          move => move.row === captureRow && move.col === captureCol
        ) && getValidMoves({ row: captureRow, col: captureCol }).some(
          move => move.row === newRow && move.col === newCol
        );
        
        // Check if there's a goat to capture and an empty spot to land
        if (isValidPath && 
            board[captureRow][captureCol] === 'goat' && 
            board[newRow][newCol] === null) {
          captureMoves.push({
            to: { row: newRow, col: newCol },
            capture: { row: captureRow, col: captureCol },
          });
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

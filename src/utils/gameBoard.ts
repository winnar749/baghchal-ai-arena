
import { PieceType, Position } from "../types/game";

// Baghchal board has 5x5 intersections
export const BOARD_SIZE = 5;
export const TOTAL_GOATS = 20;

// Initialize an empty board
export const createEmptyBoard = (): PieceType[][] => {
  const board: PieceType[][] = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    board.push(Array(BOARD_SIZE).fill(null));
  }
  return board;
};

// Define valid moves for each position on the board
export const getValidMoves = (position: Position): Position[] => {
  const { row, col } = position;
  const moves: Position[] = [];

  // Horizontal and vertical moves (always valid)
  const directions = [
    { row: -1, col: 0 }, // up
    { row: 1, col: 0 },  // down
    { row: 0, col: -1 }, // left
    { row: 0, col: 1 },  // right
  ];

  // Diagonal moves based on position and board layout
  const diagonalMoves: { row: number; col: number }[] = [];

  // Corner positions - can move diagonally in all directions
  if ((row === 0 && col === 0) || 
      (row === 0 && col === 4) || 
      (row === 4 && col === 0) || 
      (row === 4 && col === 4)) {
    diagonalMoves.push(
      { row: -1, col: -1 }, // up-left
      { row: -1, col: 1 },  // up-right
      { row: 1, col: -1 },  // down-left
      { row: 1, col: 1 },   // down-right
    );
  }
  
  // Center position - can move diagonally in all directions
  if (row === 2 && col === 2) {
    diagonalMoves.push(
      { row: -1, col: -1 }, // up-left
      { row: -1, col: 1 },  // up-right
      { row: 1, col: -1 },  // down-left
      { row: 1, col: 1 },   // down-right
    );
  }
  
  // Middle edge positions - can move diagonally towards center
  if (row === 0 && col === 2) { // top middle
    diagonalMoves.push({ row: 1, col: -1 }, { row: 1, col: 1 });
  }
  if (row === 2 && col === 0) { // left middle
    diagonalMoves.push({ row: -1, col: 1 }, { row: 1, col: 1 });
  }
  if (row === 2 && col === 4) { // right middle
    diagonalMoves.push({ row: -1, col: -1 }, { row: 1, col: -1 });
  }
  if (row === 4 && col === 2) { // bottom middle
    diagonalMoves.push({ row: -1, col: -1 }, { row: -1, col: 1 });
  }

  // Add all valid directions
  const allDirections = [...directions, ...diagonalMoves];

  for (const dir of allDirections) {
    const newRow = row + dir.row;
    const newCol = col + dir.col;
    if (newRow >= 0 && newRow < BOARD_SIZE && newCol >= 0 && newCol < BOARD_SIZE) {
      moves.push({ row: newRow, col: newCol });
    }
  }

  return moves;
};

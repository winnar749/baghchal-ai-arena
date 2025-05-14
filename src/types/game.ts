
export type PieceType = 'tiger' | 'goat' | null;

export type Position = {
  row: number;
  col: number;
};

export type Move = {
  from: Position;
  to: Position;
  capture?: Position; // Position of captured piece if any
};

export type GameState = {
  board: PieceType[][];
  currentPlayer: 'tiger' | 'goat';
  phase: 'placing' | 'moving';
  placedGoats: number;
  capturedGoats: number;
  selectedPosition: Position | null;
  lastMove: Move | null;
  winner: 'tiger' | 'goat' | null;
  aiThinking: boolean;
};

export type IntersectionPoint = {
  row: number;
  col: number;
  validMoves: Position[];
};

export type GameMode = 'human-vs-human' | 'human-vs-ai' | 'ai-vs-ai';


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
  tigerTime: number; // Total time in seconds for tiger player
  goatTime: number; // Total time in seconds for goat player
  turnStartTime: number; // Timestamp when current turn started
};

export type IntersectionPoint = {
  row: number;
  col: number;
  validMoves: Position[];
};

export type GameMode = 'human-vs-human' | 'human-vs-ai' | 'ai-vs-ai';

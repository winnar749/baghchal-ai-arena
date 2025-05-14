
import { useState, useCallback } from 'react';
import { GameState, Position, PieceType, Move } from '../types/game';

// Baghchal board has 5x5 intersections
const BOARD_SIZE = 5;
const TOTAL_GOATS = 20;

// Define valid moves for each position on the board
const getValidMoves = (position: Position): Position[] => {
  const { row, col } = position;
  const moves: Position[] = [];

  // Horizontal and vertical moves
  const directions = [
    { row: -1, col: 0 }, // up
    { row: 1, col: 0 },  // down
    { row: 0, col: -1 }, // left
    { row: 0, col: 1 },  // right
  ];

  // Add diagonal moves for positions where diagonals exist
  if ((row === 0 && col === 0) || 
      (row === 0 && col === 4) || 
      (row === 4 && col === 0) || 
      (row === 4 && col === 4) || 
      (row === 2 && col === 2)) {
    directions.push(
      { row: -1, col: -1 }, // up-left
      { row: -1, col: 1 },  // up-right
      { row: 1, col: -1 },  // down-left
      { row: 1, col: 1 },   // down-right
    );
  }
  
  // Add diagonal moves for middle positions on the edge
  if ((row === 0 && col === 2) || 
      (row === 2 && col === 0) || 
      (row === 2 && col === 4) || 
      (row === 4 && col === 2)) {
    if (row === 0 && col === 2) {
      directions.push({ row: 1, col: -1 }, { row: 1, col: 1 });
    }
    if (row === 2 && col === 0) {
      directions.push({ row: -1, col: 1 }, { row: 1, col: 1 });
    }
    if (row === 2 && col === 4) {
      directions.push({ row: -1, col: -1 }, { row: 1, col: -1 });
    }
    if (row === 4 && col === 2) {
      directions.push({ row: -1, col: -1 }, { row: -1, col: 1 });
    }
  }

  for (const dir of directions) {
    const newRow = row + dir.row;
    const newCol = col + dir.col;
    if (newRow >= 0 && newRow < BOARD_SIZE && newCol >= 0 && newCol < BOARD_SIZE) {
      moves.push({ row: newRow, col: newCol });
    }
  }

  return moves;
};

// Check if a piece can be captured
const getCaptureMoves = (
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

// Initialize an empty board
const createEmptyBoard = (): PieceType[][] => {
  const board: PieceType[][] = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    board.push(Array(BOARD_SIZE).fill(null));
  }
  return board;
};

// Initialize a new game state
const createInitialGameState = (): GameState => {
  const board = createEmptyBoard();
  
  // Place tigers at the corners
  board[0][0] = 'tiger';
  board[0][4] = 'tiger';
  board[4][0] = 'tiger';
  board[4][4] = 'tiger';
  
  return {
    board,
    currentPlayer: 'goat' as const, // Explicitly typed as 'goat'
    phase: 'placing', // Start with the goat placing phase
    placedGoats: 0,
    capturedGoats: 0,
    selectedPosition: null,
    lastMove: null,
    winner: null,
    aiThinking: false,
  };
};

// Check if the game is over
const checkWinner = (gameState: GameState): 'tiger' | 'goat' | null => {
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

export function useBaghchalGame() {
  const [gameState, setGameState] = useState<GameState>(createInitialGameState());
  
  // Reset the game
  const resetGame = useCallback(() => {
    setGameState(createInitialGameState());
  }, []);

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
            phase: newPlacedGoats >= TOTAL_GOATS ? 'moving' : 'placing',
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
  }, [gameState.winner, gameState.aiThinking]);

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
            const newState = {
              ...prevState,
              board: newBoard,
              placedGoats: newPlacedGoats,
              currentPlayer: 'tiger' as const,
              aiThinking: false,
              lastMove: { from: randomSpot, to: randomSpot },
              phase: newPlacedGoats >= TOTAL_GOATS ? 'moving' : 'placing',
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
  }, []);

  return {
    gameState,
    resetGame,
    handleIntersectionClick,
    getValidMovesForSelected,
    makeAIMove,
  };
}


import React, { useMemo } from 'react';
import GamePiece from './GamePiece';
import { Position, PieceType } from '../types/game';
import { useIsMobile } from '@/hooks/use-mobile';

type GameBoardProps = {
  board: PieceType[][];
  selectedPosition: Position | null;
  validMoves: Position[];
  lastMove: { from: Position; to: Position; capture?: Position } | null;
  onIntersectionClick: (position: Position) => void;
};

const GameBoard: React.FC<GameBoardProps> = ({ 
  board, 
  selectedPosition, 
  validMoves, 
  lastMove,
  onIntersectionClick 
}) => {
  const isMobile = useIsMobile();
  const boardSize = isMobile ? 320 : 460;
  const cellSize = boardSize / 4; // 5 intersections means 4 cells
  
  // Generate all intersection points
  const intersections = useMemo(() => {
    const points: { position: Position; isValid: boolean }[] = [];
    
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        points.push({
          position: { row, col },
          isValid: true // All intersections are valid in Baghchal
        });
      }
    }
    
    return points;
  }, []);
  
  // Check if a position is part of the last move
  const isInLastMove = (position: Position) => {
    if (!lastMove) return false;
    
    return (
      (lastMove.from.row === position.row && lastMove.from.col === position.col) ||
      (lastMove.to.row === position.row && lastMove.to.col === position.col) ||
      (lastMove.capture && 
       lastMove.capture.row === position.row && 
       lastMove.capture.col === position.col)
    );
  };
  
  // Check if a position is a valid move target
  const isValidMoveTarget = (position: Position) => {
    return validMoves.some(move => move.row === position.row && move.col === position.col);
  };

  // Function to determine if a position has diagonal connections
  const hasDiagonalConnection = (row: number, col: number, direction: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight') => {
    // Traditional Baghchal diagonal pattern
    // Center point connects to all directions
    if (row === 2 && col === 2) return true;

    // Corner points
    if (row === 0 && col === 0 && direction === 'bottomRight') return true;
    if (row === 0 && col === 4 && direction === 'bottomLeft') return true;
    if (row === 4 && col === 0 && direction === 'topRight') return true;
    if (row === 4 && col === 4 && direction === 'topLeft') return true;

    // Inner diagonals from edges
    if (row === 0 && col === 2 && (direction === 'bottomLeft' || direction === 'bottomRight')) return true;
    if (row === 2 && col === 0 && (direction === 'topRight' || direction === 'bottomRight')) return true;
    if (row === 2 && col === 4 && (direction === 'topLeft' || direction === 'bottomLeft')) return true;
    if (row === 4 && col === 2 && (direction === 'topLeft' || direction === 'topRight')) return true;

    return false;
  };

  return (
    <div 
      className="relative mx-auto bg-white dark:bg-black border border-amber-600/30 dark:border-amber-500/50 overflow-hidden"
      style={{ width: boardSize, height: boardSize }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-5 dark:opacity-10"></div>
      </div>
      
      {/* Horizontal lines */}
      {[0, 1, 2, 3, 4].map(row => (
        <div 
          key={`h-line-${row}`} 
          className="absolute bg-amber-900 dark:bg-amber-400 h-[2px] w-full" 
          style={{ 
            top: row * cellSize,
            zIndex: 5
          }}
        />
      ))}
      
      {/* Vertical lines */}
      {[0, 1, 2, 3, 4].map(col => (
        <div 
          key={`v-line-${col}`} 
          className="absolute bg-amber-900 dark:bg-amber-400 w-[2px] h-full" 
          style={{ 
            left: col * cellSize,
            zIndex: 5
          }}
        />
      ))}
      
      {/* Traditional diagonal lines */}
      {/* Full diagonals through the center */}
      <div className="absolute bg-amber-900 dark:bg-amber-400 h-[2px] w-[141.4%] origin-center rotate-45" 
           style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(45deg)', zIndex: 5 }} />
      
      <div className="absolute bg-amber-900 dark:bg-amber-400 h-[2px] w-[141.4%] origin-center -rotate-45" 
           style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-45deg)', zIndex: 5 }} />
           
      {/* Half diagonals from corners to center */}
      <div className="absolute bg-amber-900 dark:bg-amber-400 h-[2px] w-[70.7%] origin-top-left rotate-45" 
           style={{ top: 0, left: 0, zIndex: 5 }} />
           
      <div className="absolute bg-amber-900 dark:bg-amber-400 h-[2px] w-[70.7%] origin-top-right -rotate-45" 
           style={{ top: 0, right: 0, zIndex: 5 }} />
           
      <div className="absolute bg-amber-900 dark:bg-amber-400 h-[2px] w-[70.7%] origin-bottom-left -rotate-45" 
           style={{ bottom: 0, left: 0, zIndex: 5 }} />
           
      <div className="absolute bg-amber-900 dark:bg-amber-400 h-[2px] w-[70.7%] origin-bottom-right rotate-45" 
           style={{ bottom: 0, right: 0, zIndex: 5 }} />

      {/* Half diagonals from middle edge points to center */}
      <div className="absolute bg-amber-900 dark:bg-amber-400 h-[2px] w-[70.7%] origin-top-center rotate-45" 
           style={{ top: 0, left: '50%', transform: 'translateX(-50%) rotate(45deg)', transformOrigin: 'bottom', zIndex: 5, width: '70.7%' }} />
           
      <div className="absolute bg-amber-900 dark:bg-amber-400 h-[2px] w-[70.7%] origin-top-center -rotate-45" 
           style={{ top: 0, left: '50%', transform: 'translateX(-50%) rotate(-45deg)', transformOrigin: 'bottom', zIndex: 5, width: '70.7%' }} />
           
      <div className="absolute bg-amber-900 dark:bg-amber-400 h-[2px] w-[70.7%] origin-left-middle rotate-45" 
           style={{ top: '50%', left: 0, transform: 'translateY(-50%) rotate(45deg)', transformOrigin: 'left', zIndex: 5, width: '70.7%' }} />
           
      <div className="absolute bg-amber-900 dark:bg-amber-400 h-[2px] w-[70.7%] origin-left-middle -rotate-45" 
           style={{ top: '50%', left: 0, transform: 'translateY(-50%) rotate(-45deg)', transformOrigin: 'left', zIndex: 5, width: '70.7%' }} />
           
      <div className="absolute bg-amber-900 dark:bg-amber-400 h-[2px] w-[70.7%] origin-right-middle rotate-45" 
           style={{ top: '50%', right: 0, transform: 'translateY(-50%) rotate(45deg)', transformOrigin: 'right', zIndex: 5, width: '70.7%' }} />
           
      <div className="absolute bg-amber-900 dark:bg-amber-400 h-[2px] w-[70.7%] origin-right-middle -rotate-45" 
           style={{ top: '50%', right: 0, transform: 'translateY(-50%) rotate(-45deg)', transformOrigin: 'right', zIndex: 5, width: '70.7%' }} />
           
      <div className="absolute bg-amber-900 dark:bg-amber-400 h-[2px] w-[70.7%] origin-bottom-center rotate-45" 
           style={{ bottom: 0, left: '50%', transform: 'translateX(-50%) rotate(45deg)', transformOrigin: 'top', zIndex: 5, width: '70.7%' }} />
           
      <div className="absolute bg-amber-900 dark:bg-amber-400 h-[2px] w-[70.7%] origin-bottom-center -rotate-45" 
           style={{ bottom: 0, left: '50%', transform: 'translateX(-50%) rotate(-45deg)', transformOrigin: 'top', zIndex: 5, width: '70.7%' }} />
           
      {/* Intersection points */}
      {intersections.map(({ position, isValid }) => {
        const { row, col } = position;
        const piece = board[row][col];
        const isSelected = selectedPosition && 
                          selectedPosition.row === row && 
                          selectedPosition.col === col;
        const isHighlighted = isInLastMove(position);
        const isValidMove = isValidMoveTarget(position);
                          
        return (
          <div
            key={`intersection-${row}-${col}`}
            className={`absolute ${isValid ? 'cursor-pointer' : ''}`}
            style={{
              left: col * cellSize,
              top: row * cellSize,
              width: cellSize,
              height: cellSize,
              zIndex: piece ? 20 : 10,
              transform: 'translate(-50%, -50%)',
            }}
            onClick={() => isValid && onIntersectionClick(position)}
          >
            {/* Highlight for last move */}
            {isHighlighted && (
              <div className="absolute w-6 h-6 bg-amber-300/40 dark:bg-amber-200/40 rounded-full" 
                style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
            )}
            
            {/* Highlight for valid move */}
            {isValidMove && !piece && (
              <div className="absolute w-6 h-6 bg-green-500/30 dark:bg-green-400/40 rounded-full animate-pulse" 
                style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
            )}
            
            {/* Intersection dot */}
            <div className="absolute w-3 h-3 rounded-full bg-amber-900 dark:bg-amber-400 border border-amber-600 dark:border-amber-500" 
                 style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
            
            {piece && (
              <GamePiece 
                type={piece} 
                isSelected={isSelected}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default GameBoard;

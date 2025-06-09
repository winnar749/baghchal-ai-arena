
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
  const boardSize = isMobile ? 320 : 500;
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

  return (
    <div 
      className="relative mx-auto overflow-hidden border-8 border-amber-900 shadow-2xl"
      style={{ 
        width: boardSize, 
        height: boardSize,
        background: 'linear-gradient(135deg, #D2B48C 0%, #DEB887 25%, #D2B48C 50%, #F5DEB3 75%, #D2B48C 100%)',
        backgroundSize: '20px 20px'
      }}
    >
      {/* Wood grain texture overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 2px,
            rgba(139, 69, 19, 0.1) 2px,
            rgba(139, 69, 19, 0.1) 4px
          ),
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 8px,
            rgba(160, 82, 45, 0.1) 8px,
            rgba(160, 82, 45, 0.1) 12px
          )`
        }}
      />
      
      {/* Horizontal lines */}
      {[0, 1, 2, 3, 4].map(row => (
        <div 
          key={`h-line-${row}`} 
          className="absolute bg-amber-900 h-[3px] w-full shadow-sm" 
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
          className="absolute bg-amber-900 w-[3px] h-full shadow-sm" 
          style={{ 
            left: col * cellSize,
            zIndex: 5
          }}
        />
      ))}
      
      {/* Diagonal lines */}
      <div className="absolute bg-amber-900 h-[3px] w-[141.4%] origin-center rotate-45 shadow-sm" 
           style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(45deg)', zIndex: 5 }} />
      
      <div className="absolute bg-amber-900 h-[3px] w-[141.4%] origin-center -rotate-45 shadow-sm" 
           style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-45deg)', zIndex: 5 }} />
           
      {/* Corner to center diagonals */}
      <div className="absolute bg-amber-900 h-[3px] w-[70.7%] origin-top-left rotate-45 shadow-sm" 
           style={{ top: 0, left: 0, zIndex: 5 }} />
           
      <div className="absolute bg-amber-900 h-[3px] w-[70.7%] origin-top-right -rotate-45 shadow-sm" 
           style={{ top: 0, right: 0, zIndex: 5 }} />
           
      <div className="absolute bg-amber-900 h-[3px] w-[70.7%] origin-bottom-left -rotate-45 shadow-sm" 
           style={{ bottom: 0, left: 0, zIndex: 5 }} />
           
      <div className="absolute bg-amber-900 h-[3px] w-[70.7%] origin-bottom-right rotate-45 shadow-sm" 
           style={{ bottom: 0, right: 0, zIndex: 5 }} />

      {/* Edge to center diagonals */}
      <div className="absolute bg-amber-900 h-[3px] w-[70.7%] origin-top-center rotate-45 shadow-sm" 
           style={{ top: 0, left: '50%', transform: 'translateX(-50%) rotate(45deg)', transformOrigin: 'bottom', zIndex: 5, width: '70.7%' }} />
           
      <div className="absolute bg-amber-900 h-[3px] w-[70.7%] origin-top-center -rotate-45 shadow-sm" 
           style={{ top: 0, left: '50%', transform: 'translateX(-50%) rotate(-45deg)', transformOrigin: 'bottom', zIndex: 5, width: '70.7%' }} />
           
      <div className="absolute bg-amber-900 h-[3px] w-[70.7%] origin-left-middle rotate-45 shadow-sm" 
           style={{ top: '50%', left: 0, transform: 'translateY(-50%) rotate(45deg)', transformOrigin: 'left', zIndex: 5, width: '70.7%' }} />
           
      <div className="absolute bg-amber-900 h-[3px] w-[70.7%] origin-left-middle -rotate-45 shadow-sm" 
           style={{ top: '50%', left: 0, transform: 'translateY(-50%) rotate(-45deg)', transformOrigin: 'left', zIndex: 5, width: '70.7%' }} />
           
      <div className="absolute bg-amber-900 h-[3px] w-[70.7%] origin-right-middle rotate-45 shadow-sm" 
           style={{ top: '50%', right: 0, transform: 'translateY(-50%) rotate(45deg)', transformOrigin: 'right', zIndex: 5, width: '70.7%' }} />
           
      <div className="absolute bg-amber-900 h-[3px] w-[70.7%] origin-right-middle -rotate-45 shadow-sm" 
           style={{ top: '50%', right: 0, transform: 'translateY(-50%) rotate(-45deg)', transformOrigin: 'right', zIndex: 5, width: '70.7%' }} />
           
      <div className="absolute bg-amber-900 h-[3px] w-[70.7%] origin-bottom-center rotate-45 shadow-sm" 
           style={{ bottom: 0, left: '50%', transform: 'translateX(-50%) rotate(45deg)', transformOrigin: 'top', zIndex: 5, width: '70.7%' }} />
           
      <div className="absolute bg-amber-900 h-[3px] w-[70.7%] origin-bottom-center -rotate-45 shadow-sm" 
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
              <div className="absolute w-8 h-8 bg-yellow-300/40 rounded-full" 
                style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
            )}
            
            {/* Highlight for valid move */}
            {isValidMove && !piece && (
              <div className="absolute w-6 h-6 bg-green-400 rounded-full animate-pulse" 
                style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
            )}
            
            {/* Intersection dot */}
            {!piece && (
              <div className="absolute w-4 h-4 rounded-full bg-amber-900 shadow-md border-2 border-amber-800" 
                   style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
            )}
            
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

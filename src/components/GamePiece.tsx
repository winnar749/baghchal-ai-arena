
import React from 'react';
import { PieceType } from '../types/game';

type GamePieceProps = {
  type: PieceType;
  isSelected?: boolean;
  className?: string;
};

const GamePiece: React.FC<GamePieceProps> = ({ type, isSelected = false, className = '' }) => {
  if (!type) return null;
  
  const baseClasses = "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-md transition-all duration-200 transform cursor-pointer";
  const sizeClasses = "w-8 h-8 md:w-10 md:h-10";
  
  let pieceClasses = '';
  
  if (type === 'tiger') {
    pieceClasses = "bg-gradient-to-br from-amber-500 to-orange-600 text-white grid place-items-center font-bold border-2 border-amber-300";
  } else if (type === 'goat') {
    pieceClasses = "bg-gradient-to-br from-slate-700 to-slate-900 text-white grid place-items-center border-2 border-slate-400";
  }
  
  const selectedClasses = isSelected ? "ring-4 ring-yellow-300 animate-piece-bounce" : "";
  
  return (
    <div className={`${baseClasses} ${sizeClasses} ${pieceClasses} ${selectedClasses} ${className}`}>
      {type === 'tiger' && (
        <span className="text-xs md:text-sm flex items-center justify-center">
          🐯
        </span>
      )}
      {type === 'goat' && (
        <span className="text-xs md:text-sm flex items-center justify-center">
          🐐
        </span>
      )}
    </div>
  );
};

export default GamePiece;

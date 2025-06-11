
import React from 'react';
import { PieceType } from '../types/game';

type GamePieceProps = {
  type: PieceType;
  isSelected?: boolean;
  className?: string;
};

const GamePiece: React.FC<GamePieceProps> = ({ type, isSelected = false, className = '' }) => {
  if (!type) return null;
  
  const baseClasses = "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg transition-all duration-200 transform cursor-pointer font-bold text-white flex items-center justify-center";
  const sizeClasses = "w-8 h-8 md:w-10 md:h-10"; // Reduced from w-12 h-12 md:w-14 md:h-14
  
  let pieceClasses = '';
  let content = '';
  
  if (type === 'tiger') {
    pieceClasses = "bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-orange-300 shadow-orange-300/50";
    content = '🐅';
  } else if (type === 'goat') {
    pieceClasses = "bg-gradient-to-br from-slate-100 to-slate-300 border-2 border-slate-400 text-slate-800 shadow-slate-400/50";
    content = '🐐';
  }
  
  const selectedClasses = isSelected ? "ring-4 ring-yellow-300 animate-pulse scale-110" : "";
  
  return (
    <div className={`${baseClasses} ${sizeClasses} ${pieceClasses} ${selectedClasses} ${className}`}>
      <span className="text-sm md:text-base">
        {content}
      </span>
    </div>
  );
};

export default GamePiece;

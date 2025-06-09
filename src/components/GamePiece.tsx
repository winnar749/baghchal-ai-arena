
import React from 'react';
import { PieceType } from '../types/game';

type GamePieceProps = {
  type: PieceType;
  isSelected?: boolean;
  className?: string;
};

const GamePiece: React.FC<GamePieceProps> = ({ type, isSelected = false, className = '' }) => {
  if (!type) return null;
  
  const baseClasses = "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg transition-all duration-200 transform cursor-pointer font-bold text-white flex items-center justify-center border-4";
  const sizeClasses = "w-14 h-14 md:w-16 md:h-16";
  
  let pieceClasses = '';
  let content = '';
  
  if (type === 'tiger') {
    pieceClasses = "bg-gradient-to-br from-orange-600 to-red-700 border-orange-800 shadow-orange-900/50";
    content = '🐅';
  } else if (type === 'goat') {
    pieceClasses = "bg-gradient-to-br from-slate-100 to-slate-300 border-slate-400 shadow-slate-600/50 text-slate-800";
    content = '🐐';
  }
  
  const selectedClasses = isSelected ? "ring-4 ring-yellow-400 animate-pulse scale-110 shadow-2xl" : "";
  
  return (
    <div className={`${baseClasses} ${sizeClasses} ${pieceClasses} ${selectedClasses} ${className}`}>
      <span className="text-2xl md:text-3xl">
        {content}
      </span>
    </div>
  );
};

export default GamePiece;

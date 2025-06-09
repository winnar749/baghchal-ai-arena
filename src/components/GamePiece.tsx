
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
  const sizeClasses = "w-12 h-12 md:w-14 md:h-14";
  
  let pieceClasses = '';
  let content = '';
  
  if (type === 'tiger') {
    pieceClasses = "bg-orange-500 border-2 border-orange-400";
    content = 'T';
  } else if (type === 'goat') {
    pieceClasses = "bg-blue-500 border-2 border-blue-400";
    content = 'G';
  }
  
  const selectedClasses = isSelected ? "ring-4 ring-yellow-300 animate-pulse scale-110" : "";
  
  return (
    <div className={`${baseClasses} ${sizeClasses} ${pieceClasses} ${selectedClasses} ${className}`}>
      <span className="text-lg md:text-xl font-bold">
        {content}
      </span>
    </div>
  );
};

export default GamePiece;

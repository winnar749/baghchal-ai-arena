
import React from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { GameMode } from '@/types/game';
import { Clock, RotateCcw, Play } from "lucide-react";

type GameControlsProps = {
  currentPlayer: 'tiger' | 'goat';
  placedGoats: number;
  capturedGoats: number;
  winner: 'tiger' | 'goat' | null;
  onReset: () => void;
  onAIMove: () => void;
  gameMode: GameMode;
  onModeChange: (mode: GameMode) => void;
  aiThinking: boolean;
  tigerTime: number;
  goatTime: number;
};

const GameControls: React.FC<GameControlsProps> = ({
  currentPlayer,
  placedGoats,
  capturedGoats,
  winner,
  onReset,
  onAIMove,
  gameMode,
  onModeChange,
  aiThinking,
  tigerTime,
  goatTime
}) => {
  const isHumanTurn = gameMode === 'human-vs-ai' && currentPlayer === 'goat';
  const isAITurn = (gameMode === 'human-vs-ai' && currentPlayer === 'tiger') || gameMode === 'ai-vs-ai';

  // Format seconds to MM:SS
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full bg-white dark:bg-black rounded-lg shadow-md overflow-hidden border border-amber-100 dark:border-amber-800">
      {/* Player info */}
      <div className="grid grid-cols-2">
        <div 
          className={`p-4 ${currentPlayer === 'goat' && !winner ? 'bg-blue-50 dark:bg-blue-900/30 border-b-2 border-blue-500' : ''}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-game-goat grid place-items-center text-white">
                <span className="text-xs">♟</span>
              </div>
              <div>
                <p className="font-bold text-gray-800 dark:text-gray-200">Goats</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Placed: {placedGoats}/20</p>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-gray-400 dark:text-gray-500 mr-1" />
              <span className="text-sm text-gray-600 dark:text-gray-300">{formatTime(goatTime)}</span>
            </div>
          </div>
        </div>
        
        <div 
          className={`p-4 ${currentPlayer === 'tiger' && !winner ? 'bg-blue-50 dark:bg-blue-900/30 border-b-2 border-blue-500' : ''}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-game-tiger grid place-items-center text-white">
                <span className="text-xs">♚</span>
              </div>
              <div>
                <p className="font-bold text-gray-800 dark:text-gray-200">Tigers</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Need 5 captures</p>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-gray-400 dark:text-gray-500 mr-1" />
              <span className="text-sm text-gray-600 dark:text-gray-300">{formatTime(tigerTime)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Game status */}
      <div className="p-4 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
        <div className="text-center">
          <h3 className="text-lg font-bold mb-1 dark:text-white">
            {winner 
              ? `${winner === 'tiger' ? 'Tigers' : 'Goats'} win!` 
              : `Current Turn: ${currentPlayer === 'tiger' ? 'Tigers' : 'Goats'}`}
          </h3>
          
          {aiThinking && (
            <p className="text-sm text-primary animate-pulse dark:text-amber-400">AI is thinking...</p>
          )}
        </div>
      </div>

      {/* Game controls */}
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="game-mode" className="text-sm font-medium dark:text-white">Game Mode:</Label>
          <div className="flex items-center space-x-4">
            <Label htmlFor="human-vs-human" className={`text-xs cursor-pointer ${gameMode === 'human-vs-human' ? 'font-bold text-primary dark:text-amber-400' : 'text-gray-500 dark:text-gray-400'}`}>
              Human vs Human
            </Label>
            <Switch 
              id="game-mode" 
              checked={gameMode !== 'human-vs-human'} 
              onCheckedChange={(checked) => onModeChange(checked ? 'human-vs-ai' : 'human-vs-human')}
            />
            <Label htmlFor="human-vs-ai" className={`text-xs cursor-pointer ${gameMode === 'human-vs-ai' ? 'font-bold text-primary dark:text-amber-400' : 'text-gray-500 dark:text-gray-400'}`}>
              Human vs AI
            </Label>
          </div>
        </div>

        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={onReset}
            className="flex items-center space-x-1 dark:text-white dark:border-amber-700 dark:hover:bg-amber-900/30"
          >
            <RotateCcw className="w-4 h-4" />
            <span>New Game</span>
          </Button>
          
          <Button 
            onClick={onAIMove}
            disabled={!isAITurn || aiThinking || !!winner}
            className={isAITurn && !winner ? "bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700" : "bg-gray-300 dark:bg-gray-700"}
          >
            <Play className="w-4 h-4 mr-1" />
            {aiThinking ? "Thinking..." : "AI Move"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameControls;

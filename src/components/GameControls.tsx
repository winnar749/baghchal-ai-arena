
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
  aiThinking
}) => {
  const isHumanTurn = gameMode === 'human-vs-ai' && currentPlayer === 'goat';
  const isAITurn = (gameMode === 'human-vs-ai' && currentPlayer === 'tiger') || gameMode === 'ai-vs-ai';

  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
      {/* Player info */}
      <div className="grid grid-cols-2">
        <div 
          className={`p-4 ${currentPlayer === 'goat' && !winner ? 'bg-blue-50 border-b-2 border-blue-500' : ''}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-game-goat grid place-items-center text-white">
                <span className="text-xs">♟</span>
              </div>
              <div>
                <p className="font-bold text-gray-800">Goats</p>
                <p className="text-xs text-gray-500">Placed: {placedGoats}/20</p>
              </div>
            </div>
            <div className="bg-gray-100 px-2 py-1 rounded text-sm">
              {capturedGoats}/5
            </div>
          </div>
        </div>
        
        <div 
          className={`p-4 ${currentPlayer === 'tiger' && !winner ? 'bg-blue-50 border-b-2 border-blue-500' : ''}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-game-tiger grid place-items-center text-white">
                <span className="text-xs">♚</span>
              </div>
              <div>
                <p className="font-bold text-gray-800">Tigers</p>
                <p className="text-xs text-gray-500">Need 5 captures</p>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-gray-400 mr-1" />
              <span className="text-sm text-gray-600">∞</span>
            </div>
          </div>
        </div>
      </div>

      {/* Game status */}
      <div className="p-4 bg-gray-50 border-y border-gray-200">
        <div className="text-center">
          <h3 className="text-lg font-bold mb-1">
            {winner 
              ? `${winner === 'tiger' ? 'Tigers' : 'Goats'} win!` 
              : `Current Turn: ${currentPlayer === 'tiger' ? 'Tigers' : 'Goats'}`}
          </h3>
          
          {aiThinking && (
            <p className="text-sm text-primary animate-pulse">AI is thinking...</p>
          )}
        </div>
      </div>

      {/* Game controls */}
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="game-mode" className="text-sm font-medium">Game Mode:</Label>
          <div className="flex items-center space-x-4">
            <Label htmlFor="human-vs-human" className={`text-xs cursor-pointer ${gameMode === 'human-vs-human' ? 'font-bold text-primary' : 'text-gray-500'}`}>
              Human vs Human
            </Label>
            <Switch 
              id="game-mode" 
              checked={gameMode !== 'human-vs-human'} 
              onCheckedChange={(checked) => onModeChange(checked ? 'human-vs-ai' : 'human-vs-human')}
            />
            <Label htmlFor="human-vs-ai" className={`text-xs cursor-pointer ${gameMode === 'human-vs-ai' ? 'font-bold text-primary' : 'text-gray-500'}`}>
              Human vs AI
            </Label>
          </div>
        </div>

        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={onReset}
            className="flex items-center space-x-1"
          >
            <RotateCcw className="w-4 h-4" />
            <span>New Game</span>
          </Button>
          
          <Button 
            onClick={onAIMove}
            disabled={!isAITurn || aiThinking || !!winner}
            className={isAITurn && !winner ? "bg-primary hover:bg-primary/90" : "bg-gray-300"}
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

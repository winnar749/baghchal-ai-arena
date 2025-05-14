
import React from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { GameMode } from '@/types/game';

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
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className={`p-3 rounded-md ${currentPlayer === 'goat' ? 'bg-game-goat/20 ring-2 ring-game-goat' : 'bg-gray-100'}`}>
          <h3 className="text-lg font-semibold">Goats</h3>
          <p className="text-sm text-gray-500">Placed: {placedGoats}/20</p>
        </div>
        <div className={`p-3 rounded-md ${currentPlayer === 'tiger' ? 'bg-game-tiger/20 ring-2 ring-game-tiger' : 'bg-gray-100'}`}>
          <h3 className="text-lg font-semibold">Tigers</h3>
          <p className="text-sm text-gray-500">Captures: {capturedGoats}/5</p>
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-lg font-bold mb-2">
          {winner 
            ? `${winner === 'tiger' ? 'Tigers' : 'Goats'} win!` 
            : `Current Turn: ${currentPlayer === 'tiger' ? 'Tigers' : 'Goats'}`}
        </h3>
        
        {aiThinking && (
          <p className="text-sm text-primary animate-pulse">AI is thinking...</p>
        )}
      </div>

      <div className="space-y-4">
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
          >
            Reset Game
          </Button>
          
          <Button 
            onClick={onAIMove}
            disabled={!isAITurn || aiThinking || !!winner}
            className={isAITurn && !winner ? "bg-primary" : "bg-gray-300"}
          >
            {aiThinking ? "AI Thinking..." : "Make AI Move"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameControls;

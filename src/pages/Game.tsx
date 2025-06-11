
import React from 'react';
import GameBoard from '@/components/GameBoard';
import GameControls from '@/components/GameControls';
import { useBaghchalGame } from '@/hooks/useBaghchalGame';
import { GameMode } from '@/types/game';
import { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/use-theme';

const Game: React.FC = () => {
  const { 
    gameState, 
    resetGame, 
    handleIntersectionClick, 
    getValidMovesForSelected,
    makeAIMove 
  } = useBaghchalGame();
  
  const [gameMode, setGameMode] = useState<GameMode>('human-vs-human');
  const validMoves = getValidMovesForSelected();
  const { theme, setTheme } = useTheme();
  
  // Handle AI moves automatically when it's AI's turn
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (!gameState.winner && 
        ((gameMode === 'human-vs-ai' && gameState.currentPlayer === 'tiger') || 
         gameMode === 'ai-vs-ai')) {
      timeoutId = setTimeout(() => {
        makeAIMove();
      }, 500);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [gameState.currentPlayer, gameState.winner, gameMode, makeAIMove]);
  
  const handleModeChange = (mode: GameMode) => {
    setGameMode(mode);
    resetGame();
  };
  
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-neutral-700">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold text-orange-400">BaghChal</h1>
          <span className="text-xs bg-neutral-700 px-2 py-1 rounded">AI</span>
        </div>
        
        <nav className="flex items-center space-x-6">
          <a href="#" className="text-neutral-300 hover:text-white text-sm">Home</a>
          <a href="#" className="text-white font-medium text-sm">Play</a>
          <a href="#" className="text-neutral-300 hover:text-white text-sm">Learn</a>
          <a href="#" className="text-neutral-300 hover:text-white text-sm">About</a>
        </nav>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-sm"
            aria-label="Toggle theme"
          >
            🌙
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium text-sm">
            Play Now
          </button>
        </div>
      </header>

      {/* Game Mode Toggle */}
      <div className="flex justify-center py-4">
        <div className="flex items-center bg-neutral-800 rounded-full p-1">
          <button
            onClick={() => handleModeChange('human-vs-human')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-colors text-sm ${
              gameMode === 'human-vs-human' 
                ? 'bg-neutral-600 text-white' 
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <span>👤</span>
            <span>Human vs Human</span>
          </button>
          <button
            onClick={() => handleModeChange('human-vs-ai')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-colors text-sm ${
              gameMode === 'human-vs-ai' 
                ? 'bg-orange-500 text-white' 
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <span>👤</span>
            <span>Human vs AI</span>
          </button>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex justify-center px-6 pb-6">
        <div className="flex gap-6 max-w-6xl w-full">
          {/* Left Sidebar - Reduced width */}
          <div className="w-64 space-y-4">
            {/* AI Info */}
            <div className="bg-neutral-800 rounded-lg p-4">
              <h3 className="text-base font-semibold mb-3">AI (dqn)</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <span className="text-sm">Tigers</span>
                  </div>
                  <span className="text-neutral-400 text-xs">⏱ {Math.floor(gameState.tigerTime / 60)}:{(gameState.tigerTime % 60).toString().padStart(2, '0')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-sm">Goats</span>
                  </div>
                  <span className="text-neutral-400 text-xs">⏱ {Math.floor(gameState.goatTime / 60)}:{(gameState.goatTime % 60).toString().padStart(2, '0')}</span>
                </div>
              </div>
            </div>

            {/* Game Status */}
            <div className="bg-neutral-800 rounded-lg p-4">
              <h3 className="text-base font-semibold mb-2">
                {gameState.phase === 'placing' ? 'Goats Turn - Placement' : `${gameState.currentPlayer === 'tiger' ? 'Tigers' : 'Goats'} Turn`}
              </h3>
              <p className="text-neutral-400 text-xs">
                ({gameState.placedGoats}/20)
              </p>
            </div>

            {/* Game Statistics */}
            <div className="bg-neutral-800 rounded-lg p-4">
              <h3 className="text-base font-semibold mb-3">Game Statistics</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Goats Placed:</span>
                  <span>{gameState.placedGoats}/20</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Goats Captured:</span>
                  <span>{gameState.capturedGoats}/5</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Phase:</span>
                  <span>{gameState.phase}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Moves Made:</span>
                  <span>0</span>
                </div>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button className="bg-neutral-700 hover:bg-neutral-600 text-white px-3 py-2 rounded-lg text-sm">
                Undo
              </button>
              <button className="bg-neutral-700 hover:bg-neutral-600 text-white px-3 py-2 rounded-lg text-sm">
                Pause
              </button>
              <button className="bg-neutral-700 hover:bg-neutral-600 text-white px-3 py-2 rounded-lg text-sm">
                Settings
              </button>
              <button 
                onClick={resetGame}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm"
              >
                Reset
              </button>
              <button className="bg-neutral-700 hover:bg-neutral-600 text-white px-3 py-2 rounded-lg text-sm col-span-2">
                Share
              </button>
            </div>
          </div>

          {/* Game Board - Reduced padding */}
          <div className="flex-1 flex justify-center items-center">
            <div className="bg-amber-100 p-4 rounded-lg">
              <GameBoard 
                board={gameState.board}
                selectedPosition={gameState.selectedPosition}
                validMoves={validMoves}
                lastMove={gameState.lastMove}
                onIntersectionClick={handleIntersectionClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;

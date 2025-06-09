
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
      <header className="flex items-center justify-between px-8 py-4 border-b border-neutral-700">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-orange-400">BaghChal</h1>
          <span className="text-sm bg-neutral-700 px-2 py-1 rounded">AI</span>
        </div>
        
        <nav className="flex items-center space-x-8">
          <a href="#" className="text-neutral-300 hover:text-white">Home</a>
          <a href="#" className="text-white font-medium">Play</a>
          <a href="#" className="text-neutral-300 hover:text-white">Learn</a>
          <a href="#" className="text-neutral-300 hover:text-white">About</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg bg-neutral-700 hover:bg-neutral-600"
            aria-label="Toggle theme"
          >
            🌙
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium">
            Play Now
          </button>
        </div>
      </header>

      {/* Game Mode Toggle */}
      <div className="flex justify-center py-6">
        <div className="flex items-center bg-neutral-800 rounded-full p-1">
          <button
            onClick={() => handleModeChange('human-vs-human')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
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
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
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
      <div className="flex justify-center px-8 pb-8">
        <div className="flex gap-8 max-w-7xl w-full">
          {/* Left Sidebar */}
          <div className="w-80 space-y-6">
            {/* AI Info */}
            <div className="bg-neutral-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">AI (dqn)</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span>Tigers</span>
                  </div>
                  <span className="text-neutral-400">⏱ {Math.floor(gameState.tigerTime / 60)}:{(gameState.tigerTime % 60).toString().padStart(2, '0')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span>Goats</span>
                  </div>
                  <span className="text-neutral-400">⏱ {Math.floor(gameState.goatTime / 60)}:{(gameState.goatTime % 60).toString().padStart(2, '0')}</span>
                </div>
              </div>
            </div>

            {/* Game Status */}
            <div className="bg-neutral-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">
                {gameState.phase === 'placing' ? 'Goats Turn - Placement' : `${gameState.currentPlayer === 'tiger' ? 'Tigers' : 'Goats'} Turn`}
              </h3>
              <p className="text-neutral-400 text-sm">
                ({gameState.placedGoats}/20)
              </p>
            </div>

            {/* Game Statistics */}
            <div className="bg-neutral-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Game Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Goats Placed:</span>
                  <span>{gameState.placedGoats}/20</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Goats Captured:</span>
                  <span>{gameState.capturedGoats}/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Phase:</span>
                  <span>{gameState.phase}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Moves Made:</span>
                  <span>0</span>
                </div>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded-lg">
                Undo
              </button>
              <button className="bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded-lg">
                Pause
              </button>
              <button className="bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded-lg">
                Settings
              </button>
              <button 
                onClick={resetGame}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                Reset
              </button>
              <button className="bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded-lg">
                Share
              </button>
            </div>
          </div>

          {/* Game Board */}
          <div className="flex-1 flex justify-center items-center">
            <div className="bg-amber-100 p-8 rounded-lg">
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

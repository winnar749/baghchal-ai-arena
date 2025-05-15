
import React from 'react';
import Header from '@/components/Header';
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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 flex flex-col">
      <Header />
      
      <div className="px-4 py-2 flex justify-end">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setTheme('light')}
            className={`p-2 rounded-md ${theme === 'light' ? 'bg-white text-amber-900 shadow' : 'bg-amber-100 text-amber-600'}`}
            aria-label="Use light theme"
          >
            ☀️
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={`p-2 rounded-md ${theme === 'dark' ? 'bg-amber-950 text-amber-300 shadow' : 'bg-amber-100 text-amber-600'}`}
            aria-label="Use dark theme"
          >
            🌙
          </button>
        </div>
      </div>
      
      <main className="flex-1 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2 items-start">
            <div className="order-2 md:order-1 space-y-6">
              <GameControls 
                currentPlayer={gameState.currentPlayer}
                placedGoats={gameState.placedGoats}
                capturedGoats={gameState.capturedGoats}
                winner={gameState.winner}
                onReset={resetGame}
                onAIMove={makeAIMove}
                gameMode={gameMode}
                onModeChange={handleModeChange}
                aiThinking={gameState.aiThinking}
              />
              
              <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border border-amber-100 dark:border-amber-800">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <div className="h-5 w-1 bg-amber-500 dark:bg-amber-400 mr-2"></div>
                  Game Status
                </h3>
                
                {gameState.phase === 'placing' && gameState.currentPlayer === 'goat' && (
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md text-sm border-l-4 border-blue-500">
                    <p className="font-medium dark:text-white">Goat placement phase</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">Place your goat on any empty intersection</p>
                  </div>
                )}
                
                {gameState.selectedPosition && (
                  <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-md text-sm border-l-4 border-green-500 mt-3">
                    <p className="font-medium dark:text-white">Piece selected!</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">Click on a highlighted point to move</p>
                  </div>
                )}
                
                {gameState.winner && (
                  <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-md text-sm border-l-4 border-amber-500 mt-3">
                    <p className="font-medium text-center dark:text-white">
                      {gameState.winner === 'tiger' ? '🐯 Tigers win!' : '🐐 Goats win!'}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 text-center">
                      {gameState.winner === 'tiger' 
                        ? 'Tigers captured 5 goats!' 
                        : 'Tigers have no valid moves left!'}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border border-amber-100 dark:border-amber-800">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <div className="h-5 w-1 bg-amber-500 dark:bg-amber-400 mr-2"></div>
                  Reinforcement Learning
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  This implementation will integrate reinforcement learning to develop intelligent playing strategies.
                </p>
                <div className="mt-4 h-24 bg-amber-50 dark:bg-amber-900/30 rounded-md flex items-center justify-center border border-amber-200 dark:border-amber-700">
                  <div className="text-center">
                    <p className="text-amber-500 dark:text-amber-400 text-sm">RL visualization</p>
                    <p className="text-xs text-amber-400 dark:text-amber-300 mt-1">Coming soon</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2 flex justify-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-amber-100 dark:border-amber-800">
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
      </main>
      
      <footer className="py-4 px-6 text-center text-sm text-amber-100 bg-amber-900 dark:bg-amber-800">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <p>Baghchal Game with Reinforcement Learning</p>
          <p>&copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Game;


import React from 'react';
import Header from '@/components/Header';
import GameBoard from '@/components/GameBoard';
import GameControls from '@/components/GameControls';
import { useBaghchalGame } from '@/hooks/useBaghchalGame';
import { GameMode } from '@/types/game';
import { useState, useEffect } from 'react';

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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 flex flex-col">
      <Header />
      
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
              
              <div className="bg-white p-5 rounded-lg shadow-md border border-amber-100">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <div className="h-5 w-1 bg-amber-500 mr-2"></div>
                  Game Status
                </h3>
                
                {gameState.phase === 'placing' && gameState.currentPlayer === 'goat' && (
                  <div className="p-3 bg-blue-50 rounded-md text-sm border-l-4 border-blue-500">
                    <p className="font-medium">Goat placement phase</p>
                    <p className="text-xs text-gray-600 mt-1">Place your goat on any empty intersection</p>
                  </div>
                )}
                
                {gameState.selectedPosition && (
                  <div className="p-3 bg-green-50 rounded-md text-sm border-l-4 border-green-500 mt-3">
                    <p className="font-medium">Piece selected!</p>
                    <p className="text-xs text-gray-600 mt-1">Click on a highlighted point to move</p>
                  </div>
                )}
                
                {gameState.winner && (
                  <div className="p-3 bg-amber-50 rounded-md text-sm border-l-4 border-amber-500 mt-3">
                    <p className="font-medium text-center">
                      {gameState.winner === 'tiger' ? '🐯 Tigers win!' : '🐐 Goats win!'}
                    </p>
                    <p className="text-xs text-gray-600 mt-1 text-center">
                      {gameState.winner === 'tiger' 
                        ? 'Tigers captured 5 goats!' 
                        : 'Tigers have no valid moves left!'}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-md border border-amber-100">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <div className="h-5 w-1 bg-amber-500 mr-2"></div>
                  Reinforcement Learning
                </h3>
                <p className="text-sm text-gray-600">
                  This implementation will integrate reinforcement learning to develop intelligent playing strategies.
                </p>
                <div className="mt-4 h-24 bg-amber-50 rounded-md flex items-center justify-center border border-amber-200">
                  <div className="text-center">
                    <p className="text-amber-500 text-sm">RL visualization</p>
                    <p className="text-xs text-amber-400 mt-1">Coming soon</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2 flex justify-center p-6 bg-white rounded-lg shadow-md border border-amber-100">
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
      
      <footer className="py-4 px-6 text-center text-sm text-amber-100 bg-amber-900">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <p>Baghchal Game with Reinforcement Learning</p>
          <p>&copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Game;

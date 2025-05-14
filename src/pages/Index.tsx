
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import GameBoard from '@/components/GameBoard';
import GameControls from '@/components/GameControls';
import { useBaghchalGame } from '@/hooks/useBaghchalGame';
import { GameMode } from '@/types/game';

const Index: React.FC = () => {
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
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-50 flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">
            Baghchal with Reinforcement Learning
          </h2>
          
          <div className="grid gap-8 md:grid-cols-2 items-start">
            <div className="order-2 md:order-1">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Game Status</h3>
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
                
                {gameState.phase === 'placing' && gameState.currentPlayer === 'goat' && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-md text-sm">
                    <p>Goat placement phase: Place your goat on any empty intersection</p>
                  </div>
                )}
                
                {gameState.selectedPosition && (
                  <div className="mt-4 p-3 bg-green-50 rounded-md text-sm">
                    <p>Piece selected! Click on a highlighted point to move</p>
                  </div>
                )}
                
                {gameState.winner && (
                  <div className="mt-4 p-3 bg-yellow-50 rounded-md text-center">
                    <p className="font-bold text-lg">
                      {gameState.winner === 'tiger' ? '🐯 Tigers win!' : '🐐 Goats win!'}
                    </p>
                    <p className="text-sm mt-2">
                      {gameState.winner === 'tiger' 
                        ? 'Tigers captured 5 goats!' 
                        : 'Tigers have no valid moves left!'}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Reinforcement Learning</h3>
                <p className="text-sm text-gray-600">
                  This implementation will be enhanced with reinforcement learning to develop intelligent playing strategies. Stay tuned for updates!
                </p>
                <div className="mt-4 h-20 bg-gray-100 rounded-md flex items-center justify-center">
                  <p className="text-gray-500">RL visualization coming soon</p>
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2 flex justify-center">
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
      
      <footer className="py-4 text-center text-sm text-gray-500 mt-auto">
        <p>Baghchal Game with Reinforcement Learning &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Index;

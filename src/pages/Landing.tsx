
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#312E2B] to-[#1A1F2C] flex flex-col">
      <header className="w-full py-3 px-6 bg-[#312E2B]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-md bg-game-tiger grid place-items-center text-white">
              <span className="text-lg font-bold">♚</span>
            </div>
            <h1 className="text-2xl font-bold text-white">
              Baghchal<span className="text-game-tiger">.com</span>
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="max-w-4xl w-full text-center space-y-10">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Play <span className="text-game-tiger">Baghchal</span> with AI
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the traditional Nepali board game enhanced with reinforcement learning. Tigers vs Goats - who will win?
            </p>
          </div>

          <div className="relative mx-auto">
            <AspectRatio ratio={16/9} className="w-full max-w-3xl bg-[#8CA2AD]/80 rounded-lg shadow-xl overflow-hidden border border-white/10">
              <div className="absolute inset-0 grid place-items-center">
                <div className="relative w-3/4 md:w-1/2 aspect-square">
                  <div className="absolute w-full h-full bg-game-board rounded-lg shadow-xl border border-game-line/50">
                    {/* Horizontal lines */}
                    {[0, 1, 2, 3, 4].map(row => (
                      <div 
                        key={`h-line-${row}`} 
                        className="absolute bg-game-line h-[2px] w-full" 
                        style={{top: `${row * 25}%`}}
                      />
                    ))}
                    
                    {/* Vertical lines */}
                    {[0, 1, 2, 3, 4].map(col => (
                      <div 
                        key={`v-line-${col}`} 
                        className="absolute bg-game-line w-[2px] h-full" 
                        style={{left: `${col * 25}%`}}
                      />
                    ))}
                    
                    {/* Diagonal lines */}
                    <div className="absolute bg-game-line w-[2px] h-[141%] origin-top-left rotate-45" />
                    <div className="absolute bg-game-line w-[2px] h-[141%] origin-top-right right-0 -rotate-45" />
                    
                    {/* Sample pieces */}
                    <div className="absolute w-8 h-8 bg-game-tiger rounded-full border-2 border-white shadow-md"
                         style={{top: '0%', left: '0%', transform: 'translate(-50%, -50%)'}}>
                      <span className="text-xs text-white flex h-full items-center justify-center">♚</span>
                    </div>
                    <div className="absolute w-8 h-8 bg-game-tiger rounded-full border-2 border-white shadow-md"
                         style={{top: '0%', left: '100%', transform: 'translate(-50%, -50%)'}}>
                      <span className="text-xs text-white flex h-full items-center justify-center">♚</span>
                    </div>
                    <div className="absolute w-8 h-8 bg-game-goat rounded-full border-2 border-white shadow-md"
                         style={{top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                      <span className="text-xs text-white flex h-full items-center justify-center">♟</span>
                    </div>
                  </div>
                </div>
              </div>
            </AspectRatio>
          </div>

          <div className="flex flex-col items-center space-y-6">
            <Link to="/game">
              <Button size="lg" className="text-lg px-10 py-6 bg-game-tiger hover:bg-game-tiger/90">
                Play Game
              </Button>
            </Link>
            <p className="text-gray-400 text-sm">
              Play against our AI or challenge a friend
            </p>
          </div>
        </div>
      </main>

      <footer className="py-4 px-6 text-center text-sm text-gray-500 bg-[#312E2B] text-gray-300">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <p>Baghchal Game with Reinforcement Learning</p>
          <p>&copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

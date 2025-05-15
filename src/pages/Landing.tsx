
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 flex flex-col">
      <header className="w-full py-3 px-6 bg-amber-900 text-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-md bg-gradient-to-br from-amber-500 to-orange-600 grid place-items-center text-white">
              <span className="text-lg font-bold">🐯</span>
            </div>
            <h1 className="text-2xl font-bold text-white">
              Baghchal<span className="text-amber-400">.com</span>
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full text-center space-y-12">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-amber-900">
              Play <span className="text-orange-500">Baghchal</span> Online
            </h1>
            <p className="text-xl text-amber-800 max-w-2xl mx-auto">
              Experience the traditional Nepali board game with beautiful graphics. Tigers vs Goats - strategy meets tradition!
            </p>
          </div>

          <div className="relative mx-auto">
            <AspectRatio ratio={16/9} className="w-full max-w-3xl bg-amber-50/80 rounded-lg shadow-xl overflow-hidden border border-amber-200">
              <div className="absolute inset-0 grid place-items-center">
                <div className="relative w-3/4 md:w-1/2 aspect-square">
                  {/* Traditional Baghchal Board */}
                  <div className="absolute w-full h-full bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg shadow-xl border border-amber-600/30">
                    {/* Background pattern for traditional look */}
                    <div className="absolute inset-0">
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMCAwaDIwdjIwSDB6IiBmaWxsPSIjZjhmM2UzIiBvcGFjaXR5PSIuMiIvPjxwYXRoIGQ9Ik0yMCAwaDIwdjIwSDIweiIgZmlsbD0iI2Y1ZGViYiIgb3BhY2l0eT0iLjIiLz48cGF0aCBkPSJNMCAyMGgyMHYyMEgweiIgZmlsbD0iI2Y1ZGViYiIgb3BhY2l0eT0iLjIiLz48cGF0aCBkPSJNMjAgMjBoMjB2MjBIMjB6IiBmaWxsPSIjZjhmM2UzIiBvcGFjaXR5PSIuMiIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
                    </div>
                    
                    {/* Horizontal lines */}
                    {[0, 1, 2, 3, 4].map(row => (
                      <div 
                        key={`h-line-${row}`} 
                        className="absolute bg-amber-900 h-[2px] w-full" 
                        style={{top: `${row * 25}%`}}
                      />
                    ))}
                    
                    {/* Vertical lines */}
                    {[0, 1, 2, 3, 4].map(col => (
                      <div 
                        key={`v-line-${col}`} 
                        className="absolute bg-amber-900 w-[2px] h-full" 
                        style={{left: `${col * 25}%`}}
                      />
                    ))}
                    
                    {/* Diagonal lines */}
                    <div className="absolute bg-amber-900 h-[2px] w-[141%] origin-top-left rotate-45" />
                    <div className="absolute bg-amber-900 h-[2px] w-[141%] origin-top-right right-0 -rotate-45" />
                    
                    {/* Intersection dots */}
                    {[0, 25, 50, 75, 100].map(percentY => (
                      [0, 25, 50, 75, 100].map(percentX => (
                        <div 
                          key={`dot-${percentY}-${percentX}`}
                          className="absolute w-2.5 h-2.5 rounded-full bg-amber-900 border border-amber-600"
                          style={{top: `${percentY}%`, left: `${percentX}%`, transform: 'translate(-50%, -50%)'}}
                        />
                      ))
                    ))}
                    
                    {/* Sample pieces */}
                    <div className="absolute w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full border-2 border-amber-300 shadow-md"
                         style={{top: '0%', left: '0%', transform: 'translate(-50%, -50%)'}}>
                      <span className="text-xs text-white flex h-full items-center justify-center">🐯</span>
                    </div>
                    <div className="absolute w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full border-2 border-amber-300 shadow-md"
                         style={{top: '0%', left: '100%', transform: 'translate(-50%, -50%)'}}>
                      <span className="text-xs text-white flex h-full items-center justify-center">🐯</span>
                    </div>
                    <div className="absolute w-8 h-8 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full border-2 border-slate-400 shadow-md"
                         style={{top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                      <span className="text-xs text-white flex h-full items-center justify-center">🐐</span>
                    </div>
                  </div>
                </div>
              </div>
            </AspectRatio>
          </div>

          <div className="flex flex-col items-center space-y-6">
            <Link to="/game">
              <Button size="lg" className="text-lg px-10 py-6 bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-lg border border-amber-300">
                Play Game
              </Button>
            </Link>
            <p className="text-amber-700 text-sm">
              Play against our AI or challenge a friend
            </p>
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

export default Landing;

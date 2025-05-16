
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useTheme } from '@/hooks/use-theme';

const Landing: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      <header className="w-full py-3 px-6 bg-amber-900 dark:bg-amber-800 text-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-md bg-gradient-to-br from-amber-500 to-orange-600 grid place-items-center text-white">
              <span className="text-lg font-bold">🐯</span>
            </div>
            <h1 className="text-2xl font-bold text-white">
              Baghchal<span className="text-amber-400">.</span>
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setTheme('light')}
              className={`p-2 rounded-md ${theme === 'light' ? 'bg-white text-amber-900' : 'bg-amber-800 text-amber-200'}`}
              aria-label="Use light theme"
            >
              ☀️
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`p-2 rounded-md ${theme === 'dark' ? 'bg-black text-amber-300' : 'bg-amber-800 text-amber-200'}`}
              aria-label="Use dark theme"
            >
              🌙
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 bg-white dark:bg-black">
        <div className="max-w-4xl w-full text-center space-y-12">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-amber-900 dark:text-amber-100">
              Play <span className="text-orange-500 dark:text-orange-400">Baghchal</span> Online
            </h1>
            <p className="text-xl text-amber-800 dark:text-amber-200 max-w-2xl mx-auto">
              Experience the traditional Nepali board game with beautiful graphics. Tigers vs Goats - strategy meets tradition!
            </p>
          </div>

          <div className="flex justify-center w-full">
            <AspectRatio ratio={1/1} className="w-full max-w-md bg-white dark:bg-black rounded-lg shadow-xl overflow-hidden border border-amber-200 dark:border-amber-700">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="relative w-full max-w-full aspect-square">
                  {/* Traditional Baghchal Board */}
                  <div className="absolute w-full h-full bg-white dark:bg-black border border-amber-600/30 dark:border-amber-500/50">
                    {/* Background pattern for traditional look */}
                    <div className="absolute inset-0">
                      <div className="absolute inset-0 opacity-5 dark:opacity-10"></div>
                    </div>
                    
                    {/* Horizontal lines */}
                    {[0, 1, 2, 3, 4].map(row => (
                      <div 
                        key={`h-line-${row}`} 
                        className="absolute bg-amber-900 dark:bg-amber-400 h-[2px] w-full" 
                        style={{top: `${row * 25}%`}}
                      />
                    ))}
                    
                    {/* Vertical lines */}
                    {[0, 1, 2, 3, 4].map(col => (
                      <div 
                        key={`v-line-${col}`} 
                        className="absolute bg-amber-900 dark:bg-amber-400 w-[2px] h-full" 
                        style={{left: `${col * 25}%`}}
                      />
                    ))}
                    
                    {/* Traditional diagonal lines */}
                    {/* Full diagonals through center */}
                    <div className="absolute bg-amber-900 dark:bg-amber-400 h-[2px] w-[141.4%] origin-center rotate-45" 
                         style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(45deg)' }} />
                    <div className="absolute bg-amber-900 dark:bg-amber-400 h-[2px] w-[141.4%] origin-center -rotate-45" 
                         style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-45deg)' }} />
                         
                    {/* Half diagonals from corners to center */}
                    <div className="absolute bg-amber-900 dark:bg-amber-400 h-[2px] w-[70.7%] origin-top-left rotate-45" 
                         style={{ top: 0, left: 0 }} />
                    <div className="absolute bg-amber-900 dark:bg-amber-400 h-[2px] w-[70.7%] origin-top-right -rotate-45" 
                         style={{ top: 0, right: 0 }} />
                    <div className="absolute bg-amber-900 dark:bg-amber-400 h-[2px] w-[70.7%] origin-bottom-left -rotate-45" 
                         style={{ bottom: 0, left: 0 }} />
                    <div className="absolute bg-amber-900 dark:bg-amber-400 h-[2px] w-[70.7%] origin-bottom-right rotate-45" 
                         style={{ bottom: 0, right: 0 }} />
                    
                    {/* Half diagonals from middle edge points to center */}
                    <div className="absolute bg-amber-900 dark:bg-amber-400 h-[2px] w-[70.7%] origin-center" 
                         style={{ top: 0, left: '50%', transform: 'translateX(-50%) rotate(45deg)', transformOrigin: 'bottom', width: '70.7%' }} />
                    <div className="absolute bg-amber-900 dark:bg-amber-400 h-[2px] w-[70.7%] origin-center" 
                         style={{ top: 0, left: '50%', transform: 'translateX(-50%) rotate(-45deg)', transformOrigin: 'bottom', width: '70.7%' }} />
                    <div className="absolute bg-amber-900 dark:bg-amber-400 h-[2px] w-[70.7%] origin-center" 
                         style={{ top: '50%', left: 0, transform: 'translateY(-50%) rotate(45deg)', transformOrigin: 'left', width: '70.7%' }} />
                    <div className="absolute bg-amber-900 dark:bg-amber-400 h-[2px] w-[70.7%] origin-center" 
                         style={{ top: '50%', left: 0, transform: 'translateY(-50%) rotate(-45deg)', transformOrigin: 'left', width: '70.7%' }} />
                    <div className="absolute bg-amber-900 dark:bg-amber-400 h-[2px] w-[70.7%] origin-center" 
                         style={{ top: '50%', right: 0, transform: 'translateY(-50%) rotate(45deg)', transformOrigin: 'right', width: '70.7%' }} />
                    <div className="absolute bg-amber-900 dark:bg-amber-400 h-[2px] w-[70.7%] origin-center" 
                         style={{ top: '50%', right: 0, transform: 'translateY(-50%) rotate(-45deg)', transformOrigin: 'right', width: '70.7%' }} />
                    <div className="absolute bg-amber-900 dark:bg-amber-400 h-[2px] w-[70.7%] origin-center" 
                         style={{ bottom: 0, left: '50%', transform: 'translateX(-50%) rotate(45deg)', transformOrigin: 'top', width: '70.7%' }} />
                    <div className="absolute bg-amber-900 dark:bg-amber-400 h-[2px] w-[70.7%] origin-center" 
                         style={{ bottom: 0, left: '50%', transform: 'translateX(-50%) rotate(-45deg)', transformOrigin: 'top', width: '70.7%' }} />
                    
                    {/* Intersection dots */}
                    {[0, 25, 50, 75, 100].map(percentY => (
                      [0, 25, 50, 75, 100].map(percentX => (
                        <div 
                          key={`dot-${percentY}-${percentX}`}
                          className="absolute w-2.5 h-2.5 rounded-full bg-amber-900 dark:bg-amber-400 border border-amber-600 dark:border-amber-500"
                          style={{top: `${percentY}%`, left: `${percentX}%`, transform: 'translate(-50%, -50%)'}}
                        />
                      ))
                    ))}
                    
                    {/* Sample pieces */}
                    <div className="absolute w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 dark:from-amber-400 dark:to-orange-500 rounded-full border-2 border-amber-300 dark:border-amber-200 shadow-md"
                         style={{top: '0%', left: '0%', transform: 'translate(-50%, -50%)'}}>
                      <span className="text-xs text-white flex h-full items-center justify-center">🐯</span>
                    </div>
                    <div className="absolute w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 dark:from-amber-400 dark:to-orange-500 rounded-full border-2 border-amber-300 dark:border-amber-200 shadow-md"
                         style={{top: '0%', left: '100%', transform: 'translate(-50%, -50%)'}}>
                      <span className="text-xs text-white flex h-full items-center justify-center">🐯</span>
                    </div>
                    <div className="absolute w-8 h-8 bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-600 dark:to-slate-800 rounded-full border-2 border-slate-400 dark:border-slate-300 shadow-md"
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
              <Button size="lg" className="text-lg px-10 py-6 bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 dark:from-amber-400 dark:to-orange-500 dark:hover:from-amber-500 dark:hover:to-orange-600 shadow-lg border border-amber-300 dark:border-amber-200">
                Play Game
              </Button>
            </Link>
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              Play against our AI or challenge a friend
            </p>
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

export default Landing;

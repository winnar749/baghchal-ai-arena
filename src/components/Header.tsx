
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import RulesModal from './RulesModal';

const Header: React.FC = () => {
  const { toast } = useToast();

  const handleAboutClick = () => {
    toast({
      title: "About Baghchal",
      description: "A traditional Nepali board game with tigers and goats, enhanced by reinforcement learning.",
    });
  };

  return (
    <header className="w-full py-3 px-6 bg-[#312E2B] text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-md bg-game-tiger grid place-items-center text-white">
            <span className="text-lg font-bold">♚</span>
          </div>
          <h1 className="text-2xl font-bold">
            Baghchal<span className="text-game-tiger">.com</span>
          </h1>
        </div>
        
        <div className="flex items-center space-x-6">
          <button className="text-gray-300 hover:text-white transition-colors">Play</button>
          <button className="text-gray-300 hover:text-white transition-colors">Puzzles</button>
          <RulesModal />
          <button 
            onClick={handleAboutClick}
            className="text-gray-300 hover:text-white transition-colors"
          >
            About
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

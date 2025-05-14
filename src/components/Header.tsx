
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
    <header className="w-full py-4 px-6 bg-white shadow-sm">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-game-tiger grid place-items-center text-white">
            <span className="text-xs font-bold">T</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-game-tiger to-game-goat bg-clip-text text-transparent">
            Baghchal
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <RulesModal />
          <button 
            onClick={handleAboutClick}
            className="text-gray-600 hover:text-primary text-sm"
          >
            About
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

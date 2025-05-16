
import { useEffect, useRef } from 'react';
import { GameState } from '../types/game';

export function useGameTimer(
  gameState: GameState, 
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
) {
  const timerRef = useRef<number | null>(null);

  // Update timer every second
  useEffect(() => {
    // Don't run timer if game is over
    if (gameState.winner) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      return;
    }
    
    // Start the timer
    timerRef.current = window.setInterval(() => {
      setGameState(prevState => {
        const currentTime = Date.now();
        const elapsedTime = Math.floor((currentTime - prevState.turnStartTime) / 1000);
        
        // Update the time for the current player
        if (prevState.currentPlayer === 'tiger') {
          return {
            ...prevState,
            tigerTime: prevState.tigerTime + 1
          };
        } else {
          return {
            ...prevState,
            goatTime: prevState.goatTime + 1
          };
        }
      });
    }, 1000);
    
    // Cleanup timer on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameState.winner, setGameState]);

  // Function to update turn start time when player changes
  const updateTurnStartTime = () => {
    setGameState(prevState => ({
      ...prevState,
      turnStartTime: Date.now()
    }));
  };

  return { updateTurnStartTime };
}

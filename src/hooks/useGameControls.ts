import { useEffect } from 'react';
import type { Direction } from '../types/game.types';

interface UseGameControlsProps {
  onDirectionChange: (direction: Direction) => void;
  onStart: () => void;
  isPlaying: boolean;
  isGameOver: boolean;
}

export function useGameControls({
  onDirectionChange,
  onStart,
  isPlaying,
  isGameOver,
}: UseGameControlsProps) {
  useEffect(() => {
    let newDir: Direction | null = null;
    console.log('handling keys');

    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          newDir = { x: 0, y: -1 };
          break;

        case 'ArrowDown':
          event.preventDefault();
          newDir = { x: 0, y: 1 };
          break;

        case 'ArrowLeft':
          event.preventDefault();
          newDir = { x: -1, y: 0 };
          break;

        case 'ArrowRight':
          event.preventDefault();
          newDir = { x: 1, y: 0 };
          break;
        default:
          break;
      }

      if (!newDir) return;

      if (!isPlaying && !isGameOver) {
        onStart();
        console.log('after starting game');
        onDirectionChange(newDir);
        return;
      }

      if (isPlaying && !isGameOver) {
        onDirectionChange(newDir);
        return;
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onDirectionChange, isPlaying, isGameOver, onStart]);
}

import { useEffect, useRef, useState } from 'react';
import type { Direction } from '../../../types/game.types';
import './Gameboard.scss';

interface GameboardProps {
  gridSize: number;
  cellSize: number;
  isPlaying: boolean;
  direction: Direction;
}

interface Segment {
  x: number;
  y: number;
}

const GRID_SIZE = 15;
const CELL_SIZE = 30;
const GAME_SPEED = 150;

export function Gameboard({
  gridSize = GRID_SIZE,
  cellSize = CELL_SIZE,
  isPlaying,
  direction,
}: GameboardProps) {
  const [food, setFood] = useState<Segment>({
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize),
  });

  const [snake, setSnake] = useState<Segment[]>([
    { x: 4, y: 9 },
    { x: 5, y: 9 },
    { x: 6, y: 9 },
    { x: 7, y: 9 },
  ]);

  const generateFood = () => {
    return {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
  };

  const gameOver = () => {};

  let startTime = performance.now();
  let speedMultiplier = 1;
  let stepsTaken = 0;
  useEffect(() => {
    let frameId: number;
    const gameLoop = () => {
      if (!isPlaying) {
        return;
      }
      const currentTime = performance.now();

      const delta = currentTime - startTime;
      const adjustedSpeed = GAME_SPEED / speedMultiplier;
      const stepsShouldHaveTaken = Math.floor(delta / adjustedSpeed);

      if (stepsTaken !== stepsShouldHaveTaken) {
        setSnake((prevSnake) => {
          const head = prevSnake[prevSnake.length - 1];
          const newHead = {
            x: head.x + direction.x,
            y: head.y + direction.y,
          };

          if (
            newHead.x >= gridSize ||
            newHead.y >= gridSize ||
            newHead.x < 0 ||
            newHead.y < 0
          ) {
            gameOver();
            return prevSnake;
          }

          // if the new head collides with the snake's body, then game over
          if (
            prevSnake.some((seg) => {
              seg.x === newHead.x && seg.y === newHead.y;
            })
          ) {
            gameOver();
            return prevSnake;
          }

          let newSnake = [...prevSnake, newHead];
          let newFood = food;
          
          if (food.x === newHead.x && food.y === newHead.y) {
            while (
              newSnake.some((seg) => seg.x === newFood.x && seg.y === newFood.y)
            ) {
              newFood = generateFood();
            }

            setFood(newFood);
          } else {
            newSnake = [...prevSnake.slice(1), newHead];
          }

          return newSnake;
        });
        stepsTaken++;
      }
      frameId = requestAnimationFrame(gameLoop);
    };

    frameId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(frameId);
  }, [isPlaying, direction]);

  return (
    <div className="gameboard-container">
      <div
        className="gameboard"
        style={{
          width: `${gridSize * cellSize + 12}px`,
          height: `${gridSize * cellSize + 12}px`,
          gridTemplateColumns: `repeat(${gridSize}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${gridSize}, ${cellSize}px)`,
        }}
      >
        {Array.from({ length: gridSize * gridSize }).map((_, index) => {
          const x = index % gridSize;
          const y = Math.floor(index / gridSize);
          const snakeSet = new Set(snake.map((s) => `${s.x}-${s.y}`));
          const isSnake = snakeSet.has(`${x}-${y}`);
          const isFood = food.x === x && food.y === y;
          return (
            <div
              key={index}
              className={`grid-cell ${isSnake ? 'snake' : ''} ${isFood ? 'food' : ''}`}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

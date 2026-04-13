import { useEffect, useRef } from 'react';
import { SnakeGame } from '../../classes/SnakeGame';
import { CherryIcon } from '../../components/icons/CherryIcon';
import { ReplayIcon } from '../../components/icons/ReplayIcon';
import { ArrowKeysPad } from './ArrowKeysPad/ArrowsKeysPad';
import './SnakeGameComponent.scss';

export const SnakeGameComponent = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);
  const restartScreenRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef<HTMLDivElement>(null);
  const restartBtnRef = useRef<HTMLButtonElement>(null);
  const gameRef = useRef<SnakeGame | null>(null);

  useEffect(() => {
    if (
      !gameRef.current &&
      gridRef.current &&
      scoreRef.current &&
      restartScreenRef.current &&
      resultRef.current &&
      speedRef.current &&
      restartBtnRef.current
    ) {
      gameRef.current = new SnakeGame(
        gridRef.current,
        scoreRef.current,
        restartScreenRef.current,
        resultRef.current,
        speedRef.current,
        restartBtnRef.current
      );
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      gameRef.current?.handleKeyPress(e.key);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleArrowKey = (key: string) => {
    gameRef.current?.handleKeyPress(key);
  };

  return (
    <div className="snake-game">
      <h1>SNAKE</h1>
      <div className="game-state">
        <div id="score-tracker">
          <CherryIcon />
          <span ref={scoreRef} className="score">
            0
          </span>
        </div>

        <div className="game-speed">
          <span ref={speedRef} className="speed">
            x1
          </span>
        </div>
      </div>
      <div className="gameboard-container">
        <div
          ref={gridRef}
          className="gameboard"
          style={{
            width: `${15 * 20 + 12}px`,
            height: `${15 * 20 + 12}px`,
            gridTemplateColumns: `repeat(${15}, ${20}px)`,
            gridTemplateRows: `repeat(${15}, ${20}px)`,
          }}
        ></div>
        <div ref={restartScreenRef} id="restart-screen" className="d-none">
          <h4>Final Score:</h4>
          <span ref={resultRef} className="result"></span>
          <p>Oh no! The phantom fruits escaped!</p>
          <p>Try again?</p>
          <button
            ref={restartBtnRef}
            id="restart"
            type="button"
            aria-label="Restart game"
          >
            <ReplayIcon />
          </button>
        </div>
      </div>
      <div className="theme">
        <button className="theme-btn">
          <div className="text">retro</div>
        </button>
      </div>

      <ArrowKeysPad onKeyPress={handleArrowKey} disabled={false} />
    </div>
  );
};

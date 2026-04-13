export class SnakeGame {
  FRUITS = ['apple', 'banana', 'cherry'];
  ALLOWED_KEYS = [
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'up',
    'down',
    'left',
    'right',
  ];

  grid: HTMLElement;
  tiles: HTMLElement[] = [];
  scoreElem: HTMLElement;
  restartScreenElem: HTMLElement;
  resultElem: HTMLElement;
  speedElem: HTMLElement;
  restartBtn: HTMLElement;
  arrowKeys: HTMLElement[] = [];

  isRunning = false;
  fruitPosition = Math.floor(225 / 2);
  snakePosition: number[] = [168, 169, 170, 171];
  snakeLength = this.snakePosition.length;
  score = 0;
  stepsTaken = 0;
  startTime = performance.now();
  speed = 150;
  multiplier = 1;
  inputs: string[] = [];
  lastKeyPressed = '';

  constructor(
    grid: HTMLElement,
    scoreElem: HTMLElement,
    restartScreenElem: HTMLElement,
    resultElem: HTMLElement,
    speedElem: HTMLElement,
    restartBtn: HTMLElement
  ) {
    this.grid = grid;
    this.scoreElem = scoreElem;
    this.restartScreenElem = restartScreenElem;
    this.resultElem = resultElem;
    this.speedElem = speedElem;
    this.restartBtn = restartBtn;

    this.generateGrid(15, 15);
    this.render();
    this.setUpRestartListener();

    this.gameLoop();
  }

  // ======== GRID SETUP ========

  generateGrid(noOfRows: number, noOfColumns: number) {
    const noOfTiles = noOfRows * noOfColumns;

    for (let i = 0; i < noOfTiles; i++) {
      const tileElement = document.createElement('div');
      tileElement.classList.add('grid-cell');

      this.grid.appendChild(tileElement);
    }

    this.tiles = Array.from(this.grid.querySelectorAll('.grid-cell'));
  }

  render() {
    // Place the apple in its starting position on the grid
    const appleTile = this.tiles[this.fruitPosition];
    const chosenFruit =
      this.FRUITS[Math.floor(Math.random() * this.FRUITS.length)];
    appleTile.classList.add('food');
    appleTile.dataset.fruit = chosenFruit;

    // Place the snake in its starting position on the grid
    this.snakePosition.forEach((tileIndex) => {
      this.tiles[tileIndex].classList.add('snake');
    });
  }

  clearGrid() {
    this.snakePosition.forEach((tileIndex) => {
      this.tiles[tileIndex].classList.remove('snake');
    });

    const appleTile = this.tiles[this.fruitPosition];
    appleTile.classList.remove('food');
    appleTile.dataset.fruit = '';
  }

  // ======== GAME STATS UPDATES ========
  updateScore() {
    this.scoreElem.textContent = String(this.score);
  }

  updateMultiplier(newMultiplier: number) {
    this.multiplier = newMultiplier;
    this.speedElem.textContent = `x${this.multiplier}`;
    this.startTime = performance.now();
  }

  // ======== FRUIT POSITIONING ========

  generateFruit() {
    // Remove any previous fruit visuals from the current apple position.
    const currentFruitTile = this.tiles[this.fruitPosition];
    currentFruitTile.classList.remove('food');
    currentFruitTile.dataset.fruit = '';

    this.snakeLength += 1;
    while (this.snakePosition.includes(this.fruitPosition)) {
      this.fruitPosition = Math.floor(Math.random() * 225);
    }

    const fruitTile = this.tiles[this.fruitPosition];
    // const chosenFruit = fruits[Math.floor(Math.random() * 3)];
    fruitTile.classList.add('food');
    fruitTile.dataset.fruit = 'cherry';
    this.score += 10;
    this.updateScore();

    let newMultiplier = Math.floor(this.score / 50) * 0.5 + 1;
    if (this.multiplier !== newMultiplier) {
      this.updateMultiplier(newMultiplier);
      this.stepsTaken = 0;
    }
  }

  // ======== SNAKE MOVEMENTS ========
  moveSnake() {
    const currentHead = this.snakePosition[this.snakeLength - 1];

    if (this.inputs.length > 0) {
      this.lastKeyPressed = this.inputs[0];
      this.inputs.shift();
    }

    let nextPosition = -1;
    if (this.lastKeyPressed === 'up') {
      nextPosition = currentHead - 15;
      if (nextPosition < 0) {
        this.isRunning = false;
        this.showRestartScreen();
        return;
      }
    }
    if (this.lastKeyPressed === 'down') {
      nextPosition = currentHead + 15;
      if (nextPosition > 224) {
        this.isRunning = false;
        this.showRestartScreen();
        return;
      }
    }

    if (this.lastKeyPressed === 'left') {
      nextPosition = currentHead - 1;
      console.log(nextPosition % 15);
      if (nextPosition % 15 === 14) {
        this.isRunning = false;
        this.showRestartScreen();
        return;
      }
    }

    if (this.lastKeyPressed === 'right') {
      nextPosition = currentHead + 1;
      if (nextPosition % 15 === 0) {
        this.isRunning = false;
        this.showRestartScreen();
        return;
      }
    }

    // If snake head collides with its body, end game
    if (this.snakePosition.includes(nextPosition)) {
      this.isRunning = false;
      this.showRestartScreen();
      return;
    }

    this.updateSnakeHead(nextPosition);
    this.stepsTaken++;
    // If snake eats apple, extend body and generate a new apple on the grid. Otherwise, remove position of old tail to maintain length
    if (nextPosition !== this.fruitPosition) {
      this.updateSnakeTail(this.snakePosition[0]);
    } else {
      this.generateFruit();
    }
  }

  updateSnakeHead(newHeadPosition: number) {
    this.snakePosition.push(newHeadPosition);
    this.tiles[newHeadPosition].classList.add('snake');
  }

  updateSnakeTail(oldTailPosition: number) {
    this.snakePosition.shift();
    this.tiles[oldTailPosition].classList.remove('snake');
  }

  // ======== LISTENERS ========
  handleKeyPress(key: string) {
    if (!this.ALLOWED_KEYS.includes(key)) {
      return;
    }

    const lastKey = this.inputs[this.inputs.length - 1] || this.lastKeyPressed;
    if (
      (key === 'ArrowUp' || key === 'up') &&
      lastKey !== 'down' &&
      lastKey !== 'ArrowUp'
    ) {
      this.inputs.push('up');
    } else if (
      (key === 'ArrowDown' || key === 'down') &&
      lastKey !== 'down' &&
      lastKey !== 'up'
    ) {
      this.inputs.push('down');
    } else if (
      (key === 'ArrowLeft' || key === 'left') &&
      lastKey !== 'right' &&
      lastKey !== 'left'
    ) {
      this.inputs.push('left');
    } else if (
      (key === 'ArrowRight' || key === 'right') &&
      lastKey !== 'left' &&
      lastKey !== 'right'
    ) {
      this.inputs.push('right');
    }

    if (this.lastKeyPressed === '' && this.inputs.length > 0) {
      this.lastKeyPressed = this.inputs[0];
      this.startTime = performance.now();
      this.isRunning = true;
    }
  }

  // ======== RESTART SCREEN ========
  setUpRestartListener() {
    this.restartBtn.addEventListener('click', () => {
      this.restartGame();
    });
  }

  showRestartScreen() {
    this.resultElem.textContent = String(this.score);
    this.restartScreenElem.classList.remove('d-none');
  }

  restartGame() {
    this.restartScreenElem.classList.add('d-none');
    this.clearGrid();

    console.log('grid cleared');

    // this.isRunning = true;
    this.score = 0;
    this.inputs = [];
    this.lastKeyPressed = '';
    this.stepsTaken = 0;
    this.startTime = performance.now();
    this.fruitPosition = Math.floor(225 / 2);
    this.snakePosition = [168, 169, 170, 171];
    this.snakeLength = this.snakePosition.length;
    this.multiplier = 1;

    this.updateMultiplier(this.multiplier);
    this.updateScore();
    this.render();
  }

  // ======== GAME LOOP ========
  gameLoop() {
    if (this.isRunning) this.moveSnake();
    setTimeout(() => this.gameLoop(), this.speed / this.multiplier);
  }
}

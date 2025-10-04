import React, { useState, useEffect, useCallback, useRef } from 'react';
import './SnakeGame.css'; 

// --- Configuraciones del Juego ---
const BOARD_SIZE = 20; 
// 💡 VOLVEMOS A 200ms. El CSS manejará la fluidez visual.
const INITIAL_SPEED = 200; 

// --- Posiciones y Dirección ---
const INITIAL_SNAKE = [[10, 10]]; 
const INITIAL_FOOD = [5, 5];

const DIRECTIONS = {
  UP: [0, -1],   
  DOWN: [0, 1],   
  LEFT: [-1, 0], 
  RIGHT: [1, 0], 
};

// ... (Función generateRandomFood se mantiene igual) ...
const generateRandomFood = (currentSnake) => {
  let foodPositionFound = false;
  let newFood = [];

  while (!foodPositionFound) {
    const randomX = Math.floor(Math.random() * BOARD_SIZE);
    const randomY = Math.floor(Math.random() * BOARD_SIZE);
    newFood = [randomX, randomY];

    const foodCollidesWithSnake = currentSnake.some(([sx, sy]) => sx === randomX && sy === randomY);

    if (!foodCollidesWithSnake) {
      foodPositionFound = true;
    }
  }
  
  return newFood;
};


function SnakeGame({ setSelectedGame }) {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState(DIRECTIONS.RIGHT);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [nextDirection, setNextDirection] = useState(DIRECTIONS.RIGHT); 

  const boardRef = useRef(null);

  // Lógica de Movimiento
  const moveSnake = useCallback(() => {
    if (isGameOver) return;
    
    // Aplicamos la 'nextDirection'
    setDirection(prevDirection => {
        return nextDirection;
    });

    const currentDirection = nextDirection;
    const head = snake[0];
    const newHead = [head[0] + currentDirection[0], head[1] + currentDirection[1]];

    // Colisión con Paredes y con el cuerpo
    if (
      newHead[0] < 0 || newHead[0] >= BOARD_SIZE ||
      newHead[1] < 0 || newHead[1] >= BOARD_SIZE ||
      snake.some(([sx, sy], index) => index > 0 && sx === newHead[0] && sy === newHead[1])
    ) {
      setIsGameOver(true);
      return;
    }

    const newSnake = [newHead, ...snake];

    // Comer Comida
    if (newHead[0] === food[0] && newHead[1] === food[1]) {
      setScore(s => s + 1);
      setFood(generateRandomFood(newSnake));
      // 💡 REDUCCIÓN MÁS SUAVE DE VELOCIDAD
      setSpeed(s => Math.max(50, s - 5)); // De 8 a 5 para un aumento más gradual
    } else {
      newSnake.pop(); 
    }

    setSnake(newSnake);
  }, [snake, nextDirection, food, isGameOver]); 

  // GAME LOOP (sin cambios)
  useEffect(() => {
    if (isGameOver) return; 
    const timerId = setTimeout(moveSnake, speed);
    return () => clearTimeout(timerId); 
  }, [moveSnake, isGameOver, speed]);


  // ... (Lógica de Swipe y Teclado se mantienen, actualizando setNextDirection) ...
  // LÓGICA DE DETECCIÓN DE SWIPE (DESLIZAMIENTO) EN PANTALLA
  useEffect(() => {
    if (isGameOver || !boardRef.current) return;

    let touchStartX = 0;
    let touchStartY = 0;
    const SWIPE_THRESHOLD = 50; 

    const element = boardRef.current;
    
    const handleTouchStart = (event) => {
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
      event.preventDefault(); 
    };

    const handleTouchEnd = (event) => {
      const touchEndX = event.changedTouches[0].clientX;
      const touchEndY = event.changedTouches[0].clientY;

      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      const [currentDx, currentDy] = direction;
      let newDirection = null;
      
      if (Math.abs(deltaX) > SWIPE_THRESHOLD || Math.abs(deltaY) > SWIPE_THRESHOLD) {
          
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          // Horizontal
          if (deltaX > 0) {
            if (currentDx === 0) newDirection = DIRECTIONS.RIGHT;
          } else {
            if (currentDx === 0) newDirection = DIRECTIONS.LEFT;
          }
        } else {
          // Vertical
          if (deltaY > 0) {
            if (currentDy === 0) newDirection = DIRECTIONS.DOWN;
          } else {
            if (currentDy === 0) newDirection = DIRECTIONS.UP;
          }
        }
        
        if (newDirection) {
            setNextDirection(newDirection);
        }
      }
    };

    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [direction, isGameOver]); 


  // MANEJO DE TECLADO 
  useEffect(() => {
    const handleKeyDown = (event) => {
      const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

      if (arrowKeys.includes(event.key)) {
          event.preventDefault(); 
      }
      
      const [dx, dy] = direction;
      let newDirection = null;

      switch (event.key) {
        case 'ArrowUp':
          if (dy === 0) newDirection = DIRECTIONS.UP; 
          break;
        case 'ArrowDown':
          if (dy === 0) newDirection = DIRECTIONS.DOWN;
          break;
        case 'ArrowLeft':
          if (dx === 0) newDirection = DIRECTIONS.LEFT;
          break;
        case 'ArrowRight':
          if (dx === 0) newDirection = DIRECTIONS.RIGHT;
          break;
        case 'r':
        case 'R':
          if (isGameOver) resetGame();
          break;
        default:
          break;
      }
      
      if (newDirection) {
          setNextDirection(newDirection);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [direction, isGameOver]); 
  
  // ... (Resto de funciones y renderizado) ...


  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(generateRandomFood(INITIAL_SNAKE));
    setDirection(DIRECTIONS.RIGHT);
    setNextDirection(DIRECTIONS.RIGHT); 
    setIsGameOver(false);
    setScore(0);
    setSpeed(INITIAL_SPEED);
  };


  // Renderizado del Tablero (sin cambios)
  const renderBoard = () => {
    let cells = [];
    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        let className = 'cell';
        let content = null;

        const isSnake = snake.some(([sx, sy]) => sx === x && sy === y);
        const isHead = snake[0][0] === x && snake[0][1] === y;
        
        if (isSnake) {
          className += ' snake-body'; 
          if (isHead) {
            className += ' snake-head'; 
          }
        }

        if (food[0] === x && food[1] === y) {
          className += ' food';
          content = <div className="food-inner"></div>; 
        }
        
        cells.push(<div key={`${x}-${y}`} className={className}>{content}</div>);
      }
    }
    return cells;
  };

  // 💡 CLASE CONDICIONAL: Añadimos una clase al wrapper para el estado de Game Over
  return (
    <div className={`game-wrapper ${isGameOver ? 'game-over-state' : ''}`}> 
        <button className="back-button" onClick={() => setSelectedGame('home')}>
            ⬅️ Regresar al Menú
        </button>
        
        <div className="game-container">
          <h1>🐍 El Gusanito</h1>
          <div 
            className="board" 
            ref={boardRef} 
            style={{ 
              gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
              gridTemplateRows: `repeat(${BOARD_SIZE}, 1fr)`
            }}
          >
            {renderBoard()}
          </div>
          <h2>Puntuación: {score}</h2>
          {isGameOver && (
            <div className="game-over">
              ¡Game Over! Puntuación: {score}. Presiona **R** o toca **Reiniciar**.
              <button onClick={resetGame}>Reiniciar</button>
            </div>
          )}
        </div>
        
        <div className="ad-unit">
            {/* AdSense Auto Ads lo llenará automáticamente si lo necesita. */}
        </div>
        
    </div> 
  );
}

export default SnakeGame;
import React, { useState, useEffect, useCallback } from 'react';
import './SnakeGame.css'; 

// --- Configuraciones del Juego ---
const BOARD_SIZE = 20; 
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

// ----------------------------------------------------
// FUNCIÓN CORREGIDA para generar comida aleatoria
// ----------------------------------------------------
const generateRandomFood = (currentSnake) => {
  let foodPositionFound = false;
  let newFood = [];

  while (!foodPositionFound) {
    // 1. Genera coordenadas aleatorias dentro del tablero
    const randomX = Math.floor(Math.random() * BOARD_SIZE);
    const randomY = Math.floor(Math.random() * BOARD_SIZE);
    newFood = [randomX, randomY];

    // 2. Comprueba si la nueva posición de comida NO choca con el gusano
    const foodCollidesWithSnake = currentSnake.some(([sx, sy]) => sx === randomX && sy === randomY);

    if (!foodCollidesWithSnake) {
      foodPositionFound = true;
    }
  }
  
  return newFood;
};


function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState(DIRECTIONS.RIGHT);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  // Lógica de Movimiento
  const moveSnake = useCallback(() => {
    if (isGameOver) return;

    const head = snake[0];
    const newHead = [head[0] + direction[0], head[1] + direction[1]];

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
      setSpeed(s => Math.max(50, s - 5));
    } else {
      newSnake.pop(); 
    }

    setSnake(newSnake);
  }, [snake, direction, food, isGameOver]);


  // GAME LOOP
  useEffect(() => {
    if (isGameOver) return; 
    const timerId = setTimeout(moveSnake, speed);
    return () => clearTimeout(timerId); 
  }, [moveSnake, isGameOver, speed]);


  // ----------------------------------------------------
  // MANEJO DE TECLADO (CON PREVENCIÓN DE SCROLL)
  // ----------------------------------------------------
  useEffect(() => {
    const handleKeyDown = (event) => {
      const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

      // Bloquea el comportamiento predeterminado (scroll) de las flechas
      if (arrowKeys.includes(event.key)) {
          event.preventDefault(); 
      }
      
      const [dx, dy] = direction;

      switch (event.key) {
        case 'ArrowUp':
          if (dy === 0) setDirection(DIRECTIONS.UP); 
          break;
        case 'ArrowDown':
          if (dy === 0) setDirection(DIRECTIONS.DOWN);
          break;
        case 'ArrowLeft':
          if (dx === 0) setDirection(DIRECTIONS.LEFT);
          break;
        case 'ArrowRight':
          if (dx === 0) setDirection(DIRECTIONS.RIGHT);
          break;
        case 'r':
        case 'R':
          if (isGameOver) resetGame();
          break;
        default:
          break;
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [direction, isGameOver]); 

  // Lógica de AdSense (Para cargar el anuncio después de montar/reiniciar)
  useEffect(() => {
    try {
        if (window.adsbygoogle && !isGameOver) {
            window.adsbygoogle.push({});
        }
    } catch (e) {
        // En desarrollo, esto puede fallar, pero no debe detener la app
        console.error("Error al intentar cargar AdSense", e);
    }
  }, [isGameOver]);


  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(generateRandomFood(INITIAL_SNAKE));
    setDirection(DIRECTIONS.RIGHT);
    setIsGameOver(false);
    setScore(0);
    setSpeed(INITIAL_SPEED);
  };


  // Renderizado del Tablero (Incluye clases para estilos y elemento interno de comida)
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

  return (
    <div className="game-wrapper"> 
        <div className="game-container">
          <h1>🐍 The Snake Game</h1>
          <div 
            className="board" 
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
              ¡Game Over! Puntuación: {score}. Presiona **R** para reiniciar.
            </div>
          )}
        </div>
        
        {/* ESPACIO PARA EL ANUNCIO (Reemplaza los placeholders con tus IDs) */}
        <div className="ad-unit">
            <ins 
                className="adsbygoogle"
                style={{ display: 'block', textAlign: 'center' }}
                data-ad-client="ca-pub-YOUR_CLIENT_ID" 
                data-ad-slot="YOUR_AD_SLOT_ID_1" 
                data-ad-format="auto"
                data-full-width-responsive="true"
            ></ins>
        </div>
        
    </div> 
  );
}

export default SnakeGame;
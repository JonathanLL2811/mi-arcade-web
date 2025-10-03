import React, { useState, useEffect, useCallback } from 'react';
import './SnakeGame.css';

// --- Configuraciones del Juego ---
const BOARD_SIZE = 20; // 20x20 celdas
const INITIAL_SPEED = 200; // 200 ms (milisegundos)

// --- Posiciones y Dirección ---
const INITIAL_SNAKE = [[10, 10]]; 
const INITIAL_FOOD = [5, 5];

const DIRECTIONS = {
  UP: [0, -1],    // Cambia Y a -1 (sube)
  DOWN: [0, 1],   // Cambia Y a +1 (baja)
  LEFT: [-1, 0],  // Cambia X a -1 (izquierda)
  RIGHT: [1, 0],  // Cambia X a +1 (derecha)
};

// --- Función para generar comida aleatoria ---
const generateRandomFood = (currentSnake) => {
  let newFood;
  do {
    // Genera coordenadas aleatorias dentro del tablero
    newFood = [
      Math.floor(Math.random() * BOARD_SIZE),
      Math.floor(Math.random() * BOARD_SIZE)
    ];
    // Asegura que la comida no aparezca sobre el gusano
  } while (currentSnake.some(([sx, sy]) => sx === newFood[0] && sy === newFood[1]));
  return newFood;
};


function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState(DIRECTIONS.RIGHT);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED); // Usaremos esto para acelerar

  // ----------------------------------------------------
  // 1. FUNCIÓN PRINCIPAL DE MOVIMIENTO Y LÓGICA DE JUEGO
  // ----------------------------------------------------
  const moveSnake = useCallback(() => {
    if (isGameOver) return;

    // Crea la nueva cabeza del gusano
    const head = snake[0];
    const newHead = [head[0] + direction[0], head[1] + direction[1]];

    // Lógica de FIN DE JUEGO (Colisión con Paredes)
    if (
      newHead[0] < 0 ||
      newHead[0] >= BOARD_SIZE ||
      newHead[1] < 0 ||
      newHead[1] >= BOARD_SIZE
    ) {
      setIsGameOver(true);
      return;
    }

    // Lógica de FIN DE JUEGO (Colisión consigo mismo)
    if (snake.some(([sx, sy], index) => index > 0 && sx === newHead[0] && sy === newHead[1])) {
      setIsGameOver(true);
      return;
    }

    // Crea el nuevo cuerpo del gusano
    const newSnake = [newHead, ...snake];

    // Lógica de COMER COMIDA
    if (newHead[0] === food[0] && newHead[1] === food[1]) {
      // No cortamos la cola (el gusano crece)
      setScore(s => s + 1);
      setFood(generateRandomFood(newSnake));
      // Opcional: Acelerar el juego un poco
      setSpeed(s => Math.max(50, s - 5)); 
    } else {
      // El gusano se mueve: cortamos la cola
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [snake, direction, food, isGameOver]);


  // ----------------------------------------------------
  // 2. GAME LOOP (Bucle del Juego)
  // ----------------------------------------------------
  useEffect(() => {
    // Si el juego ha terminado, detenemos el intervalo
    if (isGameOver) return; 

    // Usamos setTimeout recursivo para un control más fino que setInterval
    const timerId = setTimeout(moveSnake, speed);
    
    // Función de limpieza de useEffect (detiene el timer si el componente se desmonta o re-renderiza)
    return () => clearTimeout(timerId); 
  }, [moveSnake, isGameOver, speed]);


  // ----------------------------------------------------
  // 3. MANEJO DE TECLADO
  // ----------------------------------------------------
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Evita movimientos inversos (ej: no puedes ir arriba si estás bajando)
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
        case 'r': // Reiniciar el juego
        case 'R':
          if (isGameOver) resetGame();
          break;
        default:
          break;
      }
    };
    
    // Adjuntamos el listener al documento
    document.addEventListener('keydown', handleKeyDown);

    // Limpieza: quitamos el listener cuando el componente se desmonte
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [direction, isGameOver]); // Depende de la dirección actual para evitar movimientos inversos

  // ----------------------------------------------------
  // 4. FUNCIÓN PARA REINICIAR
  // ----------------------------------------------------
  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(generateRandomFood(INITIAL_SNAKE));
    setDirection(DIRECTIONS.RIGHT);
    setIsGameOver(false);
    setScore(0);
    setSpeed(INITIAL_SPEED);
  };


  // ----------------------------------------------------
  // 5. RENDERIZADO DEL TABLERO
  // ----------------------------------------------------
  const renderBoard = () => {
    let cells = [];
    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        let className = 'cell';
        
        // Es el gusano?
        const isSnake = snake.some(([sx, sy]) => sx === x && sy === y);
        if (isSnake) {
          className += ' snake';
        }

        // Es la comida?
        if (food[0] === x && food[1] === y) {
          className += ' food';
        }
        
        cells.push(<div key={`${x}-${y}`} className={className}></div>);
      }
    }
    return cells;
  };

  return (
    <div className="game-container">
      <h1>🐍 The Snake Game</h1>
      <div 
        className="board" 
        // Usamos Grid CSS para dibujar el tablero
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
          ¡Game Over! Puntuación final: **{score}**. Presiona **R** para reiniciar.
        </div>
      )}
    </div>
  );
}

export default SnakeGame;
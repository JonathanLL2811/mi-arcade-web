import React, { useState, useEffect } from 'react';
import './MemoryGame.css';

// --- CONFIGURACIÓN ---
const CARD_ICONS = [1, 2, 3, 4, 5, 6, 7, 8]; // Usamos números (8 pares)
const TOTAL_PAIRS = CARD_ICONS.length;
// 🚀 LÓGICA DEL INTENTO: 8 aciertos mínimos + 12 intentos de error = 20
const MAX_ATTEMPTS = 20; 
const FLIP_BACK_DELAY = 1200; // 1.2 segundos

// --- FUNCIÓN DE INICIALIZACIÓN ---
const initializeCards = () => {
  let cards = [...CARD_ICONS, ...CARD_ICONS];
  
  // Barajar
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards.map((icon, index) => ({
    id: index,
    icon: icon, 
    isFlipped: false, 
    isMatched: false,
  }));
};


function MemoryGame({ setSelectedGame }) {
  const [cards, setCards] = useState(initializeCards);
  const [flippedCards, setFlippedCards] = useState([]); 
  const [matches, setMatches] = useState(0); 
  const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS); 
  const [isBlocking, setIsBlocking] = useState(false); 
  const [isGameOver, setIsGameOver] = useState(false);

  // --- LÓGICA DE CLIC INTEGRADA (Forma más robusta) ---
  const handleCardClick = (id) => {
    // 1. Bloqueo inicial
    if (isBlocking || isGameOver || flippedCards.length === 2) return;
    
    setCards(prevCards => {
      const cardIndex = prevCards.findIndex(card => card.id === id);
      const card = prevCards[cardIndex];

      // Ignorar si ya está volteada o emparejada
      if (card.isFlipped || card.isMatched) return prevCards;

      // Voltear la carta actual
      const newCards = [...prevCards];
      newCards[cardIndex] = { ...card, isFlipped: true };
      
      // 2. Determinar el estado del volteo
      const currentFlipped = [...flippedCards, id];
      
      // Si es la primera carta, solo actualizamos el estado y salimos
      if (currentFlipped.length === 1) {
        setFlippedCards(currentFlipped);
        return newCards;
      }

      // 3. Si es la segunda carta (currentFlipped.length === 2):
      
      // Bloqueamos clics
      setIsBlocking(true); 
      setAttemptsLeft(prev => prev - 1); // Contamos el intento

      const [id1, id2] = currentFlipped;
      const card1 = newCards.find(c => c.id === id1);
      const card2 = newCards.find(c => c.id === id2);

      // 4. Validación (Match o No Match)
      if (card1.icon === card2.icon) {
        // --- MATCH: Dejar abiertas y sumar acierto ---
        setMatches(m => m + 1);
        
        const finalCards = newCards.map(c => 
            c.id === id1 || c.id === id2 
                ? { ...c, isMatched: true, isFlipped: true } 
                : c
        );

        // Desbloquear inmediatamente para el siguiente turno
        setFlippedCards([]); 
        setIsBlocking(false); 
        return finalCards;
        
      } else {
        // --- NO MATCH: Programar el volteo de regreso ---
        
        // Usamos setTimeout para el retardo visual
        setTimeout(() => {
          setCards(pCards => 
            pCards.map(c => 
              c.id === id1 || c.id === id2 
                ? { ...c, isFlipped: false } // Se tapan
                : c
            )
          );
          
          // Desbloquear después del retardo
          setFlippedCards([]); 
          setIsBlocking(false); 
        }, FLIP_BACK_DELAY); 

        // Retornamos las cartas temporalmente volteadas para que se vean
        return newCards;
      }
    });
  };


  // --- 🚀 LÓGICA DE FIN DEL JUEGO CON INTENTOS 🚀 ---
  useEffect(() => {
      const allMatched = matches === TOTAL_PAIRS;
      const attemptsExhausted = attemptsLeft <= 0;

      if (allMatched) {
          // Gana si destapa todos Y todavía tiene intentos
          if (attemptsLeft >= 0) { 
              setIsGameOver(true);
          }
      }
      
      if (attemptsExhausted && !allMatched) {
          // Pierde si gasta todos los intentos y NO destapó todos
          setIsGameOver(true);
      }
      
      // Si se agotan los intentos justo al hacer el último match, también es victoria
      if (allMatched && attemptsExhausted) {
          setIsGameOver(true);
      }
      
  }, [attemptsLeft, matches]);


  // --- REINICIO DEL JUEGO ---
  const resetGame = () => {
    setCards(initializeCards());
    setFlippedCards([]);
    setMatches(0);
    setAttemptsLeft(MAX_ATTEMPTS);
    setIsBlocking(false);
    setIsGameOver(false);
  };

  // --- RENDERIZADO ---
  const hasWon = matches === TOTAL_PAIRS;

  return (
    <div className="memory-wrapper">
        <button className="back-button" onClick={() => setSelectedGame('home')}>
            ⬅️ Regresar al Menú
        </button>

        <div className="memory-container">
          <h1>Juego de Memoria 🧠</h1>
          
          {(isGameOver) ? (
            <div className="game-status">
              <span style={{color: hasWon ? '#4CAF50' : '#FF4D4D'}}>
                  {hasWon ? 
                      `¡GANASTE! 🎉 Completaste los ${TOTAL_PAIRS} pares.` : 
                      `¡PERDISTE! 😢 Te quedaste sin intentos.`
                  }
              </span>
              <button onClick={resetGame} className="reset-button">Jugar de Nuevo</button>
            </div>
          ) : (
            <div className="game-status-info">
                Intentos Restantes: {attemptsLeft} / {MAX_ATTEMPTS} | Aciertos: {matches} / {TOTAL_PAIRS}
            </div>
          )}

          <div 
            className={`memory-grid grid-4 ${isGameOver ? 'game-over-blur' : ''}`}
          >
            {cards.map(card => (
              <div 
                key={card.id} 
                className={`card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
                onClick={() => handleCardClick(card.id)}
              >
                <div className="card-inner">
                  <div className="card-front">?</div>
                  <div className="card-back" style={{fontSize: '2.5rem'}}>{card.icon}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="info-bar">
            <button onClick={resetGame} className="reset-button">Reiniciar Juego</button>
          </div>
        </div>

        <div className="ad-unit-memory"></div>
    </div>
  );
}

export default MemoryGame;
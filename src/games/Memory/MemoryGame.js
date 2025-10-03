import React, { useState, useEffect, useCallback } from 'react';
import './MemoryGame.css';

// ---------------------------------------------------
// CONFIGURACIÓN INICIAL
// ---------------------------------------------------

// Símbolos que usaremos para las cartas (deben ser un número par)
const CARD_ICONS = ['🍎', '🍌', '🍇', '🍉', '🍓', '🥝', '🍍', '🥭'];
const GAME_SIZE = CARD_ICONS.length * 2; // Total de 16 cartas (8 pares)

// Función para inicializar el tablero
const initializeCards = () => {
  // 1. Duplica los iconos para crear las parejas
  let cards = [...CARD_ICONS, ...CARD_ICONS];
  
  // 2. Barajar (Algoritmo de Fisher-Yates)
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  // 3. Mapear a objetos de estado
  return cards.map((icon, index) => ({
    id: index,
    icon: icon,
    isFlipped: false, // Está boca arriba?
    isMatched: false, // Ya se encontró la pareja?
  }));
};


// ⚠️ Recibe setSelectedGame para el botón de regreso
function MemoryGame({ setSelectedGame }) {
  const [cards, setCards] = useState(initializeCards);
  const [flippedCards, setFlippedCards] = useState([]); // Almacena los IDs de las 2 cartas volteadas
  const [moves, setMoves] = useState(0); // Contador de movimientos
  const [isBlocking, setIsBlocking] = useState(false); // Bloquea clics mientras se revisan las cartas

  // ---------------------------------------------------
  // LÓGICA DE MANEJO DE CLIC EN UNA CARTA
  // ---------------------------------------------------
  const handleCardClick = (id) => {
    // Si el juego está bloqueado o ya se han volteado 2 cartas, ignora el clic
    if (isBlocking || flippedCards.length === 2) return;
    
    setCards(prevCards => {
      // Encuentra la carta en el estado
      const cardIndex = prevCards.findIndex(card => card.id === id);
      const card = prevCards[cardIndex];

      // Si la carta ya está volteada o encontrada, no hagas nada
      if (card.isFlipped || card.isMatched) return prevCards;

      // Voltea la carta
      const newCards = [...prevCards];
      newCards[cardIndex] = { ...card, isFlipped: true };

      // Agrega a la lista de cartas volteadas
      setFlippedCards(prev => [...prev, id]);
      setMoves(m => m + 1); // Incrementa movimientos
      
      return newCards;
    });
  };

  // ---------------------------------------------------
  // LÓGICA DE COMPARACIÓN DE CARTAS (useEffect)
  // ---------------------------------------------------
  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsBlocking(true); // Bloquea nuevos clics

      // Obtener las dos cartas volteadas
      const [id1, id2] = flippedCards;
      const card1 = cards.find(c => c.id === id1);
      const card2 = cards.find(c => c.id === id2);

      if (card1.icon === card2.icon) {
        // MATCH ENCONTRADO
        setTimeout(() => {
          setCards(prevCards => 
            prevCards.map(card => 
              card.id === id1 || card.id === id2 
                ? { ...card, isMatched: true, isFlipped: true } 
                : card
            )
          );
          setFlippedCards([]); // Limpia el estado
          setIsBlocking(false); // Desbloquea
        }, 800);
      } else {
        // NO HAY MATCH
        setTimeout(() => {
          setCards(prevCards => 
            prevCards.map(card => 
              card.id === id1 || card.id === id2 
                ? { ...card, isFlipped: false } // Voltea de nuevo
                : card
            )
          );
          setFlippedCards([]); // Limpia el estado
          setIsBlocking(false); // Desbloquea
        }, 1200);
      }
    }
  }, [flippedCards, cards]);


  // ---------------------------------------------------
  // LÓGICA DE FIN DEL JUEGO
  // ---------------------------------------------------
  const isGameFinished = cards.length > 0 && cards.every(card => card.isMatched);

  const resetGame = () => {
    setCards(initializeCards());
    setFlippedCards([]);
    setMoves(0);
    setIsBlocking(false);
  };


  // ---------------------------------------------------
  // RENDERIZADO
  // ---------------------------------------------------
  return (
    <div className="memory-wrapper">
        {/* 🚀 BOTÓN DE REGRESO AL MENÚ */}
        <button className="back-button" onClick={() => setSelectedGame('home')}>
            ⬅️ Regresar al Menú
        </button>

        <div className="memory-container">
          <h1>Juego de Memoria 🧠</h1>
          
          {isGameFinished && (
            <div className="game-status">
              ¡Ganaste! 🎉 Lo lograste en {moves} movimientos.
              <button onClick={resetGame} className="reset-button">Jugar de Nuevo</button>
            </div>
          )}

          <div className={`memory-grid grid-${Math.sqrt(GAME_SIZE)}`}>
            {cards.map(card => (
              <div 
                key={card.id} 
                className={`card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
                onClick={() => handleCardClick(card.id)}
              >
                <div className="card-inner">
                  <div className="card-front">?</div>
                  <div className="card-back">{card.icon}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="info-bar">
            <p>Movimientos: {moves}</p>
            <button onClick={resetGame} className="reset-button">Reiniciar</button>
          </div>
        </div>

        {/* Contenedor de anuncios para Auto Ads */}
        <div className="ad-unit-memory"></div>
    </div>
  );
}

export default MemoryGame;
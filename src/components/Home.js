import React from 'react';
import './Home.css';

// ⚠️ Este componente recibe la función para cambiar de juego (setSelectedGame)
function Home({ setSelectedGame }) {

  const games = [
    { 
      id: 'snake', 
      title: '🐍 El Gusanito', 
      description: 'El clásico juego de la serpiente. ¡Come y crece!', 
      image: 'snake-placeholder.jpg' 
    },
     { 
       id: 'memory', 
       title: '🧠 Juego de Memoria', 
       description: 'Encuentra las parejas antes de que se acabe el tiempo.', 
       image: 'memory-placeholder.jpg' 
     } 
    // Añadiremos más juegos aquí después
  ];

  return (
    <div className="home-container">
      <h1>🕹️ Mis juegos Web</h1>
      <p>Selecciona un juego para empezar la diversión.</p>

      <div className="game-list">
        {games.map(game => (
          <div 
            key={game.id} 
            className="game-card" 
            onClick={() => setSelectedGame(game.id)}
          >
            <div className="card-image-placeholder">
                {/* Por ahora, solo usamos el icono como placeholder de la imagen */}
                {game.title.split(' ')[0]} 
            </div>
            <div className="card-content">
              <h2>{game.title}</h2>
              <p>{game.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ESPACIO PARA ANUNCIO EN EL MENÚ */}
      {/* ⚠️ AdSense Auto Ads detectará y rellenará este div si lo considera oportuno. */}
      <div className="ad-unit-home">
          {/* Este div está limpio, solo proporciona un contenedor de espacio */}
      </div>
    </div>
  );
}

export default Home;
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

  // Estilo base para los botones de soporte para que se vean bien
  const supportButtonStyle = {
    padding: '8px 15px',
    margin: '5px',
    fontSize: '0.9rem',
    cursor: 'pointer',
    backgroundColor: '#3498db', // Un color diferente para distinguirlos
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.2s',
  };

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

      {/* 🚀 ENLACES DE SOPORTE Y POLÍTICAS (CRÍTICO para AdSense) */}
      <div className="support-links" style={{ borderTop: '1px solid #eee', paddingTop: '20px', marginTop: '30px', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1rem', color: '#555', marginBottom: '15px' }}>Información Legal y de Contacto</h3>
        <button style={supportButtonStyle} onClick={() => setSelectedGame('about')}>
          Acerca de Nosotros
        </button>
        <button style={supportButtonStyle} onClick={() => setSelectedGame('contact')}>
          Contacto
        </button>
        <button style={supportButtonStyle} onClick={() => setSelectedGame('privacy')}>
          Política de Privacidad
        </button>
      </div>

    </div>
  );
}

export default Home;
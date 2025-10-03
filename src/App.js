import React, { useState } from 'react';
import SnakeGame from './games/Snake/SnakeGame'; 
import MemoryGame from './games/Memory/MemoryGame'; 
import Home from './components/Home'; // Importa el nuevo componente Home
import './App.css'; 

function App() {
  // Estado para saber qué juego está seleccionado. 'home' es la pantalla inicial.
  const [selectedGame, setSelectedGame] = useState('home');

  // Función para renderizar el componente correcto
  const renderGame = () => {
    switch (selectedGame) {
      case 'snake':
        // Pasamos la función para que el juego pueda volver al menú
        return <SnakeGame setSelectedGame={setSelectedGame} />;
      case 'memory':
        return <MemoryGame setSelectedGame={setSelectedGame} />;
      case 'home':
      default:
        // Pasamos la función para que Home pueda iniciar un juego
        return <Home setSelectedGame={setSelectedGame} />;
    }
  };

  return (
    <div className="App" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column' }}>
      {/* El componente renderGame decidirá si mostrar Home o SnakeGame */}
      {renderGame()}
    </div>
  );
}

export default App;
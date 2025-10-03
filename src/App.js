import React, { useState } from 'react';
import SnakeGame from './games/Snake/SnakeGame'; 
import MemoryGame from './games/Memory/MemoryGame'; 
import Home from './components/Home'; // Importa el componente Home
// 🚀 Importamos los nuevos componentes de texto
import Contacto from './pages/Contacto';
import AcercaDe from './pages/AcercaDe';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad';
import './App.css'; 

function App() {
  // Estado para saber qué juego o página está seleccionado. 'home' es la pantalla inicial.
  const [selectedGame, setSelectedGame] = useState('home');

  // Función para renderizar el componente correcto
  const renderGame = () => {
    switch (selectedGame) {
      case 'snake':
        // Pasamos la función para que el juego pueda volver al menú
        return <SnakeGame setSelectedGame={setSelectedGame} />;
      case 'memory':
        return <MemoryGame setSelectedGame={setSelectedGame} />;
        
      // 🚀 Nuevas páginas de texto obligatorias para AdSense
      case 'about':
        return <AcercaDe setSelectedGame={setSelectedGame} />;
      case 'contact':
        return <Contacto setSelectedGame={setSelectedGame} />;
      case 'privacy':
        return <PoliticaPrivacidad setSelectedGame={setSelectedGame} />;

      case 'home':
      default:
        // Pasamos la función para que Home pueda iniciar un juego o ir a las páginas de soporte
        return <Home setSelectedGame={setSelectedGame} />;
    }
  };

  return (
    <div className="App" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column' }}>
      {renderGame()}
    </div>
  );
}

export default App;
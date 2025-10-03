import React from 'react';
import SnakeGame from './games/Snake/SnakeGame'; 
import './App.css'; // Mantenemos los estilos globales de App

function App() {
  return (
    // Centra el juego en la pantalla y mantiene la fuente general
    <div className="App" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column' }}>
      <SnakeGame />
    </div>
  );
}

export default App;
import React from 'react';
// Importa el juego desde la nueva ubicación
import SnakeGame from './games/Snake/SnakeGame'; 
import './App.css'; 

function App() {
  return (
    <div className="App">
      <SnakeGame />
    </div>
  );
}

export default App;
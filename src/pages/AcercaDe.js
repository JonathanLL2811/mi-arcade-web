import React from 'react';
import './pages.css'; // <<-- ¡Ruta de importación correcta!

function AcercaDe({ setSelectedGame }) {
  
  return (
    <div className="page-wrapper">
        <div className="page-card">
            
            <button className="page-back-button" onClick={() => setSelectedGame('home')}>
                ⬅️ Regresar al Menú
            </button>
            
            <h1 className="page-title">
                <span>✨</span>
                Acerca de MI-ARCADE-WEB
            </h1>
            
            <div className="page-content">
                <p>
                    MI-ARCADE-WEB nació de una idea simple pero poderosa: **convertir el tiempo muerto en tiempo de diversión y agilidad mental**. 
                    Soy Jonathan Jesús Lorenzana Lemus, y mi propósito es claro: ofrecer una plataforma de juegos sencillos y rápidos 
                    diseñados para entretenerte justo cuando más lo necesitas.
                </p>
                
                <h2 className="page-section-title">
                    <span>⏱️</span>
                    Teoría del "Entretenimiento de Espera"
                </h2>
                
                <p>
                    En el mundo moderno, el tiempo de espera es inevitable. Nuestra misión es llenar esos vacíos con **juegos que ejerciten tu memoria, lógica y tiempo de reacción**. 
                    Cada juego está optimizado para sesiones cortas y eficientes, brindando un pequeño escape mental y una sensación de productividad. Esta es una propuesta de valor fuerte que distingue a nuestro sitio.
                </p>
                
                <h2 className="page-section-title">
                    <span>🧠</span>
                    Nuestra Promesa de Valor
                </h2>
                
                <ul>
                    <li>
                        <strong>Diseño Rápido y Limpio:</strong> Enfocados en la jugabilidad sin distracciones innecesarias, con carga rápida y una experiencia fluida.
                    </li>
                    <li>
                        <strong>Valor Mental:</strong> Juegos cuidadosamente seleccionados (como el de memoria) que, además de entretener, aportan un beneficio cognitivo.
                    </li>
                    <li>
                        <strong>100% Responsive:</strong> Experiencia de juego perfecta en cualquier celular u ordenador, ya que la plataforma está diseñada con el enfoque "mobile-first" (primero móvil).
                    </li>
                </ul>
            </div>
        </div>
    </div>
  );
}

export default AcercaDe;
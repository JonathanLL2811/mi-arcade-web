import React from 'react';
import './pages.css'; // <<-- ¡Ruta de importación correcta!

function PoliticaPrivacidad({ setSelectedGame }) {
  
  return (
    <div className="page-wrapper">
        <div className="page-card">
            
            <button className="page-back-button" onClick={() => setSelectedGame('home')}>
                ⬅️ Regresar al Menú
            </button>
            
            <h1 className="page-title" style={{ borderBottomColor: '#e74c3c' }}>
                <span>🔒</span>
                Política de Privacidad
            </h1>
            
            <div className="page-content">
                <p style={{ fontStyle: 'italic', color: '#7f8c8d' }}>
                    Última actualización: Octubre 2025
                </p>

                <p>
                    La privacidad de nuestros usuarios es fundamental. Esta política explica cómo gestionamos la información, en línea con los requisitos de Google AdSense y las regulaciones internacionales de datos.
                </p>

                <h2 className="page-section-title" style={{ borderLeftColor: '#f39c12' }}>
                    <span>1️⃣</span>
                    Recopilación y Almacenamiento de Datos
                </h2>
                <p>
                    MI-ARCADE-WEB **no recopila ni almacena directamente ninguna información personal** identificable de sus usuarios (como nombres, correos electrónicos o ubicaciones). 
                    Todos los juegos se ejecutan localmente en tu navegador.
                </p>

                <h2 className="page-section-title" style={{ borderLeftColor: '#f39c12' }}>
                    <span>🍪</span>
                    Publicidad (Google AdSense y Cookies)
                </h2>
                <p>
                    Utilizamos Google AdSense para la monetización del sitio. Al mostrar anuncios, AdSense puede usar cookies y tecnologías de seguimiento para recopilar **datos no personales** sobre tus hábitos de navegación para ofrecerte anuncios relevantes.
                </p>
                <ul>
                    <li>
                        <strong>Uso de Cookies:</strong> Google, como proveedor de terceros, utiliza cookies para mostrar anuncios basados en tus visitas anteriores.
                    </li>
                    <li>
                        <strong>Control del Usuario:</strong> Puedes inhabilitar el uso de cookies para publicidad personalizada visitando la 
                        <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">política de privacidad de la red de contenido y anuncios de Google.</a>
                    </li>
                </ul>

                <h2 className="page-section-title" style={{ borderLeftColor: '#f39c12' }}>
                    <span>🔗</span>
                    Enlaces Externos
                </h2>
                <p>
                    Este sitio puede contener enlaces a otros sitios web externos. No tenemos control sobre el contenido ni las políticas de privacidad 
                    de estos sitios, por lo que no asumimos ninguna responsabilidad por su contenido o manejo de datos.
                </p>

                <h2 className="page-section-title" style={{ borderLeftColor: '#f39c12' }}>
                    <span>✅</span>
                    Consentimiento
                </h2>
                <p>
                    Al usar MI-ARCADE-WEB, aceptas esta Política de Privacidad y el procesamiento de datos no personales por parte de AdSense 
                    para fines publicitarios, según se detalla en el banner de consentimiento que aparecerá al visitar el sitio.
                </p>
            </div>
        </div>
    </div>
  );
}

export default PoliticaPrivacidad;
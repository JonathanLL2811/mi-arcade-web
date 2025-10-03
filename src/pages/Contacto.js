import React from 'react';
import './pages.css'; // <<-- ¡Ruta de importación correcta!

function Contacto({ setSelectedGame }) {

  return (
    <div className="page-wrapper">
        <div className="page-card">
            
            <button className="page-back-button" onClick={() => setSelectedGame('home')}>
                ⬅️ Regresar al Menú
            </button>
            
            <h1 className="page-title">
                <span>📞</span>
                Contacto
            </h1>
            
            <div className="page-content">
                <p>
                    Valoramos la comunicación con nuestros usuarios. Si tienes sugerencias, comentarios sobre los juegos, 
                    o encuentras algún error, no dudes en contactarme. Tu opinión es esencial para mejorar MI-ARCADE-WEB.
                </p>
                
                <div className="contact-info-block">
                    <h2 className="page-section-title" style={{ marginTop: '0', marginBottom: '20px', borderLeftColor: '#f39c12' }}>Detalles del Editor</h2>
                    
                    {/* Nombre */}
                    <div className="contact-detail">
                        <span role="img" aria-label="user">👤</span>
                        <div>
                            <p style={{ margin: '0', fontWeight: 'bold' }}>Jonathan Jesús Lorenzana Lemus</p>
                            <p style={{ margin: '0', fontSize: '0.9rem', color: '#777' }}>Nombre del Desarrollador</p>
                        </div>
                    </div>

                    {/* Correo Electrónico */}
                    <div className="contact-detail">
                        <span role="img" aria-label="mail">📧</span>
                        <div>
                            <p style={{ margin: '0' }}>Correo Electrónico</p>
                            <a href="mailto:l3musj3sus@gmail.com">l3musj3sus@gmail.com</a>
                        </div>
                    </div>

                    {/* Teléfono */}
                    <div className="contact-detail">
                        <span role="img" aria-label="phone">📱</span>
                        <div>
                            <p style={{ margin: '0' }}>Teléfono</p>
                            <p style={{ margin: '0', fontWeight: 'bold' }}>98013702</p>
                            <p style={{ margin: '0', fontSize: '0.8rem', color: '#999' }}>(Sólo para asuntos importantes)</p>
                        </div>
                    </div>
                </div>

                <p className="legal-note">
                    Intentaremos responder a todos los correos en un plazo de 48 horas.
                </p>
            </div>
        </div>
    </div>
  );
}

export default Contacto;
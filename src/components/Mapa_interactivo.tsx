import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface Atractivo {
  id: number;
  nombre: string;
  resumen: string;
  descripcion: string;
  top: string;
  left: string;
  link: string;
  imagen: string;
}

export default function MapaInteractivo() {
  const atractivos: Atractivo[] = [
    { id: 1, nombre: 'Nobsa', resumen: 'Famoso por sus ruanas de lana, artesanías y viñedos.', top: '30%', left: '62%', descripcion: 'Festividades: Pago a la cultura Calima, Día Mundial de la Ruana, Festividades en honor a San Roque, Festival de la Breva, Festival Vallenato, Nobsa se vuelve pesebre, Festival de la Vid y el Vino, Festival Cuerdas de mi Tierra, Festival de Bandas Heráldicas.\n\nGastronomía: Postres, conservas y derivados de la breva; vinos Marqués de Puntalarga.', link: 'https://www.nobsa-boyaca.gov.co/', imagen: '/assets/nobsa/PanoramicaNobsa.jpg' },
    { id: 2, nombre: 'Tibasosa', resumen: 'Conocido por su arquitectura colonial y productos de feijoa.', top: '24%', left: '51%', descripcion: 'Festividades: Festival de la Feijoa, Fiestas Patronales de Tibasosa, Reinado Nacional y Departamental de la Tercera Edad y la Salud.\n\nGastronomía: Productos derivados de la feijoa, carne a la llanera, amasijos ancestrales.', link: 'https://www.tibasosa-boyaca.gov.co/', imagen: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Tibasosa.jpg' },
    { id: 3, nombre: 'Iza', resumen: 'Famoso por sus postres tradicionales y aguas termales.', top: '42%', left: '45%', descripcion: 'Festividades: Reinado de la Identidad Izana y del Postre, Noche del Boyacensismo.\n\nGastronomía: Variedad de postres tradicionales, trucha arcoíris.', link: 'https://www.iza-boyaca.gov.co/', imagen: '/assets/iza/PanoramicaIza.jpg' },
    { id: 4, nombre: 'Firavitoba', resumen: 'Hogar de la imponente Basílica de Nuestra Señora de las Nieves.', top: '30%', left: '41%', descripcion: 'Festividades: Celebración Madre Sor Gabrielle de San Martín, Toma Cultural Firavitobense, Festival del Torbellino Firavitobense.\n\nGastronomía: Amasijos (mogollas, pan y almojábanas al horno de leña), el Ronga.', link: 'https://www.firavitoba-boyaca.gov.co/', imagen: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Firavitoba.jpg' },
    { id: 5, nombre: 'Pesca', resumen: 'Municipio agrícola reconocido por sus paisajes campesinos.', top: '38%', left: '23%', descripcion: 'Festividades: Celebración de Semana Santa, Festival Cuncutuma Pescano, Festival de Boyacensidad Pescana, Aguinaldo Pescano.\n\nGastronomía: Cordero asado, amasijos, colaciones pescanas, bebidas artesanales.', link: 'https://www.pesca-boyaca.gov.co/', imagen: 'https://upload.wikimedia.org/wikipedia/commons/5/57/IGLESIA_DE_PESCA%2C_BOYACA._-_panoramio.jpg' },
    { id: 6, nombre: 'Tota', resumen: 'Puerta de entrada al majestuoso Lago de Tota.', top: '46%', left: '28%', descripcion: 'Festividades: Festival de Tradición Oral y Música Campesina (Cuerda de Oro), desfile de carrozas y comparsas, ferias y fiestas de tradición cultural en honor al Santo Cristo y la Virgen de los Dolores, Aguinaldo Totense y fiesta de la Virgen del Carmen.\n\nGastronomía: Puntotense, trucha arcoíris, sopa de agro, guarapo, cachuca de trigo, mazamorra dulce.', link: 'https://www.tota-boyaca.gov.co/', imagen: '/assets/tota/PanoramicaTota.jpg' },
    { id: 7, nombre: 'Aquitania', resumen: 'Capital cebollera a orillas del Lago de Tota y Playa Blanca.', top: '69%', left: '15%', descripcion: 'Festividades: Ferias y fiestas en honor al Señor de los Milagros, fiesta de la Virgen del Carmen, fiestas de Cuasimodo y Semana Santa, baile en honor a San Pedro.\n\nGastronomía: Trucha arcoíris, pan de cebolla, cocido boyacense.', link: 'https://www.aquitania-boyaca.gov.co/', imagen: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Aquitania_Boyaca.JPG' },
    { id: 8, nombre: 'Cuítiva', resumen: 'Pueblo acogedor rodeado del ecosistema del lago.', top: '44%', left: '38%', descripcion: 'Festividades: Ferias y fiestas patronales de Cuítiva en honor a Santo Cristo, San Isidro Labrador y Virgen de los Dolores; Aguinaldo Cuitivense, fiestas de la Virgen del Carmen, Feria Ganadera Mitaca.\n\nGastronomía: Platos y amasijos tradicionales de la región.', link: 'https://www.cuitiva-boyaca.gov.co/', imagen: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Cuitiva_urbano.JPG' },
    { id: 9, nombre: 'Sogamoso', resumen: 'La Ciudad del Sol y del Acero, centro cultural Muisca.', top: '43%', left: '51%', descripcion: 'Festividades: Festividades del Sol y Fiesta del Huan, Festival Musical Carranguero, Festival Músico-Andina Zue de Oro, Festival de Sabores y Saberes Ancestrales Campesinos.\n\nGastronomía: Derivados de la mazorca, amasijos, empanada Sampedrana, carne a la llanera.', link: 'https://www.sogamoso-boyaca.gov.co/', imagen: '/assets/sogamoso/PanoramicaSogamoso.jpg' },
    { id: 10, nombre: 'Monguí', resumen: 'Pueblo patrimonio famoso por sus balones de cuero.', top: '45%', left: '62%', descripcion: 'Festividades: Fiesta de los Reyes Magos, Semana Santa, Festival Nacional del Balón, Fiesta de la Virgen de Monguí, Aguinaldo Monguiño.\n\nGastronomía: Cocido boyacense, trucha arcoíris, amasijos, jutes de papa.', link: 'https://www.mongui-boyaca.gov.co/', imagen: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Mongu%C3%AD.jpg' },
    { id: 11, nombre: 'Mongua', resumen: 'Tierra de páramos, la Laguna Negra y arqueología.', top: '56%', left: '74%', descripcion: 'Festividades: Fiestas Patronales de San Jerónimo, Festival del Café Salinas de Mongua, Fiesta de los Matachines, Festival del Sol Naciente.\n\nGastronomía: Jutes, cocido boyacense.', link: 'https://www.mongua-boyaca.gov.co/', imagen: '/assets/mongua/PanoramicaMongua.jpg' },
    { id: 12, nombre: 'Tópaga', resumen: 'Reconocido por su artesanía en carbón y el Cañón del Río Gámeza.', top: '42%', left: '69%', descripcion: 'Festividades: Semana Santa, Festival de la Cachanga, Aguinaldo Topaguense (matachines, disfraces y murgas), Fiestas Patronales en honor a San Judas Tadeo, desfile de Toros de Candela.\n\nGastronomía: Carne a la llanera, mutes, mogolla, queso de cabeza, masato, sancocho, cuajada, arepa aliada, cocido boyacense.', link: 'https://www.topaga-boyaca.gov.co/', imagen: '/assets/topaga/PanoramicaTopaga.jpg' },
    { id: 13, nombre: 'Gámeza', resumen: 'Escenario de la gesta libertadora y paisajes cordilleranos.', top: '43%', left: '77%', descripcion: 'Festividades: Conmemoración Batalla del Puente de los Molinos, festividades en honor a la Virgen del Carmen, Aguinaldo Gamecense y Festival de Danzas.\n\nGastronomía: Papa tocarreña y sus derivados, cocido boyacense, gallina criolla, uchuva.', link: 'https://www.gameza-boyaca.gov.co/', imagen: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Gameza_entrada.JPG' },
    { id: 14, nombre: 'Playa Blanca', resumen: 'Famosa playa de arena blanca a orillas del Lago de Tota, ideal para acampar y ecoturismo.', top: '60%', left: '43%', descripcion: 'Famosa playa de arena blanca a orillas del Lago de Tota, ideal para acampar y ecoturismo.', link: 'https://playablanca.corpoboyaca.gov.co/bookings/create?bookable_id=4', imagen: '/assets/PlayaBlanca.jpg' },
  ];

  const [puntoSeleccionadoId, setPuntoSeleccionadoId] = useState<number | null>(null);
  const [puntoDetalle, setPuntoDetalle] = useState<Atractivo | null>(null);
  const [estaAmpliado, setEstaAmpliado] = useState<boolean>(false);
  const [montado, setMontado] = useState<boolean>(false);

  useEffect(() => {
    setMontado(true);
  }, []);

  useEffect(() => {
    const manejarTeclado = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setEstaAmpliado(false);
    };

    if (estaAmpliado) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', manejarTeclado);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', manejarTeclado);
    };
  }, [estaAmpliado]);

  // Contenido del Modal estilizado
  const contenidoModal = estaAmpliado ? (
    <>
      {/* Estilos CSS dedicados a las animaciones fluidas */}
      <style>{`
        @keyframes overlayFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalPopIn {
          0% {
            opacity: 0;
            transform: scale(0.92) translateY(12px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes pulseRing {
          0% {
            transform: scale(0.8);
            opacity: 0.8;
          }
          100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }
        @keyframes tooltipFadeUp {
          from {
            opacity: 0;
            transform: translate(-50%, 8px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
      `}</style>

      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(5, 10, 20, 0.88)',
          backdropFilter: 'blur(12px)',
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          boxSizing: 'border-box',
          animation: 'overlayFadeIn 0.3s ease-out forwards',
        }}
        onClick={() => setEstaAmpliado(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1480px',
            maxHeight: '98vh',
            height: 'auto',
            backgroundColor: '#0b1329',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            padding: '28px',
            boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.9), 0 0 30px rgba(249, 115, 22, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxSizing: 'border-box',
            animation: 'modalPopIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          {/* Botón de cierre elegante */}
          <button
            onClick={() => setEstaAmpliado(false)}
            aria-label="Cerrar mapa"
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              color: '#94a3b8',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              zIndex: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ef4444';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.borderColor = '#ef4444';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.color = '#94a3b8';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            }}
          >
            ✕
          </button>

          <h3
            style={{
              color: '#f8fafc',
              marginBottom: '20px',
              fontSize: '20px',
              fontWeight: '700',
              letterSpacing: '0.5px',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}
          >
            Provincia Sugamuxi
          </h3>

          {/* Contenedor principal del Mapa con ajuste ceñido a la imagen */}
          <div
            style={{
              position: 'relative',
              display: 'inline-block',
              maxWidth: '100%',
              width: '100%',
              margin: '0 auto',
              flex: 1,
            }}
          >
            <img
              src="/assets/mapa/mapa-plano.png"
              alt="Mapa de Sugamuxi Ampliado"
              style={{
                display: 'block',
                width: '100%',
                height: 'auto',
                maxHeight: '82vh',
                borderRadius: '16px',
              }}
            />

            {/* Puntos interactivos alineados a la imagen real */}
            {atractivos.map((atractivo) => {
              const estaSeleccionado = puntoSeleccionadoId === atractivo.id;

              return (
                <div
                  key={atractivo.id}
                  onMouseEnter={() => setPuntoSeleccionadoId(atractivo.id)}
                  onMouseLeave={() => setPuntoSeleccionadoId(null)}
                  onClick={() => {
                    setPuntoDetalle(atractivo);
                  }}
                  style={{
                    position: 'absolute',
                    top: atractivo.top,
                    left: atractivo.left,
                    transform: 'translate(-50%, -50%)',
                    cursor: 'pointer',
                    zIndex: estaSeleccionado ? 50 : 30,
                  }}
                >
                  {/* Ring exterior */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '-5px',
                      left: '-5px',
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      backgroundColor: estaSeleccionado ? 'rgba(34, 197, 94, 0.6)' : 'rgba(249, 115, 22, 0.6)',
                      animation: 'pulseRing 2s infinite ease-out',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Círculo central */}
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      backgroundColor: estaSeleccionado ? '#22c55e' : '#f97316',
                      border: '2.5px solid #ffffff',
                      borderRadius: '50%',
                      boxShadow: '0 0 12px rgba(0,0,0,0.8)',
                      transition: 'transform 0.2s ease',
                      transform: estaSeleccionado ? 'scale(1.3)' : 'scale(1)',
                    }}
                  />

                  {/* Nombre visible del municipio sin necesidad de hover */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '-10px',
                      left: '18px',
                      padding: '4px 8px',
                      borderRadius: '999px',
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      border: '1px solid rgba(249, 115, 22, 0.35)',
                      color: '#ffffff',
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                      boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
                      pointerEvents: 'none',
                    }}
                  >
                    {atractivo.nombre}
                  </div>

                  {/* Popup de detalle al pasar el mouse */}
                  {estaSeleccionado && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '32px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '220px',
                        backgroundColor: 'rgba(15, 23, 42, 0.96)',
                        border: '1px solid rgba(249, 115, 22, 0.4)',
                        borderRadius: '14px',
                        overflow: 'hidden',
                        boxShadow: '0 15px 30px rgba(0,0,0,0.7)',
                        zIndex: 60,
                        pointerEvents: 'none',
                        textAlign: 'left',
                      }}
                    >
                      <img
                        src={atractivo.imagen}
                        alt={atractivo.nombre}
                        style={{
                          width: '100%',
                          height: '110px',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                      <div style={{ padding: '10px 12px 12px' }}>
                        <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#f97316', fontWeight: 700, letterSpacing: '0.5px' }}>
                          Municipio
                        </div>
                        <h4 style={{ margin: '2px 0 4px 0', fontSize: '14px', color: '#ffffff', fontWeight: 700 }}>
                          {atractivo.nombre}
                        </h4>
                        <p style={{ margin: 0, fontSize: '12px', color: '#cbd5e1', lineHeight: '1.35' }}>
                          {atractivo.resumen}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Modal de Detalle */}
          {puntoDetalle && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(5, 10, 20, 0.85)',
                backdropFilter: 'blur(8px)',
                borderRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 100,
                animation: 'overlayFadeIn 0.25s ease-out forwards',
              }}
              onClick={() => setPuntoDetalle(null)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: 'relative',
                  width: '95%',
                  maxWidth: '900px',
                  height: '520px',
                  border: '1px solid rgba(249, 115, 22, 0.4)',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(249, 115, 22, 0.15)',
                  animation: 'modalPopIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                  display: 'flex',
                  backgroundColor: '#0f172a',
                }}
              >
                <div style={{ flex: '1.05', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={puntoDetalle.imagen}
                    alt={puntoDetalle.nombre}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(90deg, rgba(2,6,23,0.15) 0%, rgba(2,6,23,0.05) 100%)',
                  }} />
                </div>

                <div style={{
                  flex: '0.95',
                  background: 'linear-gradient(135deg, rgba(8,15,35,0.92) 0%, rgba(15,23,42,0.88) 100%)',
                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '16px',
                  borderLeft: '1px solid rgba(255,255,255,0.12)',
                }}>
                  <div>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#f97316', fontWeight: 700, letterSpacing: '1.5px' }}>
                      Municipio / Atractivo
                    </span>
                    <h3 style={{ margin: '8px 0 10px 0', fontSize: '26px', color: '#ffffff', fontWeight: 800, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                      {puntoDetalle.nombre}
                    </h3>
                    <p style={{ margin: 0, fontSize: '14px', color: '#e2e8f0', lineHeight: '1.65', textShadow: '0 1px 3px rgba(0,0,0,0.6)', whiteSpace: 'pre-line', maxHeight: '280px', overflowY: 'auto' }}>
                      {puntoDetalle.descripcion}
                    </p>
                  </div>

                  <a
                    href={puntoDetalle.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '12px 24px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                      color: '#ffffff',
                      fontWeight: 600,
                      fontSize: '14px',
                      textDecoration: 'none',
                      boxShadow: '0 4px 14px rgba(249, 115, 22, 0.35)',
                      transition: 'all 0.2s ease',
                      textAlign: 'center',
                      width: 'fit-content',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(249, 115, 22, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 14px rgba(249, 115, 22, 0.35)';
                    }}
                  >
                    Más información
                  </a>
                </div>

                <button
                  onClick={() => setPuntoDetalle(null)}
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(15, 23, 42, 0.75)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    zIndex: 10,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#ef4444';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.75)';
                  }}
                >
                  ✕
                </button>
              </div>


            </div>
          )}
        </div>
      </div>
    </>
  ) : null;

  return (
    <>
      {/* Vista previa integrada en la página */}
      <div
        onClick={() => setEstaAmpliado(true)}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1000px',
          margin: '0 auto',
          cursor: 'pointer',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 24px 48px rgba(0,0,0,0.55), 0 0 24px rgba(249, 115, 22, 0.12)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <img
          src="/assets/mapa/mapa-plano.png"
          alt="Vista previa mapa Sugamuxi"
          style={{ width: '100%', height: 'auto', display: 'block', opacity: 0.9 }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(11, 19, 41, 0.7), rgba(11, 19, 41, 0.3))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              padding: '12px 24px',
              borderRadius: '30px',
              background: 'rgba(15, 23, 42, 0.85)',
              border: '1px solid rgba(249, 115, 22, 0.4)',
              backdropFilter: 'blur(10px)',
              fontSize: '14px',
              fontWeight: 600,
              color: '#ffffff',
              boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span>🔍</span> Haz clic para explorar el Mapa Ampliado
          </div>
        </div>
      </div>

      {montado && contenidoModal && createPortal(contenidoModal, document.body)}
    </>
  );
}
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getRequerimientoCompleto, samplePeritos } from "../data.js";
import { useResponsive } from "../hooks/useResponsive.js";

export default function RequerimientoDetalleAdminPerito() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isMobile } = useResponsive();
  
  // Debug: mostrar información del ID recibido
  console.log('ID recibido en params:', id);
  console.log('Tipo de ID:', typeof id);
  console.log('ID parseado:', parseInt(id));
  
  const req = getRequerimientoCompleto(parseInt(id));
  
  // Debug: mostrar información del requerimiento encontrado
  console.log('Requerimiento encontrado:', req);
  
  const [showModal, setShowModal] = useState(false);
  const [selectedPeritoId, setSelectedPeritoId] = useState('');

  if (!req) return <div>No se encontró el requerimiento</div>;

  const handleReasignar = () => {
    if (selectedPeritoId) {
      // Aquí iría la lógica para reasignar el requerimiento
      alert(`Requerimiento reasignado al perito ID: ${selectedPeritoId}`);
      setShowModal(false);
      setSelectedPeritoId('');
    } else {
      alert('Por favor seleccione un perito');
    }
  };

  return (
    <div className="card" style={{ 
      padding: isMobile ? "20px" : "40px", 
      maxWidth: isMobile ? "100%" : "1200px", 
      margin: "0 auto", 
      fontSize: isMobile ? "16px" : "19px",
      width: "100%"
    }}>
      <div style={{ 
        display: "flex", 
        alignItems: isMobile ? "flex-start" : "center", 
        marginBottom: isMobile ? "20px" : "32px",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? "12px" : "0"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          width: isMobile ? "100%" : "auto",
          flexWrap: "wrap",
          gap: isMobile ? "8px" : "0"
        }}>
          <button 
            onClick={() => navigate(-1)} 
            className="btn secondary" 
            style={{ 
              marginRight: isMobile ? 0 : 16, 
              fontSize: isMobile ? "16px" : "17px", 
              padding: isMobile ? "10px 16px" : "12px 20px",
              minHeight: isMobile ? "44px" : "auto"
            }}
          >
          ← Volver
        </button>
          <h2 style={{ 
            margin: 0, 
            fontSize: isMobile ? "20px" : "28px", 
            fontWeight: 700,
            flex: isMobile ? 1 : "none"
          }}>
            Requerimiento #{req.id}
          </h2>
        </div>
        <span 
          className={`badge ${req.estado === 'Finalizado' ? 'ok' : 'info'}`} 
          style={{ 
            marginLeft: isMobile ? 0 : 16, 
            fontSize: isMobile ? "14px" : "16px", 
            padding: isMobile ? "6px 12px" : "8px 16px",
            alignSelf: isMobile ? "flex-start" : "center"
          }}
        >
          {req.estado}
        </span>
      </div>

            <div className="panel" style={{ 
        marginBottom: isMobile ? "20px" : "32px", 
        padding: isMobile ? "24px" : "32px", 
        backgroundColor: "#f8f9fa", 
        border: "1px solid #e9ecef", 
        borderRadius: "12px" 
      }}>
        <h3 style={{ 
          marginBottom: isMobile ? "20px" : "24px", 
          color: "#005eff", 
          fontSize: isMobile ? "20px" : "24px", 
          borderBottom: "2px solid #005eff", 
          paddingBottom: "12px" 
        }}>
          Información del Perito
        </h3>
        <div style={{ 
          display: "flex", 
          flexDirection: "column",
          gap: isMobile ? "20px" : "24px" 
        }}>
          <div style={{ 
            padding: isMobile ? "28px" : "36px", 
            backgroundColor: "white", 
            borderRadius: "12px", 
            border: "1px solid #e2e8f0",
            width: "100%"
          }}>
            <div style={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: isMobile ? "16px" : "20px" 
            }}>
              <div style={{ 
                display: "flex", 
                flexDirection: isMobile ? "column" : "row", 
                gap: isMobile ? "4px" : "12px",
                alignItems: isMobile ? "flex-start" : "center"
              }}>
                <strong style={{ fontSize: isMobile ? "16px" : "18px", minWidth: "80px" }}>Perito:</strong>
                <span style={{ fontSize: isMobile ? "16px" : "18px", lineHeight: "1.5" }}>{req.perito?.nombre}</span>
              </div>
              <div style={{ 
                display: "flex", 
                flexDirection: isMobile ? "column" : "row", 
                gap: isMobile ? "4px" : "12px",
                alignItems: isMobile ? "flex-start" : "center"
              }}>
                <strong style={{ fontSize: isMobile ? "16px" : "18px", minWidth: "80px" }}>Teléfono:</strong>
                <span style={{ fontSize: isMobile ? "16px" : "18px", lineHeight: "1.5" }}>{req.perito?.telefono}</span>
              </div>
              <div style={{ 
                display: "flex", 
                flexDirection: isMobile ? "column" : "row", 
                gap: isMobile ? "4px" : "12px",
                alignItems: isMobile ? "flex-start" : "center"
              }}>
                <strong style={{ fontSize: isMobile ? "16px" : "18px", minWidth: "80px" }}>Usuario:</strong>
                <span style={{ fontSize: isMobile ? "16px" : "18px", lineHeight: "1.5" }}>{req.perito?.username}</span>
              </div>
              <div style={{ 
                display: "flex", 
                flexDirection: isMobile ? "column" : "row", 
                gap: isMobile ? "4px" : "12px",
                alignItems: isMobile ? "flex-start" : "center"
              }}>
                <strong style={{ fontSize: isMobile ? "16px" : "18px", minWidth: "80px" }}>Estado:</strong>
                <span className={`badge ${req.perito?.disponible ? 'ok' : 'warning'}`} style={{ marginLeft: isMobile ? 0 : 8 }}>
                  {req.perito?.disponible ? 'Disponible' : 'No disponible'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="panel" style={{ 
        marginBottom: isMobile ? "20px" : "32px", 
        padding: isMobile ? "24px" : "32px", 
        backgroundColor: "#f8f9fa", 
        border: "1px solid #e9ecef", 
        borderRadius: "12px" 
      }}>
        <h3 style={{ 
          marginBottom: isMobile ? "20px" : "24px", 
          color: "#005eff", 
          fontSize: isMobile ? "20px" : "24px", 
          borderBottom: "2px solid #005eff", 
          paddingBottom: "12px" 
        }}>
          Información del Cliente
        </h3>
        <div style={{ 
          display: "flex", 
          flexDirection: "column",
          gap: isMobile ? "20px" : "24px" 
        }}>
          <div style={{ 
            padding: isMobile ? "28px" : "36px", 
            backgroundColor: "white", 
            borderRadius: "12px", 
            border: "1px solid #e2e8f0",
            width: "100%"
          }}>
            <div style={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: isMobile ? "16px" : "20px" 
            }}>
              <div style={{ 
                display: "flex", 
                flexDirection: isMobile ? "column" : "row", 
                gap: isMobile ? "4px" : "12px",
                alignItems: isMobile ? "flex-start" : "center"
              }}>
                <strong style={{ fontSize: isMobile ? "16px" : "18px", minWidth: "80px" }}>Cliente:</strong>
                <span style={{ fontSize: isMobile ? "16px" : "18px", lineHeight: "1.5" }}>{req.cliente?.nombre}</span>
              </div>
              <div style={{ 
                display: "flex", 
                flexDirection: isMobile ? "column" : "row", 
                gap: isMobile ? "4px" : "12px",
                alignItems: isMobile ? "flex-start" : "center"
              }}>
                <strong style={{ fontSize: isMobile ? "16px" : "18px", minWidth: "80px" }}>Teléfono:</strong>
                <span style={{ fontSize: isMobile ? "16px" : "18px", lineHeight: "1.5" }}>{req.cliente?.telefono}</span>
              </div>
              <div style={{ 
                display: "flex", 
                flexDirection: isMobile ? "column" : "row", 
                gap: isMobile ? "4px" : "12px",
                alignItems: isMobile ? "flex-start" : "center"
              }}>
                <strong style={{ fontSize: isMobile ? "16px" : "18px", minWidth: "80px" }}>Contacto:</strong>
                <span style={{ fontSize: isMobile ? "16px" : "18px", lineHeight: "1.5" }}>{req.cliente?.contacto}</span>
              </div>
              <div style={{ 
                display: "flex", 
                flexDirection: isMobile ? "column" : "row", 
                gap: isMobile ? "4px" : "12px",
                alignItems: isMobile ? "flex-start" : "center"
              }}>
                <strong style={{ fontSize: isMobile ? "16px" : "18px", minWidth: "80px" }}>Correo:</strong>
                <span style={{ fontSize: isMobile ? "16px" : "18px", lineHeight: "1.5" }}>{req.cliente?.correo || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="panel" style={{ 
        marginBottom: isMobile ? "16px" : "24px", 
        padding: isMobile ? "16px" : "24px", 
        backgroundColor: "#f8f9fa", 
        border: "1px solid #e9ecef", 
        borderRadius: "12px" 
      }}>
        <h3 style={{ 
          marginBottom: isMobile ? "16px" : "20px", 
          color: "#005eff", 
          fontSize: isMobile ? "18px" : "22px", 
          borderBottom: "2px solid #005eff", 
          paddingBottom: "12px" 
        }}>
          Detalles del Requerimiento
        </h3>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", 
          gap: isMobile ? "12px" : "20px" 
        }}>
          <div style={{ 
            padding: isMobile ? "12px" : "16px", 
            backgroundColor: "white", 
            borderRadius: "8px", 
            border: "1px solid #e2e8f0" 
          }}>
            <p style={{ margin: "0 0 8px 0", fontSize: isMobile ? "16px" : "18px" }}>
              <strong>Dirección:</strong> {req.direccion}
            </p>
            <p style={{ margin: "0 0 8px 0", fontSize: isMobile ? "16px" : "18px" }}>
              <strong>Plazo:</strong> {req.plazoDias} días
            </p>
            <p style={{ margin: "0 0 8px 0", fontSize: isMobile ? "16px" : "18px" }}>
              <strong>Fecha de Asignación:</strong> {new Date(req.fechaAsignacion).toLocaleString()}
            </p>
            <p style={{ margin: 0, fontSize: isMobile ? "16px" : "18px" }}>
              <strong>Tiempo en Sitio:</strong> {req.postVisitHours} horas
            </p>
          </div>
        </div>
      </div>

      {/* Observaciones */}
      <div className="panel" style={{ 
        marginBottom: isMobile ? "16px" : "16px",
        padding: isMobile ? "16px" : "24px",
        backgroundColor: "#f8f9fa",
        border: "1px solid #e9ecef",
        borderRadius: "12px"
      }}>
        <h3 style={{ 
          marginBottom: isMobile ? "16px" : "12px", 
          color: "#005eff",
          fontSize: isMobile ? "18px" : "20px",
          borderBottom: "2px solid #005eff",
          paddingBottom: "8px"
        }}>
          Observaciones
        </h3>
        {Array.isArray(req.observaciones) ? (
          <div style={{ display: "grid", gap: isMobile ? "12px" : "8px" }}>
            {req.observaciones.map((obs, index) => (
              <div 
                key={obs.id || index} 
                style={{ 
                  padding: isMobile ? "16px" : "12px", 
                  backgroundColor: "white", 
                  borderRadius: "8px", 
                  border: "1px solid #e9ecef",
                  fontSize: isMobile ? "16px" : "16px"
                }}
              >
                <div style={{ fontWeight: "500", marginBottom: "4px" }}>
                  {obs.texto || obs}
                </div>
                {obs.timestamp && (
                  <div style={{ fontSize: isMobile ? "14px" : "14px", color: "#6c757d" }}>
                    {obs.timestamp}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p style={{ fontSize: isMobile ? "16px" : "18px" }}>{req.observaciones || 'N/A'}</p>
        )}
        
        {/* Botón de reasignación solo si está finalizado */}
        {req.estado === 'Finalizado' && (
          <div style={{ marginTop: isMobile ? "20px" : "16px", textAlign: "center" }}>
            <button
              onClick={() => setShowModal(true)}
              className="btn primary"
              style={{ 
                fontSize: isMobile ? "16px" : "18px", 
                padding: isMobile ? "14px 20px" : "12px 24px",
                minHeight: isMobile ? "48px" : "auto",
                width: isMobile ? "100%" : "auto"
              }}
            >
              Reasignar Requerimiento
            </button>
          </div>
        )}
      </div>

      {/* Evidencias solo se muestran si el estado es "Finalizado" */}
      {req.estado === 'Finalizado' ? (
        <div className="panel" style={{ marginBottom: 16 }}>
          <div style={{display: "flex", justifyContent: "center"}}>
            <h3 style={{ marginBottom: 12, color: "#005eff", fontSize: "30px" }}>Evidencias</h3>
          </div>

          {/* Mapa de Ubicación */}
          <div style={{ marginBottom: 16 }}>
            <strong style={{fontSize: "25px"}}>Mapa de Ubicación:</strong>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
              {req.gps && !req.gps.error ? (
                <iframe
                  title="Mapa ubicación"
                  width="90%"
                  height="300"
                  style={{ border: 0, marginTop: "20px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
                  loading="lazy"
                  src={`https://www.google.com/maps?q=${req.gps.lat},${req.gps.lng}&z=15&output=embed`}
                />
              ) : (
                <p style={{ color: "#64748b", marginTop: 8 }}>No se pudo cargar el mapa.</p>
              )}
            </div>
          </div>

          {/* Fotos */}
          {req.fotos?.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{color: "gray" , marginBottom: "10px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>_____________________________________________________________________</div>
              <strong style={{fontSize: "25px"}}>Fotos:</strong>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8, justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                {req.fotos.map((f, i) => (
                  <img
                    key={i}
                    src={URL.createObjectURL(f)}
                    alt={`Foto ${i + 1}`}
                    style={{
                      width: 500,
                      height: 300,
                      marginTop: "20px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      cursor: "pointer"
                    }}
                    onClick={() => window.open(URL.createObjectURL(f), '_blank')}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Video */}
          {req.video && (
            <div style={{ marginBottom: 16 }}>
              <div style={{color: "gray" ,marginBottom: "10px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>_____________________________________________________________________</div>
              <strong style={{fontSize: "25px"}}>Video:</strong>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <video
                  key={URL.createObjectURL(req.video)}
                  controls
                  width="90%"
                  src={URL.createObjectURL(req.video)}
                  style={{
                    borderRadius: "12px",
                    marginTop: 20,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                  }}
                />
              </div>
            </div>
          )}

          {/* Documentos */}
          {req.pdf && (
            <div style={{ marginBottom: 16 }}>
              <div style={{color: "gray" , marginBottom: "10px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>_____________________________________________________________________</div>
              <strong style={{fontSize: "25px"}}>Informe:</strong>
              <div style={{ marginTop: 8 }}>
                <a
                  href={URL.createObjectURL(req.pdf)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#005eff",
                    textDecoration: "none",
                    padding: "8px 16px",
                    backgroundColor: "#eaf1ff",
                    borderRadius: "8px",
                    display: "inline-block"
                  }}
                >
                  Ver Informe PDF
                </a>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="panel" style={{ marginBottom: 16, textAlign: "center", padding: "40px 20px" }}>
          <h3 style={{ marginBottom: 12, color: "#64748b", fontSize: "22px" }}>Evidencias Pendientes</h3>
          <p style={{ fontSize: "18px", color: "#64748b", margin: 0 }}>
            Las evidencias se mostrarán cuando el requerimiento esté finalizado.
          </p>
        </div>
      )}

      {/* Modal de Reasignación */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div className="card" style={{
            padding: '24px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, color: '#005eff', fontSize: '22px' }}>Reasignar Requerimiento</h3>
              <button
                onClick={() => setShowModal(false)}
                className="btn secondary"
                style={{ padding: '8px 12px', fontSize: '16px' }}
              >
                ✕
              </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <p style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#374151' }}>
                <strong>Requerimiento #{req.id}</strong> - {req.direccion}
              </p>
              <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
                Seleccione un nuevo perito para reasignar este requerimiento:
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                Perito:
              </label>
              <select
                value={selectedPeritoId}
                onChange={(e) => setSelectedPeritoId(e.target.value)}
                className="input"
                style={{ width: '100%', fontSize: '16px', padding: '12px' }}
              >
                <option value="">Seleccionar perito</option>
                {samplePeritos.filter(p => p.disponible && p.id !== req.peritoId).map(perito => (
                  <option key={perito.id} value={perito.id}>
                    {perito.nombre} ({perito.username}) - {perito.disponible ? 'Disponible' : 'No disponible'}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowModal(false)}
                className="btn secondary"
                style={{ fontSize: '16px', padding: '12px 24px' }}
              >
                Cancelar
              </button>
              <button
                onClick={handleReasignar}
                className="btn primary"
                style={{ fontSize: '16px', padding: '12px 24px' }}
                disabled={!selectedPeritoId}
              >
                Reasignar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getRequerimientoCompleto, samplePeritos } from "../data.js";

export default function RequerimientoDetalleAdminPerito() {
  const { id } = useParams();
  const navigate = useNavigate();
  
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
    <div className="card" style={{ padding: 24, maxWidth: 900, margin: "0 auto", fontSize: "19px" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
        <button onClick={() => navigate(-1)} className="btn secondary" style={{ marginRight: 12, fontSize: "17px" }}>
          ← Volver
        </button>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>Requerimiento #{req.id}</h2>
        <span className={`badge ${req.estado === 'Finalizado' ? 'ok' : 'info'}`} style={{ marginLeft: 12 }}>
          {req.estado}
        </span>
      </div>

      <div className="panel" style={{ marginBottom: 16 }}>
        <h3 style={{ marginBottom: 12, color: "#005eff" }}>Información del Perito</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <p><strong>Perito:</strong> {req.perito?.nombre}</p>
          <p><strong>Teléfono:</strong> {req.perito?.telefono}</p>
          <p><strong>Usuario:</strong> {req.perito?.username}</p>
          <p><strong>Estado:</strong> 
            <span className={`badge ${req.perito?.disponible ? 'ok' : 'warning'}`} style={{ marginLeft: 8 }}>
              {req.perito?.disponible ? 'Disponible' : 'No disponible'}
            </span>
          </p>
        </div>
      </div>

      <div className="panel" style={{ marginBottom: 16 }}>
        <h3 style={{ marginBottom: 12, color: "#005eff" }}>Información del Cliente</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <p><strong>Cliente:</strong> {req.cliente?.nombre}</p>
          <p><strong>Teléfono:</strong> {req.cliente?.telefono}</p>
          <p><strong>Contacto:</strong> {req.cliente?.contacto}</p>
          <p><strong>Correo:</strong> {req.cliente?.correo || 'N/A'}</p>
        </div>
      </div>

      <div className="panel" style={{ marginBottom: 16 }}>
        <h3 style={{ marginBottom: 12, color: "#005eff" }}>Detalles del Requerimiento</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <p><strong>Dirección:</strong> {req.direccion}</p>
          <p><strong>Plazo:</strong> {req.plazoDias} días</p>
          <p><strong>Fecha de Asignación:</strong> {new Date(req.fechaAsignacion).toLocaleString()}</p>
          <p><strong>Tiempo en Sitio:</strong> {req.postVisitHours} horas</p>
        </div>
      </div>

      {/* Observaciones */}
      <div className="panel" style={{ marginBottom: 16 }}>
        <h3 style={{ marginBottom: 12, color: "#005eff" }}>Observaciones</h3>
        {Array.isArray(req.observaciones) ? (
          <div style={{ display: "grid", gap: "8px" }}>
            {req.observaciones.map((obs, index) => (
              <div 
                key={obs.id || index} 
                style={{ 
                  padding: "12px", 
                  backgroundColor: "#f8f9fa", 
                  borderRadius: "8px", 
                  border: "1px solid #e9ecef",
                  fontSize: "16px"
                }}
              >
                <div style={{ fontWeight: "500", marginBottom: "4px" }}>
                  {obs.texto || obs}
                </div>
                {obs.timestamp && (
                  <div style={{ fontSize: "14px", color: "#6c757d" }}>
                    {obs.timestamp}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>{req.observaciones || 'N/A'}</p>
        )}
        
        {/* Botón de reasignación solo si está finalizado */}
        {req.estado === 'Finalizado' && (
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <button
              onClick={() => setShowModal(true)}
              className="btn primary"
              style={{ fontSize: "16px", padding: "12px 24px" }}
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

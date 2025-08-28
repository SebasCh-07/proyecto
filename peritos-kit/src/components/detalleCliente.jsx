import { useNavigate, useParams, useLocation } from "react-router-dom";
import { sampleClientes, sampleRequerimientos, getPerito } from "../data.js";

export default function DetalleCliente() {
  const navigate = useNavigate();
  const { clienteId } = useParams();
  const location = useLocation();
  const requerimientoId = location.state?.requerimientoId;

  // Encontrar el cliente por ID
  const cliente = sampleClientes.find(cliente => cliente.id == clienteId);
  
  // Filtrar requerimientos por cliente
  const requerimientosDelCliente = sampleRequerimientos.filter(
    req => req.clienteId == clienteId
  );

  // Si hay un requerimiento específico (desde ListaClientesHistorial), obtenerlo
  const requerimientoEspecifico = requerimientoId 
    ? sampleRequerimientos.find(req => req.id == requerimientoId)
    : null;

  if (!cliente) {
    return (
      <div>
        <h1>Cliente no encontrado</h1>
        <button onClick={() => navigate(-1)}>Regresar</button>
      </div>
    );
  }

  return (
    <div className="card" style={{ padding: 24, maxWidth: 1000, margin: "0 auto", fontSize: "19px" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
        <button
          onClick={() => navigate(-1)}
          className="btn secondary"
          style={{ marginRight: 16, fontSize: "17px" }}
        >
          ← Volver
        </button>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>
          Detalles del Cliente: {cliente.nombre}
        </h1>
      </div>
      
      {/* Información del cliente */}
      <div className="panel" style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 16, color: "#005eff", fontSize: "22px" }}>
          Información del Cliente
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <strong style={{ color: "#374151" }}>Teléfono:</strong>
            <p style={{ margin: "4px 0", fontSize: "16px" }}>{cliente.telefono}</p>
          </div>
          <div>
            <strong style={{ color: "#374151" }}>Email:</strong>
            <p style={{ margin: "4px 0", fontSize: "16px" }}>{cliente.email || 'N/A'}</p>
          </div>
          <div>
            <strong style={{ color: "#374151" }}>Empresa:</strong>
            <p style={{ margin: "4px 0", fontSize: "16px" }}>{cliente.empresa || 'N/A'}</p>
          </div>
          <div>
            <strong style={{ color: "#374151" }}>Dirección:</strong>
            <p style={{ margin: "4px 0", fontSize: "16px" }}>{cliente.direccion || 'N/A'}</p>
          </div>
          <div>
            <strong style={{ color: "#374151" }}>ID:</strong>
            <p style={{ margin: "4px 0", fontSize: "16px" }}>{cliente.id}</p>
          </div>
        </div>
      </div>

      {/* Si hay un requerimiento específico finalizado, mostrar sus detalles */}
      {requerimientoEspecifico && requerimientoEspecifico.estado === 'Finalizado' && (
        <div className="panel" style={{ marginBottom: 24 }}>
                  <h3 style={{ marginBottom: 16, color: "#005eff", fontSize: "22px" }}>
          Requerimiento Finalizado #{requerimientoEspecifico.id}
        </h3>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <strong style={{ color: "#374151" }}>Dirección:</strong>
              <p style={{ margin: "4px 0", fontSize: "16px" }}>{requerimientoEspecifico.direccion}</p>
            </div>
            <div>
              <strong style={{ color: "#374151" }}>Plazo:</strong>
              <p style={{ margin: "4px 0", fontSize: "16px" }}>{requerimientoEspecifico.plazoDias} días</p>
            </div>
            <div>
              <strong style={{ color: "#374151" }}>Fecha de Asignación:</strong>
              <p style={{ margin: "4px 0", fontSize: "16px" }}>
                {new Date(requerimientoEspecifico.fechaAsignacion).toLocaleDateString()}
              </p>
            </div>
            <div>
              <strong style={{ color: "#374151" }}>Tiempo en Sitio:</strong>
              <p style={{ margin: "4px 0", fontSize: "16px" }}>{requerimientoEspecifico.postVisitHours} horas</p>
            </div>
            {requerimientoEspecifico.observaciones && (
              <div style={{ gridColumn: "1 / -1" }}>
                <strong style={{ color: "#374151" }}>Observaciones:</strong>
                {Array.isArray(requerimientoEspecifico.observaciones) ? (
                  <div style={{ display: "grid", gap: "8px", marginTop: "8px" }}>
                    {requerimientoEspecifico.observaciones.map((obs, index) => (
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
                  <p style={{ margin: "4px 0", fontSize: "16px" }}>{requerimientoEspecifico.observaciones}</p>
                )}
              </div>
            )}
          </div>

          {/* Evidencias del requerimiento finalizado */}
          <div style={{ marginTop: 20 }}>
            <h4 style={{ marginBottom: 12, color: "#059669", fontSize: "18px" }}>
              Evidencias del Requerimiento
            </h4>
            
            {/* Mapa de Ubicación */}
            {requerimientoEspecifico.gps && !requerimientoEspecifico.gps.error && (
              <div style={{ marginBottom: 16 }}>
                <strong style={{ fontSize: "16px" }}>Mapa de Ubicación:</strong>
                <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
                  <iframe
                    title="Mapa ubicación"
                    width="90%"
                    height="250"
                    style={{ border: 0, borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
                    loading="lazy"
                    src={`https://www.google.com/maps?q=${requerimientoEspecifico.gps.lat},${requerimientoEspecifico.gps.lng}&z=15&output=embed`}
                  />
                </div>
              </div>
            )}

            {/* Fotos */}
            {requerimientoEspecifico.fotos?.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <strong style={{ fontSize: "16px" }}>Fotos:</strong>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8, justifyContent: "center" }}>
                  {requerimientoEspecifico.fotos.map((f, i) => (
                    <img
                      key={i}
                      src={URL.createObjectURL(f)}
                      alt={`Foto ${i + 1}`}
                      style={{
                        width: 200,
                        height: 150,
                        objectFit: "cover",
                        borderRadius: "8px",
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
            {requerimientoEspecifico.video && (
              <div style={{ marginBottom: 16 }}>
                <strong style={{ fontSize: "16px" }}>Video:</strong>
                <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
                  <video
                    controls
                    width="90%"
                    src={URL.createObjectURL(requerimientoEspecifico.video)}
                    style={{
                      borderRadius: "8px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                    }}
                  />
                </div>
              </div>
            )}

            {/* Documentos */}
            {requerimientoEspecifico.pdf && (
              <div style={{ marginBottom: 16 }}>
                <strong style={{ fontSize: "16px" }}>Informe:</strong>
                <div style={{ marginTop: 8 }}>
                  <a
                    href={URL.createObjectURL(requerimientoEspecifico.pdf)}
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
        </div>
      )}

      {/* Lista de todos los requerimientos del cliente */}
      <div className="panel" style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 16, color: "#005eff", fontSize: "22px" }}>
          Todos los Requerimientos ({requerimientosDelCliente.length})
        </h3>
        
        {requerimientosDelCliente.length === 0 ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <p style={{ fontSize: "18px", color: "#64748b" }}>
              No hay requerimientos asignados a este cliente.
            </p>
          </div>
        ) : (
          <div className="list" style={{ display: "grid", gap: "12px" }}>
            {requerimientosDelCliente.map(req => {
              const perito = req.peritoId ? getPerito(req.peritoId) : null;
              return (
                <div key={req.id} className="panel" style={{ 
                  padding: '16px', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '8px',
                  backgroundColor: req.estado === 'Finalizado' ? '#f0fdf4' : '#f8fafc'
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontWeight: 'bold', fontSize: '16px' }}>
                        Requerimiento #{req.id}
                      </span>
                      <span className={`badge ${req.estado === 'Finalizado' ? 'ok' : req.estado === 'En Proceso' ? 'warning' : 'info'}`}>
                        {req.estado}
                      </span>
                    </div>
                    <div style={{ fontSize: "14px", color: "#64748b" }}>
                      {new Date(req.fechaAsignacion).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "14px" }}>
                    <div><strong>Dirección:</strong> {req.direccion}</div>
                    <div><strong>Plazo:</strong> {req.plazoDias} días</div>
                    <div><strong>Tiempo en Sitio:</strong> {req.postVisitHours} horas</div>
                    {perito && (
                      <div><strong>Perito:</strong> {perito.nombre}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

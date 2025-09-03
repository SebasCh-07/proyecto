import { useNavigate, useParams, useLocation } from "react-router-dom";
import { sampleClientes, sampleRequerimientos, getPerito } from "../data.js";

export default function DetalleCliente() {
  const navigate = useNavigate();
  const { clienteId } = useParams();
  const location = useLocation();
  const requerimientoId = location.state?.requerimientoId;

  // Encontrar el cliente por ID
  const cliente = sampleClientes.find(cliente => cliente.id == clienteId);
  
  // Obtener el perito asignado al cliente
  const peritoAsignado = cliente?.peritoId ? getPerito(cliente.peritoId) : null;
  
  // Filtrar requerimientos del cliente con el perito específico
  const requerimientosConPerito = sampleRequerimientos.filter(
    req => req.clienteId == clienteId && req.peritoId == cliente?.peritoId
  );

  // Si hay un requerimiento específico, obtenerlo
  const requerimientoEspecifico = requerimientoId 
    ? sampleRequerimientos.find(req => req.id == requerimientoId)
    : null;

  // Función para navegar al detalle del requerimiento
  const navegarARequerimientoDetalle = (requerimientoId) => {
    navigate(`/requerimiento/${requerimientoId}`);
  };

  if (!cliente) {
    return (
      <div className="card" style={{ padding: 24, maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ color: "#dc2626", fontSize: "24px" }}>Cliente no encontrado</h1>
        <button 
          onClick={() => navigate(-1)} 
          className="btn secondary"
          style={{ marginTop: "16px" }}
        >
          Regresar
        </button>
      </div>
    );
  }

  return (
    <div className="card" style={{ padding: 24, maxWidth: 1000, margin: "0 auto", fontSize: "19px" }}>
      {/* Header con botón volver */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
        <button
          onClick={() => navigate(-1)}
          className="btn secondary"
          style={{ marginRight: 16, fontSize: "17px" }}
        >
          ← Volver
        </button>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>
          📊 Detalles del Cliente: {cliente.nombre}
        </h1>
      </div>
      
      {/* Información del perito asignado */}
      <div className="panel" style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 16, color: "#059669", fontSize: "22px" }}>
          👨‍💼 Perito Asignado
        </h3>
        
        {peritoAsignado ? (
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr 1fr", 
            gap: 20,
            padding: "20px",
            backgroundColor: "#f0fdf4",
            borderRadius: "12px",
            border: "1px solid #bbf7d0"
          }}>
            <div>
              <strong style={{ color: "#374151", fontSize: "16px" }}>Nombre:</strong>
              <p style={{ margin: "8px 0", fontSize: "18px", fontWeight: "600", color: "#059669" }}>
                {peritoAsignado.nombre}
              </p>
            </div>
            <div>
              <strong style={{ color: "#374151", fontSize: "16px" }}>ID:</strong>
              <p style={{ margin: "8px 0", fontSize: "18px" }}>{peritoAsignado.id}</p>
            </div>
            <div>
              <strong style={{ color: "#374151", fontSize: "16px" }}>Teléfono:</strong>
              <p style={{ margin: "8px 0", fontSize: "18px" }}>{peritoAsignado.telefono}</p>
            </div>
            <div>
              <strong style={{ color: "#374151", fontSize: "16px" }}>Usuario:</strong>
              <p style={{ margin: "8px 0", fontSize: "18px" }}>{peritoAsignado.username}</p>
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <strong style={{ color: "#374151", fontSize: "16px" }}>Estado:</strong>
              <span className={`badge ${peritoAsignado.disponible ? 'ok' : 'warning'}`} style={{ 
                marginLeft: "8px", 
                fontSize: "16px" 
              }}>
                {peritoAsignado.disponible ? 'Disponible' : 'No disponible'}
              </span>
            </div>
          </div>
        ) : (
          <div style={{ 
            textAlign: "center", 
            padding: "40px 20px",
            backgroundColor: "#fef3c7",
            borderRadius: "12px",
            border: "1px solid #fbbf24"
          }}>
            <p style={{ fontSize: "18px", color: "#92400e", margin: 0 }}>
              ⚠️ No hay perito asignado a este cliente
            </p>
          </div>
        )}
      </div>

      {/* Lista de requerimientos del cliente con el perito específico */}
      <div className="panel" style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 16, color: "#005eff", fontSize: "22px" }}>
          📋 Requerimientos con {peritoAsignado ? peritoAsignado.nombre : 'Perito Asignado'} ({requerimientosConPerito.length})
        </h3>
        
        {requerimientosConPerito.length === 0 ? (
          <div style={{ 
            textAlign: "center", 
            padding: "40px 20px",
            backgroundColor: "#f8fafc",
            borderRadius: "12px",
            border: "1px solid #e2e8f0"
          }}>
            <p style={{ fontSize: "18px", color: "#64748b", margin: 0 }}>
              No hay requerimientos asignados a este cliente con el perito actual.
            </p>
          </div>
        ) : (
          <div className="list" style={{ display: "grid", gap: "16px" }}>
            {requerimientosConPerito.map(req => (
              <div 
                key={req.id} 
                className="panel" 
                onClick={() => navegarARequerimientoDetalle(req.id)}
                style={{ 
                  padding: '20px', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '12px',
                  backgroundColor: req.estado === 'Finalizado' ? '#f0fdf4' : 
                                 req.estado === 'En Proceso' ? '#fef3c7' : '#f8fafc',
                  borderColor: req.estado === 'Finalizado' ? '#bbf7d0' : 
                              req.estado === 'En Proceso' ? '#fbbf24' : '#e2e8f0',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                }}
              >
                {/* Header del requerimiento */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontWeight: 'bold', fontSize: '18px', color: "#1e293b" }}>
                      Requerimiento #{req.id}
                    </span>
                    <span className={`badge ${req.estado === 'Finalizado' ? 'ok' : req.estado === 'En Proceso' ? 'warning' : 'info'}`} style={{ fontSize: "14px" }}>
                      {req.estado}
                    </span>
                  </div>
                  <div style={{ fontSize: "14px", color: "#64748b", textAlign: "right" }}>
                    <div>📅 {new Date(req.fechaAsignacion).toLocaleDateString()}</div>
                    <div>⏰ {new Date(req.fechaAsignacion).toLocaleTimeString()}</div>
                  </div>
                </div>
                
                {/* Detalles del requerimiento */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", fontSize: "16px", marginBottom: "16px" }}>
                  <div>
                    <strong style={{ color: "#374151" }}>📍 Dirección:</strong>
                    <p style={{ margin: "4px 0", fontSize: "16px" }}>{req.direccion}</p>
                  </div>
                  <div>
                    <strong style={{ color: "#374151" }}>⏱️ Plazo:</strong>
                    <p style={{ margin: "4px 0", fontSize: "16px" }}>{req.plazoDias} días</p>
                  </div>
                  <div>
                    <strong style={{ color: "#374151" }}>🕐 Tiempo en Sitio:</strong>
                    <p style={{ margin: "4px 0", fontSize: "16px" }}>{req.postVisitHours} horas</p>
                  </div>
                  <div>
                    <strong style={{ color: "#374151" }}>👨‍💼 Perito:</strong>
                    <p style={{ margin: "4px 0", fontSize: "16px", color: "#059669", fontWeight: "500" }}>
                      {peritoAsignado?.nombre}
                    </p>
                  </div>
                </div>

                {/* Indicador de click */}
                <div style={{ 
                  display: "flex", 
                  justifyContent: "center", 
                  alignItems: "center",
                  marginTop: "12px",
                  padding: "8px",
                  backgroundColor: "rgba(0, 94, 255, 0.1)",
                  borderRadius: "8px",
                  border: "1px dashed #005eff"
                }}>
                  <span style={{ 
                    color: "#005eff", 
                    fontSize: "14px", 
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}>
                    🔍 Haz clic para ver detalles completos
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Si hay un requerimiento específico, mostrar información adicional */}
      {requerimientoEspecifico && requerimientoEspecifico.estado === 'Finalizado' && (
        <div className="panel" style={{ marginBottom: 24 }}>
          <h3 style={{ marginBottom: "16px", color: "#dc2626", fontSize: "20px" }}>
            🔍 Requerimiento Específico #{requerimientoEspecifico.id} - {requerimientoEspecifico.estado}
          </h3>
          <p style={{ fontSize: "16px", color: "#64748b", margin: 0 }}>
            Este requerimiento fue seleccionado desde el historial del cliente y se muestra con detalles completos arriba.
          </p>
        </div>
      )}
    </div>
  );
}

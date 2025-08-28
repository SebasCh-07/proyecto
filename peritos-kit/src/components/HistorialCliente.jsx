import { useLocation, useNavigate } from "react-router-dom";
import { sampleRequerimientos, samplePeritos, getPerito } from "../data.js";

export default function HistorialCliente() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cliente } = location.state || {}; // recibe el cliente desde navigate

  if (!cliente) {
    return <p>No se encontró información del cliente.</p>;
  }

  // Obtener todos los requerimientos del cliente
  const requerimientosDelCliente = sampleRequerimientos.filter(
    req => req.clienteId == cliente.id
  );

  // Obtener peritos únicos que han sido asignados al cliente
  const peritosIds = [...new Set(requerimientosDelCliente.map(req => req.peritoId))];
  const peritos = peritosIds.map(id => getPerito(id)).filter(Boolean);

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
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>👤 Historial de {cliente.nombre}</h1>
      </div>

      {/* Información del Cliente */}
      <div className="panel" style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 16, color: "#005eff", fontSize: "22px" }}>📋 Información del Cliente</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <strong style={{ color: "#374151" }}>Nombre:</strong>
            <p style={{ margin: "4px 0", fontSize: "18px" }}>{cliente.nombre}</p>
          </div>
          <div>
            <strong style={{ color: "#374151" }}>CI:</strong>
            <p style={{ margin: "4px 0", fontSize: "18px" }}>{cliente.id}</p>
          </div>
          <div>
            <strong style={{ color: "#374151" }}>Teléfono:</strong>
            <p style={{ margin: "4px 0", fontSize: "18px" }}>{cliente.telefono}</p>
          </div>
          <div>
            <strong style={{ color: "#374151" }}>Contacto:</strong>
            <p style={{ margin: "4px 0", fontSize: "18px" }}>{cliente.contacto}</p>
          </div>
          <div>
            <strong style={{ color: "#374151" }}>Correo:</strong>
            <p style={{ margin: "4px 0", fontSize: "18px" }}>{cliente.correo || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Lista de peritos asignados */}
      <div className="panel" style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 16, color: "#005eff", fontSize: "22px" }}>👨‍💼 Peritos Asignados</h3>
        {peritos.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <p style={{ fontSize: "18px", color: "#64748b" }}>No se han asignado peritos a este cliente.</p>
          </div>
        ) : (
          <div className="list" style={{ display: "grid", gap: "16px" }}>
            {peritos.map(perito => (
              <div
                key={perito.id}
                className="panel"
                style={{
                  padding: "20px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  backgroundColor: "white"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: "20px", fontWeight: 600, color: "#005eff" }}>
                      {perito.nombre}
                    </h4>
                    <p style={{ margin: "4px 0", fontSize: "16px", color: "#64748b" }}>
                      ID: {perito.id}
                    </p>
                  </div>
                  <span className={`badge ${perito.disponible ? 'ok' : 'warning'}`} style={{ fontSize: "14px" }}>
                    {perito.disponible ? 'Disponible' : 'No disponible'}
                  </span>
                </div>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <strong style={{ color: "#374151" }}>📞 Teléfono:</strong>
                    <p style={{ margin: "4px 0", fontSize: "16px" }}>{perito.telefono}</p>
                  </div>
                  <div>
                    <strong style={{ color: "#374151" }}>👤 Usuario:</strong>
                    <p style={{ margin: "0", fontSize: "16px" }}>{perito.username}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

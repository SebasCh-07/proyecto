import { useNavigate } from "react-router-dom";
import { sampleRequerimientos, getCliente, getPerito } from "../data.js";

export default function Requerimientos() {
  const navigate = useNavigate();
  // Ya no necesitamos estado para pestañas

  // Obtener todos los requerimientos con información completa
  const requerimientosCompletos = sampleRequerimientos.map(req => ({
    ...req,
    cliente: getCliente(req.clienteId),
    perito: getPerito(req.peritoId)
  }));

  // Obtener todos los requerimientos (asignados y sin asignar)
  const todosLosRequerimientos = requerimientosCompletos;

  const handleRequerimientoClick = (reqId) => {
    navigate(`/requerimiento/${reqId}`);
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Finalizado':
        return 'ok';
      case 'En curso':
        return 'warning';
      case 'Asignado':
        return 'info';
      default:
        return 'info';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  

  const renderRequerimiento = (req) => (
    <div
      key={req.id}
      className="panel"
      style={{
        padding: "20px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        border: "1px solid #e2e8f0",
        borderRadius: "12px"
      }}
      onClick={() => handleRequerimientoClick(req.id)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <h3 style={{ margin: 0, fontSize: "22px", fontWeight: 600, color: "#005eff" }}>
            Requerimiento #{req.id}
          </h3>
          <span className={`badge ${getEstadoColor(req.estado)}`} style={{ fontSize: "14px" }}>
            {req.estado}
          </span>
        </div>
        <div style={{ textAlign: "right", fontSize: "14px", color: "#64748b" }}>
          {formatDate(req.fechaAsignacion)}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
        <div>
          <strong style={{ color: "#374151" }}>Cliente:</strong>
          <p style={{ margin: "4px 0", fontSize: "16px" }}>
            {req.cliente?.nombre || 'N/A'}
          </p>
        </div>
                 <div>
           <strong style={{ color: "#374151" }}>Perito:</strong>
           <p style={{ margin: "4px 0", fontSize: "16px" }}>
             {req.perito ? req.perito.nombre : (
               <span style={{ color: "#ef4444", fontStyle: "italic" }}>⚠️ Sin asignar</span>
             )}
           </p>
         </div>
        <div>
          <strong style={{ color: "#374151" }}>Dirección:</strong>
          <p style={{ margin: "4px 0", fontSize: "16px" }}>
            {req.direccion}
          </p>
        </div>
        <div>
          <strong style={{ color: "#374151" }}>Plazo:</strong>
          <p style={{ margin: "4px 0", fontSize: "16px" }}>
            {req.plazoDias} días
          </p>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                 <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
           {req.perito ? (
             <span style={{ 
               backgroundColor: "#dcfce7", 
               color: "#166534", 
               padding: "4px 8px", 
               borderRadius: "6px", 
               fontSize: "12px",
               fontWeight: "500"
             }}>
               ✅ Asignado a {req.perito.nombre}
             </span>
           ) : (
             <span style={{ 
               backgroundColor: "#fef3c7", 
               color: "#92400e", 
               padding: "4px 8px", 
               borderRadius: "6px", 
               fontSize: "12px",
               fontWeight: "500"
             }}>
               ⏳ Pendiente de asignación
             </span>
           )}
         </div>
        
        <div style={{ 
          color: "#64748b", 
          fontSize: "14px",
          display: "flex",
          alignItems: "center",
          gap: "4px"
        }}>
          👆 Hacer clic para ver detalles
        </div>
      </div>
    </div>
  );

  return (
    <div className="card" style={{ padding: 24, maxWidth: 1200, margin: "0 auto", fontSize: "19px" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
        <button 
          onClick={() => navigate(-1)} 
          className="btn secondary" 
          style={{ marginRight: 16, fontSize: "17px" }}
        >
          ← Volver
        </button>
        <h2 style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>📋 Lista de Requerimientos</h2>
        <button 
          onClick={() => navigate("/crear-requerimiento")} 
          className="btn primary" 
          style={{ marginLeft: "auto", fontSize: "18px" }}
        >
          ➕ Crear Requerimiento
        </button>
      </div>

             {/* Título de la sección */}
       <div style={{ marginBottom: 24 }}>
         <h3 style={{ fontSize: "20px", color: "#64748b", margin: 0 }}>
           📋 Todos los Requerimientos ({todosLosRequerimientos.length})
         </h3>
       </div>

             {/* Contenido de todos los requerimientos */}
       {todosLosRequerimientos.length === 0 ? (
         <div className="panel" style={{ textAlign: "center", padding: "40px 20px" }}>
           <p style={{ fontSize: "20px", color: "#64748b" }}>No hay requerimientos registrados.</p>
         </div>
       ) : (
         <div className="list" style={{ display: "grid", gap: "16px" }}>
           {todosLosRequerimientos.map(renderRequerimiento)}
         </div>
       )}
    </div>
  );
}

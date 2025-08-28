import { useNavigate, useParams } from "react-router-dom";
import { sampleRequerimientos, sampleClientes, getPerito } from "../data.js";

export default function ListaClientesHistorial() {
  const navigate = useNavigate();
  const { peritoId } = useParams();
  const peritoIdNum = Number(peritoId);

  // Filtrar requerimientos por perito
  const requerimientosDelPerito = sampleRequerimientos.filter(
    req => req.peritoId == peritoIdNum
  );

  // Obtener clientes únicos de los requerimientos con sus requerimientos correspondientes
  const clientesConRequerimientos = requerimientosDelPerito.map(req => {
    const cliente = sampleClientes.find(c => c.id == req.clienteId);
    return {
      cliente,
      requerimiento: req
    };
  }).filter(item => item.cliente);

  const perito = getPerito(peritoIdNum);
  const nombrePerito = perito ? perito.nombre : 'Perito desconocido';

  const handleClienteClick = (cliente, requerimiento) => {
    // Solo navegar si el requerimiento está finalizado
    if (requerimiento.estado === 'Finalizado') {
      navigate(`/detalleCliente/${cliente.id}`, { 
        state: { requerimientoId: requerimiento.id }
      });
    }
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Finalizado': return 'ok';
      case 'En Proceso': return 'warning';
      case 'Pendiente': return 'info';
      default: return 'secondary';
    }
  };
  
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
          👥 Clientes del Perito: {nombrePerito}
        </h1>
      </div>

      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: "20px", color: "#64748b", margin: 0 }}>
          📋 Clientes Asignados ({clientesConRequerimientos.length})
        </h3>
      </div>

      {clientesConRequerimientos.length === 0 ? (
        <div className="panel" style={{ textAlign: "center", padding: "40px 20px" }}>
          <p style={{ fontSize: "20px", color: "#64748b" }}>
            No se han asignado clientes a este perito.
          </p>
        </div>
      ) : (
        <div className="list" style={{ display: "grid", gap: "16px" }}>
          {clientesConRequerimientos.map(({ cliente, requerimiento }) => (
            <div
              key={`${cliente.id}-${requerimiento.id}`}
              className={`panel ${requerimiento.estado === 'Finalizado' ? 'clickable' : ''}`}
              style={{
                padding: '20px',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                backgroundColor: requerimiento.estado === 'Finalizado' ? '#f8fafc' : '#f1f5f9',
                cursor: requerimiento.estado === 'Finalizado' ? 'pointer' : 'default',
                transition: 'all 0.2s ease',
                ...(requerimiento.estado === 'Finalizado' && {
                  ':hover': {
                    backgroundColor: '#e2e8f0',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }
                })
              }}
              onClick={() => handleClienteClick(cliente, requerimiento)}
              onMouseEnter={(e) => {
                if (requerimiento.estado === 'Finalizado') {
                  e.target.style.backgroundColor = '#e2e8f0';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (requerimiento.estado === 'Finalizado') {
                  e.target.style.backgroundColor = '#f8fafc';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <h3 style={{ margin: 0, fontSize: "22px", fontWeight: 600, color: "#005eff" }}>
                    {cliente.nombre}
                  </h3>
                  <span className={`badge ${getEstadoColor(requerimiento.estado)}`} style={{ fontSize: "14px" }}>
                    {requerimiento.estado}
                  </span>
                </div>
                <div style={{ textAlign: "right", fontSize: "14px", color: "#64748b" }}>
                  Requerimiento #{requerimiento.id}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <strong style={{ color: "#374151" }}>📞 Teléfono:</strong>
                  <p style={{ margin: "4px 0", fontSize: "16px" }}>
                    {cliente.telefono}
                  </p>
                </div>
                <div>
                  <strong style={{ color: "#374151" }}>📧 Correo:</strong>
                  <p style={{ margin: "4px 0", fontSize: "16px" }}>
                    {cliente.correo || 'N/A'}
                  </p>
                </div>
                <div>
                  <strong style={{ color: "#374151" }}>📍 Dirección:</strong>
                  <p style={{ margin: "4px 0", fontSize: "16px" }}>
                    {requerimiento.direccion}
                  </p>
                </div>
                <div>
                  <strong style={{ color: "#374151" }}>⏰ Plazo:</strong>
                  <p style={{ margin: "4px 0", fontSize: "16px" }}>
                    {requerimiento.plazoDias} días
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <span style={{ fontSize: "14px", color: "#64748b" }}>
                    ID Cliente: {cliente.id}
                  </span>
                </div>
                <div style={{
                  color: requerimiento.estado === 'Finalizado' ? "#059669" : "#64748b",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px"
                }}>
                  {requerimiento.estado === 'Finalizado' ? (
                    <>
                      ✅ Finalizado - 👆 Hacer clic para ver detalles
                    </>
                  ) : (
                    <>
                      ⏳ {requerimiento.estado} - No disponible para ver detalles
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

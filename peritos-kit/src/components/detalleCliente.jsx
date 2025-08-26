import { useNavigate, useParams } from "react-router-dom";
import { sampleClientes, sampleRequerimientos } from "../data.js";

export default function DetalleCliente() {
  const navigate = useNavigate();
  const { clienteId } = useParams();

  // Encontrar el cliente por ID
  const cliente = sampleClientes.find(cliente => cliente.id == clienteId);
  
  // Filtrar requerimientos por cliente
  const requerimientosDelCliente = sampleRequerimientos.filter(
    req => req.clienteId == clienteId
  );

  if (!cliente) {
    return (
      <div>
        <h1>Cliente no encontrado</h1>
        <button onClick={() => navigate(-1)}>Regresar</button>
      </div>
    );
  }

  return (
    <div style={{fontSize: "20px"}}>
      <h1>Detalles del Cliente</h1>
      
      {/* Información del cliente */}
      <div className="card" style={{ 
        padding: '20px', 
        marginBottom: '20px', 
        border: '1px solid #ddd', 
        borderRadius: '8px',
        backgroundColor: '#f9f9f9'
      }}>
        <h2>{cliente.nombre}</h2>
        <div style={{ marginTop: '10px' }}>
          <div><strong>📞 Teléfono:</strong> {cliente.telefono}</div>
          <div><strong>📧 Email:</strong> {cliente.email}</div>
          <div><strong>🏢 Empresa:</strong> {cliente.empresa}</div>
          <div><strong>📍 Dirección:</strong> {cliente.direccion}</div>
          <div><strong>🆔 ID:</strong> {cliente.id}</div>
        </div>
      </div>

      {/* Requerimientos del cliente */}
      <h2>Requerimientos Asignados</h2>
      {requerimientosDelCliente.length === 0 ? (
        <p>No hay requerimientos asignados a este cliente.</p>
      ) : (
        <div className="list" style={{ marginTop: '20px' }}>
          {requerimientosDelCliente.map(req => (
            <div key={req.id} className="card" style={{ 
              padding: '15px', 
              marginBottom: '10px', 
              border: '1px solid #ddd', 
              borderRadius: '8px',
              backgroundColor: '#f8f9fa'
            }}>
              <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                Requerimiento #{req.id}
              </div>
              <div style={{ color: '#666', marginTop: '5px' }}>
                <strong>Estado:</strong> {req.estado}
              </div>
              <div style={{ color: '#666', marginTop: '5px' }}>
                <strong>Fecha de asignación:</strong> {new Date(req.fechaAsignacion).toLocaleDateString()}
              </div>
              <div style={{ color: '#666', marginTop: '5px' }}>
                <strong>Plazo:</strong> {req.plazoDias} días
              </div>
              <div style={{ color: '#666', marginTop: '5px' }}>
                <strong>Dirección:</strong> {req.direccion}
              </div>
              {req.peritoId && (
                <div style={{ color: '#666', marginTop: '5px' }}>
                  <strong>Perito asignado:</strong> {req.peritoId}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <button
        style={{
          backgroundColor: '#005eff',
          color: 'white',
          padding: "8px 16px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
          marginTop: "20px",
          fontSize: "20px"
        }}
        onClick={() => navigate(-1)}
      >
        Regresar
      </button>
    </div>
  );
}

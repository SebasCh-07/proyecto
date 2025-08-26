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
    <div style={{ fontSize: "18px" }}>
      <h1>Historial de {cliente.nombre}</h1>

      <div style={{ marginBottom: '20px', fontSize: "20px" }}>
        <p><strong>CI:</strong> {cliente.id}</p>
        <p><strong>Teléfono:</strong> {cliente.telefono}</p>
        <p><strong>Contacto:</strong> {cliente.contacto}</p>
        <p><strong>Correo:</strong> {cliente.correo}</p>
      </div>

      {/* Lista de peritos asignados */}
      <div style={{ display: "flex", justifyContent: "center"}}>

        <h2 >Peritos Asignados</h2>
      </div>
      {peritos.length === 0 ? (
        <p>No se han asignado peritos a este cliente.</p>
      ) : (
        <div className="list" style={{ marginTop: '20px' }}>
          {peritos.map(perito => (
            <div
              key={perito.id}
              className="card"
              style={{
                padding: '15px',
                marginBottom: '10px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9'
              }}
            >
              <div style={{ fontWeight: 'bold', fontSize: '20px' }}>
                {perito.nombre}
              </div>
              <div style={{ color: '#666', marginTop: '5px', fontSize: "18px" }}>
                📞 {perito.telefono}
              </div>
              <div style={{ color: '#888', fontSize: '18px', marginTop: '5px' }}>
                ID: {perito.id}
              </div>
              <div style={{ color: '#666', marginTop: '5px', fontSize: "18px" }}>
                Estado: {perito.disponible ? 'Disponible' : 'No disponible'}
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        style={{
          backgroundColor: "#005eff",
          color: "white",
          padding: "8px 16px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "18px",
          marginTop: "20px"
        }}
        onClick={() => navigate(-1)} // Regresa a la página anterior
      >
        Regresar
      </button>
    </div>
  );
}

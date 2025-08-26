import { useNavigate, useParams } from "react-router-dom";
import { sampleRequerimientos, sampleClientes, getPerito } from "../data.js";

export default function ListaClientesHistorial() {
  const navigate = useNavigate();
  const { peritoId } = useParams();

  // Filtrar requerimientos por perito
  const requerimientosDelPerito = sampleRequerimientos.filter(
    req => req.peritoId == peritoId
  );

  // Obtener clientes únicos de los requerimientos
  const clientesIds = [...new Set(requerimientosDelPerito.map(req => req.clienteId))];
  const clientes = clientesIds.map(id => sampleClientes.find(cliente => cliente.id == id));
  const perito = getPerito(peritoId);
  const nombrePerito = perito ? perito.nombre : `Perito #${peritoId}`;
  
  return (
    <div>
      <h1>Clientes del Perito: {nombrePerito}</h1>

      <div className="list" style={{ marginTop: '20px', fontSize: '20px' }}>
        {clientes.map(cliente => (
          <div
            key={cliente.id}
            className="card"
            style={{
              padding: '15px',
              marginBottom: '10px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9',
              cursor: 'pointer'
            }}
            onClick={() => navigate(`/detalleCliente/${cliente.id}`)}
          >
            <div style={{ fontWeight: 'bold', fontSize: '18px' }}>
              {cliente.nombre}
            </div>
            <div style={{ color: '#666', marginTop: '5px', fontSize: "18px" }}>
              📞 {cliente.telefono}
            </div>
            <div style={{ color: '#888', fontSize: '18px', marginTop: '5px' }}>
              ID: {cliente.id}
            </div>
            <div style={{ color: '#666', marginTop: '5px', fontSize: "18px" }}>
              📧 {cliente.correo}
            </div>
          </div>
        ))}
      </div>

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

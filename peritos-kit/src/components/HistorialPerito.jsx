import { useNavigate } from "react-router-dom";
import { samplePeritos } from "../data.js"; // Importar los peritos

export default function HistorialPerito() {
  const navigate = useNavigate();

  return (
    <div style={{ fontSize: "18px" }}>
      <h1>Historial del Perito</h1>
      <p>Aquí se mostrará el historial de requerimientos del perito.</p>

      <h2>Lista de Peritos</h2>
      <div className="list" style={{ marginTop: '20px' }}>
        {samplePeritos.map(perito => (
          <div
            key={perito.id}
            className="card"
            style={{
              padding: '15px',
              marginBottom: '10px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9',
              cursor: 'pointer',
              fontSize: "18px"
            }}
            onClick={() => navigate(`/listaClientesHistorial/${perito.id}`)}
          >
            <div style={{ fontWeight: 'bold', fontSize: '20px' }}>
              {perito.nombre}
            </div>
            <div style={{ color: '#666', marginTop: '10px' }}>
              📞 {perito.telefono}
            </div>
            <div style={{ color: '#888', fontSize: '18px', marginTop: '5px' }}>
              ID: {perito.id}
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
          fontSize: '20px'
        }}
        onClick={() => navigate(-1)} // 👈 regresa a la página anterior
      >
        Regresar
      </button>
    </div>
  )
}

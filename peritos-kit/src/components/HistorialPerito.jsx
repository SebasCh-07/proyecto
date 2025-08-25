import { useNavigate } from "react-router-dom";

export default function HistorialPerito() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Historial del Perito</h1>
      <p>Aquí se mostrará el historial de requerimientos del perito.</p>

      <button
        style={{
          backgroundColor: '#005eff',
          color: 'white',
          padding: "8px 16px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
          marginTop: "20px"
        }}
        onClick={() => navigate(-1)} // 👈 regresa a la página anterior
      >
        Regresar
      </button>
    </div>
  )
}

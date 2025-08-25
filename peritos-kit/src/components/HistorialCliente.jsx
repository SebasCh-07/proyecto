import { useLocation, useNavigate } from "react-router-dom";

export default function HistorialCliente() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cliente } = location.state || {}; // recibe el cliente desde navigate

  if (!cliente) {
    return <p>No se encontró información del cliente.</p>;
  }

  return (
    <div>
      <h1>Historial de {cliente.nombre}</h1>

      <p>CI: {cliente.id}</p>
      <p>Teléfono: {cliente.telefono}</p>
      <p>Contacto: {cliente.contacto}</p>
      <p>Correo: {cliente.correo}</p>

      {/* Aquí puedes listar requerimientos o visitas del cliente */}
      <button
        style={{
          backgroundColor: "#005eff",
          color: "white",
          padding: "8px 16px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
          marginTop: "20px"
        }}
        onClick={() => navigate(-1)} // Regresa a la página anterior
      >
        Regresar
      </button>
    </div>
  );
}

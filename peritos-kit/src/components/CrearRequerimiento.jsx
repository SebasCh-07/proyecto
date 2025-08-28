import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sampleClientes, samplePeritos, addRequerimiento } from "../data.js";

export default function CrearRequerimiento() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    clienteId: "",
    peritoId: "",
    direccion: "",
    plazoDias: 3,
    observaciones: "",
    archivoAsignacion: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      archivoAsignacion: e.target.files[0] || null
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.clienteId || !formData.peritoId || !formData.direccion) {
      alert("Por favor complete todos los campos obligatorios");
      return;
    }

    try {
      // Crear el nuevo requerimiento
      const nuevoRequerimiento = addRequerimiento({
        clienteId: parseInt(formData.clienteId),
        peritoId: parseInt(formData.peritoId),
        direccion: formData.direccion,
        plazoDias: parseInt(formData.plazoDias),
        observaciones: formData.observaciones,
        archivoAsignacion: formData.archivoAsignacion
      });

      if (nuevoRequerimiento) {
        alert("✅ Requerimiento creado exitosamente");
        navigate("/requerimientos");
      } else {
        alert("❌ Error al crear el requerimiento");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error al crear el requerimiento");
    }
  };

  return (
    <div className="card" style={{ padding: 24, maxWidth: 800, margin: "0 auto", fontSize: "19px" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
        <button 
          onClick={() => navigate(-1)} 
          className="btn secondary" 
          style={{ marginRight: 16, fontSize: "17px" }}
        >
          ← Volver
        </button>
        <h2 style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>➕ Crear Nuevo Requerimiento</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="panel" style={{ marginBottom: 24 }}>
          <h3 style={{ marginBottom: 16, color: "#005eff", fontSize: "22px" }}>📋 Información del Requerimiento</h3>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>
                Cliente *
              </label>
              <select
                name="clienteId"
                value={formData.clienteId}
                onChange={handleInputChange}
                className="input"
                style={{ width: "100%", fontSize: "16px" }}
                required
              >
                <option value="">Seleccionar cliente</option>
                {sampleClientes.map(cliente => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nombre} (CI: {cliente.id})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>
                Perito *
              </label>
              <select
                name="peritoId"
                value={formData.peritoId}
                onChange={handleInputChange}
                className="input"
                style={{ width: "100%", fontSize: "16px" }}
                required
              >
                <option value="">Seleccionar perito</option>
                {samplePeritos.map(perito => (
                  <option key={perito.id} value={perito.id}>
                    {perito.nombre} ({perito.username}) - {perito.disponible ? "✅ Disponible" : "❌ No disponible"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>
              Dirección *
            </label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleInputChange}
              className="input"
              placeholder="Ej: Av. Amazonas 123, Quito"
              style={{ width: "100%", fontSize: "16px" }}
              required
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>
              Plazo (días)
            </label>
            <input
              type="number"
              name="plazoDias"
              value={formData.plazoDias}
              onChange={handleInputChange}
              className="input"
              min="1"
              max="30"
              style={{ width: "100%", fontSize: "16px" }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>
              Observaciones
            </label>
            <textarea
              name="observaciones"
              value={formData.observaciones}
              onChange={handleInputChange}
              className="input"
              placeholder="Observaciones adicionales..."
              style={{ 
                width: "100%", 
                fontSize: "16px", 
                minHeight: "80px",
                resize: "vertical"
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>
              Archivo de asignación
            </label>
            <input
              type="file"
              name="archivoAsignacion"
              onChange={handleFileChange}
              className="input"
              accept=".pdf,.doc,.docx,.xls,.xlsx"
              style={{ width: "100%", fontSize: "16px" }}
            />
            <p style={{ fontSize: "14px", color: "#64748b", marginTop: "4px" }}>
              Formatos aceptados: PDF, DOC, DOCX, XLS, XLSX
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "16px", justifyContent: "flex-end" }}>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn secondary"
            style={{ fontSize: "18px" }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn primary"
            style={{ fontSize: "18px" }}
          >
            ✅ Crear Requerimiento
          </button>
        </div>
      </form>
    </div>
  );
}

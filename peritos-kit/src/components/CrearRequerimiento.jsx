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
    <div className="container">
      <div className="card" style={{ 
        padding: "24px", 
        maxWidth: "800px", 
        margin: "0 auto", 
        fontSize: "19px",
        width: "100%"
      }}>
        {/* Header responsive */}
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "16px"
        }}>
          <button 
            onClick={() => navigate(-1)} 
            className="btn secondary" 
            style={{ 
              fontSize: "17px",
              minWidth: "100px"
            }}
          >
            ← Volver
          </button>
          <h2 style={{ 
            margin: 0, 
            fontSize: "28px", 
            fontWeight: 700,
            flex: "1",
            textAlign: "center"
          }}>
            ➕ Crear Nuevo Requerimiento
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="panel" style={{ marginBottom: "24px" }}>
            <h3 style={{ 
              marginBottom: "20px", 
              color: "#005eff", 
              fontSize: "22px",
              textAlign: "center"
            }}>
              📋 Información del Requerimiento
            </h3>
            
            {/* Grid responsive para cliente y perito */}
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
              gap: "20px", 
              marginBottom: "20px" 
            }}>
              <div>
                <label className="label">
                  Cliente *
                </label>
                <select
                  name="clienteId"
                  value={formData.clienteId}
                  onChange={handleInputChange}
                  className="input"
                  style={{ 
                    width: "100%", 
                    fontSize: "16px",
                    minHeight: "48px"
                  }}
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
                <label className="label">
                  Perito *
                </label>
                <select
                  name="peritoId"
                  value={formData.peritoId}
                  onChange={handleInputChange}
                  className="input"
                  style={{ 
                    width: "100%", 
                    fontSize: "16px",
                    minHeight: "48px"
                  }}
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

            <div style={{ marginBottom: "20px" }}>
              <label className="label">
                Dirección *
              </label>
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleInputChange}
                className="input"
                placeholder="Ej: Av. Amazonas 123, Quito"
                style={{ 
                  width: "100%", 
                  fontSize: "16px",
                  minHeight: "48px"
                }}
                required
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label className="label">
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
                style={{ 
                  width: "100%", 
                  fontSize: "16px",
                  minHeight: "48px"
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label className="label">
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
                  minHeight: "100px",
                  resize: "vertical"
                }}
              />
            </div>

            <div>
              <label className="label">
                Archivo de asignación
              </label>
              <input
                type="file"
                name="archivoAsignacion"
                onChange={handleFileChange}
                className="input"
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                style={{ 
                  width: "100%", 
                  fontSize: "16px",
                  minHeight: "48px",
                  padding: "8px 12px"
                }}
              />
              <p style={{ 
                fontSize: "14px", 
                color: "#64748b", 
                marginTop: "8px",
                textAlign: "center"
              }}>
                Formatos aceptados: PDF, DOC, DOCX, XLS, XLSX
              </p>
            </div>
          </div>

          {/* Botones responsive */}
          <div style={{ 
            display: "flex", 
            gap: "16px", 
            justifyContent: "center",
            flexWrap: "wrap"
          }}>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn secondary"
              style={{ 
                fontSize: "18px",
                minWidth: "140px",
                minHeight: "48px"
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn success"
              style={{ 
                fontSize: "18px",
                minWidth: "200px",
                minHeight: "48px"
              }}
            >
              ✅ Crear Requerimiento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
